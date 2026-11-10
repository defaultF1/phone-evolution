/* Ink sketches of each phone, drawn as SVG on a 300 x 300 plate.
   These are stylised illustrations of the form factor, not exact product drawings. */
(function () {
  'use strict';

  var S = function (w) { return 'fill="var(--paper-hi)" stroke="currentColor" stroke-width="' + (w || 2.2) + '" stroke-linejoin="round" stroke-linecap="round"'; };
  var N = function (w) { return 'fill="none" stroke="currentColor" stroke-width="' + (w || 1.5) + '" stroke-linejoin="round" stroke-linecap="round"'; };
  var D = 'fill="currentColor" stroke="none"';
  var H = 'fill="url(#hatch)" stroke="none"';
  var X = 'fill="url(#xhatch)" stroke="none"';
  var T = 'fill="url(#dots)" stroke="none"';

  var f = function (n) { return Math.round(n * 10) / 10; };
  var rect = function (x, y, w, h, r, a) { return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(r || 0) + '" ' + (a || S()) + '/>'; };
  var circ = function (x, y, r, a) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" ' + (a || S()) + '/>'; };
  var ell = function (x, y, rx, ry, a) { return '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" ' + (a || S()) + '/>'; };
  var path = function (d, a) { return '<path d="' + d + '" ' + (a || S()) + '/>'; };
  var ln = function (x1, y1, x2, y2, w) { return '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" ' + N(w) + '/>'; };
  var shadow = function (cx, rx) { return ell(cx, 277, rx, 6, X); };

  function keys(x, y, cols, rows, dx, dy, w, h, r, a) {
    var s = '';
    for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) s += rect(x + i * dx, y + j * dy, w, h, r, a || S(1.3));
    return s;
  }

  function dial(cx, cy, r) {
    var s = circ(cx, cy, r) + circ(cx, cy, r * 0.4, S(1.4));
    for (var i = 0; i < 10; i++) {
      var a = (90 + i * 30) * Math.PI / 180;
      s += circ(cx + Math.cos(a) * r * 0.71, cy + Math.sin(a) * r * 0.71, Math.max(1.6, r * 0.115), S(1.2));
    }
    s += ln(cx + r * 0.5, cy + r * 0.5, cx + r * 0.84, cy + r * 0.84, 2.6);
    return s;
  }

  function handset(cx, y, w) {
    var a = cx - w / 2, b = cx + w / 2;
    return path('M' + a + ' ' + (y + 18) + ' Q' + (a - 4) + ' ' + y + ' ' + (a + 20) + ' ' + y + ' L' + (b - 20) + ' ' + y + ' Q' + (b + 4) + ' ' + y + ' ' + b + ' ' + (y + 18) +
      ' L' + (b - 2) + ' ' + (y + 36) + ' Q' + (b - 14) + ' ' + (y + 46) + ' ' + (b - 26) + ' ' + (y + 36) + ' L' + (b - 30) + ' ' + (y + 22) + ' L' + (a + 30) + ' ' + (y + 22) +
      ' L' + (a + 26) + ' ' + (y + 36) + ' Q' + (a + 14) + ' ' + (y + 46) + ' ' + (a + 2) + ' ' + (y + 36) + ' Z') +
      path('M' + (a + 30) + ' ' + (y + 22) + ' L' + (b - 30) + ' ' + (y + 22) + ' L' + (b - 30) + ' ' + (y + 15) + ' L' + (a + 30) + ' ' + (y + 15) + ' Z', H);
  }

  var draw = {};

  /* 1876: funnel, diaphragm and a cup of acidulated water */
  draw.liquid = function () {
    return shadow(150, 100) +
      rect(58, 244, 184, 20, 3) + rect(70, 234, 160, 12, 2) + rect(150, 236, 78, 8, 0, H) +
      rect(118, 108, 11, 128, 2) + rect(171, 108, 11, 128, 2) + rect(175, 112, 5, 120, 0, H) +
      path('M110 44 L190 44 L162 104 L138 104 Z') + path('M150 46 L188 46 L161 102 L150 102 Z', H) +
      ell(150, 44, 40, 9) + ell(150, 44, 30, 5.5, S(1.3)) +
      rect(104, 102, 92, 13, 3) + rect(133, 115, 34, 13, 3) +
      ln(150, 128, 150, 178, 1.6) +
      path('M130 176 L170 176 L164 208 L136 208 Z') + path('M134 190 L166 190 L164 206 L136 206 Z', T) +
      rect(141, 208, 18, 26, 2) +
      circ(84, 240, 5) + circ(216, 240, 5) +
      path('M84 240 C 62 214, 40 250, 16 258', N()) + path('M216 240 C 240 214, 262 250, 286 256', N());
  };

  /* 1877: wooden box telephone with a hand receiver beside it */
  draw.box = function () {
    return shadow(146, 112) +
      path('M52 152 L86 118 L236 118 L202 152 Z') +
      path('M202 152 L236 118 L236 222 L202 256 Z') + path('M204 154 L234 124 L234 220 L204 252 Z', H) +
      rect(52, 152, 150, 104, 3) +
      circ(127, 204, 33) + circ(127, 204, 23, S(1.6)) + circ(127, 204, 10, D) +
      circ(112, 134, 4.5) + circ(176, 134, 4.5) + ln(66, 166, 188, 166, 1) + ln(66, 244, 188, 244, 1) +
      rect(259, 176, 15, 78, 6) + rect(266, 180, 6, 70, 0, H) + rect(248, 160, 37, 18, 6) + ell(266.5, 160, 18.5, 6) +
      path('M266 254 C 262 274, 232 268, 222 276', N());
  };

  /* 1880s: magneto wall set with twin bells and a crank */
  draw.wall = function (o) {
    return shadow(150, 78) +
      rect(92, 14, 116, 260, 5) + rect(184, 18, 20, 252, 0, H) +
      rect(104, 28, 92, 82, 3) +
      circ(131, 56, 15) + circ(169, 56, 15) + circ(131, 56, 3.5, D) + circ(169, 56, 3.5, D) + ln(150, 54, 150, 76, 2) + circ(150, 79, 3.5, D) +
      ln(116, 96, 184, 96, 1) +
      path('M196 82 L220 82 L220 104', N(3.2)) + circ(220, 109, 5.5, D) +
      path('M104 92 L72 92', N(3.4)) + path('M72 92 l-5 -7 M72 92 l-5 7', N(2.4)) +
      rect(69, 84, 20, 11, 3) + path('M66 96 L92 96 L88 160 Q79 172 70 160 Z') + path('M80 98 L90 98 L87 158 L80 164 Z', H) + ell(79, 164, 15, 6.5) +
      path('M79 171 C 70 206, 96 214, 108 196', N()) +
      rect(140, 110, 20, 22, 2) + circ(150, 150, 26) + circ(150, 150, 16, S(1.6)) + circ(150, 150, 6, D) +
      rect(104, 192, 92, 76, 3) + path('M96 192 L204 192 L212 206 L88 206 Z') +
      (o.dial ? dial(150, 238, 24) : rect(152, 210, 40, 54, 0, H) + circ(120, 236, 4, D));
  };

  /* candlestick desk stand */
  draw.candlestick = function (o) {
    return shadow(150, 86) +
      path('M86 258 Q92 228 132 222 L168 222 Q208 228 214 258 Z') + path('M150 222 L168 222 Q208 228 214 258 L150 258 Z', H) +
      ell(150, 258, 64, 12) +
      (o.dial ? dial(150, 244, 17) : '') +
      rect(141, 98, 18, 126, 4) + rect(151, 102, 6, 118, 0, H) +
      circ(150, 106, 9) +
      circ(150, 72, 31) + circ(150, 72, 21, S(1.6)) + circ(150, 72, 8, D) +
      path('M141 132 L102 127', N(3.4)) + path('M102 127 l-6 -8 M102 127 l-5 9', N(2.4)) +
      rect(91, 113, 20, 11, 3) + path('M88 124 L114 124 L110 198 Q101 210 92 198 Z') + path('M102 126 L112 126 L109 196 L102 203 Z', H) + ell(101, 202, 16, 7) +
      path('M101 210 C 96 244, 62 240, 54 272', N());
  };

  /* desk sets: pedestal (1927), classic (1937), round (1949), princess (1959); rotary or keys */
  draw.desk = function (o) {
    var st = o.style || 'classic', s = shadow(150, 112), dc, r = 40;
    if (st === 'pedestal') {
      s += path('M80 258 Q86 222 150 218 Q214 222 220 258 Z') + path('M150 218 Q214 222 220 258 L150 258 Z', H) + ell(150, 258, 70, 13) +
        rect(139, 158, 22, 62, 4) + path('M102 146 L198 146 L188 164 L112 164 Z') + handset(150, 104, 184);
      dc = [150, 242]; r = 19;
    } else if (st === 'princess') {
      s += path('M36 244 Q36 192 150 192 Q264 192 264 244 Q264 268 150 268 Q36 268 36 244 Z') + path('M150 192 Q264 192 264 244 Q264 268 150 268 Z', H) +
        handset(150, 146, 212);
      dc = [150, 232]; r = 27;
    } else if (st === 'round') {
      s += path('M54 264 Q56 196 98 172 Q150 152 202 172 Q244 196 246 264 Z') + path('M150 158 Q202 162 222 184 Q244 206 246 264 L196 264 Q196 200 150 158 Z', H) +
        rect(88, 150, 28, 22, 6) + rect(184, 150, 28, 22, 6) + handset(150, 112, 204);
      dc = [150, 218]; r = 38;
    } else {
      s += path('M70 264 L85 172 Q89 152 112 150 L188 150 Q211 152 215 172 L230 264 Z') + path('M188 150 Q211 152 215 172 L230 264 L196 264 L184 150 Z', H) +
        rect(90, 132, 28, 21, 5) + rect(182, 132, 28, 21, 5) + handset(150, 96, 204);
      dc = [150, 210]; r = 40;
    }
    if (o.dial === 'keys') s += rect(dc[0] - 36, dc[1] - 40, 72, 80, 6, S(1.5)) + keys(dc[0] - 29, dc[1] - 33, 3, 4, 21, 17.5, 16, 12.5, 3);
    else s += dial(dc[0], dc[1], r);
    return s + path('M62 256 C 40 250, 30 272, 12 268', N());
  };

  /* 1950s: one-piece "cobra" phone */
  draw.ericofon = function () {
    return shadow(150, 72) +
      path('M94 264 Q90 200 122 150 Q139 120 137 82 Q135 44 170 40 Q201 38 205 62 Q207 77 191 81 Q177 85 179 110 Q184 172 206 264 Z') +
      path('M179 110 Q184 172 206 264 L170 264 Q170 172 158 108 Q160 84 178 80 Q177 92 179 110 Z', H) +
      ell(190, 61, 9, 13, S(1.5)) + circ(190, 61, 3, D) +
      ell(150, 264, 56, 9) + ell(150, 264, 36, 4.5, S(1.2));
  };

  /* 1965: dial moves into the handset */
  draw.trimline = function () {
    return shadow(150, 96) +
      path('M68 264 Q64 214 96 208 L204 208 Q236 214 232 264 Z') + path('M150 208 L204 208 Q236 214 232 264 L150 264 Z', H) +
      '<g transform="rotate(-13 150 158)">' +
      rect(46, 128, 208, 58, 28) + rect(150, 160, 96, 22, 11, H) +
      dial(150, 157, 22) +
      circ(80, 157, 14, S(1.4)) + circ(80, 157, 8, T) + circ(220, 157, 14, S(1.4)) + circ(220, 157, 8, T) +
      '</g>' +
      path('M70 256 C 44 250, 34 272, 14 268', N());
  };

  /* car telephone: trunk transceiver, control head, handset */
  draw.carphone = function (o) {
    var g = '';
    for (var i = 0; i < 5; i++) g += ln(56, 190 + i * 11, 150, 190 + i * 11, 1.2);
    return shadow(150, 124) +
      path('M236 172 L264 36', N(2)) + circ(264, 34, 3.2, D) +
      rect(38, 170, 224, 94, 6) + rect(192, 174, 66, 86, 3, H) + g + circ(172, 218, 9, S(1.5)) + circ(172, 218, 2.5, D) +
      rect(82, 104, 136, 64, 8) +
      (o.keys ? keys(113, 114, 4, 3, 19, 16, 14, 11, 2, S(1.2)) : dial(150, 136, 25)) +
      handset(150, 62, 192) +
      path('M60 100 q-13 5 0 11 q13 5 0 11 q-13 5 0 11 q13 5 0 11 q-13 5 0 11 q11 6 -8 18', N(1.6));
  };

  /* handheld "brick" */
  draw.brick = function (o) {
    var tall = o.slim ? 168 : 196, y = 266 - tall, ant = o.slim ? 40 : 58, rows = o.proto ? 4 : (o.slim ? 5 : 7);
    return shadow(162, 66) +
      rect(116, y - ant, 13, ant + 6, 6) + rect(122, y - ant + 4, 5, ant - 4, 0, H) +
      path('M180 ' + y + ' L206 ' + (y - 12) + ' L206 ' + (252) + ' L180 266 Z') + path('M182 ' + (y + 2) + ' L204 ' + (y - 8) + ' L204 250 L182 262 Z', H) +
      path('M108 ' + y + ' L134 ' + (y - 12) + ' L206 ' + (y - 12) + ' L180 ' + y + ' Z') +
      rect(108, y, 72, tall, 6) +
      ln(128, y + 12, 160, y + 12, 1.6) + ln(128, y + 18, 160, y + 18, 1.6) + ln(128, y + 24, 160, y + 24, 1.6) +
      (o.proto ? '' : rect(120, y + 34, 48, 15, 2, S(1.5)) + rect(123, y + 37, 42, 9, 1, T)) +
      keys(119, y + (o.proto ? 44 : 58), 3, rows, 17.5, o.proto ? 26 : 17, 13, o.proto ? 16 : 11, 2.5) +
      ln(134, 256, 154, 256, 1.6);
  };

  /* flip phones: microtac, startac, razr */
  draw.flip = function (o) {
    var st = o.style || 'startac';
    if (st === 'microtac') {
      return shadow(150, 70) +
        rect(170, 24, 9, 34, 4) +
        rect(110, 52, 80, 150, 9) + rect(176, 60, 10, 134, 0, H) +
        ln(138, 64, 162, 64, 2) + rect(122, 76, 56, 20, 2, S(1.5)) + rect(125, 79, 50, 14, 1, T) +
        keys(121, 108, 3, 5, 20, 17, 15, 11, 3) +
        path('M110 202 L190 202 L206 262 Q206 268 198 268 L102 268 Q94 268 94 262 Z') + path('M150 204 L189 204 L204 262 L150 266 Z', H) +
        ln(138, 252, 162, 252, 1.6) + ln(110, 202, 190, 202, 3);
    }
    var razr = st === 'razr', w = razr ? 86 : 70, x = 150 - w / 2, top = razr ? 34 : 44;
    return shadow(150, razr ? 74 : 64) +
      (razr ? '' : rect(x + w - 15, 124, 9, 30, 4)) +
      path('M' + (x + 4) + ' 152 L' + (x + w - 4) + ' 152 L' + (x + w + 8) + ' ' + top + ' Q' + (x + w + 8) + ' ' + (top - 8) + ' ' + (x + w) + ' ' + (top - 8) + ' L' + x + ' ' + (top - 8) + ' Q' + (x - 8) + ' ' + (top - 8) + ' ' + (x - 8) + ' ' + top + ' Z') +
      ln(150 - 9, top + 2, 150 + 9, top + 2, 2) +
      (razr
        ? path('M' + (x + 2) + ' ' + (top + 12) + ' L' + (x + w - 2) + ' ' + (top + 12) + ' L' + (x + w - 9) + ' 142 L' + (x + 9) + ' 142 Z', S(1.5)) + path('M' + (x + 8) + ' ' + (top + 17) + ' L' + (x + w - 8) + ' ' + (top + 17) + ' L' + (x + w - 13) + ' 137 L' + (x + 13) + ' 137 Z', T)
        : path('M' + (x + 8) + ' ' + (top + 22) + ' L' + (x + w - 8) + ' ' + (top + 22) + ' L' + (x + w - 11) + ' ' + (top + 52) + ' L' + (x + 11) + ' ' + (top + 52) + ' Z', S(1.5)) + path('M' + (x + 12) + ' ' + (top + 26) + ' L' + (x + w - 12) + ' ' + (top + 26) + ' L' + (x + w - 14) + ' ' + (top + 48) + ' L' + (x + 14) + ' ' + (top + 48) + ' Z', T)) +
      rect(x, 152, w, razr ? 96 : 112, razr ? 4 : 9) + rect(x + w - 11, 160, 7, razr ? 82 : 96, 0, H) +
      rect(x - 3, 145, w + 6, 13, 6) +
      (razr
        ? circ(150, 178, 12, S(1.4)) + circ(150, 178, 5, S(1.2)) + keys(x + 9, 196, 3, 4, (w - 18) / 3, 12, (w - 18) / 3 - 3, 9, 1.5, S(1.1)) + rect(x - 2, 248, w + 4, 18, 7) + rect(x + w / 2, 252, w / 2 - 2, 10, 4, H)
        : ell(150, 174, 11, 6, S(1.4)) + keys(x + 9, 188, 3, 4, (w - 18) / 3, 17, (w - 18) / 3 - 4, 12, 4));
  };

  /* candybar handsets */
  draw.candybar = function (o) {
    var w = o.small ? 78 : (o.large ? 92 : 86), h = o.large ? 214 : (o.small ? 172 : 190), r = o.round ? 32 : (o.large ? 9 : 18);
    var cx = o.camera ? 122 : 150, x = cx - w / 2, y = 268 - h, sh = o.large ? 30 : 42, ky = y + (o.large ? 88 : 102), kw = (w - 24) / 3, kh = (h - (ky - y) - 16) / 4;
    var s = shadow(o.camera ? 150 : cx, o.camera ? 100 : 66);
    if (o.antenna) s += rect(x + 9, y - (o.large ? 46 : 24), 11, o.large ? 52 : 30, 5) + rect(x + 14, y - (o.large ? 42 : 20), 4, o.large ? 40 : 18, 0, H);
    if (o.camera) s += rect(x + w + 16, y + 26, 50, h - 52, 10) + rect(x + w + 44, y + 30, 18, h - 60, 6, H) + circ(x + w + 37, y + 54, 10) + circ(x + w + 37, y + 54, 4, D) + circ(x + w + 37, y + 80, 5, S(1.3));
    s += rect(x, y, w, h, r) + rect(x + w - 11, y + r, 7, h - r * 2, 0, H) +
      ln(cx - 9, y + 12, cx + 9, y + 12, 2) +
      rect(x + 11, y + 22, w - 22, sh, 3, S(1.6)) + rect(x + 14, y + 25, w - 28, sh - 6, 1, T) +
      ell(cx, y + (o.large ? 72 : 84), 15, 7, S(1.4)) +
      keys(x + 12, ky, 3, 4, kw, kh, kw - 5, kh - 5, 4);
    return s;
  };

  /* 1994: touchscreen "personal communicator" */
  draw.pda = function () {
    var g = '';
    for (var j = 0; j < 4; j++) for (var i = 0; i < 3; i++) g += rect(112 + i * 27, 82 + j * 34, 20, 20, 3, S(1.2));
    return shadow(150, 84) +
      path('M208 44 L224 36 L224 252 L208 266 Z') + path('M210 48 L222 42 L222 250 L210 260 Z', H) +
      rect(92, 30, 116, 236, 10) +
      ln(134, 42, 166, 42, 2) + ln(134, 48, 166, 48, 2) +
      rect(104, 58, 92, 180, 3, S(1.6)) + g + ln(104, 222, 196, 222, 1.2) +
      ln(140, 252, 160, 252, 1.6) +
      path('M246 70 L246 232 l-3 12 l-3 -12 L240 70 Z', S(1.4));
  };

  /* 1996: clamshell with a full keyboard */
  draw.communicator = function () {
    var k = '';
    for (var j = 0; j < 4; j++) {
      var y = 164 + j * 17, t = (y - 152) / 84, xl = 62 - 22 * t + 8, xr = 238 + 22 * t - 8, kw = (xr - xl) / 12;
      for (var i = 0; i < 12; i++) k += rect(xl + i * kw + 1.5, y, kw - 3, 11, 2, S(1.1));
    }
    return shadow(150, 128) +
      rect(246, 104, 10, 50, 4) +
      rect(58, 50, 184, 104, 7) + rect(74, 60, 152, 80, 2, S(1.6)) + rect(78, 64, 144, 72, 1, T) + ln(62, 147, 238, 147, 1) +
      path('M60 152 L240 152 L262 236 L38 236 Z') + k +
      path('M38 236 L262 236 L262 250 Q262 256 256 256 L44 256 Q38 256 38 250 Z') + path('M150 238 L260 238 L260 252 L150 254 Z', H);
  };

  /* thumb-keyboard email handset */
  draw.qwerty = function () {
    return shadow(150, 86) +
      rect(84, 38, 132, 228, 20) + rect(198, 58, 12, 190, 0, H) +
      ln(138, 50, 162, 50, 2) +
      rect(98, 60, 104, 86, 3, S(1.6)) + rect(102, 64, 96, 78, 1, T) +
      rect(222, 96, 6, 34, 3, S(1.3)) +
      keys(97, 160, 10, 4, 10.7, 20, 8.2, 14, 3, S(1.1)) +
      rect(120, 242, 60, 10, 5, S(1.2));
  };

  /* sliders: numeric (keypad drops down) or qwerty (keyboard slides sideways) */
  draw.slider = function (o) {
    if (o.keyboard === 'qwerty') {
      return shadow(150, 126) +
        rect(36, 152, 232, 98, 12) + rect(180, 158, 82, 86, 6, H) +
        keys(50, 184, 11, 4, 18.4, 15, 14.4, 10.5, 2, S(1.1)) +
        rect(28, 72, 220, 104, 12) + rect(40, 82, 166, 84, 3, S(1.6)) + rect(44, 86, 158, 76, 1, T) +
        circ(228, 124, 7, S(1.4)) + circ(228, 124, 2.5, D) + ln(222, 98, 234, 98, 2) + ln(222, 150, 234, 150, 2);
    }
    return shadow(150, 70) +
      rect(104, 174, 92, 92, 9) + rect(180, 180, 12, 80, 0, H) + keys(114, 194, 3, 4, 25, 16.5, 19, 11.5, 3) +
      rect(100, 26, 100, 160, 11) + rect(186, 36, 10, 140, 0, H) +
      ln(140, 36, 160, 36, 2) +
      rect(110, 46, 80, 94, 3, S(1.6)) + rect(114, 50, 72, 86, 1, T) +
      rect(132, 148, 36, 26, 6, S(1.4)) + circ(150, 161, 6, S(1.2)) + ln(110, 156, 124, 156, 1.6) + ln(176, 156, 190, 156, 1.6);
  };

  function backCam(o, x, y, w, h, r) {
    var c = o.cam || 'single', lens = function (cx, cy, rr) { return circ(cx, cy, rr, S(1.5)) + circ(cx, cy, rr * 0.42, D); };
    switch (c) {
      case 'center': return lens(x + w / 2, y + 28, 9) + rect(x + w / 2 + 14, y + 24, 6, 8, 2, S(1.2));
      case 'vertical': return rect(x + 9, y + 9, 22, 46, 11) + lens(x + 20, y + 21, 7) + lens(x + 20, y + 43, 7);
      case 'square2': return rect(x + 9, y + 9, 42, 42, 12) + lens(x + 22, y + 22, 8) + lens(x + 38, y + 38, 8) + circ(x + 39, y + 20, 2.5, S(1.1));
      case 'square': return rect(x + 9, y + 9, 46, 46, 13) + lens(x + 23, y + 23, 8.5) + lens(x + 23, y + 42, 8.5) + lens(x + 42, y + 32, 8.5) + circ(x + 43, y + 17, 2.5, S(1.1));
      case 'window': return rect(x + 4, y + 4, w - 8, h * 0.34, r - 3, T) + ln(x + 4, y + 4 + h * 0.34, x + w - 4, y + 4 + h * 0.34, 1.2) + lens(x + 18, y + 20, 7) + circ(x + w / 2, y + h * 0.22, 10, S(1.4));
      case 'column': return lens(x + 20, y + 24, 9) + lens(x + 20, y + 49, 9) + lens(x + 20, y + 74, 9) + lens(x + 43, y + 36, 5.5) + lens(x + 43, y + 60, 5.5);
      case 'plateau': return rect(x + 6, y + 8, w - 12, 48, 13) + lens(x + 22, y + 22, 8) + lens(x + 22, y + 42, 8) + lens(x + 41, y + 32, 8) + circ(x + w - 22, y + 22, 3, S(1.1)) + circ(x + w - 22, y + 42, 2, D);
      case 'bar1': return rect(x + 6, y + 8, w - 12, 30, 15) + lens(x + 23, y + 23, 9) + circ(x + w - 22, y + 23, 3, S(1.1));
      case 'visor': return rect(x + 7, y + 22, w - 14, 26, 13) + lens(x + 24, y + 35, 8) + lens(x + 46, y + 35, 8) + circ(x + w - 22, y + 35, 3, S(1.1));
      case 'ring': return circ(x + w / 2, y + 44, 30) + lens(x + w / 2 - 11, y + 34, 8) + lens(x + w / 2 + 11, y + 34, 8) + lens(x + w / 2, y + 54, 8);
      default: return lens(x + 18, y + 18, 7) + circ(x + 32, y + 18, 2, S(1.1));
    }
  }

  /* glass slab, drawn back and front */
  draw.slab = function (o) {
    var sz = o.size || 'm', w = { s: 88, m: 98, l: 108 }[sz], h = { s: 180, m: 204, l: 224 }[sz];
    var r = o.r != null ? o.r : (o.home ? 14 : 18);
    var fx = 162, fy = 268 - h, bx = 40, by = 262 - h;
    var top = o.home ? 25 : (o.bezel || 5), bot = o.home ? 29 : (o.bezel || 5), side = o.home ? 6 : 4;
    var s = shadow(152, 122);
    s += '<g transform="rotate(-7 ' + (bx + w / 2) + ' ' + (by + h / 2) + ')">' + rect(bx, by, w, h, r) + rect(bx + w * 0.58, by + 6, w * 0.42 - 6, h - 12, Math.max(r - 4, 2), H) +
      backCam(o, bx, by, w, h, r) + circ(bx + w / 2, by + h * 0.56, 5, N(1.2)) + '</g>';
    if (o.pen) s += path('M' + (fx + w + 14) + ' ' + (fy + 26) + ' L' + (fx + w + 14) + ' ' + (fy + h - 22) + ' l-3 11 l-3 -11 L' + (fx + w + 8) + ' ' + (fy + 26) + ' Z', S(1.4));
    s += rect(fx, fy, w, h, r) + rect(fx + side, fy + top, w - side * 2, h - top - bot, o.home ? 2 : Math.max(r - 4, 2), S(1.5));
    if (o.home) {
      s += ln(fx + w / 2 - 10, fy + 13, fx + w / 2 + 10, fy + 13, 2);
      s += o.home === 'oval' ? rect(fx + w / 2 - 15, fy + h - 21, 30, 12, 6, S(1.4)) : circ(fx + w / 2, fy + h - 15, 8.5, S(1.4));
      if (o.home === 'ring') s += circ(fx + w / 2, fy + h - 15, 5.5, N(1.1));
    }
    if (o.cutout === 'notch') s += path('M' + (fx + w / 2 - 24) + ' ' + (fy + top) + ' h48 v7 q0 7 -7 7 h-34 q-7 0 -7 -7 Z', D);
    if (o.cutout === 'island') s += rect(fx + w / 2 - 16, fy + top + 6, 32, 10, 5, D);
    if (o.cutout === 'hole') s += circ(fx + w / 2, fy + top + 10, 3.2, D);
    var sw = w - side * 2, cell = sw / 4, ic = cell * 0.56, rows = o.rows || 4, y0 = fy + top + 26;
    for (var j = 0; j < rows; j++) for (var i = 0; i < 4; i++) s += rect(fx + side + i * cell + (cell - ic) / 2, y0 + j * cell * 1.05, ic, ic, ic * 0.28, S(1.1));
    s += rect(fx + side + 6, fy + h - bot - cell - 4, sw - 12, cell, cell * 0.3, S(1.1));
    return s;
  };

  /* folding screens: book fold (2 panels) or tri-fold (3 panels) */
  draw.fold = function (o) {
    var i, g = '';
    if (o.panels === 3) {
      for (i = 0; i < 4; i++) g += rect(112 + i * 20, 84, 14, 14, 4, S(1.1)) + rect(112 + i * 20, 108, 14, 14, 4, S(1.1));
      return shadow(150, 128) +
        path('M100 50 L28 36 L28 268 L100 258 Z') + path('M96 56 L34 44 L34 260 L96 252 Z', H) +
        path('M200 50 L272 66 L272 244 L200 258 Z') + path('M204 58 L266 71 L266 239 L204 250 Z', S(1.3)) + path('M236 64 L266 71 L266 239 L236 244 Z', H) +
        rect(100, 50, 100, 208, 2) + rect(106, 56, 88, 196, 2, S(1.3)) + g + rect(112, 222, 76, 20, 6, S(1.1)) +
        ln(100, 50, 100, 258, 2.8) + ln(200, 50, 200, 258, 2.8) + circ(150, 66, 2.6, D);
    }
    for (i = 0; i < 3; i++) g += path('M' + (164 + i * 24) + ' ' + (78 + i * 4.6) + ' l15 2.9 v15 l-15 -2 Z', S(1.1)) + path('M' + (164 + i * 24) + ' ' + (106 + i * 4) + ' l15 2.5 v15 l-15 -1.6 Z', S(1.1));
    return shadow(150, 116) +
      path('M52 58 L44 63 L44 260 L52 256', N(1.6)) +
      path('M150 38 L52 58 L52 256 L150 268 Z') + path('M146 46 L58 64 L58 250 L146 261 Z', S(1.3)) + path('M146 46 L100 55.5 L100 255.2 L146 261 Z', H) +
      path('M150 38 L248 58 L248 256 L150 268 Z') + path('M154 46 L242 64 L242 250 L154 261 Z', S(1.3)) + g +
      path('M162 226 L234 220 L234 240 L162 248 Z', S(1.1)) +
      ln(150, 38, 150, 268, 3) + circ(230, 72, 2.6, D);
  };

  /* clamshell with a folding screen */
  draw.flipfold = function () {
    var g = '';
    for (var i = 0; i < 4; i++) g += rect(111 + i * 20.5, 76, 14, 14, 4, S(1.1)) + rect(111 + i * 20.5, 100, 14, 14, 4, S(1.1));
    return shadow(150, 82) +
      path('M100 152 L200 152 L216 250 Q216 264 203 264 L97 264 Q84 264 84 250 Z') + path('M106 157 L194 157 L208 250 L92 250 Z', S(1.3)) + path('M150 157 L194 157 L208 250 L150 250 Z', H) +
      rect(100, 36, 100, 118, 15) + rect(106, 42, 88, 110, 10, S(1.3)) + g + circ(150, 54, 3, D) +
      ln(100, 153, 200, 153, 3.2);
  };

  window.sketch = function (cfg) {
    cfg = cfg || {};
    var fn = draw[cfg.type] || draw.slab;
    return '<svg class="sk" viewBox="0 0 300 300" role="img" aria-hidden="true"><g filter="url(#wobble)">' + fn(cfg) + '</g></svg>';
  };
})();
