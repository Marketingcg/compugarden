/* ==========================================================
   cg-catalogo-v1.6.js — Compugarden
   Convierte la página de todos los artículos (búsqueda vacía)
   en un catálogo de categorías. Incluye su propio CSS.
   v1.6: diseño nuevo, simple, al estilo de la página de Empresas:
         etiqueta chica, título corto, 12 tarjetas IGUALES con la foto
         de un producto real de la tienda (en recuadro blanco), número
         y nombre. Sin cantidades, sin bajadas, sin chips ni beneficios.
         Abajo, "También tenemos" con las categorías chicas.
         Links con el mismo formato que el menú (con el nombre).
   v1.5: secciones con el total de productos de cada una.
   ----------------------------------------------------------
   ÍNDICE
   1. Configuración: textos, tarjetas (con su foto) y "También tenemos"
   2. Estilos (CSS) — oscuro y claro
   3. Detectar la página
   4. Leer del filtro de GBP qué categorías tienen productos
   5. Armar el HTML del catálogo
   6. Ocultar el listado original e insertar el catálogo
   7. Arranque
   PARA CAMBIAR UNA FOTO: en TARJETAS, cambiar "foto" por el código de imagen
   de otro producto (el nombre del archivo en App_PictureFiles/Items, sin _600.jpg).
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. CONFIGURACIÓN ---------- */
  var TEXTOS = {
    etiqueta: 'CATÁLOGO COMPUGARDEN',
    titulo: 'Todo para tu setup.',
    bajada: 'Elegí por dónde empezar.',
    otras: 'TAMBIÉN TENEMOS'
  };

  var FOTOS = 'www.compugarden.com.ar/Temp/App_WebSite/App_PictureFiles/Items/';

  /* Las 12 tarjetas, en este orden. foto = código de la imagen del producto. */
  var TARJETAS = [
    { cat: 68, slug: 'Computadoras',      nombre: 'PC armadas',      foto: 'PC-Gamer-CG-27' },
    { cat: 56, slug: 'Notebooks',         nombre: 'Notebooks',       foto: 'B14WGK-293US' },
    { cat: 48, slug: 'Placas-de-video',   nombre: 'Placas de video', foto: '912-V537-022' },
    { cat: 52, slug: 'Microprocesadores', nombre: 'Procesadores',    foto: '100-00002235WOF' },
    { cat: 47, slug: 'Motherboards',      nombre: 'Motherboards',    foto: '90MB1LQ0-M0EAY0' },
    { cat: 50, slug: 'Memorias',          nombre: 'Memorias RAM',    foto: 'KF560C36BBE2A-16' },
    { cat: 53, slug: 'Almacenamiento',    nombre: 'Almacenamiento',  foto: 'SFYR2S-1T0' },
    { cat: 75, slug: 'CPU-Cooling',       nombre: 'Refrigeración',   foto: '306-7ZW2R11-813' },
    { cat: 1,  slug: 'Gabinetes',         nombre: 'Gabinetes',       foto: 'MINOR-WH' },
    { cat: 7,  slug: 'Fuentes',           nombre: 'Fuentes',         foto: 'MPX-8505-AFAG-BWO' },
    { cat: 59, slug: 'Monitores',         nombre: 'Monitores',       foto: '27G4E' },
    { cat: 10, slug: 'Perifericos',       nombre: 'Periféricos',     foto: '6950376735638' }
  ];

  /* "También tenemos": solo aparecen si la categoría tiene productos */
  var OTRAS = [
    { cat: 14, slug: 'Conectividad',      nombre: 'Conectividad' },
    { cat: 57, slug: 'Impresoras',        nombre: 'Impresoras' },
    { cat: 88, slug: 'Proyectores',       nombre: 'Proyectores' },
    { cat: 70, slug: 'Sillas',            nombre: 'Sillas' },
    { cat: 5,  slug: 'Accesorios-varios', nombre: 'Accesorios' },
    { cat: 60, slug: 'Software',          nombre: 'Software' },
    { cat: 79, slug: 'Tablet',            nombre: 'Tablets' },
    { cat: 18, slug: 'Servicios',         nombre: 'Servicios' }
  ];

  /* ---------- 2. ESTILOS (CSS) ---------- */
  var CSS = [
    '.cg-cat-activo > :not(#cg-catalogo){display:none!important}',

    /* Colores: modo oscuro (por defecto) y modo claro */
    '#cg-catalogo{--cc-acento:var(--cg-accent,#d23f86);--cc-titulo:#fff;--cc-suave:#8a8d98;--cc-tarjeta:#17181e;--cc-borde:#24252c;--cc-chip:#c4c4cc}',
    'html.light #cg-catalogo{--cc-titulo:#181a27;--cc-suave:#6b6e7a;--cc-tarjeta:#fff;--cc-borde:#e3e4ea;--cc-chip:#3a3d4a}',

    '#cg-catalogo{width:100%;max-width:1200px;flex:0 0 100%;margin:0 auto;padding:30px 15px 48px;box-sizing:border-box;font-family:\'Manrope\',system-ui,sans-serif}',
    '#cg-catalogo *{box-sizing:border-box}',

    /* Encabezado */
    '#cg-catalogo .cg-cat-eti{margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.18em;color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-tit{margin:0 0 26px;padding:0;font-family:inherit;font-size:34px;font-weight:800;line-height:1.08;letter-spacing:-.6px;color:var(--cc-titulo);text-transform:none}',
    '#cg-catalogo .cg-cat-tit span{display:block;color:var(--cc-suave);font-weight:700}',

    /* Grilla: todas las tarjetas iguales */
    '#cg-catalogo .cg-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}',
    '#cg-catalogo .cg-t{position:relative;display:flex;flex-direction:column;padding:10px 10px 14px;border:1px solid var(--cc-borde);border-radius:16px;background:var(--cc-tarjeta);',
      'text-decoration:none!important;transition:border-color .2s,transform .2s,box-shadow .2s}',
    '#cg-catalogo .cg-t:hover{border-color:var(--cc-acento);transform:translateY(-3px);box-shadow:0 14px 30px -18px rgba(210,63,134,.55)}',
    '#cg-catalogo .cg-t:focus-visible{outline:2px solid var(--cc-acento);outline-offset:3px}',
    '#cg-catalogo .cg-t-foto{display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;padding:12px;border-radius:11px;background:#fff;overflow:hidden}',
    '#cg-catalogo .cg-t-foto img{display:block;width:100%;height:100%;object-fit:contain;transition:transform .35s ease}',
    '#cg-catalogo .cg-t:hover .cg-t-foto img{transform:scale(1.06)}',
    '#cg-catalogo .cg-t-n{display:block;margin:12px 4px 2px;font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--cc-acento)}',
    '#cg-catalogo .cg-t-nom{display:block;margin:0 4px;font-size:16px;font-weight:800;line-height:1.2;letter-spacing:-.2px;color:var(--cc-titulo)}',

    /* También tenemos */
    '#cg-catalogo .cg-ot{display:flex;align-items:center;gap:12px;margin:34px 0 12px}',
    '#cg-catalogo .cg-ot b{font-size:11px;font-weight:700;letter-spacing:.18em;color:var(--cc-suave);white-space:nowrap}',
    '#cg-catalogo .cg-ot i{flex:1;height:1px;background:var(--cc-borde)}',
    '#cg-catalogo .cg-mini{display:flex;flex-wrap:wrap;gap:8px}',
    '#cg-catalogo .cg-mini a{padding:8px 15px;border:1px solid var(--cc-borde);border-radius:999px;font-size:13px;font-weight:600;color:var(--cc-chip)!important;text-decoration:none!important;transition:border-color .2s,color .2s}',
    '#cg-catalogo .cg-mini a:hover{border-color:var(--cc-acento);color:var(--cc-titulo)!important}',

    /* Tablet y celular */
    '@media (max-width:991px){#cg-catalogo .cg-g{grid-template-columns:repeat(3,minmax(0,1fr))}}',
    '@media (max-width:600px){',
      '#cg-catalogo{padding:20px 12px 34px}',
      '#cg-catalogo .cg-cat-tit{font-size:26px;margin-bottom:20px}',
      '#cg-catalogo .cg-g{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
      '#cg-catalogo .cg-t{padding:8px 8px 12px;border-radius:14px}',
      '#cg-catalogo .cg-t-foto{padding:8px;border-radius:9px}',
      '#cg-catalogo .cg-t-n{margin-top:10px}',
      '#cg-catalogo .cg-t-nom{font-size:14px}',
    '}',
    '@media (prefers-reduced-motion:reduce){#cg-catalogo *{transition:none!important}#cg-catalogo .cg-t:hover,#cg-catalogo .cg-t:hover .cg-t-foto img{transform:none}}'
  ].join('\n');

  function ponerEstilos() {
    if (document.getElementById('cg-catalogo-css')) return;
    var st = document.createElement('style');
    st.id = 'cg-catalogo-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- 3. DETECTAR LA PÁGINA ----------
     Dirección rápida: /ARTICULOS/CAT_ID=-1/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/compugarden.aspx
     Dirección vieja:  /ARTICULOS/m=0/BUS=;/compugarden.aspx */
  function esPaginaCatalogo() {
    var ruta = location.pathname;
    try { ruta = decodeURIComponent(ruta); } catch (e) {}
    return /^\/ARTICULOS\/(CAT_ID=-1\/SCAT_ID=-1\/SCA_ID=-1\/)?m=0\/BUS=;?\/compugarden\.aspx$/i.test(ruta);
  }

  /* ---------- 4. QUÉ CATEGORÍAS TIENEN PRODUCTOS (filtro de GBP) ---------- */
  function leerCantidades() {
    var cant = {};
    var links = document.querySelectorAll('a[href*="SCAT_ID=-1"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      var mc = href.match(/CAT_ID=(\d+)\/SCAT_ID=-1\//i);
      var c = (links[i].textContent || '').match(/\((\d+)\)\s*$/);
      if (mc && c) cant[mc[1]] = parseInt(c[1], 10);
    }
    return cant;
  }

  /* ---------- 5. ARMAR EL HTML ---------- */
  function link(c) {
    return '/ARTICULOS/' + c.slug + '/CAT_ID=' + c.cat + '/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/compugarden.aspx';
  }
  function foto(codigo) {
    var directa = 'https://' + FOTOS + codigo + '_600.jpg';
    return {
      src: 'https://wsrv.nl/?url=' + FOTOS + codigo + '_600.jpg&w=480&output=webp&q=82',
      directa: directa
    };
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (x) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[x]; }); }
  function dos(n) { return (n < 10 ? '0' : '') + n; }

  function armar(cant) {
    var hayDatos = Object.keys(cant).length > 0;
    function visible(c) { return !hayDatos || cant[c.cat] > 0; }

    var h = '<p class="cg-cat-eti">' + TEXTOS.etiqueta + '</p>' +
            '<h1 class="cg-cat-tit">' + TEXTOS.titulo + '<span>' + TEXTOS.bajada + '</span></h1>';

    h += '<div class="cg-g">';
    var n = 0;
    TARJETAS.filter(visible).forEach(function (c) {
      n++;
      var f = foto(c.foto);
      h += '<a class="cg-t" href="' + link(c) + '">' +
             '<span class="cg-t-foto"><img src="' + f.src + '" alt="' + esc(c.nombre) + '" loading="' + (n <= 4 ? 'eager' : 'lazy') + '"' +
               ' width="480" height="360" onerror="if(this.src!==\'' + f.directa + '\')this.src=\'' + f.directa + '\'"></span>' +
             '<span class="cg-t-n">' + dos(n) + '</span>' +
             '<span class="cg-t-nom">' + esc(c.nombre) + '</span>' +
           '</a>';
    });
    h += '</div>';

    var otras = OTRAS.filter(visible);
    if (otras.length) {
      h += '<div class="cg-ot"><b>' + TEXTOS.otras + '</b><i></i></div><div class="cg-mini">';
      otras.forEach(function (c) { h += '<a href="' + link(c) + '">' + esc(c.nombre) + '</a>'; });
      h += '</div>';
    }

    var sec = document.createElement('section');
    sec.id = 'cg-catalogo';
    sec.innerHTML = h;
    return sec;
  }

  /* ---------- 6. OCULTAR EL LISTADO E INSERTAR ---------- */
  function ancestroComun(a, b) {
    var lista = [];
    for (var x = a; x; x = x.parentElement) lista.push(x);
    for (var y = b; y; y = y.parentElement) if (lista.indexOf(y) > -1) return y;
    return null;
  }

  function buscarTitulo(texto) {
    var t = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (var i = 0; i < t.length; i++) {
      if (t[i].textContent.trim().toUpperCase() === texto) return t[i];
    }
    return null;
  }

  function ocultarSueltos(cont) {
    /* Miga de pan rota de GBP (§CAT_DESC§) */
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].textContent.indexOf('§') === -1) continue;
      var p = links[i].parentElement;
      if (p && !p.contains(cont) && !p.querySelector('a[href*="/DETALLE/"]')) p.style.display = 'none';
    }
    /* Paginación, si quedó afuera del contenedor */
    var pag = document.querySelector('a[href*="A_PAGENUMBER"]');
    if (pag && !cont.contains(pag)) {
      var ul = pag.closest('ul');
      if (ul) ul.style.display = 'none';
    }
    /* Texto "Total: 1243 | Página actual: 1" */
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      var tx = w.currentNode;
      if (/^\s*Total:\s*\d+/.test(tx.nodeValue) && !cont.contains(tx)) {
        var el = tx.parentElement;
        if (el && el.textContent.length < 80) el.style.display = 'none';
      }
    }
  }

  function iniciar() {
    if (!esPaginaCatalogo() || document.getElementById('cg-catalogo')) return;

    var prod = document.querySelector('a[href*="/DETALLE/"]');
    var filtro = document.querySelector('#articulos .filtros_left') ||
                 document.querySelector('.filtros_left') ||
                 buscarTitulo('FILTRAR');
    if (!prod || !filtro) return;

    var cont = ancestroComun(prod, filtro);
    /* Seguridad: si el contenedor abarca el encabezado, no se toca nada */
    if (!cont || cont === document.body || cont.contains(document.querySelector('a[href*="/LOGIN/"]'))) return;

    ponerEstilos();
    var sec = armar(leerCantidades());
    cont.insertBefore(sec, cont.firstChild);
    cont.classList.add('cg-cat-activo');
    ocultarSueltos(cont);
  }

  /* ---------- 7. ARRANQUE ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
