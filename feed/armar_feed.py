#!/usr/bin/env python3
"""Arma el feed de productos para HardGamers desde la pagina FEEDHG del ERP.

Lee https://www.compugarden.com.ar/FEEDHG/a/compugarden.aspx (el ERP la entrega envuelta en HTML),
saca el JSON de <feedhg>...</feedhg>, lo valida y lo deja en _site/feed-hg.json.
Si algo falla (ERP caido, feed vacio, incompleto o con datos raros) el script termina con error:
no se publica nada y queda el feed anterior (HardGamers prefiere un error a un feed vacio).
"""
import json, os, re, sys, time, urllib.request
from datetime import datetime, timezone

ORIGEN = 'https://www.compugarden.com.ar/FEEDHG/a/compugarden.aspx'
ACTUAL = 'https://marketingcg.github.io/compugarden/feed-hg.json'   # el que esta publicado hoy
MINIMO = 500            # menos productos que esto = feed incompleto
CAIDA_MAXIMA = 0.30     # si el feed nuevo trae mas de 30 % menos que el publicado, no se publica
DISPONIBILIDAD = {'in_stock', 'out_of_stock', 'preorder'}


def bajar(url, intentos=3, espera=15):
    ultimo = None
    for n in range(intentos):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Compugarden-Feed/1.0 (+https://www.compugarden.com.ar)'})
            with urllib.request.urlopen(req, timeout=120) as r:
                return r.read().decode('utf-8', 'replace')
        except Exception as e:
            ultimo = e
            print(f'intento {n + 1} fallido: {e}', file=sys.stderr)
            time.sleep(espera)
    raise SystemExit(f'No se pudo leer {url}: {ultimo}')


def fallar(msg):
    print('ERROR:', msg, file=sys.stderr)
    sys.exit(1)


html = bajar(ORIGEN)
a, b = html.find('<feedhg>'), html.find('</feedhg>')
if a < 0 or b < 0:
    fallar('la pagina FEEDHG no trae el bloque <feedhg> (el ERP no la reconoce o responde la portada)')
crudo = re.sub(r'</?TAG_FILESAVE>', '', html[a + 8:b], flags=re.I).strip()
try:
    lista = json.loads(crudo)
except Exception as e:
    fallar(f'el contenido no es JSON valido: {e}')
if not isinstance(lista, list) or len(lista) < MINIMO:
    fallar(f'feed incompleto: {len(lista) if isinstance(lista, list) else "no es una lista"} productos (minimo {MINIMO})')

ids = set()
for x in lista:
    for campo in ('id', 'name', 'link', 'availability', 'price'):
        if x.get(campo) in (None, ''):
            fallar(f'producto sin {campo}: {x}')
    if x['id'] in ids:
        fallar(f'id repetido: {x["id"]}')
    ids.add(x['id'])
    if not isinstance(x['price'], (int, float)) or x['price'] <= 0:
        fallar(f'precio invalido en {x["id"]}: {x["price"]}')
    if 'sale_price' in x and (not isinstance(x['sale_price'], (int, float)) or not 0 < x['sale_price'] < x['price']):
        fallar(f'precio de oferta invalido en {x["id"]}: {x["sale_price"]}')
    if x['availability'] not in DISPONIBILIDAD:
        fallar(f'disponibilidad invalida en {x["id"]}: {x["availability"]}')
    if not x['link'].startswith('https://'):
        fallar(f'enlace no https en {x["id"]}')

# no publicar si de golpe faltan muchos productos respecto del feed ya publicado
try:
    previo = json.loads(bajar(ACTUAL, intentos=1))
    if isinstance(previo, list) and len(previo) >= MINIMO and len(lista) < len(previo) * (1 - CAIDA_MAXIMA):
        fallar(f'el feed nuevo trae {len(lista)} productos y el publicado {len(previo)}: caida de mas del {int(CAIDA_MAXIMA * 100)} %, no se publica')
except SystemExit as e:
    if str(e).startswith('No se pudo leer'):
        print('aviso: no hay feed publicado todavia (primera vez)', file=sys.stderr)
    else:
        raise

ahora = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
for x in lista:
    x['updated_at'] = ahora

os.makedirs('_site', exist_ok=True)
with open('_site/feed-hg.json', 'w', encoding='utf-8') as f:
    json.dump(lista, f, ensure_ascii=False, separators=(',', ':'))
with open('_site/index.html', 'w', encoding='utf-8') as f:
    f.write(f'<!doctype html><meta charset="utf-8"><title>Feed Compugarden</title><p>Feed de productos de Compugarden para HardGamers: <a href="feed-hg.json">feed-hg.json</a><br>Productos: {len(lista)}<br>Actualizado: {ahora}</p>')
print(f'OK: {len(lista)} productos, {sum(1 for x in lista if "sale_price" in x)} en oferta, '
      f'{sum(1 for x in lista if x["availability"] == "out_of_stock")} sin stock, actualizado {ahora}')
