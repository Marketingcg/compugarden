/* [CG-FOTOS v1.2 · 2026-10-29] v1.2: la etiqueta pasa a ser el panel claro con el estilo de las fotos viejas (opción C aprobada): rótulo chico y valor en negrita, con ícono, a la izquierda de la foto; escala sola con el tamaño de la foto (listado y producto). [CG-FOTOS v1.1 · 2026-10-29] v1.1: el índice se lee directo de GitHub (se actualiza en 5 minutos; jsDelivr @main lo entregaba viejo); las fotos nuevas usan dirección fijada a su cambio; en la galería queda una sola foto grande (se veían dos encimadas). [CG-FOTOS v1.0 · 2026-10-29] Fotos de las PC desde GitHub + etiqueta de datos (procesador, memoria, disco y gráficos) sobre la foto, sacada del nombre. Fotos de producto desde GitHub (repositorio público de la web, Marketingcg/compugarden, carpeta pc-fotos/), cargadas desde la central de cargas.
   Por qué: las fotos de GBP tardan días en verse (su proceso de imágenes es lento y corre de noche). Decisión del usuario (29 oct. 2026): las fotos de las PC armadas viven solo en GitHub.
   Cómo: GBP arma el enlace de cada foto con el código del producto (…/App_PictureFiles/Items/<CÓDIGO>_<tamaño>.jpg). Este script lee ese código y, si el producto tiene fotos en GitHub
   (índice fotos.json: por código del producto y por su ID), cambia el enlace por el de GitHub. Si GitHub no responde o el producto no tiene fotos ahí, queda la de GBP: nada se rompe.
   Cada foto subida tiene un nombre único (lleva la huella de su contenido), así que nunca se ve una versión vieja guardada en caché. El índice se refresca en minutos (la central lo purga en jsDelivr al subir).
   Listado, home, ofertas, lupa, carrito y armador: cambia la foto chica. Página del producto: rehace la galería con las fotos de GitHub, en su orden. */
(function () {
	'use strict';
	var REPO = 'Marketingcg/compugarden', CDN = 'https://cdn.jsdelivr.net/gh/' + REPO + '@main/', DIR = 'pc-fotos/', INDICE = 'https://raw.githubusercontent.com/' + REPO + '/main/' + DIR + 'fotos.json';
	var RX = /\/App_PictureFiles\/Items\/([^\/?#]+?)_(\d+)\.(?:jpg|jpeg|png|webp)/i;
	var idx = null, ids = null;
	function clave(c) { try { c = decodeURIComponent(c); } catch (e) { } return String(c || '').toUpperCase(); }
	function fotos(cod) { var e = idx && idx[clave(cod)]; return e && e.f && e.f.length ? e.f : null; }
	function fotosId(id) { var e = ids && ids[String(id)]; return e && e.f && e.f.length ? e.f : null; }
	function idDe(href) { var m = /ITEM_ID=(\d+)/i.exec(href || ''); return m ? m[1] : ''; }
	/* v1.1: las fotos nuevas vienen con su dirección completa, fijada al cambio de GitHub donde se subieron (jsDelivr @commit: nunca vieja ni 404) */
	function url(p) { return /^https?:/.test(p) ? p : CDN + p; }
	/* una imagen cualquiera: si su enlace es de una foto de producto con fotos en GitHub, se cambia (la chica para miniaturas y la grande para 600 px o más) */
	function cambiar(img) {
		if (!img || img.getAttribute('data-cgf')) { return; }
		var s = img.getAttribute('src') || '', m = RX.exec(s); if (!m) { return; }
		var a0 = img.closest ? img.closest('a') : null, f = fotos(m[1]) || fotosId(idDe(a0 ? a0.getAttribute('href') : '')); if (!f) { return; }
		var n = +m[2], nueva = url(n >= 600 ? f[0].g : f[0].p);
		img.setAttribute('data-cgf', '1'); img.removeAttribute('srcset'); img.removeAttribute('onerror'); img.onerror = null; img.src = nueva;
		var a = img.closest ? img.closest('a') : null; if (a && RX.test(a.getAttribute('href') || '')) { a.setAttribute('href', url(f[0].g)); }
	}
	function barrer(raiz) { var l = (raiz || document).querySelectorAll ? (raiz || document).querySelectorAll('img') : []; for (var i = 0; i < l.length; i++) { cambiar(l[i]); } }
	/* página del producto: la galería (smoothproducts) se rehace con las fotos de GitHub */
	function galeria() {
		var w = document.querySelector('.sp-wrap'); if (!w || w.getAttribute('data-cgf')) { return; }
		/* el código del producto: la galería usa fotos numeradas (ItemImages), así que se toma del botón de compra, que lleva el enlace con el código */
		var f = fotosId(idDe(location.href)); if (!f) { return; }
		w.setAttribute('data-cgf', '1');
		var alt = (document.querySelector('h1.prod-titulo') || {}).textContent || '';
		var thumbs = w.querySelector('.sp-thumbs');
		if (!thumbs) {
			/* todavía no armó la galería: se reemplazan los enlaces originales (la galería se arma después con las de GitHub) */
			var as = w.querySelectorAll('a'); var base = as[0]; if (!base) { return; }
			for (var i = as.length - 1; i >= 0; i--) { as[i].parentNode.removeChild(as[i]); }
			f.forEach(function (x) { var a = base.cloneNode(true), im = a.querySelector('img'); a.setAttribute('href', url(x.g)); if (im) { im.setAttribute('src', url(x.g)); im.removeAttribute('srcset'); im.setAttribute('alt', alt.trim()); im.setAttribute('data-cgf', '1'); } w.appendChild(a); });
			return;
		}
		/* ya armada: se cambian la foto grande y las miniaturas (si hay más fotos que miniaturas, se agregan) */
		var ts = thumbs.querySelectorAll('a'), mold = ts[0];
		for (var k = 0; k < f.length; k++) { var t = ts[k]; if (!t && mold) { t = mold.cloneNode(true); thumbs.appendChild(t); } if (!t) { break; } t.setAttribute('href', url(f[k].g)); var ti = t.querySelector('img'); if (ti) { ti.setAttribute('src', url(f[k].p)); ti.removeAttribute('srcset'); ti.setAttribute('data-cgf', '1'); } t.style.display = ''; }
		for (var j = f.length; j < ts.length; j++) { ts[j].style.display = 'none'; }
		var lg = w.querySelector('.sp-large'); if (lg) { var las = lg.querySelectorAll('a'), lis = lg.querySelectorAll('img'); for (var a1 = 0; a1 < las.length; a1++) { las[a1].setAttribute('href', url(f[0].g)); } for (var i1 = 0; i1 < lis.length; i1++) { if (i1 > 0) { lis[i1].parentNode.removeChild(lis[i1]); continue; } lis[i1].setAttribute('src', url(f[0].g)); lis[i1].removeAttribute('srcset'); lis[i1].setAttribute('data-cgf', '1'); lis[i1].style.opacity = ''; } }
		/* al tocar una miniatura, smoothproducts arma otra vez la foto grande: se vuelve a dejar una sola */
		if (!w.getAttribute('data-cgf-click')) { w.setAttribute('data-cgf-click', '1'); w.addEventListener('click', function () { setTimeout(function () { var l2 = w.querySelectorAll('.sp-large img'); for (var z = 1; z < l2.length; z++) { if (l2[z].parentNode) { l2[z].parentNode.removeChild(l2[z]); } } }, 650); }); }
	}
	/* datos de una PC armada sacados de su nombre (la central lo mantiene al día con la fórmula de PC Armada) */
	function specs(nom) {
		var n = ' ' + String(nom || '').replace(/\s+/g, ' ') + ' ', o = [], m, cpu = '', marca = '';
		if ((m = /\bCore\s+(i[3579])[\s-]?(\d{4,5}[A-Z]{0,2})\b/i.exec(n))) { cpu = 'Core ' + m[1].toLowerCase() + '-' + m[2].toUpperCase(); marca = 'intel'; }
		else if ((m = /\b(?:Core\s+)?Ultra\s+([3579])\s+(\d{3}[A-Z]{0,2})(\s+Plus)?\b/i.exec(n))) { cpu = 'Core Ultra ' + m[1] + ' ' + m[2].toUpperCase() + (m[3] ? ' Plus' : ''); marca = 'intel'; }
		else if ((m = /\b(Celeron|Pentium)\s+(G?\d{4}[A-Z]?)\b/i.exec(n))) { cpu = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase() + ' ' + m[2].toUpperCase(); marca = 'intel'; }
		else if ((m = /\bRyzen\s+([3579])[\s-]+(\d{4}[A-Z0-9]{0,4})\b/i.exec(n))) { cpu = 'Ryzen ' + m[1] + ' ' + m[2].toUpperCase(); marca = 'amd'; }
		else if ((m = /\bAthlon\s+(\d{3,4}[A-Z]{0,2})\b/i.exec(n))) { cpu = 'Athlon ' + m[1].toUpperCase(); marca = 'amd'; }
		if (cpu) { o.push(['cpu', cpu]); }
		/* memoria: el primer «NN GB» que no sea de disco ni de placa de video */
		var sinDisco = n.replace(/\bSSD\s+(NVMe\s+)?[\d.,]+\s*(GB?|TB)\b/ig, ' ').replace(/\b[\d.,]+\s*(GB?|TB)\s+(NVMe|SSD|HDD)\b/ig, ' ').replace(/\b(RTX|GTX|RX|ARC)\s+[A-Z]?\d{3,4}[^\d]{0,12}\d+\s*GB\b/ig, ' ');
		if ((m = /\b(\d{1,3})\s*GB?\b(?![.\d])/i.exec(sinDisco.replace(/\bM\.2\s+\d+\s*G[B]?\w*/ig, ' ')))) { var ddr = /\bDDR([45])\b/i.exec(n); o.push(['ram', m[1] + 'GB' + (ddr ? ' DDR' + ddr[1] : ' RAM')]); }
		/* disco */
		if ((m = /\b(?:SSD|M\.2)\s+(NVMe\s+)?([\d.,]+)\s*(GB?|TB)\b/i.exec(n)) || (m = /\b([\d.,]+)\s*(GB?|TB)\s+(NVMe|SSD)\b/i.exec(n))) {
			var nv = /\bNVMe\b|\bM\.2\b/i.test(n), cap = m[2] && /GB|TB/i.test(m[3] || '') ? m[2] + m[3].toUpperCase() : (m[1] + m[2]).toUpperCase();
			if (/^\d/.test(m[2] || '') && /^(GB?|TB)$/i.test(m[3] || '')) { cap = m[2].replace(',024', '') + m[3].toUpperCase(); } else { cap = (m[1] || '').replace(',024', '') + (m[2] || '').toUpperCase(); } cap = cap.replace(/G$/, 'GB');
			o.push(['ssd', 'SSD ' + (nv ? 'NVMe ' : '') + cap]);
		}
		/* placa de video; si no hay, los gráficos del procesador */
		if ((m = /\b(RTX|GTX)\s*(\d{4})(\s*Ti)?(\s*Super)?\b/i.exec(n))) { o.push(['gpu', m[1].toUpperCase() + ' ' + m[2] + (m[3] ? ' Ti' : '') + (m[4] ? ' Super' : '')]); }
		else if ((m = /\bRX\s*(\d{3,4})(\s*XTX|\s*XT|\s*GRE)?\b/i.exec(n))) { o.push(['gpu', 'Radeon RX ' + m[1] + (m[2] ? ' ' + m[2].trim().toUpperCase() : '')]); }
		else if ((m = /\bArc\s+([AB]\d{3})\b/i.exec(n))) { o.push(['gpu', 'Intel Arc ' + m[1].toUpperCase()]); }
		else if (marca === 'amd' && (/(\d{4}G|\d{4}GE|Athlon)/i.test(cpu) || (/Ryzen [3579] [79]\d{3}/.test(cpu) && !/F$/.test(cpu)))) { o.push(['gpu', 'Gráficos Radeon']); }
		else if (marca === 'intel' && !/F$/.test(cpu)) { o.push(['gpu', 'Gráficos Intel']); }
		return o;
	}
	/* ETIQUETA DE DATOS sobre la foto de cada PC armada (diseño aprobado, opción B): una columna fina a la izquierda con procesador, memoria, disco y gráficos.
	   No está dentro de la foto: la dibuja la web con el nombre de la PC, así que cuando la central cambia una pieza (y el nombre), la etiqueta cambia sola. El estilo está en cg-diseno (.cg-pcd). */
	var ICO = { cpu: 'M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z|M9 9h6v6H9z|M9 2v3|M15 2v3|M9 19v3|M15 19v3|M2 9h3|M2 15h3|M19 9h3|M19 15h3', ssd: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z|M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z|M12 14.5 8 20', ram: 'M3 7h18a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z|M6 10v3|M10 10v3|M14 10v3|M18 10v3|M4 16v3|M20 16v3', gpu: 'M4 6h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z|M9 8.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z|M16 8.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z|M5 17v2' };
	function esPC(nom) { return /^\s*PC\s+(Armada|Kelyx)\b/i.test(nom || ''); }
	/* rótulo chico + valor, como el panel de las fotos viejas: «AMD / ATHLON 3000G», «SSD / 240 GB», «MEMORIA / 8 GB», «GRÁFICOS / RADEON» */
	function partes(x, nom) {
		var v = x[1], m;
		if (x[0] === 'cpu') { return [/^(Core|Celeron|Pentium)/.test(v) ? 'INTEL' : 'AMD', v.toUpperCase()]; }
		if (x[0] === 'ram') { m = /^(\d+)GB(?: (DDR\d))?/.exec(v); return [m && m[2] ? m[2] : 'MEMORIA', m ? m[1] + ' GB' : v.toUpperCase()]; }
		if (x[0] === 'ssd') { m = /^SSD (NVMe )?([\d.,]+)(GB|TB)$/.exec(v); return [m && m[1] ? 'SSD NVME' : 'SSD', m ? m[2] + ' ' + m[3] : v.replace(/^SSD /, '').toUpperCase()]; }
		if (/^Gráficos /.test(v)) { return ['GRÁFICOS', v.replace(/^Gráficos /, '').toUpperCase()]; }
		if (/^(RTX|GTX)/.test(v)) { return ['NVIDIA', v.toUpperCase()]; }
		if (/^Radeon /.test(v)) { return ['AMD', v.replace(/^Radeon /, '').toUpperCase()]; }
		if (/^Intel Arc/.test(v)) { return ['INTEL', v.replace(/^Intel /, '').toUpperCase()]; }
		return ['', v.toUpperCase()];
	}
	function etiqueta(nom, grande) {
		var ORD = { cpu: 0, ssd: 1, ram: 2, gpu: 3 }, L = specs(nom).sort(function (x, y) { return ORD[x[0]] - ORD[y[0]]; }); if (!L.length) { return null; }
		var d = document.createElement('div'); d.className = 'cg-pcd' + (grande ? ' cg-pcd-g' : ''); d.setAttribute('aria-hidden', 'true');
		L.forEach(function (x) {
			var it = document.createElement('div'), sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), pt = partes(x, nom), sm = document.createElement('small'), bb = document.createElement('b');
			it.className = 'cg-pcd-i'; sv.setAttribute('viewBox', '0 0 24 24'); ICO[x[0]].split('|').forEach(function (pd) { var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', pd); sv.appendChild(p); });
			sm.textContent = pt[0]; bb.textContent = pt[1]; it.appendChild(sv); if (pt[0]) { it.appendChild(sm); } it.appendChild(bb); d.appendChild(it);
		});
		return d;
	}
	/* el panel escala con la foto: --cgu = 1% del ancho de la caja (se recalcula si cambia el tamaño) */
	var RO = window.ResizeObserver ? new ResizeObserver(function (es) { es.forEach(function (x) { medir(x.target); }); }) : null;
	function medir(caja) { var w = caja.getBoundingClientRect().width; if (w) { caja.style.setProperty('--cgu', (w / 100).toFixed(2) + 'px'); } if (RO && !caja.getAttribute('data-cgu')) { caja.setAttribute('data-cgu', '1'); RO.observe(caja); } }
	function poner(caja, nom, grande) {
		if (!caja || !esPC(nom)) { return; }
		var vieja = caja.querySelector(':scope > .cg-pcd'); if (vieja && vieja.getAttribute('data-n') === nom) { return; } if (vieja) { vieja.parentNode.removeChild(vieja); }
		var e = etiqueta(nom, grande); if (!e) { return; } e.setAttribute('data-n', nom); caja.classList.add('cg-pcd-box'); caja.appendChild(e); medir(caja);
	}
	function etiquetas(raiz) {
		var r = raiz && raiz.querySelectorAll ? raiz : document;
		/* listados, home, ofertas, lupa: la foto de cada tarjeta (su texto alternativo es el nombre del producto) */
		var l = r.querySelectorAll('img'); for (var i = 0; i < l.length; i++) { var im = l[i], nom = im.getAttribute('alt') || ''; if (esPC(nom) && RX.test(im.getAttribute('src') || '') || (esPC(nom) && im.getAttribute('data-cgf'))) { if (!(im.closest && im.closest('.sp-wrap'))) { poner(im.parentNode, nom, false); } } }
		/* página del producto: sobre la foto grande de la galería */
		var h1 = document.querySelector('h1.prod-titulo'), lg = document.querySelector('.sp-wrap .sp-large');
		if (h1 && lg) { poner(lg, h1.textContent.replace(/\s+/g, ' ').trim(), true); }
	}
	function todo(raiz) { etiquetas(raiz); if (!idx) { return; } galeria(); barrer(raiz); etiquetas(raiz); }
	function empezar() {
		todo(document);
		if (window.MutationObserver) {
			new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) { var m = ms[i]; if (m.type === 'attributes') { if (m.target.tagName === 'IMG') { m.target.removeAttribute('data-cgf'); cambiar(m.target); } } else { for (var k = 0; k < m.addedNodes.length; k++) { var n = m.addedNodes[k]; if (n.nodeType === 1) { if (n.tagName === 'IMG') { cambiar(n); } else { todo(n); } } } } } })
				.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
		}
		window.addEventListener('load', function () { todo(document); setTimeout(function () { todo(document); }, 700); });
	}
	/* índice: se guarda unos minutos en el navegador para no pedirlo en cada página */
	function arrancarEtiquetas() { etiquetas(document); if (window.MutationObserver) { new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) { for (var k = 0; k < ms[i].addedNodes.length; k++) { var n = ms[i].addedNodes[k]; if (n.nodeType === 1 && !(n.classList && n.classList.contains('cg-pcd'))) { etiquetas(n.parentNode || n); } } } }).observe(document.documentElement, { childList: true, subtree: true }); } window.addEventListener('load', function () { etiquetas(document); setTimeout(function () { etiquetas(document); }, 800); }); }
	if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', arrancarEtiquetas); } else { arrancarEtiquetas(); }
	function guardado() { try { var g = JSON.parse(sessionStorage.getItem('cgf_idx2') || 'null'); return g && Date.now() - g.t < 5 * 60000 ? g : null; } catch (e) { return null; } }
	var g = guardado();
	if (g) { idx = g.d || {}; ids = g.i || {}; if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', empezar); } else { empezar(); } return; }
	fetch(INDICE, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : {}; }).then(function (d) {
		idx = d && d.p ? d.p : {}; ids = d && d.i ? d.i : {}; try { sessionStorage.setItem('cgf_idx2', JSON.stringify({ t: Date.now(), d: idx, i: ids })); } catch (e) { }
		if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', empezar); } else { empezar(); }
	}).catch(function () { });
})();
