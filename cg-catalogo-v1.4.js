/* ==========================================================
   cg-catalogo-v1.4.js — Compugarden
   Convierte la página de todos los artículos (búsqueda vacía)
   en un catálogo de categorías tipo "bento".
   Incluye su propio CSS: no hace falta tocar cg-diseno.css.
   v1.2: tarjetas grandes con las fotos de la home (carpeta
         bottom-boxes del repo), chips que llevan directo a cada
         subcategoría y tamaños según la importancia.
   ----------------------------------------------------------
   ÍNDICE
   1. Configuración: textos, fotos, categorías, chips y beneficios
   2. Íconos SVG
   3. Estilos (CSS) — oscuro y claro
   4. Detectar la página
   5. Leer cantidades y subcategorías del filtro de GBP
   6. Armar el HTML del catálogo
   7. Ocultar el listado original e insertar el catálogo
   8. Arranque
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. CONFIGURACIÓN ---------- */
  var TEXTOS = {
    titulo: 'Explorá por categoría',
    bajada: 'asesoramiento de especialistas en cada compra',
    otras: 'También tenemos'
  };

  /* Fotos: las mismas de las tarjetas de la home, pasadas por wsrv.nl (WebP y más livianas) */
  var FOTOS = 'https://wsrv.nl/?url=cdn.jsdelivr.net/gh/Marketingcg/compugarden@main/bottom-boxes/';
  function foto(archivo, ancho) { return FOTOS + archivo + '&w=' + ancho + '&output=webp&q=80'; }

  /* tipo: foto (grande con imagen) · media (ancha con ícono) · chica · ancha (con imagen a la derecha)
     chips: { t: texto del chip, b: qué buscar en el nombre de la subcategoría, e: qué evitar }
     Un chip solo aparece si GBP tiene esa subcategoría en el filtro de la página. */
  var PRINCIPALES = [
    { cat: 68, nombre: 'PC armadas', tipo: 'foto', img: 'pc.jpg', sub: 'Equipos listos para usar',
      chips: [ { t: 'Gamer de entrada', b: /entrada/i }, { t: 'Alto rendimiento', b: /alto rend/i },
               { t: 'Streaming', b: /stream/i }, { t: 'Home office', b: /home ?office|estudio/i },
               { t: 'Diseño y edición', b: /dise[ñn]o|edici/i }, { t: 'Mini PC', b: /mini ?pc/i } ] },
    { cat: 48, nombre: 'Placas de video', tipo: 'foto', img: 'video.jpg', sub: 'Más FPS, más detalle',
      chips: [ { t: 'Nvidia GeForce', b: /nvidia|geforce/i, e: /quadro/i }, { t: 'AMD Radeon', b: /radeon/i },
               { t: 'Quadro', b: /quadro/i } ] },
    { cat: 52, nombre: 'Procesadores', tipo: 'media', icono: 'cpu', sub: 'AMD Ryzen e Intel Core' },
    { cat: 47, nombre: 'Motherboards', tipo: 'media', icono: 'mother', sub: 'Para AMD e Intel' },
    { cat: 56, nombre: 'Notebooks',      tipo: 'chica', icono: 'notebook' },
    { cat: 50, nombre: 'Memorias RAM',   tipo: 'chica', icono: 'ram' },
    { cat: 53, nombre: 'Almacenamiento', tipo: 'chica', icono: 'ssd' },
    { cat: 75, nombre: 'Refrigeración',  tipo: 'chica', icono: 'cooler' },
    { cat: 1,  nombre: 'Gabinetes',      tipo: 'chica', icono: 'gabinete' },
    { cat: 7,  nombre: 'Fuentes',        tipo: 'chica', icono: 'fuente' },
    { cat: 59, nombre: 'Monitores', tipo: 'ancha', img: 'moni.jpg', icono: 'monitor',
      chips: [ { t: '60 Hz', b: /(^|\D)60 ?hz/i }, { t: '75 a 100 Hz', b: /(^|\D)75/i },
               { t: '165 Hz', b: /165/i }, { t: '180 Hz o más', b: /180|200 ?hz/i } ] },
    { cat: 10, nombre: 'Periféricos', tipo: 'ancha', img: 'peri.jpg', icono: 'teclado',
      chips: [ { t: 'Teclados', b: /teclado/i }, { t: 'Mouse', b: /^mouse(?!.*pad)/i },
               { t: 'Auriculares', b: /auricular/i }, { t: 'Webcam', b: /webcam/i } ] }
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

  function svg(nombre, trazo, grosor) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="' + (trazo || 'currentColor') + '" stroke-width="' + (grosor || 1.5) + '" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS[nombre] || '') + '</svg>';
  }

  /* ---------- 3. ESTILOS (CSS) ---------- */
  var CSS = [
    '.cg-cat-activo > :not(#cg-catalogo){display:none!important}',

    /* Colores: modo oscuro (por defecto) y modo claro */
    '#cg-catalogo{--cc-acento:var(--cg-accent,#d23f86);--cc-texto:#e8e8ec;--cc-titulo:#fff;--cc-suave:#8a8a94;--cc-tenue:#6e6e78;',
      '--cc-tarjeta:#141418;--cc-tarjeta2:#191920;--cc-borde:#24242a;--cc-icono:#6a6a76;--cc-chip:#b8b8c0;--cc-chip-fondo:#1c1c22}',
    'html.light #cg-catalogo{--cc-texto:#3a3d4a;--cc-titulo:#181a27;--cc-suave:#6b6e7a;--cc-tenue:#8a8d98;',
      '--cc-tarjeta:#fff;--cc-tarjeta2:#f6f6f9;--cc-borde:#e3e4ea;--cc-icono:#9a9daa;--cc-chip:#3a3d4a;--cc-chip-fondo:#f2f3f6}',

    '#cg-catalogo{width:100%;max-width:1200px;flex:0 0 100%;margin:0 auto;padding:22px 15px 44px;box-sizing:border-box;color:var(--cc-texto);font-family:\'Manrope\',system-ui,sans-serif}',
    '#cg-catalogo *{box-sizing:border-box}',

    /* Encabezado */
    '#cg-catalogo .cg-cat-miga{font-size:12px;color:var(--cc-tenue);margin-bottom:14px}',
    '#cg-catalogo .cg-cat-miga a{color:var(--cc-tenue);text-decoration:none}',
    '#cg-catalogo .cg-cat-miga a:hover{color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-miga span{margin:0 6px}',
    '#cg-catalogo .cg-cat-miga .cg-cat-aqui{color:var(--cc-suave);margin:0}',
    '#cg-catalogo .cg-cat-titulo{margin:0;padding:0;font-family:inherit;font-size:26px;font-weight:800;color:var(--cc-titulo);line-height:1.15;text-transform:none;letter-spacing:-.4px}',
    '#cg-catalogo .cg-cat-raya{display:block;width:64px;height:3px;border-radius:3px;margin:10px 0 8px;background:linear-gradient(90deg,#ff1fb4,#1e90ff)}',
    '#cg-catalogo .cg-cat-bajada{margin:0 0 22px;font-size:13px;color:var(--cc-suave)}',
    '#cg-catalogo .cg-cat-bajada b{color:var(--cc-titulo);font-weight:700}',

    /* Grilla bento */
    '#cg-catalogo .cg-b{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-auto-rows:128px;gap:12px;grid-auto-flow:dense}',
    '#cg-catalogo .cg-t{position:relative;overflow:hidden;isolation:isolate;border-radius:14px;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);',
      'display:flex;flex-direction:column;justify-content:flex-end;padding:16px;transition:transform .25s,border-color .25s,box-shadow .25s}',
    '#cg-catalogo .cg-t:hover{transform:translateY(-3px);border-color:var(--cc-acento);box-shadow:0 14px 34px -16px rgba(210,63,134,.55)}',
    '#cg-catalogo .cg-t-link{position:absolute;inset:0;z-index:3;border-radius:inherit}',
    '#cg-catalogo .cg-t-link:focus-visible{outline:2px solid var(--cc-acento);outline-offset:2px}',
    '#cg-catalogo .cg-t-cont{position:relative;z-index:2;pointer-events:none}',
    '#cg-catalogo .cg-t-n{display:block;font-size:14px;font-weight:700;color:var(--cc-titulo);line-height:1.25}',
    '#cg-catalogo .cg-t-k{display:block;font-size:12px;color:var(--cc-tenue);margin-top:3px}',
    '#cg-catalogo .cg-t-flecha{position:absolute;top:14px;right:14px;z-index:2;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;',
      'color:var(--cc-icono);background:var(--cc-chip-fondo);transition:color .25s,background .25s,transform .25s}',
    '#cg-catalogo .cg-t-flecha svg{width:15px;height:15px}',
    '#cg-catalogo .cg-t:hover .cg-t-flecha{color:#fff;background:var(--cc-acento);transform:translateX(2px)}',

    /* Chips de subcategorías (quedan por encima del link de la tarjeta) */
    '#cg-catalogo .cg-t-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}',
    '#cg-catalogo .cg-t-chips a{pointer-events:auto;position:relative;z-index:4;font-size:12px;font-weight:600;color:var(--cc-chip)!important;text-decoration:none!important;',
      'background:var(--cc-chip-fondo);border:1px solid var(--cc-borde);border-radius:20px;padding:4px 10px;transition:border-color .2s,color .2s,background .2s}',
    '#cg-catalogo .cg-t-chips a:hover{border-color:var(--cc-acento);color:#fff!important;background:var(--cc-acento)}',

    /* Tarjeta grande con foto */
    '#cg-catalogo .cg-t-foto{grid-column:span 2;grid-row:span 2;background:#0e0e12;border-color:#24242a;padding:20px}',
    '#cg-catalogo .cg-t-foto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 38%;z-index:0;transition:transform .6s ease}',
    '#cg-catalogo .cg-t-foto:hover img{transform:scale(1.05)}',
    '#cg-catalogo .cg-t-foto::after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(10,10,14,.97) 0%,rgba(10,10,14,.82) 28%,rgba(10,10,14,.15) 62%,rgba(10,10,14,0) 100%)}',
    '#cg-catalogo .cg-t-foto .cg-t-n{font-size:22px;font-weight:800;color:#fff;letter-spacing:-.3px}',
    '#cg-catalogo .cg-t-foto .cg-t-k{color:#b4b4be;font-size:13px}',
    '#cg-catalogo .cg-t-foto .cg-t-raya{display:block;width:34px;height:3px;border-radius:3px;background:var(--cc-acento);margin-bottom:10px}',
    '#cg-catalogo .cg-t-foto .cg-t-flecha{background:rgba(20,20,26,.6);color:#fff;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}',
    '#cg-catalogo .cg-t-foto .cg-t-chips a{background:rgba(20,20,26,.65);border-color:rgba(255,255,255,.14);color:#e8e8ec!important;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}',
    '#cg-catalogo .cg-t-foto .cg-t-chips a:hover{background:var(--cc-acento);border-color:var(--cc-acento)}',

    /* Tarjeta media con ícono grande de fondo en degradé de marca */
    '#cg-catalogo .cg-t-media{grid-column:span 2;background:linear-gradient(135deg,var(--cc-tarjeta2),var(--cc-tarjeta))}',
    '#cg-catalogo .cg-t-media .cg-t-fondo{position:absolute;right:-14px;bottom:-26px;width:150px;height:150px;z-index:0;opacity:.32;transition:opacity .3s,transform .5s}',
    '#cg-catalogo .cg-t-media:hover .cg-t-fondo{opacity:.6;transform:rotate(-6deg) scale(1.05)}',
    '#cg-catalogo .cg-t-media .cg-t-n{font-size:17px;font-weight:800}',

    /* Tarjeta chica */
    '#cg-catalogo .cg-t-chica{justify-content:space-between;padding:14px}',
    '#cg-catalogo .cg-t-ico{position:relative;z-index:2;width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;',
      'background:var(--cc-chip-fondo);color:var(--cc-icono);transition:color .25s,background .25s}',
    '#cg-catalogo .cg-t-ico svg{width:22px;height:22px}',
    '#cg-catalogo .cg-t-chica:hover .cg-t-ico{color:#fff;background:linear-gradient(135deg,#ff1fb4,#d23f86)}',
    '#cg-catalogo .cg-t-chica .cg-t-flecha{width:26px;height:26px;top:12px;right:12px}',

    /* Tarjeta ancha con foto a la derecha */
    '#cg-catalogo .cg-t-ancha{grid-column:span 3;justify-content:center;padding:16px 18px}',
    '#cg-catalogo .cg-t-ancha img{position:absolute;top:0;right:0;width:58%;height:100%;object-fit:cover;object-position:50% 40%;z-index:0;transition:transform .6s ease;',
      '-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 45%);mask-image:linear-gradient(to right,transparent 0%,#000 45%)}',
    '#cg-catalogo .cg-t-ancha:hover img{transform:scale(1.06)}',
    '#cg-catalogo .cg-t-ancha .cg-t-cont{max-width:62%}',
    '#cg-catalogo .cg-t-ancha .cg-t-n{font-size:17px;font-weight:800}',
    '#cg-catalogo .cg-t-ancha .cg-t-chips{margin-top:8px}',
    '#cg-catalogo .cg-t-ancha .cg-t-flecha{background:rgba(20,20,26,.6);color:#fff}',

    /* También tenemos + beneficios */
    '#cg-catalogo .cg-cat-otras{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:22px}',
    '#cg-catalogo .cg-cat-otras > span{font-size:13px;color:var(--cc-suave);margin-right:4px}',
    '#cg-catalogo .cg-cat-chip{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;font-size:13px;color:var(--cc-chip)!important;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);border-radius:20px;text-decoration:none!important;transition:border-color .2s,color .2s}',
    '#cg-catalogo .cg-cat-chip svg{width:15px;height:15px;color:var(--cc-tenue)}',
    '#cg-catalogo .cg-cat-chip:hover{border-color:var(--cc-acento);color:var(--cc-titulo)!important}',
    '#cg-catalogo .cg-cat-benef{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}',
    '#cg-catalogo .cg-cat-benef div{display:flex;align-items:center;gap:12px;padding:14px;border-radius:12px;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);font-size:12px;color:var(--cc-suave);line-height:1.35}',
    '#cg-catalogo .cg-cat-benef i{flex:0 0 38px;width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(210,63,134,.12);color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-benef svg{width:20px;height:20px}',
    '#cg-catalogo .cg-cat-benef b{display:block;font-size:13px;font-weight:700;color:var(--cc-titulo)}',

    /* Tablet */
    '@media (max-width:991px){',
      '#cg-catalogo .cg-b{grid-template-columns:repeat(4,minmax(0,1fr))}',
      '#cg-catalogo .cg-t-ancha{grid-column:span 4}',
      '#cg-catalogo .cg-cat-benef{grid-template-columns:repeat(2,minmax(0,1fr))}',
    '}',
    /* Celular */
    '@media (max-width:600px){',
      '#cg-catalogo{padding:14px 10px 30px}',
      '#cg-catalogo .cg-cat-titulo{font-size:21px}',
      '#cg-catalogo .cg-b{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:112px;gap:8px}',
      '#cg-catalogo .cg-t-foto,#cg-catalogo .cg-t-ancha{grid-column:span 2}',
      '#cg-catalogo .cg-t-media{grid-column:span 1;padding:12px}',
      '#cg-catalogo .cg-t-media .cg-t-n{font-size:14px}',
      '#cg-catalogo .cg-t-media .cg-t-fondo{width:96px;height:96px;right:-10px;bottom:-18px;opacity:.16}',
      '#cg-catalogo .cg-t-media .cg-t-flecha{width:26px;height:26px;top:12px;right:12px}',
      '#cg-catalogo .cg-t-foto{grid-row:span 2;padding:16px}',
      '#cg-catalogo .cg-t-foto .cg-t-n{font-size:19px}',
      '#cg-catalogo .cg-t-chica{padding:12px}',
      '#cg-catalogo .cg-t-chica .cg-t-n{font-size:13px}',
      '#cg-catalogo .cg-t-ancha .cg-t-cont{max-width:70%}',
      '#cg-catalogo .cg-t-ancha .cg-t-chips a:nth-child(n+3){display:none}',
      '#cg-catalogo .cg-cat-benef{grid-template-columns:1fr 1fr;gap:8px}',
      '#cg-catalogo .cg-cat-benef div{padding:10px;gap:8px}',
      '#cg-catalogo .cg-cat-benef i{flex-basis:32px;width:32px;height:32px}',
    '}',
    '@media (prefers-reduced-motion:reduce){#cg-catalogo *{transition:none!important}#cg-catalogo .cg-t:hover,#cg-catalogo .cg-t:hover img,#cg-catalogo .cg-t:hover .cg-t-fondo{transform:none}}'
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
    /* v1.4: también en la dirección rápida /ARTICULOS/CAT_ID=-1/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/ */
    return /^\/ARTICULOS\/(m=0\/BUS=;?|CAT_ID=-1\/SCAT_ID=-1\/SCA_ID=-1\/m=0\/BUS=;?)\/compugarden\.aspx$/i.test(ruta);
  }

  /* ---------- 5. LEER CANTIDADES Y SUBCATEGORÍAS DEL FILTRO DE GBP ---------- */
  function leerFiltro() {
    var cant = {}, subs = [];
    var links = document.querySelectorAll('a[href*="SCAT_ID="]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      var txt = (links[i].textContent || '').replace(/\s+/g, ' ').trim();
      var c = txt.match(/\((\d+)\)\s*$/);
      var n = c ? parseInt(c[1], 10) : null;
      var nombre = txt.replace(/\(\d+\)\s*$/, '').trim();
      var mc = href.match(/CAT_ID=(\d+)\/SCAT_ID=-1\//i);
      if (mc) { if (n !== null) cant[mc[1]] = n; continue; }
      if (/SCAT_ID=\d+/i.test(href) && nombre) subs.push({ nombre: nombre, href: href, n: n });
    }
    /* Primero los del filtro (traen cantidad), después los del menú */
    subs.sort(function (a, b) { return (a.n === null) - (b.n === null); });
    var total = null;
    var m = (document.body.textContent || '').match(/Total:\s*(\d+)/);
    if (m) total = parseInt(m[1], 10);
    return { cant: cant, subs: subs, total: total };
  }

  function resolverChips(defs, subs, usados) {
    var out = [];
    (defs || []).forEach(function (d) {
      for (var i = 0; i < subs.length; i++) {
        var s = subs[i];
        if (usados[s.href] || s.n === 0) continue;
        if (d.b.test(s.nombre) && !(d.e && d.e.test(s.nombre))) {
          usados[s.href] = 1;
          out.push({ t: d.t, href: s.href });
          break;
        }
      }
    });
    return out;
  }

  /* ---------- 6. ARMAR EL HTML DEL CATÁLOGO ---------- */
  function link(cat) {
    return '/ARTICULOS/CAT_ID=' + cat + '/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/compugarden.aspx';
  }
  function miles(n) { return n.toLocaleString('es-AR'); }
  function textoCant(n) { return n === 1 ? '1 producto' : miles(n) + ' productos'; }

  function htmlChips(chips) {
    if (!chips.length) return '';
    return '<span class="cg-t-chips">' + chips.map(function (c) {
      return '<a href="' + c.href + '">' + c.t + '</a>';
    }).join('') + '</span>';
  }

  function tarjeta(c, datos, usados) {
    var n = datos.cant[c.cat];
    var detalle = c.sub ? (c.sub + (n ? ' · ' + textoCant(n) : '')) : (n ? textoCant(n) : '');
    var chips = htmlChips(resolverChips(c.chips, datos.subs, usados));
    var base = '<a class="cg-t-link" href="' + link(c.cat) + '" aria-label="' + c.nombre + '"></a>' +
               '<span class="cg-t-flecha">' + svg('flecha', null, 2) + '</span>';
    var texto = '<span class="cg-t-n">' + c.nombre + '</span>' + (detalle ? '<span class="cg-t-k">' + detalle + '</span>' : '');

    if (c.tipo === 'foto') {
      return '<div class="cg-t cg-t-foto">' +
               '<img src="' + foto(c.img, 900) + '" alt="" decoding="async" fetchpriority="high">' + base +
               '<span class="cg-t-cont"><span class="cg-t-raya"></span>' + texto + chips + '</span></div>';
    }
    if (c.tipo === 'media') {
      return '<div class="cg-t cg-t-media"><span class="cg-t-fondo">' + svg(c.icono, 'url(#cg-cat-grad)', 1) + '</span>' + base +
               '<span class="cg-t-cont">' + texto + chips + '</span></div>';
    }
    if (c.tipo === 'ancha') {
      return '<div class="cg-t cg-t-ancha">' +
               '<img src="' + foto(c.img, 700) + '" alt="" decoding="async">' + base +
               '<span class="cg-t-cont">' + texto + chips + '</span></div>';
    }
    return '<div class="cg-t cg-t-chica"><span class="cg-t-ico">' + svg(c.icono) + '</span>' + base +
             '<span class="cg-t-cont">' + texto + '</span></div>';
  }

  function armar(datos) {
    var hayDatos = Object.keys(datos.cant).length > 0;
    function visible(c) { return !hayDatos || datos.cant[c.cat] > 0; }
    var usados = {};

    var h = '';
    /* Degradé de marca para los íconos grandes */
    h += '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="cg-cat-grad" x1="0" y1="0" x2="1" y2="1">' +
         '<stop offset="0" stop-color="#ff1fb4"/><stop offset="1" stop-color="#1e90ff"/></linearGradient></defs></svg>';
    h += '<nav class="cg-cat-miga"><a href="/">Inicio</a><span>/</span><span class="cg-cat-aqui">Categorías</span></nav>';
    h += '<h1 class="cg-cat-titulo">' + TEXTOS.titulo + '</h1><span class="cg-cat-raya"></span>';
    h += '<p class="cg-cat-bajada">' + (datos.total ? '<b>' + miles(datos.total) + ' productos</b> y ' : 'Productos y ') + TEXTOS.bajada + '</p>';

    h += '<div class="cg-b">';
    PRINCIPALES.forEach(function (c) { if (visible(c)) h += tarjeta(c, datos, usados); });
    h += '</div>';

    var chips = CHIPS.filter(visible);
    if (chips.length) {
      h += '<div class="cg-cat-otras"><span>' + TEXTOS.otras + '</span>';
      chips.forEach(function (c) {
        h += '<a class="cg-cat-chip" href="' + link(c.cat) + '">' + svg(c.icono) + c.nombre + '</a>';
      });
      h += '</div>';
    }

    h += '<div class="cg-cat-benef">';
    BENEFICIOS.forEach(function (b) {
      h += '<div><i>' + svg(b.icono) + '</i><span><b>' + b.titulo + '</b>' + b.texto + '</span></div>';
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
    var sec = armar(leerFiltro());
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
