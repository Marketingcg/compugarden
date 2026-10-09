/* =====================================================================
   cg-armador-v5.4.js — Compugarden · Armador nuevo (una sola página)
   ---------------------------------------------------------------------
   Cómo se prueba:
     - Entrar a /armarpc/armar-pc/compugarden.aspx?cgnuevo=1  → se activa
       en ese navegador (queda guardado).
     - ?cgnuevo=0 lo apaga y vuelve el armador de siempre.
   Qué usa:
     - El script del ERP web.CG.ArmadorGetItems (v1.4) para traer los
       productos de cada paso, con la compatibilidad cargada en el ERP.
     - Los datos ocultos de la página: hidCompId, hidPriceListId, hidWSId.
   Al final manda a la página de compra del ERP (armarpccompra), igual
   que el armador de siempre. Carrito y checkout no se tocan.
   ---------------------------------------------------------------------
   Para cambiar cosas rápido, mirar la parte "CONFIGURACIÓN".
   Historial:
     v1.0 (2026-10) Primera versión: 15 pasos en 4 etapas, panel "Tu PC",
                    filtros, compatibilidad, memoria del armado, link para
                    compartir, revisión de precios y stock al volver.
     v1.1 (2026-10) Más fluido: toda la tarjeta se elige (con tilde y una
                    pausa corta antes de pasar al siguiente paso), los
                    productos de todos los pasos se cargan de fondo, solo
                    cambia la lista (encabezado y panel quedan fijos),
                    tarjetas de espera en vez de "Cargando…", y estilos
                    blindados contra el CSS del sitio.
     v1.2 (2026-10) Al completar el último paso va directo a la página de
                    compra. Al volver, sabe si esa PC ya pasó a la compra
                    ("Modificar esta PC" / "Armar otra PC"). Al retomar, la
                    disponibilidad se revisa con las mismas listas de cada
                    paso (antes miraba un stock que baja con los carritos).
                    "Cambiar" y "Quitar" de la página de compra traen al
                    armador nuevo. El disco 2 no repite el disco 1. Marcas
                    con mayúscula inicial y sin chips de marca en el micro.
     v1.3 (2026-10) Más rápido: pausa al elegir de 0,12 s, el paso nuevo
                    aparece al instante (sin esperar la transición), fotos
                    del paso siguiente precargadas, y mother/memoria
                    compatibles pedidas de fondo apenas se elige micro/mother.
     v1.4 (2026-10) Cantidades: si el stock del ERP llega en 0 (baja con los
                    carritos), no se usa como tope (quedan los slots de la
                    mother y un máximo de 4). Cambiar la cantidad de una
                    tarjeta ya elegida actualiza el panel y el total al instante.
     v1.5 (2026-10) Memoria sin mother (o mother sin micro): ya no muestra
                    todo; pide elegir primero el paso anterior. Red de
                    seguridad DDR4/DDR5 según la mother elegida. La carga de
                    fondo no pide listas sin filtro de compatibilidad.
     v1.6 (2026-10) Un armado de menos de 12 horas se carga solo al entrar
                    (sin cartel). Con el cartel a la vista, tocar un paso
                    primero carga el armado. Botones magenta con texto blanco
                    aunque el CSS del sitio los pise.
     v1.7 (2026-10) Volver desde la compra: abre en el último paso tocado
                    (aunque ya esté elegido), con la franja "Tu PC está lista
                    en la página de compra" y el botón "Volver a la compra".
                    Con todo completo, "Siguiente" pasa a "Volver a la compra".
     v1.8 (2026-10) Paso Armado con dos tarjetas ("Armado de PC" y "Sin
                    armado"). Página de compra con el diseño nuevo: dibuja su
                    propia versión y deja la del ERP escondida; "Agregar al
                    carrito" aprieta el botón original del ERP.
     v5.4 (2026-10) Recorrido pulido. Una sola barra fija abajo en todo el recorrido: en el
                    teléfono "Ver mi PC" abre la lista pegada encima de la barra y el mismo
                    botón dice "Ocultar" (la barra ya no queda tapada); lista de una línea
                    por pieza, toda la fila se toca; sin total ni comprar repetidos adentro;
                    el WhatsApp se esconde mientras está abierta. En la computadora aparece
                    una barra fina abajo cuando la barra de las 15 piezas sale de la pantalla.
                    Resumen: barra fija en el teléfono con "Volver" y "Agregar al carrito"
                    juntos; un solo "Volver al armador"; sin "Último paso". Una sola pantalla
                    de espera (vidrio, ruedita magenta) al ir al resumen y al agregar al
                    carrito; mientras carga el resumen, filas grises con su forma. Sin cuotas
                    con número fijo (panel, resumen y PDF).
     v5.2 (2026-10) Computadora: "Ver PC armadas" es un beneficio más de la fila (botoncito), sin la
                    tarjeta suelta. Teléfono: el título siempre del mismo tamaño y centrado.
     v5.1 (2026-10) Teléfono: el encabezado es solo el título (sin la frase, sin la línea de
                    arriba y sin "Ver PC armadas", también en el encabezado chico).
     v5.0 (2026-10) Encabezado: sin el botón de WhatsApp (computadora y teléfono), queda
                    solo "Ver PC armadas". En el teléfono, sin la fila de beneficios y
                    con todo el encabezado centrado.
     v4.9 (2026-10) Todo adentro: el motor de repetidos y accesorios va dentro del
                    armador (copia del de la web). Ya no usa nada de
                    cg-repetidos-y-filtros: si ese archivo desaparece, el armador
                    funciona igual.
     v4.8 (2026-10) Lo mejor de los dos armadores: los filtros completos del armador
                    viejo (fuente, monitor, periféricos, WiFi, Athlon, Mini-ITX,
                    RGB, Blanco…) con las marcas del ERP y los chips que solo
                    aparecen si sirven. Repetidos: motor de la web y, después, la
                    limpieza propia (nombres idénticos).
     v4.7 (2026-10) Repetidos y accesorios con el mismo motor de la web
                    (cgRepetidos de cg-repetidos-y-filtros): código de fabricante,
                    modelo de micro (tray/caja), nombres de cada proveedor, y queda
                    el del local o el más barato. Si ese archivo no está, usa la
                    limpieza propia.
     v4.6 (2026-10) El presupuesto se imprime en una hoja aparte (iframe, o pestaña
                    nueva en el teléfono) con sus propios estilos: los estilos
                    de impresión de la web ya no lo pueden tapar.
     v4.5 (2026-10) El presupuesto salía en blanco con la web en modo oscuro (el
                    modo oscuro fuerza el texto a blanco): colores forzados.
     v4.4 (2026-10) Presupuesto en PDF con formato de empresa: encabezado con
                    datos fiscales, número, fecha y validez (24 h), líneas para
                    completar, tabla con código, cantidad, precio unitario y
                    subtotal, totales, condiciones y cómo comprar. Se imprime
                    en A4 sin los datos del navegador.
     v4.3 (2026-10) Velocidad: la primera tanda de productos se calcula según la
                    pantalla (columnas × filas visibles + 1) y al bajar se suman
                    2 filas; fotos de la primera fila con prioridad; la precarga
                    espera a que cargue el paso actual; sin desenfoque en las
                    tarjetas. Vidrio en buscador, orden, filtros, botones,
                    avisos, franjas, barra de abajo, "Mi PC" y resumen.
     v4.2 (2026-10) Filtro marcado en vidrio magenta. Teléfono: tarjetas más altas
                    que anchas (foto cuadrada).
     v4.1 (2026-10) Filtro marcado en magenta con texto blanco (se veía en blanco
                    sobre blanco).
     v4.0 (2026-10) Tarjetas nuevas: más finas, texto y precio centrados, sin
                    cuotas, con vidrio. Se cargan más productos solos al bajar
                    (sin "Mostrar más"). Al elegir procesador se precargan de
                    fondo las memorias de las motherboards que se ven primero.
     v3.9 (2026-10) Teléfono: tarjetas más finas (foto más baja, menos relleno,
                    textos un poco más chicos).
     v3.8 (2026-10) Teléfono: beneficios con palabras cortas en una sola fila
                    (Compatible · 1 hora · 18 cuotas · Envíos).
     v3.7 (2026-10) Tarjetas con el nombre original completo del producto (sin el
                    código entre paréntesis), hasta 3 líneas, y sin etiquetas.
     v3.6 (2026-10) Al volver a un armado a medias: franja "Retomamos el armado que
                    habías empezado" con "Seguir armando" y "Empezar de nuevo".
                    Sin la etiqueta "Con gráficos" en las tarjetas (está el
                    filtro). Modo claro: paneles y tarjetas en gris suave.
     v3.5 (2026-10) Tarjeta "No incluir" con mensaje claro ("Ya tengo uno",
                    "La armo yo"…) en vez de foto. "Empezar de nuevo" aparece
                    apenas se tocó algo (producto o "No incluir").
     v3.4 (2026-10) Estilo vidrio esmerilado con resplandores magenta. Encabezado
                    protagonista "Armá tu PC a tu gusto" con beneficios (se
                    achica al empezar). Tarjetas nuevas: nombre corto, datos
                    clave como etiquetas, stock sobre la foto, precio y cuota,
                    sin "Elegir" (la tarjeta es el selector). Total centrado.
                    Teléfono: tira de piezas chica con barra de avance,
                    consejo plegable, "Mi PC" con Copiar link y Empezar de
                    nuevo. La computadora vuelve a su ancho centrado.
     v3.3 (2026-10) Imagen "Imagen próximamente" propia (igual a la de GBP) cuando el
                    producto no tiene código propio (APIEAN) o su foto no carga.
                    Celular: la página ya no se corre de costado, la barra de
                    piezas arranca en el paso actual, barra de abajo con "Mi PC"
                    (lista desde abajo) y el WhatsApp flotante se corre.
     v3.2 (2026-10) Reconoce el rechazo del ERP ("-1,The article was not entered
                    into the shopping cart.!,0"): no va al carrito a medias y
                    dice qué producto no entró y por qué.
     v3.1 (2026-10) "Agregar al carrito" ya no usa el botón del ERP (mandaba todo
                    a la vez y a los 5 s se iba al carrito, perdiendo productos):
                    agrega de a uno con la misma función del ERP, espera cada
                    confirmación y recién al final va al carrito. Si alguno
                    falla, avisa cuál y deja reintentar.
     v3.0 (2026-10) Hasta 3 periféricos. El tercero viaja a la compra como PER3
                    (requiere el bloque ARMADOK3 en la plantilla armarpccompra).
     v2.9 (2026-10) Sin armado, el paso Sistema operativo queda cerrado entero
                    (instalación y licencias); si había uno elegido, se quita.
     v2.8 (2026-10) Un solo paso "Periféricos" con hasta 2 productos (la compra
                    del ERP tiene lugar para 2: TEC y MOU). Reglas: sin gráficos
                    y sin placa de video; sin cooler incluido y "No incluir
                    cooler"; armado sin gabinete o sin fuente; gabinete con
                    fuente; motherboard con WiFi.
     v2.7 (2026-10) Lógica armado / sistema operativo: sin armado no aparece
                    la instalación del sistema (mano de obra), y si ya estaba
                    elegida se quita con un aviso.
     v2.6 (2026-10) Tarjetas de "No incluir" con fotos reales (la del
                    procesador para "Usar el incluido"; un producto del paso,
                    apagado y tachado, para "No incluir"). Si la PC estaba en
                    el carrito y el carrito quedó en 0, el armador arranca vacío.
     v2.5 (2026-10) "No incluir" es una tarjeta más (la primera de la lista)
                    en todos los pasos, como en Armado; las opciones
                    recomendadas ("Usar el cooler incluido", "Usar los gráficos
                    del procesador") van resaltadas en verde.
     v2.4 (2026-10) "Comprar" vuelve a llevar al resumen (ahí se puede cambiar
                    y quitar antes de agregar al carrito). Se mantiene lo demás
                    de la v2.3: una sola PC guardada e íconos.
     v2.3 (2026-10) "Comprar" va directo al carrito: abre la página de compra
                    escondida y aprieta solo el botón del ERP (si falla, muestra
                    el resumen). "Ver resumen y presupuesto" queda como opción.
                    Una sola PC guardada: el resumen siempre muestra esa (si se
                    llega con "atrás" a uno viejo, se corrige solo), "Quitar"
                    actualiza primero lo guardado, y el armador se recarga al
                    volver con "atrás". Logo real de WhatsApp e ícono de PC.
     v2.2 (2026-10) Cambiar algo con la PC completa ya no salta solo a la
                    compra (se queda en el armador con "Cambio guardado").
                    La página de compra se dibuja al instante con lo guardado
                    (nombre y foto de cada pieza) y después actualiza precios.
     v2.1 (2026-10) Retomar al instante (la revisión de stock sigue de fondo,
                    en fila). Si el carrito de la web está vacío, no muestra
                    "ya está en tu carrito". Más compacto: "No incluir" en la
                    línea del buscador, contador al final de los chips, barra
                    de tu PC alineada. Ayuda arriba con las tarjetas de la
                    portada ("Ver computadoras armadas" y "¿Necesitás ayuda?").
     v2.0 (2026-10) Diseño nuevo: "la barra de tu PC" arriba (las 15 piezas
                    con foto y precio; tocar una abre ese paso), sin columna
                    lateral, productos a todo el ancho. Memoria como Maximus:
                    recupera siempre en silencio con el cartelito "Retomamos
                    el armado que habías empezado". Avisos de carrito y de
                    link compartido. Carga de fondo en fila (de a un pedido) y
                    se corta al salir. Chips que solo aparecen si sirven.
                    Explicación con botón cuando una lista queda vacía.
                    Textos de consejos y avisos aprobados.
     v1.9 (2026-10) Compra más compacta: "Resumen de tu PC", componentes en
                    dos columnas con fotos chicas, Cambiar/Quitar debajo del
                    nombre, para que entre todo de un vistazo.
   ===================================================================== */
(function () {
	'use strict';

	/* ---------- Llave de prueba ---------- */
	var LLAVE = 'cg-armador-nuevo';
	try {
		var qk = new URLSearchParams(location.search).get('cgnuevo');
		if (qk === '1') localStorage.setItem(LLAVE, '1');
		if (qk === '0') localStorage.removeItem(LLAVE);
	} catch (e) {}
	var activo = false;
	try { activo = localStorage.getItem(LLAVE) === '1'; } catch (e) {}
	if (!activo) return;
	if (!/\/armarpc/i.test(location.pathname)) return;
	var PORTADA = '/armarpc/armar-pc/compugarden.aspx';

	/* =================================================================
	   CONFIGURACIÓN
	   ================================================================= */
	var CFG = {
		script: 'web.CG.ArmadorGetItems',
		whatsapp: '5491153486520',
		pcArmadas: '/',   // se reemplaza por el link "Ver computadoras armadas" del armador de siempre
		guardarDias: 30,
		cargarSoloHoras: 12,   // un armado más nuevo que esto se carga solo, sin preguntar
		porPagina: 24,
		marcas: { AMD: 132, Intel: 133 },
		// Productos de outlet: hoy se reconocen por el nombre (O.U.T.L.E.T).
		// Cuando se ordenen las casillas del ERP, cambiar solo esta función.
		esOutlet: function (it) { return /O\.?U\.?T\.?L\.?E\.?T/i.test(it.nombre); }
	};

	var ETAPAS = [
		{ n: 'Base', pasos: ['micro', 'cooler', 'mother', 'ram'] },
		{ n: 'Gráficos y discos', pasos: ['video', 'disco1', 'disco2'] },
		{ n: 'Gabinete y fuente', pasos: ['gabinete', 'fuente'] },
		{ n: 'Extras', pasos: ['monitor', 'perif1', 'wifi', 'armado', 'so'] }
	];
	/* sec: sección del script · url: clave en la página de compra · no: botón "no incluir" */
	var PASOS = {
		micro:    { t: 'Microprocesador', c: 'Micro', sec: 'micro', url: 'MI', ico: 'cpu',
		            tip: 'El procesador define la potencia de la PC y qué motherboards y memorias se pueden usar. Para gaming, lo habitual es 6 núcleos o más. Si no vas a sumar placa de video, los Ryzen terminados en G y los Intel que no terminan en F traen gráficos integrados.' },
		cooler:   { t: 'Cooler', c: 'Cooler', sec: 'cooler', url: 'CO', ico: 'fan', no: true,
		            tip: 'Los procesadores tray o "sin cooler" no traen disipador. Cada cooler indica con qué sockets es compatible (AM4, AM5, LGA1700, LGA1851). Los de torre y los watercoolers enfrían mejor a los procesadores de alto rendimiento.' },
		mother:   { t: 'Motherboard', c: 'Mother', sec: 'mother', url: 'MOT', ico: 'mother', rel: 'micro',
		            tip: 'El formato (ATX o Micro-ATX) indica en qué gabinetes entra, y los slots dicen cuántas memorias y discos M.2 admite.' },
		ram:      { t: 'Memoria RAM', c: 'Memoria', sec: 'ram', url: 'MEM', qurl: 'MEMQT', ico: 'ram', rel: 'mother', qty: true,
		            tip: 'Para gaming suele alcanzar con 16 GB, y para edición o streaming se usa 32 GB. Con dos módulos (2x8 o 2x16) se aprovecha el doble canal.' },
		video:    { t: 'Placa de video', c: 'Video', sec: 'video', url: 'VI', ico: 'gpu', no: true,
		            tip: 'La placa de video es la que más define el rendimiento en juegos. Si tu procesador tiene gráficos integrados, este paso es opcional y la podés sumar más adelante.' },
		disco1:   { t: 'Disco principal', c: 'Disco 1', sec: 'disco', url: 'HD1', qurl: 'HD1QT', ico: 'disk', qty: true, no: 'No incluir disco',
		            tip: 'Un SSD NVMe arranca el sistema y carga los juegos mucho más rápido que un disco rígido. Para el sistema y algunos juegos, 500 GB; para una biblioteca de juegos más grande, 1 TB.' },
		disco2:   { t: 'Disco secundario', c: 'Disco 2', sec: 'disco', url: 'HD2', qurl: 'HD2QT', ico: 'disk', qty: true, no: 'No agregar un segundo disco',
		            tip: 'Paso opcional, para sumar espacio para juegos, fotos o archivos.' },
		gabinete: { t: 'Gabinete', c: 'Gabinete', sec: 'gabinete', url: 'GA', ico: 'case', no: 'No incluir gabinete',
		            tip: 'Te mostramos todos los gabinetes: cada uno indica qué formatos de motherboard admite y hasta qué largo de placa de video. Más ventiladores y mejor flujo de aire mantienen la PC más fresca.' },
		fuente:   { t: 'Fuente', c: 'Fuente', sec: 'fuente', url: 'FU', ico: 'psu', no: 'No incluir fuente',
		            tip: 'La fuente alimenta y protege a todos los componentes, y conviene que tenga margen sobre el consumo del equipo (los watts). La certificación 80 Plus indica mayor eficiencia. Si tu gabinete trae fuente, este paso es opcional.' },
		monitor:  { t: 'Monitor', c: 'Monitor', sec: 'monitor', url: 'MON', ico: 'monitor', no: 'No incluir monitor',
		            tip: 'Cuantos más Hz, más fluida se ve la imagen: 75 Hz es habitual para uso general y desde 100 Hz se nota en juegos. En 24" se ve bien Full HD y en 27" luce más 2K.' },
		perif1:   { t: 'Periféricos', c: 'Periféricos', sec: 'perif', url: 'TEC', ico: 'keyboard', no: 'No agregar periféricos', multi: true,
		            tip: 'Pasos opcionales. Los teclados mecánicos son más cómodos para escribir o jugar mucho, y un buen mouse se nota en juegos y en el uso diario.' },
		perif3:   { t: 'Periféricos', c: 'Periféricos', sec: 'perif', url: 'PER3', ico: 'mouse', no: 'No agregar periféricos', oculto: true },
		perif2:   { t: 'Periféricos', c: 'Periféricos', sec: 'perif', url: 'MOU', ico: 'mouse', no: 'No agregar periféricos', oculto: true,
		            tip: 'Pasos opcionales. Los teclados mecánicos son más cómodos para escribir o jugar mucho, y un buen mouse se nota en juegos y en el uso diario.' },
		wifi:     { t: 'Placa WiFi', c: 'WiFi', sec: 'wifi', url: 'WIFI', ico: 'wifi', no: 'No incluir WiFi',
		            tip: 'Para conectar la PC sin cable. Algunas motherboards ya traen WiFi integrado.' },
		armado:   { t: 'Armado', c: 'Armado', sec: 'armado', url: 'ARM', ico: 'tool', no: 'Sin armado (la armo yo)',
		            tip: 'La armamos en nuestro local de Galería Jardín y te la entregamos lista en 1 hora, o te la enviamos a todo el país.' },
		so:       { t: 'Sistema operativo', c: 'Sistema', sec: 'so', url: 'SO', ico: 'os', no: 'Sin sistema operativo',
		            tip: 'Con el sistema operativo instalado, la PC queda lista para usar apenas la prendas.' }
	};
	var ORDEN_URL = ['MM', 'MI', 'CO', 'MOT', 'MEM', 'MEMQT', 'VI', 'HD1', 'HD1QT', 'HD2', 'HD2QT', 'GA', 'FU', 'MON', 'TEC', 'MOU', 'WIFI', 'ARM', 'SO', 'PER3'];
	var ORDEN = [];
	ETAPAS.forEach(function (e, i) { e.pasos.forEach(function (k) { PASOS[k].etapa = i; ORDEN.push(k); if (k === 'perif1') { PASOS.perif2.etapa = i; PASOS.perif3.etapa = i; ORDEN.push('perif2'); ORDEN.push('perif3'); } }); });
	/* Pasos que ve el cliente (el segundo periférico se elige dentro del paso Periféricos) */
	var VIS = ORDEN.filter(function (k) { return !PASOS[k].oculto; });

	/* =================================================================
	   UTILIDADES
	   ================================================================= */
	function $(s, r) { return (r || document).querySelector(s); }
	function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
	function plata(n) {
		if (n == null || isNaN(n)) return 'Consultar';
		return '$ ' + Number(n).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}
	function sinAcentos(t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
	function N(it) { return ' ' + sinAcentos(it.nombre).toUpperCase() + ' '; }
	function hid(id) { var e = document.getElementById(id); return e ? e.value : null; }
	/* "Imagen próximamente", igual a la que pone GBP cuando falta la foto (dibujada acá: no depende de ningún archivo) */
	var SIN_FOTO = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#eeeeee"/><g fill="#8c8c8c" font-family="Arial, Helvetica, sans-serif" text-anchor="middle"><text x="200" y="185" font-size="96" font-weight="700" letter-spacing="-6">CG</text><text x="200" y="232" font-size="30" font-weight="700" letter-spacing="1">COMPUGARDEN</text><text x="200" y="292" font-size="19" letter-spacing="1.5">IMAGEN PRÓXIMAMENTE</text></g></svg>');
	window.cgSinFoto = SIN_FOTO;
	function img(it) {
		var c = String(it.code || '').trim();
		if (!c || /^APIEAN$/i.test(c)) return SIN_FOTO;   /* código genérico: la foto sería de otro producto */
		return location.origin + '/Temp/App_WebSite/App_PictureFiles/Items/' + encodeURIComponent(c) + '_400.jpg';
	}
	function nombreLimpio(t) { return String(t || '').replace(/\s*\(\d{3,5}\)\s*$/, '').replace(/\s*O\.?U\.?T\.?L\.?E\.?T\.?\s*/i, ' ').trim(); }

	var ICO = {
		cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
		fan: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/><path d="M12 10.5C12 7 13.5 5 16 5c0 3-1.5 5-4 5.5M13.5 12c3.5 0 5.5 1.5 5.5 4-3 0-5-1.5-5.5-4M12 13.5c0 3.5-1.5 5.5-4 5.5 0-3 1.5-5 4-5.5M10.5 12C7 12 5 10.5 5 8c3 0 5 1.5 5.5 4"/>',
		mother: '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="6" height="6" rx="1"/><path d="M16.5 7v10M7 16.5h6"/>',
		ram: '<rect x="2" y="7" width="20" height="9" rx="1.5"/><path d="M6 10v3M10 10v3M14 10v3M18 10v3M5 16v3M19 16v3"/>',
		gpu: '<rect x="2" y="6" width="20" height="11" rx="2"/><circle cx="9" cy="11.5" r="3"/><circle cx="16.5" cy="11.5" r="2"/><path d="M4 17v3M8 17v3"/>',
		disk: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h6M7 14h4"/><circle cx="17" cy="12" r="1"/>',
		case: '<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="15" r="3"/><path d="M9 6h6M9 9h6"/>',
		psu: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M13 8l-3 4h4l-3 4"/>',
		monitor: '<rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>',
		keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
		mouse: '<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 6v4"/>',
		wifi: '<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><path d="M12 20h.01"/>',
		tool: '<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.6-.6-2.4z"/>',
		os: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
		check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
		escudo: '<path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
		reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
		tarjeta: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19"/>',
		envio: '<path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
		x: '<path d="M6 6l12 12M18 6L6 18"/>',
		back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
		info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
		warn: '<path d="M12 3l9.5 17H2.5z"/><path d="M12 10v4M12 17.5h.01"/>',
		link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
		reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
		wa: '<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z"/>',
		pc: '<rect x="1.5" y="4" width="13" height="10" rx="1.5"/><path d="M5.5 18h5M8 14v4"/><rect x="17" y="3" width="5.5" height="16" rx="1"/><path d="M19.75 6h.01M18.5 9h2.5"/>',
		history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/>',
		up: '<path d="M6 15l6-6 6 6"/>',
		der: '<path d="M9 6l6 6-6 6"/>',
		flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>'
	};
	var WA_SVG = '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/>';
	function icoWA(s) { return '<svg class="cgx-ico cgx-wa-logo" width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + WA_SVG + '</svg>'; }
	function ico(k, s) {
		if (k === 'wa') return icoWA(s); return '<svg class="cgx-ico" width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICO[k] || '') + '</svg>'; }

	/* =================================================================
	   REGLAS POR NOMBRE (mismas ideas que cg-repetidos-y-filtros)
	   ================================================================= */
	function modeloMicro(n) {
		var s = n.replace(/LGA\s?\d{4}|[^0-9]1700[^0-9]|[^0-9]1851[^0-9]|AM[45]/g, ' ');
		var m = s.match(/[^A-Z0-9]G?(\d{3,5})([A-Z0-9]{0,4})(?=[^A-Z0-9])/);
		return m ? { num: m[1], suf: m[2] || '' } : null;
	}
	function conGraficos(n) {
		var m = modeloMicro(n); if (!m) return false;
		if (/RYZEN|ATHLON/.test(n)) return /G/.test(m.suf) || (/^[789]\d{3}$/.test(m.num) && !/F/.test(m.suf));
		if (/INTEL|CORE|PENTIUM|CELERON/.test(n)) return !/F/.test(m.suf);
		return false;
	}
	function sinCooler(n) {
		if (/SIN COOLER|SIN DISIPADOR|NO INCLUYE COOLER|TRAY|OEM|THREADRIPPER/.test(n)) return true;
		function t(x) { return new RegExp('[^A-Z0-9]' + x + '[^A-Z0-9]').test(n); }
		if (['5600X', '5600XT', '9600'].some(t)) return false;
		if (['3800XT', '3900XT', '3950X', '7400F', '7500F'].some(t)) return true;
		if (/[^A-Z0-9]\d{3,5}K[FS]?[^A-Z0-9]/.test(n)) return true;
		if (/RYZEN/.test(n) && (/[^A-Z0-9][57]\d{3}X(3D|T)?[^A-Z0-9]/.test(n) || /[^A-Z0-9]9\d{3}(X3D|X|F)?[^A-Z0-9]/.test(n))) return true;
		return false;
	}
	function formatoMother(n) {
		if (/MINI[- ]?ITX|[^A-Z0-9]ITX[^A-Z0-9]|[^A-Z0-9][ABHXZQ]\d{3}E?-?I[^A-Z0-9]/.test(n)) return 'ITX';
		if (/MICRO[- ]?ATX|[^A-Z0-9]M-?ATX[^A-Z0-9]|[^A-Z0-9][ABHXZQ]\d{3}E?-?M[^A-Z0-9]/.test(n)) return 'MATX';
		if (/[^A-Z0-9]E?-?ATX[^A-Z0-9]|[^A-Z0-9][ABHXZQ]\d{3}E?[^A-Z0-9]/.test(n)) return 'ATX';
		return '';
	}
	function ddrMother(n) {
		if (/DDR4|[^A-Z0-9]D4[^A-Z0-9]/.test(n)) return 4;
		if (/DDR5|[^A-Z0-9]D5[^A-Z0-9]/.test(n)) return 5;
		if (/AM4|[^A-Z0-9](A320|A520|B350|B450|B550|X370|X470|X570|H310|B360|H370|Z370|Z390|H410|B460|Z490|H510|B560|Z590)/.test(n)) return 4;
		if (/AM5|1700|1851|[^A-Z0-9](A620|B650|X670|B840|B850|X870|H610|B660|H670|Z690|B760|H770|Z790|H810|B860|Z890)/.test(n)) return 5;
		return 0;
	}
	function formatoGabinete(n) {
		var s = n.replace(/MICRO[- ]?ATX|[^A-Z]M-?ATX/g, ' MICROATX ');
		if (/[^A-Z]E?-?ATX[^A-Z]|MID[- ]?TOWER|FULL[- ]?TOWER/.test(s)) return 'ATX';
		if (/MICROATX|MINI[- ]?TOWER/.test(s)) return 'MATX';
		if (/MINI[- ]?ITX|[^A-Z]ITX[^A-Z]/.test(s)) return 'ITX';
		return '';
	}
	function esNVMe(n) { return /NVME|PCIE|[^A-Z0-9]GEN\s?[345][^0-9]/.test(n); }
	function esSSD(n) { return /SSD|NVME|M\.2|[^A-Z0-9]M2[^A-Z0-9]|PCIE|SOLIDO/.test(n); }
	function capacidad(n) {
		var m = n.match(/[^0-9.,](\d{1,2}(?:[.,]\d)?)\s?TB/); if (m) return m[1].replace(',', '.') + ' TB';
		m = n.match(/[^0-9](\d{3,4})\s?GB/); if (m) { var g = +m[1]; return g >= 1000 ? (g / 1000) + ' TB' : g + ' GB'; }
		return '';
	}
	function vram(n) { var m = n.match(/[^0-9](\d{1,2})\s?GB/); return m ? m[1] + ' GB' : ''; }
	function mhz(n) { var m = n.match(/(\d{4})\s?(MHZ|MT)/); return m ? m[1] + ' MHz' : ''; }
	function watts(n) { var m = n.match(/[^0-9](\d{3,4})\s?W[^A-Z]/); return m ? +m[1] : 0; }

	function socketDe(n) {
		if (/AM5/.test(n)) return 'AM5'; if (/AM4/.test(n)) return 'AM4';
		var m = n.match(/(?:LGA\s?|S\.?\s?|SOCKET\s?)(1851|1700|1200|1151)/); return m ? 'LGA' + m[1] : '';
	}
	var PREFIJO = /^(micro(procesador)?|procesador|cpu\s+cooler|cooler|memoria(\s+ram)?|motherboard|mother|placa\s+(de\s+)?video|placa\s+madre|disco\s+(s[oó]lido|ssd|r[ií]gido)|disco|unidad\s+ssd|gabinete(\s+gamer)?|fuente(\s+de\s+alimentaci[oó]n)?|monitor(\s+(led|gamer))*|placa\s+wifi)\s+/i;
	function nombreCorto(it, k) {
		var n = nombreLimpio(it.nombre);
		if (k === 'perif1' || k === 'armado' || k === 'so') return n;
		n = n.replace(PREFIJO, '').replace(PREFIJO, '');
		if (k === 'micro') n = n.replace(/\s+\d+(?:[.,]\d+)?\s?ghz.*$/i, '').replace(/\s+(am4|am5|s\.?\s?\d{4}|lga\s?\d{4}).*$/i, '');
		if (k === 'ram') n = n.replace(/(\d+\s?gb).*$/i, '$1');
		return n.trim() || nombreLimpio(it.nombre);
	}
	function tagsDe(it, k) {
		var n = N(it), t = [];
		var add = function (x, w) { if (x && !t.some(function (y) { return y.t === x; })) t.push({ t: x, w: w }); };
		var sec = PASOS[k] ? PASOS[k].sec : k;
		if (sec === 'micro') {
			add(socketDe(n));
			var g = n.match(/(\d+(?:[.,]\d+)?)\s?GHZ/); if (g) add(g[1].replace(',', '.') + ' GHz');
			if (sinCooler(n)) add('Sin cooler', true); else if (/BOX|C\/COOLER|CON COOLER/.test(n)) add('Con cooler');
		} else if (sec === 'mother') {
			add(socketDe(n)); add({ ATX: 'ATX', MATX: 'Micro-ATX', ITX: 'Mini-ITX' }[formatoMother(n)]);
			var d = ddrMother(n); if (d) add('DDR' + d); if (/WIFI|WI-FI/.test(n)) add('WiFi');
		} else if (sec === 'ram') {
			add(capacidad(n) || vram(n)); var dr = ddrMemoria(n); if (dr) add('DDR' + dr); add(mhz(n)); if (/RGB/.test(n)) add('RGB');
		} else if (sec === 'video') {
			add(vram(n)); var ch = n.match(/(RTX|GTX|RX|ARC|GT)\s?([A-Z]?\d{3,4}(?:\s?(?:TI|XT|SUPER))?)/); if (ch) add(ch[1] + ' ' + ch[2].replace(/\s+/g, ' '));
		} else if (sec === 'disco') {
			add(capacidad(n)); add(esNVMe(n) ? 'NVMe' : (/SATA/.test(n) ? 'SATA' : (esSSD(n) ? 'SSD' : 'HDD')));
		} else if (sec === 'cooler') {
			add(/WATER|LIQUID|AIO/.test(n) ? 'Watercooler' : 'Aire'); if (/RGB/.test(n)) add('RGB');
		} else if (sec === 'gabinete') {
			add({ ATX: 'ATX', MATX: 'Micro-ATX', ITX: 'Mini-ITX' }[formatoGabinete(n)]);
			var fan = n.match(/(\d)\s?FAN/); if (fan) add(fan[1] + ' fans'); if (/RGB/.test(n)) add('RGB');
			if (/CON FUENTE|[^0-9]\d{3}\s?W[^A-Z]/.test(n)) add('Con fuente');
		} else if (sec === 'fuente') {
			var w = watts(n); if (w) add(w + ' W'); if (/80\s?PLUS/.test(n)) add('80 Plus'); if (/MODULAR/.test(n)) add('Modular');
		} else if (sec === 'monitor') {
			var pu = n.match(/(\d{2}(?:[.,]\d)?)\s?(?:"|''|PULG|”)/); if (pu) add(pu[1].replace(',', '.') + '"');
			var hz = n.match(/(\d{2,3})\s?HZ/); if (hz) add(hz[1] + ' Hz');
			add(/4K|2160/.test(n) ? '4K' : (/2K|QHD|1440/.test(n) ? '2K' : (/FHD|FULL\s?HD|1080/.test(n) ? 'Full HD' : '')));
		} else if (sec === 'perif') {
			add(/TECLADO/.test(n) ? 'Teclado' : (/MOUSE\s?PAD/.test(n) ? 'Mousepad' : (/MOUSE/.test(n) ? 'Mouse' : (/AURICULAR|HEADSET/.test(n) ? 'Auriculares' : (/PARLANTE/.test(n) ? 'Parlantes' : (/WEBCAM|CAMARA/.test(n) ? 'Webcam' : ''))))));
			if (/INALAMBRIC|WIRELESS/.test(n)) add('Inalámbrico'); if (/RGB/.test(n)) add('RGB');
		} else if (sec === 'wifi') {
			add(/USB/.test(n) ? 'USB' : (/PCI/.test(n) ? 'PCIe' : '')); var mb = n.match(/(\d{3,4})\s?MBPS/); if (mb) add(mb[1] + ' Mbps');
		}
		return t.slice(0, 3);
	}
	function sel(k) { return S.sel[k] ? S.sel[k].it : null; }
	function microN() { var m = sel('micro'); return m ? N(m) : ''; }
	function motherN() { var m = sel('mother'); return m ? N(m) : ''; }

	/* Chips por paso: t = texto, g = grupo excluyente, f = función sobre el nombre */
	/* Ayudas de los filtros (las mismas reglas del armador viejo) */
	function hzDe(n) { var m = n.match(/[^0-9](\d{2,3})\s?HZ/); return m ? +m[1] : 0; }
	function pulgadasDe(n) { var s2 = n.replace(/[“”″]/g, '"'), m = s2.match(/[^0-9.](\d{2}(?:[.,]\d)?)\s?("|''|PULGADAS|PULG\.?|IN[^A-Z])/); return m ? m[1].replace(',', '.') + '"' : ''; }
	function pesoCap(t) { return parseFloat(t) * (/TB/.test(t) ? 1000 : 1); }
	function chip(t, re, g, no) { return { t: t, g: g, f: function (n) { return re.test(n) && !(no && no.test(n)); } }; }
	function chipsDe(k) {
		var c = [];
		switch (PASOS[k].sec) {
			case 'micro':
				c = [['Athlon', /ATHLON/], ['Ryzen 3', /RYZEN\s*3[^0-9]/], ['Ryzen 5', /RYZEN\s*5[^0-9]/], ['Ryzen 7', /RYZEN\s*7[^0-9]/], ['Ryzen 9', /RYZEN\s*9[^0-9]/],
					['Core i3', /[^A-Z0-9]I3[^A-Z0-9]/], ['Core i5', /[^A-Z0-9]I5[^A-Z0-9]/], ['Core i7', /[^A-Z0-9]I7[^A-Z0-9]/], ['Core i9', /[^A-Z0-9]I9[^A-Z0-9]/], ['Core Ultra', /ULTRA/]]
					.map(function (x) { return chip(x[0], x[1], 'gama'); })
					.concat([['AM4', /AM4/], ['AM5', /AM5/], ['LGA1700', /1700/], ['LGA1851', /1851/]].map(function (x) { return chip(x[0], x[1], 'socket'); }))
					.concat([{ t: 'Con gráficos', f: conGraficos }, { t: 'Trae cooler', f: function (n) { return !sinCooler(n); } }]);
				break;
			case 'cooler':
				var W = /WATER|LIQUID|AIO|[^0-9](240|280|360)\s?MM|LA360|TG-360|TH-360|CORELIQUID/;
				c = [{ t: 'Aire', g: 'tipo', f: function (n) { return !W.test(n); } }, { t: 'Watercooler', g: 'tipo', f: function (n) { return W.test(n); } },
					chip('Blanco', /WHITE|BLANCO/), chip('RGB', /RGB/)];
				break;
			case 'mother':
				c = [{ t: 'Micro-ATX', g: 'f', f: function (n) { return formatoMother(n) === 'MATX'; } }, { t: 'ATX', g: 'f', f: function (n) { return formatoMother(n) === 'ATX'; } },
					{ t: 'Mini-ITX', g: 'f', f: function (n) { return formatoMother(n) === 'ITX'; } }, { t: 'DDR4', g: 'd', f: function (n) { return ddrMother(n) === 4; } },
					{ t: 'DDR5', g: 'd', f: function (n) { return ddrMother(n) === 5; } }, chip('WiFi', /WIFI|WI-FI|\sAX\s/)];
				break;
			case 'ram':
				c = ['8', '16', '32', '64'].map(function (g) { return { t: g + ' GB', g: 'cap', f: function (n) { return new RegExp('[^0-9]' + g + '\\s?GB').test(n); } }; })
					.concat([chip('Kit x2', /[^0-9]2\s?X\s?\d+\s?GB|[^A-Z]KIT[^A-Z]|DUAL/), chip('RGB', /RGB/), { auto: mhz, g: 'mhz' }]);
				break;
			case 'video':
				c = [chip('NVIDIA', /GEFORCE|NVIDIA|[^A-Z0-9](RTX|GTX|GT)\s?-?\d{3,4}/, 'chip'), chip('AMD Radeon', /RADEON|[^A-Z0-9]RX\s?-?\d{3,4}/, 'chip'),
					chip('Intel Arc', /[^A-Z0-9]ARC[^A-Z0-9]/, 'chip'), chip('Blanco', /WHITE|BLANCO/), { auto: vram, g: 'vram' }];
				break;
			case 'disco':
				c = [{ t: 'SSD NVMe', g: 'tipo', f: esNVMe }, { t: 'SSD SATA', g: 'tipo', f: function (n) { return esSSD(n) && !esNVMe(n); } },
					{ t: 'HDD', g: 'tipo', f: function (n) { return !esSSD(n); } }, { auto: capacidad, g: 'cap', peso: pesoCap }];
				break;
			case 'gabinete':
				c = [{ t: 'Entra mi motherboard', f: function (n) {
						var m = formatoMother(motherN()), g = formatoGabinete(n);
						if (!m || !g) return false; if (m === 'ATX') return g === 'ATX'; if (m === 'MATX') return g !== 'ITX'; return true; } },
					{ t: 'ATX', g: 'f', f: function (n) { return formatoGabinete(n) === 'ATX'; } }, { t: 'Micro-ATX', g: 'f', f: function (n) { return formatoGabinete(n) === 'MATX'; } },
					{ t: 'Mini-ITX', g: 'f', f: function (n) { return formatoGabinete(n) === 'ITX'; } },
					chip('Vidrio templado', /VIDRIO|TEMPLADO|TEMPERED|GLASS|[^A-Z]TG[^A-Z]/), chip('Blanco', /WHITE|BLANCO/), chip('RGB', /RGB/),
					chip('Con fuente', /CON FUENTE|[^A-Z]C\/F[^A-Z]|[^0-9]\d{3}\s?W[^A-Z]/)];
				break;
			case 'fuente':
				c = [{ t: 'Hasta 550 W', g: 'w', f: function (n) { var w = watts(n); return w > 0 && w <= 550; } },
					{ t: '600 a 700 W', g: 'w', f: function (n) { var w = watts(n); return w >= 600 && w <= 700; } },
					{ t: '750 a 850 W', g: 'w', f: function (n) { var w = watts(n); return w >= 750 && w <= 850; } },
					{ t: '1000 W o más', g: 'w', f: function (n) { return watts(n) >= 1000; } },
					chip('80 Plus', /80\s?\+|80\s?PLUS|BRONZE|GOLD|PLATINUM|TITANIUM/), chip('Bronze', /BRONZE/, 'cert'), chip('Gold', /GOLD/, 'cert'), chip('Platinum', /PLATINUM|TITANIUM/, 'cert'),
					chip('Modular', /MODULAR/), chip('ATX 3.0 / PCIe 5', /ATX\s?3|PCIE\s?5|12VHPWR|12V-2X6/),
					chip('Blanco', /WHITE|BLANCO/, null, /PLUS\s*WHITE[^A-Z]*$|80\s*\+?\s*(PLUS\s*)?WHITE(?![^0-9]*(WHITE|BLANCO))/)];
				break;
			case 'monitor':
				c = [{ auto: pulgadasDe, g: 'tam', peso: parseFloat },
					{ t: 'Hasta 100 Hz', g: 'hz', f: function (n) { var h = hzDe(n); return h > 0 && h <= 100; } },
					{ t: '120 a 180 Hz', g: 'hz', f: function (n) { var h = hzDe(n); return h >= 120 && h <= 180; } },
					{ t: '200 Hz o más', g: 'hz', f: function (n) { return hzDe(n) >= 200; } },
					chip('Full HD', /FHD|FULL\s?HD|1080|1920\s?X\s?1080/, 'res'), chip('2K', /QHD|[^0-9]2K[^A-Z0-9]|1440|2560/, 'res'), chip('4K', /[^0-9]4K[^A-Z0-9]|UHD|2160|3840/, 'res'),
					chip('IPS', /[^A-Z]IPS[^A-Z]/, 'panel'), chip('VA', /[^A-Z]VA[^A-Z]/, 'panel'), chip('OLED', /OLED/, 'panel'), chip('Curvo', /CURV/)];
				break;
			case 'perif':
				c = [chip('Teclado', /TECLADO|KEYBOARD/, 'tipo', /COMBO|KIT[^A-Z]/), chip('Mouse', /MOUSE/, 'tipo', /MOUSE\s*-?\s*PAD|COMBO|KIT[^A-Z]/),
					chip('Combo teclado + mouse', /COMBO|KIT[^A-Z]|TECLADO.*MOUSE|MOUSE.*TECLADO/, 'tipo'), chip('Mouse pad', /MOUSE\s*-?\s*PAD|MOUSEPAD|DESK\s*MAT|ALFOMBRILLA/, 'tipo'),
					chip('Auriculares', /AURICULAR|HEADSET|HEADPHONE|VINCHA/, 'tipo'), chip('Micrófono', /MICROFONO|MICROPHONE/, 'tipo'), chip('Webcam', /WEBCAM|CAMARA\s*WEB/, 'tipo'),
					chip('Parlantes', /PARLANTE|SPEAKER/, 'tipo'), chip('Joystick', /JOYSTICK|GAMEPAD|JOYPAD|CONTROLLER/, 'tipo'), chip('Volante', /VOLANTE|WHEEL/, 'tipo'),
					chip('Silla gamer', /SILLA|BUTACA|CHAIR/, 'tipo'), chip('Escritorio', /ESCRITORIO|[^A-Z]DESK[^A-Z]/, 'tipo', /DESK\s*MAT/),
					chip('Inalámbrico', /INALAMBRIC|WIRELESS|BLUETOOTH|[^0-9]2\.4\s?G/), chip('Mecánico', /MECANIC|MECHANICAL/), chip('RGB', /RGB/), chip('Blanco', /WHITE|BLANCO/)];
				break;
			case 'wifi':
				c = [chip('PCIe (interna)', /PCI/, 'con'), chip('USB', /USB/, 'con'),
					chip('WiFi 6 / 7', /WIFI\s?-?\s?[67]|WI-FI\s?[67]|[^A-Z]AX\d{3,4}|[^A-Z]BE\d{3,4}/), chip('Bluetooth', /BLUETOOTH|[^A-Z]BT[^A-Z]/)];
				break;
		}
		if (PASOS[k].sec !== 'micro') c.push({ auto: function (n, it) { return it.marca ? String(it.marca).trim() : ''; }, g: 'marca', marca: true });
		return c;
	}

	/* Botón "no incluir": texto según lo elegido */
	function textoNo(k) {
		var p = PASOS[k];
		if (k === 'cooler') {
			var m = microN();
			if (m && !sinCooler(m)) return { t: 'Usar el cooler incluido', nota: 'Incluido con tu procesador', reco: true, corto: 'Incluido' };
			return { t: 'No incluir cooler', nota: 'Solo si ya tenés uno', reco: false, corto: 'No incluido' };
		}
		if (k === 'video') {
			var mi = microN();
			if (mi && conGraficos(mi)) return { t: 'Usar los gráficos del procesador', reco: true, corto: 'Integrados' };
			return { t: 'No incluir placa de video', nota: 'Solo si ya tenés una', reco: false, corto: 'No incluida' };
		}
		if (k === 'fuente' && gabineteConFuente()) return { t: 'Usar la fuente del gabinete', nota: 'Tu gabinete ya trae fuente', reco: true, corto: 'Del gabinete' };
		if (k === 'wifi' && motherConWifi()) return { t: 'Usar el WiFi de la motherboard', nota: 'Tu motherboard ya trae WiFi', reco: true, corto: 'Integrado' };
		return p.no ? { t: p.no === true ? 'No incluir' : p.no, reco: false, corto: 'No incluido' } : null;
	}
	/* Mensaje grande de la tarjeta "No incluir" */
	function mensajeNo(k, reco) {
		if (reco) return ({ cooler: ['Viene con tu procesador', 'Cooler incluido · $ 0'], video: ['Gráficos del procesador', 'Sin placa de video · $ 0'],
			fuente: ['Viene con tu gabinete', 'Fuente incluida · $ 0'], wifi: ['Ya viene en tu mother', 'WiFi integrado · $ 0'] })[k] || ['Incluido', '$ 0'];
		return ({ cooler: ['Ya tengo uno', 'Sin cooler · $ 0'], video: ['Ya tengo una', 'Sin placa de video · $ 0'], disco1: ['Ya tengo uno', 'Sin disco · $ 0'],
			disco2: ['No lo necesito', 'Sin segundo disco · $ 0'], gabinete: ['Ya tengo uno', 'Sin gabinete · $ 0'], fuente: ['Ya tengo una', 'Sin fuente · $ 0'],
			monitor: ['Ya tengo uno', 'Sin monitor · $ 0'], perif1: ['No los necesito', 'Sin periféricos · $ 0'], wifi: ['Uso cable', 'Sin WiFi · $ 0'],
			armado: ['La armo yo', 'Sin armado · $ 0'], so: ['Ya tengo uno', 'Sin sistema · $ 0'] })[k] || ['No lo necesito', '$ 0'];
	}
	function gabineteConFuente() { var g = sel('gabinete'); return !!g && /CON FUENTE|[^A-Z]C\/F[^A-Z]|[^0-9]\d{3}\s?W[^A-Z]|KIT/.test(N(g)); }
	function motherConWifi() { var m = sel('mother'); return !!m && /WIFI|WI-FI|[^A-Z]AX[^A-Z]/.test(N(m)); }
	/* Advertencias que quedan a la vista hasta que se resuelvan */
	function advertencias() {
		var a = [], mi = sel('micro');
		if (mi && S.skip.video && !conGraficos(N(mi))) a.push({ paso: 'video', t: 'Tu procesador no tiene gráficos integrados: sin placa de video la PC no da imagen. Elegí "No incluir" solo si ya tenés una.' });
		if (mi && S.skip.cooler && sinCooler(N(mi))) a.push({ paso: 'cooler', t: 'Tu procesador no trae cooler: sin cooler la PC no puede funcionar. Elegí "No incluir" solo si ya tenés uno.' });
		if (S.sel.armado && (S.skip.gabinete || S.skip.fuente) && !(S.skip.fuente && !S.skip.gabinete && gabineteConFuente())) a.push({ paso: S.skip.gabinete ? 'gabinete' : 'fuente', t: 'Para armar tu PC necesitamos el gabinete y la fuente. Si traés los tuyos, coordinalo por WhatsApp.', wa: true });
		return a;
	}

	/* La instalación del sistema operativo (mano de obra) se hace con la PC armada */
	function requiereArmado(it) { return true; }   /* todo el sistema operativo (instalación y licencias) va con la PC armada */
	function sinArmado() { return !!S.skip.armado; }

	/* Aviso arriba de la lista según el paso (textos aprobados) */
	function avisoPaso(k) {
		var mi = sel('micro'), mo = sel('mother'), p = PASOS[k];
		if (k === 'cooler' && mi) return sinCooler(N(mi))
			? { tipo: 'warn', titulo: 'Tu procesador no trae cooler', t: nombreLimpio(mi.nombre) + ' viene sin disipador y sin cooler la PC no puede funcionar. En la lista tenés opciones compatibles. Si ya tenés uno, podés marcar "No incluir cooler".' }
			: { tipo: 'ok', titulo: 'Tu procesador trae cooler incluido', t: 'Podés usar el que viene en la caja sin costo, o sumar uno mejor para que funcione más fresco y silencioso.' };
		if (k === 'mother' && mi) return { tipo: 'info', t: 'Te mostramos solo las compatibles con tu ' + nombreLimpio(mi.nombre) + '. ' + p.tip };
		if (k === 'ram' && mo) return { tipo: 'info', t: 'Te mostramos solo las compatibles con tu ' + nombreLimpio(mo.nombre) + '. ' + p.tip };
		if (k === 'so' && sinArmado()) return { tipo: 'info', t: 'El sistema operativo se instala con la PC armada en el local. Para sumarlo, elegí "Armado de PC".', ir: { k: 'armado', t: 'Ir a Armado' } };
		if (k === 'fuente' && gabineteConFuente()) return { tipo: 'ok', t: 'Tu gabinete ya trae fuente: este paso es opcional. Si preferís una fuente mejor, elegila de la lista.' };
		if (k === 'wifi' && motherConWifi()) return { tipo: 'ok', t: 'Tu motherboard ya trae WiFi: este paso es opcional.' };
		if (k === 'video' && mi && conGraficos(N(mi))) return { tipo: 'ok', t: 'Tu procesador tiene gráficos integrados: este paso es opcional y la placa de video la podés sumar más adelante.' };
		if (k === 'gabinete') {
			var f = mo ? formatoMother(N(mo)) : '';
			var nm = mo ? nombreLimpio(mo.nombre).replace(/^\s*(motherboard|mother|placa\s+madre)\s+/i, '') : '';
			var txt = {
				ITX: 'es Mini-ITX: entra en gabinetes Mini-ITX, Micro-ATX y ATX.',
				MATX: 'es Micro-ATX: entra en gabinetes Micro-ATX y ATX (Mid Tower). En un gabinete Mini-ITX no entra.',
				ATX: 'es ATX: entra solo en gabinetes ATX (Mid o Full Tower). En un gabinete Micro-ATX o Mini-ITX no entra.'
			}[f];
			return { tipo: 'info', titulo: 'Compatibilidad con tu gabinete',
				t: txt ? 'Tu motherboard ' + nm + ' ' + txt : 'Cada gabinete indica qué formatos de motherboard admite (ATX, Micro-ATX o Mini-ITX): revisá que coincida con la tuya.',
				leyenda: 'Te mostramos todos los gabinetes disponibles: revisá que admita el formato de tu motherboard y el largo de tu placa de video.', wa: true };
		}
		return p.tip ? { tipo: 'info', t: p.tip } : null;
	}

	/* =================================================================
	   DATOS (script del ERP)
	   ================================================================= */
	var CTX = null, REQ = 0, CACHE = {}, DATA = {};
	function api(params) {
		var p = Object.assign({}, params, CTX, { req: ++REQ });
		var key = JSON.stringify(params);
		if (CACHE[key]) return CACHE[key];
		CACHE[key] = new Promise(function (ok, mal) {
			try {
				PageMethods.wsNRW_Script(CTX.ws_id, CFG.script, JSON.stringify(p), function (r) {
					try { var d = JSON.parse(r), out = (d.data || []).map(prep); DATA[key] = out; ok(out); } catch (e) { delete CACHE[key]; mal(e); }
				}, function (e) { delete CACHE[key]; mal(e); });
			} catch (e) { delete CACHE[key]; mal(e); }
		});
		return CACHE[key];
	}
	/* Cuántas tarjetas entran: columnas de la grilla × filas visibles (+1 fila de reserva) */
	function columnas() {
		if (window.innerWidth < 900) return 2;
		var g = document.getElementById('cgx-lista'), w = (g && g.clientWidth) || (ROOT && ROOT.clientWidth) || 1200;
		return Math.max(2, Math.floor((w + 12) / (172 + 12)));
	}
	function tanda(inicial) {
		var alto = window.innerWidth < 900 ? 280 : 265;
		var filas = Math.max(2, Math.ceil(window.innerHeight / alto)) + (window.innerWidth < 900 ? 1 : 0);
		return columnas() * (inicial ? filas : 2);
	}
	/* Mother necesita micro; memoria necesita mother */
	function falta(k) { return (k === 'mother' && !sel('micro')) ? 'micro' : ((k === 'ram' && !sel('mother')) ? 'mother' : null); }
	function ddrMemoria(n) { return /DDR5|[^A-Z0-9]D5[^A-Z0-9]/.test(n) ? 5 : (/DDR4|[^A-Z0-9]D4[^A-Z0-9]/.test(n) ? 4 : 0); }
	function yaCargado(params) { return DATA[JSON.stringify(params)] || null; }
	/* Descarga de fondo las primeras fotos de un paso, para que al llegar ya estén */
	var FOTOS = {};
	function precargarFotos(k) {
		if (!k || !PASOS[k] || falta(k) || SALIENDO) return;
		var l = yaCargado(paramsDe(k));
		if (!l) return;   /* las fotos se piden solo si la lista ya llegó por la fila: nunca un pedido extra al servidor */
		sinRepetidos(l.filter(function (it) { return it.precio != null; }), PASOS[k].sec).sort(function (a, b) { return a.precio - b.precio; }).slice(0, CFG.porPagina).forEach(function (it) {
			var u = img(it); if (FOTOS[u]) return; FOTOS[u] = new Image(); FOTOS[u].src = u;
		});
	}
	/* Carga de fondo en fila, de a un pedido (como Maximus). Se corta al salir de la página. */
	var COLA = [], COLA_ON = false, SALIENDO = false, CARGANDO_LISTA = false;
	function encolar(params) {
		var key = JSON.stringify(params);
		if (SALIENDO || CACHE[key] || COLA.some(function (x) { return JSON.stringify(x) === key; })) return;
		COLA.push(params); bombear();
	}
	function bombear() {
		if (COLA_ON || SALIENDO || !COLA.length) return;
		if (CARGANDO_LISTA) { setTimeout(bombear, 120); return; }
		COLA_ON = true;
		var fin = function () { COLA_ON = false; precargarFotos(siguientePendiente(S.actual)); setTimeout(bombear, 60); };
		var p = COLA.shift();
		api(p).then(function (l) { if (p.seccion === 'mother' && Array.isArray(l)) precargarMemorias(l); fin(); }, fin);
	}
	/* Memorias de las motherboards que el cliente ve primero (las más baratas), de fondo y en fila */
	function precargarMemorias(lista) {
		sinRepetidos(lista.filter(function (it) { return it.precio != null; }), 'mother').sort(function (a, b) { return a.precio - b.precio; })
			.slice(0, 8).forEach(function (m) { encolar({ seccion: 'ram', mother_id: m.item_id }); });
	}
	function precargar() {
		var i = S.actual ? ORDEN.indexOf(S.actual) : 0;
		ORDEN.slice(i + 1).concat(ORDEN.slice(0, i)).forEach(function (k) { if (!falta(k)) encolar(paramsDe(k)); });
	}
	function marcaBonita(m) {
		m = String(m || '').trim();
		if (!m || /[a-z]/.test(m) || m.length <= 4) return m;
		return m.charAt(0) + m.slice(1).toLowerCase();
	}
	function prep(it) {
		it.marca = marcaBonita(it.marca);
		it.precio = it.precio == null ? null : Number(it.precio);
		it.precio_tachado = it.precio_tachado == null ? null : Number(it.precio_tachado);
		it.outlet = CFG.esOutlet(it);
		if (it.item_id === 5653) { it.nombreErp = it.nombre; it.nombre = 'Armado de PC'; it.detalle = 'La armamos en el local y te la entregamos lista en 1 hora, o te la enviamos.'; }
		return it;
	}
	function paramsDe(k) {
		var p = { seccion: PASOS[k].sec };
		if (k === 'mother' && sel('micro')) p.micro_id = sel('micro').item_id;
		if (k === 'ram' && sel('mother')) p.mother_id = sel('mother').item_id;
		return p;
	}
	/* Un solo producto por modelo: gana el más barato; si empatan, el del local */
	/* =================================================================
	   MOTOR DE REPETIDOS PROPIO (copia del motor de la web, dentro del armador)
	   El armador no depende de ningún otro archivo: si cg-repetidos-y-filtros no está, funciona igual.
	   Reconoce cuándo dos productos son el mismo y decide cuál queda:
	   - si alguno está en el local, quedan los del local;
	   - si no, queda el más barato (y, a igual precio, el de más stock).
	   Cómo reconoce que es el mismo producto: 1) mismo código de fabricante; 2) código del local dentro
	   del nombre del proveedor; 3) micros: mismo modelo (tray/caja aparte); 4) mismo nombre "limpio"
	   (sin las palabras de relleno de cada proveedor); 5) monitores y discos: marca + código de modelo.
	   Ante la duda, NO junta.
	   ================================================================= */
	var MOTOR = (function () {
		var PROVEEDORES = /^(IN_|EL_|NB_|APIEAN)/i;
		function limpio(t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(); }
		function alnum(t) { return limpio(t).replace(/\+/g, 'PLUS').replace(/[^A-Z0-9]/g, ''); }
		function modeloMicroM(n) {
			n = ' ' + limpio(n) + ' ';
			var m = n.match(/RYZEN\s*([3579])\s*(?:PRO\s*)?(\d{4})\s*(X3D|XT|GT|GE|G|X|F|T)?(?![A-Z0-9])/);
			if (m) return 'R' + m[1] + '-' + m[2] + (m[3] || '');
			m = n.match(/ATHLON\s*(?:GOLD\s*|SILVER\s*)?(\d{3,4}G?E?)(?![A-Z0-9])/);
			if (m) return 'ATH-' + m[1];
			m = n.match(/ULTRA\s*([3579])\s*(\d{3})([A-Z]{0,2})(?![A-Z0-9])/);
			if (m) return 'U' + m[1] + '-' + m[2] + m[3] + (/PLUS/.test(n) ? 'PLUS' : '');
			m = n.match(/[^A-Z0-9](I[3579])[\s-]*(\d{4,5})([A-Z]{0,2})(?![A-Z0-9])/);
			if (m) return m[1] + '-' + m[2] + m[3];
			m = n.match(/(CELERON|PENTIUM)[^0-9]*(G?\d{4})([A-Z]?)(?![A-Z0-9])/);
			if (m) return m[1] + '-' + m[2] + m[3];
			return '';
		}
		var MARCAS = { ASUS: 'ASUS', MSI: 'MSI', GIGABYTE: 'GIGABYTE', GIGA: 'GIGABYTE', AORUS: 'GIGABYTE', ASROCK: 'ASROCK', BIOSTAR: 'BIOSTAR',
			EVGA: 'EVGA', NZXT: 'NZXT', AMD: '', INTEL: '', NVIDIA: '', AFOX: 'AFOX', COLORFUL: 'COLORFUL', TEAMGROUP: 'TEAMGROUP', HIKSEMI: 'HIKSEMI',
			KINGSTON: 'KINGSTON', HYPERX: 'HYPERX', CORSAIR: 'CORSAIR', ADATA: 'ADATA', XPG: 'ADATA', GSKILL: 'GSKILL', PATRIOT: 'PATRIOT',
			CRUCIAL: 'CRUCIAL', LEXAR: 'LEXAR', PNY: 'PNY', XFX: 'XFX', PALIT: 'PALIT', SAPPHIRE: 'SAPPHIRE', POWERCOLOR: 'POWERCOLOR',
			GALAX: 'GALAX', INNO3D: 'INNO3D', GAINWARD: 'GAINWARD', ZOTAC: 'ZOTAC', PELADN: 'PELADN', WD: 'WD', SEAGATE: 'SEAGATE',
			SAMSUNG: 'SAMSUNG', KIOXIA: 'KIOXIA', HIKVISION: 'HIKVISION', SANDISK: 'SANDISK', TOSHIBA: 'TOSHIBA', MEMOX: 'MEMOX', RAPTOR: 'RAPTOR',
			THERMALTAKE: 'THERMALTAKE', TT: 'THERMALTAKE', COOLERMASTER: 'COOLERMASTER', CM: 'COOLERMASTER', DEEPCOOL: 'DEEPCOOL', LIANLI: 'LIANLI',
			BEQUIET: 'BEQUIET', ANTEC: 'ANTEC', SENTEY: 'SENTEY', REDRAGON: 'REDRAGON', LOGITECH: 'LOGITECH', RAZER: 'RAZER', GENIUS: 'GENIUS',
			LG: 'LG', AOC: 'AOC', BENQ: 'BENQ', ZOWIE: 'BENQ', VIEWSONIC: 'VIEWSONIC', PHILIPS: 'PHILIPS', LENOVO: 'LENOVO', DELL: 'DELL', HP: 'HP',
			TPLINK: 'TPLINK', MERCUSYS: 'MERCUSYS', TENDA: 'TENDA', DLINK: 'DLINK', JONSBO: 'JONSBO', EVOLABS: 'EVOLABS', AUREOX: 'AUREOX',
			RAIDMAX: 'RAIDMAX', TEROS: 'TEROS', GAMEMAX: 'GAMEMAX', ARKHAM: 'ARKHAM', LNZ: 'LNZ', SOLARMAX: 'SOLARMAX', NOBLEX: 'NOBLEX', ID: 'IDCOOLING' };
		var SUBMARCA = { PRIME: 'ASUS', TUF: 'ASUS', ROG: 'ASUS', STRIX: 'ASUS' };
		var RELLENO = {};
		('MOTHERBOARD MOTHERBOARDS MOTHER MB PLACA MADRE BASE DE DEL LA EL LOS LAS CON Y PARA MEMORIA MEMORIAS RAM DIMM UDIMM DESKTOP PC ' +
		 'DISCO SOLIDO RIGIDO ESTADO INTERNO INTERNA UNIDAD GABINETE FUENTE ALIMENTACION PODER MONITOR PANTALLA VIDEO GRAFICA TARJETA ' +
		 'COOLER WATER AIR CPU PROCESADOR MICRO MICROPROCESADOR GAMER NUEVO NUEVA SINGLE C DISIPADOR SERIES OUTLET BULK PSU LED ' +
		 'GEFORCE RADEON LHR GDDR5 GDDR6 GDDR7 AM3 AM4 AM5 LGA LGA1200 LGA1700 LGA1851 LGA1151 1700 1851 1151 WEB CAM WEBCAM EDITION'
		).split(' ').forEach(function (w) { RELLENO[w] = 1; });
		var CORTADAS = ['DDR4', 'DDR5', 'LGA1700', 'LGA1851', 'LGA1200', 'MODULAR', 'ARGB', 'RGB', 'BLACK', 'WHITE', 'WIFI', 'GAMING', 'GOLD', 'SILVER', 'BRONZE', 'PLATINUM', 'EDITION'];
		var INTEL_DDR = /(^|\s)[HBZ](610|660|670|690|760|770|790)M?(\s|$)/;
		function nombreLimpioM(nombre, cod, paso) {
			var n = limpio(nombre);
			if (/^EL_/i.test(cod) && n.trim().length >= 48 && n.trim().length <= 50) {
				var ult = (n.trim().match(/(\S+)$/) || [])[1] || '';
				if (CORTADAS.some(function (p) { return p !== ult && p.indexOf(ult) === 0; })) n = n.trim().replace(/\s+\S+$/, '');
			}
			n = ' ' + n.replace(/\([^)]*\)/g, ' ') + ' ';
			n = n.replace(/COOLER\s*MASTER/g, ' COOLERMASTER ').replace(/LIAN\s*LI/g, 'LIANLI').replace(/BE\s*QUIET!?/g, 'BEQUIET')
				.replace(/DEEP\s*COOL/g, 'DEEPCOOL').replace(/TEAM\s*GROUP/g, 'TEAMGROUP').replace(/WESTERN\s*DIGITAL/g, 'WD')
				.replace(/G\.?\s?SKILL/g, 'GSKILL').replace(/TP-?\s?LINK/g, 'TPLINK').replace(/D-?LINK/g, 'DLINK').replace(/ID-?\s?COOLING/g, 'ID')
				.replace(/WI-?\s?FI/g, 'WIFI').replace(/M\.2\+/g, ' M2PLUS ').replace(/M\.2/g, ' M2 ')
				.replace(/\bNEGR[OA]\b/g, 'BLACK').replace(/\bBLANC[OA]\b/g, 'WHITE').replace(/\bGRA?Y\b|\bGRIS\b/g, 'GREY').replace(/\bROSA\b/g, 'PINK')
				.replace(/\bBRONCE\b/g, 'BRONZE').replace(/\bORO\b/g, 'GOLD').replace(/\bPLATA\b/g, 'SILVER')
				.replace(/MASTERL+IQUID/g, 'MASTERLIQUID').replace(/CORE\s*II/g, 'COREII')
				.replace(/\d+(\.\d+)?\s*GHZ/g, ' ').replace(/\bREV\.?\s*\d(\.\d)?/g, ' ').replace(/\bS\.?\s?(1700|1851|1200|1151)\b/g, ' ')
				.replace(/\d\.\d+\s?V\b/g, ' ').replace(/\bC\/\s?/g, ' ')
				.replace(/LOW\s*PROFILE/g, 'LP').replace(/\bWF[23]\b/g, 'WINDFORCE')
				.replace(/\bO(\d{1,2})GB?\b/g, ' OC $1GB ').replace(/(\d)GD(\d)\b/g, '$1GB DDR$2').replace(/\bGDDR([34])\b/g, 'DDR$1')
				.replace(/\b(RTX|GTX|RX|GT)\s?(\d{3,4})(TI)?\b/g, '$1 $2 $3').replace(/(\d{4})TI\b/g, '$1 TI')
				.replace(/(\d)\s*G\b/g, '$1GB').replace(/(\d)\s*(GB|TB|W|HZ|MM|MS)\b/g, '$1$2')
				.replace(/(\d{4})\s?(MHZ|MT\/S|MT|MZ)\b/g, '$1').replace(/(\d)\s*(“|”|″|''|"|PULGADAS|PULG\.?)/g, '$1IN');
			if (paso === 'video') n = n.replace(/\bR(\d{4})\b/g, 'RX $1');
			return n;
		}
		function firma(nombre, cod, paso) {
			var n = nombreLimpioM(nombre, cod, paso);
			var tokens = n.split(/[^A-Z0-9]+/).filter(Boolean);
			var ddrImporta = paso === 'mother' && INTEL_DDR.test(' ' + tokens.join(' ') + ' ');
			var marca = '', quedan = {};
			tokens.forEach(function (t) {
				if (t === 'D4') t = 'DDR4';
				if (t === 'D5') t = 'DDR5';
				if (MARCAS[t] !== undefined) { if (!marca && MARCAS[t]) marca = MARCAS[t]; return; }
				if (SUBMARCA[t] && !marca) marca = SUBMARCA[t];
				if (RELLENO[t]) return;
				if (/^CL?\d{2}$/.test(t)) return;
				if (paso === 'mother' && !ddrImporta && /^DDR[45]$/.test(t)) return;
				if (paso === 'mother' && /^(ATX|MATX|MICRO|MINI|EATX|1200)$/.test(t)) return;
				if (paso === 'fuente' && /^(80|PLUS|80PLUS)$/.test(t)) return;
				if (paso === 'memoria' && /^(DDR4|DDR5|BLACK)$/.test(t)) return;
				quedan[t] = 1;
			});
			if (quedan.WIFI && (quedan.AC || quedan.AX)) delete quedan.WIFI;
			var lista = Object.keys(quedan);
			lista = lista.filter(function (t) {
				if (!/^[A-Z]{2,}$/.test(t)) return true;
				return !lista.some(function (o) { return o !== t && o.indexOf(t) === 0 && /\d/.test(o); });
			}).sort();
			if (!lista.some(function (t) { return /\d/.test(t); })) return null;
			return { marca: marca, sig: lista.join(' '), tokens: lista };
		}
		function codigoModelo(f, paso) {
			if (!f) return '';
			var cods = f.tokens.filter(function (t) {
				return t.length >= 4 && /[A-Z]/.test(t) && /\d/.test(t) && !/^\d+(GB|TB|HZ|MS|W|IN|MM|P|K|MB|RPM)$/.test(t) && !/^\d{3,4}X\d{3,4}$/.test(t);
			});
			if (!cods.length) return '';
			var extra = paso === 'disco' ? f.tokens.filter(function (t) { return /^\d+(GB|TB)$/.test(t); }).join(' ') : '';
			return cods.sort().join(' ') + (extra ? '|' + extra : '');
		}
		function esAccesorio(nombre, paso) {
			var n = ' ' + limpio(nombre) + ' ';
			if (paso === 'video') return /SOPORTE|RISER|BACKPLATE|BRACKET|CABLE/.test(n) && !/(RTX|GTX|GT|RX)\s?-?\d{3,4}/.test(n);
			if (paso === 'fuente') return /CABLE|ADAPTADOR|EXTENSOR|EXTENSION|PINES/.test(n) && !/\d{3,4}\s?W(ATTS?)?[^A-Z]/.test(n);
			return false;
		}
		function perdedores(lista, paso) {
			var items = lista.map(function (p) {
				var cod = String(p.cod || '');
				var pn = alnum(cod.replace(PROVEEDORES, ''));
				var it = { p: p, local: !PROVEEDORES.test(cod), pn: pn, nombreAlnum: alnum(p.nombre), claves: [], firma: null,
					precio: typeof p.precio === 'number' ? p.precio : Infinity, stock: p.stock || 0 };
				if (pn && !/^APIEAN$/i.test(cod) && pn.length >= 6) it.claves.push('PN:' + pn);
				var mo = (paso === 'micro' || !paso) ? modeloMicroM(p.nombre) : '';
				if (mo) {
					if (/(^|[^A-Z])(TRAY|OEM)([^A-Z]|$)|SIN CAJA/i.test(p.nombre) || /MP?K$/i.test(pn)) mo += '-OEM';
					it.claves.push('MO:' + mo);
				} else if (paso !== 'micro') {
					it.firma = firma(p.nombre, cod, paso);
				}
				return it;
			});
			items.forEach(function (loc) {
				if (!loc.local || loc.pn.length < 7 || !/\d/.test(loc.pn)) return;
				items.forEach(function (it) { if (it !== loc && it.nombreAlnum.indexOf(loc.pn) !== -1) it.claves.push('PN:' + loc.pn); });
			});
			var marcasPor = {};
			items.forEach(function (it) {
				if (it.firma && it.firma.marca) (marcasPor[it.firma.sig] = marcasPor[it.firma.sig] || {})[it.firma.marca] = 1;
			});
			items.forEach(function (it) {
				if (!it.firma) return;
				var marca = it.firma.marca;
				if (!marca) { var ms = Object.keys(marcasPor[it.firma.sig] || {}); if (ms.length === 1) marca = ms[0]; }
				if (!marca) return;
				it.claves.push('SG:' + marca + ':' + it.firma.sig);
				if (paso === 'monitor' || paso === 'disco') {
					var cm = codigoModelo(it.firma, paso);
					if (cm) it.claves.push('CM:' + marca + ':' + cm);
				}
			});
			var grupo = {};
			function raiz(i) { while (grupo[i] !== i) i = grupo[i]; return i; }
			items.forEach(function (it, i) { grupo[i] = i; });
			var visto = {};
			items.forEach(function (it, i) {
				it.claves.forEach(function (k) {
					if (visto[k] === undefined) visto[k] = i;
					else { var a = raiz(i), b = raiz(visto[k]); if (a !== b) grupo[a] = b; }
				});
			});
			var grupos = {}, salen = [];
			items.forEach(function (it, i) { var r = raiz(i); (grupos[r] = grupos[r] || []).push(it); });
			Object.keys(grupos).forEach(function (k) {
				var g = grupos[k];
				if (g.length < 2) return;
				var locales = g.filter(function (it) { return it.local; });
				var quedan = locales.length ? locales : [g.slice().sort(function (a, b) { return a.precio - b.precio || b.stock - a.stock; })[0]];
				g.forEach(function (it) { if (quedan.indexOf(it) === -1) salen.push(it.p); });
			});
			return salen;
		}
		return { perdedores: perdedores, esAccesorio: esAccesorio };
	})();

	/* Paso del armador → nombre de paso del motor */
	var PASO_MOTOR = { micro: 'micro', cooler: 'cooler', mother: 'mother', ram: 'memoria', video: 'video', disco: 'disco',
		gabinete: 'gabinete', fuente: 'fuente', monitor: 'monitor', perif: 'periferico', wifi: 'wifi' };
	function sinRepetidos(lista, sec) {
		var motor = MOTOR;   /* el motor propio del armador: no depende de ningún otro archivo */
		if (sec && PASO_MOTOR[sec]) {
			try {
				var paso = PASO_MOTOR[sec];
				var prods = [];
				lista.forEach(function (it) {
					if (motor.esAccesorio && motor.esAccesorio(it.nombre, paso)) return;
					prods.push({ cod: it.code || '', nombre: it.nombre, precio: typeof it.precio === 'number' ? it.precio : Infinity, stock: it.stock || 0, it: it });
				});
				var salen = motor.perdedores(prods, paso);
				return sinRepetidosPropio(prods.filter(function (p) { return salen.indexOf(p) === -1; }).map(function (p) { return p.it; }));
			} catch (e) { /* si el motor falla, sigue con la limpieza propia */ }
		}
		return sinRepetidosPropio(lista);
	}
	function sinRepetidosPropio(lista) {
		var g = {};
		lista.forEach(function (it) {
			var c = sinAcentos(nombreLimpio(it.nombre)).toUpperCase().replace(/[^A-Z0-9]+/g, '');
			var a = g[c];
			if (!a || (it.precio || 9e15) < (a.precio || 9e15) || ((it.precio === a.precio) && it.local && !a.local)) g[c] = it;
		});
		return lista.filter(function (it) { return g[sinAcentos(nombreLimpio(it.nombre)).toUpperCase().replace(/[^A-Z0-9]+/g, '')] === it; });
	}

	/* =================================================================
	   ESTADO Y MEMORIA
	   ================================================================= */
	var CLAVE = 'cg-armador-v1';
	var S = { sel: {}, skip: {}, actual: 'micro', marca: 'ALL', f: {}, busca: '', orden: 'asc', mostrar: CFG.porPagina, avisos: [], panel: false, confirmar: false, cargando: false, lista: [], items: null };

	function guardar() {
		var st = { t: Date.now(), actual: S.actual, skip: S.skip, sel: {}, enviado: !!S.enviado, carrito: !!S.carrito };
		Object.keys(S.sel).forEach(function (k) { var it = S.sel[k].it; st.sel[k] = { i: it.item_id, q: S.sel[k].q, p: it.precio, n: it.nombreErp ? 'Armado de PC' : it.nombre, c: it.code, b: it.brand_id }; });
		try { localStorage.setItem(CLAVE, JSON.stringify(st)); } catch (e) {}
	}
	function leerPropio() { try { var st = JSON.parse(localStorage.getItem(CLAVE)); return st && st.sel && Object.keys(st.sel).length ? st : null; } catch (e) { return null; } }
	function toast(t) {
		if (!ROOT) return;
		var d = document.createElement('div'); d.className = 'cgx-toast'; d.setAttribute('role', 'status'); d.textContent = t;
		ROOT.appendChild(d);
		setTimeout(function () { d.classList.add('is-out'); }, 3200); setTimeout(function () { d.remove(); }, 3800);
	}
	/* El botón flotante de WhatsApp de la web se corre hacia arriba en el celular, para no tapar la barra */
	function subirWhatsapp(extra) {
		if (!window.matchMedia || !matchMedia('(max-width: 899px)').matches) return;
		Array.prototype.forEach.call(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], [class*="whatsapp" i], [id*="whatsapp" i]'), function (el) {
			if (ROOT && ROOT.contains(el)) return;
			var cs = getComputedStyle(el);
			if (cs.position !== 'fixed') return;
			var b0 = parseFloat(cs.bottom) || 0;
			if (b0 > window.innerHeight / 2 || el.dataset.cgxSubido) return;
			el.dataset.cgxSubido = '1';
			el.style.setProperty('bottom', (b0 + extra) + 'px', 'important');
		});
	}
	/* WhatsApp flotante de la web: se esconde mientras la lista "Mi PC" está abierta */
	function ocultarWhatsapp(si) {
		Array.prototype.forEach.call(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], [class*="whatsapp" i], [id*="whatsapp" i]'), function (el) {
			if (ROOT && ROOT.contains(el)) return;
			if (getComputedStyle(el).position !== 'fixed' && !el.dataset.cgxOculto) return;
			if (si) { el.dataset.cgxOculto = '1'; el.style.setProperty('visibility', 'hidden', 'important'); }
			else if (el.dataset.cgxOculto) { delete el.dataset.cgxOculto; el.style.removeProperty('visibility'); }
		});
	}
	/* Pantalla de espera: la misma en todo el recorrido */
	function espera(txt) {
		if (!ROOT) return;
		var d = document.getElementById('cgx-espera');
		if (!d) {
			d = document.createElement('div'); d.id = 'cgx-espera'; d.className = 'cgx-espera'; d.setAttribute('role', 'status'); d.setAttribute('aria-live', 'polite');
			var cs = getComputedStyle(ROOT);
			['--x-bg', '--x-t', '--x-borde', '--x-vidrio', '--x-vidrio2'].forEach(function (v) { var x = cs.getPropertyValue(v); if (x) d.style.setProperty(v, x.trim()); });
			document.body.appendChild(d);
		}
		d.innerHTML = '<div class="cgx-espera-c"><span class="cgx-espera-spin" aria-hidden="true"></span><strong>' + esc(txt) + '</strong></div>';
		void d.offsetWidth; d.classList.add('is-on');
	}
	function esperaFin() { var d = document.getElementById('cgx-espera'); if (d) d.remove(); }
	/* Muestra la espera y navega en el cuadro siguiente, para que llegue a verse */
	function irConEspera(txt, url) {
		espera(txt);
		var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
		raf(function () { raf(function () { location.href = url; }); });
	}
	window.addEventListener('pageshow', function (e) { if (e.persisted) { esperaFin(); SALIENDO = false; } });
	/* Cuántos productos hay en el carrito según el contador del encabezado de la web: "(0) $ 0,00" */
	function itemsEnCarrito() {
		var a = document.querySelector('a[href*="carrito" i], a[href*="CHECKOUT" i]');
		var zona = a ? (a.closest('li, .carrito, [class*="cart" i], [class*="carrito" i]') || a.parentNode || a) : null;
		var m = zona && zona.textContent.match(/\((\d+)\)/);
		return m ? +m[1] : null;
	}
	function urlCarrito() {
		var a = document.querySelector('a[href*="carrito" i], a[href*="CHECKOUT" i]');
		return a ? a.href : location.origin + '/CHECKOUT/carrito/compugarden.aspx';
	}
	function leerGuardado() {
		try {
			var h = location.hash.match(/[#&]b=([^&]+)/);
			if (h) return { st: JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(h[1]))))), link: true };
		} catch (e) {}
		try {
			var st = JSON.parse(localStorage.getItem(CLAVE));
			if (st && st.sel && Object.keys(st.sel).length && Date.now() - st.t < CFG.guardarDias * 864e5) return { st: st };
		} catch (e) {}
		return null;
	}
	function borrarTodo() {
		S.enviado = false; S.carrito = false; S.avisoFijo = null; S.sel = {}; S.skip = {}; S.actual = 'micro'; S.avisos = []; S.f = {}; S.busca = ''; S.marca = 'ALL';
		try { localStorage.removeItem(CLAVE); } catch (e) {}
		if (location.hash) history.replaceState(null, '', location.pathname + location.search);
	}
	function linkCompartir() {
		var st = { actual: S.actual, skip: S.skip, sel: {} };
		Object.keys(S.sel).forEach(function (k) { st.sel[k] = { i: S.sel[k].it.item_id, q: S.sel[k].q }; });
		return location.origin + location.pathname + '#b=' + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(st)))));
	}

	/* Recupera un armado guardado y revisa precio, stock y compatibilidad */
	function restaurar(st, pasoForzado, silencioso, motivo) {
		var ids = Object.keys(st.sel || {}).map(function (k) { return st.sel[k].i; });
		S.cargando = true; render();
		return api({ seccion: 'byids', ids: ids }).then(function (lista) {
			var por = {}; lista.forEach(function (it) { por[it.item_id] = it; });
			var cambios = [];
			S.sel = {};
			Object.keys(st.sel).forEach(function (k) {
				if (!PASOS[k]) return;
				var it = por[st.sel[k].i], antes = st.sel[k].p;
				if (it && it.precio != null) {
					S.sel[k] = { it: it, q: st.sel[k].q || 1 };
					if (antes && Math.abs(antes - it.precio) > 1) cambios.push({ tipo: 'info', paso: k, t: PASOS[k].t + ': cambió el precio. Antes ' + plata(antes) + ', ahora ' + plata(it.precio) + '.' });
				} else cambios.push({ tipo: 'warn', paso: k, t: PASOS[k].t + ': el producto que habías elegido ya no está disponible. Elegí otro.' });
			});
			S.skip = st.skip || {};
			S.enviado = !!st.enviado;
			S.carrito = !!st.carrito;
			S.avisos = cambios;
			S.cargando = false; guardar();
			if (motivo === 'carrito' && S.carrito) S.avisoFijo = { tipo: 'carrito' };
			if (motivo === 'compartido') S.avisoFijo = { tipo: 'compartido' };
			irA(pasoForzado && PASOS[pasoForzado] ? pasoForzado : (siguientePendiente() || (st.actual && PASOS[st.actual] ? st.actual : 'micro')), true);
			if (motivo === 'retomar' && (Object.keys(S.sel).length || Object.keys(S.skip).length)) { S.avisoFijo = { tipo: 'retomar' }; renderAvisos(); }
			revisarDeFondo();
		}).catch(function () { S.cargando = false; error('No pudimos recuperar tu armado. Probá de nuevo en unos segundos.'); });
	}
	/* Después de mostrar el armado: cada pieza tiene que seguir en la lista de su paso (stock y compatibilidad).
	   Va de a un pedido, en orden, y solo avisa si algo cambió. */
	function revisarDeFondo() {
		var orden = ORDEN.filter(function (k) { return S.sel[k]; });
		var cambios = [];
		var paso = function (i) {
			if (i >= orden.length || SALIENDO) return Promise.resolve();
			var k = orden[i];
			if (!S.sel[k] || falta(k)) return paso(i + 1);
			var elegido = S.sel[k].it.item_id;
			return api(paramsDe(k)).then(function (l) {
				if (!S.sel[k] || S.sel[k].it.item_id !== elegido) return;
				var f = l.filter(function (x) { return x.item_id === elegido; })[0];
				if (!f) {
					delete S.sel[k];
					cambios.push({ tipo: 'warn', paso: k, t: PASOS[k].t + (k === 'mother' || k === 'ram' ? ': el producto que habías elegido ya no está disponible o no es compatible. Elegí otro.' : ': el producto que habías elegido ya no está disponible. Elegí otro.') });
				} else {
					S.sel[k].it = f;
					if (f.max_qty && S.sel[k].q > f.max_qty) S.sel[k].q = f.max_qty;
				}
			}, function () {}).then(function () { return paso(i + 1); });
		};
		return paso(0).then(function () {
			if (!cambios.length) return;
			S.avisos = S.avisos.concat(cambios); guardar();
			renderAvisos(); renderPanel(); renderBarra(); renderHead();
			if (cambios.some(function (c) { return c.paso === S.actual; })) renderLista();
		});
	}

	/* Revisa que mother y memoria sigan siendo compatibles. Quita lo que dejó de serlo. */
	function revisarCompat() {
		var avisos = [], tareas = [];
		if (sel('micro') && sel('mother')) tareas.push(api(paramsDe('mother')).then(function (l) {
			if (!l.some(function (x) { return x.item_id === sel('mother').item_id; })) {
				delete S.sel.mother; avisos.push({ tipo: 'warn', paso: 'mother', t: 'Tu motherboard no es compatible con el procesador nuevo. La sacamos para que elijas otra.' });
			}
		}));
		return Promise.all(tareas).then(function () {
			if (!sel('mother') || !sel('ram')) return;
			return api(paramsDe('ram')).then(function (l) {
				var r = l.filter(function (x) { return x.item_id === sel('ram').item_id; })[0];
				if (!r) { delete S.sel.ram; avisos.push({ tipo: 'warn', paso: 'ram', t: 'Tu memoria no es compatible con la motherboard nueva. La sacamos para que elijas otra.' }); }
				else if (r.max_qty && S.sel.ram.q > r.max_qty) { S.sel.ram.q = r.max_qty; avisos.push({ tipo: 'info', paso: 'ram', t: 'Tu motherboard admite hasta ' + r.max_qty + ' módulos: ajustamos la cantidad.' }); }
			});
		}).then(function () { return avisos; });
	}

	/* =================================================================
	   ACCIONES
	   ================================================================= */
	function hecho(k) {
		if (k === 'perif2' || k === 'perif3') return !!S.sel[k] || !!S.skip[k] || !!S.skip.perif1;
		return !!S.sel[k] || !!S.skip[k];
	}
	function siguientePendiente(desde) {
		if (desde === 'perif2' || desde === 'perif3') desde = 'perif1';
		var i = desde ? VIS.indexOf(desde) + 1 : 0;
		for (var j = 0; j < VIS.length; j++) { var k = VIS[(i + j) % VIS.length]; if (!hecho(k)) return k; }
		return null;
	}
	function irA(k, sinTransicion) {
		if (k === 'perif2' || k === 'perif3') k = 'perif1';
		if (S.hoja) { S.hoja = false; renderHoja(); }
		S.actual = k || null; S.f = {}; S.busca = ''; S.mostrar = tanda(true); S.panel = false; S.items = null;
		if (k !== 'micro') S.marca = 'ALL';
		if (Object.keys(S.sel).length || Object.keys(S.skip).length) guardar();
		var lst = $('#cgx-lista');
		var pintar = function () {
			render();
			if (k) cargarLista();
			var l2 = $('#cgx-lista'); if (l2 && !sinTransicion) { l2.classList.add('is-entrando'); var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); }; raf(function () { raf(function () { l2.classList.remove('is-entrando'); }); }); }
		};
		pintar();
		var top = $('#cgx-top'); if (top && top.getBoundingClientRect().top < -40) top.scrollIntoView({ behavior: reducirMovimiento() ? 'auto' : 'smooth', block: 'start' });
	}
	function reducirMovimiento() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }
	function cargarLista() {
		var k = S.actual;
		if (falta(k)) { S.items = []; renderLista(); return; }
		var p = paramsDe(k);
		var listo = yaCargado(p);
		setTimeout(function () { precargarFotos(siguientePendiente(k)); precargar(); }, 500);
		if (listo) { S.items = sinRepetidos(listo.filter(function (it) { return it.precio != null; }), PASOS[k].sec); renderLista(); if (k === 'mother') precargarMemorias(listo); return; }
		S.items = null; renderLista();
		CARGANDO_LISTA = true;
		api(p).then(function (l) {
			CARGANDO_LISTA = false;
			if (S.actual !== k) return;
			S.items = sinRepetidos(l.filter(function (it) { return it.precio != null; }), PASOS[k].sec);
			renderLista();
			if (k === 'mother') precargarMemorias(l);
		}).catch(function () { CARGANDO_LISTA = false; if (S.actual === k) { S.items = []; error('No pudimos cargar los productos. Revisá tu conexión y probá de nuevo.'); } });
	}
	var eligiendo = false;
	function elegir(it, card) {
		if (eligiendo) return;
		var k = S.actual, q = 1, estaba = completo();
		var qsel = document.getElementById('cgx-q-' + it.item_id); if (qsel) q = +qsel.value || 1;
		S.sel[k] = { it: it, q: q }; delete S.skip[k];
		S.avisos = S.avisos.filter(function (a) { return a.paso !== k; });
		if (S.carrito) { S.carrito = false; S.avisoFijo = null; }
		if (S.avisoFijo && S.avisoFijo.tipo === 'retomar') S.avisoFijo = null;
		eligiendo = true;
		$$('.cgx-card.is-sel').forEach(function (c) { c.classList.remove('is-sel'); c.setAttribute('aria-pressed', 'false'); });
		if (card) { card.classList.add('is-sel', 'is-pulso'); card.setAttribute('aria-pressed', 'true'); }
		renderHead(); renderPanel(); renderBarra();
		var dep = k === 'micro' || k === 'mother';
		if (k === 'micro') encolar(paramsDe('mother'));
		if (k === 'mother') encolar(paramsDe('ram'));
		precargarFotos(siguientePendiente(k));
		var pausa = new Promise(function (r) { setTimeout(r, reducirMovimiento() ? 0 : 120); });
		var compat = dep ? revisarCompat().then(function (av) { S.avisos = S.avisos.concat(av); }) : null;
		Promise.all([pausa, compat]).then(function () { eligiendo = false; avanzar(k, estaba); }, function () { eligiendo = false; avanzar(k, estaba); });
	}
	/* Periféricos: hasta 2, tocar marca o desmarca */
	var PERIFS = ['perif1', 'perif2', 'perif3'];
	function perifsElegidos() { return PERIFS.map(function (k) { return S.sel[k]; }).filter(Boolean); }
	/* Periféricos: hasta 3, tocar marca o desmarca */
	function elegirPerif(it) {
		var lista = perifsElegidos();
		if (S.carrito) { S.carrito = false; S.avisoFijo = null; }
		if (S.avisoFijo && S.avisoFijo.tipo === 'retomar') S.avisoFijo = null;
		PERIFS.forEach(function (k) { delete S.skip[k]; });
		var i = lista.map(function (x) { return x.it.item_id; }).indexOf(it.item_id);
		if (i > -1) lista.splice(i, 1);
		else if (lista.length < 3) lista.push({ it: it, q: 1 });
		else { toast('Ya elegiste 3 periféricos: tocá uno para quitarlo.'); return; }
		PERIFS.forEach(function (k, j) { if (lista[j]) S.sel[k] = lista[j]; else delete S.sel[k]; });
		guardar(); renderPanel(); renderBarra(); renderHead();
		if (lista.length === 3) { setTimeout(function () { avanzar('perif1', false); }, 250); return; }
		renderLista();
	}
	function saltear() {
		var k = S.actual, estaba = completo(); delete S.sel[k]; S.skip[k] = true;
		if (k === 'perif1') { delete S.sel.perif2; delete S.sel.perif3; S.skip.perif2 = true; S.skip.perif3 = true; }
		if (k === 'armado' && S.sel.so && requiereArmado(S.sel.so.it)) {
			delete S.sel.so;
			S.avisos = S.avisos.filter(function (a) { return a.paso !== 'so'; }).concat([{ tipo: 'warn', paso: 'so', t: 'Quitamos el sistema operativo: sin armado no lo podemos instalar.' }]);
		}
		if (S.carrito) { S.carrito = false; S.avisoFijo = null; }
		if (S.avisoFijo && S.avisoFijo.tipo === 'retomar') S.avisoFijo = null;
		S.avisos = S.avisos.filter(function (a) { return a.paso !== k; });
		avanzar(k, estaba);
	}
	/* Pasa al siguiente paso pendiente; si no queda ninguno, va a la página de compra */
	function avanzar(k, estabaCompleta) {
		var sig = siguientePendiente(k);
		if (sig) { guardar(); irA(sig); return; }
		if (estabaCompleta) { guardar(); render(); toast('Cambio guardado. Tu PC está completa.'); return; }
		irAComprar();
	}
	function irAComprar() {
		S.enviado = true; SALIENDO = true; guardar();
		try { sessionStorage.removeItem('cg-auto-carrito'); } catch (e) {}
		if (S.hoja) { S.hoja = false; renderHoja(); renderBarra(); }
		irConEspera('Preparando el resumen de tu PC…', urlCompra());
	}
	function irAResumen() {
		S.enviado = true; SALIENDO = true; guardar();
		try { sessionStorage.removeItem('cg-auto-carrito'); } catch (e) {}
		if (S.hoja) { S.hoja = false; renderHoja(); renderBarra(); }
		irConEspera('Preparando el resumen de tu PC…', urlCompra());
	}
	function quitar(k) { delete S.sel[k]; delete S.skip[k]; guardar(); irA(k); }

	function total() {
		var t = 0; Object.keys(S.sel).forEach(function (k) { t += (S.sel[k].it.precio || 0) * (S.sel[k].q || 1); }); return t;
	}
	function urlCompra() {
		var v = { MM: '0' };
		var mi = sel('micro'); if (mi) v.MM = String(mi.brand_id === CFG.marcas.Intel ? CFG.marcas.Intel : CFG.marcas.AMD);
		ORDEN.forEach(function (k) {
			var p = PASOS[k]; v[p.url] = S.sel[k] ? String(S.sel[k].it.item_id) : '0';
			if (p.qurl) v[p.qurl] = S.sel[k] ? String(S.sel[k].q || 1) : '1';
		});
		var orden = ORDEN_URL;
		return location.origin + '/armarpccompra/PASO=15;' + orden.map(function (c) { return c + '=' + v[c]; }).join(';') + '/compugarden.aspx';
	}
	function valoresCompraDe(st) {
		var v = { MM: '0' }, mi = st && st.sel && st.sel.micro;
		if (mi) v.MM = String(mi.b === CFG.marcas.Intel ? CFG.marcas.Intel : CFG.marcas.AMD);
		ORDEN.forEach(function (k) {
			var p = PASOS[k], g = st && st.sel && st.sel[k];
			v[p.url] = g ? String(g.i) : '0';
			if (p.qurl) v[p.qurl] = g ? String(g.q || 1) : '1';
		});
		return v;
	}
	function urlCompraDe(st) {
		var v = valoresCompraDe(st);
		return location.origin + '/armarpccompra/PASO=15;' + ORDEN_URL.map(function (c) { return c + '=' + v[c]; }).join(';') + '/compugarden.aspx';
	}
	function urlWhatsapp() {
		var l = ['Hola, quiero consultar por este armado:'];
		ORDEN.forEach(function (k) { if (S.sel[k]) l.push('• ' + PASOS[k].t + ': ' + nombreLimpio(S.sel[k].it.nombre) + (S.sel[k].q > 1 ? ' x' + S.sel[k].q : '')); });
		if (l.length === 1) l = ['Hola, quiero armar una PC y necesito asesoramiento.'];
		else { l.push('Total: ' + plata(total())); l.push(linkCompartir()); }
		return 'https://api.whatsapp.com/send?phone=' + CFG.whatsapp + '&text=' + encodeURIComponent(l.join('\n'));
	}
	function error(t) { S.avisos = S.avisos.filter(function (a) { return !a.err; }).concat([{ tipo: 'warn', t: t, err: true }]); render(); }

	/* =================================================================
	   PANTALLA
	   ================================================================= */
	var ROOT, ARMADO = false;
	function armazon() {
		ROOT.innerHTML = '<div id="cgx-top" class="cgx-head"></div><div id="cgx-pc" class="cgx-pc"></div>' +
			'<div class="cgx-main"><div id="cgx-avisos"></div><div id="cgx-lista" class="cgx-fade"></div></div><div id="cgx-barra" class="cgx-barra"></div>';
		ARMADO = true;
	}
	function render() {
		if (!ROOT) return;
		if (!ARMADO) armazon();
		renderHead(); renderAvisos(); renderPanel(); renderBarra();
		var box = $('#cgx-lista');
		if (S.cargando) box.innerHTML = esqueleto('Recuperando tu armado');
		else if (!S.actual) box.innerHTML = finalHTML();
		else renderLista();
	}
	function plataCorta(n) { return n == null || isNaN(n) ? '' : '$ ' + Math.round(n).toLocaleString('es-AR'); }
	function renderHead() {
		var k = S.actual, p = k ? PASOS[k] : null;
		var empezo = Object.keys(S.sel).length > 0 || Object.keys(S.skip).length > 0;
		var crumb = p ? 'Paso ' + (VIS.indexOf(k) + 1) + ' de ' + VIS.length + ' · ' + esc(p.t) : 'Tu PC está completa';
		var ayuda = '<nav class="cgx-accesos" aria-label="Ayuda">' +
			'<a class="cgx-vidrio" href="' + esc(CFG.pcArmadas) + '"><span class="cgx-acc-ico">' + ico('pc', 20) + '</span><span><strong>Ver PC armadas</strong><small>Listas para llevar</small></span></a>' +
			'</nav>';
		var ben = [['escudo', 'Compatibilidad verificada', 'Compatible', 'is-ok'], ['reloj', 'Armada en 1 hora', '1 hora'], ['tarjeta', 'Hasta 18 cuotas fijas', '18 cuotas'], ['envio', 'Envíos a todo el país', 'Envíos']];
		var benHTML = function (n) { return '<ul class="cgx-ben">' + ben.slice(0, n).map(function (x) { return '<li class="' + (x[3] || '') + '" title="' + x[1] + '">' + ico(x[0], 15) + '<span class="cgx-ben-l">' + x[1] + '</span><span class="cgx-ben-c">' + x[2] + '</span></li>'; }).join('') +
			'<li class="cgx-ben-link"><a href="' + esc(CFG.pcArmadas) + '">' + ico('pc', 15) + 'Ver PC armadas' + ico('flecha', 13) + '</a></li></ul>'; };
		var titulo = '<h1 class="cgx-h1">Armá <span class="cgx-grad">tu PC</span> a tu gusto</h1>';
		$('#cgx-top').innerHTML = !empezo
			? '<div class="cgx-hero"><div class="cgx-hero-t"><span class="cgx-eyebrow">Armador de PC · Compugarden</span>' + titulo +
				'<p class="cgx-hero-sub"><span class="cgx-ben-l">Elegí cada componente y nosotros verificamos que todo sea compatible. Te la entregamos armada y probada en 1 hora, o te la enviamos a todo el país.</span><span class="cgx-ben-c">Verificamos que todo sea compatible y te la entregamos armada en 1 hora.</span></p>' + benHTML(4) + '</div></div>'
			: '<div class="cgx-title is-compacto"><div class="cgx-title-t">' + titulo + '<span class="cgx-crumb">' + crumb + '</span></div>' + benHTML(2) + '</div>';
		ROOT.classList.toggle('is-empezado', empezo);
	}
	function completo() { return VIS.every(hecho) && Object.keys(S.sel).length > 0; }
	function renderAvisos() {
		var k = S.actual, h = '';
		if (S.avisoFijo && S.avisoFijo.tipo === 'carrito') {
			h += '<div class="cgx-fijo">' + ico('check', 20) + '<span><strong>Esta PC ya está en tu carrito.</strong> Si cambiás algo, después volvé a agregarla.</span>' +
				'<a class="cgx-btn" href="' + esc(urlCarrito()) + '">Ver carrito</a><button type="button" class="cgx-btn" data-a="otra">Armar otra PC</button></div>';
		}
		if (S.avisoFijo && S.avisoFijo.tipo === 'retomar') {
			h += '<div class="cgx-fijo is-retomar">' + ico('reset', 20) + '<span><strong>Retomamos el armado que habías empezado</strong> (' + VIS.filter(hecho).length + ' de ' + VIS.length + ' piezas).</span>' +
				(S.avisoFijo.confirma
					? '<strong class="cgx-fijo-q">¿Borrar tu armado?</strong><button type="button" class="cgx-btn is-peligro" data-a="borrar">Sí, borrar</button><button type="button" class="cgx-btn" data-a="fijonobor">Cancelar</button>'
					: '<button type="button" class="cgx-btn cgx-prim" data-a="cerrarfijo">Seguir armando</button><button type="button" class="cgx-btn" data-a="fijoborrar">Empezar de nuevo</button>') + '</div>';
		}
		if (S.avisoFijo && S.avisoFijo.tipo === 'compartido') {
			var hayMio = false; try { hayMio = !!localStorage.getItem(CLAVE + '-previo'); } catch (e) {}
			h += '<div class="cgx-fijo">' + ico('link', 20) + '<span><strong>Te compartieron este armado.</strong> Podés cambiar lo que quieras.</span>' +
				(hayMio ? '<button type="button" class="cgx-btn" data-a="mio">Volver al mío</button>' : '') + '<button type="button" class="cgx-x" data-a="cerrarfijo" aria-label="Cerrar">' + ico('x', 14) + '</button></div>';
		}
		advertencias().forEach(function (a) {
			h += '<div class="cgx-aviso is-warn">' + ico('warn', 18) + '<span>' + esc(a.t) + (a.wa ? ' <a href="' + esc(urlWhatsapp()) + '" target="_blank" rel="noopener">Consultanos por WhatsApp</a>' : '') + '</span>' +
				(a.paso !== k ? '<button type="button" class="cgx-link" data-ir="' + a.paso + '">Ir al paso</button>' : '') + '</div>';
		});
		$('#cgx-avisos').innerHTML = h + S.avisos.map(function (a, i) {
			return '<div class="cgx-aviso is-' + a.tipo + '">' + ico(a.tipo === 'warn' ? 'warn' : a.tipo === 'ok' ? 'check' : 'info', 18) + '<span>' + esc(a.t) + '</span>' +
				(a.paso && a.paso !== k ? '<button type="button" class="cgx-link" data-ir="' + a.paso + '">Ir al paso</button>' : '') + '<button type="button" class="cgx-x" data-cerrar="' + i + '" aria-label="Cerrar aviso">' + ico('x', 14) + '</button></div>';
		}).join('');
	}
	/* La barra de tu PC: las 15 piezas con foto y precio; tocar una abre ese paso */
	function renderPanel() {
		var k = S.actual, t = total(), n = VIS.filter(hecho).length, hay = Object.keys(S.sel).length, faltan = VIS.filter(function (x) { return !hecho(x); });
		var h = '<div class="cgx-pc-piezas">';
		ETAPAS.forEach(function (e) {
			h += '<div class="cgx-pc-et"><span class="cgx-pc-et-t">' + esc(e.n) + '</span><div class="cgx-pc-fila">';
			e.pasos.forEach(function (x) {
				var s1 = S.sel[x];
				var pe = x === 'perif1' ? perifsElegidos() : [];
				if (pe.length > 1) s1 = { it: pe[0].it, q: 1, extras: pe.slice(1) };
				var cls = 'cgx-slot' + (x === k ? ' is-on' : '') + (s1 ? ' is-hecho' : (S.skip[x] ? ' is-skip' : ''));
				var foto = s1 ? '<img alt="" src="' + esc(img(s1.it)) + '" onerror="this.onerror=null;this.src=window.cgSinFoto">' : ico(PASOS[x].ico, 18);
				var abajo = s1 ? plataCorta((s1.it.precio || 0) * (s1.q || 1) + (s1.extras || []).reduce(function (a2, e2) { return a2 + (e2.it.precio || 0); }, 0)) + (s1.q > 1 ? ' ·x' + s1.q : '') + (s1.extras ? ' ·' + (s1.extras.length + 1) : '') : (S.skip[x] ? (textoNo(x) || {}).corto || 'No incluido' : (x === k ? 'Eligiendo' : '—'));
				h += '<button type="button" class="' + cls + '" data-ir="' + x + '" title="' + esc(PASOS[x].t + (s1 ? ': ' + nombreLimpio(s1.it.nombre) : '')) + '">' +
					'<span class="cgx-slot-img">' + foto + (s1 || S.skip[x] ? '<span class="cgx-slot-ok">' + ico('check', 10) + '</span>' : '') + '</span>' +
					'<span class="cgx-slot-k">' + esc(PASOS[x].c) + '</span><span class="cgx-slot-p">' + esc(abajo) + '</span></button>';
			});
			h += '</div></div>';
		});
		h += '</div><div class="cgx-pc-tot"><span class="cgx-pc-tl">Total · ' + n + ' de ' + VIS.length + '</span><strong>' + plata(t) + '</strong>' +
			'<small>Efectivo o transferencia</small>';
		if (!hay) h += '<button type="button" class="cgx-btn cgx-grande" disabled>Comprar</button>';
		else h += '<a class="cgx-btn cgx-prim cgx-grande" data-a="comprar" href="' + esc(urlCompra()) + '">' + (faltan.length ? 'Comprar con lo elegido' : 'Comprar') + '</a>';
		if (S.confirmar) h += '<div class="cgx-confirma"><strong>¿Borrar tu armado?</strong><div><button type="button" class="cgx-btn is-peligro" data-a="borrar">Sí, borrar</button><button type="button" class="cgx-btn" data-a="nobor">Cancelar</button></div></div>';
		else if (hay || Object.keys(S.skip).length) h += '<div class="cgx-pc-acc">' + (hay ? '<button type="button" class="cgx-link" data-a="copiar">' + ico('link', 14) + '<span>Copiar link</span></button>' : '') + '<button type="button" class="cgx-link" data-a="reiniciar">' + ico('reset', 14) + 'Empezar de nuevo</button></div>';
		$('#cgx-pc').innerHTML = h + '</div><div class="cgx-pc-prog" aria-hidden="true"><i style="width:' + Math.round(n / VIS.length * 100) + '%"></i></div>';
		var on = $('#cgx-pc .cgx-slot.is-on'), fila = on && on.closest('.cgx-pc-piezas');
		if (on && fila && fila.scrollWidth > fila.clientWidth) {
			var rf = fila.getBoundingClientRect(), ro = on.getBoundingClientRect();
			fila.scrollLeft += (ro.left - rf.left) - (fila.clientWidth - ro.width) / 2;
		}
	}
	function renderBarra() { $('#cgx-barra').innerHTML = barraHTML(); vigilarPanel(); }
	function vigilarPanel() {
		var pc = $('#cgx-pc');
		if (!pc || !window.IntersectionObserver || ROOT._pcVisto === pc) return;
		if (ROOT._obsPc) ROOT._obsPc.disconnect();
		ROOT._pcVisto = pc;
		ROOT._obsPc = new IntersectionObserver(function (en) { ROOT.classList.toggle('is-barra-pc', !en[0].isIntersecting && en[0].boundingClientRect.top < 0); });
		ROOT._obsPc.observe(pc);
	}
	function esqueletoResumen() {
		var c = '';
		for (var i = 0; i < 6; i++) c += '<div class="cgx-c-fila is-skel" aria-hidden="true"><div class="cgx-c-img cgx-sk"></div><div class="cgx-c-info"><span class="cgx-sk w40"></span><span class="cgx-sk w70"></span></div><span class="cgx-sk" style="width:64px"></span></div>';
		return '<p class="cgx-sr" role="status">Cargando tu PC</p><div class="cgx-body"><main class="cgx-main"><div class="cgx-c-lista">' + c + '</div></main></div>';
	}
	function esqueleto(txt) {
		var c = '';
		for (var i = 0; i < 6; i++) c += '<div class="cgx-card is-skel" aria-hidden="true"><div class="cgx-img"></div><div class="cgx-card-b"><span class="cgx-sk w40"></span><span class="cgx-sk"></span><span class="cgx-sk w70"></span><span class="cgx-sk w50 alto"></span></div></div>';
		return '<p class="cgx-sr" role="status">' + esc(txt || 'Cargando productos') + '</p><div class="cgx-grid">' + c + '</div>';
	}

	function renderLista() {
		var box = $('#cgx-lista'); if (!box) return;
		var k = S.actual, h = '';
		var prev = VIS[VIS.indexOf(k) - 1];
		h += '<div class="cgx-paso-h"><h2 class="cgx-h2">' + esc(PASOS[k].t) + '</h2>' + (prev ? '<button type="button" class="cgx-link" data-ir="' + prev + '">' + ico('back', 14) + 'Paso anterior</button>' : '') + '</div>';
		var av = avisoPaso(k);
		if (PASOS[k].multi) {
			var nm = perifsElegidos().length;
			h += '<div class="cgx-multi">' + ico('info', 18) + '<span>Podés llevar <strong>hasta 3 periféricos</strong>, combinando los que quieras: tocá cada uno para sumarlo o quitarlo. ' + (nm ? 'Elegiste ' + nm + '.' : '') + '</span>' +
				(nm === 1 || nm === 2 ? '<button type="button" class="cgx-btn cgx-prim" data-a="perifuno">Seguir con ' + nm + (nm === 1 ? ' periférico' : ' periféricos') + '</button>' : '') + '</div>';
		}
		if (av) h += '<div class="cgx-nota is-' + av.tipo + (S.verMas ? ' is-abierta' : '') + '">' + ico(av.tipo === 'warn' ? 'warn' : (av.tipo === 'ok' ? 'check' : 'info'), 18) + '<span>' +
			(av.titulo ? '<strong>' + esc(av.titulo) + '</strong> ' : '') + esc(av.t) +
			(av.ir ? ' <button type="button" class="cgx-link" data-ir="' + av.ir.k + '">' + esc(av.ir.t) + '</button>' : '') +
			(av.leyenda ? '<small>' + esc(av.leyenda) + (av.wa ? ' ¿Dudas? <a href="' + esc(urlWhatsapp()) + '" target="_blank" rel="noopener">Consultanos por WhatsApp</a>.' : '') + '</small>' : '') + '</span>' +
			(av.tipo === 'warn' ? '' : '<button type="button" class="cgx-link cgx-vermas" data-a="vermas">' + (S.verMas ? 'Ver menos' : 'Ver más') + '</button>') + '</div>';
		if (k === 'micro') {
			h += '<div class="cgx-tabs" role="tablist">' + [['ALL', 'Todos'], ['AMD', 'AMD'], ['Intel', 'Intel']].map(function (m) {
				return '<button type="button" role="tab" aria-selected="' + (S.marca === m[0]) + '" class="cgx-tab' + (S.marca === m[0] ? ' is-on' : '') + '" data-marca="' + m[0] + '">' + m[1] + '</button>';
			}).join('') + '</div>';
		}
		var no = k === 'armado' ? null : textoNo(k);
		var noHTML = no ? '<button type="button" class="cgx-no' + (no.reco ? ' is-reco' : '') + (S.skip[k] ? ' is-on' : '') + '" data-a="saltear">' + ico(no.reco ? 'check' : 'x', 16) + '<span>' + esc(no.t) + (no.nota ? '<small>' + esc(no.nota) + '</small>' : '') + '</span></button>' : '';
		var fa = falta(k);
		if (fa || !S.items) h += noHTML;
		if (fa) {
			box.innerHTML = h + '<div class="cgx-vacio">' + (fa === 'micro' ? 'Elegí primero tu procesador para ver las motherboards compatibles.' : 'Elegí primero tu motherboard para ver las memorias compatibles.') +
				' <button type="button" class="cgx-btn cgx-prim" data-ir="' + fa + '">Ir a ' + esc(PASOS[fa].t) + '</button></div>';
			return;
		}
		if (!S.items) { box.innerHTML = h + esqueleto(); return; }

		var base = S.items.filter(function (it) {
			if (k === 'disco2' && sel('disco1') && it.item_id === sel('disco1').item_id) return false;
			if (k === 'so' && sinArmado() && requiereArmado(it)) return false;
			if (k === 'ram' && sel('mother')) { var dm = ddrMother(N(sel('mother'))), dr = ddrMemoria(N(it)); if (dm && dr && dm !== dr) return false; }
			return k !== 'micro' || S.marca === 'ALL' || it.brand_id === CFG.marcas[S.marca];
		});
		var chips = [{ t: 'Stock en el local', f: function (n, it) { return it.local; } }];
		chipsDe(k).forEach(function (c) {
			if (!c.auto) { chips.push(c); return; }
			var vistos = {}; base.forEach(function (it) { var v = c.auto(N(it), it); if (v) vistos[v] = (vistos[v] || 0) + 1; });
			var ks = Object.keys(vistos).sort(function (a, b) { return c.peso ? c.peso(a) - c.peso(b) : (c.marca ? vistos[b] - vistos[a] : a.localeCompare(b, 'es', { numeric: true })); });
			if (c.marca) ks = ks.slice(0, 10);
			ks.forEach(function (v) { chips.push({ t: v, g: c.g, f: function (n, it) { return c.auto(n, it) === v; } }); });
		});
		var palabras = sinAcentos(S.busca).toUpperCase().split(/\s+/).filter(Boolean);
		var porBusca = base.filter(function (it) { var n = N(it); return !palabras.some(function (w) { return n.indexOf(w) === -1; }); });
		Object.keys(S.f).forEach(function (t) { if (S.f[t] && !chips.some(function (c) { return c.t === t; })) delete S.f[t]; });
		chips = chips.filter(function (c) {
			if (S.f[c.t]) return true;
			var otros = porBusca.filter(function (it) { var n = N(it); return chips.every(function (o) { return o === c || (c.g && o.g === c.g) || !S.f[o.t] || o.f(n, it); }); });
			var con = otros.filter(function (it) { return c.f(N(it), it); }).length;
			return con > 0 && con < otros.length;
		});
		var lista = base.filter(function (it) {
			var n = N(it);
			if (palabras.some(function (w) { return n.indexOf(w) === -1; })) return false;
			return chips.every(function (c) { return !S.f[c.t] || c.f(n, it); });
		});
		lista.sort(function (a, b) {
			if (S.orden === 'desc') return b.precio - a.precio;
			if (S.orden === 'az') return a.nombre.localeCompare(b.nombre, 'es');
			return a.precio - b.precio;
		});
		S.lista = lista;

		var simple = k === 'armado';
		if (!simple) h += '<div class="cgx-filtros"><label class="cgx-buscar">' + '<span class="cgx-sr">Buscar</span>' +
			'<input type="search" id="cgx-buscar" placeholder="Buscar en ' + esc(PASOS[k].t.toLowerCase()) + '" value="' + esc(S.busca) + '" autocomplete="off"></label>' +
			'<label class="cgx-orden"><span class="cgx-sr">Ordenar</span><select id="cgx-orden"><option value="asc"' + (S.orden === 'asc' ? ' selected' : '') + '>Menor precio</option><option value="desc"' + (S.orden === 'desc' ? ' selected' : '') + '>Mayor precio</option><option value="az"' + (S.orden === 'az' ? ' selected' : '') + '>Nombre A-Z</option></select></label></div>';
		var filtrando = palabras.length || Object.keys(S.f).some(function (x) { return S.f[x]; });
		var cuenta = '<span class="cgx-cuenta2">' + lista.length + (lista.length === 1 ? ' producto' : ' productos') + (filtrando ? ' · <button type="button" class="cgx-link" data-a="limpiar">Limpiar filtros</button>' : '') + '</span>';
		if (!simple) h += '<div class="cgx-chips" role="group" aria-label="Filtros">' + chips.map(function (c) {
			return '<button type="button" class="cgx-chip' + (S.f[c.t] ? ' is-on' : '') + '" aria-pressed="' + !!S.f[c.t] + '" data-chip="' + esc(c.t) + '" data-g="' + esc(c.g || '') + '">' + esc(c.t) + '</button>';
		}).join('') + cuenta + '</div>';

		if (k === 'so' && sinArmado() && !base.length) {
			h += '<div class="cgx-vacio">Sin armado no podemos sumar el sistema operativo. <button type="button" class="cgx-btn" data-ir="armado">Elegir Armado de PC</button></div>';
		} else if (!S.items.length) {
			h += k === 'mother' ? '<div class="cgx-vacio">No encontramos motherboards compatibles con tu procesador. <button type="button" class="cgx-btn" data-ir="micro">Cambiar procesador</button></div>'
				: k === 'ram' ? '<div class="cgx-vacio">No encontramos memorias compatibles con tu motherboard. <button type="button" class="cgx-btn" data-ir="mother">Cambiar motherboard</button></div>'
				: '<div class="cgx-vacio">Por ahora no hay productos disponibles en este paso. <a class="cgx-link" href="' + esc(urlWhatsapp()) + '" target="_blank" rel="noopener">Consultanos por WhatsApp</a></div>';
		} else if (!lista.length) h += '<div class="cgx-vacio">No hay productos con esos filtros. <button type="button" class="cgx-link" data-a="limpiar">Limpiar filtros</button></div>';
		h += '<div class="cgx-grid' + (simple ? ' cgx-grid-2' : '') + '">';
		var elegido = S.sel[k] ? S.sel[k].it.item_id : null;
		var elegidosM = PASOS[k].multi ? perifsElegidos().map(function (x) { return x.it.item_id; }) : [];
		var tno = k === 'armado' ? { t: 'Sin armado (la armo yo)', nota: 'Te llevás los componentes por separado.', ico: 'reset' } : (no ? { t: no.t, nota: no.nota, reco: no.reco, ico: no.reco ? 'check' : PASOS[k].ico } : null);
		if (tno && S.items) {
			var sk = !!S.skip[k];
			var msg = mensajeNo(k, tno.reco);
			h += '<article class="cgx-card cgx-card-sin' + (tno.reco ? ' is-reco' : '') + (sk ? ' is-sel' : '') + '" role="button" tabindex="0" aria-pressed="' + sk + '" data-a="saltear" aria-label="' + esc(tno.t) + '">' +
				'<div class="cgx-img cgx-img-msg"><strong>' + esc(msg[0]) + '</strong><span>' + esc(msg[1]) + '</span><span class="cgx-tilde" aria-hidden="true">' + ico('check', 16) + '</span></div>' +
				'<div class="cgx-card-b"><h3 class="cgx-h3">' + esc(tno.t) + '</h3>' + (tno.nota ? '<span class="cgx-detalle">' + esc(tno.nota) + '</span>' : '') +
				'<div class="cgx-card-pie"><div class="cgx-precio"><strong>$ 0</strong><small>' + (sk ? 'En tu PC' : 'Sin costo') + '</small></div></div></div></article>';
		}
		var primeraFila = columnas();
		lista.slice(0, S.mostrar).forEach(function (it, idx) {
			var max = Math.max(1, Math.min(4, it.stock > 0 ? it.stock : 4, it.max_qty || 4));
			var tag = it.outlet ? '<span class="cgx-tag is-outlet">Outlet</span>' : (it.oferta ? '<span class="cgx-tag is-oferta">Oferta</span>' : '');
			var desc = it.precio_tachado && it.precio ? Math.round((1 - it.precio / it.precio_tachado) * 100) : 0;
			var es = elegido === it.item_id || elegidosM.indexOf(it.item_id) > -1;
			h += '<article class="cgx-card' + (es ? ' is-sel' : '') + '" role="button" tabindex="0" aria-pressed="' + es + '" data-elegir="' + it.item_id + '" aria-label="Elegir ' + esc(nombreLimpio(it.nombre)) + ', ' + esc(plata(it.precio)) + '">' +
				'<div class="cgx-img">' + tag + '<img ' + (idx < primeraFila ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"') + ' decoding="async" alt="" src="' + esc(img(it)) + '" onload="this.classList.add(\'is-ok\')" onerror="this.onerror=null;this.src=window.cgSinFoto">' +
				'<span class="cgx-tilde" aria-hidden="true">' + ico('check', 16) + '</span></div>' +
				'<div class="cgx-card-b"><h3 class="cgx-h3" title="' + esc(nombreLimpio(it.nombre)) + '">' + esc(nombreLimpio(it.nombre)) + '</h3>' + (it.detalle ? '<span class="cgx-detalle">' + esc(it.detalle) + '</span>' : '') +
				'<div class="cgx-card-pie"><div class="cgx-precio">' + (it.precio_tachado ? '<span class="cgx-antes"><s>' + plataCorta(it.precio_tachado) + '</s>' + (desc > 0 ? ' <b>-' + desc + '%</b>' : '') + '</span>' : '') +
				'<strong>' + plataCorta(it.precio) + '</strong>' +
				(es ? '<small class="cgx-entupc">' + ico('check', 12) + 'En tu PC' + (S.sel[k] && S.sel[k].it.item_id === it.item_id && S.sel[k].q > 1 ? ' · x' + S.sel[k].q : '') + '</small>'
					: (k === 'armado' ? '' : '<small class="cgx-stk' + (it.local ? ' is-local' : '') + '"><i></i>' + (it.local ? 'En el local' : 'Disponible') + '</small>')) + '</div>' +
				(PASOS[k].qty && max > 1 ? '<label class="cgx-q"><span>Cantidad</span><select id="cgx-q-' + it.item_id + '">' + Array.apply(null, { length: max }).map(function (_, i) {
					var q = i + 1, s2 = S.sel[k] && S.sel[k].it.item_id === it.item_id && S.sel[k].q === q; return '<option value="' + q + '"' + (s2 ? ' selected' : '') + '>' + q + '</option>'; }).join('') + '</select></label>' : '') +
				'</div></div></article>';
		});
		h += '</div>';
		if (lista.length > S.mostrar) h += '<button type="button" class="cgx-btn cgx-mas" data-a="mas">Ver ' + (lista.length - S.mostrar) + ' productos más</button>';
		box.innerHTML = h;
		var mas = box.querySelector('.cgx-mas');
		if (mas && window.IntersectionObserver) {
			if (S._obs) S._obs.disconnect();
			S._obs = new IntersectionObserver(function (en) {
				if (en.some(function (e) { return e.isIntersecting; })) { S._obs.disconnect(); S.mostrar += tanda(false); renderLista(); }
			}, { rootMargin: '500px 0px' });
			S._obs.observe(mas);
		}
		var inp = $('#cgx-buscar'); if (inp && S._foco) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); S._foco = false; }
	}

	function barraHTML() {
		var k = S.actual, n = Object.keys(S.sel).length;
		var sig = k ? (hecho(k) ? siguientePendiente(k) : null) : null;
		var accion = completo() || !k ? '<a class="cgx-btn cgx-prim" data-a="comprar" href="' + esc(urlCompra()) + '">Comprar</a>' :
			(sig ? '<button type="button" class="cgx-btn cgx-prim" data-ir="' + sig + '">Siguiente</button>' : (n ? '<a class="cgx-btn cgx-prim" data-a="comprar" href="' + esc(urlCompra()) + '">Comprar</a>' : ''));
		return '<div class="cgx-barra-t"><strong>' + plata(total()) + '</strong><small>' + VIS.filter(hecho).length + ' de ' + VIS.length + ' piezas</small></div>' +
			'<button type="button" class="cgx-btn cgx-mipc" data-a="hoja" aria-expanded="' + !!S.hoja + '">' + (S.hoja ? 'Ocultar' : 'Ver mi PC') + ico('up', 14) + '</button>' + accion;
	}
	/* Lista de lo elegido, desde abajo (celular) */
	function hojaHTML() {
		var h = '<div class="cgx-hoja-fondo" data-a="hoja"></div><div class="cgx-hoja" role="dialog" aria-label="Tu PC"><span class="cgx-hoja-asa" aria-hidden="true"></span><div class="cgx-hoja-l">';
		VIS.forEach(function (k) {
			var lista = PASOS[k].multi ? perifsElegidos() : (S.sel[k] ? [S.sel[k]] : []);
			var txt = lista.length ? lista.map(function (x) { return esc(nombreLimpio(x.it.nombre)) + (x.q > 1 ? ' x' + x.q : ''); }).join(' + ') : (S.skip[k] ? esc((textoNo(k) || {}).corto || 'No incluido') : 'sin elegir');
			var pr = lista.reduce(function (a2, x) { return a2 + (x.it.precio || 0) * (x.q || 1); }, 0);
			h += '<button type="button" class="cgx-hoja-f' + (lista.length ? '' : (S.skip[k] ? ' is-skip' : ' is-vacia')) + (k === S.actual ? ' is-on' : '') + '" data-ir="' + k + '">' +
				'<span class="cgx-hoja-k">' + esc(PASOS[k].t) + '</span><span class="cgx-hoja-n">' + txt + '</span>' +
				(lista.length ? '<span class="cgx-hoja-p">' + plataCorta(pr) + '</span>' : '<span class="cgx-hoja-ir">' + ico('der', 14) + '</span>') + '</button>';
		});
		var hay = Object.keys(S.sel).length;
		h += '</div>' + (hay || Object.keys(S.skip).length ? (S.hojaConfirma
			? '<div class="cgx-confirma"><strong>¿Borrar tu armado?</strong><div><button type="button" class="cgx-btn is-peligro" data-a="borrar">Sí, borrar</button><button type="button" class="cgx-btn" data-a="hojanobor">Cancelar</button></div></div>'
			: '<div class="cgx-pc-acc">' + (hay ? '<button type="button" class="cgx-link" data-a="copiar">' + ico('link', 14) + '<span>Copiar link</span></button>' : '') + '<button type="button" class="cgx-link" data-a="hojaborrar">' + ico('reset', 14) + 'Empezar de nuevo</button></div>') : '') + '</div>';
		return h;
	}
	function renderHoja() {
		var d = document.getElementById('cgx-hoja-caja');
		if (!S.hoja) { S.hojaConfirma = false; if (d) d.remove(); document.documentElement.classList.remove('cgx-sin-scroll'); ocultarWhatsapp(false); return; }
		if (!d) { d = document.createElement('div'); d.id = 'cgx-hoja-caja'; ROOT.appendChild(d); }
		var bar = $('#cgx-barra'), alto = bar ? bar.offsetHeight : 0;
		d.style.setProperty('--cgx-barra-alto', alto + 'px');
		d.innerHTML = hojaHTML();
		var on = d.querySelector('.cgx-hoja-f.is-on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
		document.documentElement.classList.add('cgx-sin-scroll');
		ocultarWhatsapp(true);
	}
	function finalHTML() {
		return '<div class="cgx-vacio">Tu PC está completa. <a class="cgx-btn cgx-prim" data-a="comprar" href="' + esc(urlCompra()) + '">Comprar</a></div>';
	}

	/* =================================================================
	   EVENTOS
	   ================================================================= */
	function onClick(e) {
		if (e.target.closest('.cgx-q')) { e.stopPropagation(); return; }
		var b = e.target.closest('[data-ir],[data-a],[data-elegir],[data-chip],[data-marca],[data-quitar],[data-cerrar]');
		if (!b || !ROOT.contains(b)) return;
		if (b.tagName === 'A' && !b.hasAttribute('data-ir') && !b.hasAttribute('data-a')) return;
		e.preventDefault(); e.stopPropagation();
		if (b.hasAttribute('data-ir')) {
			if (S.restaurar) { var stR = S.restaurar.st; S.restaurar = null; restaurar(stR, b.getAttribute('data-ir'), true); return; }
			irA(b.getAttribute('data-ir')); return;
		}
		if (b.hasAttribute('data-elegir')) { var id = +b.getAttribute('data-elegir'); var it = (S.items || []).filter(function (x) { return x.item_id === id; })[0]; if (it) { if (PASOS[S.actual].multi) elegirPerif(it); else elegir(it, b); } return; }
		if (b.hasAttribute('data-chip')) {
			var t = b.getAttribute('data-chip'), g = b.getAttribute('data-g'), on = !S.f[t];
			if (on && g) $$('.cgx-chip[data-g="' + g + '"]').forEach(function (o) { S.f[o.getAttribute('data-chip')] = false; });
			S.f[t] = on; S.mostrar = tanda(true); renderLista(); return;
		}
		if (b.hasAttribute('data-marca')) { S.marca = b.getAttribute('data-marca'); S.f = {}; renderLista(); return; }
		if (b.hasAttribute('data-quitar')) { quitar(b.getAttribute('data-quitar')); return; }
		if (b.hasAttribute('data-cerrar')) { S.avisos.splice(+b.getAttribute('data-cerrar'), 1); renderAvisos(); return; }
		switch (b.getAttribute('data-a')) {
			case 'comprar': irAComprar(); break;
			case 'resumen': irAResumen(); break;
			case 'otra': borrarTodo(); irA('micro'); break;
			case 'mio':
				var pv = null; try { pv = JSON.parse(localStorage.getItem(CLAVE + '-previo')); localStorage.removeItem(CLAVE + '-previo'); } catch (e2) {}
				S.avisoFijo = null; if (pv) restaurar(pv, null, true); else renderAvisos(); break;
			case 'cerrarfijo': S.avisoFijo = null; renderAvisos(); break;
			case 'fijoborrar': if (S.avisoFijo) S.avisoFijo.confirma = true; renderAvisos(); break;
			case 'fijonobor': if (S.avisoFijo) S.avisoFijo.confirma = false; renderAvisos(); break;
			case 'perifuno': if (!S.sel.perif2) S.skip.perif2 = true; if (!S.sel.perif3) S.skip.perif3 = true; guardar(); avanzar('perif1', false); break;
			case 'saltear': if (b.classList.contains('cgx-card')) { $$('.cgx-card.is-sel').forEach(function (c) { c.classList.remove('is-sel'); }); b.classList.add('is-sel', 'is-pulso'); setTimeout(saltear, 120); } else saltear(); break;
			case 'limpiar': S.f = {}; S.busca = ''; S.mostrar = tanda(true); renderLista(); break;
			case 'mas': S.mostrar += tanda(false); renderLista(); break;
			case 'panel': var pc = $('#cgx-pc'); if (pc) pc.scrollIntoView({ behavior: reducirMovimiento() ? 'auto' : 'smooth', block: 'start' }); break;
			case 'hoja': S.hoja = !S.hoja; renderHoja(); renderBarra(); break;
			case 'vermas': S.verMas = !S.verMas; renderLista(); break;
			case 'hojaborrar': S.hojaConfirma = true; renderHoja(); break;
			case 'hojanobor': S.hojaConfirma = false; renderHoja(); break;
			case 'reiniciar': S.confirmar = true; renderPanel(); break;
			case 'nobor': S.confirmar = false; renderPanel(); break;
			case 'borrar': S.confirmar = false; borrarTodo(); irA('micro'); break;
			case 'copiar':
				var url = linkCompartir();
				(navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { b.querySelector('span').textContent = 'Link copiado'; },
					function () { window.prompt('Copiá este link:', url); });
				break;
			case 'continuar': var st = S.restaurar.st; S.restaurar = null; restaurar(st); break;
			case 'cero': S.restaurar = null; borrarTodo(); irA('micro'); break;
		}
	}
	function $$(s) { return Array.prototype.slice.call(ROOT.querySelectorAll(s)); }
	var esperaBusca;
	function onInput(e) {
		if (e.target.id === 'cgx-buscar') { S.busca = e.target.value; clearTimeout(esperaBusca); esperaBusca = setTimeout(function () { S._foco = true; S.mostrar = tanda(true); renderLista(); }, 200); }
	}
	function onKey(e) {
		if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.cgx-card[data-elegir]')) { e.preventDefault(); e.target.click(); }
		if (e.key === 'Escape' && S.confirmar) { S.confirmar = false; renderPanel(); }
		if (e.key === 'Escape' && S.hoja) { S.hoja = false; renderHoja(); renderBarra(); }
	}
	function onChange(e) {
		if (e.target.id === 'cgx-orden') { S.orden = e.target.value; renderLista(); return; }
		var mq = /^cgx-q-(\d+)$/.exec(e.target.id || '');
		if (mq && S.actual && S.sel[S.actual] && S.sel[S.actual].it.item_id === +mq[1]) {
			S.sel[S.actual].q = +e.target.value || 1; guardar(); renderPanel(); renderBarra();
		}
	}

	/* =================================================================
	   ESTILOS (usa los colores del sitio: modo claro y oscuro)
	   ================================================================= */
	var CSS = [
		'#cg-armador.cgx{--x-bg:var(--arm-bg,#fff);--x-t:var(--arm-t,#18181b);--x-m:var(--arm-m,#6b7280);--x-l:var(--arm-line,#e4e4e7);--x-a:var(--cga,#d23f86);',
		'--x-s:color-mix(in srgb,var(--x-t) 4%,var(--x-bg));--x-ok:#16a34a;--x-warn:#b45309;font-variant-numeric:tabular-nums;color:var(--x-t);max-width:1360px;margin:0 auto;padding:24px 16px 96px;box-sizing:border-box}',
		'#cg-armador.cgx *{box-sizing:border-box}',
		'#cg-armador.cgx button,#cg-armador.cgx input,#cg-armador.cgx select{font-family:inherit;color:inherit}',
		'.cgx .cgx-ico{flex:0 0 auto;display:block}',
		'.cgx .cgx-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
		'.cgx :focus-visible{outline:2px solid var(--x-a);outline-offset:2px}',
		'.cgx .cgx-head{display:flex;flex-direction:column;gap:18px;margin-bottom:24px}',
		'.cgx .cgx-title{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap}',
		'.cgx .cgx-crumb{font-size:13px;font-weight:600;color:var(--x-m)}',
		'.cgx h1{margin:4px 0 0;font-size:34px;font-weight:800;letter-spacing:-.02em;line-height:1.15}',
		'.cgx .cgx-lead{margin:6px 0 0;color:var(--x-m);font-size:15px;max-width:62ch}',
		'.cgx .cgx-link{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0;border:0;background:none;color:var(--x-m);font-weight:600;font-size:14px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
		'.cgx .cgx-link:hover{color:var(--x-t)}',
		'.cgx .cgx-etapas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}',
		'.cgx .cgx-etapa{display:flex;flex-direction:column;gap:8px;padding:6px 0;border:0;background:none;text-align:left;cursor:pointer;color:var(--x-m)}',
		'.cgx .cgx-etapa.is-on{color:var(--x-t)}',
		'.cgx .cgx-etapa-t{display:flex;justify-content:space-between;gap:8px;font-size:14.5px;font-weight:700}',
		'.cgx .cgx-etapa-t small{font-size:12.5px;font-weight:600;color:var(--x-m)}',
		'.cgx .cgx-bar{display:block;height:2px;background:var(--x-l)}.cgx .cgx-bar span{display:block;height:2px;background:var(--x-m)}.cgx .cgx-etapa.is-on .cgx-bar span{background:var(--x-a)}',
		'.cgx .cgx-pasos{display:flex;flex-wrap:wrap;gap:4px 26px;border-bottom:1px solid var(--x-l)}',
		'.cgx .cgx-paso{display:inline-flex;align-items:center;gap:6px;min-height:44px;margin-bottom:-1px;padding:0;border:0;border-bottom:2px solid transparent;background:none;color:var(--x-m);font-size:14.5px;font-weight:600;cursor:pointer}',
		'.cgx .cgx-paso.is-on{color:var(--x-t);font-weight:800;border-bottom-color:var(--x-a)}',
		'.cgx .cgx-ok{color:var(--x-ok)}',
		'.cgx .cgx-body{display:flex;flex-wrap:wrap;gap:36px;align-items:flex-start}',
		'.cgx .cgx-main{flex:999 1 560px;min-width:0;display:flex;flex-direction:column;gap:16px}',
		'.cgx .cgx-aviso{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--x-l);border-radius:10px;font-size:14px;line-height:1.5}',
		'.cgx .cgx-aviso>span{flex:1}.cgx .cgx-aviso.is-warn .cgx-ico{color:var(--x-warn)}.cgx .cgx-aviso.is-ok .cgx-ico{color:var(--x-ok)}',
		'.cgx .cgx-x{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border:0;border-radius:8px;background:none;color:var(--x-m);cursor:pointer}',
		'.cgx .cgx-x:hover{color:var(--x-t);background:var(--x-s)}',
		'.cgx .cgx-nota{display:flex;gap:10px;align-items:flex-start;margin:0;font-size:14.5px;line-height:1.6;color:var(--x-m)}',
		'.cgx .cgx-nota .cgx-ico{margin-top:3px}.cgx .cgx-nota.is-warn .cgx-ico{color:var(--x-warn)}.cgx .cgx-nota.is-ok .cgx-ico{color:var(--x-ok)}',
		'.cgx .cgx-nota a{color:var(--x-t);font-weight:700}',
		'.cgx .cgx-tabs{display:flex;gap:24px;border-bottom:1px solid var(--x-l)}',
		'.cgx .cgx-tab{min-height:44px;margin-bottom:-1px;padding:0;border:0;border-bottom:2px solid transparent;background:none;color:var(--x-m);font-size:15px;font-weight:600;cursor:pointer}',
		'.cgx .cgx-tab.is-on{color:var(--x-t);font-weight:800;border-bottom-color:var(--x-a)}',
		'.cgx .cgx-no{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border:1px dashed var(--x-l);border-radius:10px;background:none;color:var(--x-m);font-size:14px;font-weight:700;cursor:pointer}',
		'.cgx .cgx-no:hover{color:var(--x-t);border-color:var(--x-m)}.cgx .cgx-no.is-reco{border-style:solid;color:var(--x-ok);border-color:var(--x-ok)}.cgx .cgx-no.is-on{background:var(--x-s);color:var(--x-t)}',
		'.cgx .cgx-filtros{display:flex;flex-wrap:wrap;gap:10px}',
		'.cgx .cgx-buscar{flex:1 1 280px;display:block}',
		'.cgx .cgx-buscar input,.cgx .cgx-orden select,.cgx .cgx-q select{width:100%;height:44px;padding:0 14px;border:1px solid var(--x-l);border-radius:8px;background:var(--x-bg);font-size:14px;box-shadow:none}',
		'.cgx .cgx-orden select{width:auto;font-weight:600}',
		'.cgx .cgx-chips{display:flex;flex-wrap:wrap;gap:6px}',
		'.cgx .cgx-chip{height:36px;padding:0 12px;border:1px solid var(--x-l);border-radius:6px;background:var(--x-bg);color:var(--x-m);font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}',
		'.cgx .cgx-chip:hover{color:var(--x-t);border-color:var(--x-m)}.cgx .cgx-chip.is-on{background:var(--x-t);border-color:var(--x-t);color:var(--x-bg)}',
		'.cgx .cgx-cuenta{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--x-l);font-size:13.5px;color:var(--x-m);font-weight:600}',
		'.cgx .cgx-vacio,.cgx .cgx-cargando{margin:0;padding:28px 16px;border:1px dashed var(--x-l);border-radius:10px;text-align:center;color:var(--x-m)}',
		'.cgx .cgx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:28px 20px}',
		'.cgx .cgx-card{display:flex;flex-direction:column;gap:8px;padding:8px;margin:-8px;border-radius:12px}',
		'.cgx .cgx-card.is-sel{background:var(--x-s);box-shadow:inset 0 0 0 2px var(--x-a)}',
		'.cgx .cgx-img{position:relative;aspect-ratio:4/3;border-radius:8px;background:#f4f4f5;display:flex;align-items:center;justify-content:center;overflow:hidden}',
		'.cgx .cgx-img img{max-width:86%;max-height:86%;object-fit:contain}',
		'.cgx .cgx-tag{position:absolute;top:8px;left:8px;padding:3px 8px;border-radius:4px;font-size:12px;font-weight:800;color:#fff}',
		'.cgx .cgx-tag.is-oferta{background:var(--x-a)}.cgx .cgx-tag.is-outlet{background:#18181b}',
		'.cgx .cgx-marca{font-size:12px;font-weight:700;color:var(--x-m)}',
		'.cgx .cgx-card h3{margin:-4px 0 0;font-size:15px;font-weight:600;line-height:1.4;min-height:42px}',
		'.cgx .cgx-stock{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:var(--x-m)}',
		'.cgx .cgx-stock i{width:6px;height:6px;border-radius:50%;background:var(--x-m)}.cgx .cgx-stock.is-local{color:var(--x-ok)}.cgx .cgx-stock.is-local i{background:var(--x-ok)}',
		'.cgx .cgx-antes{font-size:13px;color:var(--x-m)}.cgx .cgx-antes b{color:var(--x-a)}',
		'.cgx .cgx-pie{display:flex;align-items:center;gap:8px;margin-top:auto}',
		'.cgx .cgx-pie strong{flex:1;font-size:19px;font-weight:700;letter-spacing:-.01em}',
		'.cgx .cgx-q select{width:auto;height:40px;padding:0 8px}',
		'.cgx .cgx-info{font-size:13px;color:var(--x-m);font-weight:600;text-underline-offset:3px}',
		'.cgx .cgx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:40px;padding:0 16px;border:1px solid var(--x-l);border-radius:8px;background:var(--x-bg);color:var(--x-t);font-weight:700;font-size:14px;cursor:pointer;text-decoration:none}',
		'.cgx .cgx-btn:hover{border-color:var(--x-m)}.cgx .cgx-btn[disabled]{opacity:.6;cursor:default}',
		'.cgx .cgx-btn.is-sel{background:var(--x-t);color:var(--x-bg);border-color:var(--x-t)}',
		'.cgx .cgx-prim{background:var(--x-a);border-color:var(--x-a);color:#fff}.cgx .cgx-prim:hover{filter:brightness(1.08);border-color:var(--x-a)}',
		'.cgx .cgx-grande{width:100%;min-height:52px;font-size:15px;font-weight:800}',
		'.cgx .cgx-mas{align-self:center}',
		'.cgx .cgx-panel{flex:1 1 320px;max-width:380px;position:sticky;top:16px;display:flex;flex-direction:column;gap:12px;padding:20px;border-radius:12px;background:var(--x-s)}',
		'.cgx .cgx-panel-h{display:flex;align-items:baseline;gap:8px;padding-bottom:12px;border-bottom:1px solid var(--x-l)}',
		'.cgx .cgx-panel-h h2{margin:0;flex:1;font-size:17px;font-weight:800}.cgx .cgx-panel-h span{font-size:13px;color:var(--x-m);font-weight:600}',
		'.cgx .cgx-panel-vacio{margin:0;font-size:14px;line-height:1.55;color:var(--x-m)}',
		'.cgx .cgx-grupo{display:flex;flex-direction:column}',
		'.cgx .cgx-grupo-t{font-size:13px;font-weight:800;color:var(--x-t);padding:4px 0}',
		'.cgx .cgx-fila{display:grid;grid-template-columns:1fr auto;gap:0 12px;padding:10px 0;border-bottom:1px solid var(--x-l)}',
		'.cgx .cgx-fila-k{font-size:12.5px;font-weight:600;color:var(--x-m)}',
		'.cgx .cgx-fila-a{display:flex;align-items:center;gap:2px;justify-self:end;grid-row:span 1}.cgx .cgx-fila-a .cgx-link{min-height:28px;font-size:12.5px}.cgx .cgx-fila-a .cgx-x{width:28px;height:28px}',
		'.cgx .cgx-fila-n{font-size:14px;font-weight:600;line-height:1.4}.cgx .cgx-fila-p{font-size:14px;font-weight:700;justify-self:end;white-space:nowrap}',
		'.cgx .cgx-fila.is-skip .cgx-fila-n{color:var(--x-m)}',
		'.cgx .cgx-fila.is-actual{grid-template-columns:1fr auto}.cgx .cgx-fila.is-actual .cgx-fila-n{color:var(--x-a);font-weight:700;justify-self:end;font-size:13px}',
		'.cgx .cgx-fila-etapa{display:flex;justify-content:space-between;min-height:44px;align-items:center;padding:0;border:0;border-bottom:1px solid var(--x-l);background:none;color:var(--x-m);font-size:14px;font-weight:600;cursor:pointer;text-align:left}',
		'.cgx .cgx-total{display:flex;justify-content:space-between;align-items:baseline;padding-top:8px}.cgx .cgx-total span{color:var(--x-m);font-weight:600}.cgx .cgx-total strong{font-size:28px;font-weight:800;letter-spacing:-.02em}',
		'.cgx .cgx-cuotas{margin:-8px 0 0;text-align:right;font-size:13px;color:var(--x-m)}',
		'.cgx .cgx-ya{align-self:center;font-size:13px}',
		'.cgx .cgx-dos{display:grid;grid-template-columns:1fr 1fr;gap:8px}.cgx .cgx-dos .cgx-btn{font-size:13px;padding:0 8px;color:var(--x-m)}',
		'.cgx .cgx-confirma{display:flex;flex-direction:column;gap:4px;padding:12px;border:1px solid #dc2626;border-radius:10px;font-size:13.5px}.cgx .cgx-confirma span{color:var(--x-m)}',
		'.cgx .cgx-confirma div{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.cgx .is-peligro{color:#dc2626;border-color:#dc2626}',
		'.cgx .cgx-ayuda{display:flex;flex-direction:column;border-top:1px solid var(--x-l);padding-top:4px}',
		'.cgx .cgx-ayuda a{display:flex;align-items:center;gap:12px;min-height:52px;color:var(--x-t);text-decoration:none}.cgx .cgx-ayuda a:first-child .cgx-ico{color:var(--x-ok)}',
		'.cgx .cgx-ayuda span{display:flex;flex-direction:column}.cgx .cgx-ayuda strong{font-size:14px}.cgx .cgx-ayuda small{font-size:12.5px;color:var(--x-m)}',
		'.cgx .cgx-resume{display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:16px;border:1px solid var(--x-l);border-radius:12px}.cgx .cgx-resume>.cgx-ico{color:var(--x-a)}',
		'.cgx .cgx-resume-t{flex:1 1 260px;display:flex;flex-direction:column}.cgx .cgx-resume-t strong{font-size:17px}.cgx .cgx-resume-t span{color:var(--x-m);font-size:14px}',
		'.cgx .cgx-resume-b{display:flex;flex-wrap:wrap;gap:8px}.cgx .cgx-resume-b .cgx-btn{min-height:46px}',
		'.cgx .cgx-final{display:flex;flex-direction:column;gap:16px;max-width:520px}.cgx .cgx-final p{margin:0;color:var(--x-m);line-height:1.6}',
		'.cgx .cgx-barra,.cgx .cgx-solo-cel{display:none}',
		/* ---- v1.1: blindaje contra el CSS del sitio ---- */
		'#cg-armador.cgx button{text-transform:none;letter-spacing:normal;line-height:1.2;box-shadow:none;margin:0;font-family:inherit}',
		'#cg-armador.cgx h1,#cg-armador.cgx h2,#cg-armador.cgx h3{font-family:inherit;text-transform:none;color:inherit;letter-spacing:normal}',
		'#cg-armador.cgx h1.cgx-h1{margin:4px 0 0;font-size:34px;font-weight:800;letter-spacing:-.02em;line-height:1.15}',
		'#cg-armador.cgx img{border:0;box-shadow:none}',
		/* ---- v1.1: transición entre pasos ---- */
		'.cgx .cgx-fade{transition:opacity .1s ease,transform .1s ease}',
		'.cgx .cgx-fade.is-saliendo,.cgx .cgx-fade.is-entrando{opacity:0;transform:translateY(6px)}',
		'.cgx .cgx-main{min-height:60vh}',
		/* ---- v1.1: tarjeta entera clickeable ---- */
		'.cgx .cgx-grid{gap:18px}',
		'.cgx .cgx-card{position:relative;gap:0;padding:0;margin:0;border:1px solid var(--x-l);border-radius:12px;background:var(--x-bg);overflow:hidden;cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease;outline-offset:3px}',
		'.cgx .cgx-card:hover{border-color:color-mix(in srgb,var(--x-a) 55%,var(--x-l));box-shadow:0 10px 24px -14px rgba(0,0,0,.45);transform:translateY(-2px)}',
		'.cgx .cgx-card.is-sel{border-color:var(--x-a);box-shadow:inset 0 0 0 1px var(--x-a);background:var(--x-bg)}',
		'.cgx .cgx-card .cgx-img{border-radius:0;background:#fff;padding:10px}',
		'.cgx .cgx-card .cgx-img img{opacity:0;transition:opacity .15s ease}.cgx .cgx-card .cgx-img img.is-ok{opacity:1}',
		'.cgx .cgx-tilde{position:absolute;top:10px;right:10px;width:28px;height:28px;border-radius:50%;background:var(--x-a);color:#fff;display:flex;align-items:center;justify-content:center;transform:scale(0);transition:transform .2s cubic-bezier(.3,1.6,.6,1)}',
		'.cgx .cgx-card.is-sel .cgx-tilde{transform:scale(1)}',
		'.cgx .cgx-card.is-pulso{animation:cgxPulso .38s ease}',
		'@keyframes cgxPulso{0%{box-shadow:inset 0 0 0 1px var(--x-a),0 0 0 0 color-mix(in srgb,var(--x-a) 45%,transparent)}100%{box-shadow:inset 0 0 0 1px var(--x-a),0 0 0 10px transparent}}',
		'.cgx .cgx-card-b{flex:1;display:flex;flex-direction:column;gap:6px;padding:12px 14px 14px;border-top:1px solid var(--x-l)}',
		'.cgx .cgx-card .cgx-h3{margin:0;font-size:14.5px;font-weight:600;line-height:1.4;min-height:2.8em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
		'.cgx .cgx-precio{margin-top:auto;padding-top:4px;display:flex;flex-direction:column;gap:2px}',
		'.cgx .cgx-precio strong{font-size:20px;font-weight:800;letter-spacing:-.01em}',
		'.cgx .cgx-pie{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:2px}',
		'.cgx .cgx-elegir{margin-left:auto;font-size:13.5px;font-weight:800;color:var(--x-a)}',
		'.cgx .cgx-card.is-sel .cgx-elegir{color:var(--x-t)}',
		'.cgx .cgx-q{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--x-m);font-weight:600;cursor:default}',
		'.cgx .cgx-q select{width:auto;height:34px;padding:0 6px;font-weight:700}',
		/* ---- v1.1: tarjetas de espera ---- */
		'.cgx .cgx-card.is-skel{cursor:default;pointer-events:none}',
		'.cgx .cgx-card.is-skel .cgx-img,.cgx .cgx-sk{background:linear-gradient(90deg,var(--x-s) 0%,color-mix(in srgb,var(--x-t) 9%,var(--x-bg)) 50%,var(--x-s) 100%);background-size:200% 100%;animation:cgxBrillo 1.2s linear infinite}',
		'.cgx .cgx-sk{display:block;height:12px;border-radius:4px;width:100%}.cgx .cgx-sk.w40{width:40%}.cgx .cgx-sk.w50{width:50%}.cgx .cgx-sk.w70{width:70%}.cgx .cgx-sk.alto{height:20px;margin-top:8px}',
		'@keyframes cgxBrillo{from{background-position:200% 0}to{background-position:-200% 0}}',
		'.cgx .cgx-paso.is-hecho{color:var(--x-t)}',
		'.cgx .cgx-multi{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;padding:10px 14px;border:1px solid var(--x-ok);border-radius:10px;font-size:14px}',
		'.cgx .cgx-multi>.cgx-ico{color:var(--x-ok)}.cgx .cgx-multi>span{flex:1 1 260px}.cgx .cgx-multi .cgx-btn{min-height:40px}',
		'.cgx .cgx-grid-2{grid-template-columns:repeat(auto-fill,minmax(260px,340px))}',
		'.cgx .cgx-img-ico{color:var(--x-m)}.cgx .cgx-detalle{font-size:13px;color:var(--x-m);line-height:1.45}',
		'.cgx .cgx-card-sin{border-style:dashed}.cgx .cgx-card-sin .cgx-img{position:relative}',
		'.cgx .cgx-card-sin:not(.con-foto) .cgx-img{background:var(--x-s)!important}',
		'.cgx .cgx-card-sin.con-foto:not(.is-reco) .cgx-img img.is-ok{opacity:.35;filter:grayscale(1)}',
		'.cgx .cgx-no-x,.cgx .cgx-no-ok{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center}',
		'.cgx .cgx-no-x{background:rgba(20,20,24,.82);color:#fff}',
		'.cgx .cgx-no-ok{left:auto;top:auto;right:10px;bottom:10px;transform:none;width:28px;height:28px;background:var(--x-ok);color:#fff}',
		'.cgx .cgx-card-sin.is-sel .cgx-no-ok{display:none}',
		'.cgx .cgx-card-sin.is-reco{border-style:solid;border-color:var(--x-ok)}.cgx .cgx-card-sin.is-reco .cgx-img-ico{color:var(--x-ok)}.cgx .cgx-card-sin.is-reco .cgx-elegir{color:var(--x-ok)}',
		'.cgx .cgx-card-sin.is-sel{border-style:solid}',
		'.cgx .cgx-vacio .cgx-btn{margin:12px auto 0;display:flex;width:max-content}',
		'.cgx .cgx-lista-compra{display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--x-ok);border-radius:12px;font-size:14.5px;line-height:1.5}',
		'.cgx .cgx-lista-compra>.cgx-ico{color:var(--x-ok)}.cgx .cgx-lista-compra span{flex:1 1 260px}.cgx .cgx-lista-compra .cgx-btn{min-height:44px}',
		'#cg-armador.cgx .cgx-prim,#cg-armador.cgx .cgx-prim:hover,#cg-armador.cgx .cgx-prim:focus{color:#fff!important;background:var(--x-a)!important;border-color:var(--x-a)!important;text-decoration:none}',
		'.cgx .cgx-etapa.is-full .cgx-bar span{background:var(--x-ok)}',
		'@media (max-width:899px){',
		'#cg-armador.cgx{padding:16px 12px 110px}.cgx h1{font-size:26px}',
		'.cgx .cgx-etapas{gap:10px}.cgx .cgx-etapa-t{font-size:12px}.cgx .cgx-etapa-t small{display:none}',
		'.cgx .cgx-pasos{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;gap:20px}.cgx .cgx-pasos::-webkit-scrollbar{display:none}.cgx .cgx-paso{white-space:nowrap}',
		'.cgx .cgx-chips{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}.cgx .cgx-chips::-webkit-scrollbar{display:none}',
		'.cgx .cgx-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 12px}.cgx .cgx-card h3{font-size:13.5px}.cgx .cgx-pie{flex-wrap:wrap}.cgx .cgx-pie strong{flex:1 1 100%;font-size:16px}',
		'.cgx .cgx-panel{position:fixed;left:0;right:0;bottom:0;top:auto;max-width:none;max-height:85vh;overflow:auto;z-index:1000;border-radius:16px 16px 0 0;background:var(--x-bg);box-shadow:0 -8px 30px rgba(0,0,0,.25);transform:translateY(105%);transition:transform .25s ease;padding-bottom:calc(20px + env(safe-area-inset-bottom,0px))}',
		'.cgx .cgx-panel.is-open{transform:none}.cgx .cgx-solo-cel{display:inline-flex}',
		'.cgx .cgx-barra{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:999;align-items:center;gap:12px;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));background:var(--x-bg);border-top:1px solid var(--x-l)}',
		'.cgx .cgx-barra-t{flex:1;display:flex;flex-direction:column;align-items:flex-start;border:0;background:none;padding:0;cursor:pointer;text-align:left}',
		'.cgx .cgx-barra-t small{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--x-m);font-weight:600}.cgx .cgx-barra-t strong{font-size:18px;font-weight:800}',
		'.cgx .cgx-barra .cgx-btn{min-height:48px;padding:0 22px}',
		'}',
		/* ---- v2.0: encabezado en una línea ---- */
		'#cg-armador.cgx{padding-top:18px}',
		'.cgx .cgx-head{margin-bottom:12px;gap:0}',
		'.cgx .cgx-title{align-items:center}',
		'.cgx .cgx-title-t{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}',
		'#cg-armador.cgx h1.cgx-h1{margin:0;font-size:28px}',
		'.cgx .cgx-accesos{display:flex;gap:18px;flex-wrap:wrap}',
		'.cgx .cgx-accesos a{display:flex;align-items:center;gap:8px;color:var(--x-t);text-decoration:none;min-height:44px}',
		'.cgx .cgx-accesos a span{display:flex;flex-direction:column;line-height:1.25}.cgx .cgx-accesos strong{font-size:13.5px}.cgx .cgx-accesos small{font-size:12px;color:var(--x-m)}',
		'.cgx .cgx-accesos a.is-wa .cgx-ico{color:var(--x-ok)}',
		/* ---- v2.0: la barra de tu PC ---- */
		'.cgx .cgx-pc{display:flex;gap:16px;align-items:stretch;padding:12px;border:1px solid var(--x-l);border-radius:14px;background:var(--x-s);margin-bottom:18px}',
		'.cgx .cgx-pc-piezas{flex:1;min-width:0;display:flex;gap:12px;overflow-x:auto;scrollbar-width:thin;padding-bottom:2px}',
		'.cgx .cgx-pc-et{display:flex;flex-direction:column;gap:6px}',
		'.cgx .cgx-pc-et+.cgx-pc-et{padding-left:12px;border-left:1px solid var(--x-l)}',
		'.cgx .cgx-pc-et-t{font-size:12px;font-weight:700;color:var(--x-m);white-space:nowrap}',
		'.cgx .cgx-pc-fila{display:flex;gap:5px}',
		'.cgx .cgx-slot{width:60px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 4px;border:1px dashed var(--x-l);border-radius:10px;background:transparent;cursor:pointer;color:var(--x-m)}',
		'.cgx .cgx-slot:hover{border-color:var(--x-m);color:var(--x-t)}',
		'.cgx .cgx-slot.is-hecho,.cgx .cgx-slot.is-skip{border-style:solid;background:var(--x-bg);color:var(--x-t)}',
		'.cgx .cgx-slot.is-on{border:1.5px solid var(--x-a);color:var(--x-a)}',
		'.cgx .cgx-slot-img{position:relative;width:40px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center}',
		'.cgx .cgx-slot.is-hecho .cgx-slot-img{background:#fff}.cgx .cgx-slot-img img{max-width:90%;max-height:90%;object-fit:contain}',
		'.cgx .cgx-slot-ok{position:absolute;right:-5px;top:-5px;width:14px;height:14px;border-radius:50%;background:var(--x-ok);color:#fff;display:flex;align-items:center;justify-content:center}',
		'.cgx .cgx-slot-k{font-size:11.5px;font-weight:700;line-height:1.1;text-align:center}',
		'.cgx .cgx-slot-p{font-size:11px;line-height:1.1;color:var(--x-m);white-space:nowrap}.cgx .cgx-slot.is-on .cgx-slot-p{color:var(--x-a)}',
		'.cgx .cgx-pc-tot{flex:0 0 210px;display:flex;flex-direction:column;justify-content:center;gap:4px;padding-left:16px;border-left:1px solid var(--x-l)}',
		'.cgx .cgx-pc-tl{font-size:12px;color:var(--x-m);font-weight:600}.cgx .cgx-pc-tot>strong{font-size:22px;font-weight:800;letter-spacing:-.02em}',
		'.cgx .cgx-pc-tot>small{font-size:12px;color:var(--x-m)}',
		'.cgx .cgx-pc-tot .cgx-grande{min-height:42px;font-size:14px;margin-top:4px}',
		'.cgx .cgx-pc-acc{display:flex;justify-content:space-between;gap:8px}.cgx .cgx-pc-acc .cgx-link{font-size:12px;min-height:28px}',
		'.cgx .cgx-pc .cgx-confirma{padding:8px;font-size:12.5px}.cgx .cgx-pc .cgx-confirma div{margin-top:6px}.cgx .cgx-pc .cgx-confirma .cgx-btn{min-height:34px;font-size:12.5px}',
		/* ---- v2.0: contenido a todo el ancho ---- */
		'.cgx .cgx-main{min-height:50vh;display:flex;flex-direction:column;gap:12px}',
		'.cgx .cgx-paso-h{display:flex;align-items:baseline;justify-content:space-between;gap:12px}',
		'#cg-armador.cgx h2.cgx-h2{margin:0;font-size:22px;font-weight:800}',
		'.cgx .cgx-nota{display:flex;gap:10px;padding:0;font-size:14px}.cgx .cgx-nota strong{color:var(--x-t)}',
		'.cgx .cgx-nota small{display:block;margin-top:4px;font-size:13px}',
		'.cgx .cgx-nota.is-warn{padding:12px 14px;border:1px solid var(--x-warn);border-radius:10px;color:var(--x-t)}',
		'.cgx .cgx-no span{display:flex;flex-direction:column;align-items:flex-start;line-height:1.2}.cgx .cgx-no small{font-size:11.5px;font-weight:600;opacity:.8}',
		'.cgx .cgx-grid{grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}',
		'.cgx .cgx-card .cgx-img{aspect-ratio:auto;height:130px}',
		'.cgx .cgx-card-b{padding:10px 12px 12px;gap:4px}',
		'.cgx .cgx-card .cgx-h3{font-size:13.5px}.cgx .cgx-precio strong{font-size:17px}',
		'.cgx .cgx-vacio{display:flex;flex-direction:column;align-items:center;gap:12px}',
		'.cgx .cgx-fijo{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;padding:12px 14px;border:1px solid var(--x-ok);border-radius:12px;font-size:14px}',
		'.cgx .cgx-fijo>.cgx-ico{color:var(--x-ok)}.cgx .cgx-fijo>span{flex:1 1 240px}.cgx .cgx-fijo .cgx-btn{min-height:40px}',
		'.cgx .cgx-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2000;padding:12px 18px;border-radius:999px;background:var(--x-t);color:var(--x-bg);font-size:14px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.25);transition:opacity .4s ease}',
		'.cgx .cgx-toast.is-out{opacity:0}',
		'@media (max-width:899px){#cg-armador.cgx h1.cgx-h1{font-size:22px}.cgx .cgx-accesos{gap:12px}.cgx .cgx-accesos small{display:none}',
		'.cgx .cgx-pc{flex-direction:column;padding:10px}.cgx .cgx-pc-tot{display:none}.cgx .cgx-pc-piezas{scrollbar-width:none}.cgx .cgx-pc-piezas::-webkit-scrollbar{display:none}',
		'.cgx .cgx-slot{width:62px}.cgx .cgx-barra{padding-right:84px}.cgx .cgx-toast{bottom:90px}',
		'.cgx .cgx-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cgx .cgx-card .cgx-img{height:110px}}',
		'@media (max-width:899px){#cg-armador.cgx h1.cgx-h1{font-size:26px}.cgx .cgx-card-b{padding:10px}.cgx .cgx-precio strong{font-size:16px}.cgx .cgx-card .cgx-h3{font-size:13px}.cgx .cgx-card:hover{transform:none}}',
		'@media (max-width:899px){#cg-armador.cgx{padding:12px 12px 100px}#cg-armador.cgx h1.cgx-h1{font-size:22px}.cgx .cgx-title-t{flex-direction:column;align-items:flex-start;gap:0}',
		'.cgx .cgx-head{margin-bottom:8px}.cgx .cgx-accesos a{min-height:40px}.cgx .cgx-accesos strong{font-size:13px}.cgx .cgx-pc{margin-bottom:12px}.cgx .cgx-pc-et-t{font-size:11px}',
		'#cg-armador.cgx h2.cgx-h2{font-size:19px}.cgx .cgx-nota{font-size:13px;line-height:1.5}.cgx .cgx-cuenta span+span{display:none}.cgx .cgx-main{gap:10px}',
		'.cgx .cgx-filtros{flex-wrap:nowrap}.cgx .cgx-buscar{flex:1 1 auto}.cgx .cgx-orden select{padding:0 8px;font-size:13px}.cgx .cgx-tab{min-height:40px}}',
		/* ---- v2.1: ayuda arriba, barra alineada, filtros en una línea ---- */
		'.cgx .cgx-accesos{gap:10px}',
		'.cgx .cgx-accesos a{gap:12px;padding:8px 12px 8px 8px;border:1px solid var(--x-l);border-radius:12px;background:var(--x-s);min-height:0;transition:border-color .15s ease}',
		'.cgx .cgx-accesos a:hover{border-color:var(--x-m)}',
		'.cgx .cgx-acc-ico{flex:0 0 36px;width:36px;height:36px;border-radius:9px;border:1px solid var(--x-l);background:var(--x-bg);display:flex;align-items:center;justify-content:center;color:var(--x-t)}',
		'.cgx .cgx-accesos a.is-wa .cgx-wa-logo{color:#25d366}',
		'.cgx .cgx-wa-logo{color:#25d366}',
		'.cgx .cgx-accesos a>.cgx-ico:last-child{color:var(--x-a);margin-left:6px}',
		'.cgx .cgx-accesos strong{font-size:13.5px;font-weight:800}.cgx .cgx-accesos small{font-size:12px}',
		'.cgx .cgx-pc{align-items:center;padding:10px 12px;gap:14px}',
		'.cgx .cgx-pc-piezas{align-self:center}',
		'.cgx .cgx-pc-tot{flex:0 0 236px;gap:3px;padding-left:14px;align-self:stretch}',
		'.cgx .cgx-pc-tl{display:flex;justify-content:space-between}',
		'.cgx .cgx-pc-tot>strong{font-size:21px;line-height:1.15}',
		'.cgx .cgx-pc-tot .cgx-grande{min-height:38px;margin-top:6px;font-size:13.5px}',
		'.cgx .cgx-pc-acc{justify-content:space-between;margin-top:2px}',
		'.cgx .cgx-pc-acc .cgx-link{white-space:nowrap;font-size:12px;min-height:26px;gap:4px;text-decoration:none}',
		'.cgx .cgx-pc-acc .cgx-link:hover{text-decoration:underline}',
		'.cgx .cgx-resumen{align-self:center;font-size:12.5px;min-height:24px;color:var(--x-t)}',
		'.cgx .cgx-main{gap:10px}',
		'.cgx .cgx-nota.is-warn{padding:9px 12px}.cgx .cgx-nota{line-height:1.5}',
		'.cgx .cgx-filtros{flex-wrap:nowrap;align-items:stretch;gap:8px}',
		'.cgx .cgx-filtros .cgx-no{flex:0 0 auto;align-self:stretch;min-height:44px;padding:0 14px}',
		'.cgx .cgx-buscar{flex:1 1 auto;min-width:0}',
		'.cgx .cgx-chips{align-items:center}',
		'.cgx .cgx-cuenta2{margin-left:auto;padding-left:8px;font-size:13px;font-weight:600;color:var(--x-m);white-space:nowrap}.cgx .cgx-cuenta2 .cgx-link{min-height:0;font-size:13px}',
		'@media (max-width:899px){.cgx .cgx-accesos{width:100%;display:grid;grid-template-columns:1fr 1fr}.cgx .cgx-accesos a{padding:6px 8px}.cgx .cgx-accesos a>.cgx-ico:last-child{display:none}',
		'.cgx .cgx-acc-ico{flex-basis:30px;width:30px;height:30px}.cgx .cgx-accesos strong{font-size:12.5px}.cgx .cgx-accesos small{display:none}',
		'.cgx .cgx-filtros{flex-wrap:wrap}.cgx .cgx-filtros .cgx-no{flex:1 1 100%;justify-content:flex-start;min-height:40px}.cgx .cgx-chips{flex-wrap:nowrap}.cgx .cgx-cuenta2{display:none}}',
		/* ---- v3.3: celular ---- */
		'#cg-armador.cgx{overflow-x:clip}',
		'html.cgx-sin-scroll,html.cgx-sin-scroll body{overflow:hidden}',
		'.cgx .cgx-mipc{display:none}',
		'@media (max-width:899px){.cgx .cgx-pc{align-items:stretch}.cgx .cgx-pc-piezas{width:100%;max-width:100%}',
		'.cgx .cgx-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:0}.cgx .cgx-tab{justify-content:center;text-align:center}',
		'.cgx .cgx-barra{gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom))}',
		'.cgx .cgx-barra-t{flex:1;min-width:0;display:flex;flex-direction:column;background:none;border:0;padding:0;color:var(--x-t);text-align:left}',
		'.cgx .cgx-barra-t strong{font-size:18px;font-weight:800}.cgx .cgx-barra-t small{font-size:12px;color:var(--x-m)}',
		'.cgx .cgx-mipc{display:inline-flex;gap:4px;min-height:44px;padding:0 12px}.cgx .cgx-barra .cgx-prim{min-height:44px;padding:0 16px}',
		'.cgx .cgx-hoja-fondo{position:fixed;inset:0;z-index:1500;background:rgba(0,0,0,.55)}',
		'.cgx .cgx-hoja{position:fixed;left:0;right:0;bottom:0;z-index:1501;max-height:82vh;display:flex;flex-direction:column;gap:10px;padding:14px 16px calc(16px + env(safe-area-inset-bottom));background:var(--x-bg);border-radius:16px 16px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.35)}',
		'.cgx .cgx-hoja-h{display:flex;justify-content:space-between;align-items:center;font-size:17px}',
		'.cgx .cgx-hoja-l{overflow-y:auto;display:flex;flex-direction:column}',
		'.cgx .cgx-hoja-f{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:9px 0;border-bottom:1px solid var(--x-l)}',
		'.cgx .cgx-hoja-k{grid-column:1 / -1;font-size:11.5px;font-weight:700;color:var(--x-m)}.cgx .cgx-hoja-n{font-size:13.5px;line-height:1.35}',
		'.cgx .cgx-hoja-p{font-size:13.5px;font-weight:800;white-space:nowrap;text-align:right}.cgx .cgx-hoja-f .cgx-link{grid-column:1 / -1;justify-self:start;min-height:28px;font-size:12.5px}',
		'.cgx .cgx-hoja-f.is-vacia .cgx-hoja-n{color:var(--x-m)}',
		'.cgx .cgx-hoja-tot{display:flex;justify-content:space-between;align-items:baseline}.cgx .cgx-hoja-tot strong{font-size:22px;font-weight:800}}',
		'@media (max-width:899px){.cgx-compra .cgx-c-panel{margin-bottom:84px}}',
		/* ---- v3.4: estilo vidrio esmerilado ---- */
		'#cg-armador.cgx{position:relative;isolation:isolate;--x-vidrio:color-mix(in srgb,var(--x-t) 5%,transparent);--x-vidrio2:color-mix(in srgb,var(--x-t) 2.5%,transparent);--x-borde:color-mix(in srgb,var(--x-t) 11%,transparent);--x-grad:linear-gradient(135deg,#ff5fa8,#d23f86)}',
		'#cg-armador.cgx:before,#cg-armador.cgx:after{content:"";position:absolute;z-index:-1;pointer-events:none;border-radius:50%}',
		'#cg-armador.cgx:before{width:640px;height:640px;left:0;top:-300px;background:radial-gradient(circle,rgba(210,63,134,.30),transparent 65%)}',
		'#cg-armador.cgx:after{width:560px;height:560px;right:0;top:160px;background:radial-gradient(circle,rgba(130,80,230,.20),transparent 65%)}',
		'html.light #cg-armador.cgx:before{opacity:.45}html.light #cg-armador.cgx:after{opacity:.4}',
		'.cgx .cgx-vidrio,.cgx .cgx-pc,.cgx .cgx-card{background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));border:1px solid var(--x-borde);-webkit-backdrop-filter:blur(16px) saturate(140%);backdrop-filter:blur(16px) saturate(140%)}',
		/* encabezado protagonista */
		'.cgx .cgx-hero-t{min-width:0}.cgx .cgx-hero{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:28px;align-items:center;margin-bottom:20px}',
		'.cgx .cgx-eyebrow{display:block;font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#ff6fb0}',
		'#cg-armador.cgx .cgx-hero h1.cgx-h1{margin:8px 0 10px;font-size:46px;line-height:1.05;font-weight:800;letter-spacing:-.02em}',
		'.cgx .cgx-grad{background:linear-gradient(90deg,#ff5fa8,#d23f86 55%,#b85cff);-webkit-background-clip:text;background-clip:text;color:transparent}',
		'.cgx .cgx-hero-sub{margin:0;max-width:580px;font-size:15.5px;line-height:1.55;color:var(--x-m)}',
		'.cgx .cgx-ben{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px}',
		'.cgx .cgx-ben li{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;background:var(--x-vidrio);border:1px solid var(--x-borde);font-size:12.5px;font-weight:600}',
		'.cgx .cgx-ben .cgx-ico{color:#ff6fb0}.cgx .cgx-ben li.is-ok .cgx-ico{color:#2fbf71}',
		'.cgx .cgx-hero .cgx-accesos{display:flex;flex-direction:column;gap:10px}',
		'.cgx .cgx-accesos a.cgx-vidrio{border-radius:16px;padding:12px 14px;gap:12px;box-shadow:0 14px 40px rgba(0,0,0,.18)}',
		'.cgx .cgx-accesos a.cgx-vidrio:hover{border-color:color-mix(in srgb,#d23f86 55%,transparent)}',
		'.cgx .cgx-acc-ico{border-radius:11px;background:var(--x-vidrio);border-color:var(--x-borde)}',
		'.cgx .cgx-title.is-compacto{display:flex;align-items:center;gap:16px;flex-wrap:wrap}',
		'.cgx .cgx-title.is-compacto .cgx-title-t{flex:1 1 auto}#cg-armador.cgx .cgx-title.is-compacto h1.cgx-h1{font-size:26px;font-weight:800}',
		'.cgx .cgx-title.is-compacto .cgx-ben{margin:0}.cgx .cgx-title.is-compacto .cgx-ben li{padding:5px 10px;font-size:12px}',
		'.cgx .cgx-title.is-compacto .cgx-accesos{flex-direction:row}.cgx .cgx-title.is-compacto .cgx-accesos a.cgx-vidrio{padding:8px 12px 8px 8px}',
		/* barra de tu PC */
		'.cgx .cgx-pc{border-radius:20px;padding:16px;box-shadow:0 20px 60px rgba(0,0,0,.25),inset 0 1px 0 color-mix(in srgb,#fff 6%,transparent)}',
		'.cgx .cgx-pc-et-t{font-size:11.5px;letter-spacing:.05em;text-transform:uppercase}',
		'.cgx .cgx-slot{width:64px;min-height:80px;border-radius:14px;border:1px solid var(--x-borde);border-style:solid;background:var(--x-vidrio2);justify-content:center}',
		'.cgx .cgx-slot:hover{border-color:color-mix(in srgb,var(--x-t) 30%,transparent)}',
		'.cgx .cgx-slot.is-hecho,.cgx .cgx-slot.is-skip{background:var(--x-vidrio)}',
		'.cgx .cgx-slot.is-on{border:1.5px solid #d23f86;background:color-mix(in srgb,#d23f86 14%,transparent);color:#ff7ab8;box-shadow:0 0 0 4px color-mix(in srgb,#d23f86 13%,transparent)}',
		'.cgx .cgx-slot-ok{background:#2fbf71}',
		'.cgx .cgx-pc-tot{flex:0 0 240px;align-items:stretch;text-align:center;gap:4px;padding-left:18px}',
		'.cgx .cgx-pc-tl{justify-content:center;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase}',
		'.cgx .cgx-pc-tot>strong{font-size:28px;letter-spacing:-.02em}',
		'.cgx .cgx-pc-tot>small{text-align:center}',
		'.cgx .cgx-pc-tot .cgx-grande{min-height:46px;margin-top:8px;border-radius:13px;font-size:15px}',
		'.cgx .cgx-pc-acc{justify-content:center;gap:16px}',
		'.cgx .cgx-pc-prog{display:none}',
		/* botón principal en degradé */
		'#cg-armador.cgx .cgx-prim,#cg-armador.cgx .cgx-prim:hover,#cg-armador.cgx .cgx-prim:focus{background:var(--x-grad)!important;border:0!important;color:#fff!important;box-shadow:0 10px 24px rgba(210,63,134,.32)}',
		'#cg-armador.cgx .cgx-pc-tot .cgx-btn[disabled]{background:var(--x-vidrio)!important;box-shadow:none}',
		/* tarjetas */
		'.cgx .cgx-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}',
		'.cgx .cgx-card{border-radius:18px;padding:0;transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease}',
		'.cgx .cgx-card:hover{border-color:color-mix(in srgb,#d23f86 45%,transparent);transform:translateY(-2px)}',
		'.cgx .cgx-card .cgx-img{position:relative;height:130px;margin:8px 8px 0;border-radius:12px;background:#fff;overflow:hidden}',
		'.cgx .cgx-st{position:absolute;left:8px;bottom:8px;padding:3px 8px;border-radius:999px;font-size:10.5px;font-weight:700;background:#eceff3;color:#4b5563}',
		'.cgx .cgx-st.is-local{background:#e7f6ec;color:#1d6b3a}',
		'.cgx .cgx-card .cgx-tilde{top:8px;right:8px;left:auto}',
		'.cgx .cgx-card-b{padding:10px 14px 14px;gap:0;display:flex;flex-direction:column;flex:1}',
		'.cgx .cgx-card .cgx-h3{font-size:14px;font-weight:700;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:0}',
		'.cgx .cgx-tags{display:flex;flex-wrap:wrap;gap:5px;margin:7px 0 0}',
		'.cgx .cgx-tags span{padding:3px 7px;border-radius:6px;font-size:11px;font-weight:600;background:var(--x-vidrio);color:var(--x-m)}',
		'.cgx .cgx-tags span.is-w{background:rgba(245,158,11,.16);color:#d68a0b}html:not(.light) .cgx .cgx-tags span.is-w{color:#fac775}',
		'.cgx .cgx-card-pie{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;margin-top:auto;padding-top:12px}',
		'.cgx .cgx-card-pie .cgx-precio{display:flex;flex-direction:column;gap:1px}',
		'.cgx .cgx-card-pie .cgx-precio strong{font-size:19px;font-weight:800;letter-spacing:-.01em}',
		'.cgx .cgx-card-pie .cgx-precio small{font-size:11.5px;color:var(--x-m)}',
		'.cgx .cgx-card-pie .cgx-antes{font-size:11.5px;color:var(--x-m)}.cgx .cgx-card-pie .cgx-antes b{color:#ff6fb0}',
		'.cgx .cgx-card.is-sel{border:1.5px solid #d23f86;background:linear-gradient(170deg,color-mix(in srgb,#d23f86 16%,transparent),color-mix(in srgb,#d23f86 4%,transparent));box-shadow:0 0 0 4px color-mix(in srgb,#d23f86 11%,transparent)}',
		'.cgx .cgx-card.is-sel .cgx-card-pie .cgx-precio small{color:#ff6fb0;font-weight:700}',
		'.cgx .cgx-card-sin .cgx-img{background:var(--x-vidrio)!important}',
		'.cgx .cgx-card .cgx-img.cgx-img-msg{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:10px;text-align:center;background:linear-gradient(135deg,color-mix(in srgb,#d23f86 24%,transparent),color-mix(in srgb,#7846dc 15%,transparent))!important;border:1px solid color-mix(in srgb,#d23f86 32%,transparent)}',
		'.cgx .cgx-img-msg strong{font-size:21px;font-weight:800;line-height:1.15;letter-spacing:-.01em;color:var(--x-t)}',
		'.cgx .cgx-img-msg>span:not(.cgx-tilde){font-size:11.5px;font-weight:600;padding:4px 10px;border-radius:999px;background:color-mix(in srgb,var(--x-t) 10%,transparent);color:var(--x-t)}',
		'.cgx .cgx-card-sin.is-reco .cgx-img.cgx-img-msg{background:linear-gradient(135deg,color-mix(in srgb,#2fbf71 24%,transparent),color-mix(in srgb,#2fbf71 8%,transparent))!important;border-color:color-mix(in srgb,#2fbf71 40%,transparent)}',
		'.cgx .cgx-card-sin{border-style:solid}.cgx .cgx-card-sin.is-reco{border-color:color-mix(in srgb,#2fbf71 45%,transparent)}',
		'@media (max-width:899px){.cgx .cgx-img-msg strong{font-size:16px}.cgx .cgx-img-msg>span:not(.cgx-tilde){font-size:10px;padding:3px 8px}}',
		'.cgx .cgx-q span{display:none}.cgx .cgx-q select{height:32px;border-radius:8px}',
		/* teléfono */
		'@media (max-width:899px){#cg-armador.cgx:before{width:100%;height:420px;left:0;top:-200px}#cg-armador.cgx:after{display:none}',
		'.cgx .cgx-hero{grid-template-columns:minmax(0,1fr);gap:14px;margin-bottom:14px}.cgx .cgx-hero-t,.cgx .cgx-hero .cgx-accesos{min-width:0}',
		'#cg-armador.cgx .cgx-hero h1.cgx-h1{font-size:30px;margin:6px 0 6px}.cgx .cgx-hero-sub{font-size:13.5px}',
		'.cgx .cgx-ben{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-top:12px}.cgx .cgx-ben::-webkit-scrollbar{display:none}.cgx .cgx-ben li{flex:0 0 auto;font-size:11.5px;padding:6px 10px}',
		'.cgx .cgx-hero .cgx-accesos{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
		'.cgx .cgx-accesos a.cgx-vidrio{padding:8px 10px;gap:8px;border-radius:12px}.cgx .cgx-accesos small{display:none}.cgx .cgx-accesos strong{font-size:12.5px}',
		'.cgx .cgx-title.is-compacto{flex-wrap:nowrap;gap:8px}.cgx .cgx-title.is-compacto .cgx-ben{display:none}',
		'#cg-armador.cgx .cgx-title.is-compacto h1.cgx-h1{font-size:19px}.cgx .cgx-title.is-compacto .cgx-crumb{font-size:12px}',
		'.cgx .cgx-title.is-compacto .cgx-accesos{display:flex;gap:6px;width:auto}.cgx .cgx-title.is-compacto .cgx-accesos a.cgx-vidrio{padding:0;width:40px;height:40px;justify-content:center}',
		'.cgx .cgx-title.is-compacto .cgx-accesos a>span:not(.cgx-acc-ico){display:none}.cgx .cgx-title.is-compacto .cgx-acc-ico{border:0;background:none}',
		'.cgx .cgx-pc{padding:10px;border-radius:16px;gap:6px}.cgx .cgx-pc-et-t{display:none}.cgx .cgx-pc-et+.cgx-pc-et{padding-left:6px}',
		'.cgx .cgx-pc-piezas{gap:6px}.cgx .cgx-pc-fila{gap:5px}',
		'.cgx .cgx-slot{width:40px;min-height:40px;height:40px;padding:0;border-radius:10px}.cgx .cgx-slot-k,.cgx .cgx-slot-p{display:none}',
		'.cgx .cgx-slot-img{width:30px;height:26px}.cgx .cgx-slot.is-hecho .cgx-slot-img{background:#fff}',
		'.cgx .cgx-pc-prog{display:block;height:3px;border-radius:2px;background:var(--x-borde);overflow:hidden}.cgx .cgx-pc-prog i{display:block;height:3px;background:var(--x-grad)}',
		'.cgx .cgx-nota:not(.is-warn):not(.is-abierta)>span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
		'.cgx .cgx-nota{flex-wrap:wrap}.cgx .cgx-nota>span{flex:1 1 0;min-width:0}',
		'.cgx .cgx-vermas{flex:0 0 100%;justify-content:flex-start;min-height:28px;padding-left:28px;font-size:12.5px}',
		'.cgx .cgx-chips{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}.cgx .cgx-chips::-webkit-scrollbar{display:none}.cgx .cgx-chip{flex:0 0 auto}',
		'.cgx .cgx-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
		'.cgx .cgx-card{border-radius:14px}.cgx .cgx-card .cgx-img{height:104px;margin:6px 6px 0;border-radius:10px}',
		'.cgx .cgx-card-b{padding:8px 10px 10px}.cgx .cgx-card .cgx-h3{font-size:12.5px}.cgx .cgx-tags span{font-size:10px;padding:2px 5px}',
		'.cgx .cgx-card-pie{padding-top:8px;flex-wrap:wrap}.cgx .cgx-card-pie .cgx-precio strong{font-size:15.5px}.cgx .cgx-card-pie .cgx-precio small{font-size:10.5px}',
		'.cgx .cgx-barra{background:color-mix(in srgb,var(--x-bg) 80%,transparent);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border-top:1px solid var(--x-borde)}',
		'.cgx .cgx-toast{bottom:96px}}',
		'@media (min-width:900px){.cgx .cgx-vermas{display:none}}',
		/* ---- v3.6: franja al volver y modo claro ---- */
		'.cgx .cgx-fijo.is-retomar{border-color:color-mix(in srgb,#d23f86 45%,transparent);background:linear-gradient(135deg,color-mix(in srgb,#d23f86 10%,transparent),color-mix(in srgb,#7846dc 6%,transparent))}',
		'.cgx .cgx-fijo.is-retomar>.cgx-ico{color:#ff6fb0}.cgx .cgx-fijo-q{font-size:14px}',
		'@media (max-width:899px){.cgx .cgx-fijo.is-retomar .cgx-btn{flex:1 1 auto}}',
		'html.light #cg-armador.cgx:before,html.light #cg-armador.cgx:after{display:none}',
		'html.light .cgx .cgx-vidrio,html.light .cgx .cgx-pc,html.light .cgx .cgx-card,html.light .cgx .cgx-ben li{background:#f4f5f7;border-color:#e3e5e9;-webkit-backdrop-filter:none;backdrop-filter:none}',
		'html.light .cgx .cgx-pc{box-shadow:0 10px 30px rgba(15,23,42,.06)}html.light .cgx .cgx-accesos a.cgx-vidrio{box-shadow:none}',
		'html.light .cgx .cgx-slot{background:#fff;border-color:#e3e5e9}html.light .cgx .cgx-slot.is-on{background:#fdf0f6}',
		'html.light .cgx .cgx-card .cgx-img{border:1px solid #eceef1}html.light .cgx .cgx-tags span{background:#e9ebef;color:#4b5563}',
		'html.light .cgx .cgx-acc-ico{background:#fff;border-color:#e3e5e9}',
		'html.light .cgx .cgx-card.is-sel{background:#fdf0f6;border-color:#d23f86}',
		'html.light .cgx .cgx-buscar input,html.light .cgx .cgx-orden select,html.light .cgx .cgx-chip{background:#fff}',
		'.cgx .cgx-card .cgx-h3{font-size:13.5px;font-weight:700;line-height:1.35;-webkit-line-clamp:3}',
		'@media (max-width:899px){.cgx .cgx-card .cgx-h3{font-size:12.5px}}',
		'.cgx .cgx-ben-c{display:none}',
		'@media (max-width:899px){.cgx .cgx-hero .cgx-ben{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;overflow:visible}',
		'.cgx .cgx-hero .cgx-ben li{justify-content:center;gap:4px;padding:7px 4px;font-size:11.5px;white-space:nowrap}',
		'.cgx .cgx-ben-l{display:none}.cgx .cgx-ben-c{display:inline}}',
		'@media (max-width:389px){.cgx .cgx-hero .cgx-ben li{font-size:10.5px;gap:3px;padding:6px 2px}.cgx .cgx-hero .cgx-ben .cgx-ico{width:13px;height:13px}}',
		'@media (max-width:899px){.cgx .cgx-grid{gap:8px}.cgx .cgx-card{border-radius:12px}',
		'.cgx .cgx-card .cgx-img{height:84px;margin:5px 5px 0;border-radius:9px}.cgx .cgx-card .cgx-img img{max-height:76%}',
		'.cgx .cgx-st{left:5px;bottom:5px;padding:2px 6px;font-size:9.5px}.cgx .cgx-card .cgx-tilde{top:5px;right:5px;width:20px;height:20px}',
		'.cgx .cgx-card-b{padding:7px 9px 9px}.cgx .cgx-card .cgx-h3{font-size:12px;font-weight:600;line-height:1.3}',
		'.cgx .cgx-card-pie{padding-top:6px}.cgx .cgx-card-pie .cgx-precio strong{font-size:14.5px}.cgx .cgx-card-pie .cgx-precio small{font-size:10px}',
		'.cgx .cgx-card .cgx-img.cgx-img-msg strong{font-size:14px}.cgx .cgx-card .cgx-img.cgx-img-msg{gap:6px}',
		'.cgx .cgx-card .cgx-tag{top:5px;left:5px;padding:2px 6px;font-size:10px;border-radius:5px}}',
		/* ---- v4.0: tarjetas finas, centradas y de vidrio ---- */
		'.cgx .cgx-grid{grid-template-columns:repeat(auto-fill,minmax(172px,1fr));gap:12px}',
		'#cg-armador.cgx .cgx-card{border-radius:16px;text-align:center;background:linear-gradient(165deg,color-mix(in srgb,var(--x-t) 7%,transparent),color-mix(in srgb,var(--x-t) 2%,transparent));border:1px solid color-mix(in srgb,var(--x-t) 12%,transparent);box-shadow:0 10px 26px rgba(0,0,0,.18),inset 0 1px 0 color-mix(in srgb,#fff 8%,transparent);-webkit-backdrop-filter:blur(14px) saturate(140%);backdrop-filter:blur(14px) saturate(140%)}',
		'#cg-armador.cgx .cgx-card:hover{border-color:color-mix(in srgb,#d23f86 50%,transparent);box-shadow:0 14px 32px rgba(0,0,0,.24),0 0 0 3px color-mix(in srgb,#d23f86 10%,transparent)}',
		'.cgx .cgx-card .cgx-img{height:118px;margin:8px 8px 0;border-radius:11px}.cgx .cgx-card .cgx-img img{max-width:78%;max-height:82%}',
		'.cgx .cgx-card-b{padding:9px 12px 12px;align-items:center}',
		'.cgx .cgx-card .cgx-h3{font-size:13px;font-weight:600;line-height:1.35;-webkit-line-clamp:3;text-align:center}',
		'.cgx .cgx-card-pie{justify-content:center;padding-top:8px;width:100%}',
		'.cgx .cgx-card-pie .cgx-precio{align-items:center}.cgx .cgx-card-pie .cgx-precio strong{font-size:18px}',
		'.cgx .cgx-stk{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--x-m)}.cgx .cgx-stk i{width:6px;height:6px;border-radius:50%;background:currentColor}',
		'.cgx .cgx-card-pie .cgx-precio .cgx-stk.is-local{color:#2fbf71}.cgx .cgx-card-pie .cgx-precio .cgx-entupc{color:#ff6fb0}',
		'.cgx .cgx-entupc{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:700;color:#ff6fb0}',
		'.cgx .cgx-card .cgx-q{margin-top:6px}.cgx .cgx-card-pie{flex-direction:column;align-items:center;gap:4px}',
		'#cg-armador.cgx .cgx-card.is-sel{border:1.5px solid #d23f86;background:linear-gradient(170deg,color-mix(in srgb,#d23f86 18%,transparent),color-mix(in srgb,#d23f86 5%,transparent));box-shadow:0 0 0 4px color-mix(in srgb,#d23f86 13%,transparent),0 12px 28px rgba(0,0,0,.2)}',
		'#cg-armador.cgx .cgx-card-sin.is-reco{border-color:color-mix(in srgb,#2fbf71 50%,transparent)}',
		'html.light #cg-armador.cgx .cgx-card{background:linear-gradient(180deg,#ffffff,#f5f6f8);border-color:#e3e5e9;box-shadow:0 6px 18px rgba(15,23,42,.07),inset 0 1px 0 #fff}',
		'html.light #cg-armador.cgx .cgx-card.is-sel{background:linear-gradient(180deg,#fff6fa,#fdeef5);border-color:#d23f86}',
		'.cgx .cgx-mas{margin:14px auto 0;display:flex}',
		'@media (max-width:899px){.cgx .cgx-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
		'#cg-armador.cgx .cgx-card{border-radius:13px;box-shadow:0 6px 16px rgba(0,0,0,.16)}.cgx .cgx-card .cgx-img{height:76px;margin:5px 5px 0;border-radius:9px}',
		'.cgx .cgx-card-b{padding:6px 8px 9px}.cgx .cgx-card .cgx-h3{font-size:11.5px;font-weight:600}',
		'.cgx .cgx-card-pie{padding-top:5px;gap:2px}.cgx .cgx-card-pie .cgx-precio strong{font-size:14.5px}.cgx .cgx-stk,.cgx .cgx-entupc{font-size:10px}}',
		'#cg-armador.cgx .cgx-chip.is-on,#cg-armador.cgx .cgx-chip.is-on:hover,#cg-armador.cgx .cgx-chip.is-on:focus{background:linear-gradient(160deg,color-mix(in srgb,#d23f86 34%,transparent),color-mix(in srgb,#d23f86 16%,transparent))!important;border-color:color-mix(in srgb,#ff6fb0 70%,transparent)!important;color:#ffd1e6!important;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 0 0 3px color-mix(in srgb,#d23f86 14%,transparent),inset 0 1px 0 color-mix(in srgb,#fff 12%,transparent)}',
		'html.light #cg-armador.cgx .cgx-chip.is-on{color:#a0175a!important;background:linear-gradient(160deg,#fde3ef,#fbd2e5)!important}',
		'#cg-armador.cgx .cgx-tab.is-on{color:var(--x-t)}',
		'@media (max-width:899px){.cgx .cgx-card .cgx-img{height:auto;aspect-ratio:1 / 1;margin:6px 6px 0;border-radius:10px}.cgx .cgx-card .cgx-img img{max-width:80%;max-height:80%}',
		'.cgx .cgx-card-b{padding:8px 9px 11px}.cgx .cgx-card .cgx-h3{font-size:12px;line-height:1.35}.cgx .cgx-card-pie{padding-top:8px}',
		'.cgx .cgx-card .cgx-img.cgx-img-msg{aspect-ratio:1 / 1;height:auto}}',
		/* ---- v4.3: tarjetas sin desenfoque (rendimiento) y vidrio en todo ---- */
		'#cg-armador.cgx .cgx-card{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}',
		'#cg-armador.cgx .cgx-buscar input,#cg-armador.cgx .cgx-orden select{background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));border:1px solid var(--x-borde);border-radius:12px;color:var(--x-t);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}',
		'#cg-armador.cgx .cgx-buscar input:focus,#cg-armador.cgx .cgx-orden select:focus{border-color:color-mix(in srgb,#d23f86 60%,transparent);box-shadow:0 0 0 3px color-mix(in srgb,#d23f86 15%,transparent);outline:0}',
		'#cg-armador.cgx .cgx-orden select option{background:var(--x-bg);color:var(--x-t)}',
		'#cg-armador.cgx .cgx-chip{background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));border:1px solid var(--x-borde);border-radius:999px;color:var(--x-t)}',
		'#cg-armador.cgx .cgx-chip:hover{border-color:color-mix(in srgb,var(--x-t) 28%,transparent)}',
		'#cg-armador.cgx .cgx-btn:not(.cgx-prim):not(.is-peligro){background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));border:1px solid var(--x-borde);border-radius:12px;color:var(--x-t)}',
		'#cg-armador.cgx .cgx-btn:not(.cgx-prim):not(.is-peligro):hover{border-color:color-mix(in srgb,var(--x-t) 30%,transparent)}',
		'#cg-armador.cgx .cgx-prim{border-radius:12px}',
		'.cgx .cgx-aviso,.cgx .cgx-fijo,.cgx .cgx-multi,.cgx .cgx-vacio,.cgx .cgx-confirma,.cgx .cgx-nota.is-warn,.cgx-compra .cgx-c-falla{border-radius:14px;background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 color-mix(in srgb,#fff 6%,transparent)}',
		'.cgx .cgx-aviso{border:1px solid var(--x-borde)}.cgx .cgx-vacio{border:1px dashed var(--x-borde)}.cgx .cgx-confirma{border:1px solid var(--x-borde)}',
		'.cgx .cgx-aviso.is-warn,.cgx .cgx-nota.is-warn{border-color:color-mix(in srgb,#f59e0b 55%,transparent);background:linear-gradient(160deg,color-mix(in srgb,#f59e0b 12%,transparent),color-mix(in srgb,#f59e0b 4%,transparent))}',
		'.cgx .cgx-aviso.is-ok,.cgx .cgx-fijo{border-color:color-mix(in srgb,#2fbf71 45%,transparent)}',
		'.cgx .cgx-hoja{background:color-mix(in srgb,var(--x-bg) 84%,transparent);-webkit-backdrop-filter:blur(22px) saturate(140%);backdrop-filter:blur(22px) saturate(140%);border-top:1px solid var(--x-borde)}',
		'.cgx .cgx-barra{background:color-mix(in srgb,var(--x-bg) 78%,transparent);-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);border-top:1px solid var(--x-borde)}',
		'.cgx-compra .cgx-c-panel{border-radius:20px;background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));border:1px solid var(--x-borde);-webkit-backdrop-filter:blur(16px) saturate(140%);backdrop-filter:blur(16px) saturate(140%);box-shadow:0 20px 60px rgba(0,0,0,.22)}',
		'.cgx-compra .cgx-c-img{border-radius:10px;border:1px solid var(--x-borde)}',
		'html.light #cg-armador.cgx .cgx-buscar input,html.light #cg-armador.cgx .cgx-orden select,html.light #cg-armador.cgx .cgx-chip:not(.is-on),html.light #cg-armador.cgx .cgx-btn:not(.cgx-prim):not(.is-peligro){background:#fff;border-color:#e3e5e9}',
		'html.light .cgx .cgx-aviso,html.light .cgx .cgx-fijo,html.light .cgx .cgx-multi,html.light .cgx .cgx-vacio,html.light .cgx .cgx-confirma,html.light .cgx-compra .cgx-c-panel{background:#f6f7f9}',
		/* v5.0: teléfono sin beneficios y encabezado centrado; un solo botón de ayuda */
		'.cgx .cgx-hero .cgx-accesos{justify-content:center}',
		'@media (max-width:899px){.cgx .cgx-hero .cgx-ben{display:none!important}',
		'.cgx .cgx-hero-t{text-align:center}.cgx .cgx-hero-sub{margin-left:auto;margin-right:auto}',
		'.cgx .cgx-hero .cgx-accesos{display:flex!important;flex-direction:row!important;justify-content:center;align-items:center}',
		'.cgx .cgx-hero .cgx-accesos a.cgx-vidrio{flex:0 1 auto;width:auto!important;min-width:230px;max-width:320px;justify-content:center;padding:10px 18px 10px 12px}',
		'.cgx .cgx-hero .cgx-accesos small{display:inline}',
		'.cgx .cgx-hero .cgx-eyebrow,.cgx .cgx-hero .cgx-hero-sub,.cgx .cgx-hero .cgx-accesos,.cgx .cgx-title .cgx-accesos{display:none!important}',
		'.cgx .cgx-hero{margin-bottom:10px}#cg-armador.cgx .cgx-hero h1.cgx-h1{margin:2px 0 0}}',
		/* v5.2: "Ver PC armadas" como beneficio clickeable; encabezado de una sola columna; título del teléfono parejo */
		'.cgx .cgx-hero{grid-template-columns:minmax(0,1fr)!important}',
		'.cgx .cgx-ben li.cgx-ben-link{padding:0;border-color:color-mix(in srgb,#d23f86 45%,transparent);background:color-mix(in srgb,#d23f86 10%,transparent)}',
		'.cgx .cgx-ben li.cgx-ben-link a{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;color:var(--x-t);text-decoration:none;font-weight:700}',
		'.cgx .cgx-ben li.cgx-ben-link a:hover{color:#ff6fb0}.cgx .cgx-ben li.cgx-ben-link .cgx-ico{color:#ff6fb0}',
		'.cgx .cgx-title.is-compacto .cgx-ben li.cgx-ben-link a{padding:5px 10px}',
		'@media (max-width:899px){.cgx .cgx-ben li.cgx-ben-link{display:none!important}',
		'#cg-armador.cgx .cgx-hero h1.cgx-h1,#cg-armador.cgx .cgx-title.is-compacto h1.cgx-h1{font-size:26px!important;line-height:1.15;margin:2px 0 0;text-align:center}',
		'.cgx .cgx-title.is-compacto{justify-content:center}.cgx .cgx-title.is-compacto .cgx-title-t{flex:1 1 100%;display:flex!important;flex-direction:column;align-items:center;text-align:center}',
		'.cgx .cgx-title.is-compacto .cgx-crumb{display:block;margin-top:4px}}',
		/* ---- v5.4: barra única, lista "Mi PC" pegada a la barra, barra fina en la computadora, pantalla de espera ---- */
		'.cgx-espera{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:24px;background:color-mix(in srgb,var(--x-bg,#111) 62%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);opacity:0;transition:opacity .15s ease;font-family:inherit}',
		'.cgx-espera.is-on{opacity:1}',
		'.cgx-espera-c{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:320px;padding:26px 30px;border-radius:20px;border:1px solid var(--x-borde);background:linear-gradient(160deg,var(--x-vidrio),var(--x-vidrio2));box-shadow:0 20px 60px rgba(0,0,0,.25);text-align:center}',
		'.cgx-espera-c strong{font-size:16px;font-weight:700;line-height:1.35;color:var(--x-t)}',
		'.cgx-espera-spin{width:36px;height:36px;border-radius:50%;border:3px solid color-mix(in srgb,#d23f86 22%,transparent);border-top-color:#ff5fa8;animation:cgxGiraE .75s linear infinite}',
		'@keyframes cgxGiraE{to{transform:rotate(360deg)}}',
		'html.light .cgx-espera-c{background:#fff;border-color:#e3e5e9}',
		'.cgx .cgx-mipc .cgx-ico{transition:transform .2s ease}.cgx .cgx-mipc[aria-expanded="true"] .cgx-ico{transform:rotate(180deg)}',
		'@media (max-width:899px){',
		'.cgx .cgx-barra{z-index:1502}',
		'.cgx .cgx-hoja-fondo{bottom:var(--cgx-barra-alto,0px)}',
		'.cgx .cgx-hoja{bottom:var(--cgx-barra-alto,0px);max-height:calc(82vh - var(--cgx-barra-alto,0px));gap:6px;padding:8px 14px 12px;border-radius:18px 18px 0 0;box-shadow:0 -12px 30px rgba(0,0,0,.3);animation:cgxSube .2s ease}',
		'@keyframes cgxSube{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}',
		'.cgx .cgx-hoja-asa{display:block;width:38px;height:4px;border-radius:2px;background:var(--x-borde);margin:2px auto 4px;flex-shrink:0}',
		'#cg-armador.cgx .cgx-hoja-f{display:flex;align-items:center;gap:10px;width:100%;min-height:46px;padding:8px 2px;border:0;border-bottom:1px solid var(--x-l);background:none;color:var(--x-t);text-align:left;cursor:pointer;border-radius:0}',
		'#cg-armador.cgx .cgx-hoja-f:last-child{border-bottom:0}',
		'.cgx .cgx-hoja-f .cgx-hoja-k{flex:0 0 98px;grid-column:auto;font-size:12px;font-weight:600;color:var(--x-m)}',
		'.cgx .cgx-hoja-f .cgx-hoja-n{flex:1;min-width:0;font-size:13.5px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
		'.cgx .cgx-hoja-f.is-vacia .cgx-hoja-n{color:var(--x-m);font-style:italic}.cgx .cgx-hoja-f.is-skip .cgx-hoja-n{color:var(--x-m)}',
		'.cgx .cgx-hoja-f .cgx-hoja-p{font-size:13.5px;font-weight:800;white-space:nowrap}.cgx .cgx-hoja-ir{display:inline-flex;color:var(--x-m)}',
		'.cgx .cgx-hoja-f.is-on .cgx-hoja-k{color:#ff6fb0}',
		'.cgx .cgx-hoja .cgx-pc-acc{display:flex;justify-content:center;gap:18px;padding-top:6px;border-top:1px solid var(--x-l)}',
		'}',
		'@media (min-width:900px){',
		'.cgx .cgx-barra{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:999;align-items:center;gap:16px;padding:10px max(20px,calc((100vw - 1180px) / 2));transform:translateY(110%);visibility:hidden;transition:transform .22s ease,visibility 0s linear .22s}',
		'.cgx.is-barra-pc .cgx-barra{transform:none;visibility:visible;transition:transform .22s ease}',
		'.cgx .cgx-barra-t{flex:1;display:flex;align-items:baseline;gap:12px;background:none;border:0;padding:0;text-align:left}',
		'.cgx .cgx-barra-t strong{font-size:20px;font-weight:800}.cgx .cgx-barra-t small{font-size:13px;color:var(--x-m);font-weight:600}',
		'.cgx .cgx-barra .cgx-prim{min-height:44px;padding:0 26px}',
		'}',
		'@media (prefers-reduced-motion:reduce){.cgx-espera,.cgx .cgx-barra,.cgx .cgx-mipc .cgx-ico{transition:none}.cgx .cgx-hoja{animation:none}.cgx-espera-spin{animation-duration:2s}}',
		'@media (prefers-reduced-motion:reduce){.cgx .cgx-panel,.cgx .cgx-fade,.cgx .cgx-card,.cgx .cgx-tilde,.cgx .cgx-card img{transition:none}.cgx .cgx-card.is-pulso,.cgx .cgx-sk,.cgx .cgx-card.is-skel .cgx-img{animation:none}}'
	].join('\n');

	/* =================================================================
	   ARRANQUE
	   ================================================================= */
	function iniciar() {
		if (!window.PageMethods || !PageMethods.wsNRW_Script) { setTimeout(iniciar, 150); return; }
		CTX = { comp_id: +hid('hidCompId') || 1, prli_id: +hid('hidPriceListId'), ws_id: hid('hidWSId') || hid('hidWebSiteID') };
		if (!CTX.prli_id || !CTX.ws_id) return;
		var cont = document.getElementById('cg-armador') || $('.container.contenidos') || $('.contenidos');
		if (!cont) return;
		var lpc = Array.prototype.filter.call(document.querySelectorAll('a'), function (a) { return /computadoras armadas/i.test(a.textContent); })[0];
		if (lpc) CFG.pcArmadas = lpc.href;
		var st = document.createElement('style'); st.id = 'cgx-css'; st.textContent = CSS; document.head.appendChild(st);
		ROOT = document.createElement('div'); ROOT.id = 'cg-armador'; ROOT.className = 'cgx';
		if (cont.id === 'cg-armador') cont.id = 'cg-armador-viejo';
		cont.parentNode.insertBefore(ROOT, cont);
		cont.style.display = 'none';
		document.body.classList.add('cgx-activo');
		setTimeout(function () { subirWhatsapp(78); }, 800); setTimeout(function () { subirWhatsapp(78); }, 2500);
		ROOT.addEventListener('click', onClick, true);
		ROOT.addEventListener('input', onInput);
		ROOT.addEventListener('change', onChange);
		ROOT.addEventListener('keydown', onKey);
		document.addEventListener('click', function (e) {
			var a = e.target.closest && e.target.closest('a[href]');
			if (a && !a.hasAttribute('data-ir') && !a.hasAttribute('data-a') && a.target !== '_blank') SALIENDO = true;
		}, true);
		window.addEventListener('pagehide', function () { SALIENDO = true; });
		try { sessionStorage.setItem('cg-sesion', '1'); } catch (e) {}
		window.addEventListener('pageshow', function (ev) {
			if (!ev.persisted) return;
			SALIENDO = false;
			var st = leerPropio(), ahora = {};
			Object.keys(S.sel).forEach(function (k) { ahora[k] = S.sel[k].it.item_id; });
			var guardado = {}; if (st) Object.keys(st.sel).forEach(function (k) { guardado[k] = st.sel[k].i; });
			if (JSON.stringify(ahora) !== JSON.stringify(guardado) || JSON.stringify(S.skip) !== JSON.stringify((st && st.skip) || {})) {
				if (st) restaurar(st, S.actual, true); else { borrarTodo(); irA('micro', true); }
			} else { S.avisos = []; render(); }
		});
		var g = leerGuardado();
		var pasoQ = null; try { pasoQ = new URLSearchParams(location.search).get('paso'); } catch (e) {}
		if (pasoQ) history.replaceState(null, '', location.pathname);
		if (g && g.link) {
			history.replaceState(null, '', location.pathname);
			var mio = leerPropio();
			if (mio && JSON.stringify(mio.sel) !== JSON.stringify(g.st.sel)) { try { localStorage.setItem(CLAVE + '-previo', JSON.stringify(mio)); } catch (e) {} }
			restaurar(g.st, null, true, 'compartido'); return;
		}
		if (g && pasoQ && PASOS[pasoQ]) { restaurar(g.st, pasoQ, true); return; }
		if (g && !g.link && g.st.carrito && itemsEnCarrito() === 0) {
			try { localStorage.removeItem(CLAVE); } catch (e) {}
			g = null;
		}
		if (g) { restaurar(g.st, null, true, g.st.carrito ? 'carrito' : 'retomar'); return; }
		irA('micro', true);
	}
	window.cgArmadorNuevo = { version: '5.4', estado: function () { return S; }, compra: urlCompra };

	/* =================================================================
	   PÁGINA DE COMPRA (armarpccompra) con el diseño nuevo
	   Dibuja su propia versión y deja la del ERP escondida pero intacta:
	   "Agregar al carrito" aprieta el botón original (#agregarAlCarrito).
	   ================================================================= */
	function iniciarCompra(par) {
		var vieja = document.querySelector('.cg-compra') || document.getElementById('cg-armador');
		if (!vieja) return;
		var v = {};
		par.split(';').forEach(function (x) { var i = x.indexOf('='); if (i > 0) v[x.slice(0, i).toUpperCase()] = x.slice(i + 1); });
		var elegidos = {};
		ORDEN.forEach(function (k) { var p = PASOS[k], id = +v[p.url]; if (id > 0) elegidos[k] = { id: id, q: p.qurl ? (+v[p.qurl] || 1) : 1 }; });
		var st = document.createElement('style'); st.id = 'cgx-css'; st.textContent = CSS + '\n' + CSS_COMPRA; document.head.appendChild(st);
		ROOT = document.createElement('div'); ROOT.id = 'cg-armador'; ROOT.className = 'cgx cgx-compra';
		if (vieja.id === 'cg-armador') vieja.id = 'cg-armador-viejo';
		vieja.parentNode.insertBefore(ROOT, vieja);
		vieja.style.display = 'none';
		setTimeout(function () { subirWhatsapp(78); }, 800); setTimeout(function () { subirWhatsapp(78); }, 2500);
		var armar = function (por) { return ORDEN.map(function (k) { var e = elegidos[k]; return { k: k, it: e ? por[e.id] : null, q: e ? e.q : 0 }; }); };
		var auto = false; try { auto = sessionStorage.getItem('cg-auto-carrito') === '1'; sessionStorage.removeItem('cg-auto-carrito'); } catch (e) {}
		if (auto && Object.keys(elegidos).length) { agregarSolo(); return; }
		/* 1) Al instante, con lo que guardó el armador (si es esta misma PC) */
		var local = leerPropio(), porLocal = {}, alcanza = !!local;
		Object.keys(elegidos).forEach(function (k) {
			var g = local && local.sel && local.sel[k];
			if (g && g.i === elegidos[k].id && g.n) porLocal[g.i] = { item_id: g.i, nombre: g.n, code: g.c, precio: g.p };
			else alcanza = false;
		});
		if (alcanza && Object.keys(elegidos).length) pintarCompra(armar(porLocal), v);
		else ROOT.innerHTML = '<div class="cgx-head"><div class="cgx-title"><div><h1 class="cgx-h1">Resumen de tu PC</h1>' +
			'<p class="cgx-lead">Revisá tu armado antes de agregarlo al carrito.</p></div></div></div>' + esqueletoResumen();
		/* 2) Después, precios y datos del día desde el ERP */
		var traer = function () {
			if (!window.PageMethods || !PageMethods.wsNRW_Script) { setTimeout(traer, 150); return; }
			CTX = { comp_id: +hid('hidCompId') || 1, prli_id: +hid('hidPriceListId'), ws_id: hid('hidWSId') || hid('hidWebSiteID') };
			if (!CTX.prli_id || !CTX.ws_id) return;
			var ids = Object.keys(elegidos).map(function (k) { return elegidos[k].id; });
			var listo = function (lista) { var por = {}; (lista || []).forEach(function (it) { por[it.item_id] = it; }); pintarCompra(armar(por), v); };
			if (!ids.length) listo([]); else api({ seccion: 'byids', ids: ids }).then(listo, function () { if (!alcanza) listo([]); });
		};
		traer();
	}
	/* "Comprar" desde el armador: aprieta solo el botón del ERP y el ERP lleva al carrito.
	   Si en unos segundos no pasó nada, muestra el resumen normal con un aviso. */
	function agregarSolo() {
		ROOT.innerHTML = '';
		espera('Agregando tu PC al carrito…');
		var intentos = 0;
		var apretar = function () {
			var orig = document.getElementById('agregarAlCarrito');
			var listo = orig && document.readyState === 'complete' && window.jQuery;
			if (!listo && intentos++ < 60) { setTimeout(apretar, 100); return; }
			if (!orig) { volverAlResumen(); return; }
			agregarDeAUno(productosDeLaPagina(), function () {}, function (fallos) {
				if (fallos.length) { volverAlResumen(); return; }
				marcarCarrito(true); location.href = location.origin + URL_CARRITO;
			});
		};
		apretar();
	}
	/* Agregar al carrito de a uno (misma función y mismos productos que el botón del ERP) */
	var URL_CARRITO = '/CHECKOUT/mycart/compugarden.aspx';
	function productosDeLaPagina() {
		return Array.prototype.map.call(document.querySelectorAll('.caja-prod-armado'), function (el) {
			var caja = el.closest('.item-pc-armada') || el;
			var lineas = (caja.innerText || caja.textContent || '').split('\n').map(function (t) { return t.replace(/\(x\s*\d+\).*$/, '').trim(); }).filter(function (t) { return t.length > 3; });
			var nombre = lineas.filter(function (t) { return !/^(microprocesador|cooler|motherboard|memoria ram|placa de video|hdd principal|hdd secundario|gabinete|fuente|monitor|periferico \d|placa de wifi|armado pc|sistema operativo)$/i.test(t) && !/eliminar|modificar/i.test(t); })[0] || lineas[0] || '';
			return { id: el.getAttribute('value'), q: el.getAttribute('valueq') || '1', nombre: nombre };
		}).filter(function (x) { return x.id && x.id !== '0'; });
	}
	function agregarDeAUno(lista, alAvanzar, alTerminar) {
		var ws = hid('hidWebSiteID') || hid('hidWSId'), i = 0, fallos = [];
		var uno = function () {
			if (i >= lista.length) { alTerminar(fallos); return; }
			var p = lista[i++];
			alAvanzar(i, lista.length);
			var hecho = false, seguir = function (ok, msg) {
				if (hecho) return; hecho = true;
				if (!ok) fallos.push({ p: p, msg: msg || '' });
				setTimeout(uno, 40);
			};
			var vigia = setTimeout(function () { seguir(false, 'El servidor no respondió a tiempo.'); }, 20000);
			try {
				PageMethods.wsNRW_AddCart(ws, p.id, p.q, -1, '', function (r) {
					clearTimeout(vigia);
					/* Solo se toma como error si el ERP lo dice claramente (ítem -1 con mensaje) */
					var o = r, error = false, msg = '';
					/* Formato del ERP: "idDelItem,mensaje,cantidad" — el id -1 quiere decir que no lo agregó */
					if (typeof r === 'string' && /^\s*-1\s*,/.test(r)) { error = true; msg = 'sin stock disponible en este momento'; }
					try { if (typeof r === 'string' && /^[\[{]/.test(r.trim())) o = JSON.parse(r); } catch (e2) {}
					if (o && typeof o === 'object') {
						var idr = o.intItemId != null ? o.intItemId : (o.item_id != null ? o.item_id : o.ItemId);
						if (+idr === -1) { error = true; msg = o.strErrorMessage || o.message || ''; }
					}
					if (window.console) console.log('[cg-armador] carrito', p.id, r);
					seguir(!error, msg);
				}, function (e) { clearTimeout(vigia); seguir(false, e && e.get_message ? e.get_message() : 'Error al agregar.'); });
			} catch (e) { clearTimeout(vigia); seguir(false, 'Error al agregar.'); }
		};
		uno();
	}
	function marcarCarrito(v) { try { var st0 = leerPropio(); if (st0) { st0.carrito = v; localStorage.setItem(CLAVE, JSON.stringify(st0)); } } catch (er) {} }
	function volverAlResumen() {
		try { var st0 = leerPropio(); if (st0) { st0.carrito = false; localStorage.setItem(CLAVE, JSON.stringify(st0)); } } catch (er) {}
		try { sessionStorage.removeItem('cg-auto-carrito'); } catch (e) {}
		location.reload();
	}
	function urlConCero(v, k) {
		var orden = ORDEN_URL;
		var c = Object.assign({}, v); c[PASOS[k].url] = '0';
		return location.origin + '/armarpccompra/PASO=15;' + orden.map(function (x) { return x + '=' + (c[x] == null ? '0' : c[x]); }).join(';') + '/compugarden.aspx';
	}
	/* Hoja de presupuesto (solo para imprimir / guardar como PDF) */
	function dosD(n) { return (n < 10 ? '0' : '') + n; }
	function numeroPresupuesto(d) { return 'CG-' + String(d.getFullYear()).slice(2) + dosD(d.getMonth() + 1) + dosD(d.getDate()) + '-' + dosD(d.getHours()) + dosD(d.getMinutes()); }
	function fechaCorta(d) { return dosD(d.getDate()) + '/' + dosD(d.getMonth() + 1) + '/' + d.getFullYear(); }
	var PRESU_CSS = [
		'@page{size:A4;margin:0}',
		'*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;color:#111}',
		'body{font-family:Manrope,Arial,Helvetica,sans-serif;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
		'.ph-hoja{width:210mm;min-height:296mm;padding:14mm 14mm 12mm;display:flex;flex-direction:column;margin:0 auto}',
		'.ph-cab{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:10px;border-bottom:3px solid #d23f86}',
		'.ph-logo{display:flex;align-items:center;gap:10px}.ph-cg{width:42px;height:42px;border-radius:9px;background:#111;color:#fff;font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center;letter-spacing:-1px}',
		'.ph-emp b{font-size:15px;letter-spacing:.02em}.ph-emp div{color:#444;line-height:1.5}',
		'.ph-doc{text-align:right}.ph-doc h1{margin:0;font-size:22px;font-weight:800;letter-spacing:.08em;color:#d23f86}.ph-doc table{margin-left:auto;margin-top:4px;border-collapse:collapse}.ph-doc td{padding:1px 0 1px 10px;color:#333}.ph-doc td:first-child{color:#777}',
		'.ph-cli{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:12px 0}.ph-cli div{border-bottom:1px solid #bbb;padding:14px 0 3px;color:#777;font-size:10px}',
		'.ph-it{width:100%;border-collapse:collapse}.ph-it th{background:#111;color:#fff;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;text-align:left;padding:6px 7px}',
		'.ph-it th.n,.ph-it td.n{text-align:right;white-space:nowrap}.ph-it td{padding:6px 7px;border-bottom:1px solid #e5e5e5;vertical-align:top}.ph-it tr{page-break-inside:avoid}',
		'.ph-it tr.ph-g td{background:#f6f6f7;font-weight:800;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:#d23f86;padding:4px 7px}',
		'.ph-it td.k{color:#555;width:96px}.ph-it td.sku{color:#777;font-size:9px;width:92px;overflow-wrap:anywhere}',
		'.ph-tot{display:flex;justify-content:flex-end;margin-top:10px}.ph-tot table{border-collapse:collapse;min-width:290px}.ph-tot td{padding:4px 8px}.ph-tot td.n{text-align:right}',
		'.ph-tot tr.g td{font-size:16px;font-weight:800;border-top:2px solid #111;padding-top:7px}.ph-tot tr.c td{color:#555}',
		'.ph-cond{margin-top:14px;display:grid;grid-template-columns:1.4fr 1fr;gap:14px;page-break-inside:avoid}',
		'.ph-cond h3{margin:0 0 4px;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#d23f86}.ph-cond ul{margin:0;padding-left:14px;color:#333;line-height:1.55}',
		'.ph-box{border:1px solid #ddd;border-radius:8px;padding:9px 10px;line-height:1.55;color:#333}.ph-box b{color:#111}',
		'.ph-pie{margin-top:auto;padding-top:10px;border-top:1px solid #ddd;display:flex;justify-content:space-between;color:#777;font-size:9.5px}',
		'.ph-acc{display:flex;justify-content:center;gap:10px;padding:14px;font-family:Arial,sans-serif}.ph-acc button{font-size:15px;padding:10px 18px;border-radius:10px;border:0;background:#d23f86;color:#fff;font-weight:700}',
		'@media print{.ph-acc{display:none}}'
	].join('\n');
	function imprimirPresupuesto() {
		var hoja = ROOT.querySelector('.cgx-presu'); if (!hoja) return;
		var titulo = 'Presupuesto ' + (ROOT._numPresu || 'Compugarden');
		var cuerpo = hoja.innerHTML;
		var doc = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(titulo) + '</title>' +
			'<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet"><style>' + PRESU_CSS + '</style></head><body>';
		var movil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
		if (movil) {
			var w = window.open('', '_blank');
			if (w) {
				w.document.open(); w.document.write(doc + '<div class="ph-acc"><button onclick="window.print()">Guardar o imprimir</button></div>' + cuerpo + '</body></html>'); w.document.close();
				setTimeout(function () { try { w.focus(); w.print(); } catch (e) {} }, 700);
				return;
			}
		}
		var viejo = document.getElementById('cgx-presu-frame'); if (viejo) viejo.remove();
		var fr = document.createElement('iframe');
		fr.id = 'cgx-presu-frame'; fr.setAttribute('aria-hidden', 'true'); fr.setAttribute('title', titulo);
		fr.style.cssText = 'position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none';
		document.body.appendChild(fr);
		var d = fr.contentWindow.document;
		d.open(); d.write(doc + cuerpo + '</body></html>'); d.close();
		var listo = false, imprimir = function () {
			if (listo) return; listo = true;
			var tit = document.title; document.title = titulo;
			try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (e) { window.print(); }
			setTimeout(function () { document.title = tit; }, 1500);
		};
		fr.onload = function () { setTimeout(imprimir, 250); };
		setTimeout(imprimir, 1200);
	}
	function presupuestoHTML(filas, tot) {
		var hoy = new Date(), vence = new Date(hoy.getTime() + 864e5), num = numeroPresupuesto(hoy), cant = 0;
		var t = '<div class="cgx-presu" aria-hidden="true"><div class="ph-hoja">' +
			'<div class="ph-cab"><div class="ph-logo"><div class="ph-cg">CG</div><div class="ph-emp"><b>COMPUGARDEN S.R.L.</b><div>Florida 537 PB, Local 384 · Galería Jardín · CABA (C1005AAK)<br>Tel. 4326-2721 · WhatsApp 11 5348-6520 · compugarden.com.ar<br>CUIT 30-71407549-3</div></div></div>' +
			'<div class="ph-doc"><h1>PRESUPUESTO</h1><table><tr><td>N.º</td><td><b>' + num + '</b></td></tr><tr><td>Fecha</td><td>' + fechaCorta(hoy) + '</td></tr><tr><td>Válido hasta</td><td>' + fechaCorta(vence) + '</td></tr></table></div></div>' +
			'<div class="ph-cli"><div>Cliente</div><div>Teléfono / e-mail</div><div>Atendió</div></div>' +
			'<table class="ph-it"><thead><tr><th>Componente</th><th>Producto</th><th>Código</th><th class="n">Cant.</th><th class="n">Precio unit.</th><th class="n">Subtotal</th></tr></thead><tbody>';
		ETAPAS.forEach(function (e, ie) {
			var de = filas.filter(function (f) { return f.it && PASOS[f.k].etapa === ie; });
			if (!de.length) return;
			t += '<tr class="ph-g"><td colspan="6">' + esc(ie === 3 ? 'Extras y servicios' : e.n) + '</td></tr>';
			de.forEach(function (f) {
				var it = f.it, q = f.q || 1, cod = String(it.code || '').trim();
				if (!cod || /^APIEAN$/i.test(cod)) cod = '—';
				var nom = it.item_id === 5653 ? 'Armado y prueba de PC (entrega en 1 hora en el local)' : nombreLimpio(it.nombreErp || it.nombre);
				cant += q;
				t += '<tr><td class="k">' + esc(PASOS[f.k].t === 'Microprocesador' ? 'Procesador' : PASOS[f.k].t) + '</td><td>' + esc(nom) + '</td><td class="sku">' + esc(cod) + '</td><td class="n">' + q + '</td><td class="n">' + plata(it.precio) + '</td><td class="n">' + plata((it.precio || 0) * q) + '</td></tr>';
			});
		});
		t += '</tbody></table>' +
			'<div class="ph-tot"><table><tr><td>Productos</td><td class="n">' + cant + '</td></tr><tr class="g"><td>Total</td><td class="n">' + plata(tot) + '</td></tr>' +
			'<tr class="c"><td>Efectivo, débito o transferencia</td><td></td></tr></table></div>' +
			'<div class="ph-cond"><div><h3>Condiciones</h3><ul><li>Precios en pesos argentinos, sujetos a cambio sin previo aviso.</li><li>Presupuesto válido por 24 horas. Stock sujeto a disponibilidad al momento de la compra.</li><li>Todos los productos cuentan con garantía oficial.</li><li>Este presupuesto no es válido como factura.</li></ul></div>' +
			'<div class="ph-box"><b>¿Lo querés comprar?</b><br>Ingresá a compugarden.com.ar o escribinos por WhatsApp al 11 5348-6520 con el número de presupuesto.<br><b>Retiro:</b> Florida 537 PB, Local 384 · Galería Jardín.<br><b>Envíos</b> a todo el país.</div></div>' +
			'<div class="ph-pie"><span>COMPUGARDEN S.R.L. · +22 años en tecnología</span><span>' + num + '</span></div></div></div>';
		return { html: t, num: num };
	}
	function pintarCompra(filas, v) {
		var tot = 0, n = 0;
		filas.forEach(function (f) { if (f.it && f.it.precio != null) { tot += f.it.precio * f.q; n += 1; } });
		var urlArm = location.origin + PORTADA;
		var h = '<div class="cgx-head"><div class="cgx-title"><div><h1 class="cgx-h1">Resumen de tu PC</h1>' +
			'<p class="cgx-lead">Revisá tu armado antes de agregarlo al carrito.</p></div></div></div>';
		if (false) h += '<div class="cgx-print-head"><div><strong>COMPUGARDEN S.R.L.</strong><span>Florida 537 PB, Local 384 · Galería Jardín · CABA (C1005AAK)</span><span>Tel. 4326-2721 · WhatsApp 11 5348-6520 · CUIT 30-71407549-3</span></div>' +
			'<div><strong>Presupuesto online</strong><span>Fecha: ' + new Date().toLocaleDateString('es-AR') + '</span></div></div>';
		h += '<div class="cgx-body"><main class="cgx-main">';
		ETAPAS.forEach(function (e) {
			h += '<section class="cgx-c-grupo"><h2 class="cgx-c-etapa">' + esc(e.n) + '</h2><div class="cgx-c-lista">';
			ORDEN.filter(function (k) { return PASOS[k].etapa === ETAPAS.indexOf(e); }).forEach(function (k) {
				var f = filas.filter(function (x) { return x.k === k; })[0];
				if ((k === 'perif2' || k === 'perif3') && !f.it) return;
				if (f.it) {
					h += '<div class="cgx-c-fila"><div class="cgx-c-img"><img alt="" src="' + esc(img(f.it)) + '" onerror="this.onerror=null;this.src=window.cgSinFoto"></div>' +
						'<div class="cgx-c-info"><span class="cgx-c-k">' + esc(PASOS[k].t) + '</span><strong class="cgx-c-n">' + esc(nombreLimpio(f.it.nombre)) + '</strong>' +
						'<span class="cgx-c-a">' + (f.q > 1 ? '<span class="cgx-c-q">' + f.q + ' × ' + plata(f.it.precio) + '</span>' : '') +
						'<a class="cgx-link" href="' + esc(urlArm + '?paso=' + k) + '">Cambiar</a><a class="cgx-link" data-c="quitar" data-k="' + k + '" href="' + esc(urlConCero(v, k)) + '">Quitar</a></span></div>' +
						'<strong class="cgx-c-p">' + plata((f.it.precio || 0) * f.q) + '</strong></div>';
				} else {
					h += '<div class="cgx-c-fila is-vacia"><div class="cgx-c-img cgx-img-ico">' + ico(PASOS[k].ico, 20) + '</div><div class="cgx-c-info"><span class="cgx-c-k">' + esc(PASOS[k].t) + '</span><span class="cgx-c-n">No incluido</span>' +
						'<span class="cgx-c-a"><a class="cgx-link" href="' + esc(urlArm + '?paso=' + k) + '">Agregar</a></span></div><strong class="cgx-c-p">$ 0</strong></div>';
				}
			});
			h += '</div></section>';
		});
		if (false) h += '<div class="cgx-print-foot"><p>Precios sujetos a cambio sin previo aviso. Este presupuesto no es válido como factura.</p><p>compugarden.com.ar · Florida 537 PB, Local 384 · Galería Jardín · CABA</p></div>';
		h += '</main><aside class="cgx-panel cgx-c-panel" aria-label="Resumen"><div class="cgx-panel-h"><h2 class="cgx-h2">Resumen</h2><span>' + n + (n === 1 ? ' producto' : ' productos') + '</span></div>' +
			'<div class="cgx-total"><span>Total</span><strong>' + plata(tot) + '</strong></div><p class="cgx-cuotas">Efectivo, débito o transferencia</p>' +
			'<button type="button" class="cgx-btn cgx-prim cgx-grande" data-c="carrito"' + (n ? '' : ' disabled') + '>Agregar al carrito</button>' +
			'<a class="cgx-btn cgx-grande cgx-c-sec" href="' + esc(urlArm) + '">' + ico('back', 16) + 'Volver al armador</a>' +
			'<div class="cgx-c-acc"><button type="button" class="cgx-btn" data-c="pdf">' + ico('disk', 16) + 'Descargar presupuesto (PDF)</button>' +
			'<button type="button" class="cgx-btn" data-c="link">' + ico('link', 16) + '<span>Copiar link de esta PC</span></button>' +
			'<a class="cgx-btn" target="_blank" rel="noopener" href="' + esc(waCompra(filas, tot)) + '">' + ico('wa', 16) + 'Compartir por WhatsApp</a></div>' +
			'<p class="cgx-c-legal">Precios sujetos a cambio sin previo aviso.</p></aside></div>' +
			'<div class="cgx-c-barra"><div class="cgx-barra-t"><strong>' + plata(tot) + '</strong><small>' + n + (n === 1 ? ' producto' : ' productos') + '</small></div>' +
			'<a class="cgx-btn cgx-c-volver" href="' + esc(urlArm) + '">' + ico('back', 14) + 'Volver</a>' +
			'<button type="button" class="cgx-btn cgx-prim" data-c="carrito"' + (n ? '' : ' disabled') + '>Agregar al carrito</button></div>';
		var pres = presupuestoHTML(filas, tot);
		ROOT._numPresu = pres.num;
		ROOT.innerHTML = h + pres.html;
		if (ROOT._oyente) return;
		ROOT._oyente = true;
		ROOT.addEventListener('click', function (e) {
			var b = e.target.closest('[data-c]'); if (!b) return;
			e.preventDefault();
			var c = b.getAttribute('data-c');
			if (c === 'carrito' || c === 'reintentar') {
				var lista = c === 'reintentar' && ROOT._fallos ? ROOT._fallos : productosDeLaPagina();
				if (!lista.length || !window.PageMethods || !PageMethods.wsNRW_AddCart) { alert('No pudimos leer los productos. Recargá la página.'); return; }
				try { sessionStorage.removeItem('cg-auto-carrito'); } catch (er) {}
				var btn = ROOT.querySelector('.cgx-c-panel [data-c="carrito"]') || b;
				var btns = ROOT.querySelectorAll('[data-c="carrito"]');
				var ponerBtn = function (dis) { Array.prototype.forEach.call(btns, function (x) { x.disabled = dis; }); };
				ponerBtn(true);
				var caja = ROOT.querySelector('.cgx-c-falla'); if (caja) caja.remove();
				espera('Agregando tu PC al carrito…');
				agregarDeAUno(lista, function (n, tot) { espera('Agregando tu PC al carrito… ' + n + ' de ' + tot); }, function (fallos) {
					if (!fallos.length) { marcarCarrito(true); irConEspera('Listo, te llevamos al carrito…', location.origin + URL_CARRITO); return; }
					esperaFin();
					ROOT._fallos = fallos.map(function (f) { return f.p; });
					ponerBtn(false);
					var d = document.createElement('div'); d.className = 'cgx-c-falla';
					d.innerHTML = '<strong>No se pudieron agregar ' + fallos.length + (fallos.length === 1 ? ' producto' : ' productos') + ':</strong><ul>' +
						fallos.map(function (f) { return '<li>' + esc(nombreLimpio(f.p.nombre) || ('Producto ' + f.p.id)) + (f.msg ? ' <small>(' + esc(f.msg) + ')</small>' : '') + '</li>'; }).join('') + '</ul>' +
						'<span>Puede estar reservado en otro carrito. Podés reintentar, cambiarlo en el armador o consultarnos por WhatsApp.</span>' +
						'<button type="button" class="cgx-btn cgx-prim" data-c="reintentar">Reintentar</button> <a class="cgx-btn" href="' + esc(location.origin + URL_CARRITO) + '">Ir al carrito igual</a>';
					btn.parentNode.insertBefore(d, btn.nextSibling);
					if (d.scrollIntoView) d.scrollIntoView({ block: 'center', behavior: reducirMovimiento() ? 'auto' : 'smooth' });
				});
			}
			if (c === 'quitar') {
				var kq = b.getAttribute('data-k'), lq = leerPropio();
				if (lq) { delete lq.sel[kq]; lq.skip = lq.skip || {}; lq.skip[kq] = true; lq.t = Date.now(); lq.carrito = false; try { localStorage.setItem(CLAVE, JSON.stringify(lq)); } catch (er) {} location.href = urlCompraDe(lq); }
				else location.href = b.href;
				return;
			}
			if (c === 'pdf') { imprimirPresupuesto(); return; }

			if (c === 'link') {
				var u = location.href;
				(navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function () { b.querySelector('span').textContent = 'Link copiado'; }, function () { window.prompt('Copiá este link:', u); });
			}
		});
	}
	function waCompra(filas, tot) {
		var l = ['Hola, quiero consultar por esta PC:'];
		filas.forEach(function (f) { if (f.it) l.push('• ' + PASOS[f.k].t + ': ' + nombreLimpio(f.it.nombre) + (f.q > 1 ? ' x' + f.q : '')); });
		l.push('Total: ' + plata(tot)); l.push(location.href);
		return 'https://api.whatsapp.com/send?phone=' + CFG.whatsapp + '&text=' + encodeURIComponent(l.join('\n'));
	}
	var CSS_COMPRA = [
		'.cgx-compra .cgx-head{margin-bottom:16px;gap:8px}.cgx-compra .cgx-main{gap:10px;min-height:0}',
		'.cgx-compra .cgx-c-grupo{display:flex;flex-direction:column}',
		'.cgx-compra .cgx-c-etapa{margin:4px 0 2px;font-size:13px;font-weight:800;color:var(--x-m)}',
		'.cgx-compra .cgx-c-lista{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:24px}',
		'.cgx-compra .cgx-c-fila{display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:0 12px;padding:8px 0;border-bottom:1px solid var(--x-l)}',
		'.cgx-compra .cgx-c-img{width:44px;height:44px;border-radius:8px;background:#fff;border:1px solid var(--x-l);display:flex;align-items:center;justify-content:center;overflow:hidden}',
		'.cgx-compra .cgx-c-img img{max-width:90%;max-height:90%;object-fit:contain}',
		'.cgx-compra .cgx-c-info{display:flex;flex-direction:column;gap:1px;min-width:0}',
		'.cgx-compra .cgx-c-k{font-size:11.5px;font-weight:600;color:var(--x-m)}',
		'.cgx-compra .cgx-c-n{font-size:13.5px;font-weight:600;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
		'.cgx-compra .cgx-c-a{display:flex;flex-wrap:wrap;align-items:center;gap:0 12px}.cgx-compra .cgx-c-a .cgx-link{min-height:24px;font-size:12px}.cgx-compra .cgx-c-q{font-size:12px;color:var(--x-m)}',
		'.cgx-compra .cgx-c-p{font-size:14px;font-weight:800;white-space:nowrap}',
		'.cgx-compra .cgx-c-fila.is-vacia .cgx-c-n,.cgx-compra .cgx-c-fila.is-vacia .cgx-c-p{color:var(--x-m);font-weight:600}',
		'.cgx-compra .cgx-c-panel .cgx-c-sec{color:var(--x-t)}',
		'.cgx-compra .cgx-c-acc{display:flex;flex-direction:column;gap:8px;padding-top:4px;border-top:1px solid var(--x-l)}.cgx-compra .cgx-c-acc .cgx-btn{justify-content:flex-start;font-size:13.5px;color:var(--x-m)}',
		'.cgx-compra .cgx-c-legal{margin:0;font-size:12px;color:var(--x-m)}',
		'.cgx-compra .cgx-c-falla{padding:12px;border:1px solid #dc2626;border-radius:10px;font-size:13.5px;display:flex;flex-direction:column;gap:8px}',
		'.cgx-compra .cgx-c-falla ul{margin:0;padding-left:18px}.cgx-compra .cgx-c-falla .cgx-btn{min-height:38px}',
		'.cgx-compra .cgx-print-head,.cgx-compra .cgx-print-foot{display:none}',
		'.cgx-compra .cgx-auto{min-height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center}',
		'.cgx-compra .cgx-auto strong{font-size:20px}.cgx-compra .cgx-auto>span:last-child{color:var(--x-m)}',
		'.cgx-compra .cgx-spin{width:34px;height:34px;border-radius:50%;border:3px solid var(--x-l);border-top-color:var(--x-a);animation:cgxGira .8s linear infinite}',
		'@keyframes cgxGira{to{transform:rotate(360deg)}}',
		'@media (prefers-reduced-motion:reduce){.cgx-compra .cgx-spin{animation-duration:2s}}',
		'@media (max-width:899px){.cgx-compra .cgx-c-lista{grid-template-columns:1fr}',
		'.cgx-compra .cgx-c-panel{position:static;transform:none;max-height:none;box-shadow:none;border-radius:12px;background:var(--x-s)}}',
		/* ---- v5.4: resumen con barra fija en el teléfono ---- */
		'.cgx-compra .cgx-c-barra{display:none}',
		'.cgx-compra .cgx-c-panel .cgx-c-sec{display:inline-flex;align-items:center;justify-content:center;gap:8px}',
		'.cgx-compra .cgx-c-fila.is-skel .cgx-c-img{border:0}.cgx-compra .cgx-c-fila.is-skel .cgx-c-info{gap:8px}',
		'@media (max-width:899px){',
		'.cgx-compra .cgx-c-barra{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:999;align-items:center;gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px));background:color-mix(in srgb,var(--x-bg) 78%,transparent);-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);border-top:1px solid var(--x-borde)}',
		'.cgx-compra .cgx-c-barra .cgx-barra-t{flex:1;min-width:0;display:flex;flex-direction:column}.cgx-compra .cgx-c-barra .cgx-barra-t strong{font-size:18px;font-weight:800}.cgx-compra .cgx-c-barra .cgx-barra-t small{font-size:12px;color:var(--x-m)}',
		'.cgx-compra .cgx-c-barra .cgx-btn{min-height:44px;padding:0 14px;white-space:nowrap}.cgx-compra .cgx-c-volver{display:inline-flex;align-items:center;gap:6px;color:var(--x-t)}',
		'.cgx-compra .cgx-c-panel .cgx-panel-h,.cgx-compra .cgx-c-panel .cgx-total,.cgx-compra .cgx-c-panel .cgx-cuotas,.cgx-compra .cgx-c-panel>[data-c="carrito"],.cgx-compra .cgx-c-panel>.cgx-c-sec{display:none}',
		'.cgx-compra .cgx-c-panel .cgx-c-acc{border-top:0;padding-top:0}',
		'}',
		'.cgx-presu{display:none}',
		'@media print{@page{size:A4;margin:0}html,body{background:#fff!important;margin:0!important;padding:0!important}',
		'body.cgx-imprime>*:not(.cgx-presu){display:none!important}',
		'body:not(.cgx-imprime) *{visibility:hidden!important}',
		'.cgx-presu,.cgx-presu *{visibility:visible!important}.cgx-presu{display:block!important;position:static;width:210mm;background:#fff;color:#111;font-family:Manrope,Arial,sans-serif;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
		'.ph-hoja{width:210mm;min-height:297mm;padding:14mm 14mm 12mm;display:flex;flex-direction:column;box-sizing:border-box}',
		'.ph-cab{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:10px;border-bottom:3px solid #d23f86}',
		'.ph-logo{display:flex;align-items:center;gap:10px}.ph-cg{width:42px;height:42px;border-radius:9px;background:#111;color:#fff;font-weight:800;font-size:19px;display:flex;align-items:center;justify-content:center;letter-spacing:-1px}',
		'.ph-emp b{font-size:15px;letter-spacing:.02em}.ph-emp div{color:#444;line-height:1.5}',
		'.ph-doc{text-align:right}.ph-doc h1{margin:0!important;font-size:22px!important;font-weight:800!important;letter-spacing:.08em;color:#d23f86!important}.ph-doc table{margin-left:auto;margin-top:4px;border-collapse:collapse}.ph-doc td{padding:1px 0 1px 10px;color:#333}.ph-doc td:first-child{color:#777}',
		'.ph-cli{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:12px 0}.ph-cli div{border-bottom:1px solid #bbb;padding:14px 0 3px;color:#777;font-size:10px}',
		'.ph-it{width:100%;border-collapse:collapse}.ph-it th{background:#111;color:#fff;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;text-align:left;padding:6px 7px}',
		'.ph-it th.n,.ph-it td.n{text-align:right;white-space:nowrap}.ph-it td{padding:6px 7px;border-bottom:1px solid #e5e5e5;vertical-align:top}.ph-it tr{page-break-inside:avoid}',
		'.ph-it tr.ph-g td{background:#f6f6f7;font-weight:800;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:#d23f86;padding:4px 7px}',
		'.ph-it td.k{color:#666;width:96px}.ph-it td.sku{color:#888;font-size:9px;width:92px;overflow-wrap:anywhere}',
		'.ph-tot{display:flex;justify-content:flex-end;margin-top:10px}.ph-tot table{border-collapse:collapse;min-width:290px}.ph-tot td{padding:4px 8px}.ph-tot td.n{text-align:right}',
		'.ph-tot tr.g td{font-size:16px;font-weight:800;border-top:2px solid #111;padding-top:7px}.ph-tot tr.c td{color:#555}',
		'.ph-cond{margin-top:14px;display:grid;grid-template-columns:1.4fr 1fr;gap:14px;page-break-inside:avoid}',
		'.ph-cond h3{margin:0 0 4px!important;font-size:10px!important;font-weight:800!important;letter-spacing:.08em;text-transform:uppercase;color:#d23f86!important}.ph-cond ul{margin:0;padding-left:14px;color:#333;line-height:1.55}',
		'.ph-box{border:1px solid #ddd;border-radius:8px;padding:9px 10px;line-height:1.55;color:#333}.ph-box b{color:#111}',
		'.ph-pie{margin-top:auto;padding-top:10px;border-top:1px solid #ddd;display:flex;justify-content:space-between;color:#777;font-size:9.5px}',
		'html body .cgx-presu,html body .cgx-presu *{color:#111!important;background-color:transparent;text-shadow:none!important}',
		'html body .cgx-presu{background:#fff!important}',
		'html body .cgx-presu .ph-cg{background:#111!important;color:#fff!important}',
		'html body .cgx-presu .ph-it th{background:#111!important;color:#fff!important}',
		'html body .cgx-presu .ph-doc h1,html body .cgx-presu .ph-it tr.ph-g td,html body .cgx-presu .ph-cond h3{color:#d23f86!important}',
		'html body .cgx-presu .ph-it tr.ph-g td{background:#f6f6f7!important}',
		'html body .cgx-presu .ph-emp div,html body .cgx-presu .ph-cond ul,html body .cgx-presu .ph-cond li,html body .cgx-presu .ph-box,html body .cgx-presu .ph-doc td{color:#333!important}',
		'html body .cgx-presu .ph-doc td:first-child,html body .cgx-presu .ph-cli div,html body .cgx-presu .ph-pie,html body .cgx-presu .ph-pie span,html body .cgx-presu .ph-tot tr.c td{color:#666!important}',
		'html body .cgx-presu .ph-it td.k{color:#555!important}html body .cgx-presu .ph-it td.sku{color:#777!important}',
		'html body .cgx-presu .ph-box b,html body .cgx-presu .ph-emp b,html body .cgx-presu .ph-doc b{color:#111!important}}'
	].join('\n');

	/* Páginas viejas del armador: "Cambiar" en la compra trae al armador nuevo, en ese paso */
	var VIEJAS = { armarpcmicro: 'micro', armarpccooler: 'cooler', armarpcmother: 'mother', armarpcmemoria: 'ram', armarpcvideo: 'video', armarpchdd1: 'disco1', armarpchdd2: 'disco2',
		armarpcgabinete: 'gabinete', armarpcfuente: 'fuente', armarpcmonitor: 'monitor', armarpcteclado: 'perif1', armarpcmouse: 'perif1', armarpcwifi: 'wifi' };
	/* En la página de compra, "Quitar" deja el componente en 0: el armador nuevo se entera */
	/* Página de compra: la PC guardada manda.
	   - Misma sesión (vino del armador o con "atrás"): si la dirección no coincide con lo guardado, se corrige sola.
	   - Sesión nueva (link compartido u otra pestaña): se adopta la PC de la dirección. */
	function valoresDeDireccion(par) {
		var v = {};
		par.split(';').forEach(function (x) { var i = x.indexOf('='); if (i > 0) v[x.slice(0, i).toUpperCase()] = x.slice(i + 1); });
		return v;
	}
	function coincide(v, esperado) {
		return ORDEN_URL.every(function (c) { return c === 'MM' || String(v[c] == null ? '0' : v[c]) === String(esperado[c]); });
	}
	function sincronizarCompra(par) {
		var v = valoresDeDireccion(par), local = leerPropio(), sesion = false;
		try { sesion = !!sessionStorage.getItem('cg-sesion'); sessionStorage.setItem('cg-sesion', '1'); } catch (e) {}
		if (local && coincide(v, valoresCompraDe(local))) sesion = true;
		if (sesion && local) {
			if (!coincide(v, valoresCompraDe(local))) { location.replace(urlCompraDe(local)); return false; }
			local.enviado = true; local.t = Date.now();
			try { localStorage.setItem(CLAVE, JSON.stringify(local)); } catch (e) {}
			return true;
		}
		var st = { t: Date.now(), actual: 'so', skip: {}, sel: {}, enviado: true };
		ORDEN.forEach(function (k) {
			var p = PASOS[k], id = +v[p.url];
			if (id > 0) st.sel[k] = { i: id, q: p.qurl ? (+v[p.qurl] || 1) : 1, b: k === 'micro' ? +v.MM : undefined };
			else st.skip[k] = true;
		});
		if (local && !coincide(v, valoresCompraDe(local))) { try { localStorage.setItem(CLAVE + '-previo', JSON.stringify(local)); } catch (e) {} }
		try { localStorage.setItem(CLAVE, JSON.stringify(st)); } catch (e) {}
		return true;
	}
	var ruta = location.pathname.match(/\/(armarpc[a-z0-9]*)\/([^\/]*PASO=[^\/?#]*)/i);
	if (/\/armarpc\/armar-pc\//i.test(location.pathname)) {
		if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
	} else if (ruta && ruta[1].toLowerCase() === 'armarpccompra') {
		var seguir = sincronizarCompra(ruta[2]);
		var parC = ruta[2];
		window.addEventListener('pageshow', function (ev) {
			if (!ev.persisted) return;
			var l = leerPropio();
			if (l && !coincide(valoresDeDireccion(parC), valoresCompraDe(l))) location.replace(urlCompraDe(l));
		});
		if (seguir !== false) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { iniciarCompra(parC); }); else iniciarCompra(parC); }
	} else if (ruta) {
		var pg = ruta[1].toLowerCase();
		var paso = VIEJAS[pg] || (/armado/.test(pg) ? 'armado' : (/sistemaoperativo/.test(pg) ? 'so' : 'micro'));
		location.replace(location.origin + PORTADA + '?paso=' + paso);
	}
})();
