/* Dibujos de la app: partes del cuerpo (con zonas), lección de otoño, días y números. */
(function () {
  'use strict';
  var INK = '#262a56';

  /* ---------- SVG helpers ---------- */
  function wrap(bg, inner) {
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<rect x="6" y="6" width="228" height="228" rx="42" fill="' + bg + '"/>' +
      '<g stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></svg>';
  }
  function shadow(rx) { return '<ellipse cx="120" cy="216" rx="' + rx + '" ry="8" fill="' + INK + '" opacity=".13" stroke="none"/>'; }
  function leaf(x, y, rot, color, s) {
    return '<path d="M0 -14 C11 -7 11 9 0 16 C-11 9 -11 -7 0 -14 Z" transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')" fill="' + color + '" stroke-width="4"/>';
  }
  function cloud(tx, ty, s, fill) {
    return '<path d="M30 78 C6 78 0 50 22 44 C20 20 52 10 68 28 C80 6 118 14 118 40 C146 38 152 78 124 78 Z" transform="translate(' + tx + ' ' + ty + ') scale(' + s + ')" fill="' + fill + '"/>';
  }
  function drop(x, y) {
    return '<path d="M0 -12 C8 0 10 6 0 12 C-10 6 -8 0 0 -12 Z" transform="translate(' + x + ' ' + y + ')" fill="#4fb0f5" stroke-width="4"/>';
  }
  function root(d) {
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="13"/><path d="' + d + '" fill="none" stroke="#e8c58f" stroke-width="6"/>';
  }
  function limb(d, w, col) {
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w + 6) + '"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"/>';
  }

  /* ---------- Dictée drawings ---------- */
  var POMME = shadow(70) +
    '<path d="M120 70 C150 52 192 76 190 124 C188 168 156 204 120 198 C84 204 52 168 50 124 C48 76 90 52 120 70 Z" fill="#ef5b5b"/>' +
    '<path d="M120 70 C120 56 124 44 134 36" fill="none" stroke-width="7"/>' +
    '<path d="M132 54 C148 36 172 40 178 52 C166 66 144 66 132 54 Z" fill="#3fb58a"/>' +
    '<path d="M72 112 C72 96 82 86 94 82" fill="none" stroke="#fff" stroke-width="8" opacity=".6"/>';

  var PLUIE = cloud(40, 30, 1.1, '#c9d6ee') +
    drop(78, 150) + drop(118, 174) + drop(158, 150) + drop(92, 204) + drop(142, 206) + drop(180, 186) + drop(58, 184);

  var SOURIS = shadow(78) +
    '<path d="M54 164 C20 166 14 126 38 112" fill="none" stroke="#e89aa8" stroke-width="7"/>' +
    '<ellipse cx="108" cy="152" rx="62" ry="42" fill="#b8bfd6"/>' +
    '<circle cx="150" cy="106" r="20" fill="#b8bfd6"/><circle cx="150" cy="106" r="10" fill="#ffb3c1" stroke="none"/>' +
    '<circle cx="190" cy="112" r="17" fill="#b8bfd6"/><circle cx="190" cy="112" r="8" fill="#ffb3c1" stroke="none"/>' +
    '<ellipse cx="162" cy="140" rx="36" ry="28" fill="#b8bfd6"/>' +
    '<circle cx="176" cy="134" r="5" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="196" cy="148" r="6.5" fill="#ff8aa0"/>' +
    '<path d="M180 150 L214 142 M180 156 L214 160" fill="none" stroke-width="3"/>' +
    '<ellipse cx="92" cy="194" rx="12" ry="7" fill="#ffb3c1"/><ellipse cx="132" cy="194" rx="12" ry="7" fill="#ffb3c1"/>';

  var ARBRE = shadow(80) +
    '<path d="M104 214 L108 128 L134 128 L138 214 Z" fill="#9a6a3c"/>' +
    '<path d="M120 26 C150 12 188 38 180 72 C206 86 200 128 168 130 C150 142 90 142 72 130 C40 128 34 88 60 72 C52 38 90 12 120 26 Z" fill="#f08a3c"/>' +
    '<path d="M104 70 C110 86 100 98 112 108 M148 84 C140 98 152 108 144 118" fill="none" stroke-width="4" opacity=".5"/>' +
    leaf(44, 170, -30, '#ef5b5b', 1) + leaf(194, 176, 40, '#ffc940', 1) + leaf(176, 204, -10, '#f08a3c', .8);

  var FEUILLE = shadow(60) +
    '<path d="M62 190 C40 110 90 50 188 44 C194 140 142 196 62 190 Z" fill="#f08a3c"/>' +
    '<path d="M62 190 C104 140 142 100 182 50" fill="none" stroke-width="5"/>' +
    '<path d="M98 152 L126 156 M116 128 L146 128 M136 104 L160 98 M96 160 L108 180 M120 138 L128 160" fill="none" stroke-width="3.5"/>' +
    '<path d="M62 190 L38 216" fill="none" stroke-width="8"/>';

  var PARAPLUIE = '<path d="M30 120 C30 56 210 56 210 120 C196 104 180 104 168 120 C156 104 132 104 120 120 C108 104 84 104 72 120 C60 104 44 104 30 120 Z" fill="#ef5b5b"/>' +
    '<path d="M120 62 C90 70 72 96 72 120 C84 104 108 104 120 120 Z" fill="#ffc940"/>' +
    '<path d="M120 62 C150 70 168 96 168 120 C156 104 132 104 120 120 Z" fill="#ffc940"/>' +
    '<path d="M120 62 L120 46" fill="none" stroke-width="7"/>' +
    '<path d="M120 120 L120 190 C120 214 152 214 152 190" fill="none" stroke-width="9"/>' +
    drop(44, 160) + drop(196, 156) + drop(66, 196) + drop(184, 202);

  var BRANCHE = limb('M20 204 C80 178 134 140 216 66', 11, '#9a6a3c') +
    limb('M92 168 C104 136 118 120 138 112', 7, '#9a6a3c') +
    limb('M140 134 C152 150 178 152 198 142', 7, '#9a6a3c') +
    limb('M62 186 C56 164 60 150 72 138', 6, '#9a6a3c') +
    leaf(142, 106, 20, '#f08a3c', 1.2) + leaf(204, 140, 100, '#ef5b5b', 1.1) + leaf(74, 130, -20, '#ffc940', 1.1) +
    leaf(204, 70, 40, '#f08a3c', 1.2) + leaf(172, 92, 30, '#ffc940', 1);

  var HIBOU = limb('M14 202 H226', 10, '#9a6a3c') +
    '<path d="M66 118 C48 152 62 184 84 192 L88 126 Z" fill="#7d5430"/>' +
    '<path d="M174 118 C192 152 178 184 156 192 L152 126 Z" fill="#7d5430"/>' +
    '<ellipse cx="120" cy="132" rx="52" ry="66" fill="#9a6a3c"/>' +
    '<path d="M80 80 L70 48 L104 68 Z" fill="#9a6a3c"/><path d="M160 80 L170 48 L136 68 Z" fill="#9a6a3c"/>' +
    '<ellipse cx="120" cy="154" rx="32" ry="40" fill="#f3d6a8"/>' +
    '<path d="M104 140 l6 6 l6 -6 M124 140 l6 6 l6 -6 M112 160 l6 6 l6 -6 M104 178 l6 6 l6 -6 M124 178 l6 6 l6 -6" fill="none" stroke-width="3"/>' +
    '<circle cx="98" cy="102" r="19" fill="#fff"/><circle cx="142" cy="102" r="19" fill="#fff"/>' +
    '<circle cx="100" cy="104" r="8.5" fill="' + INK + '" stroke="none"/><circle cx="140" cy="104" r="8.5" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="103" cy="101" r="2.6" fill="#fff" stroke="none"/><circle cx="143" cy="101" r="2.6" fill="#fff" stroke="none"/>' +
    '<path d="M112 116 L128 116 L120 132 Z" fill="#ffc940"/>' +
    '<ellipse cx="104" cy="200" rx="11" ry="6" fill="#ffc940"/><ellipse cx="136" cy="200" rx="11" ry="6" fill="#ffc940"/>';

  function stalk(rot) {
    var g = '<g transform="rotate(' + rot + ' 120 214)">' +
      '<path d="M120 214 L120 60" fill="none" stroke-width="5" stroke="#b8902e"/>';
    for (var i = 0; i < 5; i++) {
      var y = 76 + i * 17;
      g += '<ellipse cx="110" cy="' + y + '" rx="6.5" ry="11" transform="rotate(-28 110 ' + y + ')" fill="#f2c14e" stroke-width="3.5"/>' +
           '<ellipse cx="130" cy="' + y + '" rx="6.5" ry="11" transform="rotate(28 130 ' + y + ')" fill="#f2c14e" stroke-width="3.5"/>';
    }
    return g + '<ellipse cx="120" cy="52" rx="6.5" ry="13" fill="#f2c14e" stroke-width="3.5"/></g>';
  }
  var BLE = shadow(60) + stalk(-18) + stalk(18) + stalk(0);

  var NUAGE = cloud(22, 52, 1.35, '#ffffff') + cloud(150, 150, .5, '#ffffff') +
    '<circle cx="88" cy="124" r="4" fill="' + INK + '" stroke="none"/><circle cx="126" cy="124" r="4" fill="' + INK + '" stroke="none"/>' +
    '<path d="M98 136 Q107 146 116 136" fill="none" stroke-width="4"/>' +
    '<circle cx="74" cy="134" r="5.5" fill="#ffb3c1" stroke="none" opacity=".8"/><circle cx="140" cy="134" r="5.5" fill="#ffb3c1" stroke="none" opacity=".8"/>';

  var RACINES = '<path d="M6 120 H234 V192 Q234 234 192 234 H48 Q6 234 6 192 Z" fill="#8a5a33" stroke="none"/>' +
    '<path d="M6 120 H234 V130 H6 Z" fill="#55bf7a" stroke="none"/>' +
    '<path d="M106 122 L108 80 L134 80 L136 122 Z" fill="#b9803f"/>' +
    '<path d="M120 14 C146 6 176 28 170 52 C186 64 178 84 156 84 H84 C62 84 54 64 70 52 C64 28 94 6 120 14 Z" fill="#f08a3c"/>' +
    root('M121 126 C121 150 118 172 112 202') + root('M118 142 C98 150 80 156 62 176') + root('M122 140 C142 150 162 156 180 174') +
    root('M114 176 C100 184 92 198 88 218') + root('M116 170 C130 186 140 200 146 220') + root('M62 176 C54 184 50 194 48 206');

  var DICTEE = [
    { art: 'une', noun: 'pomme', es: 'manzana', svg: wrap('#ffe1e1', POMME), alt: 'Une pomme rouge' },
    { art: 'la', noun: 'pluie', es: 'lluvia', svg: wrap('#dff1ff', PLUIE), alt: 'Un nuage gris avec de la pluie' },
    { art: 'une', noun: 'souris', es: 'ratón', svg: wrap('#ececf6', SOURIS), alt: 'Une souris grise' },
    { art: 'un', noun: 'arbre', es: 'árbol', svg: wrap('#fff0c2', ARBRE), alt: "Un arbre d'automne" },
    { art: 'une', noun: 'feuille', es: 'hoja', svg: wrap('#ffe9d2', FEUILLE), alt: 'Une feuille orange' },
    { art: 'un', noun: 'parapluie', es: 'paraguas', svg: wrap('#e3f2ff', PARAPLUIE), alt: 'Un parapluie rouge et jaune sous la pluie' },
    { art: 'une', noun: 'branche', es: 'rama', svg: wrap('#e4f5e8', BRANCHE), alt: 'Une branche avec des feuilles' },
    { art: 'un', noun: 'hibou', es: 'búho', svg: wrap('#efe3ff', HIBOU), alt: 'Un hibou sur une branche' },
    { art: 'du', noun: 'blé', es: 'trigo', svg: wrap('#fff4d1', BLE), alt: 'Des épis de blé' },
    { art: 'un', noun: 'nuage', es: 'nube', svg: wrap('#d6ecff', NUAGE), alt: 'Un nuage blanc qui sourit' },
    { art: 'des', noun: 'racines', es: 'raíces', svg: wrap('#e4f1ff', RACINES), alt: "Un arbre et ses racines sous la terre" }
  ];

  /* ---------- Jours ---------- */
  function rays(cx, cy, r1, r2) {
    var s = '';
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4;
      s += '<path d="M' + (cx + Math.cos(a) * r1).toFixed(1) + ' ' + (cy + Math.sin(a) * r1).toFixed(1) + ' L' +
        (cx + Math.cos(a) * r2).toFixed(1) + ' ' + (cy + Math.sin(a) * r2).toFixed(1) + '" fill="none" stroke="#e0a800" stroke-width="6"/>';
    }
    return s;
  }
  var SYM = [
    '<path d="M138 114 A42 42 0 1 0 138 182 A34 34 0 0 1 138 114 Z" fill="#ffd45a"/><path d="M150 128 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill="#ffd45a" stroke-width="3"/>',
    '<circle cx="120" cy="148" r="36" fill="#e5584a"/><circle cx="106" cy="138" r="7" fill="#c4412f" stroke-width="3"/><circle cx="134" cy="160" r="9" fill="#c4412f" stroke-width="3"/><circle cx="132" cy="132" r="4" fill="#c4412f" stroke-width="2"/>',
    '<circle cx="120" cy="148" r="28" fill="#9aa3b8"/><circle cx="110" cy="140" r="6" fill="#7d869c" stroke-width="3"/><circle cx="130" cy="156" r="7" fill="#7d869c" stroke-width="3"/><circle cx="128" cy="134" r="3.5" fill="#7d869c" stroke-width="2"/>',
    '<circle cx="120" cy="148" r="42" fill="#f0b470"/><path d="M88 132 H152" fill="none" stroke="#c97c3c" stroke-width="7"/><path d="M82 156 H158" fill="none" stroke="#c97c3c" stroke-width="6"/><ellipse cx="140" cy="168" rx="9" ry="6" fill="#e5584a" stroke-width="3"/>',
    '<circle cx="120" cy="148" r="34" fill="#ffe08a"/><path d="M150 112 L153 120 L161 123 L153 126 L150 134 L147 126 L139 123 L147 120 Z" fill="#fff" stroke-width="3"/><path d="M100 138 C103 128 111 122 120 120" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/>',
    '<circle cx="120" cy="148" r="38" fill="#fff"/><polygon points="120,134 133.3,143.7 128.2,159.3 111.8,159.3 106.7,143.7" fill="' + INK + '" stroke-width="3"/><path d="M120 134 V110 M133.3 143.7 L156.1 136.3 M128.2 159.3 L142.3 178.7 M111.8 159.3 L97.7 178.7 M106.7 143.7 L83.9 136.3" fill="none" stroke-width="3.5"/>',
    '<circle cx="120" cy="148" r="24" fill="#ffc940"/>' + rays(120, 148, 32, 46)
  ];
  var DAYDEF = [
    { w: 'lundi', es: 'lunes', band: '#5b7cf0', bg: '#e3e9ff', tag: 'le jour de la Lune', tagEs: 'el día de la Luna' },
    { w: 'mardi', es: 'martes', band: '#ef5b5b', bg: '#ffe1e1', tag: 'le jour de Mars', tagEs: 'el día de Marte' },
    { w: 'mercredi', es: 'miércoles', band: '#3fb58a', bg: '#d9f5ea', tag: 'le jour de Mercure', tagEs: 'el día de Mercurio' },
    { w: 'jeudi', es: 'jueves', band: '#ff9a3d', bg: '#ffe9d2', tag: 'le jour de Jupiter', tagEs: 'el día de Júpiter' },
    { w: 'vendredi', es: 'viernes', band: '#a06bf0', bg: '#efe3ff', tag: 'le jour de Vénus', tagEs: 'el día de Venus' },
    { w: 'samedi', es: 'sábado', band: '#f06aa8', bg: '#ffe3f0', tag: 'le week-end !', tagEs: 'fin de semana' },
    { w: 'dimanche', es: 'domingo', band: '#e0a800', bg: '#fff4d1', tag: 'le week-end !', tagEs: 'fin de semana' }
  ];
  var JOURS = DAYDEF.map(function (d, i) {
    var cal = '<rect x="40" y="34" width="160" height="176" rx="18" fill="#fff"/>' +
      '<path d="M40 52 a18 18 0 0 1 18 -18 H182 a18 18 0 0 1 18 18 V86 H40 Z" fill="' + d.band + '"/>' +
      '<circle cx="80" cy="34" r="7" fill="#fff" stroke-width="4"/><circle cx="160" cy="34" r="7" fill="#fff" stroke-width="4"/>' +
      '<path d="M62 62 H118" fill="none" stroke="#fff" stroke-width="7" opacity=".8"/>';
    return { word: d.w, es: d.es, tag: d.tag, tagEs: d.tagEs, svg: wrap(d.bg, cal + SYM[i]), alt: 'Une page de calendrier pour ' + d.w };
  });

  /* ---------- Nombres 41 à 60 ---------- */
  var NW = {
    1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf'
  };
  function numWord(n) {
    var t = Math.floor(n / 10), u = n % 10;
    var base = t === 4 ? 'quarante' : t === 5 ? 'cinquante' : 'soixante';
    if (u === 0) return base;
    if (u === 1) return base + '-et-un';
    return base + '-' + NW[u];
  }
  function numSVG(n) {
    var t = Math.floor(n / 10), u = n % 10, step = 25, cstep = 20, cols = u >= 3 ? 3 : u;
    var rodsW = t * step - (step - 20), unitsW = u ? cols * cstep - (cstep - 16) : 0, gap = u ? 22 : 0;
    var x0 = (240 - (rodsW + gap + unitsW)) / 2, s = '', i, k;
    for (i = 0; i < t; i++) {
      var x = x0 + i * step;
      s += '<rect x="' + x + '" y="54" width="20" height="130" rx="5" fill="#4f6df5" stroke-width="3"/>';
      for (k = 1; k < 10; k++) s += '<path d="M' + x + ' ' + (54 + k * 13) + ' H' + (x + 20) + '" stroke="#fff" stroke-width="2" opacity=".55"/>';
    }
    var ux = x0 + rodsW + gap;
    for (i = 0; i < u; i++) {
      s += '<rect x="' + (ux + (i % 3) * cstep) + '" y="' + (54 + Math.floor(i / 3) * cstep) + '" width="16" height="16" rx="3" fill="#ffc940" stroke-width="3"/>';
    }
    return wrap('#e3f7ee', s);
  }
  var NOMBRES = [];

  /* ---------- Mots pages 8 et 9 ---------- */
  var P8 = [
    ['un', 'gland', 'bellota'], ['une', 'poire', 'pera'], ['un', 'écureuil', 'ardilla'], ['une', 'noix', 'nuez'],
    ['une', 'citrouille', 'calabaza'], ['une', 'pomme', 'manzana'], ['une', 'feuille', 'hoja'], ['un', 'arbre', 'árbol'],
    ['du', 'maïs', 'maíz'], ['la', 'pluie', 'lluvia'], ['un', 'champignon', 'hongo'], ['une', 'tarte', 'tarta'],
    ['un', 'parapluie', 'paraguas'], ['une', 'souris', 'ratón'], ['un', 'râteau', 'rastrillo'], ['le', 'tronc', 'tronco'],
    ['une', 'branche', 'rama'], ['des', 'raisins', 'uvas'], ['un', 'épouvantail', 'espantapájaros'], ['des', 'bottes de pluie', 'botas de lluvia']
  ];
  var P9 = [
    ['des', 'racines', 'raíces'], ['une', 'châtaigne', 'castaña'], ['une', 'école', 'escuela'], ['une', 'récolte', 'cosecha'],
    ['un', 'imperméable', 'impermeable'], ['une', 'dinde', 'pavo'], ['un', 'chandail', 'suéter'], ['un', 'nuage', 'nube'],
    ['une', 'brouette', 'carretilla'], ['un', 'hibou', 'búho'], ['un', 'tournesol', 'girasol'], ['du', 'foin', 'heno'],
    ['une', 'barrière', 'cerca'], ['un', 'tas de feuilles', 'montón de hojas'], ['du', 'blé', 'trigo'], ['une', 'chauve-souris', 'murciélago'],
    ['une', 'grange', 'granero'], ['une', 'courge', 'calabaza']
  ];
  function pageSVG(page, row, col) {
    var s = '<rect x="30" y="16" width="180" height="208" rx="14" fill="#fff"/>' +
      '<text x="120" y="45" text-anchor="middle" font-family="Grandstander, Andika, sans-serif" font-size="22" font-weight="800" fill="' + INK + '" stroke="none">Page ' + page + '</text>';
    for (var r = 0; r < 5; r++) {
      for (var c = 0; c < 4; c++) {
        var x = 39 + c * 42, y = 56 + r * 33, hit = (r === row && c === col);
        var empty = page === 9 && r === 4 && c > 1;
        s += '<rect x="' + x + '" y="' + y + '" width="36" height="28" rx="7" ' +
          (hit ? 'fill="#ffc940" stroke-width="5"' : empty ? 'fill="none" stroke-width="2" stroke-dasharray="3 4" opacity=".4"' : 'fill="#eef0fb" stroke-width="2.5"') + '/>';
      }
    }
    return wrap('#e6ecff', s);
  }
  /* ---------- Dessins des mots (pages 8 et 9) ---------- */
  function hl(d) { return '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="7" opacity=".55"/>'; }
  var ART = {};
  ART['gland'] = wrap('#fff0d6', shadow(50) +
    '<path d="M120 56 V34" fill="none" stroke-width="8"/>' +
    '<path d="M76 112 C76 168 100 204 120 210 C140 204 164 168 164 112 Z" fill="#d49a52"/>' + hl('M96 130 C96 152 102 168 110 180') +
    '<path d="M64 114 C60 70 94 54 120 54 C146 54 180 70 176 114 Z" fill="#7a4a26"/>' +
    '<path d="M88 88 L100 102 M114 76 L124 96 M144 84 L154 100 M78 104 L88 112" fill="none" stroke="#c98a45" stroke-width="3.5"/>');
  ART['poire'] = wrap('#eef7d0', shadow(56) +
    '<path d="M120 58 C140 58 146 80 152 100 C178 124 188 162 166 192 C150 214 90 214 74 192 C52 162 62 124 88 100 C94 80 100 58 120 58 Z" fill="#b9d84a"/>' + hl('M86 134 C80 152 84 170 96 184') +
    '<path d="M120 58 C120 46 124 38 132 32" fill="none" stroke-width="7"/>' +
    '<path d="M128 46 C144 30 168 34 172 46 C160 60 140 58 128 46 Z" fill="#3fb58a"/>' +
    '<circle cx="116" cy="170" r="2.5" fill="' + INK + '" stroke="none"/><circle cx="132" cy="160" r="2.5" fill="' + INK + '" stroke="none"/><circle cx="108" cy="150" r="2.5" fill="' + INK + '" stroke="none"/>');
  ART['écureuil'] = wrap('#ffe9d2', shadow(62) +
    '<path d="M86 198 C26 204 10 134 38 92 C56 66 94 70 92 98 C74 102 64 132 92 152 Z" fill="#d9803a"/>' +
    '<path d="M44 96 C52 84 68 82 78 90" fill="none" stroke="#fff0d9" stroke-width="5" opacity=".7"/>' +
    '<ellipse cx="120" cy="158" rx="40" ry="48" fill="#d9803a"/><ellipse cx="132" cy="168" rx="20" ry="32" fill="#fff0d9" stroke="none"/>' +
    '<ellipse cx="106" cy="206" rx="17" ry="8" fill="#b9652a"/><ellipse cx="144" cy="206" rx="17" ry="8" fill="#b9652a"/>' +
    '<path d="M124 82 L122 54 L142 72 Z" fill="#d9803a"/><path d="M152 74 L166 52 L172 82 Z" fill="#d9803a"/>' +
    '<circle cx="142" cy="102" r="30" fill="#d9803a"/><ellipse cx="156" cy="112" rx="16" ry="12" fill="#fff0d9" stroke="none"/>' +
    '<circle cx="152" cy="98" r="4.5" fill="' + INK + '" stroke="none"/><circle cx="170" cy="108" r="4.5" fill="' + INK + '"/>' +
    '<ellipse cx="148" cy="148" rx="11" ry="13" fill="#c98a45"/><path d="M137 143 C137 134 159 134 159 143 Z" fill="#7a4a26"/>');
  ART['noix'] = wrap('#f6ead9', shadow(66) +
    '<path d="M120 52 C172 48 198 94 188 142 C180 190 148 206 120 206 C92 206 60 190 52 142 C42 94 68 48 120 52 Z" fill="#c4905a"/>' +
    '<path d="M120 54 C106 90 134 120 120 150 C108 176 126 190 120 206" fill="none" stroke-width="5"/>' +
    '<path d="M82 88 C92 100 92 116 84 128 M158 88 C148 100 148 116 156 128 M86 150 C96 160 98 176 92 186 M154 150 C144 160 142 176 148 186" fill="none" stroke-width="3.5" opacity=".55"/>' + hl('M74 100 C70 116 72 132 78 144'));
  ART['citrouille'] = wrap('#ffeccf', shadow(80) +
    '<ellipse cx="82" cy="142" rx="38" ry="54" fill="#f5993f"/><ellipse cx="158" cy="142" rx="38" ry="54" fill="#f5993f"/>' +
    '<ellipse cx="120" cy="140" rx="40" ry="60" fill="#f28a2e"/>' +
    '<path d="M110 84 C108 68 112 58 124 50 L138 58 C132 64 130 74 130 86 Z" fill="#4f8f3f"/>' +
    '<path d="M132 66 C156 56 168 72 156 80" fill="none" stroke="#3fb58a" stroke-width="5"/>' +
    '<path d="M120 90 V196 M96 100 C86 140 92 176 104 194 M144 100 C154 140 148 176 136 194" fill="none" stroke-width="3" opacity=".4"/>' + hl('M72 118 C66 134 68 150 74 162'));
  ART['maïs'] = wrap('#fff6cc', shadow(62) +
    '<path d="M120 28 C152 28 160 80 156 126 C152 160 140 174 120 174 C100 174 88 160 84 126 C80 80 88 28 120 28 Z" fill="#ffd23f"/>' +
    '<path d="M104 40 V170 M120 32 V174 M136 40 V170 M88 66 H152 M86 94 H154 M86 122 H154 M90 148 H150" fill="none" stroke="#e0a800" stroke-width="3"/>' +
    '<path d="M122 216 C70 216 56 150 90 108 C104 134 114 164 122 216 Z" fill="#5fb34a"/>' +
    '<path d="M118 216 C170 216 184 150 150 108 C136 134 126 164 118 216 Z" fill="#7cc75e"/>' +
    '<path d="M120 216 C100 190 100 150 120 120 C140 150 140 190 120 216 Z" fill="#4f9f3f"/>');
  ART['champignon'] = wrap('#f0e6ff', shadow(62) +
    '<path d="M96 138 C98 176 92 198 84 208 H156 C148 198 142 176 144 138 Z" fill="#fff3e0"/>' +
    '<path d="M34 142 C34 74 80 44 120 44 C160 44 206 74 206 142 C206 154 190 158 120 158 C50 158 34 154 34 142 Z" fill="#e24a4a"/>' +
    '<circle cx="82" cy="100" r="11" fill="#fff" stroke-width="3.5"/><circle cx="132" cy="78" r="13" fill="#fff" stroke-width="3.5"/>' +
    '<circle cx="170" cy="116" r="10" fill="#fff" stroke-width="3.5"/><circle cx="112" cy="128" r="8" fill="#fff" stroke-width="3.5"/><circle cx="58" cy="132" r="7" fill="#fff" stroke-width="3.5"/>');
  ART['tarte'] = wrap('#ffeedd', shadow(78) +
    '<path d="M50 160 H190 L176 204 H64 Z" fill="#c9d3f0"/>' +
    '<path d="M46 152 C46 96 194 96 194 152 Z" fill="#f0c27a"/>' +
    '<path d="M92 126 L106 140 M120 112 V138 M148 126 L134 140" fill="none" stroke-width="4.5"/>' +
    '<path d="M62 134 C66 122 76 114 86 110" fill="none" stroke="#fff" stroke-width="6" opacity=".5"/>' +
    '<rect x="38" y="146" width="164" height="16" rx="8" fill="#d99a52"/>' +
    '<path d="M70 150 V158 M92 150 V158 M114 150 V158 M136 150 V158 M158 150 V158 M180 150 V158" fill="none" stroke-width="3" opacity=".5"/>' +
    '<path d="M100 82 C90 68 110 60 100 46 M138 82 C128 68 148 60 138 46" fill="none" stroke="#8a93b8" stroke-width="5" opacity=".6"/>');
  ART['râteau'] = wrap('#eaf4dd', shadow(64) +
    limb('M120 20 V146', 9, '#9a6a3c') +
    '<rect x="50" y="142" width="140" height="16" rx="6" fill="#8a93a8"/>' +
    '<path d="M62 158 V198 M84 158 V198 M106 158 V198 M128 158 V198 M150 158 V198 M172 158 V198" fill="none" stroke="' + INK + '" stroke-width="11"/><path d="M62 158 V198 M84 158 V198 M106 158 V198 M128 158 V198 M150 158 V198 M172 158 V198" fill="none" stroke="#b8c0d6" stroke-width="5"/>' +
    leaf(76, 210, -50, '#e8574f', 1) + leaf(112, 212, 30, '#ffc933', 1) + leaf(152, 211, -20, '#f08a3c', 1) + leaf(188, 210, 60, '#e8574f', .9));
  ART['tronc'] = wrap('#f1e6d6', shadow(70) +
    '<path d="M72 212 C86 172 80 120 74 62 H166 C160 120 154 172 168 212 Z" fill="#9a6a3c"/>' +
    '<path d="M96 88 V122 M120 92 V158 M144 88 V126 M104 150 V190 M136 154 V190" fill="none" stroke="#6e4524" stroke-width="3.5"/>' +
    '<ellipse cx="120" cy="62" rx="48" ry="15" fill="#e0b57a"/><ellipse cx="120" cy="62" rx="32" ry="9" fill="none" stroke-width="3"/><ellipse cx="120" cy="62" rx="16" ry="4.5" fill="none" stroke-width="3"/>' +
    '<path d="M74 190 C60 196 50 200 44 206 M166 190 C180 196 190 200 196 206" fill="none" stroke-width="5"/>');
  (function () {
    var cols = [[96, 78], [128, 78], [160, 78], [80, 104], [112, 104], [144, 104], [176, 104], [96, 130], [128, 130], [160, 130], [112, 156], [144, 156], [128, 182]], g = '';
    g += '<path d="M118 60 C118 48 114 40 108 32" fill="none" stroke-width="7"/>';
    cols.forEach(function (c, i) { g += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="18" fill="' + (i % 2 ? '#7a3fb8' : '#8a4fc4') + '" stroke-width="4"/>'; });
    cols.forEach(function (c) { g += '<circle cx="' + (c[0] - 6) + '" cy="' + (c[1] - 6) + '" r="3.5" fill="#fff" stroke="none" opacity=".7"/>'; });
    g += '<path d="M122 62 C138 36 172 36 184 52 C176 72 148 78 122 62 Z" fill="#3fb58a"/>';
    ART['raisins'] = wrap('#eee0ff', g);
  })();
  ART['épouvantail'] = wrap('#fff1d0', shadow(60) +
    limb('M120 90 V214', 8, '#9a6a3c') + limb('M44 126 H196', 8, '#9a6a3c') +
    '<path d="M86 172 H154 L150 214 H126 V190 H114 V214 H90 Z" fill="#3a56e8"/>' +
    '<path d="M92 108 H148 L156 174 H84 Z" fill="#e8574f"/><path d="M104 124 H116 V136 H104 Z M126 148 H138 V160 H126 Z" fill="#ffc933" stroke-width="3"/>' +
    '<path d="M44 126 L28 112 M44 126 L26 128 M44 126 L30 142 M196 126 L212 112 M196 126 L214 128 M196 126 L210 142" fill="none" stroke="#e0a800" stroke-width="5"/>' +
    '<circle cx="120" cy="74" r="26" fill="#f6d9a0"/>' +
    '<rect x="76" y="56" width="88" height="11" rx="5" fill="#7a4a26"/><path d="M92 58 C92 30 148 30 148 58 Z" fill="#7a4a26"/><path d="M94 52 H146" fill="none" stroke="#e8574f" stroke-width="6"/>' +
    '<circle cx="110" cy="76" r="3.5" fill="' + INK + '" stroke="none"/><circle cx="130" cy="76" r="3.5" fill="' + INK + '" stroke="none"/>' +
    '<path d="M106 90 L112 85 L118 90 L124 85 L130 90 L134 86" fill="none" stroke-width="3.5"/>');
  (function () {
    var boot = '<path d="M66 44 H106 V126 C108 150 150 142 158 170 C160 190 150 200 138 200 H62 C52 200 50 190 54 180 C64 164 66 150 66 126 Z" fill="#ffc933"/>' +
      '<path d="M66 60 H106" fill="none" stroke="#e8574f" stroke-width="12"/><path d="M52 190 H148" fill="none" stroke="#5a5f7a" stroke-width="10"/>' + hl('M74 74 V118');
    ART['bottes de pluie'] = wrap('#dff1ff',
      '<ellipse cx="120" cy="212" rx="92" ry="10" fill="#7cc4f8" stroke="none"/>' +
      '<g transform="translate(14 22) scale(.82)">' + boot + '</g><g transform="translate(106 22) scale(.82)">' + boot + '</g>' + drop(30, 70) + drop(214, 90));
  })();
  (function () {
    var s = '<circle cx="120" cy="116" r="46" fill="#8fb04a"/>';
    for (var a = 0; a < 360; a += 20) {
      var r = a * Math.PI / 180, x1 = (120 + 40 * Math.cos(r)).toFixed(1), y1 = (116 + 40 * Math.sin(r)).toFixed(1), x2 = (120 + 66 * Math.cos(r)).toFixed(1), y2 = (116 + 66 * Math.sin(r)).toFixed(1);
      s += '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke-width="4"/>';
    }
    s += '<circle cx="120" cy="116" r="46" fill="#8fb04a"/>' +
      '<ellipse cx="120" cy="156" rx="46" ry="38" fill="#7a3f1d"/><ellipse cx="120" cy="184" rx="26" ry="9" fill="#e0bd8a"/>' + hl('M92 140 C88 150 90 160 96 168');
    ART['châtaigne'] = wrap('#f2e8d8', '<ellipse cx="120" cy="216" rx="70" ry="8" fill="' + INK + '" opacity=".13" stroke="none"/>' + s);
  })();
  ART['école'] = wrap('#e3f0ff', shadow(90) +
    '<path d="M120 54 V16" fill="none" stroke-width="5"/><path d="M120 16 H152 L144 27 L152 38 H120 Z" fill="#3a56e8" stroke-width="4"/>' +
    '<path d="M28 108 L120 54 L212 108 Z" fill="#a53d38"/>' +
    '<rect x="42" y="108" width="156" height="94" fill="#e8574f"/>' +
    '<rect x="56" y="124" width="30" height="26" rx="3" fill="#bfe3ff" stroke-width="4"/><rect x="154" y="124" width="30" height="26" rx="3" fill="#bfe3ff" stroke-width="4"/>' +
    '<rect x="56" y="160" width="30" height="26" rx="3" fill="#bfe3ff" stroke-width="4"/><rect x="154" y="160" width="30" height="26" rx="3" fill="#bfe3ff" stroke-width="4"/>' +
    '<path d="M71 124 V150 M56 137 H86 M169 124 V150 M154 137 H184 M71 160 V186 M56 173 H86 M169 160 V186 M154 173 H184" fill="none" stroke-width="2.5"/>' +
    '<path d="M102 202 V146 C102 126 138 126 138 146 V202 Z" fill="#8a5a33"/><circle cx="130" cy="170" r="3.5" fill="#ffc933" stroke-width="2.5"/>' +
    '<circle cx="120" cy="88" r="12" fill="#fff" stroke-width="4"/><path d="M120 80 V88 L126 92" fill="none" stroke-width="3.5"/>' +
    '<rect x="90" y="202" width="60" height="10" rx="3" fill="#b8bfd6" stroke-width="4"/>');
  ART['récolte'] = wrap('#fff0d9', shadow(78) +
    '<path d="M62 134 C62 56 178 56 178 134" fill="none" stroke="' + INK + '" stroke-width="14"/><path d="M62 134 C62 56 178 56 178 134" fill="none" stroke="#b57a3c" stroke-width="7"/>' +
    '<circle cx="92" cy="112" r="27" fill="#ef5b5b"/>' + hl('M76 100 C78 92 84 88 90 86') + '<path d="M92 86 C92 78 94 72 98 68" fill="none" stroke-width="5"/>' +
    '<circle cx="142" cy="106" r="29" fill="#7fc455"/><path d="M124 100 C134 108 148 108 160 96 M128 118 C140 124 152 120 162 110" fill="none" stroke-width="3" opacity=".5"/>' +
    '<path d="M168 126 L190 74 L202 80 L182 132 Z" fill="#f28a2e"/><path d="M190 74 C184 56 170 54 164 58 M194 76 C198 58 212 54 218 60 M192 74 C190 56 196 46 204 44" fill="none" stroke="#3fb58a" stroke-width="5"/>' +
    '<path d="M48 130 H192 L176 206 H64 Z" fill="#d9a45a"/><path d="M60 152 H180 M64 176 H176 M92 130 V206 M120 130 V206 M148 130 V206" fill="none" stroke-width="3" opacity=".4"/>');
  ART['imperméable'] = wrap('#e0f0ff',
    '<path d="M84 64 L52 98 L58 188 L82 186 L88 106 Z" fill="#ffc933"/><path d="M156 64 L188 98 L182 188 L158 186 L152 106 Z" fill="#ffc933"/>' +
    '<path d="M82 62 H158 L162 206 H78 Z" fill="#ffc933"/>' +
    '<path d="M90 58 C96 84 144 84 150 58 C142 40 98 40 90 58 Z" fill="#f0a800"/>' +
    '<path d="M120 76 V206" fill="none" stroke-width="4"/>' +
    '<circle cx="132" cy="108" r="5" fill="#e8574f" stroke-width="3"/><circle cx="132" cy="136" r="5" fill="#e8574f" stroke-width="3"/><circle cx="132" cy="164" r="5" fill="#e8574f" stroke-width="3"/>' +
    '<path d="M86 156 H108 V182 H86 Z" fill="#f0a800" stroke-width="4"/>' + hl('M92 96 L90 130') + drop(30, 64) + drop(208, 50) + drop(214, 150) + drop(26, 150));
  (function () {
    var f = '', cl = ['#e8574f', '#f5a623', '#3fb58a', '#3a56e8', '#e8574f', '#f5a623', '#3fb58a'];
    for (var i = 0; i < 7; i++) f += '<ellipse cx="120" cy="64" rx="17" ry="44" fill="' + cl[i] + '" transform="rotate(' + (-84 + i * 28) + ' 120 142)" stroke-width="4"/>';
    ART['dinde'] = wrap('#ffeed6', shadow(60) + '<g transform="translate(120 150) scale(.78) translate(-120 -150)">' + f + '</g>' +
      '<path d="M104 184 V210 M136 184 V210" fill="none" stroke="#f28a2e" stroke-width="7"/><path d="M92 212 H114 M126 212 H148" fill="none" stroke="#f28a2e" stroke-width="7"/>' +
      '<ellipse cx="120" cy="152" rx="48" ry="40" fill="#9a6a3c"/>' +
      '<ellipse cx="108" cy="154" rx="28" ry="19" fill="#b87a45" transform="rotate(-14 108 154)"/>' +
      '<path d="M142 142 C142 120 146 112 152 104 L168 116 C164 130 164 142 162 152 Z" fill="#9a6a3c"/>' +
      '<circle cx="158" cy="106" r="19" fill="#e9bd9b"/><path d="M174 102 L192 109 L174 116 Z" fill="#f5a623"/>' +
      '<path d="M162 118 C168 136 156 140 154 124 Z" fill="#e8574f"/><circle cx="162" cy="101" r="3.5" fill="' + INK + '" stroke="none"/>');
  })();
  ART['chandail'] = wrap('#e6f0ff',
    '<path d="M84 64 L50 100 L56 190 L82 188 L88 108 Z" fill="#e8574f"/><path d="M156 64 L190 100 L184 190 L158 188 L152 108 Z" fill="#e8574f"/>' +
    '<path d="M82 62 H158 L162 204 H78 Z" fill="#e8574f"/>' +
    '<path d="M82 112 H158 M82 140 H158 M82 168 H158" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="butt"/>' +
    '<path d="M54 160 L84 158 M186 160 L156 158 M55 178 L83 176 M185 178 L157 176" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="butt"/>' +
    '<path d="M78 196 H162" fill="none" stroke="#c0392b" stroke-width="10"/>' +
    '<path d="M96 58 C102 80 138 80 144 58 C136 44 104 44 96 58 Z" fill="#fff"/>' +
    '<path d="M102 62 C110 74 130 74 138 62" fill="none" stroke-width="3" opacity=".5"/>');
  ART['brouette'] = wrap('#e3f5e8', shadow(86) +
    leaf(84, 92, -40, '#f08a3c', 1.3) + leaf(116, 84, 15, '#ffc933', 1.4) + leaf(148, 90, 50, '#e8574f', 1.3) + leaf(170, 98, -20, '#f5a623', 1.1) +
    limb('M164 120 L218 82', 9, '#9a6a3c') + limb('M146 154 L158 206', 8, '#9a6a3c') +
    '<path d="M52 102 H180 L154 158 H82 Z" fill="#3fa56a"/>' + hl('M64 112 H100') +
    limb('M66 180 L98 152', 7, '#5a5f7a') +
    '<circle cx="66" cy="180" r="27" fill="#444b6a"/><circle cx="66" cy="180" r="11" fill="#cdd3ea" stroke-width="4"/>');
  (function () {
    var p = '', i;
    for (i = 0; i < 14; i++) p += '<ellipse cx="120" cy="50" rx="11" ry="27" fill="#ffc800" transform="rotate(' + (i * 360 / 14) + ' 120 102)" stroke-width="4"/>';
    ART['tournesol'] = wrap('#fff4cc', shadow(50) +
      limb('M120 130 V214', 10, '#3f9a4a') +
      '<path d="M120 186 C90 158 62 166 54 182 C80 198 108 196 120 186 Z" fill="#4fb35a"/><path d="M120 168 C150 142 176 150 184 166 C160 182 134 180 120 168 Z" fill="#4fb35a"/>' + p +
      '<circle cx="120" cy="102" r="31" fill="#7a4a26"/><path d="M104 92 L112 96 M128 88 L134 96 M110 112 L120 118 M130 110 L138 104 M118 96 L124 102" fill="none" stroke="#3d220f" stroke-width="3.5"/>');
  })();
  ART['foin'] = wrap('#fff6d9', shadow(88) +
    '<path d="M44 112 L72 88 H206 L178 112 Z" fill="#f8e08a"/>' +
    '<path d="M178 112 L206 88 V168 L178 192 Z" fill="#d9b042"/>' +
    '<rect x="44" y="112" width="134" height="80" fill="#f2cf63"/>' +
    '<path d="M44 136 H178 M44 162 H178 M70 98 H190" fill="none" stroke="#c99a1e" stroke-width="3" opacity=".7"/>' +
    '<path d="M80 112 V192 M142 112 V192" fill="none" stroke="#9a6a3c" stroke-width="6"/><path d="M80 112 L106 88 M142 112 L168 88" fill="none" stroke="#9a6a3c" stroke-width="5"/>' +
    '<path d="M60 112 L52 92 M100 112 L104 90 M126 112 L120 92 M160 112 L170 94 M50 192 L40 204 M110 192 L116 206 M150 192 L162 204" fill="none" stroke="#e0b73a" stroke-width="4"/>');
  ART['barrière'] = wrap('#e3f5e8',
    '<path d="M8 204 H232 V222 H8 Z" fill="#7fc455" stroke="none"/>' +
    [0, 1, 2, 3, 4].map(function (i) { var x = 30 + i * 38; return '<path d="M' + x + ' 206 V84 L' + (x + 14) + ' 64 L' + (x + 28) + ' 84 V206 Z" fill="#fff8e8"/>'; }).join('') +
    '<rect x="22" y="104" width="196" height="16" rx="5" fill="#c98a45"/><rect x="22" y="154" width="196" height="16" rx="5" fill="#c98a45"/>' +
    '<path d="M24 204 C24 192 28 188 30 184 M214 206 C214 194 218 190 220 186" fill="none" stroke="#3fb58a" stroke-width="5"/>' +
    '<circle cx="200" cy="196" r="6" fill="#ffc933" stroke-width="3"/><circle cx="48" cy="198" r="6" fill="#ef5b5b" stroke-width="3"/>');
  ART['tas de feuilles'] = wrap('#fff0dc', shadow(88) +
    leaf(150, 62, 50, '#e8574f', 1.3) + leaf(84, 48, -40, '#ffc933', 1.2) +
    '<path d="M22 210 C38 152 80 112 120 112 C160 112 202 152 218 210 Z" fill="#f08a3c"/>' +
    leaf(80, 170, -30, '#e8574f', 1.4) + leaf(120, 142, 10, '#ffc933', 1.5) + leaf(160, 176, 40, '#c0392b', 1.4) +
    leaf(100, 196, 70, '#f5a623', 1.2) + leaf(140, 200, -60, '#e8574f', 1.2) + leaf(58, 198, 20, '#ffc933', 1.1) + leaf(184, 202, -20, '#f08a3c', 1.1));
  ART['chauve-souris'] = wrap('#e6dcf7',
    '<circle cx="204" cy="40" r="4" fill="#fff" stroke="none"/><circle cx="36" cy="46" r="3" fill="#fff" stroke="none"/><circle cx="196" cy="196" r="3" fill="#fff" stroke="none"/>' +
    '<path d="M100 108 C70 66 28 78 20 112 C38 106 46 118 52 132 C62 122 76 126 82 142 C92 132 100 134 106 146 Z" fill="#7a5fb0"/>' +
    '<path d="M140 108 C170 66 212 78 220 112 C202 106 194 118 188 132 C178 122 164 126 158 142 C148 132 140 134 134 146 Z" fill="#7a5fb0"/>' +
    '<ellipse cx="120" cy="126" rx="24" ry="34" fill="#4a3a6e"/>' +
    '<path d="M104 76 L98 46 L118 68 Z" fill="#4a3a6e"/><path d="M136 76 L142 46 L122 68 Z" fill="#4a3a6e"/>' +
    '<circle cx="120" cy="92" r="22" fill="#4a3a6e"/>' +
    '<circle cx="111" cy="90" r="6" fill="#ffd23f" stroke-width="3"/><circle cx="129" cy="90" r="6" fill="#ffd23f" stroke-width="3"/>' +
    '<circle cx="112" cy="91" r="2.4" fill="' + INK + '" stroke="none"/><circle cx="128" cy="91" r="2.4" fill="' + INK + '" stroke="none"/>' +
    '<path d="M110 103 L114 112 L118 103 M122 103 L126 112 L130 103" fill="#fff" stroke-width="3"/>' +
    '<path d="M104 156 L98 178 M136 156 L142 178" fill="none" stroke-width="6"/>');
  ART['grange'] = wrap('#e3f0ff', shadow(90) +
    '<path d="M8 206 H232 V224 H8 Z" fill="#7fc455" stroke="none"/>' +
    '<path d="M40 206 V112 L70 70 H170 L200 112 V206 Z" fill="#d84a43"/>' +
    '<path d="M34 118 L68 64 H172 L206 118" fill="none" stroke="#7a2f2f" stroke-width="10"/>' +
    '<rect x="104" y="86" width="32" height="24" rx="3" fill="#ffe9a8" stroke-width="4"/><path d="M120 86 V110" fill="none" stroke-width="3"/>' +
    '<rect x="84" y="134" width="72" height="72" fill="#fff8e8" stroke-width="5"/>' +
    '<path d="M84 134 L156 206 M156 134 L84 206 M120 134 V206" fill="none" stroke-width="4"/>' +
    '<path d="M54 206 V150 M186 206 V150" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>');
  ART['courge'] = wrap('#fff3d6', shadow(60) +
    '<path d="M104 52 C98 40 106 30 120 30 C134 30 142 40 136 52 C140 82 152 102 162 128 C176 164 162 206 120 206 C78 206 64 164 78 128 C88 102 100 82 104 52 Z" fill="#e8b04a"/>' +
    '<path d="M120 62 V202 M100 96 C90 140 94 176 106 198 M140 96 C150 140 146 176 134 198" fill="none" stroke="#b9822a" stroke-width="3" opacity=".6"/>' +
    '<path d="M104 52 C98 40 106 30 120 30 C134 30 142 40 136 52 Z" fill="#7a8a3a"/>' + hl('M88 136 C82 156 86 176 96 190'));
  /* ---------- Dessins des mots: Halloween (page 10) ---------- */
  function sparkle(x, y, s, col) {
    return '<path d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + (col || '#ffd23f') + '" stroke-width="3"/>';
  }
  ART['sorcière'] = wrap('#efe3ff', shadow(62) +
    '<path d="M92 128 H148 L172 208 H68 Z" fill="#6a4aa8"/>' +
    '<path d="M96 100 C88 128 94 144 104 152 M144 100 C152 128 146 144 136 152" fill="none" stroke="#7a3f1f" stroke-width="10"/>' +
    '<circle cx="120" cy="104" r="26" fill="#f6d3b8"/>' +
    '<circle cx="110" cy="106" r="3" fill="' + INK + '" stroke="none"/><circle cx="130" cy="106" r="3" fill="' + INK + '" stroke="none"/>' +
    '<path d="M110 117 Q120 125 130 117" fill="none" stroke-width="3.5"/>' +
    '<path d="M98 132 L142 132" fill="none" stroke="#ffc940" stroke-width="7"/>' +
    '<ellipse cx="120" cy="86" rx="50" ry="11" fill="#2f2a54"/>' +
    '<path d="M94 84 C102 58 112 38 128 16 C132 40 142 62 146 84 Z" fill="#3a3270"/>' +
    '<path d="M95 76 H145" fill="none" stroke="#ffc940" stroke-width="8"/>');
  ART['balai'] = wrap('#fff0d6', shadow(70) +
    '<g transform="rotate(-40 120 120)">' +
    '<rect x="112" y="16" width="16" height="136" rx="8" fill="#b57a3e"/>' +
    '<path d="M94 146 H146 L158 214 H82 Z" fill="#e8c35a"/>' +
    '<path d="M94 146 H146 V162 H94 Z" fill="#8a5a2b"/>' +
    '<path d="M102 176 L98 210 M114 170 L112 212 M126 170 L128 212 M138 176 L142 210" fill="none" stroke-width="3" opacity=".55"/>' +
    '</g>');
  ART['monstre'] = wrap('#e4f7e0', shadow(70) +
    '<path d="M80 72 L64 32 L102 58 Z" fill="#ffd23f"/><path d="M160 72 L176 32 L138 58 Z" fill="#ffd23f"/>' +
    '<path d="M120 52 C176 50 198 100 192 150 C188 190 164 208 120 208 C76 208 52 190 48 150 C42 100 64 50 120 52 Z" fill="#7fcf6a"/>' +
    '<circle cx="92" cy="106" r="18" fill="#fff"/><circle cx="148" cy="106" r="18" fill="#fff"/>' +
    '<circle cx="96" cy="108" r="7" fill="' + INK + '" stroke="none"/><circle cx="144" cy="108" r="7" fill="' + INK + '" stroke="none"/>' +
    '<path d="M80 148 Q120 188 160 148 Z" fill="#fff"/>' +
    '<path d="M98 154 V168 M114 160 V176 M128 160 V176 M144 154 V168" fill="none" stroke-width="3"/>' + hl('M66 120 C62 138 64 156 70 168'));
  ART['fantôme'] = wrap('#e6e9ff', shadow(60) +
    '<path d="M62 208 V112 C62 58 96 34 120 34 C144 34 178 58 178 112 V208 L158 190 L139 210 L120 190 L101 210 L82 190 Z" fill="#fff"/>' +
    '<ellipse cx="100" cy="104" rx="8" ry="12" fill="' + INK + '" stroke="none"/><ellipse cx="140" cy="104" rx="8" ry="12" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="86" cy="130" r="8" fill="#ffc2d1" stroke="none"/><circle cx="154" cy="130" r="8" fill="#ffc2d1" stroke="none"/>' +
    '<ellipse cx="120" cy="140" rx="9" ry="12" fill="' + INK + '" stroke="none"/>' + hl('M78 80 C74 96 74 110 78 124'));
  ART['araignée'] = wrap('#f1e9ff',
    '<path d="M120 10 V86" fill="none" stroke-width="3"/>' +
    '<path d="M100 120 C70 98 46 106 34 134 M98 130 C66 126 44 142 40 170 M104 142 C80 152 62 178 66 206 M112 150 C100 172 94 194 98 216" fill="none" stroke-width="6"/>' +
    '<path d="M140 120 C170 98 194 106 206 134 M142 130 C174 126 196 142 200 170 M136 142 C160 152 178 178 174 206 M128 150 C140 172 146 194 142 216" fill="none" stroke-width="6"/>' +
    '<ellipse cx="120" cy="152" rx="34" ry="40" fill="#7a5fb0"/>' +
    '<circle cx="120" cy="108" r="24" fill="#7a5fb0"/>' +
    '<circle cx="110" cy="104" r="7" fill="#fff" stroke-width="3"/><circle cx="130" cy="104" r="7" fill="#fff" stroke-width="3"/>' +
    '<circle cx="111" cy="105" r="2.6" fill="' + INK + '" stroke="none"/><circle cx="129" cy="105" r="2.6" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="120" cy="156" r="9" fill="#ff7a7a" stroke-width="3"/>');
  ART['chat noir'] = wrap('#fff0dc', shadow(64) +
    limb('M164 198 C214 198 214 140 190 122', 14, '#3b3566') +
    '<path d="M76 208 C60 152 80 112 120 112 C160 112 180 152 164 208 Z" fill="#3b3566"/>' +
    '<ellipse cx="96" cy="208" rx="16" ry="8" fill="#3b3566"/><ellipse cx="144" cy="208" rx="16" ry="8" fill="#3b3566"/>' +
    '<path d="M78 92 L74 46 L100 66 C112 62 128 62 140 66 L166 46 L162 92 C166 122 142 138 120 138 C98 138 74 122 78 92 Z" fill="#3b3566"/>' +
    '<path d="M82 62 L91 72 L82 82 Z M158 62 L149 72 L158 82 Z" fill="#ff9fb3" stroke="none"/>' +
    '<ellipse cx="102" cy="96" rx="9" ry="11" fill="#ffd23f" stroke-width="3"/><ellipse cx="138" cy="96" rx="9" ry="11" fill="#ffd23f" stroke-width="3"/>' +
    '<path d="M102 88 V104 M138 88 V104" fill="none" stroke-width="4"/>' +
    '<path d="M114 112 H126 L120 120 Z" fill="#ff9fb3" stroke-width="3"/>' +
    '<path d="M108 128 Q114 132 120 126 Q126 132 132 128" fill="none" stroke="#fff" stroke-width="3"/>' +
    '<path d="M88 116 L58 110 M88 124 L58 128 M152 116 L182 110 M152 124 L182 128" fill="none" stroke="#fff" stroke-width="3"/>');
  ART['maison hantée'] = wrap('#e6dcf7', shadow(90) +
    '<circle cx="46" cy="52" r="17" fill="#fff3b0"/>' +
    '<path d="M6 206 H234 V192 A42 42 0 0 1 192 234 H48 A42 42 0 0 1 6 192 Z" fill="#5b4a8a" stroke="none"/>' +
    '<path d="M150 206 V86 H190 V206 Z" fill="#7a5fb0"/>' +
    '<path d="M44 206 V114 H150 V206 Z" fill="#8a6fc0"/>' +
    '<path d="M34 116 L97 62 L160 116 Z" fill="#3a3270"/>' +
    '<path d="M144 88 L170 36 L196 88 Z" fill="#3a3270"/>' +
    '<rect x="62" y="130" width="22" height="28" rx="4" fill="#ffd23f" stroke-width="4"/><rect x="110" y="130" width="22" height="28" rx="4" fill="#ffd23f" stroke-width="4"/>' +
    '<rect x="160" y="104" width="20" height="26" rx="4" fill="#ffd23f" stroke-width="4"/>' +
    '<path d="M73 130 V158 M110 144 H132 M160 117 H180" fill="none" stroke-width="3"/>' +
    '<path d="M84 206 V176 C84 160 110 160 110 176 V206 Z" fill="#2f2a54"/>');
  ART['lune'] = wrap('#d9defa', shadow(70) +
    '<circle cx="120" cy="108" r="72" fill="#fff3b0"/>' +
    '<circle cx="96" cy="84" r="11" fill="#f0e18a" stroke-width="3"/><circle cx="144" cy="120" r="15" fill="#f0e18a" stroke-width="3"/><circle cx="102" cy="136" r="8" fill="#f0e18a" stroke-width="3"/>' +
    cloud(96, 140, .8, '#fff') + cloud(14, 36, .55, '#fff') +
    sparkle(200, 44, 1) + sparkle(34, 150, .8) + sparkle(204, 96, .6));
  ART['bonbon'] = wrap('#ffe1f0', shadow(70) +
    '<path d="M70 120 L22 86 V154 Z" fill="#ff9ec2"/><path d="M170 120 L218 86 V154 Z" fill="#ff9ec2"/>' +
    '<ellipse cx="120" cy="120" rx="58" ry="44" fill="#ff7aa8"/>' +
    '<path d="M88 84 C102 106 102 134 88 156 M120 76 V164 M152 84 C138 106 138 134 152 156" fill="none" stroke="#fff" stroke-width="7" opacity=".75"/>' + hl('M76 104 C72 116 74 128 80 138'));
  ART['momie'] = wrap('#ececf6', shadow(54) +
    limb('M90 120 L52 144', 18, '#f4efe2') + limb('M150 120 L188 144', 18, '#f4efe2') +
    '<rect x="88" y="168" width="28" height="42" rx="10" fill="#f4efe2"/><rect x="124" y="168" width="28" height="42" rx="10" fill="#f4efe2"/>' +
    '<rect x="86" y="102" width="68" height="84" rx="20" fill="#f4efe2"/>' +
    '<circle cx="120" cy="70" r="31" fill="#f4efe2"/>' +
    '<path d="M92 128 H148 M90 148 H150 M90 168 H150 M62 142 L74 134 M178 142 L166 134 M94 60 H146 M92 84 H148" fill="none" stroke-width="3.5"/>' +
    '<rect x="94" y="62" width="52" height="18" rx="6" fill="#2f2a54"/>' +
    '<circle cx="108" cy="71" r="5" fill="#fff" stroke="none"/><circle cx="132" cy="71" r="5" fill="#fff" stroke="none"/>' +
    '<circle cx="109" cy="72" r="2" fill="' + INK + '" stroke="none"/><circle cx="131" cy="72" r="2" fill="' + INK + '" stroke="none"/>');
  ART['cimetière'] = wrap('#e4e1f2',
    '<circle cx="200" cy="52" r="18" fill="#fff3b0"/>' +
    '<path d="M6 198 H234 V192 A42 42 0 0 1 192 234 H48 A42 42 0 0 1 6 192 Z" fill="#6b9e55" stroke="none"/>' +
    '<path d="M52 204 V112 C52 78 112 78 112 112 V204 Z" fill="#c9ccd9"/>' +
    '<path d="M128 204 V134 C128 106 180 106 180 134 V204 Z" fill="#b5b9ca"/>' +
    '<path d="M205 204 V126 M189 146 H221" fill="none" stroke="#a9adc2" stroke-width="12"/>' +
    '<text x="82" y="134" text-anchor="middle" font-family="Grandstander, Andika, sans-serif" font-size="24" font-weight="800" fill="' + INK + '" stroke="none">RIP</text>' +
    '<text x="154" y="156" text-anchor="middle" font-family="Grandstander, Andika, sans-serif" font-size="21" font-weight="800" fill="' + INK + '" stroke="none">RIP</text>' +
    '<path d="M20 198 L24 184 L30 198 M96 200 L100 188 L106 200 M214 200 L218 190 L224 200" fill="none" stroke="#3f7a3a" stroke-width="4"/>');
  ART['os'] = wrap('#f4efe2', shadow(80) +
    '<g transform="rotate(-30 120 120)">' +
    '<g stroke-width="10"><circle cx="62" cy="104" r="17"/><circle cx="62" cy="136" r="17"/><circle cx="178" cy="104" r="17"/><circle cx="178" cy="136" r="17"/><rect x="62" y="108" width="116" height="24" rx="6"/></g>' +
    '<g stroke="none" fill="#fff"><circle cx="62" cy="104" r="17"/><circle cx="62" cy="136" r="17"/><circle cx="178" cy="104" r="17"/><circle cx="178" cy="136" r="17"/><rect x="62" y="108" width="116" height="24" rx="6"/></g>' +
    '</g>');
  ART['sac'] = wrap('#fff0d6', shadow(70) +
    limb('M92 88 C90 30 150 30 148 88', 8, '#8a5a2b') +
    '<path d="M62 84 H178 L188 208 H52 Z" fill="#f2a63e"/>' +
    '<path d="M62 84 H178 V104 H62 Z" fill="#e8902a"/>' +
    '<path d="M92 130 L110 130 L101 148 Z M130 130 L148 130 L139 148 Z" fill="' + INK + '"/>' +
    '<path d="M88 166 Q120 194 152 166 L142 164 L131 174 L120 166 L109 174 L98 164 Z" fill="' + INK + '"/>' + hl('M72 120 C70 150 70 176 74 196'));
  ART['bougie'] = wrap('#fff6d9', shadow(60) +
    '<ellipse cx="120" cy="206" rx="56" ry="13" fill="#c9a24a"/>' +
    '<path d="M92 92 H148 V200 C148 210 92 210 92 200 Z" fill="#fff8e8"/>' +
    '<ellipse cx="120" cy="92" rx="28" ry="9" fill="#ffe9a8"/>' +
    '<path d="M96 96 V126 C96 136 108 136 108 126 V100 Z M132 100 V146 C132 156 144 156 144 146 V96 Z" fill="#ffe9a8" stroke-width="4"/>' +
    '<path d="M120 86 V72" fill="none" stroke-width="5"/>' +
    '<path d="M120 20 C142 44 144 66 120 74 C96 66 98 44 120 20 Z" fill="#ffb02e"/>' +
    '<path d="M120 46 C131 57 131 67 120 70 C109 67 109 57 120 46 Z" fill="#fff3b0" stroke="none"/>');
  ART['dent'] = wrap('#e0f3ff', shadow(60) +
    '<path d="M72 76 C72 50 100 44 120 54 C140 44 168 50 168 76 C168 106 156 118 154 152 C152 186 146 208 134 208 C122 208 124 162 120 162 C116 162 118 208 106 208 C94 208 88 186 86 152 C84 118 72 106 72 76 Z" fill="#fff"/>' + hl('M88 72 C86 90 92 104 96 116') +
    sparkle(196, 54, .9) + sparkle(42, 70, .7));
  ART['baguette'] = wrap('#efe3ff',
    '<g transform="rotate(40 120 120)">' +
    '<rect x="112" y="76" width="16" height="132" rx="7" fill="#3a3270"/>' +
    '<rect x="112" y="126" width="16" height="12" fill="#ffd23f"/><rect x="112" y="174" width="16" height="12" fill="#ffd23f"/>' +
    '<path d="M120 12 L132 44 L166 46 L140 66 L149 98 L120 80 L91 98 L100 66 L74 46 L108 44 Z" fill="#ffd23f"/>' +
    '</g>' + sparkle(52, 56, 1, '#ffffff') + sparkle(196, 150, .8) + sparkle(46, 150, .6));
  var DMAP = {};
  DICTEE.forEach(function (d) { DMAP[d.noun] = d.svg; });

  var SKIN = '#f6d3b8', HI = '#ffc940';
/* ---------- Dibujos del cuerpo: cada parte es una forma con su zona ---------- */
  function seg(x1, y1, x2, y2, w) {
    var cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return '<rect x="' + (cx - len / 2 - w / 2).toFixed(1) + '" y="' + (cy - w / 2).toFixed(1) + '" width="' + (len + w).toFixed(1) + '" height="' + w + '" rx="' + w / 2 + '" transform="rotate(' + ang.toFixed(1) + ' ' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ')" fill="{F}"/>';
  }
  function circ(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="{F}"/>'; }
  function ell(x, y, rx, ry) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="{F}"/>'; }
  function box(x, y, w, h, r) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="{F}"/>'; }
  function mir(fn) { return fn(false) + fn(true); }
  function X(x, m) { return m ? 240 - x : x; }

  var HAIR = '#87552f';
  var VIEWS = {
    body: [
      { z: 'torse', t: box(86, 74, 68, 80, 22) },
      { z: 'cou', t: box(110, 60, 20, 18, 6) },
      { z: 'bras', t: mir(function (m) { return seg(X(84, m), 88, X(64, m), 122, 15) + seg(X(64, m), 122, X(56, m), 158, 14); }) },
      { z: 'jambe', t: mir(function (m) { return seg(X(106, m), 156, X(104, m), 186, 22) + seg(X(104, m), 186, X(103, m), 206, 18); }) },
      { z: 'epaule', t: mir(function (m) { return circ(X(85, m), 84, 11); }) },
      { z: 'coude', t: mir(function (m) { return circ(X(64, m), 122, 9); }) },
      { z: 'poignet', t: mir(function (m) { return circ(X(56, m), 158, 8); }) },
      { z: 'main', t: mir(function (m) { return circ(X(53, m), 172, 11); }) },
      { z: 'genou', t: mir(function (m) { return circ(X(104, m), 186, 12); }) },
      { z: 'cheville', t: mir(function (m) { return circ(X(103, m), 208, 8); }) },
      { z: 'pied', t: mir(function (m) { return ell(X(96, m), 222, 17, 8); }) },
      { z: 'abdominaux', t: box(100, 98, 40, 48, 10) },
      { z: 'nombril', t: circ(120, 124, 8) },
      { z: 'tete', t: ell(120, 38, 24, 26) },
      { z: 'tete', fix: 1, t: '<path d="M96 34 C94 14 110 8 120 8 C132 8 146 14 144 34 C136 24 128 22 120 22 C110 22 102 24 96 34 Z" fill="' + HAIR + '"/>' },
      { z: 'tete', fix: 1, t: '<circle cx="111" cy="42" r="2.6" fill="' + INK + '" stroke="none"/><circle cx="129" cy="42" r="2.6" fill="' + INK + '" stroke="none"/><path d="M111 52 Q120 58 129 52" fill="none"/>' }
    ],
    back: [
      { z: 'torse', t: box(110, 60, 20, 18, 6) },
      { z: 'torse', t: mir(function (m) { return seg(X(84, m), 88, X(64, m), 122, 15) + seg(X(64, m), 122, X(56, m), 158, 14) + circ(X(53, m), 172, 11); }) },
      { z: 'torse', t: mir(function (m) { return seg(X(106, m), 156, X(104, m), 186, 22) + seg(X(104, m), 186, X(103, m), 206, 18) + ell(X(96, m), 222, 17, 8); }) },
      { z: 'dos', t: box(86, 74, 68, 80, 22) },
      { z: 'dos', fix: 1, t: '<path d="M120 80 V148 M100 98 Q110 112 118 104 M140 98 Q130 112 122 104" fill="none"/>' },
      { z: 'torse', fix: 1, t: ell(120, 38, 24, 26).replace('{F}', HAIR) }
    ],
    face: [
      { z: 'oreille', t: mir(function (m) { return ell(X(50, m), 130, 11, 19); }) },
      { z: 'visage', t: ell(120, 128, 70, 84) },
      { z: 'cheveux', fix: 1, t: '<path d="M50 118 C38 40 88 18 120 18 C152 18 202 40 190 118 C180 86 160 64 120 62 C80 64 60 86 50 118 Z" fill="' + HAIR + '"/>' },
      { z: 'front', t: ell(120, 76, 46, 13) },
      { z: 'joue', t: mir(function (m) { return circ(X(80, m), 164, 17); }) },
      { z: 'yeux', t: mir(function (m) { return ell(X(92, m), 112, 17, 12); }) },
      { z: 'yeux', fix: 1, t: mir(function (m) { return '<circle cx="' + X(92, m) + '" cy="113" r="6" fill="#3b8fe6"/><circle cx="' + X(92, m) + '" cy="113" r="2.4" fill="' + INK + '" stroke="none"/>'; }) },
      { z: 'cils', t: mir(function (m) { return '<path d="M' + X(73, m) + ' 98 Q' + X(92, m) + ' 84 ' + X(111, m) + ' 98" fill="none" stroke-width="5"/>'; }), line: 1 },
      { z: 'nez', t: '<path d="M120 122 C108 150 104 158 112 164 C118 168 122 168 128 164 C136 158 132 150 120 122 Z" fill="{F}"/>' },
      { z: 'menton', t: ell(120, 211, 26, 9) },
      { z: 'langue', t: '<path d="M106 194 C104 232 136 232 134 194 Z" fill="{F}"/>' },
      { z: 'levres', t: ell(120, 188, 32, 14) },
      { z: 'dents', t: box(99, 180, 42, 13, 4) }
    ],
    hand: [
      { z: 'poignet', t: box(90, 186, 60, 30, 12) },
      { z: 'main', t: box(82, 118, 76, 76, 20) },
      { z: 'pouce', t: seg(90, 152, 58, 116, 20) },
      { z: 'doigt', t: box(84, 60, 17, 66, 8) + box(103, 44, 17, 82, 8) + box(122, 54, 17, 72, 8) + box(141, 74, 17, 52, 8) },
      { z: 'ongles', t: box(87, 62, 11, 11, 4) + box(106, 46, 11, 11, 4) + box(125, 56, 11, 11, 4) + box(144, 76, 11, 11, 4) + '<rect x="45" y="108" width="11" height="11" rx="4" transform="rotate(-48 50 113)" fill="{F}"/>', nail: 1 }
    ],
    fist: [
      { z: 'poing', t: box(70, 80, 100, 96, 34) + box(78, 66, 20, 30, 10) + box(100, 60, 20, 34, 10) + box(122, 62, 20, 32, 10) + box(144, 70, 18, 28, 9) },
      { z: 'poing', t: '<path d="M82 118 H164 M82 140 H160" fill="none" stroke-width="3"/>', fix: 1 },
      { z: 'poing', t: seg(88, 168, 140, 150, 20) }
    ],
    foot: [
      { z: 'pied', t: ell(120, 148, 42, 62) },
      { z: 'orteils', t: circ(92, 62, 13) + circ(114, 52, 11) + circ(133, 55, 10) + circ(149, 63, 9) + circ(161, 76, 8) },
      { z: 'cheville', t: ell(120, 212, 28, 22) }
    ]
  };
  /* Zonas que se pueden tocar en cada vista (no cuentan las piezas decorativas) */
  var BAD = { torse: 1, visage: 1 };

  function figure(view, hi, hit) {
    var parts = VIEWS[view], all = hi === 'all', set = {}, s;
    (hi || []).forEach && (hi || []).forEach(function (z) { set[z] = 1; });
    s = '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect x="4" y="4" width="232" height="232" rx="40" fill="#e9f0ff"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">';
    parts.forEach(function (p) {
      var lit = all || set[p.z], fill = SKIN;
      if (p.z === 'dents') fill = '#fff'; else if (p.z === 'langue') fill = '#ef6a7a'; else if (p.z === 'levres') fill = '#ee7c88'; else if (p.z === 'ongles') fill = '#ffb8c4'; else if (p.z === 'joue') fill = '#f8bdb0';
      if (lit && !p.fix) fill = HI;
      var m = p.t.replace(/\{F\}/g, fill);
      if (p.line) m = m.replace(/stroke-width="5"/g, 'stroke-width="5" stroke="' + (lit ? '#c98a00' : INK) + '"');
      s += hit ? '<g data-z="' + p.z + '">' + m + '</g>' : m;
    });
    return s + '</g></svg>';
  }

  var U = { 1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf' };
  var TEEN = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  function numWord(n) {
    if (n === 100) return 'cent';
    var t = Math.floor(n / 10), u = n % 10;
    if (n === 80) return 'quatre-vingts';
    if (t === 8) return 'quatre-vingt-' + U[u];
    if (t === 9) return 'quatre-vingt-' + TEEN[u];
    if (t === 4) return 'quarante' + (u === 1 ? '-et-un' : u ? '-' + U[u] : '');
    if (t === 5) return 'cinquante' + (u === 1 ? '-et-un' : u ? '-' + U[u] : '');
    if (t === 6) return 'soixante' + (u === 1 ? '-et-un' : u ? '-' + U[u] : '');
    return 'soixante-' + (u === 1 ? 'et-' : '') + TEEN[u];
  }
  function numSVG(n) {
    var t = Math.floor(n / 10), u = n % 10, step = t > 7 ? 15 : t > 6 ? 19 : 25, rw = t > 7 ? 11 : t > 6 ? 15 : 20, cs = 20, cols = u >= 3 ? 3 : u;
    if (n === 80) { t = 8; u = 0; cols = 0; }
    var rodsW = t * step - (step - rw), unitsW = u ? cols * cs - (cs - 16) : 0, gap = u ? 18 : 0;
    var x0 = (240 - (rodsW + gap + unitsW)) / 2, s = '', i, k;
    for (i = 0; i < t; i++) {
      var x = x0 + i * step;
      s += '<rect x="' + x + '" y="54" width="' + rw + '" height="130" rx="5" fill="#4f6df5" stroke="' + INK + '" stroke-width="3"/>';
      for (k = 1; k < 10; k++) s += '<path d="M' + x + ' ' + (54 + k * 13) + ' H' + (x + rw) + '" stroke="#fff" stroke-width="2" opacity=".55"/>';
    }
    var ux = x0 + rodsW + gap;
    for (i = 0; i < u; i++) s += '<rect x="' + (ux + (i % 3) * cs) + '" y="' + (54 + Math.floor(i / 3) * cs) + '" width="16" height="16" rx="3" fill="#ffc940" stroke="' + INK + '" stroke-width="3"/>';
    return '<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect x="4" y="4" width="232" height="232" rx="40" fill="#e3f7ee"/>' + s + '</svg>';
  }
  
  var BODYVIEWS = { body: 1, face: 1, hand: 1, foot: 1 };
  function parse(pic) { var p = String(pic || '').split(':'); return { kind: p[0], a: p[1], b: p[2] }; }
  /* Devuelve { svg, tap: {view, zone}|null } para la clave de dibujo de una palabra */
  function resolve(pic, word) {
    var p = parse(pic);
    if (p.kind === 'body') {
      var zones = p.b === 'all' ? 'all' : String(p.b).split(',');
      return { svg: figure(p.a, zones, false), tap: (BODYVIEWS[p.a] && p.b !== 'all') ? { view: p.a, zone: zones[0] } : null };
    }
    if (p.kind === 'art') return { svg: ART[p.a] || DMAP[p.a] || fallback(word), tap: null };
    if (p.kind === 'day') return { svg: JOURS[+p.a].svg, tap: null };
    return { svg: fallback(word), tap: null };
  }
  function fallback(w) {
    var t = (w && w.noun ? w.noun : '?').charAt(0).toUpperCase();
    return wrap('#e6ecff', '<text x="120" y="152" text-anchor="middle" font-family="Grandstander, Andika, sans-serif" font-size="110" font-weight="800" fill="' + INK + '" stroke="none">' + t + '</text>');
  }
  window.PICS = { resolve: resolve, figure: figure, numWord: numWord, numSVG: numSVG, jours: JOURS };
})();
