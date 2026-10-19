/* [CG-FILTROS-FICHA · en PRUEBA, versión actual v0.4 (2026-10-19); el archivo lleva nombre fijo mientras se prueba y se versiona al aprobarlo] PRUEBA con llave: filtros del listado armados con la ficha y el nombre
   Solo actúa si la persona entró con ?cgfiltros=1 (queda guardado en ese navegador; ?cgfiltros=0 lo apaga) y solo en /ARTICULOS/ con una categoría. Para los demás visitantes no cambia nada.
   Qué hace: pide a web.CG.ListadoGetItems (v1.1) toda la categoría con el data-d de cada ficha, arma los filtros y cuenta las opciones según lo que ya está elegido.
   Regla de datos: la FICHA manda; el NOMBRE completa donde no hay ficha. Dibuja las tarjetas iguales a CAJA_PRODUCTO1 y esconde la columna de filtros, la lista y la paginación de GBP mientras la prueba está encendida.
   Los estilos de esta prueba van acá solo mientras se prueba: si se aprueba, pasan a cg-diseno.
   v0.2: sin filtro de largo; "Solo con stock en el local" propio. v0.3: sin barras deslizantes.
   v0.6 (19 oct.): encabezado con miga, título de la categoría y cantidad (sin el hueco de arriba) y (las tarjetas NO se tocan).
   v0.7 (19 oct.): filtros como en Maximus: secciones que se despliegan con lista de casillas (sin pastillas), orden como sección; con el estilo de vidrio.
   v0.5 (19 oct.): SIN ESTILOS (van en cg-diseno, sección 36, v86) y sin la franja de prueba; salir de la prueba: ?cgfiltros=0.
   v0.4 (19 oct.): DISEÑO NUEVO del panel (orden siempre a la vista: menor precio, mayor precio, descuento; secciones plegables; fichas con la cantidad; tramos de precio y mínimo/máximo; botón "Ver N productos" en el celular),
   y filtros de TODAS las categorías (procesadores, motherboards, placas de video, memorias, almacenamiento, monitores, notebooks, gabinetes, fuentes, periféricos, coolers, impresoras); las demás categorías muestran stock, marca y precio.
   Sin "Mostrar N por página" ni "Compatible con mi armado" (decisión del usuario). Agregar una categoría: sumar su entrada en CATS. */
(function () {
	'use strict';
	var CFG = { script: window.CG_FILTROS_SCRIPT || 'web.CG.ListadoGetItems_v1.1.sql', maximo: 1500, pagina: 40 };
	function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
	function num(v) { var n = parseFloat(v); return isFinite(n) ? n : null; }
	function hid(id) { var e = document.getElementById(id); return e ? e.value : ''; }

		/* ---------- Qué filtros tiene cada categoría: la ficha manda; el nombre completa donde no hay ficha ---------- */
	function fk(it, k) { var v = it.f ? it.f[k] : null; return (v == null || v === '') ? null : v; }
	function N(it) { return it.nombre.toUpperCase(); }
	function re(it, rx) { var m = rx.exec(it.nombre); return m; }
	function sino(v, si, no) { if (v == null) return null; var s = String(v).toLowerCase(); return (v === 1 || v === true || s === '1' || s === 'si' || s === 'sí' || s === 'true') ? si : ((v === 0 || v === false || s === '0' || s === 'no' || s === 'false') ? no : null); }
	function gb(s) { var m = /(\d+(?:[.,]\d+)?)\s?(TB|GB)/i.exec(s); if (!m) return null; var n = parseFloat(m[1].replace(',', '.')); return /TB/i.test(m[2]) ? n * 1024 : n; }
	function fmtGB(v) { v = +v; return v >= 1024 ? (v / 1024) + ' TB' : v + ' GB'; }
	function socket(it) { var s = fk(it, 'socket'); if (s) return String(s).toUpperCase().replace(/\s/g, ''); var m = /\b(AM[45]|LGA ?1[0-9]{3})\b/i.exec(it.nombre); return m ? m[1].toUpperCase().replace(/\s/g, '') : null; }
	function ddr(it) { var s = fk(it, 'ram_tipo') || fk(it, 'tipo'); if (s) return String(s).toUpperCase(); var m = /\b(DDR[345])\b/i.exec(it.nombre); return m ? m[1].toUpperCase() : null; }
	function rgbN(it) { return /\b(A?RGB|LED)\b/i.test(it.nombre) ? 'Con RGB' : null; }
	function colorN(it) { var u = N(it); if (/\b(WHITE|BLANC[OA]S?)\b/.test(u)) return 'Blanco'; if (/\b(BLACK|NEGR[OA]S?)\b/.test(u)) return 'Negro'; if (/\b(PINK|ROSA)\b/.test(u)) return 'Rosa'; if (/\b(GRIS|GRAY|GREY)\b/.test(u)) return 'Gris'; return null; }
	function fabricante(it) {
		var f = it.f && it.f.fabricante_chip; if (f) return String(f);
		var u = N(it);
		if (/\bNVIDIA\b|GEFORCE/.test(u)) return 'NVIDIA';
		if (/\bAMD\b|RADEON/.test(u)) return 'AMD';
		if (/\bINTEL\b|\bARC\b/.test(u)) return 'Intel';
		return null;
	}
	function vram(it) { var v = it.f && num(it.f.vram_gb); if (v) return v; var m = /\b(\d{1,2})\s?GB\b/i.exec(it.nombre); return m ? +m[1] : null; }
	function tipoMem(it) { if (it.f && it.f.vram_tipo) return String(it.f.vram_tipo); var m = /\b(GDDR\d+X?|HBM\d?)\b/i.exec(it.nombre); return m ? m[1].toUpperCase() : null; }
	function lineaCPU(it) { var m = /(RYZEN THREADRIPPER|RYZEN [3579]|ATHLON|CORE ULTRA [3579]|CORE I[3579]|CORE [3579]|PENTIUM|CELERON|XEON)/i.exec(it.nombre); if (!m) return null; return m[1].toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }).replace('Core I', 'Core i'); }
	function cap(it) { var m = /(\d+)\s?X\s?(\d+)\s?GB/i.exec(it.nombre); if (m) return (+m[1]) * (+m[2]); m = /\b(\d{1,3})\s?GB\b/i.exec(it.nombre); return m ? +m[1] : null; }
	function pulgadas(it) { var m = /(\d{2}(?:[.,]\d)?)\s?(?:"|”|''|PULG)/i.exec(it.nombre); return m ? Math.round(parseFloat(m[1].replace(',', '.'))) : null; }
	function hz(it) { var m = /(\d{2,3})\s?HZ/i.exec(it.nombre); return m ? +m[1] : null; }
	function watts(it) { var m = /\b(\d{3,4})\s?W\b/i.exec(it.nombre); return m ? +m[1] : null; }
	function tipoPeri(it) {
		var u = N(it).replace(/^\s+/, '');
		var t = [['COMBO', 'Combos'], ['TECLADO', 'Teclados'], ['MOUSEPAD', 'Mousepads'], ['MOUSE', 'Mouse'], ['AURICULAR', 'Auriculares'], ['HEADSET', 'Auriculares'], ['WEBCAM', 'Webcams'], ['WEB CAM', 'Webcams'], ['MICR', 'Micrófonos'], ['PARLANTE', 'Parlantes'], ['JOYSTICK', 'Joysticks'], ['GAMEPAD', 'Joysticks'], ['VOLANTE', 'Volantes']];
		for (var i = 0; i < t.length; i++) { if (u.indexOf(t[i][0]) === 0 || u.indexOf(' ' + t[i][0]) > -1) return t[i][1]; }
		return 'Otros';
	}
	function F(id, t, tipo, get, o) { var f = { id: id, t: t, tipo: tipo, get: get }; if (o) { for (var k in o) f[k] = o[k]; } return f; }
	var BASE = [
		F('local', '', 'check', function (it) { return it.r.local ? '1' : null; }, { sinTitulo: true, fmt: function () { return 'Solo con stock en el local'; } }),
		F('marca', 'Marca', 'marca', function (it) { return it.marca || null; })
	];
	var CATS = {
		52: { titulo: 'Procesadores', filtros: [
			F('linea', 'Línea', 'chips', lineaCPU, { abierto: true }),
			F('socket', 'Socket', 'chips', socket, { abierto: true }),
			F('nuc', 'Núcleos', 'chips', function (it) { return num(fk(it, 'nucleos')); }, { numerico: true, fmt: function (v) { return v + ' núcleos'; } }),
			F('hilos', 'Hilos', 'chips', function (it) { return num(fk(it, 'hilos')); }, { numerico: true, mas: true, fmt: function (v) { return v + ' hilos'; } }),
			F('igpu', 'Gráficos integrados', 'chips', function (it) { var s = sino(fk(it, 'igpu'), 'Con gráficos', 'Sin gráficos'); if (s) return s; return /\b\d{4,5}[A-Z]*F[A-Z]*\b/.test(N(it)) ? 'Sin gráficos' : (/\b\d{4}G[E]?\b/.test(N(it)) ? 'Con gráficos' : null); }),
			F('cool', 'Cooler', 'chips', function (it) { var s = sino(fk(it, 'cooler'), 'Trae cooler', 'Sin cooler'); if (s) return s; return /SIN COOLER|TRAY/i.test(it.nombre) ? 'Sin cooler' : null; }, { mas: true })
		] },
		47: { titulo: 'Motherboards', filtros: [
			F('socket', 'Socket', 'chips', socket, { abierto: true }),
			F('formato', 'Formato', 'chips', function (it) { var v = fk(it, 'formato'); return v ? String(v) : (/MICRO-?ATX|\bM-?ATX\b|\bMATX\b/i.test(it.nombre) ? 'Micro-ATX' : (/MINI-?ITX|\bITX\b/i.test(it.nombre) ? 'Mini-ITX' : (/\bATX\b/i.test(it.nombre) ? 'ATX' : null))); }, { abierto: true }),
			F('ddr', 'Memoria', 'chips', ddr, { abierto: true }),
			F('chipset', 'Chipset', 'chips', function (it) { var v = fk(it, 'chipset'); return v ? String(v) : null; }, { mas: true }),
			F('wifi', 'WiFi', 'chips', function (it) { var s = sino(fk(it, 'wifi'), 'Con WiFi', 'Sin WiFi'); if (s) return s; return /WI-?FI/i.test(it.nombre) ? 'Con WiFi' : null; }, { mas: true }),
			F('m2', 'Ranuras M.2', 'chips', function (it) { return num(fk(it, 'm2_n')); }, { numerico: true, mas: true, fmt: function (v) { return v + ' M.2'; } }),
			F('slots', 'Ranuras de memoria', 'chips', function (it) { return num(fk(it, 'ram_ranuras')); }, { numerico: true, mas: true, fmt: function (v) { return v + ' ranuras'; } })
		] },
		48: { titulo: 'Placas de video', filtros: [
			F('fab', 'Fabricante del chip', 'chips', fabricante, { abierto: true }),
			F('vram', 'Memoria de video', 'chips', vram, { numerico: true, fmt: function (v) { return v + ' GB'; } }),
			F('fuente', 'Fuente recomendada', 'chips', function (it) { return it.f ? num(it.f.fuente_w) : null; }, { numerico: true, fmt: function (v) { return v + ' W'; } }),
			F('tipo', 'Tipo de memoria', 'chips', tipoMem, { mas: true }),
			F('conector', 'Conector de energía', 'chips', function (it) { return fk(it, 'conector') ? String(fk(it, 'conector')) : null; }, { mas: true }),
			F('chip', 'Modelo', 'check', function (it) { return fk(it, 'chip') ? String(fk(it, 'chip')) : null; }, { mas: true }),
			F('grosor', 'Grosor', 'chips', function (it) { var v = num(fk(it, 'slots')); return v ? Math.round(v * 10) / 10 : null; }, { numerico: true, mas: true, fmt: function (v) { return String(v).replace('.', ',') + ' ranuras'; } }),
			F('vent', 'Ventiladores', 'chips', function (it) { return num(fk(it, 'ventiladores')); }, { numerico: true, mas: true, fmt: function (v) { return v + (+v === 1 ? ' ventilador' : ' ventiladores'); } })
		] },
		50: { titulo: 'Memorias', filtros: [
			F('ddr', 'Generación', 'chips', ddr, { abierto: true }),
			F('cap', 'Capacidad', 'chips', cap, { numerico: true, fmt: fmtGB }),
			F('freq', 'Frecuencia', 'chips', function (it) { var m = /(\d{4,5})\s?(?:MHZ|MT\/S)/i.exec(it.nombre); return m ? +m[1] : null; }, { numerico: true, fmt: function (v) { return v + ' MHz'; } }),
			F('kit', 'Kit o individual', 'chips', function (it) { return /\b[2-4]\s?X\s?\d+\s?GB\b|\bKIT\b/i.test(it.nombre) ? 'Kit' : 'Individual'; }, { mas: true }),
			F('rgb', 'RGB', 'chips', rgbN, { mas: true })
		] },
		53: { titulo: 'Almacenamiento', filtros: [
			F('tipo', 'Tipo', 'chips', function (it) { var u = N(it); if (/SSD/.test(u)) return /M\.?2|NVME/.test(u) ? 'SSD M.2' : 'SSD SATA'; if (/\bHDD\b|DISCO R[IÍ]GIDO|DISCO RIGIDO|\bHD\b/.test(u)) return 'Disco rígido'; if (/PEN ?DRIVE|MICRO ?SD|\bSD\b|USB/.test(u)) return 'Pendrive y tarjetas'; return null; }, { abierto: true }),
			F('cap', 'Capacidad', 'chips', function (it) { return gb(it.nombre); }, { numerico: true, fmt: fmtGB }),
			F('inter', 'Interfaz', 'chips', function (it) { var u = N(it); if (/NVME/.test(u)) return 'NVMe'; if (/PCIE ?5/.test(u)) return 'PCIe 5.0'; if (/PCIE ?4|GEN ?4/.test(u)) return 'PCIe 4.0'; if (/SATA/.test(u)) return 'SATA'; return null; }, { mas: true }),
			F('form', 'Formato', 'chips', function (it) { var u = N(it); if (/M\.?2/.test(u)) return 'M.2'; if (/2\.5/.test(u)) return '2,5"'; if (/3\.5/.test(u)) return '3,5"'; return null; }, { mas: true })
		] },
		59: { titulo: 'Monitores', filtros: [
			F('pulg', 'Tamaño', 'chips', pulgadas, { numerico: true, fmt: function (v) { return v + '"'; } }),
			F('res', 'Resolución', 'chips', function (it) { var u = N(it); if (/UWQHD|DQHD|WQHD|3440/.test(u)) return 'Ultrawide'; if (/\b4K\b|\bUHD\b/.test(u)) return '4K'; if (/\bQHD\b|\b2K\b|1440P/.test(u)) return '2K (QHD)'; if (/\bFHD\b|FULL ?HD|1080P/.test(u)) return 'Full HD'; if (/\bHD\b/.test(u)) return 'HD'; return null; }, { abierto: true }),
			F('hz', 'Frecuencia', 'chips', hz, { numerico: true, fmt: function (v) { return v + ' Hz'; } }),
			F('panel', 'Tipo de panel', 'chips', function (it) { var m = /\b(IPS|VA|TN|QD-OLED|OLED|MINI ?LED)\b/i.exec(it.nombre); return m ? m[1].toUpperCase().replace('MINI LED', 'Mini LED').replace('MINILED', 'Mini LED') : null; }, { mas: true }),
			F('curvo', 'Pantalla', 'chips', function (it) { return /CURV/i.test(it.nombre) ? 'Curva' : 'Plana'; }, { mas: true })
		] },
		56: { titulo: 'Notebooks', filtros: [
			F('cpu', 'Procesador', 'chips', function (it) { var m = /(CORE ULTRA [3579]|CORE I[3579]|CORE [3579]|RYZEN [3579]|CELERON|PENTIUM|ATHLON|SNAPDRAGON|APPLE M\d)/i.exec(it.nombre); return m ? m[1].toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }).replace('Core I', 'Core i') : null; }, { abierto: true }),
			F('ram', 'Memoria RAM', 'chips', function (it) { var r = /\b(\d{1,2})\s?GB\b/gi, m; while ((m = r.exec(it.nombre))) { if (+m[1] <= 64) return +m[1]; } return null; }, { numerico: true, fmt: function (v) { return v + ' GB'; } }),
			F('alm', 'Almacenamiento', 'chips', function (it) { var r = /(\d+(?:[.,]\d+)?)\s?(TB|GB)\b/gi, m, v; while ((m = r.exec(it.nombre))) { v = parseFloat(m[1].replace(',', '.')) * (/TB/i.test(m[2]) ? 1024 : 1); if (v >= 120) return v; } return null; }, { numerico: true, fmt: fmtGB }),
			F('pant', 'Pantalla', 'chips', function (it) { var m = /(\d{2}(?:[.,]\d)?)\s?(?:"|”|''|PULG)/i.exec(it.nombre); return m ? parseFloat(m[1].replace(',', '.')) : null; }, { numerico: true, fmt: function (v) { return String(v).replace('.', ',') + '"'; } }),
			F('so', 'Sistema', 'chips', function (it) { return /WIN(DOWS)? ?11/i.test(it.nombre) ? 'Windows 11' : (/FREEDOS|DOS/i.test(it.nombre) ? 'Sin sistema' : null); }, { mas: true })
		] },
		1: { titulo: 'Gabinetes', filtros: [
			F('form', 'Formato', 'chips', function (it) { var u = N(it); if (/FULL TOWER/.test(u)) return 'Full Tower'; if (/MINI TOWER|MICRO|\bSFF\b|ITX/.test(u)) return 'Mini'; if (/MID TOWER|\bMT\b/.test(u)) return 'Mid Tower'; return null; }, { abierto: true }),
			F('color', 'Color', 'chips', colorN, { abierto: true }),
			F('vidrio', 'Panel lateral', 'chips', function (it) { return /VIDRIO|TEMPLAD|TEMPERED|GLASS/i.test(it.nombre) ? 'Vidrio templado' : null; }, { mas: true }),
			F('rgb', 'Iluminación', 'chips', rgbN, { mas: true }),
			F('fuente', 'Incluye fuente', 'chips', function (it) { return /\b\d{3,4}\s?W\b/i.test(it.nombre) ? 'Con fuente' : null; }, { mas: true })
		] },
		7: { titulo: 'Fuentes', filtros: [
			F('pot', 'Potencia', 'chips', watts, { numerico: true, fmt: function (v) { return v + ' W'; } }),
			F('cert', '80 Plus', 'chips', function (it) { var m = /80\s?\+?\s?PLUS\s+(BRONZE|SILVER|GOLD|PLATINUM|TITANIUM|WHITE)/i.exec(it.nombre); return m ? m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase() : null; }, { abierto: true }),
			F('mod', 'Modular', 'chips', function (it) { if (/FULL MODULAR/i.test(it.nombre)) return 'Full modular'; if (/SEMI MODULAR/i.test(it.nombre)) return 'Semi modular'; return /\bMODULAR\b/i.test(it.nombre) ? 'Modular' : null; }, { mas: true }),
			F('tam', 'Tamaño', 'chips', function (it) { var m = /\b(SFX-L|SFX|TFX)\b/i.exec(it.nombre); return m ? m[1].toUpperCase() : 'ATX'; }, { mas: true }),
			F('norma', 'Norma', 'chips', function (it) { var m = /ATX\s?(3\.[01])/i.exec(it.nombre); return m ? 'ATX ' + m[1] : null; }, { mas: true })
		] },
		10: { titulo: 'Periféricos', filtros: [
			F('tipo', 'Tipo', 'chips', tipoPeri, { abierto: true }),
			F('conec', 'Conectividad', 'chips', function (it) { return /INAL[AÁ]MBRIC|WIRELESS|BLUETOOTH|2\.4\s?G/i.test(it.nombre) ? 'Inalámbrico' : 'Con cable'; }, { abierto: true }),
			F('switch', 'Switch', 'chips', function (it) { var m = /SWITCH (RED|BLUE|BROWN|BLACK|YELLOW|SILVER|MAGNETIC)/i.exec(it.nombre); return m ? m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase() : null; }),
			F('color', 'Color', 'chips', colorN, { mas: true }),
			F('rgb', 'RGB', 'chips', rgbN, { mas: true }),
			F('idioma', 'Idioma', 'chips', function (it) { var m = /(ESPA[ÑN]OL|INGL[EÉ]S)/i.exec(it.nombre); return m ? (/ESP/i.test(m[1]) ? 'Español' : 'Inglés') : null; }, { mas: true })
		] },
		75: { titulo: 'Coolers', filtros: [
			F('tipo', 'Tipo', 'chips', function (it) { var u = N(it); if (/^\s*VENTILADOR/.test(u)) return 'Ventilador'; if (/L[IÍ]QUIDO/.test(u)) return 'Líquido'; if (/\bAIRE\b/.test(u)) return 'Aire'; return null; }, { abierto: true }),
			F('tam', 'Radiador', 'chips', function (it) { if (!/L[IÍ]QUIDO/i.test(it.nombre)) return null; var m = /(\d{3})\s?MM/i.exec(it.nombre); return m ? +m[1] : null; }, { numerico: true, fmt: function (v) { return v + ' mm'; } }),
			F('rgb', 'RGB', 'chips', rgbN, { mas: true }),
			F('color', 'Color', 'chips', colorN, { mas: true })
		] },
		57: { titulo: 'Impresoras', filtros: [
			F('tec', 'Tecnología', 'chips', function (it) { var u = N(it); if (/L[AÁ]SER/.test(u)) return 'Láser'; if (/TINTA CONTINUA|TANK/.test(u)) return 'Tinta continua'; if (/TINTA/.test(u)) return 'Tinta'; return null; }, { abierto: true }),
			F('tipo', 'Tipo', 'chips', function (it) { return /MULTIFUNCI/i.test(it.nombre) ? 'Multifunción' : (/MONOFUNCI/i.test(it.nombre) ? 'Monofunción' : null); }, { abierto: true }),
			F('color', 'Impresión', 'chips', function (it) { return /MONOCROM/i.test(it.nombre) ? 'Monocromática' : (/\bCOLOR\b/i.test(it.nombre) ? 'Color' : null); }, { mas: true }),
			F('wifi', 'WiFi', 'chips', function (it) { return /WI-?FI/i.test(it.nombre) ? 'Con WiFi' : null; }, { mas: true })
		] }
	};

	/* ---------- Motor de filtros (sin pantalla; se prueba aparte) ---------- */
	function dinero(s) { if (s == null || s === '') return null; var n = parseFloat(String(s).replace(/\./g, '').replace(',', '.')); return isFinite(n) ? n : null; }
	function preparar(r) {
		var f = (r.ficha && typeof r.ficha === 'object') ? r.ficha : null, p = num(r.precio) || 0, t = dinero(r.tachado_fmt);
		return { id: r.item_id, r: r, f: f, nombre: String(r.nombre || ''), marca: r.marca || null, precio: p, dto: (t && p && t > p) ? (t - p) / t : 0 };
	}
	function pasa(it, f, est) {
		var s = est[f.id]; if (s == null) return true;
		var hay = false, k; for (k in s) { if (s[k]) { hay = true; break; } }
		if (!hay) return true;
		var v = f.get(it);
		return v != null && !!s[String(v)];
	}
	function pasaPrecio(it, est) { return !((est.__min != null && it.precio < est.__min) || (est.__max != null && it.precio > est.__max)); }
	function filtrar(items, filtros, est, salvo) {
		return items.filter(function (it) {
			if (salvo !== '__precio' && !pasaPrecio(it, est)) return false;
			for (var i = 0; i < filtros.length; i++) { if (filtros[i].id !== salvo && !pasa(it, filtros[i], est)) return false; }
			return true;
		});
	}
	function opciones(items, filtros, est, f) {
		var base = filtrar(items, filtros, est, f.id), cuenta = {}, i, v;
		for (i = 0; i < base.length; i++) { v = f.get(base[i]); if (v == null) continue; v = String(v); cuenta[v] = (cuenta[v] || 0) + 1; }
		var todas = {}; for (i = 0; i < items.length; i++) { v = f.get(items[i]); if (v != null) todas[String(v)] = 1; }
		var lista = Object.keys(todas).map(function (k) { return { valor: k, n: cuenta[k] || 0 }; });
		if (f.numerico) lista.sort(function (a, b) { return a.valor - b.valor; });
		else lista.sort(function (a, b) { return (b.n - a.n) || (a.valor < b.valor ? -1 : 1); });
		return lista;
	}
	function redondear(v) { var b = v >= 1000000 ? 100000 : (v >= 100000 ? 50000 : 10000); return Math.round(v / b) * b; }
	function mil(v) { return v >= 1000000 ? '$' + String(Math.round(v / 100000) / 10).replace('.', ',') + ' M' : '$' + Math.round(v / 1000) + ' mil'; }
	function tramos(items) {
		var p = items.map(function (i) { return i.precio; }).filter(function (x) { return x > 0; }).sort(function (a, b) { return a - b; });
		if (p.length < 6) return [];
		var a = redondear(p[Math.floor(p.length / 3)]), b = redondear(p[Math.floor(p.length * 2 / 3)]);
		if (!(a > 0 && b > a)) return [];
		return [{ min: null, max: a, t: 'Hasta ' + mil(a) }, { min: a, max: b, t: mil(a) + ' a ' + mil(b) }, { min: b, max: null, t: 'Más de ' + mil(b) }];
	}
	window.cgFiltrosFichaMotor = { preparar: preparar, pasa: pasa, filtrar: filtrar, opciones: opciones, tramos: tramos, CATS: CATS, BASE: BASE };

	/* ---------- Llave y condiciones ---------- */
	try {
		var q = /[?&;\/]cgfiltros=(\d)/.exec(location.href);
		if (q) { if (q[1] === '1') localStorage.setItem('cg-filtros', '1'); else localStorage.removeItem('cg-filtros'); }
	} catch (e) {}
	var llave = false; try { llave = localStorage.getItem('cg-filtros') === '1'; } catch (e) {}
	var mc = /CAT_ID=(\d+)/.exec(location.href), CAT = mc ? +mc[1] : null;
	if (!llave || !CAT || CAT < 0 || !/\/ARTICULOS\//i.test(location.pathname)) return;
	var ms = /SCAT_ID=(-?\d+)/.exec(location.href), SCAT = ms ? +ms[1] : -1;
	var DEF0 = { titulo: (CATS[CAT] || {}).titulo || '', filtros: BASE.concat((CATS[CAT] || { filtros: [] }).filtros) };
	var DEF = DEF0; (function () { var k = 0; DEF.filtros.forEach(function (f) { if (f.id !== 'local' && f.id !== 'marca' && !f.mas && k < 2) { f.abierto = true; k++; } }); })();

	/* Los estilos de los filtros viven en cg-diseno (sección 36, v86): este archivo no lleva CSS. */

	/* ---------- Datos ---------- */
	var TIT = '', FILA = null, ITEMS = [], EST = {}, ORDEN = 1, ABIERTO = {}, VERMARCAS = false, MOVIL = false, REQ = 0, ROOT = null;
	function pedirPagina(desde) {
		return new Promise(function (ok, mal) {
			if (!window.PageMethods || !PageMethods.wsNRW_Script) { mal(new Error('sin PageMethods')); return; }
			var p = { cat_id: CAT, scat_id: SCAT, sca_id: -1, bus: '', orden: 1, prli_id: +hid('hidPriceListId'), comp_id: +hid('hidCompId') || 1, ws_id: hid('hidWSId') || hid('hidWebSiteID'), req: ++REQ, ficha: 1, desde: desde, limite: CFG.pagina };
			PageMethods.wsNRW_Script(p.ws_id, CFG.script, JSON.stringify(p), function (r) {
				try { var d = JSON.parse(r); ok(d.data || []); } catch (e) { mal(e); }
			}, function (e) { mal(e); });
		});
	}
	/* La respuesta del servidor tiene un tope de tamaño: la lista se pide por páginas y se junta acá. */
	function pedir() {
		function sigue(desde, juntos) {
			return pedirPagina(desde).then(function (d) {
				juntos = juntos.concat(d);
				if (d.length < CFG.pagina || juntos.length >= CFG.maximo) return juntos;
				return sigue(desde + CFG.pagina, juntos);
			});
		}
		return sigue(0, []);
	}

	/* ---------- Pantalla ---------- */
	function sinDecimales(s) { return String(s || '').replace(/,\d+$/, ''); }
	function tarjeta(it) {
		var r = it.r, base = location.origin + '/Temp/App_WebSite/App_PictureFiles/Items/', cod = encodeURIComponent(r.codseo || r.code || ''), precio = '$ ' + sinDecimales(r.precio_fmt);
		var seo = String(r.seo || r.nombre || '').trim().replace(/\s+/g, '-');
		var url = location.origin + '/DETALLE/' + encodeURIComponent(seo) + '/ITEM_ID=' + r.item_id + '/compugarden.aspx';
		var tach = r.tachado_fmt ? '<div class="precio-tachado">$ ' + esc(sinDecimales(r.tachado_fmt)) + '</div>' : '<div class="precio-tachado" style="display:none"></div>';
		return '<div class="col-md-prod cgf-tarjeta"><div class="product" data-oferta="' + (r.oferta ? 'true' : 'false') + '"><div class="image"><a href="' + esc(url) + '" target="_self">' +
			'<img src="' + base + cod + '_400.jpg" srcset="' + base + cod + '_250.jpg 250w, ' + base + cod + '_400.jpg 400w, ' + base + cod + '_600.jpg 600w" sizes="(max-width: 767px) 34vw, 170px" loading="lazy" decoding="async" alt="' + esc(r.nombre) + '" title="' + esc(r.nombre) + '" class="img-responsive" onerror="if(!this.getAttribute(\'data-r\')){this.setAttribute(\'data-r\',\'1\');this.removeAttribute(\'srcset\');this.src=\'' + base + cod + '_600.jpg\';}"></a></div>' +
			'<div class="contentDescription"><div class="description"><h4><a id="COD' + r.item_id + '" href="' + esc(url) + '" class="titprod" target="_self">' + esc(r.nombre) + '</a></h4><small><span class="size art_cod_precios">Cod: ' + esc(r.code) + '</span></small></div>' +
			'<div class="precio-tachado-content">' + tach + '</div><div class="price">' + esc(precio) + '</div>' +
			'<input type="number" class="compracantidad" style="max-width:50px; text-align:center" id="cant' + r.item_id + '" min="1" value="1">' +
			'<input type="button" value="Agregar" class="btn btn-primary btn-compra compracantidad semaforo' + esc(r.semaforo) + '" title="Sumar a su compra" data-cgf-id="' + r.item_id + '" data-cgf-img="' + base + cod + '_600.jpg" data-cgf-precio="' + esc(precio) + '"></div></div></div>';
	}
		var TR = [];
	function ordenar(lista) {
		var l = lista.slice();
		if (ORDEN === 2) l.sort(function (a, b) { return b.precio - a.precio; });
		else if (ORDEN === 3) l.sort(function (a, b) { return (b.dto - a.dto) || (a.precio - b.precio); });
		else if (ORDEN === 4) l.sort(function (a, b) { return a.nombre < b.nombre ? -1 : (a.nombre > b.nombre ? 1 : 0); });
		else l.sort(function (a, b) { return a.precio - b.precio; });
		return l;
	}
	function porId(id) { return DEF.filtros.filter(function (x) { return x.id === id; })[0] || { id: id }; }
	function abierto(f) { if (ABIERTO[f.id] != null) return ABIERTO[f.id]; return f.id === 'marca' || f.abierto === true; }
	function nSel(id) { var s = EST[id], n = 0, k; if (!s) return 0; for (k in s) { if (s[k]) n++; } return n; }
	function nombreOp(f, v) { return esc(f.fmt ? f.fmt(v) : v); }
	function cabecera(id, titulo, n, ab) { return '<div class="cgf-sh" data-abrir="' + id + '"><span>' + esc(titulo) + (n ? '<em>' + n + '</em>' : '') + '</span><i class="cgf-chev"></i></div>'; }
	function fila(attr, on, etiqueta, n, radio) {
		return '<div class="cgf-r' + (on ? ' cgf-on' : '') + '" ' + attr + '><span class="cgf-k' + (radio ? ' cgf-rd' : '') + '">' + (on ? '✓' : '') + '</span><span class="cgf-lbl">' + etiqueta + '</span>' + (n != null ? '<span class="cgf-n">' + n + '</span>' : '') + '</div>';
	}
	function seccion(f) {
		if (f.sinTitulo) { var on0 = EST[f.id] && EST[f.id]['1']; return '<div class="cgf-tg" data-tog="' + f.id + '"><span>' + esc(f.fmt()) + '</span><span class="cgf-sw' + (on0 ? ' cgf-on' : '') + '"></span></div>'; }
		var ops = opciones(ITEMS, DEF.filtros, EST, f); if (!ops.length) return '';
		if (ops.length === 1 && !EST[f.id] && ops[0].n >= ITEMS.length) return '';
		if (!EST[f.id] && f.id !== 'marca' && ITEMS.filter(function (it) { return f.get(it) != null; }).length < ITEMS.length * 0.08) return '';
		var ab = abierto(f), body = '';
		if (ab) {
			var mostrar = ops, resto = 0;
			if (f.tipo === 'marca' && !VERMARCAS && ops.length > 7) { mostrar = ops.filter(function (o, i) { return i < 6 || (EST[f.id] && EST[f.id][o.valor]); }); resto = ops.length - mostrar.length; }
			body = mostrar.map(function (o) { var on = EST[f.id] && EST[f.id][o.valor]; return fila('data-op="' + f.id + '" data-v="' + esc(o.valor) + '"', on, nombreOp(f, o.valor), o.n); }).join('') +
				(resto ? '<a class="cgf-mas" data-vermas="1">Ver ' + resto + ' marcas más</a>' : ((f.tipo === 'marca' && VERMARCAS && ops.length > 7) ? '<a class="cgf-mas" data-vermas="1">Ver menos</a>' : ''));
		}
		return '<div class="cgf-sec' + (ab ? ' cgf-abierto' : '') + '">' + cabecera(f.id, f.t, nSel(f.id)) + (ab ? '<div class="cgf-sb">' + body + '</div>' : '') + '</div>';
	}
	var ORD = [[1, 'Menor precio'], [2, 'Mayor precio'], [3, 'Mayor descuento'], [4, 'Nombre A-Z']];
	function seccionOrden() {
		var ab = abierto({ id: '__orden' }), cur = ORD.filter(function (o) { return o[0] === ORDEN; })[0][1];
		return '<div class="cgf-sec' + (ab ? ' cgf-abierto' : '') + '"><div class="cgf-sh" data-abrir="__orden"><span>Ordenar</span><span class="cgf-cur">' + esc(cur) + '</span><i class="cgf-chev"></i></div>' +
			(ab ? '<div class="cgf-sb">' + ORD.map(function (o) { return fila('data-orden="' + o[0] + '"', ORDEN === o[0], o[1], null, true); }).join('') + '</div>' : '') + '</div>';
	}
	function seccionPrecio() {
		var ab = abierto({ id: '__precio' }), act = (EST.__min != null || EST.__max != null) ? 1 : 0, body = '';
		if (ab) {
			body = TR.map(function (t, i) { var on = (EST.__min == null ? null : EST.__min) === t.min && (EST.__max == null ? null : EST.__max) === t.max; return fila('data-tramo="' + i + '"', on, esc(t.t), null, true); }).join('') +
				'<div class="cgf-pi"><input type="number" min="0" placeholder="$ Mínimo" data-pmin value="' + (EST.__min != null ? EST.__min : '') + '"><input type="number" min="0" placeholder="$ Máximo" data-pmax value="' + (EST.__max != null ? EST.__max : '') + '"></div>';
		}
		return '<div class="cgf-sec' + (ab ? ' cgf-abierto' : '') + '">' + cabecera('__precio', 'Precio', act, ab) + (ab ? '<div class="cgf-sb">' + body + '</div>' : '') + '</div>';
	}
	function activos() {
		var out = [];
		DEF.filtros.forEach(function (f) {
			var s = EST[f.id]; if (!s) return;
			Object.keys(s).forEach(function (v) { if (s[v]) out.push('<span data-quitar="' + f.id + '" data-v="' + esc(v) + '">' + (f.sinTitulo ? esc(f.fmt()) : nombreOp(f, v)) + ' ×</span>'); });
		});
		if (EST.__min != null || EST.__max != null) out.push('<span data-quitar="__precio">' + (EST.__min != null && EST.__max != null ? mil(EST.__min) + ' a ' + mil(EST.__max) : (EST.__min != null ? 'Desde ' + mil(EST.__min) : 'Hasta ' + mil(EST.__max))) + ' ×</span>');
		return out;
	}
	function dibujar() {
		var lista = ordenar(filtrar(ITEMS, DEF.filtros, EST)), act = activos();
		var prop = DEF.filtros.filter(function (f) { return f.id !== 'local' && f.id !== 'marca' && !f.mas; }), mas = DEF.filtros.filter(function (f) { return f.mas; });
		var panel = '<div class="cgf-ph"><b>Filtros' + (act.length ? '<span class="cgf-nc">' + act.length + '</span>' : '') + '</b>' + (act.length ? '<a class="cgf-lim" data-limpiar="1">Limpiar</a>' : '') + '</div>' + seccion(porId('local')) + seccionOrden() +
			(prop.length ? seccion(prop[0]) : '') + seccion(porId('marca')) + prop.slice(1).map(seccion).join('') + mas.map(seccion).join('') + seccionPrecio() +
			'<div class="cgf-ft"><button data-cerrar="1">Ver ' + lista.length + ' productos</button></div>';
		ROOT.innerHTML = '<div class="cgf-mv" data-movil="1">Filtros y orden' + (act.length ? ' (' + act.length + ')' : '') + '</div>' +
			'<div class="cgf-wrap' + (MOVIL ? ' cgf-movil' : '') + '"><div class="filtros_left cgf-mio cgf-panel">' + panel + '</div>' +
			'<div class="cgf-main"><div class="cgf-cab"><div class="cgf-mig"><a href="/">Productos</a><span>›</span><span>' + esc(TIT) + '</span></div><h1 class="cgf-tit">' + esc(TIT) + '<span><b>' + lista.length + '</b> de ' + ITEMS.length + ' productos</span></h1></div>' + (act.length ? '<div class="cgf-barra"><div class="cgf-act">' + act.join('') + '</div></div>' : '') +
			'<div class="cgf-grid">' + (lista.length ? lista.map(tarjeta).join('') : '<p>No hay productos con esa combinación.</p>') + '</div></div></div>';
		document.dispatchEvent(new CustomEvent('cg-listado-cargado'));
	}
	function alternar(id, v) {
		var s = EST[id] || {}; s[v] = !s[v]; var hay = false, k; for (k in s) { if (s[k]) { hay = true; break; } }
		if (hay) EST[id] = s; else delete EST[id];
	}
	function eventos() {
		ROOT.addEventListener('click', function (e) {
			var t = e.target, el;
			if ((el = t.closest('[data-salir]'))) { try { localStorage.removeItem('cg-filtros'); } catch (x) {} location.reload(); return; }
			if ((el = t.closest('[data-orden]'))) { ORDEN = +el.getAttribute('data-orden'); dibujar(); return; }
			if ((el = t.closest('[data-tog]'))) { alternar(el.getAttribute('data-tog'), '1'); dibujar(); return; }
			if ((el = t.closest('[data-abrir]'))) { var id = el.getAttribute('data-abrir'); ABIERTO[id] = !abierto(porId(id)); dibujar(); return; }
			if ((el = t.closest('[data-vermas]'))) { VERMARCAS = !VERMARCAS; dibujar(); return; }
			if ((el = t.closest('[data-limpiar]'))) { EST = {}; dibujar(); return; }
			if ((el = t.closest('[data-quitar]'))) { var q = el.getAttribute('data-quitar'), v = el.getAttribute('data-v'); if (q === '__precio') { delete EST.__min; delete EST.__max; } else if (v == null) delete EST[q]; else alternar(q, v); dibujar(); return; }
			if ((el = t.closest('[data-tramo]'))) {
				var tr = TR[+el.getAttribute('data-tramo')], on = (EST.__min == null ? null : EST.__min) === tr.min && (EST.__max == null ? null : EST.__max) === tr.max;
				delete EST.__min; delete EST.__max; if (!on) { if (tr.min != null) EST.__min = tr.min; if (tr.max != null) EST.__max = tr.max; }
				dibujar(); return;
			}
			if ((el = t.closest('[data-op]'))) { alternar(el.getAttribute('data-op'), el.getAttribute('data-v')); dibujar(); return; }
			if ((el = t.closest('[data-movil]'))) { MOVIL = !MOVIL; dibujar(); return; }
			if ((el = t.closest('[data-cerrar]'))) { MOVIL = false; dibujar(); return; }
			if ((el = t.closest('.btn-compra[data-cgf-id]'))) {
				e.preventDefault();
				if (typeof window.agregarACarritoCantidadListado === 'function') window.agregarACarritoCantidadListado(+el.getAttribute('data-cgf-id'), el.getAttribute('data-cgf-img'), el.getAttribute('data-cgf-precio'));
				return;
			}
		});
		ROOT.addEventListener('change', function (e) {
			var t = e.target;
			if (t.matches('input[data-pmin], input[data-pmax]')) {
				var a = num(ROOT.querySelector('input[data-pmin]').value), b = num(ROOT.querySelector('input[data-pmax]').value);
				if (a != null && a > 0) EST.__min = a; else delete EST.__min;
				if (b != null && b > 0) EST.__max = b; else delete EST.__max;
				dibujar();
			}
		});
	}
	function iniciar() {
		var ancla = document.querySelector('#articulos .filtros_left');
		if (!ancla) { setTimeout(iniciar, 200); return; }
		ROOT = document.createElement('div'); ROOT.id = 'cgf-root';
		var tt = document.querySelector('#barrahormiga .catdeschormiga'); TIT = (tt && tt.textContent.replace(/\s+/g, ' ').trim()) || DEF.titulo || 'Productos';
		var col = ancla.closest('.col-md-2'); FILA = col ? col.parentElement : ancla.parentNode;
		FILA.parentNode.insertBefore(ROOT, FILA); FILA.classList.add('cgf-oculta');
		document.body.classList.add('cgf-on');
		ROOT.innerHTML = '';
		pedir().then(function (data) {
			ITEMS = data.map(preparar); TR = tramos(ITEMS); eventos(); dibujar();
		}).catch(function (e) {
			document.body.classList.remove('cgf-on'); if (FILA) FILA.classList.remove('cgf-oculta'); ROOT.innerHTML = '';
			if (window.console) console.warn('[CG-FILTROS-FICHA] no se pudo traer la lista; se muestra el listado normal', e);
		});
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
/* [/CG-FILTROS-FICHA] */
