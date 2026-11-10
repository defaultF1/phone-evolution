(function () {
  'use strict';

  var PH = [].concat(window.PHONES_A || [], window.PHONES_B || [], window.PHONES_C || []);
  var MAP = window.SKETCH_MAP || {};
  var CH = [
    { n: 'I', short: 'Wire', name: 'The Speaking Wire', from: 1876 },
    { n: 'II', short: 'Dial', name: 'The Age of the Dial', from: 1919 },
    { n: 'III', short: 'Brick', name: 'The Wireless Brick', from: 1973 },
    { n: 'IV', short: 'Pocket', name: 'The Pocket Companion', from: 1992 },
    { n: 'V', short: 'Glass', name: 'The Sheet of Glass', from: 2007 },
    { n: 'VI', short: 'Fold', name: 'The Fold & the Thinking Phone', from: 2019 }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  function roman(n) {
    var t = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']], s = '';
    t.forEach(function (p) { while (n >= p[0]) { s += p[1]; n -= p[0]; } });
    return s;
  }
  function chapterOf(p) {
    var m = MAP[p.id];
    if (m && m.ch != null) return m.ch;
    var c = 0;
    CH.forEach(function (ch, i) { if (p.year >= ch.from) c = i; });
    return c;
  }
  function guessSketch(p) {
    var t = (p.name + ' ' + (p.look || '')).toLowerCase();
    if (/tri-?fold/.test(t)) return { type: 'fold', panels: 3 };
    if (/flip/.test(t)) return { type: 'flipfold' };
    if (/fold/.test(t)) return { type: 'fold', panels: 2 };
    return { type: 'slab', size: 'l', cutout: 'hole', cam: 'column', r: 14 };
  }
  var PHOTOS = window.PHOTOS || {};
  function art(p) {
    var ph = PHOTOS[p.id];
    if (ph) return '<img class="ph ' + (ph.kind === 'cut' ? 'cut' : 'photo') + '" src="' + esc(ph.src) + '" alt="" draggable="false" decoding="async">';
    return window.sketch(p.sk);
  }
  function shortName(s) { return s.length > 24 ? s.slice(0, 23).replace(/[\s,(&/-]+$/, '') + '…' : s; }

  var stage = $('stage'), itemsEl = $('items'), head = $('head');
  if (!PH.length) { $('empty').hidden = false; return; }
  var n = PH.length;

  /* keep the scroll in true date order, whatever order the data files list things in */
  var MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  PH.forEach(function (p, i) {
    var m = /([A-Za-z]+)\s+(\d{1,2})?,?\s*\d{4}/.exec(p.date || ''), mo = m ? MONTHS.indexOf(m[1].toLowerCase()) + 1 : 0;
    p.key = p.year * 10000 + mo * 100 + (m && m[2] ? +m[2] : 0) + i / 1000;
  });
  PH.sort(function (a, b) { return a.key - b.key; });

  /* ---------- build ---------- */
  PH.forEach(function (p, i) {
    p.ch = chapterOf(p);
    p.sk = MAP[p.id] || guessSketch(p);
    var el = document.createElement('div');
    el.className = 'item';
    el.dataset.i = i;
    el.innerHTML = art(p) + '<span class="lbl" style="top:' + (i % 2 ? -5 : 3) + '%">' + p.year + ' · ' + esc(shortName(p.name)) + '</span>';
    el.style.display = 'none';
    itemsEl.appendChild(el);
    p.el = el; p.vis = false;
  });

  var tabsEl = $('tabs');
  CH.forEach(function (c, i) {
    var first = -1, last = -1;
    PH.forEach(function (p, k) { if (p.ch === i) { if (first < 0) first = k; last = k; } });
    c.first = first; c.last = last;
    var b = document.createElement('button');
    b.className = 'tab';
    b.innerHTML = '<span class="n">' + c.n + '</span><span class="nm">' + c.short + '</span>';
    b.title = c.name + (first >= 0 ? ' · ' + PH[first].year + '–' + PH[last].year : '');
    b.disabled = first < 0;
    b.addEventListener('click', function () { stopVoyage(); go(first); });
    tabsEl.appendChild(b);
    c.tab = b;
  });
  $('ledgerLabel').textContent = 'All ' + n + ' Phones';

  /* year trail */
  var strip = $('strip'), track = $('track'), marker = $('marker');
  var Y0 = Math.floor((PH[0].year - 4) / 10) * 10, Y1 = Math.ceil((PH[n - 1].year + 4) / 10) * 10, TW = 15, PAD = 30;
  var yx = function (y) { return PAD + (y - Y0) * TW; };
  var stripW = PAD * 2 + (Y1 - Y0) * TW;
  (function () {
    var h = '', seen = {};
    for (var y = Y0; y <= Y1; y++) {
      var c = y % 10 === 0 ? ' d10' : (y % 5 === 0 ? ' d5' : '');
      h += '<span class="tk' + c + '" style="left:' + yx(y) + 'px"></span>';
      if (y % 10 === 0) h += '<span class="yl d10" style="left:' + yx(y) + 'px">' + y + '</span>';
    }
    PH.forEach(function (p) { if (!seen[p.year]) { seen[p.year] = 1; h += '<span class="pin" style="left:' + yx(p.year) + 'px"></span>'; } });
    strip.style.width = stripW + 'px';
    strip.innerHTML = h;
  })();

  /* ---------- carousel ---------- */
  var pos = 0, target = 0, cur = -1, raf = 0, dragging = false, sz = 360, near = 260, step = 110, stripTx = 0;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function layout() {
    var W = stage.clientWidth, Hh = stage.clientHeight;
    sz = Math.max(150, Math.min(Hh * 0.9, W * 0.36, 600));
    stage.style.setProperty('--sz', sz + 'px');
    near = Math.min(sz * 0.66, W * 0.3);
    step = Math.min(sz * 0.3, W * 0.1);
    render();
  }

  function render() {
    for (var i = 0; i < n; i++) {
      var p = PH[i], d = i - pos, ad = Math.abs(d);
      if (ad > 6) { if (p.vis) { p.el.style.display = 'none'; p.vis = false; } continue; }
      if (!p.vis) { p.el.style.display = ''; p.vis = true; }
      var s = d < 0 ? -1 : 1, x, sc, op, ry;
      if (ad < 1) { x = s * ad * near; sc = 1 - ad * 0.52; op = 1 - ad * 0.3; ry = -s * ad * 26; }
      else { x = s * (near + (ad - 1) * step); sc = Math.max(0.48 - (ad - 1) * 0.055, 0.2); op = Math.max(0.7 - (ad - 1) * 0.15, 0); ry = -s * 26; }
      var st = p.el.style;
      st.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0) rotateY(' + ry.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
      st.opacity = op.toFixed(3);
      st.zIndex = 100 - Math.round(ad * 10);
      st.setProperty('--lo', (ad < 0.5 || ad > 3.6) ? 0 : Math.min(1, (ad - 0.5) * 2).toFixed(2));
      p.el.classList.toggle('center', ad < 0.5);
    }
    var i0 = clamp(Math.floor(pos), 0, n - 1), i1 = clamp(Math.ceil(pos), 0, n - 1);
    var yr = PH[i0].year + (PH[i1].year - PH[i0].year) * clamp(pos - i0, 0, 1);
    var xm = yx(yr), tw = track.clientWidth;
    stripTx = clamp(tw / 2 - xm, Math.min(0, tw - stripW), 0);
    strip.style.transform = 'translateX(' + stripTx.toFixed(1) + 'px)';
    marker.style.transform = 'translateX(' + (xm + stripTx).toFixed(1) + 'px)';
    var c = clamp(Math.round(pos), 0, n - 1);
    if (c !== cur) setCurrent(c);
  }

  function setCurrent(i) {
    var first = cur < 0;
    cur = i;
    var p = PH[i], ch = CH[p.ch];
    $('date').textContent = p.date;
    $('line').textContent = p.line;
    $('count').textContent = (i + 1) + ' of ' + n;
    $('title').textContent = p.name;
    $('tagline').textContent = p.tagline;
    $('ghost').textContent = p.year;
    $('anno').textContent = 'Anno ' + roman(p.year);
    $('chapterBadge').textContent = 'Chapter ' + ch.n + ' · ' + ch.name;
    marker.querySelector('b').textContent = p.year;
    $('specs').innerHTML = (p.specs || []).map(function (s) { return '<dl class="spec"><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></dl>'; }).join('');
    CH.forEach(function (c, k) { c.tab.classList.toggle('on', k === p.ch); });
    $('prevBtn').disabled = i === 0;
    $('nextBtn').disabled = i === n - 1;
    if (!first) {
      head.classList.remove('flip'); void head.offsetWidth; head.classList.add('flip');
      if (soundOn) tickSound();
    }
  }

  var lastT = 0;
  function tick(now) {
    var dt = lastT ? Math.min(now - lastT, 250) : 16;
    lastT = now;
    var diff = target - pos;
    /* time-based easing, so the glide takes the same time at any frame rate */
    if (reduce || Math.abs(diff) < 0.002) pos = target; else pos += diff * (1 - Math.exp(-dt / 95));
    render();
    if (pos !== target) raf = requestAnimationFrame(tick); else { raf = 0; lastT = 0; }
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  function go(i) { target = clamp(i, 0, n - 1); kick(); }

  /* drag, wheel, keys */
  var sx = 0, st0 = 0, moved = 0;
  stage.addEventListener('pointerdown', function (e) {
    if (e.button) return;
    dragging = true; moved = 0; sx = e.clientX; st0 = target;
    try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    stage.classList.add('dragging');
    stopVoyage();
  });
  stage.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - sx;
    moved = Math.max(moved, Math.abs(dx));
    target = clamp(st0 - dx / (near * 0.8), -0.35, n - 0.65);
    kick();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    if (moved < 6 && e.type === 'pointerup') {
      var hit = document.elementFromPoint(e.clientX, e.clientY);
      var it = hit && hit.closest ? hit.closest('.item') : null;
      if (it) { var k = +it.dataset.i; if (k === cur) openTale(cur); else go(k); return; }
    }
    go(Math.round(target));
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  var wheelAcc = 0, wheelAt = 0;
  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    wheelAcc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    var now = Date.now();
    if (Math.abs(wheelAcc) > 36 && now - wheelAt > 110) {
      stopVoyage();
      go(Math.round(target) + (wheelAcc > 0 ? 1 : -1));
      wheelAcc = 0; wheelAt = now;
    }
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeTale(); closeLedger(); return; }
    if (!$('taleVeil').hidden || !$('ledgerVeil').hidden) return;
    if (e.key === 'ArrowRight') { stopVoyage(); go(Math.round(target) + 1); }
    else if (e.key === 'ArrowLeft') { stopVoyage(); go(Math.round(target) - 1); }
    else if (e.key === 'Home') { stopVoyage(); go(0); }
    else if (e.key === 'End') { stopVoyage(); go(n - 1); }
  });

  $('prevBtn').addEventListener('click', function () { stopVoyage(); go(Math.round(target) - 1); });
  $('nextBtn').addEventListener('click', function () { stopVoyage(); go(Math.round(target) + 1); });

  track.addEventListener('click', function (e) {
    var x = e.clientX - track.getBoundingClientRect().left - stripTx;
    var y = Y0 + (x - PAD) / TW, best = 0, bd = 1e9;
    PH.forEach(function (p, i) { var d = Math.abs(p.year - y); if (d < bd) { bd = d; best = i; } });
    stopVoyage(); go(best);
  });

  /* ---------- voyage (time-lapse) ---------- */
  var voyage = 0, voyageBtn = $('voyageBtn');
  function stopVoyage() {
    if (!voyage) return;
    clearInterval(voyage); voyage = 0;
    voyageBtn.classList.remove('on');
    voyageBtn.querySelector('.ico').innerHTML = '&#9654;';
  }
  voyageBtn.addEventListener('click', function () {
    if (voyage) { stopVoyage(); return; }
    if (Math.round(target) >= n - 1) go(0);
    voyageBtn.classList.add('on');
    voyageBtn.querySelector('.ico').innerHTML = '&#10073;&#10073;';
    voyage = setInterval(function () {
      var nx = Math.round(target) + 1;
      if (nx > n - 1) { stopVoyage(); return; }
      go(nx);
    }, 1700);
  });

  /* ---------- the tale (story scroll) ---------- */
  var taleVeil = $('taleVeil'), taleIdx = 0;
  function openTale(i) {
    stopVoyage();
    taleIdx = i;
    var p = PH[i];
    $('taleDate').textContent = p.date;
    $('taleLine').textContent = p.line;
    $('taleTitle').textContent = p.name;
    var ph = PHOTOS[p.id];
    $('taleArt').innerHTML = art(p);
    $('taleCap').textContent = 'Plate ' + roman(i + 1) + (ph ? '' : ' · artist’s sketch');
    var credit = '';
    if (ph) {
      var host = '';
      try { host = new URL(ph.page).hostname.replace(/^www\./, '').replace(/^commons\.wikimedia\.org$/, 'Wikimedia Commons'); } catch (err) {}
      credit = (ph.note ? esc(ph.note) + '. ' : '') + (ph.ai ? 'AI recreation of a photo by ' : 'Photo: ') + esc(ph.credit) + (ph.license ? ' · ' + esc(ph.license) : '') +
        (host ? ' · <a href="' + esc(ph.page) + '" target="_blank" rel="noopener noreferrer">' + esc(host) + '</a>' : '');
    }
    $('taleCredit').innerHTML = credit;
    $('taleStory').textContent = p.story;
    $('taleMiles').innerHTML = (p.milestones || []).map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('');
    $('taleNote').textContent = p.note;
    var seen = {}, links = [];
    (p.sources || []).forEach(function (u) {
      try {
        var h = new URL(u).hostname.replace(/^www\./, '');
        if (!seen[h]) { seen[h] = 1; links.push('<a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(h) + '</a>'); }
      } catch (err) {}
    });
    $('taleSources').innerHTML = links.length ? 'Sources: ' + links.join('') : '';
    taleVeil.hidden = false;
    taleVeil.querySelector('.tale-scroll').scrollTop = 0;
    requestAnimationFrame(function () { requestAnimationFrame(function () { taleVeil.classList.add('open'); }); });
  }
  function closeTale() {
    if (taleVeil.hidden) return;
    taleVeil.classList.remove('open');
    setTimeout(function () { if (!taleVeil.classList.contains('open')) taleVeil.hidden = true; }, 280);
  }
  $('taleBtn').addEventListener('click', function () { openTale(cur); });
  $('taleClose').addEventListener('click', closeTale);
  taleVeil.addEventListener('click', function (e) { if (e.target === taleVeil) closeTale(); });
  $('bellBtn').addEventListener('click', function () { ring(PH[taleIdx].ch); });

  /* ---------- the ledger (all phones) ---------- */
  var ledgerVeil = $('ledgerVeil'), ledgerBuilt = false;
  function openLedger() {
    stopVoyage();
    var body = $('ledgerBody');
    if (!ledgerBuilt) {
      var h = '';
      CH.forEach(function (c, ci) {
        if (c.first < 0) return;
        h += '<h3>Chapter ' + c.n + ' · ' + esc(c.name) + ' · ' + PH[c.first].year + '–' + PH[c.last].year + '</h3><div class="ledger-grid">';
        PH.forEach(function (p, i) {
          if (p.ch !== ci) return;
          h += '<button class="card" data-i="' + i + '">' + art(p) + '<span class="y">' + p.year + '</span><span class="nm">' + esc(p.name) + '</span></button>';
        });
        h += '</div>';
      });
      body.innerHTML = h;
      body.addEventListener('click', function (e) {
        var c = e.target.closest('.card');
        if (c) { closeLedger(); go(+c.dataset.i); }
      });
      ledgerBuilt = true;
    }
    Array.prototype.forEach.call(body.querySelectorAll('.card'), function (c) { c.classList.toggle('on', +c.dataset.i === cur); });
    ledgerVeil.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { ledgerVeil.classList.add('open'); }); });
    var on = body.querySelector('.card.on');
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'center' });
  }
  function closeLedger() {
    if (ledgerVeil.hidden) return;
    ledgerVeil.classList.remove('open');
    setTimeout(function () { if (!ledgerVeil.classList.contains('open')) ledgerVeil.hidden = true; }, 280);
  }
  $('ledgerBtn').addEventListener('click', openLedger);
  $('ledgerClose').addEventListener('click', closeLedger);
  ledgerVeil.addEventListener('click', function (e) { if (e.target === ledgerVeil) closeLedger(); });

  /* ---------- sound ---------- */
  var AC = null, soundOn = false, soundBtn = $('soundBtn');
  function ac() {
    if (!AC) { var C = window.AudioContext || window.webkitAudioContext; if (C) AC = new C(); }
    if (AC && AC.state === 'suspended') AC.resume();
    return AC;
  }
  function tone(freq, at, dur, type, gain) {
    var a = ac(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(gain || 0.12, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g); g.connect(a.destination);
    o.start(at); o.stop(at + dur + 0.03);
  }
  function ring(ch) {
    var a = ac(); if (!a) return;
    var t = a.currentTime + 0.02, i;
    if (ch <= 1) {           /* clapper bell, one or two bursts */
      for (var b = 0; b <= ch; b++) for (i = 0; i < 20; i++) { tone(i % 2 ? 1510 : 1270, t + b * 1.25 + i * 0.045, 0.11, 'triangle', 0.1); tone(i % 2 ? 3020 : 2540, t + b * 1.25 + i * 0.045, 0.06, 'sine', 0.03); }
    } else if (ch === 2) {   /* electronic warble */
      for (i = 0; i < 22; i++) tone(i % 2 ? 1000 : 800, t + i * 0.05, 0.05, 'square', 0.04);
    } else if (ch === 3) {   /* monophonic ringtone */
      [659, 784, 988, 784, 1175, 988].forEach(function (fq, k) { tone(fq, t + k * 0.13, 0.12, 'square', 0.045); });
    } else if (ch === 4) {   /* marimba-style chime */
      [1047, 1319, 1568, 2093].forEach(function (fq, k) { tone(fq, t + k * 0.11, 0.5, 'sine', 0.12); });
    } else {                 /* soft glass chord */
      [523, 659, 784, 1047].forEach(function (fq, k) { tone(fq, t + k * 0.05, 1.5, 'sine', 0.07); });
    }
  }
  function tickSound() {
    var a = ac(); if (!a) return;
    tone(1900, a.currentTime, 0.035, 'triangle', 0.03);
  }
  soundBtn.addEventListener('click', function () {
    soundOn = !soundOn;
    soundBtn.classList.toggle('on', soundOn);
    soundBtn.setAttribute('aria-pressed', soundOn);
    soundBtn.title = soundOn ? 'Sound on' : 'Sound off';
    if (soundOn) tickSound();
  });

  /* ---------- start ---------- */
  window.addEventListener('resize', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();
})();
