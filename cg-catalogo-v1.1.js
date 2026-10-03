/* ==========================================================
   cg-catalogo-v1.1.js — Compugarden
   Convierte la página de todos los artículos (búsqueda vacía)
   en un catálogo de categorías con tarjetas e íconos.
   Incluye su propio CSS: no hace falta tocar cg-diseno.css.
   v1.1: modo claro (html.light), fuente del sitio y detección
         de los filtros por .filtros_left.
   ----------------------------------------------------------
   ÍNDICE
   1. Configuración: textos, categorías, chips y beneficios
   2. Íconos SVG
   3. Estilos (CSS) — oscuro y claro
   4. Detectar la página
   5. Leer las cantidades del filtro de GBP
   6. Armar el HTML del catálogo
   7. Ocultar el listado original e insertar el catálogo
   8. Arranque
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. CONFIGURACIÓN ---------- */
  var TEXTOS = {
    titulo: 'Explorá por categoría',
    bajada: 'Más de 1.200 productos y asesoramiento de especialistas',
    otras: 'También tenemos'
  };

  var PRINCIPALES = [
    { cat: 68, nombre: 'PC armadas',      icono: 'pc' },
    { cat: 56, nombre: 'Notebooks',       icono: 'notebook' },
    { cat: 52, nombre: 'Procesadores',    icono: 'cpu' },
    { cat: 47, nombre: 'Motherboards',    icono: 'mother' },
    { cat: 48, nombre: 'Placas de video', icono: 'video' },
    { cat: 50, nombre: 'Memorias RAM',    icono: 'ram' },
    { cat: 53, nombre: 'Almacenamiento',  icono: 'ssd' },
    { cat: 75, nombre: 'Refrigeración',   icono: 'cooler' },
    { cat: 1,  nombre: 'Gabinetes',       icono: 'gabinete' },
    { cat: 7,  nombre: 'Fuentes',         icono: 'fuente' },
    { cat: 59, nombre: 'Monitores',       icono: 'monitor' },
    { cat: 10, nombre: 'Periféricos',     icono: 'teclado' }
  ];

  var CHIPS = [
    { cat: 14, nombre: 'Conectividad', icono: 'wifi' },
    { cat: 57, nombre: 'Impresoras',   icono: 'impresora' },
    { cat: 88, nombre: 'Proyectores',  icono: 'proyector' },
    { cat: 70, nombre: 'Sillas',       icono: 'silla' },
    { cat: 5,  nombre: 'Accesorios',   icono: 'enchufe' },
    { cat: 60, nombre: 'Software',     icono: 'software' },
    { cat: 79, nombre: 'Tablets',      icono: 'tablet' },
    { cat: 18, nombre: 'Servicios',    icono: 'servicio' }
  ];

  var BENEFICIOS = [
    { icono: 'camion',  titulo: 'Envíos a todo el país', texto: 'o retiro en el local' },
    { icono: 'tarjeta', titulo: 'Hasta 18 cuotas fijas', texto: 'con tarjeta de crédito' },
    { icono: 'factura', titulo: 'Factura A',             texto: 'para empresas' },
    { icono: 'local',   titulo: '+22 años',              texto: 'Local en Galería Jardín' }
  ];

  /* ---------- 2. ÍCONOS SVG ---------- */
  var ICONOS = {
    pc:        '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M7 20h10M9 16v4M15 16v4"/>',
    notebook:  '<rect x="5" y="5" width="14" height="10" rx="1"/><path d="M3 19h18"/>',
    cpu:       '<rect x="5" y="5" width="14" height="14" rx="1"/><rect x="9" y="9" width="6" height="6"/><path d="M3 10h2M3 14h2M19 10h2M19 14h2M10 3v2M14 3v2M10 19v2M14 19v2"/>',
    mother:    '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="5" height="5"/><path d="M15 7h2M15 10h2M7 16h10"/>',
    video:     '<rect x="2" y="7" width="20" height="10" rx="1"/><circle cx="8.5" cy="12" r="3"/><circle cx="15.5" cy="12" r="3"/><path d="M4 17v3"/>',
    ram:       '<rect x="2" y="7" width="20" height="9" rx="1"/><path d="M6 10v3M10 10v3M14 10v3M18 10v3M5 16v2M19 16v2"/>',
    ssd:       '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 17h3"/><circle cx="16" cy="17" r="1"/>',
    cooler:    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 10c0-3 1-5 3-5M14 12c3 0 5 1 5 3M12 14c0 3-1 5-3 5M10 12c-3 0-5-1-5-3"/>',
    gabinete:  '<rect x="6" y="2" width="12" height="20" rx="1"/><circle cx="12" cy="8" r="2"/><path d="M9 15h6M9 18h6"/>',
    fuente:    '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
    monitor:   '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v4M8 20h8"/>',
    teclado:   '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>',
    wifi:      '<path d="M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01"/>',
    impresora: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="1"/><rect x="7" y="14" width="10" height="7"/>',
    proyector: '<rect x="2" y="8" width="20" height="9" rx="2"/><circle cx="15" cy="12.5" r="2.5"/><path d="M6 17v2M18 17v2"/>',
    silla:     '<path d="M7 3h10v9H7zM5 12h14M12 12v6M8 21l4-3 4 3"/>',
    enchufe:   '<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5"/>',
    software:  '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/>',
    tablet:    '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/>',
    servicio:  '<path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 0-2-2z"/>',
    camion:    '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    tarjeta:   '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    factura:   '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    local:     '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6"/>',
    flecha:    '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };

  function svg(nombre) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
           (ICONOS[nombre] || '') + '</svg>';
  }

  /* ---------- 3. ESTILOS (CSS) ----------
     Los colores van en variables: arriba los del modo oscuro,
     abajo (html.light) los del modo claro. */
  var CSS = [
    '.cg-cat-activo > :not(#cg-catalogo){display:none!important}',

    /* Colores: modo oscuro (por defecto) */
    '#cg-catalogo{--cc-acento:var(--cg-accent,#d23f86);--cc-texto:#e8e8ec;--cc-titulo:#fff;--cc-suave:#8a8a94;--cc-tenue:#6e6e78;',
      '--cc-tarjeta:#141418;--cc-img:#1b1b20;--cc-borde:#24242a;--cc-icono:#4a4a55;--cc-flecha:#3a3a44;--cc-chip:#b8b8c0;--cc-chip-hover:#fff}',
    /* Colores: modo claro */
    'html.light #cg-catalogo{--cc-texto:#3a3d4a;--cc-titulo:#181a27;--cc-suave:#6b6e7a;--cc-tenue:#8a8d98;',
      '--cc-tarjeta:#fff;--cc-img:#f2f3f6;--cc-borde:#e3e4ea;--cc-icono:#a6a9b4;--cc-flecha:#c4c6ce;--cc-chip:#3a3d4a;--cc-chip-hover:#181a27}',

    '#cg-catalogo{width:100%;max-width:1200px;flex:0 0 100%;margin:0 auto;padding:20px 15px 40px;box-sizing:border-box;color:var(--cc-texto);font-family:\'Manrope\',system-ui,sans-serif}',
    '#cg-catalogo *{box-sizing:border-box}',
    '#cg-catalogo .cg-cat-miga{font-size:12px;color:var(--cc-tenue);margin-bottom:14px}',
    '#cg-catalogo .cg-cat-miga a{color:var(--cc-tenue);text-decoration:none}',
    '#cg-catalogo .cg-cat-miga a:hover{color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-miga span{margin:0 6px}',
    '#cg-catalogo .cg-cat-miga .cg-cat-aqui{color:var(--cc-suave);margin:0}',
    '#cg-catalogo .cg-cat-titulo{display:flex;align-items:center;gap:10px;margin:0;padding:0;font-family:inherit;font-size:22px;font-weight:700;color:var(--cc-titulo);line-height:1.2;text-transform:none;letter-spacing:-.2px}',
    '#cg-catalogo .cg-cat-titulo::before{content:"";flex:0 0 28px;height:2px;background:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-bajada{margin:6px 0 20px 38px;font-size:13px;color:var(--cc-suave)}',
    '#cg-catalogo .cg-cat-grilla{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}',
    '#cg-catalogo .cg-cat-tarjeta{display:block;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);border-radius:10px;overflow:hidden;text-decoration:none!important;transition:border-color .2s,transform .2s}',
    '#cg-catalogo .cg-cat-tarjeta:hover{border-color:var(--cc-acento);transform:translateY(-2px)}',
    '#cg-catalogo .cg-cat-tarjeta:focus-visible{outline:2px solid var(--cc-acento);outline-offset:2px}',
    '#cg-catalogo .cg-cat-img{display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;background:var(--cc-img);border-bottom:1px solid var(--cc-borde);color:var(--cc-icono);transition:color .2s}',
    '#cg-catalogo .cg-cat-img svg{width:38%;height:38%}',
    '#cg-catalogo .cg-cat-pie{display:flex;align-items:flex-end;justify-content:space-between;gap:6px;padding:10px 12px 12px}',
    '#cg-catalogo .cg-cat-pie b{display:block;font-size:13px;font-weight:700;color:var(--cc-titulo);line-height:1.3}',
    '#cg-catalogo .cg-cat-pie small{display:block;font-size:12px;color:var(--cc-tenue);margin-top:2px}',
    '#cg-catalogo .cg-cat-flecha{flex:0 0 16px;width:16px;height:16px;color:var(--cc-flecha);transition:color .2s}',
    '#cg-catalogo .cg-cat-flecha svg{width:16px;height:16px;display:block}',
    '#cg-catalogo .cg-cat-tarjeta:hover .cg-cat-img,#cg-catalogo .cg-cat-tarjeta:hover .cg-cat-flecha{color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-sub{margin:28px 0 10px;font-size:13px;color:var(--cc-suave)}',
    '#cg-catalogo .cg-cat-chips{display:flex;flex-wrap:wrap;gap:8px}',
    '#cg-catalogo .cg-cat-chip{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;font-size:13px;color:var(--cc-chip)!important;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);border-radius:20px;text-decoration:none!important;transition:border-color .2s,color .2s}',
    '#cg-catalogo .cg-cat-chip svg{width:15px;height:15px;color:var(--cc-tenue)}',
    '#cg-catalogo .cg-cat-chip:hover{border-color:var(--cc-acento);color:var(--cc-chip-hover)!important}',
    '#cg-catalogo .cg-cat-benef{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:28px;padding-top:20px;border-top:1px solid var(--cc-borde)}',
    '#cg-catalogo .cg-cat-benef div{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--cc-suave);line-height:1.35}',
    '#cg-catalogo .cg-cat-benef svg{flex:0 0 24px;width:24px;height:24px;color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-benef b{display:block;font-size:13px;font-weight:700;color:var(--cc-titulo)}',
    '@media (max-width:991px){#cg-catalogo .cg-cat-grilla{grid-template-columns:repeat(4,minmax(0,1fr))}}',
    '@media (max-width:600px){',
      '#cg-catalogo{padding:14px 10px 30px}',
      '#cg-catalogo .cg-cat-titulo{font-size:19px}',
      '#cg-catalogo .cg-cat-bajada{margin-left:0}',
      '#cg-catalogo .cg-cat-grilla{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}',
      '#cg-catalogo .cg-cat-pie{padding:8px}',
      '#cg-catalogo .cg-cat-pie b{font-size:12px}',
      '#cg-catalogo .cg-cat-pie small{font-size:11px}',
      '#cg-catalogo .cg-cat-flecha{display:none}',
      '#cg-catalogo .cg-cat-benef{grid-template-columns:repeat(2,minmax(0,1fr))}',
    '}',
    '@media (prefers-reduced-motion:reduce){#cg-catalogo *{transition:none!important}#cg-catalogo .cg-cat-tarjeta:hover{transform:none}}'
  ].join('\n');

  function ponerEstilos() {
    if (document.getElementById('cg-catalogo-css')) return;
    var st = document.createElement('style');
    st.id = 'cg-catalogo-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- 4. DETECTAR LA PÁGINA ---------- */
  function esPaginaCatalogo() {
    var ruta = decodeURIComponent(location.pathname);
    return /^\/ARTICULOS\/m=0\/BUS=;?\/compugarden\.aspx$/i.test(ruta);
  }

  /* ---------- 5. LEER CANTIDADES DEL FILTRO DE GBP ---------- */
  function leerCantidades() {
    var cant = {};
    var links = document.querySelectorAll('a[href*="SCAT_ID=-1"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      var m = href.match(/CAT_ID=(\d+)\/SCAT_ID=-1\//i);
      var c = (links[i].textContent || '').match(/\((\d+)\)\s*$/);
      if (m && c) cant[m[1]] = parseInt(c[1], 10);
    }
    return cant;
  }

  /* ---------- 6. ARMAR EL HTML DEL CATÁLOGO ---------- */
  function link(cat) {
    return '/ARTICULOS/CAT_ID=' + cat + '/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/compugarden.aspx';
  }

  function textoCant(n) {
    return n === 1 ? '1 producto' : n.toLocaleString('es-AR') + ' productos';
  }

  function armar(cant) {
    var hayDatos = Object.keys(cant).length > 0;
    function visible(c) { return !hayDatos || cant[c.cat] > 0; }

    var h = '';
    h += '<nav class="cg-cat-miga"><a href="/">Inicio</a><span>/</span>' +
         '<span class="cg-cat-aqui">Categorías</span></nav>';
    h += '<h1 class="cg-cat-titulo">' + TEXTOS.titulo + '</h1>';
    h += '<p class="cg-cat-bajada">' + TEXTOS.bajada + '</p>';

    h += '<div class="cg-cat-grilla">';
    PRINCIPALES.forEach(function (c) {
      if (!visible(c)) return;
      var n = cant[c.cat];
      h += '<a class="cg-cat-tarjeta" href="' + link(c.cat) + '">' +
             '<span class="cg-cat-img">' + svg(c.icono) + '</span>' +
             '<span class="cg-cat-pie"><span><b>' + c.nombre + '</b>' +
               (n ? '<small>' + textoCant(n) + '</small>' : '') + '</span>' +
               '<span class="cg-cat-flecha">' + svg('flecha') + '</span>' +
             '</span>' +
           '</a>';
    });
    h += '</div>';

    var chips = CHIPS.filter(visible);
    if (chips.length) {
      h += '<div class="cg-cat-sub">' + TEXTOS.otras + '</div><div class="cg-cat-chips">';
      chips.forEach(function (c) {
        h += '<a class="cg-cat-chip" href="' + link(c.cat) + '">' + svg(c.icono) + c.nombre + '</a>';
      });
      h += '</div>';
    }

    h += '<div class="cg-cat-benef">';
    BENEFICIOS.forEach(function (b) {
      h += '<div>' + svg(b.icono) + '<span><b>' + b.titulo + '</b>' + b.texto + '</span></div>';
    });
    h += '</div>';

    var sec = document.createElement('section');
    sec.id = 'cg-catalogo';
    sec.innerHTML = h;
    return sec;
  }

  /* ---------- 7. OCULTAR EL LISTADO E INSERTAR ---------- */
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

  /* ---------- 8. ARRANQUE ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
