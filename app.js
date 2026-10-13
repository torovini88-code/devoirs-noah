/* Les devoirs de Noah: app instalable. Las lecciones viven en lessons.json y los dibujos en drawings.js. */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function hashOf(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return String(h); }

  /* ---------- Cara de Noah y tortuga ---------- */
  var FACE = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
    '<rect width="100" height="100" fill="#d3e5ff"/>' +
    '<path d="M17 58 C12 24 30 7 50 7 C70 7 88 24 83 58 C83 72 81 80 77 86 L23 86 C19 80 17 72 17 58 Z" fill="#87552f"/>' +
    '<path d="M43 70 H57 V84 Q50 92 43 84 Z" fill="#f3c6ab"/>' +
    '<path d="M18 104 C20 90 34 84 42 82 Q50 90 58 82 C66 84 80 90 82 104 Z" fill="#ff9a3d"/>' +
    '<ellipse cx="50" cy="54" rx="25" ry="28" fill="#fde2d1"/>' +
    '<circle cx="31" cy="65" r="4.2" fill="#ff9aa0" opacity=".3"/><circle cx="69" cy="65" r="4.2" fill="#ff9aa0" opacity=".3"/>' +
    '<ellipse cx="39" cy="55" rx="6" ry="6.6" fill="#fff"/><ellipse cx="61" cy="55" rx="6" ry="6.6" fill="#fff"/>' +
    '<circle cx="39" cy="55.4" r="4.3" fill="#3b8fe6" stroke="#2a6fc0" stroke-width=".6"/><circle cx="61" cy="55.4" r="4.3" fill="#3b8fe6" stroke="#2a6fc0" stroke-width=".6"/>' +
    '<circle cx="39" cy="55.4" r="2" fill="#16204a"/><circle cx="61" cy="55.4" r="2" fill="#16204a"/>' +
    '<circle cx="40.4" cy="53.8" r="1.1" fill="#fff"/><circle cx="62.4" cy="53.8" r="1.1" fill="#fff"/>' +
    '<g fill="none" stroke-linecap="round">' +
      '<path d="M32.5 52 Q39 48.5 45.5 52" stroke="#5a3a20" stroke-width="1.4"/><path d="M54.5 52 Q61 48.5 67.5 52" stroke="#5a3a20" stroke-width="1.4"/>' +
      '<path d="M32 44.5 Q39 41 46 44" stroke="#6d4526" stroke-width="2.2"/><path d="M54 44 Q61 41 68 44.5" stroke="#6d4526" stroke-width="2.2"/>' +
      '<path d="M50 58 Q47.5 63 51.5 63" stroke="#d9a083" stroke-width="1.4"/>' +
      '<path d="M43 70 Q50 76 57 70" stroke="#c25a5e" stroke-width="2.2"/>' +
    '</g>' +
    '<path d="M23 54 C19 26 33 12 50 12 C67 12 81 26 77 54 C75 44 72 36 67 31 C58 37 44 37 35 30 C30 36 26 44 23 54 Z" fill="#87552f"/>' +
    '<path d="M22 52 C19 66 21 78 26 86 C24 78 30 66 29 50 Z" fill="#87552f"/>' +
    '<path d="M78 52 C81 66 79 78 74 86 C76 78 70 66 71 50 Z" fill="#87552f"/>' +
    '</svg>';
  var TURTLE = '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
    '<g stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">' +
    '<rect x="12" y="30" width="7" height="9" rx="3" fill="#8fd7b5"/><rect x="28" y="30" width="7" height="9" rx="3" fill="#8fd7b5"/>' +
    '<path d="M8 33 L3 35 L8 37 Z" fill="#8fd7b5"/><ellipse cx="40" cy="27" rx="6" ry="5.5" fill="#8fd7b5"/>' +
    '<path d="M7 33 C7 19 16 12 24 12 C33 12 40 19 40 33 Z" fill="#3fb58a"/>' +
    '<path d="M16 33 C16 25 19 18 24 14 M31 33 C31 25 29 18 24 14" fill="none"/>' +
    '<circle cx="42" cy="25.8" r="1" fill="currentColor" stroke="none"/></g></svg>';

  /* ---------- Almacenamiento ---------- */
  var KEY = 'noah-app-v1';
  var store = { done: {}, pick: {}, es: true, voiceName: '', best: {}, scope: 'cur-dict', lessonsHash: '' };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && p.done) store.done = p.done;
      if (p && p.pick) store.pick = p.pick;
      if (p && p.best) store.best = p.best;
      if (p && typeof p.es === 'boolean') store.es = p.es;
      if (p && typeof p.voiceName === 'string') store.voiceName = p.voiceName;
      if (p && typeof p.scope === 'string') store.scope = p.scope;
      if (p && typeof p.lessonsHash === 'string') store.lessonsHash = p.lessonsHash;
    }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  function doneMap(l, k) { var key = l.id + '|' + k; if (!store.done[key]) store.done[key] = {}; return store.done[key]; }
  function countDone(l, k) { var m = doneMap(l, k); return Object.keys(m).filter(function (i) { return m[i]; }).length; }
  function pickMap(l) { if (!store.pick[l.id]) store.pick[l.id] = {}; return store.pick[l.id]; }

  /* ---------- Lecciones ---------- */
  var LESSONS = [], CURRENT = null;
  function artHTML(a) {
    var l = (a || '').toLowerCase(), c = (l === 'un' || l === 'le') ? ' m' : (l === 'une' || l === 'la') ? ' f' : '';
    return '<span class="art' + c + '">' + a + '</span>';
  }
  function wordHTML(w) { return w.art ? artHTML(w.art) + (w.art === "l'" ? '' : ' ') + w.noun : w.noun; }
  function prep(data) {
    LESSONS = data.lessons.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    CURRENT = LESSONS.filter(function (l) { return l.id === data.current; })[0] || LESSONS[LESSONS.length - 1];
    LESSONS.forEach(function (l) {
      l.words = l.words || [];
      l.words.forEach(function (w, i) {
        var r = PICS.resolve(w.pic, w);
        w.i = i; w.lid = l.id; w.svg = r.svg; w.tap = w.noTap ? null : r.tap;
        w.art = w.art || '';
        w.say = w.art === "l'" ? w.art + w.noun : (w.art ? w.art + ' ' + w.noun : w.noun);
        w.picKey = w.pic || ('w:' + w.noun);
      });
    });
  }
  function dictWords(l) { return l.words.filter(function (w) { return w.dict; }); }
  function pagesText(l) {
    var s = {}; l.words.forEach(function (w) { if (w.page) s[w.page] = 1; });
    var a = Object.keys(s).map(Number).sort(function (x, y) { return x - y; });
    return a.length ? (a.length > 1 ? 'pages ' + a.slice(0, -1).join(', ') + ' et ' + a[a.length - 1] : 'page ' + a[0]) : '';
  }
  /* Misiones de una lección: depende de lo que tenga la lección en lessons.json */
  function mInfo(l, k) {
    if (k === 'mots') return { ico: 'Aa', name: 'Copier les mots', sub: 'Lexique' + (pagesText(l) ? ', ' + pagesText(l) : ''), es: 'Copiar las palabras', total: l.words.length };
    if (k === 'phrases') return { ico: 'Je.', name: '5 phrases', sub: 'Avec une majuscule et un point', es: 'Cinco frases', total: (l.phrases || []).length };
    if (k === 'nombres') { var n = l.numbers; return { ico: String(n.from), name: 'Les nombres de ' + n.from + ' à ' + n.to, sub: 'Math' + (n.page ? ', page ' + n.page : ''), es: 'Los números del ' + n.from + ' al ' + n.to, total: n.to - n.from + 1 }; }
    if (k === 'dictee') return { ico: 'ABC', name: 'La dictée', sub: dictWords(l).length + ' mots à étudier', es: 'El dictado', total: dictWords(l).length };
    if (k === 'jours') return { ico: 'L–D', name: 'Les jours de la semaine', sub: 'Du lundi au dimanche', es: 'Los días de la semana', total: 7 };
  }
  function hasKind(l, k) {
    if (k === 'mots') return l.words.length > 0;
    if (k === 'phrases') return !!(l.phrases && l.phrases.length);
    if (k === 'nombres') return !!l.numbers;
    if (k === 'dictee') return dictWords(l).length > 0;
    if (k === 'jours') return !!l.days;
    return false;
  }
  function deckOf(l, k) {
    if (k === 'mots') return {
      title: 'Copier les mots' + (pagesText(l) ? ', ' + pagesText(l) : ''), mode: 'copy', unit: 'Mot', next: "J'ai copié →", last: "J'ai copié ! Terminer",
      how: "Cherche l'image dans ton livre. Copie le mot dans ton cahier maison. Puis touche « J'ai copié ».",
      howEs: 'Busca la imagen en tu libro. Copia la palabra en tu cuaderno de casa. Luego toca «J\'ai copié».',
      endText: 'Tu as copié les mots de ton lexique : ' + l.title + '.',
      items: l.words.map(function (w) { return { svg: w.svg, alt: 'Dessin : ' + w.say, where: w.page ? 'Page ' + w.page : '', wordHTML: wordHTML(w), sub: w.es, speak: w.say }; })
    };
    if (k === 'nombres') {
      var items = [];
      for (var n = l.numbers.from; n <= l.numbers.to; n++) {
        var t = Math.floor(n / 10), u = n % 10, word = PICS.numWord(n), sub;
        if (n === 80) sub = '4 × 20'; else if (t >= 7) sub = '60 + ' + (10 + u); else sub = t + ' dizaines' + (u ? ' et ' + u + ' unité' + (u > 1 ? 's' : '') : '');
        items.push({ svg: PICS.numSVG(n), alt: t + ' bâtons bleus et ' + u + ' cubes jaunes',
          wordHTML: '<span class="digits"><span class="t">' + t + '</span><span class="u">' + u + '</span></span><span class="nw">' + word + '</span>', sub: sub, speak: word.replace(/-/g, ' ') });
      }
      return { title: 'Les nombres de ' + l.numbers.from + ' à ' + l.numbers.to, mode: 'reveal', unit: 'Nombre', next: 'Nombre suivant →', last: 'Terminer',
        how: "Compte les bâtons bleus (dizaines) et les cubes jaunes (unités). Quel est le nombre ? Touche l'image pour vérifier, puis écris le chiffre et le mot dans ton cahier.",
        howEs: 'Cuenta las barras azules (decenas) y los cubos amarillos (unidades). ¿Cuál es el número? Toca la imagen para comprobar y escribe la cifra y la palabra en tu cuaderno.',
        hint: 'Combien y a-t-il ? Pense, puis touche.', endText: 'Tu as écrit les nombres en chiffres et en lettres.', items: items };
    }
    if (k === 'dictee') return {
      title: 'La dictée du ' + (l.dictationDay || 'jeudi'), mode: 'reveal', unit: 'Mot', next: 'Mot suivant →', last: 'Terminer', recap: true,
      how: "J'écoute le mot. Je l'écris dans mon cahier. Je touche l'image pour vérifier mon orthographe.",
      howEs: 'Escucho la palabra. La escribo en mi cuaderno. Toco la imagen para comprobar cómo se escribe.',
      hint: "Écris le mot dans ton cahier, puis touche l'image.", endText: 'Tu as découvert les ' + dictWords(l).length + ' mots de la dictée.',
      items: dictWords(l).map(function (w) { return { svg: w.svg, alt: 'Dessin : ' + w.say, wordHTML: wordHTML(w), sub: w.es, speak: w.say }; })
    };
    return {
      title: 'Les jours de la semaine', mode: 'reveal', unit: 'Jour', next: 'Jour suivant →', last: 'Terminer', recap: true,
      how: "J'écoute le jour. Je l'écris dans mon cahier, sans majuscule. Je touche le calendrier pour vérifier.",
      howEs: 'Escucho el día. Lo escribo en mi cuaderno, sin mayúscula. Toco el calendario para comprobar.',
      hint: 'Écris le jour dans ton cahier, puis touche le calendrier.', endText: 'Tu connais les 7 jours de la semaine.',
      items: PICS.jours.map(function (j) { return { svg: j.svg, alt: j.alt, wordHTML: j.word, sub: j.es + ' · ' + j.tag + ' (' + j.tagEs + ')', speak: j.word }; })
    };
  }

  /* ---------- Retos: definición y alcance ---------- */
  var GAME_UI = {
    jacques: { ico: '!', name: 'Jacques a dit', sub: 'Attention aux pièges !', es: 'Simón dice, con trampas', total: 10 },
    toucher: { ico: '☝', name: 'Touche le bon endroit', sub: 'Écoute et touche', es: 'Escucha y toca', total: 10 },
    ecoute: { ico: '♪', name: 'Écoute et choisis', sub: 'Quel dessin correspond ?', es: 'Escucha y elige el dibujo', total: 10 },
    memoire: { ico: '▦', name: 'Mémoire', sub: 'Retrouve les paires', es: 'Encuentra las parejas', total: 3, stars: 1 },
    lettres: { ico: 'A·B', name: 'Les lettres en désordre', sub: 'Remets les lettres du mot', es: 'Ordena las letras', total: 10 }
  };
  var GORDER = ['jacques', 'toucher', 'ecoute', 'memoire', 'lettres'];
  function allWords() { var out = [], seen = {}; LESSONS.slice().reverse().forEach(function (l) { l.words.forEach(function (w) { if (!seen[w.say]) { seen[w.say] = 1; out.push(w); } }); }); return out; }
  function scopes() {
    var list = [], cd = dictWords(CURRENT), prevs = LESSONS.filter(function (l) { return l !== CURRENT; }).reverse();
    if (cd.length) list.push({ id: 'cur-dict', group: 'Leçon actuelle', label: 'La dictée', sub: cd.length + ' mots · ' + CURRENT.title, words: cd });
    list.push({ id: 'cur-all', group: 'Leçon actuelle', label: 'Tous les mots', sub: CURRENT.words.length + ' mots · ' + CURRENT.title, words: CURRENT.words });
    if (prevs.length) {
      var aw = allWords();
      list.push({ id: 'all', group: 'Révision', label: 'Toutes les leçons', sub: aw.length + ' mots de ' + LESSONS.length + ' leçons', words: aw });
      prevs.forEach(function (l) { list.push({ id: 'L:' + l.id, group: 'Révision', label: l.title, sub: l.words.length + ' mots · ' + l.subtitle, words: l.words }); });
    }
    return list;
  }
  function currentScope() {
    var s = scopes(), f = s.filter(function (x) { return x.id === store.scope; })[0];
    return f || s[0];
  }
  /* Defis mélangés: mots de TOUTES les leçons (la nouvelle comprise) + nombres + jours, tirés au hasard à chaque partie */
  function numberWords() {
    var seen = {}, out = [];
    LESSONS.forEach(function (l) {
      if (!l.numbers) return;
      for (var n = l.numbers.from; n <= l.numbers.to; n++) {
        if (seen[n]) continue; seen[n] = 1;
        var nw = PICS.numWord(n);
        out.push({ kind: 'num', i: n, lid: 'num', svg: PICS.numSVG(n), tap: null, art: '', noun: nw, say: nw.replace(/-/g, ' '), es: String(n), picKey: 'num:' + n });
      }
    });
    return out;
  }
  function dayWords() {
    if (!LESSONS.some(function (l) { return l.days; })) return [];
    return PICS.jours.map(function (j, n) { return { kind: 'day', i: n, lid: 'day', svg: j.svg, tap: null, art: '', noun: j.word, say: j.word, es: j.es, picKey: 'day:' + n }; });
  }
  function mixBuckets() {
    var b = LESSONS.map(function (l) { return l.words; });
    b.push(numberWords()); b.push(dayWords());
    return b.filter(function (x) { return x.length; });
  }
  /* Reparto equilibrado: una palabra de cada grupo por turno, en orden aleatorio */
  function mixOrder() {
    var bs = mixBuckets().map(shuffle), out = [], left = true;
    while (left) {
      left = false;
      shuffle(bs.map(function (_, n) { return n; })).forEach(function (n) { if (bs[n].length) { out.push(bs[n].pop()); left = true; } });
    }
    return out;
  }
  function mixCount() { return mixBuckets().reduce(function (a, x) { return a + x.length; }, 0); }
  function bestKey() { return (G && G.mix ? 'mix-' : '') + (G ? G.k : ''); }

  /* ---------- Voz: se busca una voz de Francia (fr-FR), de la mejor calidad disponible ---------- */
  var synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
  var frVoice = null, frList = [], sid = 0, lastSay = 'le nez';
  function voiceScore(v) {
    var s = 0, n = v.name || '';
    if (/jacques/i.test(n)) s += 1000;
    if (/^fr[-_]FR$/i.test(v.lang)) s += 100; else if (/^fr([-_]|$)/i.test(v.lang)) s += 30;
    if (/natural|neural|online/i.test(n)) s += 50;
    if (/premium|enhanced|siri|am[eé]lie|thomas/i.test(n)) s += 35;
    if (/google/i.test(n)) s += 30;
    if (/henri|denise|eloise|audrey|aur[eé]lie|paul|jacques|marie|julie|hortense/i.test(n)) s += 12;
    if (/compact|espeak|bad news|bubbles|whisper|zarvox|trinoids|cellos|albert|organ|jester|junior/i.test(n)) s -= 80;
    return s;
  }
  function pickVoice() {
    if (!synth) return 0;
    var vs = synth.getVoices() || [];
    frList = vs.filter(function (v) { return /^fr([-_]|$)/i.test(v.lang) || /fran[cç]/i.test(v.name); })
      .sort(function (a, b) { return voiceScore(b) - voiceScore(a); });
    frVoice = frList[0] || null;
    return vs.length;
  }
  function checkVoiceNote() { var n = pickVoice(); $('#voice-note').hidden = !(!synth || (n > 0 && !frVoice)); }
  function setSpeaking(on) { $('#face-wrap').classList.toggle('speaking', on); }
  function mk(text, rate, id) {
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    if (frVoice) { u.voice = frVoice; u.lang = /^fr[-_]FR$/i.test(frVoice.lang) ? 'fr-FR' : frVoice.lang.replace('_', '-'); }
    u.rate = rate; u.pitch = 1;
    u.onstart = function () { if (id === sid) setSpeaking(true); };
    return u;
  }
  function speak(text, slow, cb) {
    lastSay = text;
    if (!synth) { if (cb) setTimeout(cb, 600); return; }
    var id = ++sid, list = [], m = /^(une|un|la|le|les|des|du)\s+(.+)$/i.exec(text);
    if (slow && m) { list.push(mk(m[1], 0.5, id)); list.push(mk(m[2], 0.5, id)); } else list.push(mk(text, slow ? 0.5 : 0.8, id));
    var last = list[list.length - 1], done = false;
    function fin() { if (done) return; done = true; if (id === sid) setSpeaking(false); if (cb && id === sid) cb(); }
    last.onend = last.onerror = fin;
    setTimeout(fin, 6000);
    function run() { list.forEach(function (u) { synth.speak(u); }); }
    if (synth.speaking || synth.pending) { synth.cancel(); setTimeout(run, 80); } else run();
  }
  function stopSpeaking() { sid++; if (synth) synth.cancel(); setSpeaking(false); }

  /* ---------- Pantallas ---------- */
  var cur = null, curL = null, curK = '', idx = 0;
  function screen(name) {
    ['map', 'play', 'end', 'phr', 'game'].forEach(function (s) { $('#s-' + s).hidden = s !== name; });
    $('#dock').hidden = !(name === 'play' || name === 'game');
    $('#counter').hidden = name !== 'play';
    document.body.setAttribute('data-screen', name === 'game' ? 'play' : name);
    window.scrollTo(0, 0);
  }
  function applyEs() {
    document.body.setAttribute('data-es', store.es ? 'on' : 'off');
    var b = $('#es-toggle');
    b.textContent = 'Ayuda en español: ' + (store.es ? 'sí' : 'no');
    b.setAttribute('aria-pressed', store.es ? 'true' : 'false');
  }
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.hidden = false;
    setTimeout(function () { t.hidden = true; }, 5000);
  }

  /* ---------- Pantalla principal ---------- */
  function missionBtn(l, k) {
    var m = mInfo(l, k), n = countDone(l, k);
    return '<button class="mission' + (n >= m.total ? ' is-full' : '') + '" type="button" data-l="' + esc(l.id) + '" data-k="' + k + '" style="--c:' + ({ mots: 'var(--c1)', phrases: 'var(--c2)', nombres: 'var(--c3)', dictee: 'var(--c4)', jours: 'var(--c5)' }[k]) + '">' +
      '<span class="m-ico" aria-hidden="true">' + m.ico + '</span>' +
      '<span class="m-body"><b>' + m.name + '</b><small>' + m.sub + '</small><span class="es">' + m.es + '</span>' +
      '<span class="m-bar"><i style="width:' + Math.round(100 * n / Math.max(1, m.total)) + '%"></i></span></span>' +
      '<span class="m-count">' + n + ' / ' + m.total + '</span></button>';
  }
  function gameBtn(k, mix) {
    var m = GAME_UI[k], n = Math.min(m.total, store.best[(mix ? 'mix-' : '') + k] || 0);
    var cnt = m.stars ? '★'.repeat(n) + '☆'.repeat(m.total - n) : 'Record ' + n + '/' + m.total;
    var col = { jacques: 'var(--c5)', toucher: 'var(--c1)', ecoute: 'var(--c2)', memoire: 'var(--c3)', lettres: 'var(--c4)' }[k];
    return '<button class="mission' + (n >= m.total ? ' is-full' : '') + '" type="button" data-g="' + k + '"' + (mix ? ' data-mix="1"' : '') + ' style="--c:' + col + '">' +
      '<span class="m-ico" aria-hidden="true">' + m.ico + '</span>' +
      '<span class="m-body"><b>' + m.name + '</b><small>' + m.sub + '</small><span class="es">' + m.es + '</span>' +
      '<span class="m-bar"><i style="width:' + Math.round(100 * n / m.total) + '%"></i></span></span><span class="m-count">' + cnt + '</span></button>';
  }
  function group(title, html) { return html ? '<div class="group"><h3>' + title + '</h3>' + html + '</div>' : ''; }
  function renderMap() {
    var c = CURRENT, h = '<div class="hello"><div class="mascot" id="mascot">' + FACE + '</div><div><span class="lesson-tag">Leçon actuelle</span><h2>Bonjour Noah !</h2>' +
      '<p class="lead">' + c.title + ' · ' + c.subtitle + '</p></div></div><div class="map">';
    var g1 = '', g2 = '';
    ['mots', 'phrases', 'nombres'].forEach(function (k) { if (hasKind(c, k)) g1 += missionBtn(c, k); });
    ['dictee', 'jours'].forEach(function (k) { if (hasKind(c, k)) g2 += missionBtn(c, k); });
    h += group(c.due || 'Devoirs', g1) + group('Pour ' + (c.dictationDay || 'jeudi'), g2);
    h += group('Les défis · jouer et réviser', GORDER.map(function (k) { return gameBtn(k, false); }).join(''));
    if (LESSONS.length > 1) {
      h += group('Leçons précédentes · révision mélangée', '<p class="how">Tout ce que tu as appris dans les leçons, dans le désordre. Les questions changent à chaque partie !<span class="es">Todo lo aprendido, mezclado. ¡Las preguntas cambian en cada partida!</span></p>' +
        GORDER.map(function (k) { return gameBtn(k, true); }).join(''));
    }
    $('#s-map').innerHTML = h + '</div>';
    var notes = '';
    LESSONS.slice().reverse().forEach(function (l) { (l.notes || []).forEach(function (n) { notes += '<li><b>' + l.title + ':</b> ' + n + '</li>'; }); });
    $('#parent-list').innerHTML = notes;
  }

  /* ---------- Tarjetas (copiar, números, dictée, días) ---------- */
  function openDeck(l, k) {
    curL = l; curK = k; cur = deckOf(l, k);
    var dm = doneMap(l, k), firstTodo = 0;
    for (var i = 0; i < cur.items.length; i++) { if (!dm[i]) { firstTodo = i; break; } }
    idx = firstTodo;
    $('#deck-title').textContent = cur.title;
    $('#how').innerHTML = cur.how + '<span class="es">' + cur.howEs + '</span>';
    var dots = $('#dots'); dots.innerHTML = '';
    dots.hidden = cur.items.length > 13;
    if (cur.items.length <= 13) {
      cur.items.forEach(function (_, n) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'dot'; b.textContent = String(n + 1); b.setAttribute('aria-label', cur.unit + ' ' + (n + 1));
        b.addEventListener('click', function () { go(n); });
        dots.appendChild(b);
      });
    }
    $('#legend').hidden = !(k === 'mots' || k === 'dictee') || !l.words.some(function (w) { return w.art; });
    screen('play');
    go(idx);
  }
  function isOpen(i) { return cur.mode === 'copy' || !!doneMap(curL, curK)[i]; }
  function render(animate) {
    var it = cur.items[idx], n = cur.items.length, open = isOpen(idx), dm = doneMap(curL, curK), done = !!dm[idx];
    $('#counter').textContent = cur.unit + ' ' + (idx + 1) + ' / ' + n;
    var tile = $('#tile');
    tile.innerHTML = it.svg + '<span class="badge" aria-hidden="true">' + (cur.mode === 'copy' ? '✓' : (open ? '✓' : '?')) + '</span>';
    tile.setAttribute('data-open', (cur.mode === 'copy' ? done : open) ? 'true' : 'false');
    tile.setAttribute('data-badge', cur.mode === 'copy' && !done ? 'none' : 'show');
    tile.setAttribute('aria-label', it.alt + '. ' + (cur.mode === 'copy' ? 'Touche pour écouter.' : (open ? 'Le mot est affiché.' : 'Touche pour vérifier.')));
    var wh = $('#where'); wh.hidden = !it.where; if (it.where) wh.textContent = it.where;
    var word = $('#word'), hint = $('#hint'), sub = $('#sub');
    if (open) {
      word.innerHTML = it.wordHTML; word.hidden = false;
      sub.textContent = it.sub; sub.hidden = !it.sub; hint.hidden = true;
      word.classList.remove('writing');
      if (animate && cur.mode === 'reveal') { void word.offsetWidth; word.classList.add('writing'); }
    } else {
      word.hidden = true; sub.hidden = true; hint.hidden = false;
      hint.firstChild.textContent = cur.hint; word.classList.remove('writing');
    }
    var dots = $('#dots').children;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('is-current', i === idx);
      dots[i].classList.toggle('is-done', !!dm[i] && i !== idx);
    }
    $('#bar').style.width = Math.round(100 * countDone(curL, curK) / n) + '%';
    $('#prev').disabled = idx === 0;
    $('#next').textContent = idx === n - 1 ? cur.last : cur.next;
  }
  function go(i) { idx = i; $('#cheer').hidden = true; render(false); speak(cur.items[idx].speak, false); }
  function finish() {
    stopSpeaking();
    var n = countDone(curL, curK), total = cur.items.length;
    $('#end-title').textContent = n >= total ? 'Mission accomplie, Noah !' : 'Bravo Noah !';
    $('#end-text').textContent = n >= total ? cur.endText : 'Il reste ' + (total - n) + ' à faire. Tu peux continuer quand tu veux.';
    var ul = $('#recap'); ul.innerHTML = '';
    if (cur.recap) {
      cur.items.forEach(function (it) {
        var li = document.createElement('li');
        li.innerHTML = '<div class="thumb">' + it.svg + '</div><span>' + it.wordHTML + '</span>';
        ul.appendChild(li);
      });
    }
    renderMap(); screen('end');
  }

  /* ---------- Frases ---------- */
  function sentence(i) { var f = curL.phrases[i], pick = pickMap(curL)[i]; return pick ? f.pre + pick + f.post : null; }
  function renderPhrases() {
    var host = $('#phr-list'); host.innerHTML = '';
    var picks = pickMap(curL), dm = doneMap(curL, 'phrases'), total = curL.phrases.length;
    curL.phrases.forEach(function (f, i) {
      var pick = picks[i], done = !!dm[i], card = document.createElement('div');
      card.className = 'phr' + (done ? ' is-done' : '');
      var h = '<span class="phr-n">Phrase ' + (i + 1) + ' / ' + total + '</span>' +
        '<p class="frame">' + f.pre + '<span class="slot">' + (pick || '&nbsp;&nbsp;&nbsp;&nbsp;') + '</span>' + f.post + '</p>' +
        '<span class="es">' + (f.es || '') + '</span><div class="chips" role="group" aria-label="Choisir un mot">';
      f.chips.forEach(function (c) { h += '<button type="button" class="chip" data-i="' + i + '" data-c="' + esc(c) + '" aria-pressed="' + (pick === c ? 'true' : 'false') + '">' + c + '</button>'; });
      h += '</div>';
      var s = sentence(i);
      if (s) {
        h += '<p class="built"><span class="cap">' + s.charAt(0) + '</span>' + s.slice(1, -1) + '<span class="pt">.</span></p>' +
          '<div class="phr-act"><button type="button" class="btn" data-say="' + i + '">Écouter</button></div>' +
          '<label class="copied"><input type="checkbox" data-copied="' + i + '"' + (done ? ' checked' : '') + '><span>Je l\'ai copiée dans mon cahier<span class="es">La copié en mi cuaderno</span></span></label>';
      }
      card.innerHTML = h; host.appendChild(card);
    });
    $('#bar2').style.width = Math.round(100 * countDone(curL, 'phrases') / total) + '%';
  }

  /* ---------- Retos ---------- */
  var GDESC = {
    jacques: { fr: "Écoute bien ! Si Jacques dit « touche… », touche le bon endroit. S'il ne dit pas « Jacques a dit », ne touche rien et attends. Tu as 3 cœurs.", es: 'Si dice «Jacques a dit», toca la respuesta correcta. Si no lo dice, no toques nada y espera. Tienes 3 corazones.' },
    toucher: { fr: 'Écoute le mot et touche la bonne réponse : une partie du corps ou un dessin. 10 manches.', es: 'Escucha la palabra y toca la respuesta correcta: una parte del cuerpo o un dibujo. 10 rondas.' },
    ecoute: { fr: 'Écoute le mot et choisis le bon dessin. 10 manches.', es: 'Escucha la palabra y elige el dibujo correcto. 10 rondas.' },
    memoire: { fr: 'Retourne deux cartes : un dessin et son mot. Trouve les 6 paires avec le moins de coups possible.', es: 'Da la vuelta a dos cartas: un dibujo y su palabra. Encuentra las 6 parejas con los menos intentos posibles.' },
    lettres: { fr: 'Écoute le mot et touche les lettres dans le bon ordre. Essaie sans te tromper !', es: 'Escucha la palabra y toca las letras en el orden correcto. ¡Intenta no equivocarte!' }
  };
  var G = null, ROUNDS = 10;
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function pickWord() { if (!G.deck || !G.deck.length) G.deck = shuffle(G.pool); return G.deck.pop(); }
  function later(fn, ms) { var me = G; setTimeout(function () { if (G === me) fn(); }, ms); }
  function hud() {
    return '<div class="g-top"><span class="pill">Manche <b>' + Math.min(G.round + 1, ROUNDS) + '/' + ROUNDS + '</b></span><span class="pill">Points <b>' + G.score + '</b></span>' +
      (G.k === 'jacques' ? '<span class="pill lives" role="img" aria-label="' + G.lives + ' cœurs">' + '♥'.repeat(G.lives) + '♡'.repeat(3 - G.lives) + '</span>' : '') +
      '</div><div class="progress" aria-hidden="true"><i style="width:' + (100 * G.round / ROUNDS) + '%"></i></div>';
  }
  function setFb(txt, cls) { var f = $('#fb'); if (f) { f.textContent = txt; f.className = 'fb ' + (cls || ''); } }
  function bumpScore() { var p = document.querySelectorAll('.g-top .pill b'); if (p[1]) p[1].textContent = G.score; }
  function openGame(k, mix) { stopSpeaking(); G = { k: k, mix: !!mix }; $('#g-title').textContent = GAME_UI[k].name + (mix ? ' · mélange' : ''); screen('game'); setup(); }
  function setup() {
    var k = G.k, mix = !!G.mix, m = GAME_UI[k], d = GDESC[k], best = store.best[(mix ? 'mix-' : '') + k] || 0, sc = currentScope(), list = scopes(), lastGroup = '';
    G = { k: k, mix: mix };
    var bestTxt = best ? (m.stars ? 'Meilleur résultat : ' + '★'.repeat(best) + '☆'.repeat(3 - best) : 'Meilleur score : ' + best + ' sur ' + m.total) : "Pas encore de score. C'est ton premier défi !";
    var h = '<div class="card setup"><p class="lead">' + d.fr + '</p><span class="es">' + d.es + '</span>';
    if (mix) {
      h += '<p class="how">Toutes les leçons sont mélangées : ' + mixCount() + ' mots, nombres et jours. Les questions changent à chaque partie !<span class="es">Todas las lecciones mezcladas. ¡Las preguntas cambian en cada partida!</span></p>';
    } else {
      h += '<div class="scopes" role="group" aria-label="Choisir les mots du jeu">';
      list.forEach(function (s) {
        if (s.group !== lastGroup) { h += '<h3>' + s.group + '</h3>'; lastGroup = s.group; }
        h += '<button class="btn" type="button" data-scope="' + esc(s.id) + '" aria-pressed="' + (s.id === sc.id) + '">' + s.label + '<span class="es">' + s.sub + '</span></button>';
      });
      h += '</div>';
    }
    $('#g-body').innerHTML = h + '<p class="best">' + bestTxt + '</p><button class="btn primary" type="button" id="g-go">Jouer</button></div>';
  }
  function startGame() {
    var k = G.k, mix = !!G.mix, sc = currentScope();
    G = { k: k, mix: mix, round: 0, score: 0, lives: 3, pool: [], deck: [] };
    if (mix) { G.pool = mixOrder(); G.deck = G.pool.slice().reverse(); } else G.pool = sc.words.slice();
    if (k === 'memoire') return memStart();
    nextRound();
  }
  function nextRound() {
    if (G.round >= ROUNDS || (G.k === 'jacques' && G.lives <= 0)) return endGame(G.score);
    if (G.k === 'jacques' || G.k === 'toucher') tapRound(); else if (G.k === 'ecoute') ecouteRound(); else lettresRound();
  }
  function endGame(score) {
    var k = G.k, m = GAME_UI[k], stars, msg;
    stopSpeaking();
    if (m.stars) { stars = score; msg = 'Tu as trouvé les 6 paires en ' + G.moves + ' coups.'; }
    else { stars = score >= 9 ? 3 : score >= 6 ? 2 : score >= 1 ? 1 : 0; msg = 'Tu as réussi ' + score + ' manche' + (score > 1 ? 's' : '') + ' sur ' + ROUNDS + '.'; }
    var bk = bestKey(), rec = score > (store.best[bk] || 0);
    if (rec) { store.best[bk] = score; save(); }
    $('#g-body').innerHTML = '<div class="card"><h2>' + (stars >= 2 ? 'Bravo Noah !' : 'Bien essayé Noah !') + '</h2><div class="bigstar" role="img" aria-label="' + stars + ' étoiles sur 3">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' +
      '<p class="lead">' + msg + (rec ? ' Nouveau record !' : '') + '</p>' +
      '<button class="btn primary" type="button" id="g-again">Rejouer</button><button class="btn" type="button" id="g-home">Retour aux missions</button></div>';
    speak(stars >= 2 ? 'Bravo Noah !' : 'Bien essayé Noah !', false);
  }
  function makeOpts(w) {
    var seen = {}, ds = []; seen[w.picKey] = 1;
    var kind = w.kind || 'w';
    shuffle(G.pool).filter(function (x) { return (x.kind || 'w') === kind; }).concat(shuffle(G.pool), shuffle(allWords())).forEach(function (x) { if (ds.length < 3 && !seen[x.picKey]) { seen[x.picKey] = 1; ds.push(x); } });
    return shuffle([w].concat(ds));
  }
  function choicesHTML(opts) {
    var h = '<div class="choices">';
    opts.forEach(function (o, i) { h += '<button type="button" class="choice" data-ci="' + i + '" aria-label="Dessin ' + (i + 1) + '"><span class="fig">' + o.svg + '</span><span class="choice-word"></span></button>'; });
    return h + '</div>';
  }

  /* Jacques a dit y Touche (cuerpo con zonas, o 4 dibujos si la palabra no tiene zonas) */
  function tapRound() {
    var w = pickWord(), jac = G.k === 'jacques', trap = jac && Math.random() < 0.3, fig = !!w.tap;
    G.w = w; G.trap = trap; G.locked = false; G.fig = fig;
    var obj = fig ? 'touche ' + w.say : 'touche le dessin : ' + w.say;
    var say = (jac && !trap) ? 'Jacques a dit : ' + obj + '.' : cap(obj) + '.';
    var body;
    if (fig) body = '<div class="fig" id="fig">' + PICS.figure(w.tap.view, [], true) + '</div>';
    else { G.opts = makeOpts(w); body = choicesHTML(G.opts); }
    $('#g-body').innerHTML = hud() +
      '<p class="g-prompt ' + (jac ? (trap ? 'is-trap' : 'is-jacques') : '') + '">' + say + '<small class="es">toca ' + (fig ? '' : 'el dibujo: ') + w.es + '</small></p>' + body + '<p class="fb" id="fb" role="status"></p>';
    var me = G;
    speak(say.replace(' : ', ', '), false, function () {
      if (G === me && trap && !me.locked) me.timer = setTimeout(function () { if (G === me && !me.locked) tapDone(true, true); }, 3200);
    });
  }
  function tapDone(ok, passed) {
    G.locked = true; clearTimeout(G.timer);
    var w = G.w;
    if (ok) { G.score++; setFb(passed ? "Bravo ! Jacques n'a pas dit, tu n'as rien touché." : 'Bravo !', 'ok'); }
    else {
      if (G.k === 'jacques') G.lives--;
      setFb(G.trap ? "Oh non ! Jacques n'a pas dit." : "C'est ici : " + w.say + '.', 'bad');
      if (!G.trap && G.fig) $('#fig').innerHTML = PICS.figure(w.tap.view, [w.tap.zone], false);
    }
    if (!G.fig) document.querySelectorAll('.choice').forEach(function (b, n) {
      if (G.opts[n] === w) { b.classList.add('is-ok'); b.querySelector('.choice-word').innerHTML = wordHTML(w); }
    });
    G.round++; bumpScore();
    later(nextRound, ok ? 1500 : 2300);
  }
  function onFig(e) {
    if (!G || G.locked || (G.k !== 'jacques' && G.k !== 'toucher') || !G.fig) return;
    var t = e.target.closest ? e.target.closest('[data-z]') : null;
    var z = t ? t.getAttribute('data-z') : '';
    if (G.trap) return tapDone(false);
    tapDone(z === G.w.tap.zone);
  }

  /* Escucha y elige / elección en los retos de dibujos */
  function ecouteRound() {
    var w = pickWord();
    G.w = w; G.locked = false; G.opts = makeOpts(w);
    $('#g-body').innerHTML = hud() + '<p class="g-prompt">Écoute le mot. Quel dessin ?<small class="es">Escucha la palabra. ¿Qué dibujo es?</small></p>' + choicesHTML(G.opts) + '<p class="fb" id="fb" role="status"></p>';
    speak(w.say, false);
  }
  function onChoice(btn) {
    if (!G || G.locked) return;
    var i = +btn.getAttribute('data-ci');
    if (G.k === 'jacques' || G.k === 'toucher') {
      if (G.fig) return;
      if (G.trap) { btn.classList.add('is-bad'); return tapDone(false); }
      var okT = G.opts[i] === G.w; if (!okT) btn.classList.add('is-bad');
      return tapDone(okT);
    }
    if (G.k !== 'ecoute') return;
    G.locked = true;
    var ok = G.opts[i] === G.w;
    document.querySelectorAll('.choice').forEach(function (b, n) {
      if (G.opts[n] === G.w) { b.classList.add('is-ok'); b.querySelector('.choice-word').innerHTML = wordHTML(G.w); }
      else if (n === i) b.classList.add('is-bad');
    });
    if (ok) G.score++;
    setFb(ok ? 'Bravo !' : "C'est : " + G.w.say + '.', ok ? 'ok' : 'bad');
    G.round++; bumpScore();
    speak(G.w.say, false);
    later(nextRound, ok ? 1600 : 2600);
  }

  /* Letras en desorden (los espacios y guiones se rellenan solos) */
  function lettresRound() {
    var w = pickWord(), chars = w.noun.split(''), need = [];
    chars.forEach(function (c, i) { if (!/[\s\-]/.test(c)) need.push(i); });
    G.w = w; G.chars = chars; G.need = need; G.pos = 0; G.mis = 0; G.locked = false;
    var bank = shuffle(need.map(function (i) { return chars[i]; }));
    var h = hud() + '<p class="g-prompt">Écris le mot<small class="es">Escribe la palabra</small></p><div class="fig fig-small" aria-hidden="true">' + w.svg + '</div>' +
      '<div class="slots" id="slots">' + (w.art ? '<span class="slotc" style="width:auto;border:0;padding-inline:6px">' + w.art + '</span>' : '');
    chars.forEach(function (c) { h += /[\s\-]/.test(c) ? '<span class="slotc gap">' + (c === '-' ? '-' : '') + '</span>' : '<span class="slotc"></span>'; });
    h += '</div><div class="bank" id="bank">';
    bank.forEach(function (c) { h += '<button type="button" class="lt" data-l="' + esc(c) + '">' + c + '</button>'; });
    $('#g-body').innerHTML = h + '</div><p class="fb" id="fb" role="status"></p>';
    speak(w.say, false);
  }
  function onLetter(btn) {
    if (!G || G.locked || btn.disabled || G.k !== 'lettres') return;
    var c = btn.getAttribute('data-l'), at = G.need[G.pos];
    if (c === G.chars[at]) {
      var slots = document.querySelectorAll('#slots .slotc'), off = G.w.art ? 1 : 0;
      slots[at + off].textContent = c; btn.disabled = true; G.pos++;
      if (G.pos === G.need.length) {
        G.locked = true; var ok = G.mis === 0; if (ok) G.score++; G.round++;
        setFb(ok ? 'Bravo, sans erreur !' : 'Bien ! Le mot est écrit.', 'ok'); bumpScore();
        speak(G.w.say, false); later(nextRound, 1800);
      } else setFb('', '');
    } else { G.mis++; setFb('Essaie encore. Écoute bien le mot.', 'bad'); }
  }

  /* Memoria */
  function memStart() {
    var seen = {}, pool = (G.mix ? G.pool.slice() : shuffle(G.pool)).filter(function (w) { if (seen[w.picKey]) return false; seen[w.picKey] = 1; return true; });
    if (pool.length < 6) shuffle(allWords()).forEach(function (x) { if (pool.length < 6 && !seen[x.picKey]) { seen[x.picKey] = 1; pool.push(x); } });
    var ws = pool.slice(0, 6), cards = [];
    ws.forEach(function (w) { cards.push({ id: w.picKey, t: 'p', w: w }); cards.push({ id: w.picKey, t: 'w', w: w }); });
    G.cards = shuffle(cards); G.up = []; G.moves = 0; G.won = 0; G.locked = false; G.matched = {};
    memRender();
  }
  function memRender() {
    var h = '<div class="g-top"><span class="pill">Coups <b>' + G.moves + '</b></span><span class="pill">Paires <b>' + G.won + '/6</b></span></div>' +
      '<p class="how">Retourne un dessin et son mot.<span class="es">Da la vuelta a un dibujo y a su palabra.</span></p><div class="mem">';
    G.cards.forEach(function (c, i) {
      var open = G.up.indexOf(i) >= 0 || G.matched[c.id];
      h += '<button type="button" class="mcard' + (open ? ' up' : '') + (G.matched[c.id] ? ' won' : '') + '" data-card="' + i + '" aria-label="' + (open ? (c.t === 'p' ? 'Dessin : ' + c.w.say : c.w.say) : 'Carte cachée') + '">' +
        (open ? (c.t === 'p' ? '<span class="fig">' + c.w.svg + '</span>' : '<span class="mw">' + wordHTML(c.w) + '</span>') : '?') + '</button>';
    });
    $('#g-body').innerHTML = h + '</div><p class="fb" id="fb" role="status"></p>';
  }
  function onCard(btn) {
    if (!G || G.locked || G.k !== 'memoire') return;
    var i = +btn.getAttribute('data-card'), c = G.cards[i];
    if (G.up.indexOf(i) >= 0 || G.matched[c.id]) return;
    G.up.push(i); speak(c.w.say, false); memRender();
    if (G.up.length < 2) return;
    G.moves++;
    var a = G.cards[G.up[0]], b = G.cards[G.up[1]];
    if (a.id === b.id) {
      G.matched[a.id] = 1; G.won++; G.up = []; memRender(); setFb('Une paire ! ' + a.w.say + '.', 'ok');
      if (G.won === 6) later(function () { endGame(G.moves <= 9 ? 3 : G.moves <= 13 ? 2 : 1); }, 1600);
    } else { G.locked = true; later(function () { G.up = []; G.locked = false; memRender(); }, 1300); }
  }

  /* ---------- Eventos ---------- */
  $('#face').innerHTML = FACE;
  $('#slow').innerHTML = TURTLE;
  function lessonById(id) { return LESSONS.filter(function (l) { return l.id === id; })[0]; }
  $('#s-map').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.mission') : null;
    if (!b) return;
    var g = b.getAttribute('data-g');
    if (g) return openGame(g, b.getAttribute('data-mix') === '1');
    var l = lessonById(b.getAttribute('data-l')), k = b.getAttribute('data-k');
    if (!l) return;
    if (k === 'phrases') { curL = l; curK = 'phrases'; renderPhrases(); screen('phr'); } else openDeck(l, k);
  });
  $('#es-toggle').addEventListener('click', function () { store.es = !store.es; save(); applyEs(); });
  function home() { G = null; stopSpeaking(); renderMap(); screen('map'); }
  ['#back', '#back2', '#back3', '#home', '#home2'].forEach(function (s) { $(s).addEventListener('click', home); });

  $('#tile').addEventListener('click', function () {
    var dm = doneMap(curL, curK);
    if (cur.mode === 'copy') { speak(cur.items[idx].speak, false); return; }
    if (!dm[idx]) { dm[idx] = true; save(); render(true); }
    speak(cur.items[idx].speak, false);
  });
  $('#face').addEventListener('click', function () { speak(lastSay, false); });
  $('#slow').addEventListener('click', function () { speak(lastSay, true); });
  $('#prev').addEventListener('click', function () { if (idx > 0) go(idx - 1); });
  $('#next').addEventListener('click', function () {
    var n = cur.items.length, dm = doneMap(curL, curK);
    if (cur.mode === 'copy') {
      dm[idx] = true; save();
      var c = countDone(curL, curK);
      if (idx < n - 1) {
        go(idx + 1);
        if (c % 5 === 0) { var ch = $('#cheer'); ch.textContent = 'Bravo ! ' + c + ' mots copiés. Tu peux faire une petite pause.'; ch.hidden = false; }
      } else finish();
      return;
    }
    if (idx < n - 1) go(idx + 1); else finish();
  });
  $('#again').addEventListener('click', function () { store.done[curL.id + '|' + curK] = {}; save(); openDeck(curL, curK); });

  $('#phr-list').addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList && t.classList.contains('chip')) {
      var i = +t.getAttribute('data-i'); pickMap(curL)[i] = t.getAttribute('data-c'); doneMap(curL, 'phrases')[i] = false; save();
      renderPhrases(); speak(sentence(i), false);
    } else if (t.getAttribute && t.getAttribute('data-say') !== null) speak(sentence(+t.getAttribute('data-say')), false);
  });
  $('#phr-list').addEventListener('change', function (e) {
    var t = e.target;
    if (t.getAttribute && t.getAttribute('data-copied') !== null) { doneMap(curL, 'phrases')[+t.getAttribute('data-copied')] = t.checked; save(); renderPhrases(); }
  });

  $('#g-body').addEventListener('click', function (e) {
    var t = e.target, el;
    if ((el = t.closest('[data-scope]'))) {
      store.scope = el.getAttribute('data-scope'); save();
      document.querySelectorAll('[data-scope]').forEach(function (b) { b.setAttribute('aria-pressed', b === el ? 'true' : 'false'); });
    } else if (t.closest('#g-go')) startGame();
    else if (t.closest('#g-again')) { var k = G.k, mx = G.mix; G = { k: k, mix: mx }; setup(); }
    else if (t.closest('#g-home')) home();
    else if ((el = t.closest('.choice'))) onChoice(el);
    else if ((el = t.closest('.lt'))) onLetter(el);
    else if ((el = t.closest('.mcard'))) onCard(el);
    else if (t.closest('#fig')) onFig(e);
  });


  /* ---------- Carga de lecciones: siempre intenta bajar la última versión ---------- */
  var LKEY = KEY + '-lessons';
  function readCache() { try { return localStorage.getItem(LKEY); } catch (e) { return null; } }
  function loadLessons() {
    return new Promise(function (resolve) {
      var done = false;
      function use(txt, net) {
        if (done) return;
        try { var d = JSON.parse(txt); if (!d || !d.lessons || !d.lessons.length) return; done = true; resolve({ data: d, txt: txt, net: net }); } catch (e) {}
      }
      fetch('lessons.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.text() : Promise.reject(); })
        .then(function (t) { use(t, true); if (done) { try { localStorage.setItem(LKEY, t); } catch (e) {} } })
        .catch(function () { var c = readCache(); if (c) use(c, false); if (!done) resolve(null); });
      setTimeout(function () { if (!done) { var c = readCache(); if (c) use(c, false); } }, 4000);
    });
  }
  function boot() {
    loadLessons().then(function (r) {
      if (!r) { $('#s-map').innerHTML = '<p class="lead">Pas de leçons. Ouvre l\'app une fois avec internet.<span class="es">No hay lecciones. Abre la app una vez con internet.</span></p>'; return; }
      prep(r.data);
      var h = hashOf(r.txt);
      if (r.net) {
        if (store.lessonsHash && store.lessonsHash !== h) toast('Nouvelles leçons ! La mise à jour est terminée.');
        store.lessonsHash = h; save();
      }
      if (synth) { pickVoice(); synth.onvoiceschanged = checkVoiceNote; setTimeout(checkVoiceNote, 1200); } else checkVoiceNote();
      applyEs(); renderMap(); screen('map');
    });
  }
  if ('serviceWorker' in navigator) { window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); }); }
  boot();
})();
