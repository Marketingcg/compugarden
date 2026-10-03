/* ==========================================================
   cg-catalogo-v1.5.js — Compugarden
   Convierte la página de todos los artículos (búsqueda vacía)
   en un catálogo de categorías ordenado por secciones.
   Sin imágenes: cada tarjeta lleva un ícono grande con el
   degradé de la marca. Incluye su propio CSS.
   v1.5: secciones (Computadoras, Componentes, Monitores y
         periféricos) con el total de productos de cada una;
         reconoce también la dirección rápida
         /ARTICULOS/CAT_ID=-1/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/
   ----------------------------------------------------------
   ÍNDICE
   1. Configuración: textos, secciones, chips y beneficios
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

  /* Cada tarjeta: cat (ID de GBP), nombre, icono, sub (texto chico, opcional),
     tam: ancho en la grilla de 12 columnas (3, 4, 6 u 8),
     alto: 'alta' (tarjeta grande) o 'baja' (tarjeta compacta),
     chips: { t: texto del chip, b: qué buscar en el nombre de la subcategoría, e: qué evitar }.
     Un chip solo aparece si GBP tiene esa subcategoría en el filtro de la página. */
  var SECCIONES = [
    { titulo: 'Computadoras', tarjetas: [
      { cat: 68, nombre: 'PC armadas', icono: 'pc', tam: 8, alto: 'alta', sub: 'Equipos listos para usar',
        chips: [ { t: 'Gamer de entrada', b: /entrada/i }, { t: 'Alto rendimiento', b: /alto rend/i },
                 { t: 'Streaming', b: /stream/i }, { t: 'Home office', b: /home ?office|estudio/i },
                 { t: 'Diseño y edición', b: /dise[ñn]o|edici/i }, { t: 'Mini PC', b: /mini ?pc/i } ] },
      { cat: 56, nombre: 'Notebooks', icono: 'notebook', tam: 4, alto: 'alta', sub: 'Para trabajar y estudiar',
        chips: [ { t: 'AMD', b: /notebooks?\s.*amd|amd.*notebook/i }, { t: 'Intel', b: /notebooks?\s.*intel|intel.*notebook/i } ] }
    ] },
    { titulo: 'Componentes', tarjetas: [
      { cat: 48, nombre: 'Placas de video', icono: 'video', tam: 3, alto: 'alta', sub: 'Más FPS, más detalle',
        chips: [ { t: 'Nvidia', b: /nvidia|geforce/i, e: /quadro/i }, { t: 'AMD Radeon', b: /radeon/i },
                 { t: 'Quadro', b: /quadro/i } ] },
      { cat: 52, nombre: 'Procesadores',  icono: 'cpu',    tam: 3, alto: 'alta', sub: 'AMD Ryzen e Intel Core' },
      { cat: 47, nombre: 'Motherboards',  icono: 'mother', tam: 3, alto: 'alta', sub: 'Para AMD e Intel' },
      { cat: 50, nombre: 'Memorias RAM',  icono: 'ram',    tam: 3, alto: 'alta', sub: 'Para PC y notebook' },
      { cat: 53, nombre: 'Almacenamiento', icono: 'ssd',      tam: 3, alto: 'baja' },
      { cat: 75, nombre: 'Refrigeración',  icono: 'cooler',   tam: 3, alto: 'baja' },
      { cat: 1,  nombre: 'Gabinetes',      icono: 'gabinete', tam: 3, alto: 'baja' },
      { cat: 7,  nombre: 'Fuentes',        icono: 'fuente',   tam: 3, alto: 'baja' }
    ] },
    { titulo: 'Monitores y periféricos', tarjetas: [
      { cat: 59, nombre: 'Monitores', icono: 'monitor', tam: 6, alto: 'alta', sub: 'Gaming, oficina y diseño',
        chips: [ { t: '60 Hz', b: /(^|\D)60 ?hz/i }, { t: '75 a 100 Hz', b: /(^|\D)75/i },
                 { t: '165 Hz', b: /165/i }, { t: '180 Hz o más', b: /180|200 ?hz/i } ] },
      { cat: 10, nombre: 'Periféricos', icono: 'teclado', tam: 6, alto: 'alta', sub: 'Teclados, mouse, audio y más',
        chips: [ { t: 'Teclados', b: /teclado/i }, { t: 'Mouse', b: /^mouse(?!.*pad)/i },
                 { t: 'Auriculares', b: /auricular/i }, { t: 'Webcam', b: /webcam/i } ] }
    ] }
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
    video:     '<rect x="2" y="7" width="20" height="10" rx="1"/><circle cx="8.5" cy="12" r="3"/><circle cx="15.5" cy="12" r="3"/><path d="M4 17v3"/>',
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
      '--cc-tarjeta:#131317;--cc-tarjeta2:#1b1b22;--cc-borde:#24242b;--cc-icono:#6a6a76;--cc-chip:#c4c4cc;--cc-chip-fondo:#1f1f27;--cc-brillo:rgba(210,63,134,.16);--cc-arte:.34}',
    'html.light #cg-catalogo{--cc-texto:#3a3d4a;--cc-titulo:#181a27;--cc-suave:#6b6e7a;--cc-tenue:#8a8d98;',
      '--cc-tarjeta:#fff;--cc-tarjeta2:#f7f7fa;--cc-borde:#e3e4ea;--cc-icono:#9a9daa;--cc-chip:#3a3d4a;--cc-chip-fondo:#f1f2f6;--cc-brillo:rgba(210,63,134,.09);--cc-arte:.42}',

    '#cg-catalogo{width:100%;max-width:1200px;flex:0 0 100%;margin:0 auto;padding:22px 15px 44px;box-sizing:border-box;color:var(--cc-texto);font-family:\'Manrope\',system-ui,sans-serif}',
    '#cg-catalogo *{box-sizing:border-box}',

    /* Encabezado de la página */
    '#cg-catalogo .cg-cat-miga{font-size:12px;color:var(--cc-tenue);margin-bottom:14px}',
    '#cg-catalogo .cg-cat-miga a{color:var(--cc-tenue);text-decoration:none}',
    '#cg-catalogo .cg-cat-miga a:hover{color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-miga span{margin:0 6px}',
    '#cg-catalogo .cg-cat-miga .cg-cat-aqui{color:var(--cc-suave);margin:0}',
    '#cg-catalogo .cg-cat-titulo{margin:0;padding:0;font-family:inherit;font-size:26px;font-weight:800;color:var(--cc-titulo);line-height:1.15;text-transform:none;letter-spacing:-.4px}',
    '#cg-catalogo .cg-cat-raya{display:block;width:64px;height:3px;border-radius:3px;margin:10px 0 8px;background:linear-gradient(90deg,#ff1fb4,#1e90ff)}',
    '#cg-catalogo .cg-cat-bajada{margin:0;font-size:13px;color:var(--cc-suave)}',
    '#cg-catalogo .cg-cat-bajada b{color:var(--cc-titulo);font-weight:700}',

    /* Secciones */
    '#cg-catalogo .cg-sec{margin-top:28px}',
    '#cg-catalogo .cg-sec-cab{display:flex;align-items:center;gap:12px;margin-bottom:12px}',
    '#cg-catalogo .cg-sec-t{margin:0;font-family:inherit;font-size:16px;font-weight:800;color:var(--cc-titulo);letter-spacing:-.2px;text-transform:none;white-space:nowrap}',
    '#cg-catalogo .cg-sec-linea{flex:1;height:1px;background:var(--cc-borde)}',
    '#cg-catalogo .cg-sec-n{font-size:12px;color:var(--cc-tenue);white-space:nowrap}',

    /* Grilla de 12 columnas */
    '#cg-catalogo .cg-g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:12px}',
    '#cg-catalogo .cg-s3{grid-column:span 3}#cg-catalogo .cg-s4{grid-column:span 4}#cg-catalogo .cg-s6{grid-column:span 6}#cg-catalogo .cg-s8{grid-column:span 8}',

    /* Tarjeta (base) */
    '#cg-catalogo .cg-t{position:relative;overflow:hidden;isolation:isolate;border-radius:14px;border:1px solid var(--cc-borde);',
      'background:linear-gradient(150deg,var(--cc-tarjeta2) 0%,var(--cc-tarjeta) 65%);transition:transform .25s,border-color .25s,box-shadow .25s}',
    '#cg-catalogo .cg-t::before{content:"";position:absolute;inset:0;z-index:0;background:radial-gradient(circle at 88% 18%,var(--cc-brillo),transparent 58%);opacity:.8;transition:opacity .3s}',
    '#cg-catalogo .cg-t:hover{transform:translateY(-3px);border-color:var(--cc-acento);box-shadow:0 14px 34px -16px rgba(210,63,134,.5)}',
    '#cg-catalogo .cg-t:hover::before{opacity:1}',
    '#cg-catalogo .cg-t-link{position:absolute;inset:0;z-index:3;border-radius:inherit}',
    '#cg-catalogo .cg-t-link:focus-visible{outline:2px solid var(--cc-acento);outline-offset:2px}',
    '#cg-catalogo .cg-t-cont{position:relative;z-index:2;pointer-events:none}',
    '#cg-catalogo .cg-t-n{display:block;font-size:15px;font-weight:800;color:var(--cc-titulo);line-height:1.25;letter-spacing:-.2px}',
    '#cg-catalogo .cg-t-k{display:block;font-size:12px;color:var(--cc-tenue);margin-top:4px;line-height:1.4}',
    '#cg-catalogo .cg-t-flecha{position:absolute;top:14px;right:14px;z-index:2;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;',
      'color:var(--cc-icono);background:var(--cc-chip-fondo);transition:color .25s,background .25s,transform .25s}',
    '#cg-catalogo .cg-t-flecha svg{width:15px;height:15px}',
    '#cg-catalogo .cg-t:hover .cg-t-flecha{color:#fff;background:var(--cc-acento);transform:translateX(2px)}',

    /* Tarjeta alta: ícono grande con el degradé de la marca */
    '#cg-catalogo .cg-alta{min-height:196px;display:flex;flex-direction:column;justify-content:flex-end;padding:18px}',
    '#cg-catalogo .cg-t-arte{position:absolute;z-index:1;right:-12px;bottom:-22px;width:150px;height:150px;opacity:var(--cc-arte);transition:opacity .3s,transform .5s}',
    '#cg-catalogo .cg-s6 .cg-t-arte{width:170px;height:170px;bottom:-28px}',
    '#cg-catalogo .cg-s8 .cg-t-arte{width:220px;height:220px;right:10px;bottom:-40px}',
    '#cg-catalogo .cg-t:hover .cg-t-arte{opacity:calc(var(--cc-arte) + .3);transform:rotate(-6deg) scale(1.05)}',
    '#cg-catalogo .cg-alta .cg-t-raya{display:block;width:28px;height:3px;border-radius:3px;background:var(--cc-acento);margin-bottom:10px}',
    '#cg-catalogo .cg-s8 .cg-t-n{font-size:22px}',
    '#cg-catalogo .cg-s8 .cg-t-k{font-size:13px}',
    /* En las tarjetas angostas el ícono va arriba a la izquierda, así nunca tapa el texto */
    '#cg-catalogo .cg-s3 .cg-t-arte{top:16px;left:16px;right:auto;bottom:auto;width:64px;height:64px;opacity:.85}',
    '#cg-catalogo .cg-s3:hover .cg-t-arte{opacity:1}',
    '#cg-catalogo .cg-s3.cg-alta{min-height:226px}',

    /* Tarjeta baja: ícono en recuadro + texto en una línea */
    '#cg-catalogo .cg-baja{min-height:84px;display:flex;align-items:center;gap:12px;padding:14px 52px 14px 14px}',
    '#cg-catalogo .cg-t-ico{position:relative;z-index:2;flex:0 0 44px;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;',
      'background:var(--cc-chip-fondo);color:var(--cc-icono);transition:color .25s,background .25s}',
    '#cg-catalogo .cg-t-ico svg{width:22px;height:22px}',
    '#cg-catalogo .cg-baja:hover .cg-t-ico{color:#fff;background:linear-gradient(135deg,#ff1fb4,#d23f86)}',
    '#cg-catalogo .cg-baja .cg-t-flecha{top:50%;margin-top:-14px;width:28px;height:28px}',
    '#cg-catalogo .cg-baja:hover .cg-t-flecha{transform:translateX(2px)}',

    /* Chips de subcategorías (quedan por encima del link de la tarjeta) */
    '#cg-catalogo .cg-t-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}',
    '#cg-catalogo .cg-t-chips a{pointer-events:auto;position:relative;z-index:4;font-size:12px;font-weight:600;color:var(--cc-chip)!important;text-decoration:none!important;',
      'background:var(--cc-chip-fondo);border:1px solid var(--cc-borde);border-radius:20px;padding:4px 10px;transition:border-color .2s,color .2s,background .2s}',
    '#cg-catalogo .cg-t-chips a:hover{border-color:var(--cc-acento);color:#fff!important;background:var(--cc-acento)}',

    /* También tenemos + beneficios */
    '#cg-catalogo .cg-cat-chips{display:flex;flex-wrap:wrap;gap:8px}',
    '#cg-catalogo .cg-cat-chip{display:inline-flex;align-items:center;gap:7px;padding:7px 14px;font-size:13px;color:var(--cc-chip)!important;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);border-radius:20px;text-decoration:none!important;transition:border-color .2s,color .2s}',
    '#cg-catalogo .cg-cat-chip svg{width:15px;height:15px;color:var(--cc-tenue)}',
    '#cg-catalogo .cg-cat-chip:hover{border-color:var(--cc-acento);color:var(--cc-titulo)!important}',
    '#cg-catalogo .cg-cat-benef{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:28px}',
    '#cg-catalogo .cg-cat-benef div{display:flex;align-items:center;gap:12px;padding:14px;border-radius:12px;background:var(--cc-tarjeta);border:1px solid var(--cc-borde);font-size:12px;color:var(--cc-suave);line-height:1.35}',
    '#cg-catalogo .cg-cat-benef i{flex:0 0 38px;width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(210,63,134,.12);color:var(--cc-acento)}',
    '#cg-catalogo .cg-cat-benef svg{width:20px;height:20px}',
    '#cg-catalogo .cg-cat-benef b{display:block;font-size:13px;font-weight:700;color:var(--cc-titulo)}',

    /* Tablet */
    '@media (max-width:991px){',
      '#cg-catalogo .cg-s3{grid-column:span 6}',
      '#cg-catalogo .cg-s4,#cg-catalogo .cg-s8{grid-column:span 12}',
      '#cg-catalogo .cg-cat-benef{grid-template-columns:repeat(2,minmax(0,1fr))}',
    '}',
    /* Celular */
    '@media (max-width:600px){',
      '#cg-catalogo{padding:14px 10px 30px}',
      '#cg-catalogo .cg-cat-titulo{font-size:21px}',
      '#cg-catalogo .cg-sec{margin-top:22px}',
      '#cg-catalogo .cg-g{gap:8px}',
      '#cg-catalogo .cg-s6{grid-column:span 12}',
      '#cg-catalogo .cg-alta{min-height:150px;padding:14px}',
      '#cg-catalogo .cg-s3.cg-alta{min-height:140px}',
      '#cg-catalogo .cg-s3.cg-alta .cg-t-n{font-size:14px}',
      '#cg-catalogo .cg-s3.cg-alta .cg-t-k{display:none}',
      '#cg-catalogo .cg-s3 .cg-t-arte{top:12px;left:12px;width:46px;height:46px}',
      '#cg-catalogo .cg-s3.cg-alta .cg-t-chips{display:none}',
      '#cg-catalogo .cg-s6 .cg-t-arte,#cg-catalogo .cg-s8 .cg-t-arte,#cg-catalogo .cg-s4 .cg-t-arte{opacity:.2}',
      '#cg-catalogo .cg-s8 .cg-t-n{font-size:19px}',
      '#cg-catalogo .cg-s8 .cg-t-arte{width:150px;height:150px;right:-14px;bottom:-26px}',
      '#cg-catalogo .cg-baja{flex-direction:column;align-items:flex-start;justify-content:space-between;min-height:110px;padding:12px;gap:10px}',
      '#cg-catalogo .cg-baja .cg-t-n{font-size:13px}',
      '#cg-catalogo .cg-t-ico{flex-basis:auto;width:38px;height:38px}',
      '#cg-catalogo .cg-baja .cg-t-flecha{top:12px;right:12px;margin-top:0;width:24px;height:24px}',
      '#cg-catalogo .cg-cat-benef{gap:8px}',
      '#cg-catalogo .cg-cat-benef div{padding:10px;gap:8px}',
      '#cg-catalogo .cg-cat-benef i{flex-basis:32px;width:32px;height:32px}',
    '}',
    '@media (prefers-reduced-motion:reduce){#cg-catalogo *{transition:none!important}#cg-catalogo .cg-t:hover,#cg-catalogo .cg-t:hover .cg-t-arte{transform:none}}'
  ].join('\n');

  function ponerEstilos() {
    if (document.getElementById('cg-catalogo-css')) return;
    var st = document.createElement('style');
    st.id = 'cg-catalogo-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- 4. DETECTAR LA PÁGINA ----------
     Dirección rápida: /ARTICULOS/CAT_ID=-1/SCAT_ID=-1/SCA_ID=-1/m=0/BUS=/compugarden.aspx
     Dirección vieja:  /ARTICULOS/m=0/BUS=;/compugarden.aspx */
  function esPaginaCatalogo() {
    var ruta = decodeURIComponent(location.pathname);
    return /^\/ARTICULOS\/(CAT_ID=-1\/SCAT_ID=-1\/SCA_ID=-1\/)?m=0\/BUS=;?\/compugarden\.aspx$/i.test(ruta);
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

  function tarjeta(c, datos, usados) {
    var n = datos.cant[c.cat];
    var clase = 'cg-t cg-s' + c.tam + ' cg-' + c.alto;
    var base = '<a class="cg-t-link" href="' + link(c.cat) + '" aria-label="' + c.nombre + '"></a>' +
               '<span class="cg-t-flecha">' + svg('flecha', null, 2) + '</span>';

    if (c.alto === 'baja') {
      return '<div class="' + clase + '"><span class="cg-t-ico">' + svg(c.icono) + '</span>' + base +
               '<span class="cg-t-cont"><span class="cg-t-n">' + c.nombre + '</span>' +
               (n ? '<span class="cg-t-k">' + textoCant(n) + '</span>' : '') + '</span></div>';
    }

    var detalle = c.sub ? (c.sub + (n ? ' · ' + textoCant(n) : '')) : (n ? textoCant(n) : '');
    var chips = resolverChips(c.chips, datos.subs, usados);
    var htmlChips = chips.length ? '<span class="cg-t-chips">' + chips.map(function (x) {
      return '<a href="' + x.href + '">' + x.t + '</a>';
    }).join('') + '</span>' : '';

    return '<div class="' + clase + '"><span class="cg-t-arte">' + svg(c.icono, 'url(#cg-cat-grad)', 1) + '</span>' + base +
             '<span class="cg-t-cont"><span class="cg-t-raya"></span><span class="cg-t-n">' + c.nombre + '</span>' +
             (detalle ? '<span class="cg-t-k">' + detalle + '</span>' : '') + htmlChips + '</span></div>';
  }

  function cabecera(titulo, n) {
    return '<div class="cg-sec-cab"><h2 class="cg-sec-t">' + titulo + '</h2><span class="cg-sec-linea"></span>' +
           (n ? '<span class="cg-sec-n">' + textoCant(n) + '</span>' : '') + '</div>';
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

    SECCIONES.forEach(function (s) {
      var lista = s.tarjetas.filter(visible);
      if (!lista.length) return;
      var suma = 0;
      lista.forEach(function (c) { suma += datos.cant[c.cat] || 0; });
      h += '<section class="cg-sec">' + cabecera(s.titulo, suma) + '<div class="cg-g">';
      lista.forEach(function (c) { h += tarjeta(c, datos, usados); });
      h += '</div></section>';
    });

    var chips = CHIPS.filter(visible);
    if (chips.length) {
      h += '<section class="cg-sec">' + cabecera(TEXTOS.otras, 0) + '<div class="cg-cat-chips">';
      chips.forEach(function (c) {
        h += '<a class="cg-cat-chip" href="' + link(c.cat) + '">' + svg(c.icono) + c.nombre + '</a>';
      });
      h += '</div></section>';
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
