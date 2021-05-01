/*! For license information please see CookieMonster.js.LICENSE.txt */
(() => {
  var e = {
      877: function (e) {
        !(function (t, o) {
          'use strict';
          'object' != typeof e.exports
            ? o(t)
            : (e.exports = t.document
                ? o(t)
                : function (e) {
                    if (!e.document) throw new Error('jscolor needs a window with document');
                    return o(e);
                  });
        })('undefined' != typeof window ? window : this, function (e) {
          'use strict';
          var t,
            o,
            n,
            i,
            a =
              (((i = {
                initialized: !1,
                instances: [],
                readyQueue: [],
                register: function () {
                  void 0 !== e &&
                    e.document &&
                    e.document.addEventListener('DOMContentLoaded', i.pub.init, !1);
                },
                installBySelector: function (t, o) {
                  if (!(o = o ? i.node(o) : e.document)) throw new Error('Missing root node');
                  for (
                    var n = o.querySelectorAll(t),
                      a = new RegExp(
                        '(^|\\s)(' + i.pub.lookupClass + ')(\\s*(\\{[^}]*\\})|\\s|$)',
                        'i',
                      ),
                      r = 0;
                    r < n.length;
                    r += 1
                  ) {
                    var l, s;
                    if (
                      !(n[r].jscolor && n[r].jscolor instanceof i.pub) &&
                      (void 0 === n[r].type ||
                        'color' != n[r].type.toLowerCase() ||
                        !i.isColorAttrSupported) &&
                      (null !== (l = i.getDataAttr(n[r], 'jscolor')) ||
                        (n[r].className && (s = n[r].className.match(a))))
                    ) {
                      var c = n[r],
                        d = '';
                      null !== l
                        ? (d = l)
                        : s &&
                          (console.warn(
                            'Installation using class name is DEPRECATED. Use data-jscolor="" attribute instead.' +
                              i.docsRef,
                          ),
                          s[4] && (d = s[4]));
                      var p = null;
                      if (d.trim())
                        try {
                          p = i.parseOptionsStr(d);
                        } catch (e) {
                          console.warn(e + '\n' + d);
                        }
                      try {
                        new i.pub(c, p);
                      } catch (e) {
                        console.warn(e);
                      }
                    }
                  }
                },
                parseOptionsStr: function (e) {
                  var t = null;
                  try {
                    t = JSON.parse(e);
                  } catch (o) {
                    if (!i.pub.looseJSON)
                      throw new Error('Could not parse jscolor options as JSON: ' + o);
                    try {
                      t = new Function(
                        'var opts = (' + e + '); return typeof opts === "object" ? opts : {};',
                      )();
                    } catch (e) {
                      throw new Error('Could not evaluate jscolor options: ' + e);
                    }
                  }
                  return t;
                },
                getInstances: function () {
                  for (var e = [], t = 0; t < i.instances.length; t += 1)
                    i.instances[t] && i.instances[t].targetElement && e.push(i.instances[t]);
                  return e;
                },
                createEl: function (t) {
                  var o = e.document.createElement(t);
                  return i.setData(o, 'gui', !0), o;
                },
                node: function (t) {
                  if (!t) return null;
                  if ('string' == typeof t) {
                    var o = t,
                      n = null;
                    try {
                      n = e.document.querySelector(o);
                    } catch (e) {
                      return console.warn(e), null;
                    }
                    return n || console.warn('No element matches the selector: %s', o), n;
                  }
                  return i.isNode(t)
                    ? t
                    : (console.warn('Invalid node of type %s: %s', typeof t, t), null);
                },
                isNode: function (e) {
                  return 'object' == typeof Node
                    ? e instanceof Node
                    : e &&
                        'object' == typeof e &&
                        'number' == typeof e.nodeType &&
                        'string' == typeof e.nodeName;
                },
                nodeName: function (e) {
                  return !(!e || !e.nodeName) && e.nodeName.toLowerCase();
                },
                removeChildren: function (e) {
                  for (; e.firstChild; ) e.removeChild(e.firstChild);
                },
                isTextInput: function (e) {
                  return e && 'input' === i.nodeName(e) && 'text' === e.type.toLowerCase();
                },
                isButton: function (e) {
                  if (!e) return !1;
                  var t = i.nodeName(e);
                  return (
                    'button' === t ||
                    ('input' === t &&
                      ['button', 'submit', 'reset'].indexOf(e.type.toLowerCase()) > -1)
                  );
                },
                isButtonEmpty: function (e) {
                  switch (i.nodeName(e)) {
                    case 'input':
                      return !e.value || '' === e.value.trim();
                    case 'button':
                      return '' === e.textContent.trim();
                  }
                  return null;
                },
                isPassiveEventSupported: (function () {
                  var t = !1;
                  try {
                    var o = Object.defineProperty({}, 'passive', {
                      get: function () {
                        t = !0;
                      },
                    });
                    e.addEventListener('testPassive', null, o),
                      e.removeEventListener('testPassive', null, o);
                  } catch (e) {}
                  return t;
                })(),
                isColorAttrSupported:
                  ((n = e.document.createElement('input')),
                  !(
                    !n.setAttribute ||
                    (n.setAttribute('type', 'color'), 'color' != n.type.toLowerCase())
                  )),
                dataProp: '_data_jscolor',
                setData: function () {
                  var e = arguments[0];
                  if (3 === arguments.length) {
                    var t = e.hasOwnProperty(i.dataProp) ? e[i.dataProp] : (e[i.dataProp] = {}),
                      o = arguments[2];
                    return (t[(a = arguments[1])] = o), !0;
                  }
                  if (2 === arguments.length && 'object' == typeof arguments[1]) {
                    t = e.hasOwnProperty(i.dataProp) ? e[i.dataProp] : (e[i.dataProp] = {});
                    var n = arguments[1];
                    for (var a in n) n.hasOwnProperty(a) && (t[a] = n[a]);
                    return !0;
                  }
                  throw new Error('Invalid arguments');
                },
                removeData: function () {
                  var e = arguments[0];
                  if (!e.hasOwnProperty(i.dataProp)) return !0;
                  for (var t = 1; t < arguments.length; t += 1) {
                    var o = arguments[t];
                    delete e[i.dataProp][o];
                  }
                  return !0;
                },
                getData: function (e, t, o) {
                  if (!e.hasOwnProperty(i.dataProp)) {
                    if (void 0 === o) return;
                    e[i.dataProp] = {};
                  }
                  var n = e[i.dataProp];
                  return n.hasOwnProperty(t) || void 0 === o || (n[t] = o), n[t];
                },
                getDataAttr: function (e, t) {
                  var o = 'data-' + t;
                  return e.getAttribute(o);
                },
                setDataAttr: function (e, t, o) {
                  var n = 'data-' + t;
                  e.setAttribute(n, o);
                },
                _attachedGroupEvents: {},
                attachGroupEvent: function (e, t, o, n) {
                  i._attachedGroupEvents.hasOwnProperty(e) || (i._attachedGroupEvents[e] = []),
                    i._attachedGroupEvents[e].push([t, o, n]),
                    t.addEventListener(o, n, !1);
                },
                detachGroupEvents: function (e) {
                  if (i._attachedGroupEvents.hasOwnProperty(e)) {
                    for (var t = 0; t < i._attachedGroupEvents[e].length; t += 1) {
                      var o = i._attachedGroupEvents[e][t];
                      o[0].removeEventListener(o[1], o[2], !1);
                    }
                    delete i._attachedGroupEvents[e];
                  }
                },
                preventDefault: function (e) {
                  e.preventDefault && e.preventDefault(), (e.returnValue = !1);
                },
                captureTarget: function (e) {
                  e.setCapture && ((i._capturedTarget = e), i._capturedTarget.setCapture());
                },
                releaseTarget: function () {
                  i._capturedTarget &&
                    (i._capturedTarget.releaseCapture(), (i._capturedTarget = null));
                },
                triggerEvent: function (t, o, n, a) {
                  if (t) {
                    var r = null;
                    return (
                      'function' == typeof Event
                        ? (r = new Event(o, { bubbles: n, cancelable: a }))
                        : (r = e.document.createEvent('Event')).initEvent(o, n, a),
                      !!r && (i.setData(r, 'internal', !0), t.dispatchEvent(r), !0)
                    );
                  }
                },
                triggerInputEvent: function (e, t, o, n) {
                  e && i.isTextInput(e) && i.triggerEvent(e, t, o, n);
                },
                eventKey: function (e) {
                  var t = { 9: 'Tab', 13: 'Enter', 27: 'Escape' };
                  return 'string' == typeof e.code
                    ? e.code
                    : void 0 !== e.keyCode && t.hasOwnProperty(e.keyCode)
                    ? t[e.keyCode]
                    : null;
                },
                strList: function (e) {
                  return e ? e.replace(/^\s+|\s+$/g, '').split(/\s+/) : [];
                },
                hasClass: function (e, t) {
                  return (
                    !!t &&
                    (void 0 !== e.classList
                      ? e.classList.contains(t)
                      : -1 != (' ' + e.className.replace(/\s+/g, ' ') + ' ').indexOf(' ' + t + ' '))
                  );
                },
                addClass: function (e, t) {
                  var o = i.strList(t);
                  if (void 0 === e.classList)
                    for (n = 0; n < o.length; n += 1)
                      i.hasClass(e, o[n]) || (e.className += (e.className ? ' ' : '') + o[n]);
                  else for (var n = 0; n < o.length; n += 1) e.classList.add(o[n]);
                },
                removeClass: function (e, t) {
                  var o = i.strList(t);
                  if (void 0 === e.classList)
                    for (a = 0; a < o.length; a += 1) {
                      var n = new RegExp(
                        '^\\s*' + o[a] + '\\s*|\\s*' + o[a] + '\\s*$|\\s+' + o[a] + '(\\s+)',
                        'g',
                      );
                      e.className = e.className.replace(n, '$1');
                    }
                  else for (var a = 0; a < o.length; a += 1) e.classList.remove(o[a]);
                },
                getCompStyle: function (t) {
                  return (e.getComputedStyle ? e.getComputedStyle(t) : t.currentStyle) || {};
                },
                setStyle: function (e, t, o, n) {
                  var a = o ? 'important' : '',
                    r = null;
                  for (var l in t)
                    if (t.hasOwnProperty(l)) {
                      var s = null;
                      null === t[l]
                        ? (r || (r = i.getData(e, 'origStyle')),
                          r && r.hasOwnProperty(l) && (s = r[l]))
                        : (n &&
                            (r || (r = i.getData(e, 'origStyle', {})),
                            r.hasOwnProperty(l) || (r[l] = e.style[l])),
                          (s = t[l])),
                        null !== s && e.style.setProperty(l, s, a);
                    }
                },
                hexColor: function (e, t, o) {
                  return (
                    '#' +
                    (
                      ('0' + Math.round(e).toString(16)).substr(-2) +
                      ('0' + Math.round(t).toString(16)).substr(-2) +
                      ('0' + Math.round(o).toString(16)).substr(-2)
                    ).toUpperCase()
                  );
                },
                hexaColor: function (e, t, o, n) {
                  return (
                    '#' +
                    (
                      ('0' + Math.round(e).toString(16)).substr(-2) +
                      ('0' + Math.round(t).toString(16)).substr(-2) +
                      ('0' + Math.round(o).toString(16)).substr(-2) +
                      ('0' + Math.round(255 * n).toString(16)).substr(-2)
                    ).toUpperCase()
                  );
                },
                rgbColor: function (e, t, o) {
                  return 'rgb(' + Math.round(e) + ',' + Math.round(t) + ',' + Math.round(o) + ')';
                },
                rgbaColor: function (e, t, o, n) {
                  return (
                    'rgba(' +
                    Math.round(e) +
                    ',' +
                    Math.round(t) +
                    ',' +
                    Math.round(o) +
                    ',' +
                    Math.round(100 * (null == n ? 1 : n)) / 100 +
                    ')'
                  );
                },
                linearGradient:
                  ((o = (function () {
                    for (
                      var t = 'linear-gradient',
                        o = ['', '-webkit-', '-moz-', '-o-', '-ms-'],
                        n = e.document.createElement('div'),
                        i = 0;
                      i < o.length;
                      i += 1
                    ) {
                      var a = o[i] + t,
                        r = a + '(to right, rgba(0,0,0,0), rgba(0,0,0,0))';
                      if (((n.style.background = r), n.style.background)) return a;
                    }
                    return t;
                  })()),
                  function () {
                    return o + '(' + Array.prototype.join.call(arguments, ', ') + ')';
                  }),
                setBorderRadius: function (e, t) {
                  i.setStyle(e, { 'border-radius': t || '0' });
                },
                setBoxShadow: function (e, t) {
                  i.setStyle(e, { 'box-shadow': t || 'none' });
                },
                getElementPos: function (e, t) {
                  var o = 0,
                    n = 0,
                    a = e.getBoundingClientRect();
                  if (((o = a.left), (n = a.top), !t)) {
                    var r = i.getViewPos();
                    (o += r[0]), (n += r[1]);
                  }
                  return [o, n];
                },
                getElementSize: function (e) {
                  return [e.offsetWidth, e.offsetHeight];
                },
                getAbsPointerPos: function (e) {
                  var t = 0,
                    o = 0;
                  return (
                    void 0 !== e.changedTouches && e.changedTouches.length
                      ? ((t = e.changedTouches[0].clientX), (o = e.changedTouches[0].clientY))
                      : 'number' == typeof e.clientX && ((t = e.clientX), (o = e.clientY)),
                    { x: t, y: o }
                  );
                },
                getRelPointerPos: function (e) {
                  var t = (e.target || e.srcElement).getBoundingClientRect(),
                    o = 0,
                    n = 0;
                  return (
                    void 0 !== e.changedTouches && e.changedTouches.length
                      ? ((o = e.changedTouches[0].clientX), (n = e.changedTouches[0].clientY))
                      : 'number' == typeof e.clientX && ((o = e.clientX), (n = e.clientY)),
                    { x: o - t.left, y: n - t.top }
                  );
                },
                getViewPos: function () {
                  var t = e.document.documentElement;
                  return [
                    (e.pageXOffset || t.scrollLeft) - (t.clientLeft || 0),
                    (e.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                  ];
                },
                getViewSize: function () {
                  var t = e.document.documentElement;
                  return [e.innerWidth || t.clientWidth, e.innerHeight || t.clientHeight];
                },
                RGB_HSV: function (e, t, o) {
                  (e /= 255), (t /= 255), (o /= 255);
                  var n = Math.min(Math.min(e, t), o),
                    i = Math.max(Math.max(e, t), o),
                    a = i - n;
                  if (0 === a) return [null, 0, 100 * i];
                  var r = e === n ? 3 + (o - t) / a : t === n ? 5 + (e - o) / a : 1 + (t - e) / a;
                  return [60 * (6 === r ? 0 : r), (a / i) * 100, 100 * i];
                },
                HSV_RGB: function (e, t, o) {
                  var n = (o / 100) * 255;
                  if (null === e) return [n, n, n];
                  (e /= 60), (t /= 100);
                  var i = Math.floor(e),
                    a = n * (1 - t),
                    r = n * (1 - t * (i % 2 ? e - i : 1 - (e - i)));
                  switch (i) {
                    case 6:
                    case 0:
                      return [n, r, a];
                    case 1:
                      return [r, n, a];
                    case 2:
                      return [a, n, r];
                    case 3:
                      return [a, r, n];
                    case 4:
                      return [r, a, n];
                    case 5:
                      return [n, a, r];
                  }
                },
                parseColorString: function (e) {
                  var t,
                    o = { rgba: null, format: null };
                  if ((t = e.match(/^\W*([0-9A-F]{3,8})\W*$/i))) {
                    if (8 === t[1].length)
                      (o.format = 'hexa'),
                        (o.rgba = [
                          parseInt(t[1].substr(0, 2), 16),
                          parseInt(t[1].substr(2, 2), 16),
                          parseInt(t[1].substr(4, 2), 16),
                          parseInt(t[1].substr(6, 2), 16) / 255,
                        ]);
                    else if (6 === t[1].length)
                      (o.format = 'hex'),
                        (o.rgba = [
                          parseInt(t[1].substr(0, 2), 16),
                          parseInt(t[1].substr(2, 2), 16),
                          parseInt(t[1].substr(4, 2), 16),
                          null,
                        ]);
                    else {
                      if (3 !== t[1].length) return !1;
                      (o.format = 'hex'),
                        (o.rgba = [
                          parseInt(t[1].charAt(0) + t[1].charAt(0), 16),
                          parseInt(t[1].charAt(1) + t[1].charAt(1), 16),
                          parseInt(t[1].charAt(2) + t[1].charAt(2), 16),
                          null,
                        ]);
                    }
                    return o;
                  }
                  if ((t = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i))) {
                    var n,
                      i,
                      a,
                      r,
                      l = t[1].split(','),
                      s = /^\s*(\d+|\d*\.\d+|\d+\.\d*)\s*$/;
                    if (
                      l.length >= 3 &&
                      (n = l[0].match(s)) &&
                      (i = l[1].match(s)) &&
                      (a = l[2].match(s))
                    )
                      return (
                        (o.format = 'rgb'),
                        (o.rgba = [
                          parseFloat(n[1]) || 0,
                          parseFloat(i[1]) || 0,
                          parseFloat(a[1]) || 0,
                          null,
                        ]),
                        l.length >= 4 &&
                          (r = l[3].match(s)) &&
                          ((o.format = 'rgba'), (o.rgba[3] = parseFloat(r[1]) || 0)),
                        o
                      );
                  }
                  return !1;
                },
                parsePaletteValue: function (e) {
                  var t = [];
                  'string' == typeof e
                    ? e.replace(/#[0-9A-F]{3}([0-9A-F]{3})?|rgba?\(([^)]*)\)/gi, function (e) {
                        t.push(e);
                      })
                    : Array.isArray(e) && (t = e);
                  for (var o = [], n = 0; n < t.length; n++) {
                    var a = i.parseColorString(t[n]);
                    a && o.push(a);
                  }
                  return o;
                },
                containsTranparentColor: function (e) {
                  for (var t = 0; t < e.length; t++) {
                    var o = e[t].rgba[3];
                    if (null !== o && o < 1) return !0;
                  }
                  return !1;
                },
                isAlphaFormat: function (e) {
                  switch (e.toLowerCase()) {
                    case 'hexa':
                    case 'rgba':
                      return !0;
                  }
                  return !1;
                },
                scaleCanvasForHighDPR: function (t) {
                  var o = e.devicePixelRatio || 1;
                  (t.width *= o), (t.height *= o), t.getContext('2d').scale(o, o);
                },
                genColorPreviewCanvas: function (e, t, o, n) {
                  var a = Math.round(i.pub.previewSeparator.length),
                    r = i.pub.chessboardSize,
                    l = i.pub.chessboardColor1,
                    s = i.pub.chessboardColor2,
                    c = o || 2 * r,
                    d = 2 * r,
                    p = i.createEl('canvas'),
                    u = p.getContext('2d');
                  (p.width = c),
                    (p.height = d),
                    n && i.scaleCanvasForHighDPR(p),
                    (u.fillStyle = l),
                    u.fillRect(0, 0, c, d),
                    (u.fillStyle = s);
                  for (var m = 0; m < c; m += 2 * r)
                    u.fillRect(m, 0, r, r), u.fillRect(m + r, r, r, r);
                  e && ((u.fillStyle = e), u.fillRect(0, 0, c, d));
                  var h = null;
                  switch (t) {
                    case 'left':
                      (h = 0), u.clearRect(0, 0, a / 2, d);
                      break;
                    case 'right':
                      (h = c - a), u.clearRect(c - a / 2, 0, a / 2, d);
                  }
                  if (null !== h) {
                    u.lineWidth = 1;
                    for (var g = 0; g < i.pub.previewSeparator.length; g += 1)
                      u.beginPath(),
                        (u.strokeStyle = i.pub.previewSeparator[g]),
                        u.moveTo(0.5 + h + g, 0),
                        u.lineTo(0.5 + h + g, d),
                        u.stroke();
                  }
                  return { canvas: p, width: c, height: d };
                },
                genColorPreviewGradient: function (e, t, o) {
                  var n;
                  return (
                    (n =
                      t && o
                        ? [
                            'to ' + { left: 'right', right: 'left' }[t],
                            e + ' 0%',
                            e + ' ' + o + 'px',
                            'rgba(0,0,0,0) ' + (o + 1) + 'px',
                            'rgba(0,0,0,0) 100%',
                          ]
                        : ['to right', e + ' 0%', e + ' 100%']),
                    i.linearGradient.apply(this, n)
                  );
                },
                redrawPosition: function () {
                  if (i.picker && i.picker.owner) {
                    var e,
                      t,
                      o = i.picker.owner;
                    o.fixed
                      ? ((e = i.getElementPos(o.targetElement, !0)), (t = [0, 0]))
                      : ((e = i.getElementPos(o.targetElement)), (t = i.getViewPos()));
                    var n,
                      a,
                      r,
                      l = i.getElementSize(o.targetElement),
                      s = i.getViewSize(),
                      c = i.getPickerDims(o),
                      d = [c.borderW, c.borderH];
                    switch (o.position.toLowerCase()) {
                      case 'left':
                        (n = 1), (a = 0), (r = -1);
                        break;
                      case 'right':
                        (n = 1), (a = 0), (r = 1);
                        break;
                      case 'top':
                        (n = 0), (a = 1), (r = -1);
                        break;
                      default:
                        (n = 0), (a = 1), (r = 1);
                    }
                    var p = (l[a] + d[a]) / 2;
                    if (o.smartPosition)
                      u = [
                        -t[n] + e[n] + d[n] > s[n] &&
                        -t[n] + e[n] + l[n] / 2 > s[n] / 2 &&
                        e[n] + l[n] - d[n] >= 0
                          ? e[n] + l[n] - d[n]
                          : e[n],
                        -t[a] + e[a] + l[a] + d[a] - p + p * r > s[a]
                          ? -t[a] + e[a] + l[a] / 2 > s[a] / 2 && e[a] + l[a] - p - p * r >= 0
                            ? e[a] + l[a] - p - p * r
                            : e[a] + l[a] - p + p * r
                          : e[a] + l[a] - p + p * r >= 0
                          ? e[a] + l[a] - p + p * r
                          : e[a] + l[a] - p - p * r,
                      ];
                    else var u = [e[n], e[a] + l[a] - p + p * r];
                    var m = u[n],
                      h = u[a],
                      g = o.fixed ? 'fixed' : 'absolute',
                      f = (u[0] + d[0] > e[0] || u[0] < e[0] + l[0]) && u[1] + d[1] < e[1] + l[1];
                    i._drawPosition(o, m, h, g, f);
                  }
                },
                _drawPosition: function (e, t, o, n, a) {
                  var r = a ? 0 : e.shadowBlur;
                  (i.picker.wrap.style.position = n),
                    (i.picker.wrap.style.left = t + 'px'),
                    (i.picker.wrap.style.top = o + 'px'),
                    i.setBoxShadow(
                      i.picker.boxS,
                      e.shadow ? new i.BoxShadow(0, r, e.shadowBlur, 0, e.shadowColor) : null,
                    );
                },
                getPickerDims: function (e) {
                  var t = 2 * e.controlBorderWidth + e.width,
                    o = 2 * e.controlBorderWidth + e.height,
                    n = 2 * e.controlBorderWidth + 2 * i.getControlPadding(e) + e.sliderSize;
                  i.getSliderChannel(e) && (t += n), e.hasAlphaChannel() && (t += n);
                  var a = i.getPaletteDims(e, t);
                  a.height && (o += a.height + e.padding),
                    e.closeButton && (o += 2 * e.controlBorderWidth + e.padding + e.buttonHeight);
                  var r = t + 2 * e.padding,
                    l = o + 2 * e.padding;
                  return {
                    contentW: t,
                    contentH: o,
                    paddedW: r,
                    paddedH: l,
                    borderW: r + 2 * e.borderWidth,
                    borderH: l + 2 * e.borderWidth,
                    palette: a,
                  };
                },
                getPaletteDims: function (e, t) {
                  var o = 0,
                    n = 0,
                    i = 0,
                    a = 0,
                    r = 0,
                    l = e._palette ? e._palette.length : 0;
                  return (
                    l &&
                      ((n = (o = e.paletteCols) > 0 ? Math.ceil(l / o) : 0),
                      (i = Math.max(1, Math.floor((t - (o - 1) * e.paletteSpacing) / o))),
                      (a = e.paletteHeight ? Math.min(e.paletteHeight, i) : i)),
                    n && (r = n * a + (n - 1) * e.paletteSpacing),
                    { cols: o, rows: n, cellW: i, cellH: a, width: t, height: r }
                  );
                },
                getControlPadding: function (e) {
                  return Math.max(
                    e.padding / 2,
                    2 * e.pointerBorderWidth + e.pointerThickness - e.controlBorderWidth,
                  );
                },
                getPadYChannel: function (e) {
                  switch (e.mode.charAt(1).toLowerCase()) {
                    case 'v':
                      return 'v';
                  }
                  return 's';
                },
                getSliderChannel: function (e) {
                  if (e.mode.length > 2)
                    switch (e.mode.charAt(2).toLowerCase()) {
                      case 's':
                        return 's';
                      case 'v':
                        return 'v';
                    }
                  return null;
                },
                triggerCallback: function (e, t) {
                  if (e[t]) {
                    var o = null;
                    if ('string' == typeof e[t])
                      try {
                        o = new Function(e[t]);
                      } catch (e) {
                        console.error(e);
                      }
                    else o = e[t];
                    o && o.call(e);
                  }
                },
                triggerGlobal: function (e) {
                  for (var t = i.getInstances(), o = 0; o < t.length; o += 1) t[o].trigger(e);
                },
                _pointerMoveEvent: { mouse: 'mousemove', touch: 'touchmove' },
                _pointerEndEvent: { mouse: 'mouseup', touch: 'touchend' },
                _pointerOrigin: null,
                _capturedTarget: null,
                onDocumentKeyUp: function (e) {
                  -1 !== ['Tab', 'Escape'].indexOf(i.eventKey(e)) &&
                    i.picker &&
                    i.picker.owner &&
                    i.picker.owner.tryHide();
                },
                onWindowResize: function (e) {
                  i.redrawPosition();
                },
                onWindowScroll: function (e) {
                  i.redrawPosition();
                },
                onParentScroll: function (e) {
                  i.picker && i.picker.owner && i.picker.owner.tryHide();
                },
                onDocumentMouseDown: function (e) {
                  var t = e.target || e.srcElement;
                  t.jscolor && t.jscolor instanceof i.pub
                    ? t.jscolor.showOnClick && !t.disabled && t.jscolor.show()
                    : i.getData(t, 'gui')
                    ? i.getData(t, 'control') &&
                      i.onControlPointerStart(e, t, i.getData(t, 'control'), 'mouse')
                    : i.picker && i.picker.owner && i.picker.owner.tryHide();
                },
                onPickerTouchStart: function (e) {
                  var t = e.target || e.srcElement;
                  i.getData(t, 'control') &&
                    i.onControlPointerStart(e, t, i.getData(t, 'control'), 'touch');
                },
                onControlPointerStart: function (t, o, n, a) {
                  var r = i.getData(o, 'instance');
                  i.preventDefault(t), i.captureTarget(o);
                  var l = function (e, r) {
                    i.attachGroupEvent(
                      'drag',
                      e,
                      i._pointerMoveEvent[a],
                      i.onDocumentPointerMove(t, o, n, a, r),
                    ),
                      i.attachGroupEvent(
                        'drag',
                        e,
                        i._pointerEndEvent[a],
                        i.onDocumentPointerEnd(t, o, n, a),
                      );
                  };
                  if ((l(e.document, [0, 0]), e.parent && e.frameElement)) {
                    var s = e.frameElement.getBoundingClientRect(),
                      c = [-s.left, -s.top];
                    l(e.parent.window.document, c);
                  }
                  var d = i.getAbsPointerPos(t),
                    p = i.getRelPointerPos(t);
                  switch (((i._pointerOrigin = { x: d.x - p.x, y: d.y - p.y }), n)) {
                    case 'pad':
                      'v' === i.getSliderChannel(r) &&
                        0 === r.channels.v &&
                        r.fromHSVA(null, null, 100, null),
                        i.setPad(r, t, 0, 0);
                      break;
                    case 'sld':
                      i.setSld(r, t, 0);
                      break;
                    case 'asld':
                      i.setASld(r, t, 0);
                  }
                  r.trigger('input');
                },
                onDocumentPointerMove: function (e, t, o, n, a) {
                  return function (e) {
                    var n = i.getData(t, 'instance');
                    switch (o) {
                      case 'pad':
                        i.setPad(n, e, a[0], a[1]);
                        break;
                      case 'sld':
                        i.setSld(n, e, a[1]);
                        break;
                      case 'asld':
                        i.setASld(n, e, a[1]);
                    }
                    n.trigger('input');
                  };
                },
                onDocumentPointerEnd: function (e, t, o, n) {
                  return function (e) {
                    var o = i.getData(t, 'instance');
                    i.detachGroupEvents('drag'),
                      i.releaseTarget(),
                      o.trigger('input'),
                      o.trigger('change');
                  };
                },
                onPaletteSampleClick: function (e) {
                  var t = e.currentTarget,
                    o = i.getData(t, 'instance'),
                    n = i.getData(t, 'color');
                  'any' === o.format.toLowerCase() &&
                    (o._setFormat(n.format), i.isAlphaFormat(o.getFormat()) || (n.rgba[3] = 1)),
                    null === n.rgba[3] &&
                      (!0 === o.paletteSetsAlpha ||
                        ('auto' === o.paletteSetsAlpha && o._paletteHasTransparency)) &&
                      (n.rgba[3] = 1),
                    o.fromRGBA.apply(o, n.rgba),
                    o.trigger('input'),
                    o.trigger('change'),
                    o.hideOnPaletteClick && o.hide();
                },
                setPad: function (e, t, o, n) {
                  var a = i.getAbsPointerPos(t),
                    r = o + a.x - i._pointerOrigin.x - e.padding - e.controlBorderWidth,
                    l = n + a.y - i._pointerOrigin.y - e.padding - e.controlBorderWidth,
                    s = r * (360 / (e.width - 1)),
                    c = 100 - l * (100 / (e.height - 1));
                  switch (i.getPadYChannel(e)) {
                    case 's':
                      e.fromHSVA(s, c, null, null);
                      break;
                    case 'v':
                      e.fromHSVA(s, null, c, null);
                  }
                },
                setSld: function (e, t, o) {
                  var n =
                    100 -
                    (o +
                      i.getAbsPointerPos(t).y -
                      i._pointerOrigin.y -
                      e.padding -
                      e.controlBorderWidth) *
                      (100 / (e.height - 1));
                  switch (i.getSliderChannel(e)) {
                    case 's':
                      e.fromHSVA(null, n, null, null);
                      break;
                    case 'v':
                      e.fromHSVA(null, null, n, null);
                  }
                },
                setASld: function (e, t, o) {
                  var n =
                    1 -
                    (o +
                      i.getAbsPointerPos(t).y -
                      i._pointerOrigin.y -
                      e.padding -
                      e.controlBorderWidth) *
                      (1 / (e.height - 1));
                  if (n < 1) {
                    var a = e.getFormat();
                    'any' !== e.format.toLowerCase() ||
                      i.isAlphaFormat(a) ||
                      e._setFormat('hex' === a ? 'hexa' : 'rgba');
                  }
                  e.fromHSVA(null, null, null, n);
                },
                createPadCanvas: function () {
                  var e = { elm: null, draw: null },
                    t = i.createEl('canvas'),
                    o = t.getContext('2d');
                  return (
                    (e.elm = t),
                    (e.draw = function (e, n, i) {
                      (t.width = e), (t.height = n), o.clearRect(0, 0, t.width, t.height);
                      var a = o.createLinearGradient(0, 0, t.width, 0);
                      a.addColorStop(0, '#F00'),
                        a.addColorStop(1 / 6, '#FF0'),
                        a.addColorStop(2 / 6, '#0F0'),
                        a.addColorStop(0.5, '#0FF'),
                        a.addColorStop(4 / 6, '#00F'),
                        a.addColorStop(5 / 6, '#F0F'),
                        a.addColorStop(1, '#F00'),
                        (o.fillStyle = a),
                        o.fillRect(0, 0, t.width, t.height);
                      var r = o.createLinearGradient(0, 0, 0, t.height);
                      switch (i.toLowerCase()) {
                        case 's':
                          r.addColorStop(0, 'rgba(255,255,255,0)'),
                            r.addColorStop(1, 'rgba(255,255,255,1)');
                          break;
                        case 'v':
                          r.addColorStop(0, 'rgba(0,0,0,0)'), r.addColorStop(1, 'rgba(0,0,0,1)');
                      }
                      (o.fillStyle = r), o.fillRect(0, 0, t.width, t.height);
                    }),
                    e
                  );
                },
                createSliderGradient: function () {
                  var e = { elm: null, draw: null },
                    t = i.createEl('canvas'),
                    o = t.getContext('2d');
                  return (
                    (e.elm = t),
                    (e.draw = function (e, n, i, a) {
                      (t.width = e), (t.height = n), o.clearRect(0, 0, t.width, t.height);
                      var r = o.createLinearGradient(0, 0, 0, t.height);
                      r.addColorStop(0, i),
                        r.addColorStop(1, a),
                        (o.fillStyle = r),
                        o.fillRect(0, 0, t.width, t.height);
                    }),
                    e
                  );
                },
                createASliderGradient: function () {
                  var e = { elm: null, draw: null },
                    t = i.createEl('canvas'),
                    o = t.getContext('2d');
                  return (
                    (e.elm = t),
                    (e.draw = function (e, n, a) {
                      (t.width = e), (t.height = n), o.clearRect(0, 0, t.width, t.height);
                      var r = t.width / 2,
                        l = i.pub.chessboardColor1,
                        s = i.pub.chessboardColor2;
                      if (((o.fillStyle = l), o.fillRect(0, 0, t.width, t.height), r > 0))
                        for (var c = 0; c < t.height; c += 2 * r)
                          (o.fillStyle = s), o.fillRect(0, c, r, r), o.fillRect(r, c + r, r, r);
                      var d = o.createLinearGradient(0, 0, 0, t.height);
                      d.addColorStop(0, a),
                        d.addColorStop(1, 'rgba(0,0,0,0)'),
                        (o.fillStyle = d),
                        o.fillRect(0, 0, t.width, t.height);
                    }),
                    e
                  );
                },
                BoxShadow:
                  ((t = function (e, t, o, n, i, a) {
                    (this.hShadow = e),
                      (this.vShadow = t),
                      (this.blur = o),
                      (this.spread = n),
                      (this.color = i),
                      (this.inset = !!a);
                  }),
                  (t.prototype.toString = function () {
                    var e = [
                      Math.round(this.hShadow) + 'px',
                      Math.round(this.vShadow) + 'px',
                      Math.round(this.blur) + 'px',
                      Math.round(this.spread) + 'px',
                      this.color,
                    ];
                    return this.inset && e.push('inset'), e.join(' ');
                  }),
                  t),
                flags: { leaveValue: 1, leaveAlpha: 2, leavePreview: 4 },
                enumOpts: {
                  format: ['auto', 'any', 'hex', 'hexa', 'rgb', 'rgba'],
                  previewPosition: ['left', 'right'],
                  mode: ['hsv', 'hvs', 'hs', 'hv'],
                  position: ['left', 'right', 'top', 'bottom'],
                  alphaChannel: ['auto', !0, !1],
                  paletteSetsAlpha: ['auto', !0, !1],
                },
                deprecatedOpts: {
                  styleElement: 'previewElement',
                  onFineChange: 'onInput',
                  overwriteImportant: 'forceStyle',
                  closable: 'closeButton',
                  insetWidth: 'controlBorderWidth',
                  insetColor: 'controlBorderColor',
                  refine: null,
                },
                docsRef: ' See https://jscolor.com/docs/',
                pub: function (t, o) {
                  var n = this;
                  function a(e, t) {
                    if ('string' != typeof e)
                      throw new Error('Invalid value for option name: ' + e);
                    if (
                      i.enumOpts.hasOwnProperty(e) &&
                      ('string' == typeof t && (t = t.toLowerCase()),
                      -1 === i.enumOpts[e].indexOf(t))
                    )
                      throw new Error("Option '" + e + "' has invalid value: " + t);
                    if (i.deprecatedOpts.hasOwnProperty(e)) {
                      var o = e,
                        a = i.deprecatedOpts[e];
                      if (!a) throw new Error("Option '" + e + "' is DEPRECATED");
                      console.warn(
                        "Option '%s' is DEPRECATED, using '%s' instead." + i.docsRef,
                        o,
                        a,
                      ),
                        (e = a);
                    }
                    var r = 'set__' + e;
                    if ('function' == typeof n[r]) return n[r](t), !0;
                    if (e in n) return (n[e] = t), !0;
                    throw new Error('Unrecognized configuration option: ' + e);
                  }
                  function r(e) {
                    if ('string' != typeof e)
                      throw new Error('Invalid value for option name: ' + e);
                    if (i.deprecatedOpts.hasOwnProperty(e)) {
                      var t = e,
                        o = i.deprecatedOpts[e];
                      if (!o) throw new Error("Option '" + e + "' is DEPRECATED");
                      console.warn(
                        "Option '%s' is DEPRECATED, using '%s' instead." + i.docsRef,
                        t,
                        o,
                      ),
                        (e = o);
                    }
                    var a = 'get__' + e;
                    if ('function' == typeof n[a]) return n[a](value);
                    if (e in n) return n[e];
                    throw new Error('Unrecognized configuration option: ' + e);
                  }
                  function l() {
                    n._processParentElementsInDOM(),
                      i.picker ||
                        ((i.picker = {
                          owner: null,
                          wrap: i.createEl('div'),
                          box: i.createEl('div'),
                          boxS: i.createEl('div'),
                          boxB: i.createEl('div'),
                          pad: i.createEl('div'),
                          padB: i.createEl('div'),
                          padM: i.createEl('div'),
                          padCanvas: i.createPadCanvas(),
                          cross: i.createEl('div'),
                          crossBY: i.createEl('div'),
                          crossBX: i.createEl('div'),
                          crossLY: i.createEl('div'),
                          crossLX: i.createEl('div'),
                          sld: i.createEl('div'),
                          sldB: i.createEl('div'),
                          sldM: i.createEl('div'),
                          sldGrad: i.createSliderGradient(),
                          sldPtrS: i.createEl('div'),
                          sldPtrIB: i.createEl('div'),
                          sldPtrMB: i.createEl('div'),
                          sldPtrOB: i.createEl('div'),
                          asld: i.createEl('div'),
                          asldB: i.createEl('div'),
                          asldM: i.createEl('div'),
                          asldGrad: i.createASliderGradient(),
                          asldPtrS: i.createEl('div'),
                          asldPtrIB: i.createEl('div'),
                          asldPtrMB: i.createEl('div'),
                          asldPtrOB: i.createEl('div'),
                          pal: i.createEl('div'),
                          btn: i.createEl('div'),
                          btnT: i.createEl('span'),
                        }),
                        i.picker.pad.appendChild(i.picker.padCanvas.elm),
                        i.picker.padB.appendChild(i.picker.pad),
                        i.picker.cross.appendChild(i.picker.crossBY),
                        i.picker.cross.appendChild(i.picker.crossBX),
                        i.picker.cross.appendChild(i.picker.crossLY),
                        i.picker.cross.appendChild(i.picker.crossLX),
                        i.picker.padB.appendChild(i.picker.cross),
                        i.picker.box.appendChild(i.picker.padB),
                        i.picker.box.appendChild(i.picker.padM),
                        i.picker.sld.appendChild(i.picker.sldGrad.elm),
                        i.picker.sldB.appendChild(i.picker.sld),
                        i.picker.sldB.appendChild(i.picker.sldPtrOB),
                        i.picker.sldPtrOB.appendChild(i.picker.sldPtrMB),
                        i.picker.sldPtrMB.appendChild(i.picker.sldPtrIB),
                        i.picker.sldPtrIB.appendChild(i.picker.sldPtrS),
                        i.picker.box.appendChild(i.picker.sldB),
                        i.picker.box.appendChild(i.picker.sldM),
                        i.picker.asld.appendChild(i.picker.asldGrad.elm),
                        i.picker.asldB.appendChild(i.picker.asld),
                        i.picker.asldB.appendChild(i.picker.asldPtrOB),
                        i.picker.asldPtrOB.appendChild(i.picker.asldPtrMB),
                        i.picker.asldPtrMB.appendChild(i.picker.asldPtrIB),
                        i.picker.asldPtrIB.appendChild(i.picker.asldPtrS),
                        i.picker.box.appendChild(i.picker.asldB),
                        i.picker.box.appendChild(i.picker.asldM),
                        i.picker.box.appendChild(i.picker.pal),
                        i.picker.btn.appendChild(i.picker.btnT),
                        i.picker.box.appendChild(i.picker.btn),
                        i.picker.boxB.appendChild(i.picker.box),
                        i.picker.wrap.appendChild(i.picker.boxS),
                        i.picker.wrap.appendChild(i.picker.boxB),
                        i.picker.wrap.addEventListener(
                          'touchstart',
                          i.onPickerTouchStart,
                          !!i.isPassiveEventSupported && { passive: !1 },
                        ));
                    var t,
                      o,
                      a = i.picker,
                      r = !!i.getSliderChannel(n),
                      l = n.hasAlphaChannel(),
                      p = i.getPickerDims(n),
                      u = 2 * n.pointerBorderWidth + n.pointerThickness + 2 * n.crossSize,
                      m = i.getControlPadding(n),
                      h = Math.min(n.borderRadius, Math.round(n.padding * Math.PI));
                    (a.wrap.className = 'jscolor-picker-wrap'),
                      (a.wrap.style.clear = 'both'),
                      (a.wrap.style.width = p.borderW + 'px'),
                      (a.wrap.style.height = p.borderH + 'px'),
                      (a.wrap.style.zIndex = n.zIndex),
                      (a.box.className = 'jscolor-picker'),
                      (a.box.style.width = p.paddedW + 'px'),
                      (a.box.style.height = p.paddedH + 'px'),
                      (a.box.style.position = 'relative'),
                      (a.boxS.className = 'jscolor-picker-shadow'),
                      (a.boxS.style.position = 'absolute'),
                      (a.boxS.style.left = '0'),
                      (a.boxS.style.top = '0'),
                      (a.boxS.style.width = '100%'),
                      (a.boxS.style.height = '100%'),
                      i.setBorderRadius(a.boxS, h + 'px'),
                      (a.boxB.className = 'jscolor-picker-border'),
                      (a.boxB.style.position = 'relative'),
                      (a.boxB.style.border = n.borderWidth + 'px solid'),
                      (a.boxB.style.borderColor = n.borderColor),
                      (a.boxB.style.background = n.backgroundColor),
                      i.setBorderRadius(a.boxB, h + 'px'),
                      (a.padM.style.background = 'rgba(255,0,0,.2)'),
                      (a.sldM.style.background = 'rgba(0,255,0,.2)'),
                      (a.asldM.style.background = 'rgba(0,0,255,.2)'),
                      (a.padM.style.opacity = a.sldM.style.opacity = a.asldM.style.opacity = '0'),
                      (a.pad.style.position = 'relative'),
                      (a.pad.style.width = n.width + 'px'),
                      (a.pad.style.height = n.height + 'px'),
                      a.padCanvas.draw(n.width, n.height, i.getPadYChannel(n)),
                      (a.padB.style.position = 'absolute'),
                      (a.padB.style.left = n.padding + 'px'),
                      (a.padB.style.top = n.padding + 'px'),
                      (a.padB.style.border = n.controlBorderWidth + 'px solid'),
                      (a.padB.style.borderColor = n.controlBorderColor),
                      (a.padM.style.position = 'absolute'),
                      (a.padM.style.left = '0px'),
                      (a.padM.style.top = '0px'),
                      (a.padM.style.width =
                        n.padding + 2 * n.controlBorderWidth + n.width + m + 'px'),
                      (a.padM.style.height =
                        2 * n.controlBorderWidth + 2 * n.padding + n.height + 'px'),
                      (a.padM.style.cursor = 'crosshair'),
                      i.setData(a.padM, { instance: n, control: 'pad' }),
                      (a.cross.style.position = 'absolute'),
                      (a.cross.style.left = a.cross.style.top = '0'),
                      (a.cross.style.width = a.cross.style.height = u + 'px'),
                      (a.crossBY.style.position = a.crossBX.style.position = 'absolute'),
                      (a.crossBY.style.background = a.crossBX.style.background =
                        n.pointerBorderColor),
                      (a.crossBY.style.width = a.crossBX.style.height =
                        2 * n.pointerBorderWidth + n.pointerThickness + 'px'),
                      (a.crossBY.style.height = a.crossBX.style.width = u + 'px'),
                      (a.crossBY.style.left = a.crossBX.style.top =
                        Math.floor(u / 2) -
                        Math.floor(n.pointerThickness / 2) -
                        n.pointerBorderWidth +
                        'px'),
                      (a.crossBY.style.top = a.crossBX.style.left = '0'),
                      (a.crossLY.style.position = a.crossLX.style.position = 'absolute'),
                      (a.crossLY.style.background = a.crossLX.style.background = n.pointerColor),
                      (a.crossLY.style.height = a.crossLX.style.width =
                        u - 2 * n.pointerBorderWidth + 'px'),
                      (a.crossLY.style.width = a.crossLX.style.height = n.pointerThickness + 'px'),
                      (a.crossLY.style.left = a.crossLX.style.top =
                        Math.floor(u / 2) - Math.floor(n.pointerThickness / 2) + 'px'),
                      (a.crossLY.style.top = a.crossLX.style.left = n.pointerBorderWidth + 'px'),
                      (a.sld.style.overflow = 'hidden'),
                      (a.sld.style.width = n.sliderSize + 'px'),
                      (a.sld.style.height = n.height + 'px'),
                      a.sldGrad.draw(n.sliderSize, n.height, '#000', '#000'),
                      (a.sldB.style.display = r ? 'block' : 'none'),
                      (a.sldB.style.position = 'absolute'),
                      (a.sldB.style.left =
                        n.padding + n.width + 2 * n.controlBorderWidth + 2 * m + 'px'),
                      (a.sldB.style.top = n.padding + 'px'),
                      (a.sldB.style.border = n.controlBorderWidth + 'px solid'),
                      (a.sldB.style.borderColor = n.controlBorderColor),
                      (a.sldM.style.display = r ? 'block' : 'none'),
                      (a.sldM.style.position = 'absolute'),
                      (a.sldM.style.left =
                        n.padding + n.width + 2 * n.controlBorderWidth + m + 'px'),
                      (a.sldM.style.top = '0px'),
                      (a.sldM.style.width =
                        n.sliderSize +
                        2 * m +
                        2 * n.controlBorderWidth +
                        (l ? 0 : Math.max(0, n.padding - m)) +
                        'px'),
                      (a.sldM.style.height =
                        2 * n.controlBorderWidth + 2 * n.padding + n.height + 'px'),
                      (a.sldM.style.cursor = 'default'),
                      i.setData(a.sldM, { instance: n, control: 'sld' }),
                      (a.sldPtrIB.style.border = a.sldPtrOB.style.border =
                        n.pointerBorderWidth + 'px solid ' + n.pointerBorderColor),
                      (a.sldPtrOB.style.position = 'absolute'),
                      (a.sldPtrOB.style.left =
                        -(2 * n.pointerBorderWidth + n.pointerThickness) + 'px'),
                      (a.sldPtrOB.style.top = '0'),
                      (a.sldPtrMB.style.border = n.pointerThickness + 'px solid ' + n.pointerColor),
                      (a.sldPtrS.style.width = n.sliderSize + 'px'),
                      (a.sldPtrS.style.height = i.pub.sliderInnerSpace + 'px'),
                      (a.asld.style.overflow = 'hidden'),
                      (a.asld.style.width = n.sliderSize + 'px'),
                      (a.asld.style.height = n.height + 'px'),
                      a.asldGrad.draw(n.sliderSize, n.height, '#000'),
                      (a.asldB.style.display = l ? 'block' : 'none'),
                      (a.asldB.style.position = 'absolute'),
                      (a.asldB.style.left =
                        n.padding +
                        n.width +
                        2 * n.controlBorderWidth +
                        m +
                        (r ? n.sliderSize + 3 * m + 2 * n.controlBorderWidth : 0) +
                        'px'),
                      (a.asldB.style.top = n.padding + 'px'),
                      (a.asldB.style.border = n.controlBorderWidth + 'px solid'),
                      (a.asldB.style.borderColor = n.controlBorderColor),
                      (a.asldM.style.display = l ? 'block' : 'none'),
                      (a.asldM.style.position = 'absolute'),
                      (a.asldM.style.left =
                        n.padding +
                        n.width +
                        2 * n.controlBorderWidth +
                        m +
                        (r ? n.sliderSize + 2 * m + 2 * n.controlBorderWidth : 0) +
                        'px'),
                      (a.asldM.style.top = '0px'),
                      (a.asldM.style.width =
                        n.sliderSize +
                        2 * m +
                        2 * n.controlBorderWidth +
                        Math.max(0, n.padding - m) +
                        'px'),
                      (a.asldM.style.height =
                        2 * n.controlBorderWidth + 2 * n.padding + n.height + 'px'),
                      (a.asldM.style.cursor = 'default'),
                      i.setData(a.asldM, { instance: n, control: 'asld' }),
                      (a.asldPtrIB.style.border = a.asldPtrOB.style.border =
                        n.pointerBorderWidth + 'px solid ' + n.pointerBorderColor),
                      (a.asldPtrOB.style.position = 'absolute'),
                      (a.asldPtrOB.style.left =
                        -(2 * n.pointerBorderWidth + n.pointerThickness) + 'px'),
                      (a.asldPtrOB.style.top = '0'),
                      (a.asldPtrMB.style.border =
                        n.pointerThickness + 'px solid ' + n.pointerColor),
                      (a.asldPtrS.style.width = n.sliderSize + 'px'),
                      (a.asldPtrS.style.height = i.pub.sliderInnerSpace + 'px'),
                      (a.pal.className = 'jscolor-palette'),
                      (a.pal.style.display = p.palette.rows ? 'block' : 'none'),
                      (a.pal.style.position = 'absolute'),
                      (a.pal.style.left = n.padding + 'px'),
                      (a.pal.style.top =
                        2 * n.controlBorderWidth + 2 * n.padding + n.height + 'px'),
                      (a.pal.innerHTML = '');
                    for (
                      var g = i.genColorPreviewCanvas('rgba(0,0,0,0)'), f = 0, C = 0;
                      C < p.palette.rows;
                      C++
                    )
                      for (var y = 0; y < p.palette.cols && f < n._palette.length; y++, f++) {
                        var b = n._palette[f],
                          k = i.rgbaColor.apply(null, b.rgba),
                          G = i.createEl('div');
                        (G.style.width = p.palette.cellW - 2 * n.controlBorderWidth + 'px'),
                          (G.style.height = p.palette.cellH - 2 * n.controlBorderWidth + 'px'),
                          (G.style.backgroundColor = k);
                        var v = i.createEl('div');
                        (v.className = 'jscolor-palette-sample'),
                          (v.style.display = 'block'),
                          (v.style.position = 'absolute'),
                          (v.style.left =
                            (p.palette.cols <= 1
                              ? 0
                              : Math.round(
                                  y * ((p.contentW - p.palette.cellW) / (p.palette.cols - 1)) * 10,
                                ) / 10) + 'px'),
                          (v.style.top = C * (p.palette.cellH + n.paletteSpacing) + 'px'),
                          (v.style.border = n.controlBorderWidth + 'px solid'),
                          (v.style.borderColor = n.controlBorderColor),
                          (v.style.cursor = 'pointer'),
                          null !== b.rgba[3] &&
                            b.rgba[3] < 1 &&
                            ((v.style.backgroundImage = "url('" + g.canvas.toDataURL() + "')"),
                            (v.style.backgroundRepeat = 'repeat'),
                            (v.style.backgroundPosition = 'center center')),
                          i.setData(v, { instance: n, control: 'palette-sample', color: b }),
                          v.addEventListener('click', i.onPaletteSampleClick, !1),
                          v.appendChild(G),
                          a.pal.appendChild(v);
                      }
                    (a.btn.className = 'jscolor-btn-close'),
                      (a.btn.style.display = n.closeButton ? 'block' : 'none'),
                      (a.btn.style.position = 'absolute'),
                      (a.btn.style.left = n.padding + 'px'),
                      (a.btn.style.bottom = n.padding + 'px'),
                      (a.btn.style.padding = '0 15px'),
                      (a.btn.style.maxWidth = p.contentW - 2 * n.controlBorderWidth - 30 + 'px'),
                      (a.btn.style.overflow = 'hidden'),
                      (a.btn.style.height = n.buttonHeight + 'px'),
                      (a.btn.style.whiteSpace = 'nowrap'),
                      (a.btn.style.border = n.controlBorderWidth + 'px solid'),
                      (o =
                        (t = n.controlBorderColor.split(/\s+/)).length < 2
                          ? t[0]
                          : t[1] + ' ' + t[0] + ' ' + t[0] + ' ' + t[1]),
                      (a.btn.style.borderColor = o),
                      (a.btn.style.color = n.buttonColor),
                      (a.btn.style.font = '12px sans-serif'),
                      (a.btn.style.textAlign = 'center'),
                      (a.btn.style.cursor = 'pointer'),
                      (a.btn.onmousedown = function () {
                        n.hide();
                      }),
                      (a.btnT.style.lineHeight = n.buttonHeight + 'px'),
                      (a.btnT.innerHTML = ''),
                      a.btnT.appendChild(e.document.createTextNode(n.closeText)),
                      s(),
                      c(),
                      d(),
                      i.picker.owner &&
                        i.picker.owner !== n &&
                        i.removeClass(i.picker.owner.targetElement, i.pub.activeClassName),
                      (i.picker.owner = n),
                      n.container === e.document.body
                        ? i.redrawPosition()
                        : i._drawPosition(n, 0, 0, 'relative', !1),
                      a.wrap.parentNode !== n.container && n.container.appendChild(a.wrap),
                      i.addClass(n.targetElement, i.pub.activeClassName);
                  }
                  function s() {
                    var e = i.getPadYChannel(n),
                      t = Math.round((n.channels.h / 360) * (n.width - 1)),
                      o = Math.round((1 - n.channels[e] / 100) * (n.height - 1)),
                      a = 2 * n.pointerBorderWidth + n.pointerThickness + 2 * n.crossSize,
                      r = -Math.floor(a / 2);
                    switch (
                      ((i.picker.cross.style.left = t + r + 'px'),
                      (i.picker.cross.style.top = o + r + 'px'),
                      i.getSliderChannel(n))
                    ) {
                      case 's':
                        var l = i.HSV_RGB(n.channels.h, 100, n.channels.v),
                          s = i.HSV_RGB(n.channels.h, 0, n.channels.v),
                          c =
                            'rgb(' +
                            Math.round(l[0]) +
                            ',' +
                            Math.round(l[1]) +
                            ',' +
                            Math.round(l[2]) +
                            ')',
                          d =
                            'rgb(' +
                            Math.round(s[0]) +
                            ',' +
                            Math.round(s[1]) +
                            ',' +
                            Math.round(s[2]) +
                            ')';
                        i.picker.sldGrad.draw(n.sliderSize, n.height, c, d);
                        break;
                      case 'v':
                        var p = i.HSV_RGB(n.channels.h, n.channels.s, 100);
                        (c =
                          'rgb(' +
                          Math.round(p[0]) +
                          ',' +
                          Math.round(p[1]) +
                          ',' +
                          Math.round(p[2]) +
                          ')'),
                          (d = '#000'),
                          i.picker.sldGrad.draw(n.sliderSize, n.height, c, d);
                    }
                    i.picker.asldGrad.draw(n.sliderSize, n.height, n.toHEXString());
                  }
                  function c() {
                    var e = i.getSliderChannel(n);
                    if (e) {
                      var t = Math.round((1 - n.channels[e] / 100) * (n.height - 1));
                      i.picker.sldPtrOB.style.top =
                        t -
                        (2 * n.pointerBorderWidth + n.pointerThickness) -
                        Math.floor(i.pub.sliderInnerSpace / 2) +
                        'px';
                    }
                    i.picker.asldGrad.draw(n.sliderSize, n.height, n.toHEXString());
                  }
                  function d() {
                    var e = Math.round((1 - n.channels.a) * (n.height - 1));
                    i.picker.asldPtrOB.style.top =
                      e -
                      (2 * n.pointerBorderWidth + n.pointerThickness) -
                      Math.floor(i.pub.sliderInnerSpace / 2) +
                      'px';
                  }
                  function p() {
                    return i.picker && i.picker.owner === n;
                  }
                  if (
                    (o || (o = {}),
                    (this.channels = { r: 255, g: 255, b: 255, h: 0, s: 0, v: 100, a: 1 }),
                    (this.format = 'auto'),
                    (this.value = void 0),
                    (this.alpha = void 0),
                    (this.onChange = void 0),
                    (this.onInput = void 0),
                    (this.valueElement = void 0),
                    (this.alphaElement = void 0),
                    (this.previewElement = void 0),
                    (this.previewPosition = 'left'),
                    (this.previewSize = 32),
                    (this.previewPadding = 8),
                    (this.required = !0),
                    (this.hash = !0),
                    (this.uppercase = !0),
                    (this.forceStyle = !0),
                    (this.width = 181),
                    (this.height = 101),
                    (this.mode = 'HSV'),
                    (this.alphaChannel = 'auto'),
                    (this.position = 'bottom'),
                    (this.smartPosition = !0),
                    (this.showOnClick = !0),
                    (this.hideOnLeave = !0),
                    (this.palette = []),
                    (this.paletteCols = 10),
                    (this.paletteSetsAlpha = 'auto'),
                    (this.paletteHeight = 16),
                    (this.paletteSpacing = 4),
                    (this.hideOnPaletteClick = !1),
                    (this.sliderSize = 16),
                    (this.crossSize = 8),
                    (this.closeButton = !1),
                    (this.closeText = 'Close'),
                    (this.buttonColor = 'rgba(0,0,0,1)'),
                    (this.buttonHeight = 18),
                    (this.padding = 12),
                    (this.backgroundColor = 'rgba(255,255,255,1)'),
                    (this.borderWidth = 1),
                    (this.borderColor = 'rgba(187,187,187,1)'),
                    (this.borderRadius = 8),
                    (this.controlBorderWidth = 1),
                    (this.controlBorderColor = 'rgba(187,187,187,1)'),
                    (this.shadow = !0),
                    (this.shadowBlur = 15),
                    (this.shadowColor = 'rgba(0,0,0,0.2)'),
                    (this.pointerColor = 'rgba(76,76,76,1)'),
                    (this.pointerBorderWidth = 1),
                    (this.pointerBorderColor = 'rgba(255,255,255,1)'),
                    (this.pointerThickness = 2),
                    (this.zIndex = 5e3),
                    (this.container = void 0),
                    (this.minS = 0),
                    (this.maxS = 100),
                    (this.minV = 0),
                    (this.maxV = 100),
                    (this.minA = 0),
                    (this.maxA = 1),
                    (this.option = function () {
                      if (!arguments.length) throw new Error('No option specified');
                      if (1 === arguments.length && 'string' == typeof arguments[0]) {
                        try {
                          return r(arguments[0]);
                        } catch (e) {
                          console.warn(e);
                        }
                        return !1;
                      }
                      if (arguments.length >= 2 && 'string' == typeof arguments[0]) {
                        try {
                          if (!a(arguments[0], arguments[1])) return !1;
                        } catch (e) {
                          return console.warn(e), !1;
                        }
                        return this.redraw(), this.exposeColor(), !0;
                      }
                      if (1 === arguments.length && 'object' == typeof arguments[0]) {
                        var e = arguments[0],
                          t = !0;
                        for (var o in e)
                          if (e.hasOwnProperty(o))
                            try {
                              a(o, e[o]) || (t = !1);
                            } catch (e) {
                              console.warn(e), (t = !1);
                            }
                        return this.redraw(), this.exposeColor(), t;
                      }
                      throw new Error('Invalid arguments');
                    }),
                    (this.channel = function (e, t) {
                      if ('string' != typeof e)
                        throw new Error('Invalid value for channel name: ' + e);
                      if (void 0 === t)
                        return this.channels.hasOwnProperty(e.toLowerCase())
                          ? this.channels[e.toLowerCase()]
                          : (console.warn('Getting unknown channel: ' + e), !1);
                      var o = !1;
                      switch (e.toLowerCase()) {
                        case 'r':
                          o = this.fromRGBA(t, null, null, null);
                          break;
                        case 'g':
                          o = this.fromRGBA(null, t, null, null);
                          break;
                        case 'b':
                          o = this.fromRGBA(null, null, t, null);
                          break;
                        case 'h':
                          o = this.fromHSVA(t, null, null, null);
                          break;
                        case 's':
                          o = this.fromHSVA(null, t, null, null);
                          break;
                        case 'v':
                          o = this.fromHSVA(null, null, t, null);
                          break;
                        case 'a':
                          o = this.fromHSVA(null, null, null, t);
                          break;
                        default:
                          return console.warn('Setting unknown channel: ' + e), !1;
                      }
                      return !!o && (this.redraw(), !0);
                    }),
                    (this.trigger = function (e) {
                      for (var t = i.strList(e), o = 0; o < t.length; o += 1) {
                        var n = t[o].toLowerCase(),
                          a = null;
                        switch (n) {
                          case 'input':
                            a = 'onInput';
                            break;
                          case 'change':
                            a = 'onChange';
                        }
                        a && i.triggerCallback(this, a),
                          i.triggerInputEvent(this.valueElement, n, !0, !0);
                      }
                    }),
                    (this.fromHSVA = function (e, t, o, n, a) {
                      if (
                        (void 0 === e && (e = null),
                        void 0 === t && (t = null),
                        void 0 === o && (o = null),
                        void 0 === n && (n = null),
                        null !== e)
                      ) {
                        if (isNaN(e)) return !1;
                        this.channels.h = Math.max(0, Math.min(360, e));
                      }
                      if (null !== t) {
                        if (isNaN(t)) return !1;
                        this.channels.s = Math.max(0, Math.min(100, this.maxS, t), this.minS);
                      }
                      if (null !== o) {
                        if (isNaN(o)) return !1;
                        this.channels.v = Math.max(0, Math.min(100, this.maxV, o), this.minV);
                      }
                      if (null !== n) {
                        if (isNaN(n)) return !1;
                        this.channels.a = this.hasAlphaChannel()
                          ? Math.max(0, Math.min(1, this.maxA, n), this.minA)
                          : 1;
                      }
                      var r = i.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                      return (
                        (this.channels.r = r[0]),
                        (this.channels.g = r[1]),
                        (this.channels.b = r[2]),
                        this.exposeColor(a),
                        !0
                      );
                    }),
                    (this.fromRGBA = function (e, t, o, n, a) {
                      if (
                        (void 0 === e && (e = null),
                        void 0 === t && (t = null),
                        void 0 === o && (o = null),
                        void 0 === n && (n = null),
                        null !== e)
                      ) {
                        if (isNaN(e)) return !1;
                        e = Math.max(0, Math.min(255, e));
                      }
                      if (null !== t) {
                        if (isNaN(t)) return !1;
                        t = Math.max(0, Math.min(255, t));
                      }
                      if (null !== o) {
                        if (isNaN(o)) return !1;
                        o = Math.max(0, Math.min(255, o));
                      }
                      if (null !== n) {
                        if (isNaN(n)) return !1;
                        this.channels.a = this.hasAlphaChannel()
                          ? Math.max(0, Math.min(1, this.maxA, n), this.minA)
                          : 1;
                      }
                      var r = i.RGB_HSV(
                        null === e ? this.channels.r : e,
                        null === t ? this.channels.g : t,
                        null === o ? this.channels.b : o,
                      );
                      null !== r[0] && (this.channels.h = Math.max(0, Math.min(360, r[0]))),
                        0 !== r[2] &&
                          (this.channels.s = Math.max(
                            0,
                            this.minS,
                            Math.min(100, this.maxS, r[1]),
                          )),
                        (this.channels.v = Math.max(0, this.minV, Math.min(100, this.maxV, r[2])));
                      var l = i.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                      return (
                        (this.channels.r = l[0]),
                        (this.channels.g = l[1]),
                        (this.channels.b = l[2]),
                        this.exposeColor(a),
                        !0
                      );
                    }),
                    (this.fromHSV = function (e, t, o, n) {
                      return (
                        console.warn(
                          'fromHSV() method is DEPRECATED. Using fromHSVA() instead.' + i.docsRef,
                        ),
                        this.fromHSVA(e, t, o, null, n)
                      );
                    }),
                    (this.fromRGB = function (e, t, o, n) {
                      return (
                        console.warn(
                          'fromRGB() method is DEPRECATED. Using fromRGBA() instead.' + i.docsRef,
                        ),
                        this.fromRGBA(e, t, o, null, n)
                      );
                    }),
                    (this.fromString = function (e, t) {
                      if (!this.required && '' === e.trim())
                        return this.setPreviewElementBg(null), this.setValueElementValue(''), !0;
                      var o = i.parseColorString(e);
                      return (
                        !!o &&
                        ('any' === this.format.toLowerCase() &&
                          (this._setFormat(o.format),
                          i.isAlphaFormat(this.getFormat()) || (o.rgba[3] = 1)),
                        this.fromRGBA(o.rgba[0], o.rgba[1], o.rgba[2], o.rgba[3], t),
                        !0)
                      );
                    }),
                    (this.toString = function (e) {
                      switch ((void 0 === e && (e = this.getFormat()), e.toLowerCase())) {
                        case 'hex':
                          return this.toHEXString();
                        case 'hexa':
                          return this.toHEXAString();
                        case 'rgb':
                          return this.toRGBString();
                        case 'rgba':
                          return this.toRGBAString();
                      }
                      return !1;
                    }),
                    (this.toHEXString = function () {
                      return i.hexColor(this.channels.r, this.channels.g, this.channels.b);
                    }),
                    (this.toHEXAString = function () {
                      return i.hexaColor(
                        this.channels.r,
                        this.channels.g,
                        this.channels.b,
                        this.channels.a,
                      );
                    }),
                    (this.toRGBString = function () {
                      return i.rgbColor(this.channels.r, this.channels.g, this.channels.b);
                    }),
                    (this.toRGBAString = function () {
                      return i.rgbaColor(
                        this.channels.r,
                        this.channels.g,
                        this.channels.b,
                        this.channels.a,
                      );
                    }),
                    (this.toGrayscale = function () {
                      return (
                        0.213 * this.channels.r + 0.715 * this.channels.g + 0.072 * this.channels.b
                      );
                    }),
                    (this.toCanvas = function () {
                      return i.genColorPreviewCanvas(this.toRGBAString()).canvas;
                    }),
                    (this.toDataURL = function () {
                      return this.toCanvas().toDataURL();
                    }),
                    (this.toBackground = function () {
                      return i.pub.background(this.toRGBAString());
                    }),
                    (this.isLight = function () {
                      return this.toGrayscale() > 127.5;
                    }),
                    (this.hide = function () {
                      p() &&
                        (i.removeClass(n.targetElement, i.pub.activeClassName),
                        i.picker.wrap.parentNode.removeChild(i.picker.wrap),
                        delete i.picker.owner);
                    }),
                    (this.show = function () {
                      l();
                    }),
                    (this.redraw = function () {
                      p() && l();
                    }),
                    (this.getFormat = function () {
                      return this._currentFormat;
                    }),
                    (this._setFormat = function (e) {
                      this._currentFormat = e.toLowerCase();
                    }),
                    (this.hasAlphaChannel = function () {
                      return 'auto' === this.alphaChannel
                        ? 'any' === this.format.toLowerCase() ||
                            i.isAlphaFormat(this.getFormat()) ||
                            void 0 !== this.alpha ||
                            void 0 !== this.alphaElement
                        : this.alphaChannel;
                    }),
                    (this.processValueInput = function (e) {
                      this.fromString(e) || this.exposeColor();
                    }),
                    (this.processAlphaInput = function (e) {
                      this.fromHSVA(null, null, null, parseFloat(e)) || this.exposeColor();
                    }),
                    (this.exposeColor = function (e) {
                      var t = this.toString(),
                        o = this.getFormat();
                      if (
                        (i.setDataAttr(this.targetElement, 'current-color', t),
                        e & i.flags.leaveValue ||
                          !this.valueElement ||
                          (('hex' !== o && 'hexa' !== o) ||
                            (this.uppercase || (t = t.toLowerCase()),
                            this.hash || (t = t.replace(/^#/, ''))),
                          this.setValueElementValue(t)),
                        !(e & i.flags.leaveAlpha) && this.alphaElement)
                      ) {
                        var n = Math.round(100 * this.channels.a) / 100;
                        this.setAlphaElementValue(n);
                      }
                      e & i.flags.leavePreview ||
                        !this.previewElement ||
                        ((i.isTextInput(this.previewElement) ||
                          (i.isButton(this.previewElement) &&
                            !i.isButtonEmpty(this.previewElement))) &&
                          this.previewPosition,
                        this.setPreviewElementBg(this.toRGBAString())),
                        p() && (s(), c(), d());
                    }),
                    (this.setPreviewElementBg = function (e) {
                      if (this.previewElement) {
                        var t = null,
                          o = null;
                        (i.isTextInput(this.previewElement) ||
                          (i.isButton(this.previewElement) &&
                            !i.isButtonEmpty(this.previewElement))) &&
                          ((t = this.previewPosition), (o = this.previewSize));
                        var n = [];
                        if (e) {
                          n.push({
                            image: i.genColorPreviewGradient(
                              e,
                              t,
                              o ? o - i.pub.previewSeparator.length : null,
                            ),
                            position: 'left top',
                            size: 'auto',
                            repeat: t ? 'repeat-y' : 'repeat',
                            origin: 'padding-box',
                          });
                          var a = i.genColorPreviewCanvas(
                            'rgba(0,0,0,0)',
                            t ? { left: 'right', right: 'left' }[t] : null,
                            o,
                            !0,
                          );
                          n.push({
                            image: "url('" + a.canvas.toDataURL() + "')",
                            position: (t || 'left') + ' top',
                            size: a.width + 'px ' + a.height + 'px',
                            repeat: t ? 'repeat-y' : 'repeat',
                            origin: 'padding-box',
                          });
                        } else
                          n.push({
                            image: 'none',
                            position: 'left top',
                            size: 'auto',
                            repeat: 'no-repeat',
                            origin: 'padding-box',
                          });
                        for (
                          var r = { image: [], position: [], size: [], repeat: [], origin: [] },
                            l = 0;
                          l < n.length;
                          l += 1
                        )
                          r.image.push(n[l].image),
                            r.position.push(n[l].position),
                            r.size.push(n[l].size),
                            r.repeat.push(n[l].repeat),
                            r.origin.push(n[l].origin);
                        var s = {
                          'background-image': r.image.join(', '),
                          'background-position': r.position.join(', '),
                          'background-size': r.size.join(', '),
                          'background-repeat': r.repeat.join(', '),
                          'background-origin': r.origin.join(', '),
                        };
                        i.setStyle(this.previewElement, s, this.forceStyle);
                        var c = { left: null, right: null };
                        t && (c[t] = this.previewSize + this.previewPadding + 'px'),
                          (s = { 'padding-left': c.left, 'padding-right': c.right }),
                          i.setStyle(this.previewElement, s, this.forceStyle, !0);
                      }
                    }),
                    (this.setValueElementValue = function (e) {
                      this.valueElement &&
                        ('input' === i.nodeName(this.valueElement)
                          ? (this.valueElement.value = e)
                          : (this.valueElement.innerHTML = e));
                    }),
                    (this.setAlphaElementValue = function (e) {
                      this.alphaElement &&
                        ('input' === i.nodeName(this.alphaElement)
                          ? (this.alphaElement.value = e)
                          : (this.alphaElement.innerHTML = e));
                    }),
                    (this._processParentElementsInDOM = function () {
                      if (!this._parentElementsProcessed) {
                        this._parentElementsProcessed = !0;
                        var e = this.targetElement;
                        do {
                          var t = i.getCompStyle(e);
                          t.position && 'fixed' === t.position.toLowerCase() && (this.fixed = !0),
                            e !== this.targetElement &&
                              (i.getData(e, 'hasScrollListener') ||
                                (e.addEventListener('scroll', i.onParentScroll, !1),
                                i.setData(e, 'hasScrollListener', !0)));
                        } while ((e = e.parentNode) && 'body' !== i.nodeName(e));
                      }
                    }),
                    (this.tryHide = function () {
                      this.hideOnLeave && this.hide();
                    }),
                    (this.set__palette = function (e) {
                      (this.palette = e),
                        (this._palette = i.parsePaletteValue(e)),
                        (this._paletteHasTransparency = i.containsTranparentColor(this._palette));
                    }),
                    i.pub.options)
                  )
                    for (var u in i.pub.options)
                      if (i.pub.options.hasOwnProperty(u))
                        try {
                          a(u, i.pub.options[u]);
                        } catch (e) {
                          console.warn(e);
                        }
                  var m = [];
                  o.preset &&
                    ('string' == typeof o.preset
                      ? (m = o.preset.split(/\s+/))
                      : Array.isArray(o.preset)
                      ? (m = o.preset.slice())
                      : console.warn('Unrecognized preset value')),
                    -1 === m.indexOf('default') && m.push('default');
                  for (var h = m.length - 1; h >= 0; h -= 1) {
                    var g = m[h];
                    if (g)
                      if (i.pub.presets.hasOwnProperty(g)) {
                        for (var u in i.pub.presets[g])
                          if (i.pub.presets[g].hasOwnProperty(u))
                            try {
                              a(u, i.pub.presets[g][u]);
                            } catch (e) {
                              console.warn(e);
                            }
                      } else console.warn('Unknown preset: %s', g);
                  }
                  var f = ['preset'];
                  for (var u in o)
                    if (o.hasOwnProperty(u) && -1 === f.indexOf(u))
                      try {
                        a(u, o[u]);
                      } catch (e) {
                        console.warn(e);
                      }
                  if (
                    (void 0 === this.container
                      ? (this.container = e.document.body)
                      : (this.container = i.node(this.container)),
                    !this.container)
                  )
                    throw new Error('Cannot instantiate color picker without a container element');
                  if (((this.targetElement = i.node(t)), !this.targetElement)) {
                    if ('string' == typeof t && /^[a-zA-Z][\w:.-]*$/.test(t))
                      throw new Error(
                        "If '" +
                          t +
                          "' is supposed to be an ID, please use '#" +
                          t +
                          "' or any valid CSS selector.",
                      );
                    throw new Error('Cannot instantiate color picker without a target element');
                  }
                  if (this.targetElement.jscolor && this.targetElement.jscolor instanceof i.pub)
                    throw new Error('Color picker already installed on this element');
                  if (
                    ((this.targetElement.jscolor = this),
                    i.addClass(this.targetElement, i.pub.className),
                    i.instances.push(this),
                    i.isButton(this.targetElement) &&
                      ('button' !== this.targetElement.type.toLowerCase() &&
                        (this.targetElement.type = 'button'),
                      i.isButtonEmpty(this.targetElement)))
                  ) {
                    i.removeChildren(this.targetElement),
                      this.targetElement.appendChild(e.document.createTextNode(' '));
                    var C = i.getCompStyle(this.targetElement);
                    (parseFloat(C['min-width']) || 0) < this.previewSize &&
                      i.setStyle(
                        this.targetElement,
                        { 'min-width': this.previewSize + 'px' },
                        this.forceStyle,
                      );
                  }
                  if (
                    (void 0 === this.valueElement
                      ? i.isTextInput(this.targetElement) &&
                        (this.valueElement = this.targetElement)
                      : null === this.valueElement ||
                        (this.valueElement = i.node(this.valueElement)),
                    this.alphaElement && (this.alphaElement = i.node(this.alphaElement)),
                    void 0 === this.previewElement
                      ? (this.previewElement = this.targetElement)
                      : null === this.previewElement ||
                        (this.previewElement = i.node(this.previewElement)),
                    this.valueElement && i.isTextInput(this.valueElement))
                  ) {
                    var y = { onInput: this.valueElement.oninput };
                    (this.valueElement.oninput = null),
                      this.valueElement.addEventListener(
                        'keydown',
                        function (e) {
                          'Enter' === i.eventKey(e) &&
                            (n.valueElement && n.processValueInput(n.valueElement.value),
                            n.tryHide());
                        },
                        !1,
                      ),
                      this.valueElement.addEventListener(
                        'change',
                        function (e) {
                          if (!i.getData(e, 'internal')) {
                            var t = n.valueElement.value;
                            n.processValueInput(n.valueElement.value),
                              i.triggerCallback(n, 'onChange'),
                              n.valueElement.value !== t &&
                                i.triggerInputEvent(n.valueElement, 'change', !0, !0);
                          }
                        },
                        !1,
                      ),
                      this.valueElement.addEventListener(
                        'input',
                        function (e) {
                          i.getData(e, 'internal') ||
                            (n.valueElement &&
                              n.fromString(n.valueElement.value, i.flags.leaveValue),
                            i.triggerCallback(n, 'onInput'));
                        },
                        !1,
                      ),
                      y.onInput && this.valueElement.addEventListener('input', y.onInput, !1),
                      this.valueElement.setAttribute('autocomplete', 'off'),
                      this.valueElement.setAttribute('autocorrect', 'off'),
                      this.valueElement.setAttribute('autocapitalize', 'off'),
                      this.valueElement.setAttribute('spellcheck', !1);
                  }
                  this.alphaElement &&
                    i.isTextInput(this.alphaElement) &&
                    (this.alphaElement.addEventListener(
                      'keydown',
                      function (e) {
                        'Enter' === i.eventKey(e) &&
                          (n.alphaElement && n.processAlphaInput(n.alphaElement.value),
                          n.tryHide());
                      },
                      !1,
                    ),
                    this.alphaElement.addEventListener(
                      'change',
                      function (e) {
                        if (!i.getData(e, 'internal')) {
                          var t = n.alphaElement.value;
                          n.processAlphaInput(n.alphaElement.value),
                            i.triggerCallback(n, 'onChange'),
                            i.triggerInputEvent(n.valueElement, 'change', !0, !0),
                            n.alphaElement.value !== t &&
                              i.triggerInputEvent(n.alphaElement, 'change', !0, !0);
                        }
                      },
                      !1,
                    ),
                    this.alphaElement.addEventListener(
                      'input',
                      function (e) {
                        i.getData(e, 'internal') ||
                          (n.alphaElement &&
                            n.fromHSVA(
                              null,
                              null,
                              null,
                              parseFloat(n.alphaElement.value),
                              i.flags.leaveAlpha,
                            ),
                          i.triggerCallback(n, 'onInput'),
                          i.triggerInputEvent(n.valueElement, 'input', !0, !0));
                      },
                      !1,
                    ),
                    this.alphaElement.setAttribute('autocomplete', 'off'),
                    this.alphaElement.setAttribute('autocorrect', 'off'),
                    this.alphaElement.setAttribute('autocapitalize', 'off'),
                    this.alphaElement.setAttribute('spellcheck', !1));
                  var b = 'FFFFFF';
                  void 0 !== this.value
                    ? (b = this.value)
                    : this.valueElement &&
                      void 0 !== this.valueElement.value &&
                      (b = this.valueElement.value);
                  var k = void 0;
                  if (
                    (void 0 !== this.alpha
                      ? (k = '' + this.alpha)
                      : this.alphaElement &&
                        void 0 !== this.alphaElement.value &&
                        (k = this.alphaElement.value),
                    (this._currentFormat = null),
                    ['auto', 'any'].indexOf(this.format.toLowerCase()) > -1)
                  ) {
                    var G = i.parseColorString(b);
                    this._currentFormat = G ? G.format : 'hex';
                  } else this._currentFormat = this.format.toLowerCase();
                  this.processValueInput(b), void 0 !== k && this.processAlphaInput(k);
                },
              }).pub.className = 'jscolor'),
              (i.pub.activeClassName = 'jscolor-active'),
              (i.pub.looseJSON = !0),
              (i.pub.presets = {}),
              (i.pub.presets.default = {}),
              (i.pub.presets.light = {
                backgroundColor: 'rgba(255,255,255,1)',
                controlBorderColor: 'rgba(187,187,187,1)',
                buttonColor: 'rgba(0,0,0,1)',
              }),
              (i.pub.presets.dark = {
                backgroundColor: 'rgba(51,51,51,1)',
                controlBorderColor: 'rgba(153,153,153,1)',
                buttonColor: 'rgba(240,240,240,1)',
              }),
              (i.pub.presets.small = {
                width: 101,
                height: 101,
                padding: 10,
                sliderSize: 14,
                paletteCols: 8,
              }),
              (i.pub.presets.medium = {
                width: 181,
                height: 101,
                padding: 12,
                sliderSize: 16,
                paletteCols: 10,
              }),
              (i.pub.presets.large = {
                width: 271,
                height: 151,
                padding: 12,
                sliderSize: 24,
                paletteCols: 15,
              }),
              (i.pub.presets.thin = {
                borderWidth: 1,
                controlBorderWidth: 1,
                pointerBorderWidth: 1,
              }),
              (i.pub.presets.thick = {
                borderWidth: 2,
                controlBorderWidth: 2,
                pointerBorderWidth: 2,
              }),
              (i.pub.sliderInnerSpace = 3),
              (i.pub.chessboardSize = 8),
              (i.pub.chessboardColor1 = '#666666'),
              (i.pub.chessboardColor2 = '#999999'),
              (i.pub.previewSeparator = ['rgba(255,255,255,.65)', 'rgba(128,128,128,.65)']),
              (i.pub.init = function () {
                if (!i.initialized)
                  for (
                    e.document.addEventListener('mousedown', i.onDocumentMouseDown, !1),
                      e.document.addEventListener('keyup', i.onDocumentKeyUp, !1),
                      e.addEventListener('resize', i.onWindowResize, !1),
                      e.addEventListener('scroll', i.onWindowScroll, !1),
                      i.pub.install(),
                      i.initialized = !0;
                    i.readyQueue.length;

                  )
                    i.readyQueue.shift()();
              }),
              (i.pub.install = function (e) {
                var t = !0;
                try {
                  i.installBySelector('[data-jscolor]', e);
                } catch (e) {
                  (t = !1), console.warn(e);
                }
                if (i.pub.lookupClass)
                  try {
                    i.installBySelector(
                      'input.' + i.pub.lookupClass + ', button.' + i.pub.lookupClass,
                      e,
                    );
                  } catch (e) {}
                return t;
              }),
              (i.pub.ready = function (e) {
                return 'function' != typeof e
                  ? (console.warn('Passed value is not a function'), !1)
                  : (i.initialized ? e() : i.readyQueue.push(e), !0);
              }),
              (i.pub.trigger = function (e) {
                var t = function () {
                  i.triggerGlobal(e);
                };
                i.initialized ? t() : i.pub.ready(t);
              }),
              (i.pub.hide = function () {
                i.picker && i.picker.owner && i.picker.owner.hide();
              }),
              (i.pub.chessboard = function (e) {
                return e || (e = 'rgba(0,0,0,0)'), i.genColorPreviewCanvas(e).canvas.toDataURL();
              }),
              (i.pub.background = function (e) {
                var t = [];
                t.push(i.genColorPreviewGradient(e));
                var o = i.genColorPreviewCanvas();
                return (
                  t.push(["url('" + o.canvas.toDataURL() + "')", 'left top', 'repeat'].join(' ')),
                  t.join(', ')
                );
              }),
              (i.pub.options = {}),
              (i.pub.lookupClass = 'jscolor'),
              (i.pub.installByClassName = function () {
                return (
                  console.error(
                    'jscolor.installByClassName() is DEPRECATED. Use data-jscolor="" attribute instead of a class name.' +
                      i.docsRef,
                  ),
                  !1
                );
              }),
              i.register(),
              i.pub);
          return void 0 === e.jscolor && (e.jscolor = e.JSColor = a), a;
        });
      },
    },
    t = {};
  function o(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var a = (t[n] = { exports: {} });
    return e[n].call(a.exports, a, a.exports, o), a.exports;
  }
  (o.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return o.d(t, { a: t }), t;
  }),
    (o.d = (e, t) => {
      for (var n in t)
        o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      'use strict';
      let e = {};
      function t() {
        e.WrinklerButtons && Game.elderWrath
          ? ((l('PopAllNormalWrinklerButton').style.display = ''),
            (l('PopFattestWrinklerButton').style.display = ''))
          : ((l('PopAllNormalWrinklerButton').style.display = 'none'),
            (l('PopFattestWrinklerButton').style.display = 'none'));
      }
      const n = ['', '', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        i = [
          '',
          '',
          'M',
          'B',
          'Tr',
          'Quadr',
          'Quint',
          'Sext',
          'Sept',
          'Oct',
          'Non',
          'Dec',
          'Undec',
          'Duodec',
          'Tredec',
          'Quattuordec',
          'Quindec',
          'Sexdec',
          'Septendec',
          'Octodec',
          'Novemdec',
          'Vigint',
          'Unvigint',
          'Duovigint',
          'Trevigint',
          'Quattuorvigint',
        ],
        a = [
          '',
          'K',
          'M',
          'B',
          'T',
          'Qa',
          'Qi',
          'Sx',
          'Sp',
          'Oc',
          'No',
          'De',
          'UDe',
          'DDe',
          'TDe',
          'QaDe',
          'QiDe',
          'SxDe',
          'SpDe',
          'ODe',
          'NDe',
          'Vi',
          'UVi',
          'DVi',
          'TVi',
          'QaVi',
          'QiVi',
          'SxVi',
          'SpVi',
          'OVi',
          'NVi',
          'Tr',
          'UTr',
          'DTr',
          'TTr',
          'QaTr',
          'QiTr',
          'SxTr',
          'SpTr',
          'OTr',
          'NTr',
          'Qaa',
          'UQa',
          'DQa',
          'TQa',
          'QaQa',
          'QiQa',
          'SxQa',
          'SpQa',
          'OQa',
          'NQa',
          'Qia',
          'UQi',
          'DQi',
          'TQi',
          'QaQi',
          'QiQi',
          'SxQi',
          'SpQi',
          'OQi',
          'NQi',
          'Sxa',
          'USx',
          'DSx',
          'TSx',
          'QaSx',
          'QiSx',
          'SxSx',
          'SpSx',
          'OSx',
          'NSx',
          'Spa',
          'USp',
          'DSp',
          'TSp',
          'QaSp',
          'QiSp',
          'SxSp',
          'SpSp',
          'OSp',
          'NSp',
          'Oco',
          'UOc',
          'DOc',
          'TOc',
          'QaOc',
          'QiOc',
          'SxOc',
          'SpOc',
          'OOc',
          'NOc',
          'Noa',
          'UNo',
          'DNo',
          'TNo',
          'QaNo',
          'QiNo',
          'SxNo',
          'SpNo',
          'ONo',
          'NNo',
          'Ct',
          'UCt',
        ];
      let r,
        s,
        c,
        d,
        p,
        u,
        m,
        h,
        g,
        f,
        C,
        y,
        b,
        k,
        G,
        v,
        w = [],
        x = [],
        T = [],
        M = {},
        S = Date.now(),
        B = Date.now();
      function P(t, o, r) {
        const l = e.ScaleDecimals + 1;
        if (t === 1 / 0) return 'Infinity';
        if (void 0 === t) return '0';
        if (0 === e.Scale) return M.Beautify(t, o);
        if (Number.isFinite(t)) {
          if (t < 0) return `-${P(Math.abs(t))}`;
          let s = '';
          if (0 === t) return t.toString();
          if (t > 0.001 && t < e.ScaleCutoff)
            return (s = e.ScaleSeparator ? t.toLocaleString('nl') : t.toLocaleString('en')), s;
          if ((4 === e.Scale && !r) || 4 === r) s = t.toExponential(l).toString().replace('e', 'E');
          else {
            const o = t.toExponential().toString(),
              c = Math.floor(o.slice(o.indexOf('e') + 1) / 3);
            (s = (t / Number('1e' + 3 * c)).toFixed(l)),
              (1 === e.Scale && !r) || 1 === r
                ? t >= 0.01 && t < Number('1e' + 3 * n.length)
                  ? (s += ` ${n[c]}`)
                  : (s = P(t, 0, 4))
                : (2 === e.Scale && !r) || 2 === r
                ? t >= 0.01 && t < Number('1e' + 3 * i.length)
                  ? (s += ` ${i[c]}`)
                  : (s = P(t, 0, 4))
                : (3 === e.Scale && !r) || 3 === r
                ? t >= 0.01 && t < Number('1e' + 3 * a.length)
                  ? (s += ` ${a[c]}`)
                  : (s = P(t, 0, 4))
                : ((5 === e.Scale && !r) || 5 === r) && (s += 'E' + 3 * c);
          }
          return (
            '' === s &&
              (console.log(`Could not beautify number with Cookie Monster Beautify: ${t}`),
              (s = M.Beautify(t, o))),
            e.ScaleSeparator && (s = s.replace('.', ',')),
            s
          );
        }
        return (
          console.log(`Could not beautify number with Cookie Monster Beautify: ${t}`),
          M.Beautify(t, o)
        );
      }
      let E,
        N,
        O,
        F,
        L,
        W,
        A,
        j,
        D,
        H,
        U,
        $,
        R,
        I,
        z,
        V,
        _,
        Q,
        X,
        q,
        Y,
        K,
        J,
        Z,
        ee,
        te,
        oe,
        ne,
        ie,
        ae,
        re,
        le,
        se,
        ce,
        de,
        pe,
        ue,
        me = 0,
        he = 0,
        ge = 0,
        fe = 0,
        Ce = 0,
        ye = 0,
        be = 0,
        ke = 0,
        Ge = 0,
        ve = 0,
        we = 0,
        xe = 0,
        Te = 0,
        Me = 0,
        Se = 0,
        Be = 1,
        Pe = 1,
        Ee = 1,
        Ne = 0,
        Oe = 0,
        Fe = 0,
        Le = 0,
        We = {},
        Ae = {},
        je = {},
        De = {},
        He = 0,
        Ue = 0,
        $e = [0, null],
        Re = 0,
        Ie = 0,
        ze = {},
        Ve = {},
        _e = {},
        Qe = {},
        Xe = {},
        qe = 0,
        Ye = 0,
        Ke = [],
        Je = 0,
        Ze = 0,
        et = [],
        tt = 0,
        ot = 0,
        nt = [],
        it = 0,
        at = 0,
        rt = [],
        lt = 0,
        st = 0,
        ct = {},
        dt = {},
        pt = 0,
        ut = 0,
        mt = [],
        ht = {},
        gt = 0,
        ft = {
          0: [0, 0, 0],
          1: [0, 0, 0],
          2: [0, 0, 0],
          3: [0, 0, 0],
          4: [0, 0, 0],
          5: [0, 0, 0],
          6: [0, 0, 0],
          7: [0, 0, 0],
          8: [0, 0, 0],
          9: [0, 0, 0],
          10: [0, 0, 0],
        },
        Ct = [],
        yt = [],
        bt = [];
      function kt(e) {
        let t = 0;
        return (
          (Game.dragonAuras[ne].name !== e && Game.dragonAuras[ie].name !== e) || (t = 1),
          ('Reality Bending' !== Game.dragonAuras[ne].name &&
            'Reality Bending' !== Game.dragonAuras[ie].name) ||
            (t += 0.1),
          t
        );
      }
      function Gt() {
        let e = 0.25;
        return (e *= 1 + kt('Earth Shatterer')), e;
      }
      function vt(e, t) {
        return void 0 === ce[e] ? (void 0 === t ? 1 : t) : ce[e];
      }
      function wt(e) {
        const t = yt[e];
        return (1 !== Game.ascensionMode || ('prestige' !== t.pool && 'fortune' !== t.tier)) && t
          ? t.bought
          : 0;
      }
      function xt(e) {
        if (Game.hasGod) {
          void 0 === Ct.Temple.minigame && (Ct.Temple.minigame = Game.Objects.Temple.minigame);
          const t = Ct.Temple.minigame.gods[e];
          if (ae === t.id) return 1;
          if (re === t.id) return 2;
          if (le === t.id) return 3;
        }
        return !1;
      }
      function Tt(e, t) {
        let o = t;
        if (
          (wt('Season savings') && (o *= 0.99),
          wt("Santa's dominion") && (o *= 0.99),
          wt('Faberge egg') && (o *= 0.99),
          wt('Divine discount') && (o *= 0.99),
          wt('Fortune #100') && (o *= 0.99),
          (o *= 1 - 0.02 * kt('Fierce Hoarder')),
          Game.hasBuff('Everything must go') && (o *= 0.95),
          Game.hasBuff('Crafty pixies') && (o *= 0.98),
          Game.hasBuff('Nasty goblins') && (o *= 1.02),
          e.fortune && wt(e.fortune.name) && (o *= 0.93),
          (o *= vt('buildingCost')),
          Ct.Temple.minigameLoaded)
        ) {
          const e = xt('creation');
          1 === e ? (o *= 0.93) : 2 === e ? (o *= 0.95) : 3 === e && (o *= 0.98);
        }
        return o;
      }
      function Mt(e, t, o, n, i, a) {
        const r = void 0 === a ? 0 : a;
        let l = i,
          s = o,
          c = 0;
        -1 === i && (l = s), i || (l = Game.buyBulk);
        for (let o = 0; o < l; o++) {
          let o = t * Game.priceIncrease ** Math.max(0, s - n);
          (o = r ? Game.modifyBuildingPrice(e, o) : Tt(e, o)), (o = Math.ceil(o));
          const i = r ? e.getSellMultiplier() : Gt();
          (o = Math.floor(o * i)), s > 0 && ((c += o), (s -= 1));
        }
        return c;
      }
      const St = 'CMText',
        Bt = 'CMBack',
        Pt = 'Blue',
        Et = 'Green',
        Nt = 'Yellow',
        Ot = 'Orange',
        Ft = 'Red',
        Lt = 'Purple',
        Wt = 'Gray',
        At = 'Pink',
        jt = 'Brown',
        Dt = [Wt, Pt, Et, Nt, Ot, Ft, Lt, At, jt],
        Ht = [
          ['GoldCookTooltipPlaceholder', 'Calculated with Golden Switch off', '200px'],
          [
            'GoldCookDragonsFortuneTooltipPlaceholder',
            'Calculated with Golden Switch off and at least one golden cookie on-screen',
            '240px',
          ],
          [
            'PrestMaxTooltipPlaceholder',
            'The MAX prestige is calculated with the cookies gained from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and buying Chocolate egg',
            '320px',
          ],
          [
            'NextPrestTooltipPlaceholder',
            'Calculated with cookies gained from wrinklers and Chocolate egg',
            '200px',
          ],
          [
            'HeavenChipMaxTooltipPlaceholder',
            'The MAX heavenly chips is calculated with the cookies gained from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and buying Chocolate egg',
            '330px',
          ],
          [
            'ResetTooltipPlaceholder',
            'The bonus income you would get from new prestige levels unlocked at 100% of its potential and from ascension achievements if you have the same buildings/upgrades after reset',
            '370px',
          ],
          [
            'ChoEggTooltipPlaceholder',
            'The amount of cookies you would get from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and then buying Chocolate egg',
            '300px',
          ],
          ['ChainNextLevelPlaceholder', 'Cheated cookies might break this formula', '250px'],
          [
            'FavouriteSettingPlaceholder',
            "Click to set this setting as favourite and show it in 'favourite' settings at the top of the Cookie Monster Settings",
            '250px',
          ],
        ],
        Ut = {};
      let $t,
        Rt = 0,
        It = -1,
        zt = [],
        Vt = function () {},
        _t = 1,
        Qt = 1,
        Xt = 1;
      const qt = [10, 15, 30, 60, 300, 600, 900, 1800],
        Yt = [1, 5, 10, 15, 30],
        Kt = {
          Frenzy: Nt,
          'Dragon Harvest': jt,
          'Elder frenzy': Et,
          Clot: Ft,
          'Click frenzy': Pt,
          Dragonflight: At,
        };
      let Jt,
        Zt,
        eo,
        to,
        oo,
        no,
        io,
        ao = {},
        ro = '',
        lo = [];
      function so() {
        let t = Game.buyBulk;
        if (
          (1 === Game.buyMode ? (Qt = t) : (t = Qt),
          1 === t ? (t = We) : 10 === t ? (t = Ae) : 100 === t && (t = je),
          1 === Game.buyMode
            ? 1 === e.BuildColour
              ? Object.keys(t).forEach((o) => {
                  l(`productPrice${Game.Objects[o].id}`).style.color = e[`Colour${t[o].color}`];
                })
              : Object.keys(Game.Objects).forEach((e) => {
                  l(`productPrice${Game.Objects[e].id}`).style.removeProperty('color');
                })
            : -1 === Game.buyMode &&
              Object.keys(We).forEach((e) => {
                const t = Game.Objects[e];
                (l(`productPrice${t.id}`).style.color = ''),
                  (l(`productPrice${t.id}`).innerHTML = P(
                    Mt(t, t.basePrice, t.amount, t.free, Game.buyBulk, 1),
                  ));
              }),
          1 === Game.buyMode && e.SortBuildings)
        ) {
          let o;
          1 === e.SortBuildings
            ? ((o = Object.keys(We).map((e) => {
                const t = We[e];
                return (t.name = e), (t.id = Game.Objects[e].id), t;
              })),
              o.sort((e, t) =>
                Dt.indexOf(e.color) > Dt.indexOf(t.color)
                  ? 1
                  : Dt.indexOf(e.color) < Dt.indexOf(t.color) || e.pp < t.pp
                  ? -1
                  : 0,
              ))
            : 2 === e.SortBuildings &&
              ((o = Object.keys(t).map((e) => {
                const o = t[e];
                return (o.name = e), (o.id = Game.Objects[e].id), o;
              })),
              o.sort((e, t) =>
                Dt.indexOf(e.color) > Dt.indexOf(t.color)
                  ? 1
                  : Dt.indexOf(e.color) < Dt.indexOf(t.color) || e.pp < t.pp
                  ? -1
                  : 0,
              ));
          for (let e = 0; e < o.length; e++)
            Game.Objects[o[e].name].l.style.gridRow = `${e + 2}/${e + 2}`;
        } else {
          const e = Object.keys(We).map((e) => {
            const t = We[e];
            return (t.name = e), (t.id = Game.Objects[e].id), t;
          });
          e.sort((e, t) => e.id - t.id);
          for (let t = 0; t < e.length; t++)
            Game.Objects[e[t].name].l.style.gridRow = `${t + 2}/${t + 2}`;
        }
      }
      function co() {
        Object.values(document.getElementsByClassName('storeSection')).forEach((t) => {
          e.UpgradesNeverCollapse || 'products' === t.id
            ? (t.style.height = 'auto')
            : 'vaultUpgrades' === t.id
            ? ((t.style.height = ''), (t.style.minHeight = '0px'))
            : 'upgrades' === t.id
            ? ((t.style.height = ''),
              t.className.includes('hasMenu')
                ? (t.style.minHeight = '82px')
                : (t.style.minHeight = '60px'))
            : ((t.style.height = ''), (t.style.minHeight = '60px'));
        });
      }
      function po() {
        if (e.UpBarColour > 0) {
          let e = 0,
            t = 0,
            o = 0,
            n = 0,
            i = 0,
            a = 0,
            r = 0;
          Object.keys(Game.UpgradesInStore).forEach((s) => {
            const c = Game.UpgradesInStore[s];
            let d = !1;
            for (let e = 0; e < l(`upgrade${s}`).childNodes.length; e += 1)
              if (-1 !== l(`upgrade${s}`).childNodes[e].className.indexOf(Bt)) {
                (l(`upgrade${s}`).childNodes[e].className = Bt + ze[c.name].color), (d = !0);
                break;
              }
            if (!d) {
              const e = document.createElement('div');
              (e.style.width = '10px'),
                (e.style.height = '10px'),
                (e.className = Bt + ze[c.name].color),
                l(`upgrade${s}`).appendChild(e);
            }
            ze[c.name].color === Pt
              ? (e += 1)
              : ze[c.name].color === Et
              ? (t += 1)
              : ze[c.name].color === Nt
              ? (o += 1)
              : ze[c.name].color === Ot
              ? (n += 1)
              : ze[c.name].color === Ft
              ? (i += 1)
              : ze[c.name].color === Lt
              ? (a += 1)
              : ze[c.name].color === Wt && (r += 1);
          }),
            (l('CMUpgradeBarBlue').textContent = e),
            (l('CMUpgradeBarGreen').textContent = t),
            (l('CMUpgradeBarYellow').textContent = o),
            (l('CMUpgradeBarOrange').textContent = n),
            (l('CMUpgradeBarRed').textContent = i),
            (l('CMUpgradeBarPurple').textContent = a),
            (l('CMUpgradeBarGray').textContent = r);
        }
        const t = [];
        for (let e = 0; e < Game.UpgradesInStore.length; e += 1) {
          const o = {};
          (o.name = Game.UpgradesInStore[e].name),
            (o.price = Game.UpgradesInStore[e].basePrice),
            (o.pp = ze[o.name].pp),
            t.push(o);
        }
        e.SortUpgrades
          ? t.sort((e, t) =>
              Dt.indexOf(e.color) > Dt.indexOf(t.color)
                ? 1
                : Dt.indexOf(e.color) < Dt.indexOf(t.color) || e.pp < t.pp
                ? -1
                : 0,
            )
          : t.sort((e, t) => e.price - t.price);
        const o = function (e, t) {
          return e.findIndex((e) => e.name === t.name);
        };
        for (let e = 0; e < Game.UpgradesInStore.length; e += 1)
          l(`upgrade${e}`).style.order = o(t, Game.UpgradesInStore[e]) + 1;
      }
      function uo(t, o) {
        let n = t;
        if (t === 1 / 0) return t;
        if (t < 0) return 'Negative time period';
        n = Math.ceil(t);
        const i = Math.floor(n / 31536e3),
          a = Math.floor((n % 31536e3) / 86400),
          r = Math.floor(((n % 31536e3) % 86400) / 3600),
          l = Math.floor((((n % 31536e3) % 86400) % 3600) / 60),
          s = Math.floor((((n % 31536e3) % 86400) % 3600) % 60);
        let c = '';
        if (e.TimeFormat) {
          if (n > 315576e4) return 'XX:XX:XX:XX:XX';
          (c += (i < 10 ? '0' : '') + i + ':'),
            (c += (a < 10 ? '0' : '') + a + ':'),
            (c += (r < 10 ? '0' : '') + r + ':'),
            (c += (l < 10 ? '0' : '') + l + ':'),
            (c += (s < 10 ? '0' : '') + s);
        } else {
          if (n > 7776e5) return o ? 'Over 9000 days!' : '>9000d';
          (c += i > 0 ? i + (o ? (1 === i ? ' year' : ' years') : 'y') + ', ' : ''),
            (c.length > 0 || a > 0) && (c += a + (o ? (1 === a ? ' day' : ' days') : 'd') + ', '),
            (c.length > 0 || r > 0) && (c += r + (o ? (1 === r ? ' hour' : ' hours') : 'h') + ', '),
            (c.length > 0 || l > 0) &&
              (c += l + (o ? (1 === l ? ' minute' : ' minutes') : 'm') + ', '),
            (c += s + (o ? (1 === s ? ' second' : ' seconds') : 's'));
        }
        return c;
      }
      function mo(t) {
        let o, n;
        return (
          t <= 0
            ? ((n = e.TimeFormat ? '00:00:00:00:00' : 'Done!'), (o = Et))
            : ((n = uo(t)), (o = t > 300 ? Ft : t > 60 ? Ot : Nt)),
          { text: n, color: o }
        );
      }
      function ho() {
        return e.CPSMode
          ? _
          : 0 === e.CalcWrink
          ? Game.cookiesPs * (1 - Game.cpsSucked)
          : 1 === e.CalcWrink
          ? Game.cookiesPs * (Re + (1 - 0.05 * Ie))
          : null !== $e[1] && 2 === e.CalcWrink && 1 === Game.wrinklers[$e[1]].type
          ? Game.cookiesPs * ((3 * Re) / Ie + (1 - 0.05 * Ie))
          : Game.cookiesPs * (Re / Ie + (1 - 0.05 * Ie));
      }
      function go() {
        return 1 === e.CalcWrink ? He : 2 === e.CalcWrink ? $e[0] : 0;
      }
      function fo(e, t, o) {
        const n = document.createElement('div');
        (n.id = e),
          (n.style.height = '12px'),
          (n.style.margin = '0px 10px'),
          (n.style.position = 'relative');
        const i = document.createElement('div');
        (i.style.width = '100%'),
          (i.style.height = '10px'),
          (i.style.margin = 'auto'),
          (i.style.position = 'absolute'),
          (i.style.left = '0px'),
          (i.style.top = '0px'),
          (i.style.right = '0px'),
          (i.style.bottom = '0px');
        const a = document.createElement('span');
        (a.style.display = 'inline-block'),
          (a.style.textAlign = 'right'),
          (a.style.fontSize = '10px'),
          (a.style.width = '108px'),
          (a.style.marginRight = '5px'),
          (a.style.verticalAlign = 'text-top'),
          (a.textContent = t),
          i.appendChild(a);
        for (let e = 0; e < o.length; e++) {
          const t = document.createElement('span');
          (t.id = o[e].id),
            (t.style.display = 'inline-block'),
            (t.style.height = '10px'),
            (t.style.verticalAlign = 'text-top'),
            (t.style.textAlign = 'center'),
            o.length - 1 === e &&
              ((t.style.borderTopRightRadius = '10px'), (t.style.borderBottomRightRadius = '10px')),
            void 0 !== o[e].color && (t.className = Bt + o[e].color),
            i.appendChild(t);
        }
        const r = document.createElement('span');
        return (
          (r.id = `${e}Time`),
          (r.style.marginLeft = '5px'),
          (r.style.verticalAlign = 'text-top'),
          i.appendChild(r),
          n.appendChild(i),
          n
        );
      }
      function Co(e) {
        if (null !== l('CMBotBar')) {
          const t = l('CMBotBar').firstChild.firstChild.childNodes[0],
            o = l('CMBotBar').firstChild.firstChild.childNodes[1],
            n = l('CMBotBar').firstChild.firstChild.childNodes[2],
            i = l('CMBotBar').firstChild.firstChild.childNodes[3],
            a = e,
            r = t.appendChild(document.createElement('td'));
          r.appendChild(
            document.createTextNode(
              `${-1 !== a.indexOf(' ') ? a.substring(0, a.indexOf(' ')) : a} (`,
            ),
          ),
            (r.appendChild(document.createElement('span')).className = 'CMTextBlue'),
            r.appendChild(document.createTextNode(')')),
            (t.lastChild.style.paddingLeft = '8px'),
            o.appendChild(document.createElement('td')),
            (o.lastChild.style.paddingLeft = '8px'),
            n.appendChild(document.createElement('td')),
            (n.lastChild.style.paddingLeft = '8px'),
            i.appendChild(document.createElement('td')),
            (i.lastChild.style.paddingLeft = '2px');
        }
      }
      function yo() {
        if (1 === e.BotBar && We && 1 === Game.buyMode) {
          let t = 0;
          Object.keys(We).forEach((o) => {
            let n,
              i = Game.buyBulk;
            1 === Game.buyMode ? (_t = i) : (i = _t),
              1 === i && (i = We),
              10 === i && (i = Ae),
              100 === i && (i = je),
              (t += 1),
              (l('CMBotBar').firstChild.firstChild.childNodes[0].childNodes[
                t
              ].childNodes[1].textContent = Game.Objects[o].amount),
              (l('CMBotBar').firstChild.firstChild.childNodes[1].childNodes[t].textContent = P(
                i[o].bonus,
                2,
              )),
              (l('CMBotBar').firstChild.firstChild.childNodes[2].childNodes[t].className =
                St + i[o].color),
              (n = e.PPDisplayTime ? uo(Math.round(i[o].pp)) : P(Math.round(i[o].pp), 2)),
              (l('CMBotBar').firstChild.firstChild.childNodes[2].childNodes[t].textContent = n);
            const a = mo((Game.Objects[o].bulkPrice - (Game.cookies + go())) / ho());
            (l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[t].className =
              St + a.color),
              'Done!' === a.text && Game.cookies < Game.Objects[o].bulkPrice
                ? (l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[
                    t
                  ].textContent = `${a.text} (with Wrink)`)
                : (l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[t].textContent =
                    a.text);
          });
        }
      }
      function bo() {
        (Game.Background.canvas.width = Game.Background.canvas.parentNode.offsetWidth),
          (Game.Background.canvas.height = Game.Background.canvas.parentNode.offsetHeight),
          (Game.LeftBackground.canvas.width = Game.LeftBackground.canvas.parentNode.offsetWidth),
          (Game.LeftBackground.canvas.height = Game.LeftBackground.canvas.parentNode.offsetHeight),
          Game.DrawBackground();
      }
      function ko() {
        1 === e.BotBar && 1 === e.TimerBar && 1 === e.TimerBarPos
          ? ((l('CMBotBar').style.bottom = l('CMTimerBar').style.height),
            (l('game').style.bottom = `${
              Number(l('CMTimerBar').style.height.replace('px', '')) + 70
            }px`))
          : 1 === e.BotBar
          ? ((l('CMBotBar').style.bottom = '0px'), (l('game').style.bottom = '70px'))
          : 1 === e.TimerBar && 1 === e.TimerBarPos
          ? (l('game').style.bottom = l('CMTimerBar').style.height)
          : (l('game').style.bottom = '0px'),
          1 === e.TimerBar && 0 === e.TimerBarPos
            ? (l('sectionLeft').style.top = l('CMTimerBar').style.height)
            : (l('sectionLeft').style.top = ''),
          bo();
      }
      function Go() {
        1 === e.TimerBar
          ? (l('CMTimerBar').style.display = '')
          : (l('CMTimerBar').style.display = 'none'),
          ko();
      }
      function vo() {
        (me = Game.dragonAura), (he = Game.dragonAura2);
      }
      function wo(e) {
        const t = Game.Achievements[e],
          o = {};
        return (o.name = t.name), o;
      }
      function xo(e) {
        let t = 1;
        if (
          (Object.keys(e.tieredUpgrades).forEach((o) => {
            !Game.Tiers[e.tieredUpgrades[o].tier].special &&
              wt(e.tieredUpgrades[o].name) &&
              (t *= 2);
          }),
          Object.keys(e.synergies).forEach((o) => {
            if (wt(e.synergies[o].name)) {
              const n = e.synergies[o];
              n.buildingTie1.name === e.name
                ? (t *= 1 + 0.05 * n.buildingTie2.amount)
                : n.buildingTie2.name === e.name && (t *= 1 + 0.001 * n.buildingTie1.amount);
            }
          }),
          e.fortune && wt(e.fortune.name) && (t *= 1.07),
          e.grandma && wt(e.grandma.name) && (t *= 1 + 0.01 * Ct.Grandma.amount * (1 / (e.id - 1))),
          'object' == typeof e.tieredUpgrades.misfortune &&
            1 === e.vanilla &&
            wt(e.tieredUpgrades.misfortune.name))
        )
          switch (Game.elderWrath) {
            default:
              t *= 1;
              break;
            case 1:
              t *= 1.02;
              break;
            case 2:
              t *= 1.04;
              break;
            case 3:
              t *= 1.06;
          }
        return t;
      }
      function To(e) {
        const t = Game.Objects[e],
          o = {};
        return (
          'Cursor' === t.name
            ? (o.cps = function (e) {
                let t = 0;
                wt('Thousand fingers') && (t += 0.1),
                  wt('Million fingers') && (t *= 5),
                  wt('Billion fingers') && (t *= 10),
                  wt('Trillion fingers') && (t *= 20),
                  wt('Quadrillion fingers') && (t *= 20),
                  wt('Quintillion fingers') && (t *= 20),
                  wt('Sextillion fingers') && (t *= 20),
                  wt('Septillion fingers') && (t *= 20),
                  wt('Octillion fingers') && (t *= 20),
                  wt('Nonillion fingers') && (t *= 20);
                let o = 1,
                  n = 0;
                return (
                  Object.keys(Ct).forEach((e) => {
                    'Cursor' !== Ct[e].name && (n += Ct[e].amount);
                  }),
                  (t *= n),
                  (o *= xo(e)),
                  (o *= Game.magicCpS('Cursor')),
                  (o *= vt('cursorCps')),
                  Game.ComputeCps(
                    0.1,
                    wt('Reinforced index finger') +
                      wt('Carpal tunnel prevention cream') +
                      wt('Ambidextrous'),
                    t,
                  ) * o
                );
              })
            : 'Grandma' === t.name
            ? (o.cps = function (e) {
                let o = 1;
                if (
                  (Object.keys(Game.GrandmaSynergies).forEach((e) => {
                    wt(Game.GrandmaSynergies[e]) && (o *= 2);
                  }),
                  wt('Bingo center/Research facility') && (o *= 4),
                  wt('Ritual rolling pins') && (o *= 2),
                  wt('Naughty list') && (o *= 2),
                  wt('Elderwort biscuits') && (o *= 1.02),
                  (o *= vt('grandmaCps')),
                  wt('Cat ladies'))
                )
                  for (let e = 0; e < Game.UpgradesByPool.kitten.length; e++)
                    wt(Game.UpgradesByPool.kitten[e].name) && (o *= 1.29);
                o *= xo(e);
                let n = 0;
                wt('One mind') && (n += 0.02 * Ct.Grandma.amount),
                  wt('Communal brainsweep') && (n += 0.02 * Ct.Grandma.amount),
                  wt('Elder Pact') && (n += 0.05 * Ct.Portal.amount);
                let i = 0;
                return (
                  Object.keys(Ct).forEach((e) => {
                    'Grandma' !== Ct[e].name && (i += Ct[e].amount);
                  }),
                  (o *= 1 + 0.01 * kt('Elder Battalion') * i),
                  (o *= Game.magicCpS(t.name)),
                  (t.baseCps + n) * o
                );
              })
            : (o.cps = function (e) {
                let t = 1;
                return (t *= xo(e)), (t *= Game.magicCpS(e.name)), e.baseCPS * t;
              }),
          (o.baseCps = t.baseCps),
          (o.name = t.name),
          (o.tieredUpgrades = t.tieredUpgrades),
          (o.synergies = t.synergies),
          (o.fortune = t.fortune),
          (o.grandma = t.grandma),
          (o.baseCPS = t.baseCps),
          (o.id = t.id),
          (o.vanilla = t.vanilla),
          o
        );
      }
      function Mo(e) {
        const t = Game.Upgrades[e],
          o = {};
        return (
          (o.power = t.power),
          'function' == typeof o.power &&
            ('Sugar crystal cookies' === t.name
              ? (o.power = function () {
                  let e = 5;
                  return (
                    Object.keys(Ct).forEach((t) => {
                      Ct[t].level >= 10 && (e += 1);
                    }),
                    e
                  );
                })
              : (o.power = function () {
                  let e = 2;
                  if ((wt('Starlove') && (e = 3), Game.hasGod)) {
                    const t = xt('seasons');
                    1 === t ? (e *= 1.3) : 2 === t ? (e *= 1.2) : 3 === t && (e *= 1.1);
                  }
                  return e;
                })),
          (o.pool = t.pool),
          (o.name = t.name),
          o
        );
      }
      function So() {
        (J = Game.UpgradesOwned),
          (Z = Game.pledges),
          (ee = Game.AchievementsOwned),
          (te = Game.heavenlyPower),
          (oe = Game.prestige),
          Object.keys(Game.Objects).forEach((e) => {
            const t = Game.Objects[e];
            let o = Ct[e];
            void 0 === o && ((Ct[e] = To(e)), (o = Ct[e]), Co(e)),
              (o.amount = t.amount),
              (o.level = t.level),
              (o.totalCookies = t.totalCookies),
              (o.basePrice = t.basePrice),
              (o.free = t.free),
              t.minigameLoaded &&
                ('Temple' === t.name &&
                  ((ae = t.minigame.slot[0]), (re = t.minigame.slot[1]), (le = t.minigame.slot[2])),
                (o.minigameLoaded = t.minigameLoaded),
                (o.minigame = t.minigame)),
              (Ct[e] = o);
          }),
          Object.keys(Game.Upgrades).forEach((e) => {
            const t = Game.Upgrades[e];
            let o = yt[e];
            void 0 === o && ((yt[e] = Mo(e)), (o = yt[e])), (o.bought = t.bought), (yt[e] = o);
          }),
          Object.keys(Game.Achievements).forEach((e) => {
            const t = Game.Achievements[e];
            let o = bt[e];
            void 0 === o && ((bt[e] = wo(e)), (o = bt[e])), (o.won = t.won), (bt[e] = o);
          }),
          vo(),
          (ne = me),
          (ie = he);
      }
      function Bo(e) {
        const t = document.createElement('div');
        return (
          (t.style.fontWeight = 'bold'),
          (t.id = `${e}Title`),
          (t.className = 'CMTextBlue'),
          (t.textContent = e),
          t
        );
      }
      function Po(e) {
        e.appendChild(Bo('Bonus Income'));
        const t = document.createElement('div');
        (t.style.marginBottom = '4px'),
          (t.style.color = 'white'),
          (t.id = 'CMTooltipIncome'),
          e.appendChild(t),
          e.appendChild(Bo('Bonus Cookies per Click')),
          (e.lastChild.style.display = 'none');
        const o = document.createElement('div');
        (o.style.marginBottom = '4px'),
          (o.style.color = 'white'),
          (o.style.display = 'none'),
          (o.id = 'CMTooltipCookiePerClick'),
          e.appendChild(o),
          e.appendChild(Bo('Payback Period'));
        const n = document.createElement('div');
        (n.style.marginBottom = '4px'),
          (n.id = 'CMTooltipPP'),
          e.appendChild(n),
          e.appendChild(Bo('Time Left'));
        const i = document.createElement('div');
        if (((i.id = 'CMTooltipTime'), e.appendChild(i), 'b' === eo)) {
          e.appendChild(Bo('Production left till next achievement')),
            (e.lastChild.id = 'CMTooltipProductionLeftHeader');
          const t = document.createElement('div');
          (t.id = 'CMTooltipProductionLeft'), e.appendChild(t);
        }
        if ('b' === eo) {
          e.appendChild(Bo('Buildings (price / PP) left till next achievement')),
            (e.lastChild.id = 'CMTooltipNextAchievementHeader');
          const t = document.createElement('div');
          (t.id = 'CMTooltipNextAchievement'), e.appendChild(t);
        }
      }
      function Eo(t, o) {
        let n = '';
        return (
          (n =
            t.pp <= 0 || t.pp === 1 / 0
              ? Wt
              : t.pp < ut
              ? Pt
              : t.pp === ut
              ? Et
              : t.pp < mt[10][0]
              ? Nt
              : t.pp < mt[20][0]
              ? Ot
              : t.pp < mt[30][0]
              ? Ft
              : Lt),
          0 !== Number(e.PPSecondsLowerLimit) &&
            o / ho() < Number(e.PPSecondsLowerLimit) &&
            (n = Pt),
          e.PPOnlyConsiderBuyable && o - Game.cookies > 0 && (n = Ft),
          n
        );
      }
      function No() {
        let e = 1;
        return (
          Object.keys(Game.buffs).forEach((t) => {
            void 0 !== Game.buffs[t].multCpS && (e *= Game.buffs[t].multCpS);
          }),
          e
        );
      }
      function Oo(e) {
        bt[e] &&
          0 === bt[e].won &&
          ((bt[e].won = 1), 'shadow' !== Game.Achievements[e].pool && (ee += 1));
      }
      function Fo() {
        de = 0;
        let e = 1;
        const t = {};
        Object.keys(Game.Objects).forEach((e) => {
          if (Game.Objects[e].minigameLoaded && Game.Objects[e].minigame.effs) {
            const o = Game.Objects[e].minigame.effs;
            Object.keys(o).forEach((e) => {
              t[e] ? (t[e] *= o[e]) : (t[e] = o[e]);
            });
          }
        }),
          (ce = t),
          1 !== Game.ascensionMode &&
            (e +=
              0.01 *
              parseFloat(oe) *
              te *
              (function () {
                let e = 0;
                if (
                  (wt('Heavenly chip secret') && (e += 0.05),
                  wt('Heavenly cookie stand') && (e += 0.2),
                  wt('Heavenly bakery') && (e += 0.25),
                  wt('Heavenly confectionery') && (e += 0.25),
                  wt('Heavenly key') && (e += 0.25),
                  (e *= 1 + 0.05 * kt('Dragon God')),
                  wt('Lucky digit') && (e *= 1.01),
                  wt('Lucky number') && (e *= 1.01),
                  wt('Lucky payout') && (e *= 1.01),
                  Game.hasGod)
                ) {
                  const t = xt('creation');
                  1 === t ? (e *= 0.7) : 2 === t ? (e *= 0.8) : 3 === t && (e *= 0.9);
                }
                return e;
              })()),
          (e *= vt('cps')),
          wt('Heralds') && 1 !== Game.ascensionMode && (e *= 1 + 0.01 * Game.heralds),
          Object.keys(Game.cookieUpgrades).forEach((t) => {
            const o = Game.cookieUpgrades[t];
            wt(o.name) &&
              ('function' == typeof o.power
                ? (e *= 1 + 0.01 * yt[o.name].power(yt[o.name]))
                : (e *= 1 + 0.01 * o.power));
          }),
          wt('Specialized chocolate chips') && (e *= 1.01),
          wt('Designer cocoa beans') && (e *= 1.02),
          wt('Underworld ovens') && (e *= 1.03),
          wt('Exotic nuts') && (e *= 1.04),
          wt('Arcane sugar') && (e *= 1.05),
          wt('Increased merriness') && (e *= 1.15),
          wt('Improved jolliness') && (e *= 1.15),
          wt('A lump of coal') && (e *= 1.01),
          wt('An itchy sweater') && (e *= 1.01),
          wt("Santa's dominion") && (e *= 1.2),
          wt('Fortune #100') && (e *= 1.01),
          wt('Fortune #101') && (e *= 1.07),
          wt('Dragon scale') && (e *= 1.03);
        let o = 1;
        if (xt) {
          let t = xt('asceticism');
          1 === t ? (e *= 1.15) : 2 === t ? (e *= 1.1) : 3 === t && (e *= 1.05),
            (t = xt('ages')),
            1 === t
              ? (e *= 1 + 0.15 * Math.sin((S / 1e3 / 10800) * Math.PI * 2))
              : 2 === t
              ? (e *= 1 + 0.15 * Math.sin((S / 1e3 / 43200) * Math.PI * 2))
              : 3 === t && (e *= 1 + 0.15 * Math.sin((S / 1e3 / 86400) * Math.PI * 2)),
            (t = xt('decadence')),
            1 === t ? (o *= 0.93) : 2 === t ? (o *= 0.95) : 3 === t && (o *= 0.98),
            (t = xt('industry')),
            1 === t ? (o *= 1.1) : 2 === t ? (o *= 1.06) : 3 === t && (o *= 1.03),
            (t = xt('labor')),
            1 === t ? (o *= 0.97) : 2 === t ? (o *= 0.98) : 3 === t && (o *= 0.99);
        }
        wt("Santa's legacy") && (e *= 1 + 0.03 * (Game.santaLevel + 1));
        const n = ee / 25;
        let i = 1;
        if (
          (wt("Santa's milk and cookies") && (i *= 1.05),
          (i *= 1 + 0.05 * kt('Breath of Milk')),
          xt)
        ) {
          const e = xt('mother');
          1 === e ? (i *= 1.1) : 2 === e ? (i *= 1.05) : 3 === e && (i *= 1.03);
        }
        i *= vt('milk');
        let a = 1;
        wt('Kitten helpers') && (a *= 1 + 0.1 * n * i),
          wt('Kitten workers') && (a *= 1 + 0.125 * n * i),
          wt('Kitten engineers') && (a *= 1 + 0.15 * n * i),
          wt('Kitten overseers') && (a *= 1 + 0.175 * n * i),
          wt('Kitten managers') && (a *= 1 + 0.2 * n * i),
          wt('Kitten accountants') && (a *= 1 + 0.2 * n * i),
          wt('Kitten specialists') && (a *= 1 + 0.2 * n * i),
          wt('Kitten experts') && (a *= 1 + 0.2 * n * i),
          wt('Kitten consultants') && (a *= 1 + 0.2 * n * i),
          wt('Kitten assistants to the regional manager') && (a *= 1 + 0.175 * n * i),
          wt('Kitten marketeers') && (a *= 1 + 0.15 * n * i),
          wt('Kitten analysts') && (a *= 1 + 0.125 * n * i),
          wt('Kitten executives') && (a *= 1 + 0.115 * n * i),
          wt('Kitten angels') && (a *= 1 + 0.1 * n * i),
          wt('Fortune #103') && (a *= 1 + 0.05 * n * i),
          Object.keys(Ct).forEach((e) => {
            const t = Ct[e];
            let a = t.cps(t);
            1 !== Game.ascensionMode && (a *= (1 + 0.01 * t.level) * o),
              'Grandma' === t.name &&
                wt('Milkhelp&reg; lactose intolerance relief tablets') &&
                (a *= 1 + 0.05 * n * i),
              (de += t.amount * a);
          }),
          wt('"egg"') && (de += 9),
          (e *= a);
        let r = 1;
        if (
          (wt('Chicken egg') && (r *= 1.01),
          wt('Duck egg') && (r *= 1.01),
          wt('Turkey egg') && (r *= 1.01),
          wt('Quail egg') && (r *= 1.01),
          wt('Robin egg') && (r *= 1.01),
          wt('Ostrich egg') && (r *= 1.01),
          wt('Cassowary egg') && (r *= 1.01),
          wt('Salmon roe') && (r *= 1.01),
          wt('Frogspawn') && (r *= 1.01),
          wt('Shark egg') && (r *= 1.01),
          wt('Turtle egg') && (r *= 1.01),
          wt('Ant larva') && (r *= 1.01),
          wt('Century egg'))
        ) {
          let e = (10 * Math.floor((B - Game.startDate) / 1e3 / 10)) / 60 / 60 / 24;
          (e = Math.min(e, 100)), (Oe = 1 + 0.1 * (1 - (1 - e / 100) ** 3)), (r *= Oe);
        }
        (e *= r),
          wt('Sugar baking') && (e *= 1 + 0.01 * Math.min(100, Game.lumps)),
          (e *= 1 + kt('Radiant Appetite'));
        const l = de * e;
        Object.keys(Game.CpsAchievements).forEach((e) => {
          l >= Game.CpsAchievements[e].threshold && Oo(Game.CpsAchievements[e].name);
        }),
          (pe = l);
        const { n: s } = Game.shimmerTypes.golden,
          c = kt("Dragon's Fortune");
        for (let t = 0; t < s; t++) e *= 1 + 1.23 * c;
        const d = Game.bakeryName.toLowerCase();
        if (
          ('orteil' === d ? (e *= 0.99) : 'ortiel' === d && (e *= 0.98),
          wt('Elder Covenant') && (e *= 0.95),
          wt('Golden switch [off]'))
        ) {
          let t = 1.5;
          if (wt('Residual luck')) {
            const e = Game.goldenCookieUpgrades;
            Object.keys(e).forEach((o) => {
              wt(e[o]) && (t += 0.1);
            });
          }
          e *= t;
        }
        if (wt('Shimmering veil [off]')) {
          let t = 0.5;
          wt('Reinforced membrane') && (t += 0.1), (e *= 1 + t);
        }
        wt('Magic shenanigans') && (e *= 1e3),
          wt('Occult obstruction') && (e *= 0),
          (de = Game.runModHookOnValue('cps', de)),
          (e *= No()),
          (de *= e);
      }
      const Lo = [
          'Fortune #001',
          'Fortune #002',
          'Fortune #003',
          'Fortune #004',
          'Fortune #005',
          'Fortune #006',
          'Fortune #007',
          'Fortune #008',
          'Fortune #009',
          'Fortune #010',
          'Fortune #011',
          'Fortune #012',
          'Fortune #013',
          'Fortune #014',
          'Fortune #015',
          'Fortune #016',
          'Fortune #017',
          'Fortune #018',
          'Fortune #100',
          'Fortune #101',
          'Fortune #102',
          'Fortune #103',
          'Fortune #104',
        ],
        Wo = [
          'Skull cookies',
          'Ghost cookies',
          'Bat cookies',
          'Slime cookies',
          'Pumpkin cookies',
          'Eyeball cookies',
          'Spider cookies',
        ],
        Ao = [
          'Christmas tree biscuits',
          'Snowflake biscuits',
          'Snowman biscuits',
          'Holly biscuits',
          'Candy cane biscuits',
          'Bell biscuits',
          'Present biscuits',
        ],
        jo = [
          'Pure heart biscuits',
          'Ardent heart biscuits',
          'Sour heart biscuits',
          'Weeping heart biscuits',
          'Golden heart biscuits',
          'Eternal heart biscuits',
          'Prism heart biscuits',
        ],
        Do = [
          'Elderwort biscuits',
          'Bakeberry cookies',
          'Duketater cookies',
          'Green yeast digestives',
          'Wheat slims',
          'Fern tea',
          'Ichor syrup',
        ];
      function Ho(e) {
        return bt[e] ? bt[e].won : 0;
      }
      function Uo() {
        let e = 0;
        Object.keys(Game.GrandmaSynergies).forEach((t) => {
          wt(Game.GrandmaSynergies[t]) && (e += 1);
        }),
          !Ho('Elder') && e >= 7 && Oo('Elder'),
          !Ho('Veteran') && e >= 14 && Oo('Veteran');
        let t = 0,
          o = 1,
          n = 1,
          i = 1e5;
        Object.keys(Ct).forEach((e) => {
          (t += Ct[e].amount),
            (i = Math.min(Ct[e].amount, i)),
            Ho('Mathematician') ||
              (Ct[e].amount <
                Math.min(128, 2 ** (Game.ObjectsById.length - Game.Objects[e].id - 1)) &&
                (o = 0)),
            Ho('Base 10') ||
              (Ct[e].amount < 10 * (Game.ObjectsById.length - Game.Objects[e].id) && (n = 0));
        }),
          i >= 1 && Oo('One with everything'),
          1 === o && Oo('Mathematician'),
          1 === n && Oo('Base 10'),
          i >= 100 && Oo('Centennial'),
          i >= 150 && Oo('Centennial and a half'),
          i >= 200 && Oo('Bicentennial'),
          i >= 250 && Oo('Bicentennial and a half'),
          i >= 300 && Oo('Tricentennial'),
          i >= 350 && Oo('Tricentennial and a half'),
          i >= 400 && Oo('Quadricentennial'),
          i >= 450 && Oo('Quadricentennial and a half'),
          i >= 500 && Oo('Quincentennial'),
          i >= 550 && Oo('Quincentennial and a half'),
          i >= 600 && Oo('Sexcentennial'),
          t >= 100 && Oo('Builder'),
          t >= 500 && Oo('Architect'),
          t >= 1e3 && Oo('Engineer'),
          t >= 2e3 && Oo('Lord of Constructs'),
          t >= 4e3 && Oo('Grand design'),
          t >= 8e3 && Oo('Ecumenopolis'),
          J >= 20 && Oo('Enhancer'),
          J >= 50 && Oo('Augmenter'),
          J >= 100 && Oo('Upgrader'),
          J >= 200 && Oo('Lord of Progress'),
          J >= 300 && Oo('The full picture'),
          J >= 400 && Oo("When there's nothing left to add"),
          t >= 4e3 && J >= 300 && Oo('Polymath'),
          t >= 8e3 && J >= 400 && Oo('Renaissance baker'),
          Ct.Cursor.amount + Ct.Grandma.amount >= 777 && Oo('The elder scrolls');
        let a = !0;
        Object.keys(Wo).forEach((e) => {
          wt(Wo[e]) || (a = !1);
        }),
          a && Oo('Spooky cookies');
        let r = !0;
        if (
          (Object.keys(Ao).forEach((e) => {
            wt(Ao[e]) || (r = !1);
          }),
          r && Oo('Let it snow'),
          wt('Fortune cookies'))
        ) {
          const e = Game.Tiers.fortune.upgrades;
          let t = 0;
          Object.keys(e).forEach((o) => {
            wt(e[o].name) && (t += 1);
          }),
            t >= e.length && Oo('O Fortuna');
        }
      }
      function $o(e, t) {
        So(), (Ct[e].amount += t);
        const o = Ct[e];
        'Cursor' === e
          ? (o.amount >= 1 && Oo('Click'),
            o.amount >= 2 && Oo('Double-click'),
            o.amount >= 50 && Oo('Mouse wheel'),
            o.amount >= 100 && Oo('Of Mice and Men'),
            o.amount >= 200 && Oo('The Digital'),
            o.amount >= 300 && Oo('Extreme polydactyly'),
            o.amount >= 400 && Oo('Dr. T'),
            o.amount >= 500 && Oo('Thumbs, phalanges, metacarpals'),
            o.amount >= 600 && Oo('With her finger and her thumb'),
            o.amount >= 700 && Oo('Gotta hand it to you'),
            o.amount >= 800 && Oo("The devil's workshop"))
          : Object.keys(Game.Objects[o.name].tieredAchievs).forEach((e) => {
              o.amount >= Game.Tiers[Game.Objects[o.name].tieredAchievs[e].tier].achievUnlock &&
                Oo(Game.Objects[o.name].tieredAchievs[e].name);
            });
        const n = ee;
        return Fo(), Uo(), n !== ee && Fo(), de - Game.cookiesPs;
      }
      function Ro(e, t, o) {
        let n = e,
          i = 0;
        for (; n < o; ) (n += 0.002 * Math.max(0.002, (n / Math.max(t, 100)) ** 0.5)), (i += 1);
        return i / Game.fps;
      }
      function Io() {
        null !== l('CMDispTooltipWarningParent') &&
          (0 === e.ToolWarnPos
            ? ((l('CMDispTooltipWarningParent').style.top = 'auto'),
              (l('CMDispTooltipWarningParent').style.margin = '4px -4px'),
              (l('CMDispTooltipWarningParent').style.padding = '3px 4px'))
            : ((l('CMDispTooltipWarningParent').style.right = 'auto'),
              (l('CMDispTooltipWarningParent').style.margin = '4px'),
              (l('CMDispTooltipWarningParent').style.padding = '4px 3px')));
      }
      function zo() {
        if ((So(), 'none' !== l('tooltipAnchor').style.display && l('CMTooltipArea'))) {
          l('CMTooltipArea').innerHTML = '';
          const t = (function () {
            l('tooltip').firstChild.style.paddingBottom = '4px';
            const e = document.createElement('div');
            return (
              (e.style.border = '1px solid'),
              (e.style.padding = '4px'),
              (e.style.margin = '0px -4px'),
              (e.id = 'CMTooltipBorder'),
              (e.className = 'CMTextGray'),
              e
            );
          })();
          l('CMTooltipArea').appendChild(t),
            'b' === eo
              ? (function () {
                  if (1 === e.TooltipBuildUpgrade && 1 === Game.buyMode) {
                    let t;
                    if (
                      (Po(l('CMTooltipBorder')),
                      1 === Game.buyMode ? (Xt = t) : (t = Xt),
                      1 === Game.buyBulk
                        ? (t = We)
                        : 10 === Game.buyBulk
                        ? (t = Ae)
                        : 100 === Game.buyBulk && (t = je),
                      (Jt = Game.Objects[to].bulkPrice),
                      (Zt = t[to].bonus),
                      1 === e.TooltipBuildUpgrade && 1 === Game.buyMode)
                    ) {
                      l('CMTooltipIncome').textContent = P(Zt, 2);
                      const o = Math.round((Zt / Game.cookiesPs) * 1e4);
                      Number.isFinite(o) && 0 !== o
                        ? (l('CMTooltipIncome').textContent += ` (${o / 100}% of income)`)
                        : (l('CMTooltipIncome').textContent += ` (<0${
                            e.ScaleSeparator ? ',' : '.'
                          }01% of income)`),
                        (l('CMTooltipBorder').className = St + t[to].color),
                        e.PPDisplayTime
                          ? (l('CMTooltipPP').textContent = uo(t[to].pp))
                          : (l('CMTooltipPP').textContent = P(t[to].pp, 2)),
                        (l('CMTooltipPP').className = St + t[to].color);
                      const n = mo((Jt - (Game.cookies + go())) / ho());
                      (l('CMTooltipTime').textContent = n.text),
                        'Done!' === n.text && Game.cookies < t[to].price
                          ? (l('CMTooltipTime').textContent = `${n.text} (with Wrink)`)
                          : (l('CMTooltipTime').textContent = n.text),
                        (l('CMTooltipTime').className = St + n.color);
                    }
                    (l('CMTooltipProductionLeftHeader').style.display = 'none'),
                      (l('CMTooltipTime').style.marginBottom = '0px');
                    for (const e of Object.keys(Game.Objects[to].productionAchievs))
                      if (!Game.HasAchiev(Game.Objects[to].productionAchievs[e].achiev.name)) {
                        const t = Game.Objects[to].productionAchievs[e];
                        (l('CMTooltipTime').style.marginBottom = '4px'),
                          (l('CMTooltipProductionLeftHeader').style.display = ''),
                          (l('CMTooltipProductionLeft').className = `ProdAchievement${to}`),
                          (l('CMTooltipProductionLeft').textContent = P(
                            t.pow - Ct[to].totalCookies,
                            15,
                          )),
                          (l('CMTooltipProductionLeft').style.color = 'white');
                        break;
                      }
                    const o = De[to];
                    if (o.AmountNeeded < 101) {
                      let t;
                      (l('CMTooltipProductionLeft').style.marginBottom = '4px'),
                        (l('CMTooltipNextAchievementHeader').style.display = ''),
                        (t = Game.cookiesPs
                          ? Math.max(o.price - (Game.cookies + go()), 0) / Game.cookiesPs +
                            o.price / $o(to, o.AmountNeeded)
                          : o.price / $o(to, o.AmountNeeded)),
                        (l('CMTooltipNextAchievement').textContent = `${P(o.AmountNeeded)} / ${P(
                          o.price,
                        )} / `),
                        (l('CMTooltipNextAchievement').style.color = 'white');
                      const n = document.createElement('span');
                      e.PPDisplayTime ? (n.textContent = uo(t)) : (n.textContent = P(t)),
                        (n.className = St + Eo({ pp: t }, o.price)),
                        l('CMTooltipNextAchievement').appendChild(n);
                    } else
                      (l('CMTooltipNextAchievementHeader').style.display = 'none'),
                        (l('CMTooltipProductionLeft').style.marginBottom = '0px');
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'u' === eo
              ? (function () {
                  if (
                    (Po(l('CMTooltipBorder')),
                    (Zt = ze[Game.UpgradesInStore[to].name].bonus),
                    (Jt = Game.Upgrades[Game.UpgradesInStore[to].name].getPrice()),
                    (oo = ze[Game.UpgradesInStore[to].name].bonusMouse),
                    1 === e.TooltipBuildUpgrade)
                  ) {
                    l('CMTooltipIncome').textContent = P(Zt, 2);
                    const t = Math.round((Zt / Game.cookiesPs) * 1e4);
                    '0' !== l('CMTooltipIncome').textContent || ('b' !== eo && 'u' !== eo)
                      ? (Number.isFinite(t) && 0 !== t
                          ? (l('CMTooltipIncome').textContent += ` (${t / 100}% of income)`)
                          : (l('CMTooltipIncome').textContent += ` (<0${
                              e.ScaleSeparator ? ',' : '.'
                            }01% of income)`),
                        (l('CMTooltipBorder').className =
                          St + ze[Game.UpgradesInStore[to].name].color),
                        oo &&
                          ((l('CMTooltipCookiePerClick').textContent = P(oo)),
                          (l('CMTooltipCookiePerClick').style.display = 'block'),
                          (l('CMTooltipCookiePerClick').previousSibling.style.display = 'block')),
                        0 === Zt && oo
                          ? ((l('CMTooltipPP').textContent = `${P(Jt / oo)} Clicks`),
                            (l('CMTooltipPP').style.color = 'white'))
                          : (e.PPDisplayTime
                              ? (l('CMTooltipPP').textContent = uo(
                                  ze[Game.UpgradesInStore[to].name].pp,
                                ))
                              : (l('CMTooltipPP').textContent = P(
                                  ze[Game.UpgradesInStore[to].name].pp,
                                  2,
                                )),
                            (l('CMTooltipPP').className =
                              St + ze[Game.UpgradesInStore[to].name].color)))
                      : ((l('Bonus IncomeTitle').style.display = 'none'),
                        (l('CMTooltipIncome').style.display = 'none'),
                        (l('Payback PeriodTitle').style.display = 'none'),
                        (l('CMTooltipPP').style.display = 'none'));
                    const o = mo((Jt - (Game.cookies + go())) / ho());
                    if (
                      ((l('CMTooltipTime').textContent = o.text),
                      'Done!' === o.text && Game.cookies < Game.UpgradesInStore[to].getPrice()
                        ? (l('CMTooltipTime').textContent = `${o.text} (with Wrink)`)
                        : (l('CMTooltipTime').textContent = o.text),
                      (l('CMTooltipTime').className = St + o.color),
                      'Chocolate egg' === Game.UpgradesInStore[to].name)
                    ) {
                      (l('CMTooltipBorder').lastChild.style.marginBottom = '4px'),
                        l('CMTooltipBorder').appendChild(
                          Bo('Cookies to be gained (Currently/Max)'),
                        );
                      const e = document.createElement('div');
                      (e.style.color = 'white'),
                        (e.textContent = `${P(0.05 * Game.cookies)} / ${P(Le)}`),
                        l('CMTooltipBorder').appendChild(e);
                    }
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 's' === eo
              ? (function () {
                  if (1 === e.TooltipLump) {
                    const e = l('CMTooltipBorder');
                    e.appendChild(Bo('Current Sugar Lump'));
                    const o = document.createElement('div');
                    (o.id = 'CMTooltipTime'), e.appendChild(o);
                    const n =
                      0 === (t = Game.lumpCurrentType)
                        ? { text: 'Normal', color: Wt }
                        : 1 === t
                        ? { text: 'Bifurcated', color: Et }
                        : 2 === t
                        ? { text: 'Golden', color: Nt }
                        : 3 === t
                        ? { text: 'Meaty', color: Ot }
                        : 4 === t
                        ? { text: 'Caramelized', color: Lt }
                        : { text: 'Unknown Sugar Lump', color: Ft };
                    (o.textContent = n.text), (o.className = St + n.color);
                  } else l('CMTooltipArea').style.display = 'none';
                  var t;
                })()
              : 'g' === eo
              ? (function () {
                  const { minigame: t } = Game.Objects['Wizard tower'],
                    o = t.getSpellCost(t.spellsById[to]);
                  if (1 === e.TooltipGrim && o <= t.magicM) {
                    const e = l('CMTooltipBorder');
                    e.appendChild(Bo('Time Left'));
                    const n = document.createElement('div');
                    (n.id = 'CMTooltipTime'), e.appendChild(n);
                    const i = mo(Ro(t.magic, t.magicM, o));
                    if (((n.textContent = i.text), (n.className = St + i.color), o <= t.magic)) {
                      e.appendChild(Bo('Recover Time'));
                      const n = document.createElement('div');
                      (n.id = 'CMTooltipRecover'), e.appendChild(n);
                      const i = mo(Ro(Math.max(0, t.magic - o), t.magicM, t.magic));
                      (n.textContent = i.text), (n.className = St + i.color);
                    }
                    if ('0' === to) {
                      e.appendChild(Bo('Cookies to be gained/lost'));
                      const t = document.createElement('div');
                      (t.id = 'x'), e.appendChild(t);
                      const o = document.createElement('span');
                      (o.style.color = '#33FF00'),
                        (o.textContent = P(
                          Math.min(0.15 * (Game.cookies + go()), 60 * Se * 30),
                          2,
                        )),
                        t.appendChild(o);
                      const n = document.createElement('span');
                      (n.textContent = ' / '), t.appendChild(n);
                      const i = document.createElement('span');
                      (i.style.color = 'red'),
                        (i.textContent = P(60 * Se * 15, 2)),
                        t.appendChild(i);
                    }
                    l('CMTooltipArea').appendChild(e);
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'p' === eo
              ? (function () {
                  const { minigame: t } = Game.Objects.Farm;
                  if (e.TooltipPlots && 0 !== t.plot[to[1]][to[0]][0]) {
                    const e =
                        t.plot[to[1]][to[0]][1] > t.plantsById[t.plot[to[1]][to[0]][0] - 1].mature,
                      o = t.plantsById[t.plot[to[1]][to[0]][0] - 1].name;
                    l('CMTooltipBorder').appendChild(Bo('Reward (Current / Maximum)'));
                    const n = document.createElement('div');
                    (n.id = 'CMTooltipPlantReward'),
                      l('CMTooltipBorder').appendChild(n),
                      'Bakeberry' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            e ? P(Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 30)) : '0'
                          } / ${P(60 * Game.cookiesPs * 30)}`)
                        : 'Chocoroot' === o || 'White chocoroot' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            e ? P(Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 3)) : '0'
                          } / ${P(60 * Game.cookiesPs * 3)}`)
                        : 'Queenbeet' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            e ? P(Math.min(0.04 * Game.cookies, 60 * Game.cookiesPs * 60)) : '0'
                          } / ${P(60 * Game.cookiesPs * 60)}`)
                        : 'Duketater' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            e ? P(Math.min(0.08 * Game.cookies, 60 * Game.cookiesPs * 120)) : '0'
                          } / ${P(60 * Game.cookiesPs * 120)}`)
                        : (l('CMTooltipArea').style.display = 'none');
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'ha' === eo
              ? (function () {
                  const { minigame: t } = Game.Objects.Farm;
                  if (e.TooltipLump) {
                    l('CMTooltipBorder').appendChild(Bo('Cookies gained from harvesting:'));
                    let e = 0,
                      o = 0;
                    Game.keys[16] && Game.keys[17] && (o = 1);
                    for (let n = 0; n < 6; n++)
                      for (let i = 0; i < 6; i++)
                        if (t.plot[n][i][0] >= 1) {
                          const a = t.plot[n][i],
                            r = t.plantsById[a[0] - 1],
                            l = r.name;
                          let s = !0;
                          o && r.immortal && (s = !1),
                            a[1] < r.matureBase && (s = !1),
                            s && 'Bakeberry' === l
                              ? (e += Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 30))
                              : (s && 'Chocoroot' === l) || 'White chocoroot' === l
                              ? (e += Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 3))
                              : s && 'Queenbeet' === l
                              ? (e += Math.min(0.04 * Game.cookies, 60 * Game.cookiesPs * 60))
                              : s &&
                                'Duketater' === l &&
                                (e += Math.min(0.08 * Game.cookies, 60 * Game.cookiesPs * 120));
                        }
                    l('CMTooltipBorder').appendChild(document.createTextNode(P(e)));
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'wb' === eo
              ? (function () {
                  (l('tooltip').innerHTML = ''), l('tooltip').appendChild(Bo('Reward:'));
                  const e = document.createElement('div');
                  (e.id = 'CMWrinklerReward'),
                    'PopAll' === to
                      ? (e.textContent = P(He))
                      : 'PopFattest' === to && (e.textContent = P($e[0])),
                    l('tooltip').appendChild(e);
                })()
              : ('pag' === eo || ('pas' === eo && -1 !== to[1])) &&
                (function () {
                  if (1 === e.TooltipPantheon) {
                    const t = l('CMTooltipBorder');
                    let o;
                    (o = 'pas' === eo ? to[1] : to), t.appendChild(Bo('Effect in position 1:'));
                    const n = document.createElement('div');
                    if (((n.id = 'CMPantheonTooltipPosition1'), 0 !== ft[o][0])) {
                      n.textContent = P(ft[o][0]);
                      const t = Math.round((ft[o][0] / Game.cookiesPs) * 1e4);
                      Number.isFinite(t) && 0 !== t
                        ? (n.textContent += ` (${t / 100}% of income)`)
                        : (n.textContent += ` (<0${e.ScaleSeparator ? ',' : '.'}01% of income)`);
                    } else n.textContent = 'No effect to CPS';
                    t.appendChild(n), t.appendChild(Bo('Effect in position 2:'));
                    const i = document.createElement('div');
                    if (((i.id = 'CMPantheonTooltipPosition2'), 0 !== ft[o][1])) {
                      i.textContent = P(ft[o][1]);
                      const t = Math.round((ft[o][1] / Game.cookiesPs) * 1e4);
                      Number.isFinite(t) && 0 !== t
                        ? (i.textContent += ` (${t / 100}% of income)`)
                        : (i.textContent += ` (<0${e.ScaleSeparator ? ',' : '.'}01% of income)`);
                    } else i.textContent = 'No effect to CPS';
                    t.appendChild(i), t.appendChild(Bo('Effect in position 3:'));
                    const a = document.createElement('div');
                    if (((a.id = 'CMPantheonTooltipPosition2'), 0 !== ft[o][2])) {
                      a.textContent = P(ft[o][2]);
                      const t = Math.round((ft[o][2] / Game.cookiesPs) * 1e4);
                      Number.isFinite(t) && 0 !== t
                        ? (a.textContent += ` (${t / 100}% of income)`)
                        : (a.textContent += ` (<0${e.ScaleSeparator ? ',' : '.'}01% of income)`);
                    } else a.textContent = 'No effect to CPS';
                    t.appendChild(a), l('CMTooltipArea').appendChild(t);
                  } else l('CMTooltipArea').style.display = 'none';
                })(),
            (function () {
              if ('b' === eo || 'u' === eo) {
                null === document.getElementById('CMDispTooltipWarningParent') &&
                  (l('tooltipAnchor').appendChild(
                    (function () {
                      const t = document.createElement('div');
                      (t.style.position = 'absolute'),
                        (t.style.display = 'block'),
                        (t.style.left = 'auto'),
                        (t.style.bottom = 'auto'),
                        (t.id = 'CMDispTooltipWarningParent');
                      const o = function (e, t, o, n, i) {
                        const a = document.createElement('div');
                        (a.id = e),
                          (a.style.display = 'none'),
                          (a.style.transition = 'opacity 0.1s ease-out'),
                          (a.className = 'CMBorder' + t),
                          (a.style.padding = '2px'),
                          (a.style.background = '#000 url(img/darkNoise.png)');
                        const r = document.createElement('div');
                        a.appendChild(r);
                        const l = document.createElement('span');
                        (l.className = St + t),
                          (l.style.fontWeight = 'bold'),
                          (l.textContent = o),
                          r.appendChild(l),
                          r.appendChild(document.createTextNode(n));
                        const s = document.createElement('div');
                        a.appendChild(s);
                        const c = document.createElement('span');
                        return (
                          (c.id = i),
                          s.appendChild(document.createTextNode('Deficit: ')),
                          s.appendChild(c),
                          a
                        );
                      };
                      return (
                        t.appendChild(
                          o(
                            'CMDispTooltipWarnLucky',
                            Ft,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Lucky!"',
                            'CMDispTooltipWarnLuckyText',
                          ),
                        ),
                        (t.firstChild.style.marginBottom = '4px'),
                        t.appendChild(
                          o(
                            'CMDispTooltipWarnLuckyFrenzy',
                            Nt,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)',
                            'CMDispTooltipWarnLuckyFrenzyText',
                          ),
                        ),
                        (t.lastChild.style.marginBottom = '4px'),
                        t.appendChild(
                          o(
                            'CMDispTooltipWarnConjure',
                            Lt,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Conjure Baked Goods"',
                            'CMDispTooltipWarnConjureText',
                          ),
                        ),
                        (t.lastChild.style.marginBottom = '4px'),
                        t.appendChild(
                          o(
                            'CMDispTooltipWarnConjureFrenzy',
                            Lt,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Conjure Baked Goods" (Frenzy)',
                            'CMDispTooltipWarnConjureFrenzyText',
                          ),
                        ),
                        (t.lastChild.style.marginBottom = '4px'),
                        t.appendChild(
                          o(
                            'CMDispTooltipWarnEdifice',
                            Lt,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies needed for "Spontaneous Edifice" to possibly give you your most expensive building"',
                            'CMDispTooltipWarnEdificeText',
                          ),
                        ),
                        (t.lastChild.style.marginBottom = '4px'),
                        t.appendChild(
                          o(
                            'CMDispTooltipWarnUser',
                            Ft,
                            'Warning: ',
                            `Purchase of this item will put you under the number of Cookies equal to ${e.ToolWarnUser} seconds of CPS`,
                            'CMDispTooltipWarnUserText',
                          ),
                        ),
                        t
                      );
                    })(),
                  ),
                  Io()),
                  0 === e.ToolWarnPos
                    ? (l('CMDispTooltipWarningParent').style.right = '0px')
                    : (l('CMDispTooltipWarningParent').style.top = `${
                        l('tooltip').offsetHeight
                      }px`),
                  (l('CMDispTooltipWarningParent').style.width =
                    l('tooltip').offsetWidth - 6 + 'px');
                const t = Game.cookies + go() - Jt,
                  o = e.ToolWarnBon ? Zt : 0;
                let n = Ce;
                if (1 === e.ToolWarnBon) {
                  let e = Zt;
                  (e /= No()), (n += (60 * e * 15) / 0.15);
                }
                if (
                  (1 === e.ToolWarnLucky && t < n && ('b' !== eo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnLucky').style.display = ''),
                      (l('CMDispTooltipWarnLuckyText').textContent = `${P(n - t)} (${uo(
                        (n - t) / (ho() + o),
                      )})`))
                    : (l('CMDispTooltipWarnLucky').style.display = 'none'),
                  1 === e.ToolWarnLuckyFrenzy)
                ) {
                  const e = 7 * n;
                  t < e && ('b' !== eo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnLuckyFrenzy').style.display = ''),
                      (l('CMDispTooltipWarnLuckyFrenzyText').textContent = `${P(e - t)} (${uo(
                        (e - t) / (ho() + o),
                      )})`))
                    : (l('CMDispTooltipWarnLuckyFrenzy').style.display = 'none');
                } else l('CMDispTooltipWarnLuckyFrenzy').style.display = 'none';
                if (1 === e.ToolWarnConjure) {
                  const e = 2 * n;
                  t < e && ('b' !== eo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnConjure').style.display = ''),
                      (l('CMDispTooltipWarnConjureText').textContent = `${P(e - t)} (${uo(
                        (e - t) / (ho() + o),
                      )})`))
                    : (l('CMDispTooltipWarnConjure').style.display = 'none');
                } else l('CMDispTooltipWarnConjure').style.display = 'none';
                if (1 === e.ToolWarnConjureFrenzy) {
                  const e = 2 * n * 7;
                  t < e && ('b' !== eo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnConjureFrenzy').style.display = ''),
                      (l('CMDispTooltipWarnConjureFrenzyText').textContent = `${P(e - t)} (${uo(
                        (e - t) / (ho() + o),
                      )})`))
                    : (l('CMDispTooltipWarnConjureFrenzy').style.display = 'none');
                } else l('CMDispTooltipWarnConjureFrenzy').style.display = 'none';
                1 === e.ToolWarnEdifice &&
                Game.Objects['Wizard tower'].minigameLoaded &&
                Te &&
                t < Te &&
                ('b' !== eo || 1 === Game.buyMode)
                  ? ((l('CMDispTooltipWarnEdifice').style.display = ''),
                    (l('CMDispTooltipWarnEdificeText').textContent = `${P(Te - t)} (${uo(
                      (Te - t) / (ho() + o),
                    )})`))
                  : (l('CMDispTooltipWarnEdifice').style.display = 'none'),
                  e.ToolWarnUser > 0 &&
                  t < e.ToolWarnUser * ho() &&
                  ('b' !== eo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnUser').style.display = ''),
                      (l(
                        'CMDispTooltipWarnUser',
                      ).children[0].textContent = `Purchase of this item will put you under the number of Cookies equal to ${e.ToolWarnUser} seconds of CPS`),
                      (l('CMDispTooltipWarnUserText').textContent = `${P(
                        e.ToolWarnUser * ho() - t,
                      )} (${uo((e.ToolWarnUser * ho() - t) / (ho() + o))})`))
                    : (l('CMDispTooltipWarnUser').style.display = 'none');
              } else
                null !== l('CMDispTooltipWarningParent') &&
                  l('CMDispTooltipWarningParent').remove();
            })();
        } else
          null === l('CMTooltipArea') &&
            null !== l('CMDispTooltipWarningParent') &&
            l('CMDispTooltipWarningParent').remove();
      }
      function Vo() {
        if (Game.prefs.autosave && Game.drawT % 10 == 0 && 'stats' === Game.onMenu && e.Stats) {
          const e = document.getElementById('CMStatsAutosaveTimer');
          e && (e.innerText = Game.sayTime(60 * Game.fps - (Game.T % (60 * Game.fps)), 4));
        }
        if (
          (so(),
          po(),
          co(),
          (function () {
            if (1 === e.TimerBar) {
              const t = l('CMTimerBar').offsetWidth - 163,
                o = l('CMTimerBar').offsetWidth - 133;
              let n = 0;
              0 !== Game.shimmerTypes.golden.spawned || Game.Has('Golden switch [off]')
                ? (l('CMTimerBarGC').style.display = 'none')
                : ((l('CMTimerBarGC').style.display = ''),
                  (l('CMTimerBarGCMinBar').style.width = `${Math.round(
                    (Math.max(0, Game.shimmerTypes.golden.minTime - Game.shimmerTypes.golden.time) *
                      t) /
                      Game.shimmerTypes.golden.maxTime,
                  )}px`),
                  e.TimerBarOverlay >= 1
                    ? (l('CMTimerBarGCMinBar').textContent = Math.ceil(
                        (Game.shimmerTypes.golden.minTime - Game.shimmerTypes.golden.time) /
                          Game.fps,
                      ))
                    : (l('CMTimerBarGCMinBar').textContent = ''),
                  Game.shimmerTypes.golden.minTime === Game.shimmerTypes.golden.maxTime
                    ? ((l('CMTimerBarGCMinBar').style.borderTopRightRadius = '10px'),
                      (l('CMTimerBarGCMinBar').style.borderBottomRightRadius = '10px'))
                    : ((l('CMTimerBarGCMinBar').style.borderTopRightRadius = ''),
                      (l('CMTimerBarGCMinBar').style.borderBottomRightRadius = '')),
                  (l('CMTimerBarGCBar').style.width = `${Math.round(
                    (Math.min(
                      Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime,
                      Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time,
                    ) *
                      t) /
                      Game.shimmerTypes.golden.maxTime,
                  )}px`),
                  e.TimerBarOverlay >= 1
                    ? (l('CMTimerBarGCBar').textContent = Math.ceil(
                        Math.min(
                          Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime,
                          Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time,
                        ) / Game.fps,
                      ))
                    : (l('CMTimerBarGCBar').textContent = ''),
                  (l('CMTimerBarGCTime').textContent = Math.ceil(
                    (Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time) / Game.fps,
                  )),
                  (n += 1)),
                'christmas' === Game.season && 0 === Game.shimmerTypes.reindeer.spawned
                  ? ((l('CMTimerBarRen').style.display = ''),
                    (l('CMTimerBarRenMinBar').style.width = `${Math.round(
                      (Math.max(
                        0,
                        Game.shimmerTypes.reindeer.minTime - Game.shimmerTypes.reindeer.time,
                      ) *
                        t) /
                        Game.shimmerTypes.reindeer.maxTime,
                    )}px`),
                    e.TimerBarOverlay >= 1
                      ? (l('CMTimerBarRenMinBar').textContent = Math.ceil(
                          (Game.shimmerTypes.reindeer.minTime - Game.shimmerTypes.reindeer.time) /
                            Game.fps,
                        ))
                      : (l('CMTimerBarRenMinBar').textContent = ''),
                    (l('CMTimerBarRenBar').style.width = `${Math.round(
                      (Math.min(
                        Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime,
                        Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time,
                      ) *
                        t) /
                        Game.shimmerTypes.reindeer.maxTime,
                    )}px`),
                    e.TimerBarOverlay >= 1
                      ? (l('CMTimerBarRenBar').textContent = Math.ceil(
                          Math.min(
                            Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime,
                            Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time,
                          ) / Game.fps,
                        ))
                      : (l('CMTimerBarRenBar').textContent = ''),
                    (l('CMTimerBarRenTime').textContent = Math.ceil(
                      (Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time) /
                        Game.fps,
                    )),
                    (n += 1))
                  : (l('CMTimerBarRen').style.display = 'none');
              const i = {};
              (l('CMTimerBarBuffTimers').innerHTML = ''),
                Object.keys(Game.buffs).forEach((t) => {
                  if (Game.buffs[t]) {
                    const a = fo(Game.buffs[t].name, Game.buffs[t].name, [
                      { id: `${Game.buffs[t].name}Bar` },
                    ]);
                    a.style.display = '';
                    let r = '';
                    (r = void 0 !== Kt[Game.buffs[t].name] ? Kt[Game.buffs[t].name] : Lt),
                      (a.lastChild.children[1].className = Bt + r),
                      (a.lastChild.children[1].style.color = 'black'),
                      2 === e.TimerBarOverlay
                        ? (a.lastChild.children[1].textContent = `${Math.round(
                            (Game.buffs[t].time / Game.buffs[t].maxTime) * 100,
                          )}%`)
                        : (a.lastChild.children[1].textContent = ''),
                      (a.lastChild.children[1].style.width = `${Math.round(
                        (Game.buffs[t].time *
                          (o - 8 * Math.ceil(Game.buffs[t].time / Game.fps).toString().length)) /
                          Game.buffs[t].maxTime,
                      )}px`),
                      (a.lastChild.children[2].textContent = Math.ceil(
                        Game.buffs[t].time / Game.fps,
                      )),
                      (n += 1),
                      (i[Game.buffs[t].name] = a);
                  }
                }),
                Object.keys(i).forEach((e) => {
                  l('CMTimerBarBuffTimers').appendChild(i[e]);
                }),
                0 !== n && (l('CMTimerBar').style.height = 12 * n + 2 + 'px'),
                io !== n && ((io = n), ko());
            }
          })(),
          yo(),
          zo(),
          (function () {
            if (1 === e.TooltipWrink && 1 === Rt) {
              let e = !1;
              Object.keys(Game.wrinklers).forEach((t) => {
                const o = Game.wrinklers[t];
                if (o.phase > 0 && o.selected) {
                  if (((e = !0), 0 === zt[t] || void 0 === zt[t])) {
                    const e = document.createElement('div'),
                      o = document.createElement('div');
                    (o.style.minWidth = '120px'), (o.style.marginBottom = '4px');
                    const n = document.createElement('div');
                    (n.style.textAlign = 'center'),
                      (n.id = 'CMTooltipWrinkler'),
                      o.appendChild(n),
                      e.appendChild(o),
                      Game.tooltip.draw(this, escape(e.innerHTML)),
                      (It = t),
                      (zt[t] = 1);
                  }
                } else zt[t] = 0;
              }),
                e || Game.tooltip.hide();
            }
          })(),
          (function () {
            if (1 === e.TooltipWrink && null !== l('CMTooltipWrinkler')) {
              let { sucked: e } = Game.wrinklers[It],
                t = 1.1;
              if (
                (Game.Has('Sacrilegious corruption') && (t *= 1.05),
                1 === Game.wrinklers[It].type && (t *= 3),
                (e *= t),
                Game.Has('Wrinklerspawn') && (e *= 1.05),
                Ct.Temple.minigameLoaded)
              ) {
                const t = Game.hasGod('scorn');
                1 === t ? (e *= 1.15) : 2 === t ? (e *= 1.1) : 3 === t && (e *= 1.05);
              }
              l('CMTooltipWrinkler').textContent = P(e);
            }
          })(),
          e.UpStats &&
            'stats' === Game.onMenu &&
            (Game.drawT - 1) % (5 * Game.fps) != 0 &&
            (Game.drawT - 1) % Game.fps == 0 &&
            Game.UpdateMenu(),
          t(),
          e.Scale)
        ) {
          let e = l('cookies').innerHTML.replace(/.*(?=<br>)/i, P(Game.cookies));
          Game.prefs.monospace && (e = `<span class="monospace">${e}</span>`),
            (l('cookies').innerHTML = e);
        }
      }
      function _o() {
        E.addLatest(Game.computedMouseCps);
      }
      class Qo {
        constructor(e) {
          (this.maxLength = e), (this.queue = []);
        }
        addLatest(e) {
          this.queue.push(e) > this.maxLength && this.queue.shift();
        }
        calcAverage(e) {
          let t = e;
          t > this.maxLength && (t = this.maxLength),
            t > this.queue.length && (t = this.queue.length);
          let o = 0;
          for (let e = this.queue.length - 1; e >= 0 && e > this.queue.length - 1 - t; e--)
            o += this.queue[e];
          return 0 === o ? 0 : o / t;
        }
        calcSum(e) {
          let t = e;
          return (
            t > this.maxLength && (t = this.maxLength),
            t > this.queue.length && (t = this.queue.length),
            0 === t ? 0 : this.queue.slice(-t).reduce((e, t) => e + t, 0)
          );
        }
      }
      function Xo() {
        const t = Math.floor(Date.now() / 1e3);
        if ((Game.T / Game.fps) % 1 == 0) {
          let o = Game.cookies + gt;
          Game.cpsSucked > 0 && (o += He), (lt = Math.max(Game.cookiesEarned, o)), (o *= 0.05);
          const n = t - j,
            i = Math.max(0, Game.cookies - D) / n,
            a = Math.max(0, He - H) / n,
            r = Math.max(0, $e[0] - U) / n,
            l = Math.max(0, o - Le) / n,
            s = (Game.cookieClicks - $) / n;
          for (let e = 0; e < n; e++)
            N.addLatest(i), O.addLatest(a), F.addLatest(r), L.addLatest(l), W.addLatest(s);
          (j = t), (D = Game.cookies), (H = He), (U = $e[0]), (Le = o), ($ = Game.cookieClicks);
          const c = qt[e.AvgCPSHist];
          (R = N.calcAverage(c)),
            (I = O.calcAverage(c)),
            (z = F.calcAverage(c)),
            (V = L.calcAverage(c)),
            (_ = R),
            1 === e.CalcWrink && (_ += I),
            2 === e.CalcWrink && (_ += z);
          const d = Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg');
          (st = d || 0 === e.CalcWrink ? R + I + (d ? V : 0) : _),
            (Ve = W.calcAverage(Yt[e.AvgClicksHist]));
        }
      }
      function qo(t, o) {
        Object.keys(t).forEach((n) => {
          if (e.PPRigidelMode && 1 === o) t[n].color = Wt;
          else {
            t[n].color = Eo(t[n], Game.Objects[n].getSumPrice(o));
            for (let o = 0; o < e.PPExcludeTop; o++) t[n].pp === mt[o][0] && (t[n].color = Wt);
          }
        });
      }
      function Yo(t, o) {
        Object.keys(t).forEach((n) => {
          const i = Game.Objects[n].getSumPrice(o);
          Game.cookiesPs
            ? (t[n].pp = Math.max(i - (Game.cookies + go()), 0) / Game.cookiesPs + i / t[n].bonus)
            : (t[n].pp = i / t[n].bonus),
            (e.PPRigidelMode && 1 === o) || mt.push([t[n].pp, o]);
        });
      }
      function Ko() {
        !(function () {
          (ut = 1 / 0),
            (mt = []),
            void 0 === e.PPExcludeTop && (e.PPExcludeTop = 0),
            Yo(We, 1),
            Yo(Ae, 10),
            Yo(je, 100),
            mt.sort((e, t) => e[0] - t[0]);
          let t = 0;
          if (e.PPOnlyConsiderBuyable)
            for (; mt[t][1] > Game.cookies && ((t += 1), mt.length !== t + 1); );
          (ut = mt[e.PPExcludeTop][t]), qo(We, 1), qo(Ae, 10), qo(je, 100);
        })(),
          Object.keys(ze).forEach((e) => {
            Game.cookiesPs
              ? (ze[e].pp =
                  Math.max(Game.Upgrades[e].getPrice() - (Game.cookies + go()), 0) /
                    Game.cookiesPs +
                  Game.Upgrades[e].getPrice() / ze[e].bonus)
              : (ze[e].pp = Game.Upgrades[e].getPrice() / ze[e].bonus),
              Number.isNaN(ze[e].pp) && (ze[e].pp = 1 / 0),
              (ze[e].color = Eo(ze[e], Game.Upgrades[e].getPrice()));
          });
      }
      function Jo(e, t, o, n, i) {
        let a = o,
          r = 0;
        for (let o = 0; o < i; o += 1) {
          let o = t * Game.priceIncrease ** Math.max(0, a - n);
          (o = Game.modifyBuildingPrice(e, o)), (o = Math.ceil(o)), (r += o), (a += 1);
        }
        return r;
      }
      function Zo(e) {
        const t = {};
        return (
          Object.keys(Game.Objects).forEach((o) => {
            (t[o] = {}), (t[o].bonus = $o(o, e)), 1 !== e && (q = 1);
          }),
          t
        );
      }
      function en() {
        Object.keys(Game.Objects).forEach((e) => {
          (We[e].price = Jo(
            Game.Objects[e],
            Game.Objects[e].basePrice,
            Game.Objects[e].amount,
            Game.Objects[e].free,
            1,
          )),
            (Ae[e].price = Jo(
              Game.Objects[e],
              Game.Objects[e].basePrice,
              Game.Objects[e].amount,
              Game.Objects[e].free,
              10,
            )),
            (je[e].price = Jo(
              Game.Objects[e],
              Game.Objects[e].basePrice,
              Game.Objects[e].amount,
              Game.Objects[e].free,
              100,
            )),
            (De[e].price = Jo(
              Game.Objects[e],
              Game.Objects[e].basePrice,
              Game.Objects[e].amount,
              Game.Objects[e].free,
              De[e].AmountNeeded,
            ));
        });
      }
      function tn() {
        (We = Zo(1)),
          (Ae = Zo(10)),
          (je = Zo(100)),
          (ze = []),
          Object.keys(Game.Upgrades).forEach((t) => {
            const o = (function (e) {
              if (
                'toggle' === Game.Upgrades[e].pool ||
                (0 === Game.Upgrades[e].bought &&
                  Game.Upgrades[e].unlocked &&
                  'prestige' !== Game.Upgrades[e].pool)
              ) {
                So(),
                  'Shimmering veil [on]' === yt[e].name
                    ? (yt['Shimmering veil [off]'].bought = 0)
                    : 'Golden switch [on]' === yt[e].name
                    ? (yt['Golden switch [off]'].bought = 0)
                    : (yt[e].bought = (yt[e].bought + 1) % 2),
                  Game.CountsAsUpgradeOwned(Game.Upgrades[e].pool) && (J += 1),
                  'Elder Pledge' === e
                    ? ((Z += 1), Z > 0 && Oo('Elder nap'), Z >= 5 && Oo('Elder slumber'))
                    : 'Elder Covenant' === e
                    ? Oo('Elder calm')
                    : 'Prism heart biscuits' === e
                    ? Oo('Lovely cookies')
                    : 'Heavenly key' === e && Oo('Wholesome');
                const t = ee;
                Fo(), Uo(), t !== ee && Fo();
                const o =
                  (function () {
                    let e = 0;
                    wt('Thousand fingers') && (e += 0.1),
                      wt('Million fingers') && (e *= 5),
                      wt('Billion fingers') && (e *= 10),
                      wt('Trillion fingers') && (e *= 20),
                      wt('Quadrillion fingers') && (e *= 20),
                      wt('Quintillion fingers') && (e *= 20),
                      wt('Sextillion fingers') && (e *= 20),
                      wt('Septillion fingers') && (e *= 20),
                      wt('Octillion fingers') && (e *= 20),
                      wt('Nonillion fingers') && (e *= 20);
                    let t = 0;
                    Object.keys(Ct).forEach((e) => {
                      t += Ct[e].amount;
                    }),
                      (t -= Ct.Cursor.amount),
                      (e *= t),
                      wt('Plastic mouse') && (e += 0.01 * de),
                      wt('Iron mouse') && (e += 0.01 * de),
                      wt('Titanium mouse') && (e += 0.01 * de),
                      wt('Adamantium mouse') && (e += 0.01 * de),
                      wt('Unobtainium mouse') && (e += 0.01 * de),
                      wt('Eludium mouse') && (e += 0.01 * de),
                      wt('Wishalloy mouse') && (e += 0.01 * de),
                      wt('Fantasteel mouse') && (e += 0.01 * de),
                      wt('Nevercrack mouse') && (e += 0.01 * de),
                      wt('Armythril mouse') && (e += 0.01 * de),
                      wt('Technobsidian mouse') && (e += 0.01 * de),
                      wt('Plasmarble mouse') && (e += 0.01 * de),
                      wt('Miraculite mouse') && (e += 0.01 * de),
                      wt('Fortune #104') && (e += 0.01 * de);
                    let o = 1;
                    if (
                      (wt("Santa's helpers") && (o *= 1.1),
                      wt('Cookie egg') && (o *= 1.1),
                      wt('Halo gloves') && (o *= 1.1),
                      wt('Dragon claw') && (o *= 1.03),
                      wt('Aura gloves') &&
                        (o *=
                          1 +
                          0.05 *
                            Math.min(Game.Objects.Cursor.level, wt('Luminous gloves') ? 20 : 10)),
                      (o *= vt('click')),
                      Ct.Temple.minigameLoaded && xt)
                    ) {
                      const e = xt('labor');
                      1 === e ? (o *= 1.15) : 2 === e ? (o *= 1.1) : 3 === e && (o *= 1.05);
                    }
                    Object.keys(Game.buffs).forEach((e) => {
                      void 0 !== Game.buffs[e].multClick && (o *= Game.buffs[e].multClick);
                    }),
                      (o *= 1 + 0.05 * kt('Dragon Cursor'));
                    let n =
                      o *
                      Game.ComputeCps(
                        1,
                        wt('Reinforced index finger') +
                          wt('Carpal tunnel prevention cream') +
                          wt('Ambidextrous'),
                        e,
                      );
                    return (
                      (n = Game.runModHookOnValue('cookiesPerClick', n)),
                      Game.hasBuff('Cursed finger') && (n = Game.buffs['Cursed finger'].power),
                      n
                    );
                  })() - Game.computedMouseCps;
                return o ? [de - Game.cookiesPs, o] : [de - Game.cookiesPs];
              }
              return [];
            })(t);
            'Elder Pledge' === t
              ? ((ze[t] = { bonus: Game.cookiesPs - R }),
                1 === e.CalcWrink ? (ze[t].bonus -= I) : 2 === e.CalcWrink && (ze[t].bonus -= z),
                Number.isFinite(ze[t].bonus) || (ze[t].bonus = 0))
              : ((ze[t] = {}), o[0] && (ze[t].bonus = o[0]), o[1] && (ze[t].bonusMouse = o[1]));
          });
      }
      function on(e, t, o) {
        let n = 0,
          i = 0,
          a = 0,
          r = 0,
          l = 1 + Math.max(0, Math.ceil(Math.log(Game.cookies) / Math.LN10) - 10);
        for (; a < t * o; )
          (i = Math.max(e, Math.min(Math.floor((1 / 9) * 10 ** l * e * o), t * o))),
            (a = Math.max(e, Math.min(Math.floor((1 / 9) * 10 ** (l + 1) * e * o), t * o))),
            (r = Math.floor((1 / 9) * 10 ** (l + 1) * e * o)),
            (n += i),
            (l += 1);
        return [n, i, r];
      }
      function nn() {
        let e = 60 * Se * 60 * 6 * Be;
        const t = No();
        t > 0 ? (e /= t) : (e = 0),
          (Ke = on(7, e, Pe)),
          (qe = (2 * Ke[1]) / Pe),
          (Ye = Ke[2] / 60 / 60 / 6 / Be),
          (et = on(6, e, Ee)),
          (Je = (2 * et[1]) / Ee),
          (Ze = et[2] / 60 / 60 / 6 / Be),
          (nt = on(7, 7 * e, Pe)),
          (tt = (2 * nt[1]) / Pe),
          (ot = nt[2] / 60 / 60 / 6 / Be),
          (rt = on(6, 7 * e, Ee)),
          (it = (2 * rt[1]) / Ee),
          (at = rt[2] / 60 / 60 / 6 / Be);
      }
      function an() {
        const e = Math.floor(Date.now() / 1e3);
        if ((Game.T / Game.fps) % 1 == 0) {
          const t = Game.HowMuchPrestige(Game.cookiesReset),
            o =
              Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) -
              Math.floor(t),
            n = e - Q,
            i = Math.max(0, o - X) / n;
          for (let e = 0; e < n; e++) A.addLatest(i);
          (Q = e), (X = o), (Ne = A.calcAverage(5));
        }
      }
      function rn() {
        (_e = ''), (Xe = ''), (Qe = '');
        const e = [];
        Object.keys(Game.Upgrades).forEach((t) => {
          e.push(Game.Upgrades[t]);
        }),
          e.sort(function (e, t) {
            return e.order > t.order ? 1 : e.order < t.order ? -1 : 0;
          }),
          Object.keys(e).forEach((t) => {
            const o = e[t];
            if (0 === o.bought) {
              let e = '';
              (e += (function (e) {
                let t = 'crate upgrade missing';
                'prestige' === e.pool && (t += ' heavenly');
                let o = 0;
                Game.prefs.crates || (o = 1), o && (t += ' noFrame');
                let { icon: n } = e;
                e.iconFunction && (n = e.iconFunction());
                const i = `function() {return Game.crateTooltip(Game.UpgradesById[${e.id}], 'stats');}`;
                return `<div class="${t}"\n\t${Game.getDynamicTooltip(i, 'top', !0)}\n\tstyle = "${
                  n[2] ? `background-image: url(${n[2]});` : ''
                }background-position:${48 * -n[0]}px ${48 * -n[1]}px;">\n\t</div>`;
              })(o)),
                'prestige' === o.pool
                  ? (Qe += e)
                  : 'cookie' === o.pool
                  ? (Xe += e)
                  : 'toggle' !== o.pool && 'unused' !== o.pool && 'debug' !== o.pool && (_e += e);
            }
          });
      }
      function ln() {
        if ('christmas' === Game.season) {
          let e = 60 * Game.cookiesPs;
          Game.hasBuff('Elder frenzy') && (e *= 0.5),
            Game.hasBuff('Frenzy') && (e *= 0.75),
            (Fe = Math.max(25, e)),
            Game.Has('Ho ho ho-flavored frosting') && (Fe *= 2);
        }
      }
      function sn() {
        (Ce = (900 * Se) / 0.15), (Ce *= Be);
        const e = No();
        e > 0 ? (Ce /= e) : (Ce = 0),
          (ye = Pe * (0.15 * Ce) + 13),
          (be = Ee * (0.15 * Ce) + 13),
          (ke = 7 * Ce),
          (Ge = Pe * (0.15 * ke) + 13),
          (ve = Ee * (0.15 * ke) + 13),
          (we = 2 * Ce),
          (xe = 0.15 * we),
          (Te = 0);
        let t = 0,
          o = 0;
        Object.keys(Game.Objects).forEach((e) => {
          Game.Objects[e].amount > t && (t = Game.Objects[e].amount),
            Game.Objects[e].amount > 0 && (o += 1);
        }),
          Object.keys(Game.Objects).forEach((e) => {
            (Game.Objects[e].amount < t || 1 === o) &&
              Game.Objects[e].amount < 400 &&
              2 * Game.Objects[e].price > Te &&
              ((Te = 2 * Game.Objects[e].price), (Me = e));
          });
      }
      function cn() {
        let e = 1,
          t = 1,
          o = 1;
        wt('Green yeast digestives') && (o *= 1.01),
          wt('Dragon fang') && (o *= 1.03),
          (e *= 1 + 0.1 * Game.auraMult('Ancestral Metamorphosis')),
          (e *= Game.eff('goldenCookieGain')),
          (t *= 1 + 0.1 * Game.auraMult('Unholy Dominion')),
          (t *= Game.eff('wrathCookieGain')),
          (Pe = o * e),
          (Ee = o * t),
          (Be = 1),
          0 === Game.shimmerTypes.golden.n && (Be *= 1 + 1.23 * Game.auraMult("Dragon's Fortune"));
      }
      function dn() {
        const e = {};
        Object.keys(Game.Objects).forEach((t) => {
          if (0 !== Object.keys(De).length && De[t].TotalNeeded > Game.Objects[t].amount)
            e[t] = {
              AmountNeeded: De[t].TotalNeeded - Game.Objects[t].amount,
              TotalNeeded: De[t].TotalNeeded,
            };
          else {
            const o = (function (e) {
              const t = Game.AchievementsOwned;
              for (let o = 0; o < 101; o++) if (($o(e, o), ee > t)) return o;
              return 101;
            })(t);
            e[t] = { AmountNeeded: o, TotalNeeded: Game.Objects[t].amount + o };
          }
        }),
          (De = e);
      }
      function pn() {
        (He = 0), (Ue = 0), ($e = [0, null]);
        for (let e = 0; e < Game.wrinklers.length; e++) {
          let { sucked: t } = Game.wrinklers[e],
            o = 1.1;
          if (
            (Game.Has('Sacrilegious corruption') && (o *= 1.05),
            1 === Game.wrinklers[e].type && (o *= 3),
            (t *= o),
            Game.Has('Wrinklerspawn') && (t *= 1.05),
            Ct.Temple.minigameLoaded)
          ) {
            const e = Game.hasGod('scorn');
            1 === e ? (t *= 1.15) : 2 === e ? (t *= 1.1) : 3 === e && (t *= 1.05);
          }
          (He += t), 0 === Game.wrinklers[e].type && ((Ue += t), t > $e[0] && ($e = [t, e]));
        }
      }
      function un() {
        vo(),
          pn(),
          sn(),
          cn(),
          nn(),
          rn(),
          ln(),
          (N = new Qo(qt[qt.length - 1])),
          (O = new Qo(qt[qt.length - 1])),
          (F = new Qo(qt[qt.length - 1])),
          (L = new Qo(qt[qt.length - 1])),
          (W = new Qo(Yt[Yt.length - 1])),
          (A = new Qo(5)),
          (E = new Qo(20 * Yt[Yt.length - 1])),
          an(),
          dn(),
          Xo(),
          tn(),
          en(),
          Ko();
      }
      const mn = {
          CPSMode: 1,
          AvgCPSHist: 3,
          AvgClicksHist: 0,
          CalcWrink: 0,
          Scale: 2,
          ScaleDecimals: 2,
          ScaleSeparator: 0,
          ScaleCutoff: 999999,
          TimeFormat: 0,
          DetailedTime: 1,
          PPDisplayTime: 0,
          BuildColour: 1,
          PPOnlyConsiderBuyable: 0,
          PPExcludeTop: 0,
          PPRigidelMode: 0,
          PPSecondsLowerLimit: 0,
          ColourBlue: '#4bb8f0',
          ColourGreen: '#00ff00',
          ColourYellow: '#ffff00',
          ColourOrange: '#ff7f00',
          ColourRed: '#ff0000',
          ColourPurple: '#ff00ff',
          ColourGray: '#b3b3b3',
          ColourPink: '#ff1493',
          ColourBrown: '#8b4513',
          BotBar: 1,
          TimerBar: 1,
          TimerBarPos: 0,
          TimerBarOverlay: 2,
          UpBarColour: 1,
          UpgradeBarFixedPos: 1,
          SortBuildings: 0,
          SortUpgrades: 0,
          UpgradesNeverCollapse: 0,
          DragonAuraInfo: 1,
          GrimoireBar: 1,
          GCTimer: 1,
          Favicon: 1,
          WrinklerButtons: 1,
          HideSectionsButtons: 0,
          TooltipBuildUpgrade: 1,
          TooltipAmor: 0,
          ToolWarnLucky: 1,
          ToolWarnLuckyFrenzy: 1,
          ToolWarnConjure: 1,
          ToolWarnConjureFrenzy: 1,
          ToolWarnEdifice: 1,
          ToolWarnUser: 0,
          ToolWarnBon: 1,
          ToolWarnPos: 1,
          TooltipGrim: 1,
          TooltipWrink: 1,
          TooltipLump: 1,
          TooltipPlots: 1,
          TooltipPantheon: 1,
          TooltipAscendButton: 1,
          Stats: 1,
          MissingUpgrades: 1,
          MissingAchievements: 0,
          UpStats: 1,
          HeavenlyChipsTarget: 1,
          ShowMissedGC: 1,
          Title: 1,
          GeneralSound: 1,
          GCNotification: 0,
          GCFlash: 1,
          ColourGCFlash: '#ffffff',
          GCSound: 1,
          GCVolume: 100,
          GCSoundURL: 'https://freesound.org/data/previews/66/66717_931655-lq.mp3',
          FortuneNotification: 0,
          FortuneFlash: 1,
          ColourFortuneFlash: '#ffffff',
          FortuneSound: 1,
          FortuneVolume: 100,
          FortuneSoundURL: 'https://freesound.org/data/previews/174/174027_3242494-lq.mp3',
          SeaNotification: 0,
          SeaFlash: 1,
          ColourSeaFlash: '#ffffff',
          SeaSound: 1,
          SeaVolume: 100,
          SeaSoundURL: 'https://www.freesound.org/data/previews/121/121099_2193266-lq.mp3',
          GardFlash: 1,
          ColourGardFlash: '#ffffff',
          GardSound: 1,
          GardVolume: 100,
          GardSoundURL: 'https://freesound.org/data/previews/103/103046_861714-lq.mp3',
          MagicNotification: 0,
          MagicFlash: 1,
          ColourMagicFlash: '#ffffff',
          MagicSound: 1,
          MagicVolume: 100,
          MagicSoundURL: 'https://freesound.org/data/previews/221/221683_1015240-lq.mp3',
          WrinklerNotification: 0,
          WrinklerFlash: 1,
          ColourWrinklerFlash: '#ffffff',
          WrinklerSound: 1,
          WrinklerVolume: 100,
          WrinklerSoundURL: 'https://freesound.org/data/previews/124/124186_8043-lq.mp3',
          WrinklerMaxNotification: 0,
          WrinklerMaxFlash: 1,
          ColourWrinklerMaxFlash: '#ffffff',
          WrinklerMaxSound: 1,
          WrinklerMaxVolume: 100,
          WrinklerMaxSoundURL: 'https://freesound.org/data/previews/152/152743_15663-lq.mp3',
          BulkBuyBlock: 0,
          FavouriteSettings: 1,
          Header: {
            Favourite: 1,
            Calculation: 1,
            Notation: 1,
            Colours: 1,
            BarsDisplay: 1,
            Tooltip: 1,
            Statistics: 1,
            Notification: 1,
            NotificationGeneral: 1,
            NotificationGC: 1,
            NotificationFC: 1,
            NotificationSea: 1,
            NotificationGard: 1,
            NotificationMagi: 1,
            NotificationWrink: 1,
            NotificationWrinkMax: 1,
            Miscellaneous: 1,
            Lucky: 1,
            Chain: 1,
            Spells: 1,
            Garden: 1,
            Prestige: 1,
            Wrink: 1,
            Sea: 1,
            Misc: 1,
            InfoTab: 1,
          },
        },
        hn = function (e) {
          if (1 === e) {
            const e = function () {
              try {
                Notification.requestPermission().then();
              } catch (e) {
                return !1;
              }
              return !0;
            };
            'Notification' in window
              ? e()
                ? Notification.requestPermission().then()
                : Notification.requestPermission()
              : console.log('This browser does not support notifications.');
          }
        };
      function gn() {
        1 === e.BotBar
          ? ((l('CMBotBar').style.display = ''), yo())
          : (l('CMBotBar').style.display = 'none'),
          ko();
      }
      function fn() {
        BeautifyAll(), Game.RefreshStore(), Game.RebuildUpgrades(), yo(), so(), po();
      }
      function Cn() {
        1 === e.Favicon && y > 0
          ? ct.wrath
            ? (l('CMFavicon').href =
                'https://aktanusa.github.io/CookieMonster/favicon/wrathCookie.ico')
            : (l('CMFavicon').href =
                'https://aktanusa.github.io/CookieMonster/favicon/goldenCookie.ico')
          : (l('CMFavicon').href = 'https://orteil.dashnet.org/cookieclicker/favicon.ico');
      }
      class yn {
        constructor(e, t) {
          (this.type = e), (this.group = t);
        }
      }
      class bn extends yn {
        constructor(e, t, o) {
          super(e, t), (this.desc = o);
        }
      }
      class kn extends yn {
        constructor(e, t, o, n, i, a) {
          super(e, t), (this.label = o), (this.desc = n), (this.min = i), (this.max = a);
        }
      }
      class Gn extends yn {
        constructor(e, t, o, n, i, a) {
          super(e, t),
            (this.label = o),
            (this.desc = n),
            (this.toggle = i),
            void 0 !== a && (this.func = a);
        }
      }
      class vn extends yn {
        constructor(e, t, o, n) {
          super(e, t), (this.label = o), (this.desc = n);
          for (let e = 0; e < 101; e++) this.label[e] = `${e}%`;
        }
      }
      const wn = {
        CPSMode: new Gn(
          'bool',
          'Calculation',
          ['Current cookies per second', 'Average cookies per second'],
          'Calculate times using current cookies per second or average cookies per second',
          !1,
        ),
        AvgCPSHist: new Gn(
          'bool',
          'Calculation',
          [
            'Average CPS in past 10s',
            'Average CPS in past 15s',
            'Average CPS in past 30s',
            'Average CPS in past 1m',
            'Average CPS in past 5m',
            'Average CPS in past 10m',
            'Average CPS in past 15m',
            'Average CPS in past 30m',
          ],
          'How much time average Cookies Per Second should consider',
          !1,
        ),
        AvgClicksHist: new Gn(
          'bool',
          'Calculation',
          [
            'Average clicks in past 1s',
            'Average clicks in past 5s',
            'Average clicks in past 10s',
            'Average clicks in past 15s',
            'Average clicks in past 30s',
          ],
          'How much time average Cookie Clicks should consider',
          !1,
        ),
        CalcWrink: new Gn(
          'bool',
          'Calculation',
          [
            'Calculate with wrinklers OFF',
            'Calculate with wrinklers ON',
            'Calculate with single fattest wrinkler ON',
          ],
          'Calculate times and average Cookies Per Second with (only the single non-shiny fattest) wrinklers',
          !0,
          () => {
            se = !0;
          },
        ),
        Scale: new Gn(
          'bool',
          'Notation',
          [
            "Game's setting scale",
            'Metric',
            'Short scale',
            'Short scale (Abbreviated)',
            'Scientific notation',
            'Engineering notation',
          ],
          'Change how long numbers are formatted',
          !1,
          () => {
            fn();
          },
        ),
        ScaleDecimals: new Gn(
          'bool',
          'Notation',
          ['1 decimals', '2 decimals', '3 decimals'],
          'Set the number of decimals used when applicable. This only works with Cookie Monster scales and not with "Game\'s Setting Scale"',
          !1,
          () => {
            fn();
          },
        ),
        ScaleSeparator: new Gn(
          'bool',
          'Notation',
          ['. for decimals (standard)', '. for thousands'],
          'Set the separator used for decimals and thousands',
          !1,
          () => {
            fn();
          },
        ),
        ScaleCutoff: new kn(
          'numscale',
          'Notation',
          'Notation cut-off point: ',
          'The number from which Cookie Monster will start formatting numbers based on chosen scale. Standard is 999,999. Setting this above 999,999,999 might break certain notations',
          1,
          999999999,
        ),
        TimeFormat: new Gn(
          'bool',
          'Notation',
          ['Time XXd, XXh, XXm, XXs', 'Time XX:XX:XX:XX:XX'],
          'Change the time format',
          !1,
        ),
        DetailedTime: new Gn(
          'bool',
          'Notation',
          ['Detailed time OFF', 'Detailed time ON'],
          'Change how time is displayed in certain statistics and tooltips',
          !0,
          () => {
            1 === e.DetailedTime ? (Game.sayTime = Vt) : (Game.sayTime = M.sayTime);
          },
        ),
        PPDisplayTime: new Gn(
          'bool',
          'Notation',
          ['PP as value (standard)', 'PP as time unit'],
          'Display PP as calculated value or as approximate time unit. Note that PP does not translate directly into a time unit and this is therefore only an approximation.',
          !1,
        ),
        BuildColour: new Gn(
          'bool',
          'Colours',
          ['Building colours OFF', 'Building colours ON'],
          'Colour code buildings',
          !0,
          () => {
            so();
          },
        ),
        PPOnlyConsiderBuyable: new Gn(
          'bool',
          'Colours',
          ["Don't ignore non-buyable", 'Ignore non-buyable'],
          "Makes Cookie Monster label buildings and upgrades you can't buy right now red, useful in those situations where you just want to spend your full bank 'most optimally'",
          !0,
        ),
        PPExcludeTop: new Gn(
          'bool',
          'Colours',
          [
            "Don't ignore any",
            'Ignore 1st best',
            'Ignore 1st and 2nd best',
            'Ignore 1st, 2nd and 3rd best',
          ],
          'Makes Cookie Monster ignore the 1st, 2nd or 3rd best buildings in labeling and colouring PP values',
          !0,
        ),
        PPRigidelMode: new Gn(
          'bool',
          'Colours',
          ['Rigidel mode OFF', 'Rigidel mode ON'],
          'Makes Cookie Monster ignore all "buy 1" options when colouring PP in order to stay at a total building count ending in 10 for pantheon god Rigidel',
          !0,
        ),
        PPSecondsLowerLimit: new kn(
          'numscale',
          'Colours',
          'Lower limit for PP (in seconds): ',
          'If a building or upgrade costs less than the specified seconds of CPS it will also be considered optimal and label it as such ("PP is less than xx seconds of CPS"); setting to 0 ignores this option',
          0,
          1 / 0,
        ),
        ColourBlue: new bn(
          'colour',
          'Colours',
          'Standard colour is blue. Used to show upgrades better than best PP building, for Click Frenzy bar, and for various labels',
        ),
        ColourGreen: new bn(
          'colour',
          'Colours',
          'Standard colour is green. Used to show best PP building, for Blood Frenzy bar, and for various labels',
        ),
        ColourYellow: new bn(
          'colour',
          'Colours',
          'Standard colour is yellow. Used to show buildings within the top 10 of PP, for Frenzy bar, and for various labels',
        ),
        ColourOrange: new bn(
          'colour',
          'Colours',
          'Standard colour is orange. Used to show buildings within the top 20 of PP, for Next Reindeer bar, and for various labels',
        ),
        ColourRed: new bn(
          'colour',
          'Colours',
          'Standard colour is Red. Used to show buildings within the top 30 of PP, for Clot bar, and for various labels',
        ),
        ColourPurple: new bn(
          'colour',
          'Colours',
          'Standard colour is purple. Used to show buildings outside of the top 30 of PP, for Next Cookie bar, and for various labels',
        ),
        ColourGray: new bn(
          'colour',
          'Colours',
          'Standard colour is gray. Used to show negative or infinity PP, and for Next Cookie/Next Reindeer bar',
        ),
        ColourPink: new bn(
          'colour',
          'Colours',
          'Standard colour is pink. Used for Dragonflight bar',
        ),
        ColourBrown: new bn(
          'colour',
          'Colours',
          'Standard colour is brown. Used for Dragon Harvest bar',
        ),
        BotBar: new Gn(
          'bool',
          'BarsDisplay',
          ['Bottom bar OFF', 'Bottom bar ON'],
          'Building information',
          !0,
          () => {
            gn();
          },
        ),
        TimerBar: new Gn(
          'bool',
          'BarsDisplay',
          ['Timer bar OFF', 'Timer bar ON'],
          'Bar with timers for golden cookie, season popup, Frenzy (Normal, Clot, Elder), Click Frenzy',
          !0,
          () => {
            Go();
          },
        ),
        TimerBarPos: new Gn(
          'bool',
          'BarsDisplay',
          ['Timer bar position (top left)', 'Timer bar position (bottom)'],
          'Placement of the timer bar',
          !1,
          () => {
            0 === e.TimerBarPos
              ? ((l('CMTimerBar').style.width = '30%'),
                (l('CMTimerBar').style.bottom = ''),
                l('game').insertBefore(l('CMTimerBar'), l('sectionLeft')))
              : ((l('CMTimerBar').style.width = '100%'),
                (l('CMTimerBar').style.bottom = '0px'),
                l('wrapper').appendChild(l('CMTimerBar'))),
              ko();
          },
        ),
        TimerBarOverlay: new Gn(
          'bool',
          'BarsDisplay',
          ['Timer bar overlay OFF', 'Timer bar overlay only seconds', 'Timer bar overlay full'],
          'Overlay on timers displaying seconds and/or percentage left',
          !0,
        ),
        UpBarColour: new Gn(
          'bool',
          'BarsDisplay',
          [
            'Upgrade colours/bar OFF',
            'Upgrade colours with bar ON',
            'Upgrade colours without bar ON',
          ],
          'Colour code upgrades and optionally add a counter bar',
          !1,
          () => {
            1 === e.UpBarColor
              ? ((l('CMUpgradeBar').style.display = ''), po())
              : 2 === e.UpBarColor
              ? ((l('CMUpgradeBar').style.display = 'none'), po())
              : ((l('CMUpgradeBar').style.display = 'none'), Game.RebuildUpgrades());
          },
        ),
        UpgradeBarFixedPos: new Gn(
          'bool',
          'BarsDisplay',
          ['Upgrade bar fixed position OFF', 'Upgrade bar fixed position ON'],
          'Lock the upgrade bar at top of the screen to prevent it from moving ofscreen when scrolling',
          !0,
          () => {
            1 === e.UpgradeBarFixedPos
              ? ((l('CMUpgradeBar').style.position = 'sticky'),
                (l('CMUpgradeBar').style.top = '0px'))
              : (l('CMUpgradeBar').style.position = '');
          },
        ),
        SortBuildings: new Gn(
          'bool',
          'BarsDisplay',
          [
            'Sort buildings: default',
            'Sort buildings: PP of x1 purchase',
            'Sort buildings: PP of selected bulk mode',
          ],
          'Sort the display of buildings in either default order or by PP',
          !1,
          () => {
            so();
          },
        ),
        SortUpgrades: new Gn(
          'bool',
          'BarsDisplay',
          ['Sort upgrades: default', 'Sort upgrades: PP'],
          'Sort the display of upgrades in either default order or by PP',
          !1,
          () => {
            po();
          },
        ),
        UpgradesNeverCollapse: new Gn(
          'bool',
          'BarsDisplay',
          ['Upgrades always expanded OFF', 'Upgrades always expanded ON'],
          'Toggle to make the upgrades sections always expanded to the size needed to display all upgrades',
          !0,
          () => {
            co();
          },
        ),
        DragonAuraInfo: new Gn(
          'bool',
          'BarsDisplay',
          ['Extra dragon aura info OFF', 'Extra dragon aura info ON'],
          'Shows information about changes in CPS and costs in the dragon aura interface.',
          !0,
        ),
        GrimoireBar: new Gn(
          'bool',
          'BarsDisplay',
          ['Grimoire magic meter timer OFF', 'Grimoire magic meter timer ON'],
          'A timer on how long before the Grimoire magic meter is full',
          !0,
        ),
        GCTimer: new Gn(
          'bool',
          'BarsDisplay',
          ['Golden cookie timer OFF', 'Golden cookie timer ON'],
          'A timer on the golden cookie when it has been spawned',
          !0,
          () => {
            1 === e.GCTimer
              ? Object.keys(ao).forEach((e) => {
                  (ao[e].style.display = 'block'),
                    (ao[e].style.left = ht[e].l.style.left),
                    (ao[e].style.top = ht[e].l.style.top);
                })
              : Object.keys(ao).forEach((e) => (ao[e].style.display = 'none'));
          },
        ),
        Favicon: new Gn(
          'bool',
          'BarsDisplay',
          ['Favicon OFF', 'Favicon ON'],
          'Update favicon with golden/wrath cookie',
          !0,
          () => {
            Cn();
          },
        ),
        WrinklerButtons: new Gn(
          'bool',
          'BarsDisplay',
          ['Extra wrinkler buttons OFF', 'Extra wrinkler buttons ON'],
          'Show buttons for popping wrinklers at bottom of cookie section',
          !0,
          () => {
            t();
          },
        ),
        HideSectionsButtons: new Gn(
          'bool',
          'BarsDisplay',
          ['Hide buildings/upgrades button OFF', 'Hide buildings/upgrades button ON'],
          'Show buttons for hiding and showing the buildings and upgrades sections in the right column',
          !0,
          () => {
            e.HideSectionsButtons
              ? (l('CMSectionHidButtons').style.display = '')
              : (l('CMSectionHidButtons').style.display = 'none');
          },
        ),
        TooltipBuildUpgrade: new Gn(
          'bool',
          'Tooltip',
          ['Building/upgrade tooltip information OFF', 'Building/upgrade tooltip information ON'],
          'Extra information in building/upgrade tooltips',
          !0,
        ),
        TooltipAmor: new Gn(
          'bool',
          'Tooltip',
          [
            'Buildings tooltip amortization information OFF',
            'Buildings tooltip amortization information ON',
          ],
          'Add amortization information to buildings tooltip',
          !0,
        ),
        ToolWarnLucky: new Gn(
          'bool',
          'Tooltip',
          ['Tooltip lucky warning OFF', 'Tooltip lucky warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Lucky!" rewards',
          !0,
        ),
        ToolWarnLuckyFrenzy: new Gn(
          'bool',
          'Tooltip',
          ['Tooltip lucky frenzy warning OFF', 'Tooltip lucky frenzy warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Lucky!" (Frenzy) rewards',
          !0,
        ),
        ToolWarnConjure: new Gn(
          'bool',
          'Tooltip',
          ['Tooltip conjure warning OFF', 'Tooltip conjure warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards',
          !0,
        ),
        ToolWarnConjureFrenzy: new Gn(
          'bool',
          'Tooltip',
          ['Tooltip conjure frenzy warning OFF', 'Tooltip conjure frenzy warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards with Frenzy active',
          !0,
        ),
        ToolWarnEdifice: new Gn(
          'bool',
          'Tooltip',
          ['Tooltip edifice warning OFF', 'Tooltip edifice warning ON'],
          'A warning when buying if it will put the bank under the amount needed for "Spontaneous Edifice" to possibly give you your most expensive building',
          !0,
        ),
        ToolWarnUser: new kn(
          'numscale',
          'Tooltip',
          'Tooltip warning at x times CPS: ',
          'Use this to show a customized warning if buying it will put the bank under the amount equal to value times cps; setting to 0 disables the function altogether',
          0,
          1 / 0,
        ),
        ToolWarnBon: new Gn(
          'bool',
          'Tooltip',
          [
            'Calculate tooltip warning with bonus CPS OFF',
            'Calculate tooltip warning with bonus CPS ON',
          ],
          'Calculate the warning with or without the bonus CPS you get from buying',
          !0,
        ),
        ToolWarnPos: new Gn(
          'bool',
          'Tooltip',
          ['Tooltip warning position (left)', 'Tooltip warning position (bottom)'],
          'Placement of the warning boxes',
          !1,
          () => {
            Io();
          },
        ),
        TooltipGrim: new Gn(
          'bool',
          'Tooltip',
          ['Grimoire tooltip information OFF', 'Grimoire tooltip information ON'],
          'Extra information in tooltip for grimoire',
          !0,
        ),
        TooltipWrink: new Gn(
          'bool',
          'Tooltip',
          ['Wrinkler tooltip OFF', 'Wrinkler tooltip ON'],
          'Shows the amount of cookies a wrinkler will give when popping it',
          !0,
        ),
        TooltipLump: new Gn(
          'bool',
          'Tooltip',
          ['Sugar lump tooltip OFF', 'Sugar lump tooltip ON'],
          'Shows the current Sugar Lump type in Sugar lump tooltip.',
          !0,
        ),
        TooltipPlots: new Gn(
          'bool',
          'Tooltip',
          ['Garden plots tooltip OFF', 'Garden plots tooltip ON'],
          'Shows a tooltip for plants that have a cookie reward.',
          !0,
        ),
        TooltipPantheon: new Gn(
          'bool',
          'Tooltip',
          ['Pantheon tooltip OFF', 'Pantheon tooltip ON'],
          'Shows additional info in the pantheon tooltip',
          !0,
        ),
        TooltipAscendButton: new Gn(
          'bool',
          'Tooltip',
          ['Show Extra Info Ascend Tooltip OFF', 'Show Extra Info Ascend Tooltip ON'],
          'Shows additional info in the ascend tooltip',
          !0,
        ),
        Stats: new Gn(
          'bool',
          'Statistics',
          ['Statistics OFF', 'Statistics ON'],
          'Extra Cookie Monster statistics!',
          !0,
        ),
        MissingUpgrades: new Gn(
          'bool',
          'Statistics',
          ['Missing upgrades OFF', 'Missing upgrades ON'],
          'Shows missing upgrades in statistics menu',
          !0,
        ),
        MissingAchievements: new Gn(
          'bool',
          'Statistics',
          ['Missing Achievements OFF', 'Missing Normal Achievements ON'],
          'Shows missing normal achievements in statistics menu.',
          !0,
        ),
        UpStats: new Gn(
          'bool',
          'Statistics',
          ['Statistics update rate (default)', 'Statistics update rate (1s)'],
          'Default rate is once every 5 seconds',
          !1,
        ),
        HeavenlyChipsTarget: new kn(
          'numscale',
          'Statistics',
          'Heavenly chips target: ',
          'Use this to set a heavenly chips target that will be counted towards in the "prestige" statsistics sections',
          1,
          1 / 0,
        ),
        ShowMissedGC: new Gn(
          'bool',
          'Statistics',
          ['Missed GC OFF', 'Missed GC ON'],
          'Show a stat in the statistics screen that counts how many golden cookies you have missed',
          !0,
        ),
        Title: new Gn(
          'bool',
          'NotificationGeneral',
          ['Title OFF', 'Title ON', 'Title pinned tab highlight'],
          'Update title with colden cookie/season popup timers; pinned tab highlight only changes the title when a golden cookie/season popup spawns; "!" means that golden cookie/reindeer can spawn',
          !0,
        ),
        GeneralSound: new Gn(
          'bool',
          'NotificationGeneral',
          ['Consider game volume setting OFF', 'Consider game volume setting ON'],
          'Turning this toggle to "off" makes Cookie Monster no longer consider the volume setting of the base game, allowing mod notifications to play with base game volume turned down',
          !0,
        ),
        GCNotification: new Gn(
          'bool',
          'NotificationGC',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when golden cookie spawns',
          !0,
          () => {
            hn(e.GCNotification);
          },
        ),
        GCFlash: new Gn(
          'bool',
          'NotificationGC',
          ['Flash OFF', 'Flash ON'],
          'Flash screen on golden cookie',
          !0,
        ),
        ColourGCFlash: new bn(
          'colour',
          'NotificationGC',
          'The colour of the GC flash, standard colour is white',
        ),
        GCSound: new Gn(
          'bool',
          'NotificationGC',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on golden cookie',
          !0,
        ),
        GCVolume: new vn('vol', 'NotificationGC', [], 'Volume'),
        GCSoundURL: new Gn(
          'url',
          'NotificationGC',
          'Sound URL:',
          'URL of the sound to be played when a golden cookie spawns',
        ),
        FortuneNotification: new Gn(
          'bool',
          'NotificationFC',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when fortune cookie is on the ticker',
          !0,
          () => {
            hn(e.FortuneNotification);
          },
        ),
        FortuneFlash: new Gn(
          'bool',
          'NotificationFC',
          ['Flash OFF', 'Flash ON'],
          'Flash screen on fortune cookie spawn',
          !0,
        ),
        ColourFortuneFlash: new bn(
          'colour',
          'NotificationFC',
          'The colour of the fortune flash, standard colour is white',
        ),
        FortuneSound: new Gn(
          'bool',
          'NotificationFC',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on fortune cookie spawn',
          !0,
        ),
        FortuneVolume: new vn('vol', 'NotificationFC', [], 'Volume'),
        FortuneSoundURL: new Gn(
          'url',
          'NotificationFC',
          'Sound URL:',
          'URL of the sound to be played when the ticker has a fortune cookie',
        ),
        SeaNotification: new Gn(
          'bool',
          'NotificationSea',
          ['Notification OFF', 'Notification ON'],
          'Create a notification on season popup',
          !0,
          () => {
            hn(e.SeaNotification);
          },
        ),
        SeaFlash: new Gn(
          'bool',
          'NotificationSea',
          ['Flash OFF', 'Flash ON'],
          'Flash screen on season popup',
          !0,
        ),
        ColourSeaFlash: new bn(
          'colour',
          'NotificationSea',
          'The colour of the season popup flash, standard colour is white',
        ),
        SeaSound: new Gn(
          'bool',
          'NotificationSea',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on season popup',
          !0,
        ),
        SeaVolume: new vn('vol', 'NotificationSea', [], 'Volume'),
        SeaSoundURL: new Gn(
          'url',
          'NotificationSea',
          'Sound URL:',
          'URL of the sound to be played when on season popup spawns',
        ),
        GardFlash: new Gn(
          'bool',
          'NotificationGard',
          ['Garden Tick Flash OFF', 'Flash ON'],
          'Flash screen on garden tick',
          !0,
        ),
        ColourGardFlash: new bn(
          'colour',
          'NotificationGard',
          'The colour of the garden flash, standard colour is white',
        ),
        GardSound: new Gn(
          'bool',
          'NotificationGard',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on garden tick',
          !0,
        ),
        GardVolume: new vn('vol', 'NotificationGard', [], 'Volume'),
        GardSoundURL: new Gn(
          'url',
          'NotificationGard',
          'Garden Tick Sound URL:',
          'URL of the sound to be played when the garden ticks',
        ),
        MagicNotification: new Gn(
          'bool',
          'NotificationMagi',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when magic reaches maximum',
          !0,
          () => {
            hn(e.MagicNotification);
          },
        ),
        MagicFlash: new Gn(
          'bool',
          'NotificationMagi',
          ['Flash OFF', 'Flash ON'],
          'Flash screen when magic reaches maximum',
          !0,
        ),
        ColourMagicFlash: new bn(
          'colour',
          'NotificationMagi',
          'The colour of the magic flash, standard colour is white',
        ),
        MagicSound: new Gn(
          'bool',
          'NotificationMagi',
          ['Sound OFF', 'Sound ON'],
          'Play a sound when magic reaches maximum',
          !0,
        ),
        MagicVolume: new vn('vol', 'NotificationMagi', [], 'Volume'),
        MagicSoundURL: new Gn(
          'url',
          'NotificationMagi',
          'Sound URL:',
          'URL of the sound to be played when magic reaches maxium',
        ),
        WrinklerNotification: new Gn(
          'bool',
          'NotificationWrink',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when a wrinkler appears',
          !0,
          () => {
            hn(e.WrinklerNotification);
          },
        ),
        WrinklerFlash: new Gn(
          'bool',
          'NotificationWrink',
          ['Flash OFF', 'Flash ON'],
          'Flash screen when a wrinkler appears',
          !0,
        ),
        ColourWrinklerFlash: new bn(
          'colour',
          'NotificationWrink',
          'The colour of the wrinkler flash, standard colour is white',
        ),
        WrinklerSound: new Gn(
          'bool',
          'NotificationWrink',
          ['Sound OFF', 'Sound ON'],
          'Play a sound when a wrinkler appears',
          !0,
        ),
        WrinklerVolume: new vn('vol', 'NotificationWrink', [], 'Volume'),
        WrinklerSoundURL: new Gn(
          'url',
          'NotificationWrink',
          'Sound URL:',
          'URL of the sound to be played when a wrinkler appears',
        ),
        WrinklerMaxNotification: new Gn(
          'bool',
          'NotificationWrinkMax',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when the maximum amount of wrinklers has appeared',
          !0,
          () => {
            hn(e.WrinklerMaxNotification);
          },
        ),
        WrinklerMaxFlash: new Gn(
          'bool',
          'NotificationWrinkMax',
          ['Flash OFF', 'Flash ON'],
          'Flash screen when the maximum amount of Wrinklers has appeared',
          !0,
        ),
        ColourWrinklerMaxFlash: new bn(
          'colour',
          'NotificationWrinkMax',
          'The colour of the maximum wrinkler flash, standard colour is white',
        ),
        WrinklerMaxSound: new Gn(
          'bool',
          'NotificationWrinkMax',
          ['Sound OFF', 'Sound ON'],
          'Play a sound when the maximum amount of wrinklers has appeared',
          !0,
        ),
        WrinklerMaxVolume: new vn('vol', 'NotificationWrinkMax', [], 'Volume'),
        WrinklerMaxSoundURL: new Gn(
          'url',
          'NotificationWrinkMax',
          'Sound URL:',
          'URL of the sound to be played when the maximum amount of wrinklers has appeared',
        ),
        BulkBuyBlock: new Gn(
          'bool',
          'Miscellaneous',
          ['Block bulk buying OFF', 'Block bulk buying ON'],
          "Block clicking bulk buying when you can't buy all. This prevents buying 7 of a building when you are in buy-10 or buy-100 mode.",
          !0,
        ),
        FavouriteSettings: new Gn(
          'bool',
          'Miscellaneous',
          [
            'Favourite settings section OFF',
            'Favourite settings section ON',
            'Favourite settings section ON (Locked)',
          ],
          "Show stars before each setting which allows selecting it for a 'favourites' section at the top of the Cookie Monster settings. Setting this to Locked removes the stars but shows the 'favourites' section",
          !0,
          () => {
            Game.UpdateMenu();
          },
        ),
      };
      function xn() {
        return JSON.stringify({ favouriteSettings: lo, settings: e, version: '2.031.7' });
      }
      function Tn() {
        if (ge !== Game.dragonLevel || se) {
          if (
            Game.dragonLevel < 25 &&
            Game.dragonLevels[Game.dragonLevel].buy.toString().includes('sacrifice')
          ) {
            let e = Game.dragonLevels[Game.dragonLevel].buy.toString().match(/Objects\[(.*)\]/)[1];
            const t = Game.dragonLevels[Game.dragonLevel].buy
              .toString()
              .match(/sacrifice\((.*?)\)/)[1];
            if ('i' !== e)
              if (((e = e.replaceAll("'", '')), Game.Objects[e].amount < t))
                fe = 'Not enough buildings to sell';
              else {
                let o = 0;
                So();
                for (let n = 0; n < t; n++) {
                  let t =
                    Ct[e].basePrice *
                    Game.priceIncrease ** Math.max(0, Ct[e].amount - 1 - Ct[e].free);
                  (t = Game.modifyBuildingPrice(Ct[e], t)),
                    (t = Math.ceil(t)),
                    (o += t),
                    (Ct[e].amount -= 1);
                }
                fe = `Cost to rebuy: ${P(o)}`;
              }
            else {
              let o = 0;
              So(),
                Object.keys(Game.Objects).forEach((n) => {
                  if (((e = n), Game.Objects[e].amount < t)) fe = 'Not enough buildings to sell';
                  else {
                    for (let n = 0; n < t; n++) {
                      let t =
                        Ct[e].basePrice *
                        Game.priceIncrease ** Math.max(0, Ct[e].amount - 1 - Ct[e].free);
                      (t = Game.modifyBuildingPrice(Ct[e], t)),
                        (t = Math.ceil(t)),
                        (o += t),
                        (Ct[e].amount -= 1);
                    }
                    fe = `Cost to rebuy: ${P(o)}`;
                  }
                });
            }
          }
          ge = Game.dragonLevel;
        }
      }
      function Mn(e, t) {
        if (!Game.Objects.Temple.minigameLoaded) return 0;
        So();
        const { minigame: o } = Game.Objects.Temple,
          n = o.godsById[e].slot;
        '0' === n ? (ae = o.slot[t]) : '1' === n ? (re = o.slot[t]) : '2' === n && (le = o.slot[t]),
          0 === t ? (ae = e) : 1 === t ? (re = e) : 2 === t && (le = e);
        const i = ee;
        return Fo(), Uo(), i !== ee && Fo(), de - Game.cookiesPs;
      }
      function Sn() {
        (Ct = []),
          Object.keys(Game.Objects).forEach((e) => {
            Ct[e] = To(e);
          }),
          (yt = []),
          Object.keys(Game.Upgrades).forEach((e) => {
            yt[e] = Mo(e);
          }),
          (bt = []),
          Object.keys(Game.Achievements).forEach((e) => {
            bt[e] = wo(e);
          }),
          So();
      }
      let Bn = !1;
      function Pn(t, o, n) {
        ((1 === e[o] || n) && 3 === t && !1 === Bn) || 1 === t
          ? ((l('CMFlashScreen').style.backgroundColor = e[`Colour${o}`]),
            (l('CMFlashScreen').style.opacity = '0.5'),
            3 === t
              ? ((l('CMFlashScreen').style.display = 'inline'),
                setTimeout(() => {
                  Pn(2, o, !0);
                }, 1e3 / Game.fps))
              : setTimeout(() => {
                  Pn(0, o, !0);
                }, 1e3 / Game.fps))
          : 2 === t
          ? ((l('CMFlashScreen').style.opacity = '1'),
            setTimeout(() => {
              Pn(1, o, !0);
            }, 1e3 / Game.fps))
          : 0 === t && (l('CMFlashScreen').style.display = 'none');
      }
      function En(t, o, n, i) {
        if ((1 === e[o] || i) && !1 === Bn) {
          const o = new Audio(t);
          e.GeneralSound
            ? (o.volume = (e[n] / 100) * (Game.volume / 100))
            : (o.volume = e[n] / 100),
            o.play();
        }
      }
      function Nn(t, o, n) {
        1 === e[t] &&
          'hidden' === document.visibilityState &&
          !1 === Bn &&
          new Notification(o, {
            body: n,
            badge: 'https://orteil.dashnet.org/cookieclicker/favicon.ico',
          });
      }
      function On() {
        if (
          (no !== Game.OnAscend &&
            ((no = Game.OnAscend),
            Game.OnAscend
              ? ((l('game').style.bottom = '0px'),
                1 === e.BotBar && (l('CMBotBar').style.display = 'none'),
                1 === e.TimerBar && (l('CMTimerBar').style.display = 'none'))
              : (gn(), Go()),
            bo()),
          !Game.OnAscend && 0 === Game.AscendTimer)
        ) {
          r !== Object.keys(Game.mods).length && (Sn(), un(), (r = Object.keys(Game.mods).length)),
            se &&
              (dn(),
              tn(),
              Game.Has('Golden switch [off]')
                ? (So(), (yt['Golden switch [off]'].bought = 0), Fo(), (Se = de))
                : (Se = Game.cookiesPs),
              cn(),
              sn(),
              rn(),
              nn(),
              Tn(),
              (function () {
                for (let e = 0; e < 11; e += 1) for (let t = 0; t < 3; t += 1) ft[e][t] = Mn(e, t);
              })(),
              ln(),
              (function () {
                let e = 0;
                if (Game.Objects.Bank.minigameLoaded) {
                  const t = Game.Objects.Bank.minigame.goods;
                  let o = 0;
                  Object.keys(t).forEach((e) => {
                    const n = t[e];
                    o += n.stock * n.val;
                  }),
                    (e += o * Game.cookiesPsRawHighest);
                }
                (e += (function () {
                  let e = 0;
                  So();
                  let t = 2;
                  (5 !== ne && 18 !== ne) || (t -= 1),
                    (5 !== ie && 18 !== ie) || (t -= 1),
                    (ne = 5),
                    (ie = 18);
                  for (let e = 0; e < t; ++e) {
                    let e = 'Cursor';
                    Object.keys(Ct).forEach((t) => {
                      Ct[t].amount > 0 && (e = t);
                    }),
                      (Ct[e].amount -= 1),
                      (K -= 1);
                  }
                  return (
                    Object.keys(Ct).forEach((t) => {
                      const o = Ct[t];
                      e += Mt(
                        Game.Objects[o.name],
                        Game.Objects[t].basePrice,
                        o.amount,
                        Game.Objects[t].free,
                        o.amount,
                      );
                    }),
                    e
                  );
                })()),
                  (gt = e);
              })(),
              (se = 0));
          const t = Game.auraMult('Fierce Hoarder') > 0;
          !Y && t ? ((Y = !0), (q = 1)) : Y && !t && ((Y = !1), (q = 1)),
            q && (en(), (q = 0)),
            (function () {
              pn(),
                Ko(),
                (function () {
                  Re = 0;
                  let e = 0;
                  Object.keys(Game.wrinklers).forEach((t) => {
                    2 === Game.wrinklers[t].phase && (e += 1);
                  });
                  let t = 1;
                  if (Ct.Temple.minigameLoaded) {
                    const e = Game.hasGod('scorn');
                    1 === e ? (t *= 1.15) : 2 === e ? (t *= 1.1) : 3 === e && (t *= 1.05);
                  }
                  (Ie = e),
                    (Re =
                      e *
                      (0.05 * e * 1.1) *
                      (0.05 * Game.Has('Sacrilegious corruption') + 1) *
                      (0.05 * Game.Has('Wrinklerspawn') + 1) *
                      t);
                })(),
                Xo(),
                an();
              const e =
                Game.HowManyCookiesReset(
                  Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) + 1,
                ) -
                (Game.cookiesEarned + Game.cookiesReset);
              pt = uo(e / ho());
            })(),
            f !== (Game.TickerEffect && 'fortune' === Game.TickerEffect.type) &&
              ((f = Game.TickerEffect && 'fortune' === Game.TickerEffect.type),
              f &&
                (Pn(3, 'FortuneFlash', !1),
                En(e.FortuneSoundURL, 'FortuneSound', 'FortuneVolume', !1),
                Nn(
                  'FortuneNotification',
                  'Fortune Cookie found',
                  'A Fortune Cookie has appeared on the Ticker.',
                ))),
            g !== Game.shimmerTypes.reindeer.spawned &&
              ((g = Game.shimmerTypes.reindeer.spawned),
              Object.keys(Game.shimmers).forEach((e) => {
                Game.shimmers[e].spawnLead &&
                  'reindeer' === Game.shimmers[e].type &&
                  (dt = Game.shimmers[e]);
              }),
              Pn(3, 'SeaFlash', !1),
              En(e.SeaSoundURL, 'SeaSound', 'SeaVolume', !1),
              Nn('SeaNotification', 'Reindeer sighted!', 'A Reindeer has spawned. Click it now!')),
            Game.Objects.Farm.minigameLoaded &&
              C !== Game.Objects.Farm.minigame.nextStep &&
              (0 !== C &&
                C < Date.now() &&
                (Pn(3, 'GardFlash', !1), En(e.GardSoundURL, 'GardSound', 'GardVolume', !1)),
              (C = Game.Objects.Farm.minigame.nextStep)),
            (function () {
              if (Game.Objects['Wizard tower'].minigameLoaded && 1 === e.GrimoireBar) {
                const { minigame: t } = Game.Objects['Wizard tower'];
                t.magic < t.magicM
                  ? (k = !1)
                  : k ||
                    ((k = !0),
                    Pn(3, 'MagicFlash', !1),
                    En(e.MagicSoundURL, 'MagicSound', 'MagicVolume', !1),
                    Nn(
                      'MagicNotification',
                      'Magic Meter full',
                      'Your Magic Meter is full. Cast a spell!',
                    ));
              }
            })(),
            (function () {
              if (Game.elderWrath > 0) {
                let t = 0;
                Object.keys(Game.wrinklers).forEach((e) => {
                  2 === Game.wrinklers[e].phase && (t += 1);
                }),
                  t > v
                    ? ((v = t),
                      t === Game.getWrinklersMax() && e.WrinklerMaxFlash
                        ? Pn(3, 'WrinklerMaxFlash', !1)
                        : Pn(3, 'WrinklerFlash', !1),
                      t === Game.getWrinklersMax() && e.WrinklerMaxSound
                        ? En(e.WrinklerMaxSoundURL, 'WrinklerMaxSound', 'WrinklerMaxVolume', !1)
                        : En(e.WrinklerSoundURL, 'WrinklerSound', 'WrinklerVolume', !1),
                      t === Game.getWrinklersMax() && e.WrinklerMaxNotification
                        ? Nn(
                            'WrinklerMaxNotification',
                            'Maximum Wrinklers Reached',
                            'You have reached your maximum ammount of wrinklers',
                          )
                        : Nn(
                            'WrinklerNotification',
                            'A Wrinkler appeared',
                            'A new wrinkler has appeared',
                          ))
                    : (v = t);
              }
            })();
        }
        (G = 0),
          (ht = {}),
          Object.keys(Game.shimmers).forEach((e) => {
            (ht[Game.shimmers[e].id] = Game.shimmers[e]),
              Game.shimmers[e].spawnLead &&
                'golden' === Game.shimmers[e].type &&
                ((ct = Game.shimmers[e]), (G += 1));
          }),
          Object.keys(ao).forEach((e) => {
            void 0 === ht[e] && (ao[e].parentNode.removeChild(ao[e]), delete ao[e]);
          }),
          y !== Game.shimmerTypes.golden.n
            ? ((y = Game.shimmerTypes.golden.n),
              y &&
                (b < G &&
                  (Pn(3, 'GCFlash', !1),
                  En(e.GCSoundURL, 'GCSound', 'GCVolume', !1),
                  Nn(
                    'GCNotification',
                    'Golden Cookie Spawned',
                    'A Golden Cookie has spawned. Click it now!',
                  )),
                Object.keys(Game.shimmers).forEach((t) => {
                  void 0 === ao[Game.shimmers[t].id] &&
                    (function (t) {
                      const o = document.createElement('div');
                      (o.id = `GCTimer${t.id}`),
                        (o.style.width = '96px'),
                        (o.style.height = '96px'),
                        (o.style.position = 'absolute'),
                        (o.style.zIndex = '10000000001'),
                        (o.style.textAlign = 'center'),
                        (o.style.lineHeight = '96px'),
                        (o.style.fontFamily = '"Kavoon", Georgia, serif'),
                        (o.style.fontSize = '35px'),
                        (o.style.cursor = 'pointer'),
                        (o.style.display = 'block'),
                        0 === e.GCTimer && (o.style.display = 'none'),
                        (o.style.left = t.l.style.left),
                        (o.style.top = t.l.style.top),
                        (o.onclick = function () {
                          t.pop();
                        }),
                        (o.onmouseover = function () {
                          (t.l.style.filter =
                            'brightness(125%) drop-shadow(0px 0px 3px rgba(255,255,255,1))'),
                            (t.l.style.webkitFilter =
                              'brightness(125%) drop-shadow(0px 0px 3px rgba(255,255,255,1))');
                        }),
                        (o.onmouseout = function () {
                          (t.l.style.filter = ''), (t.l.style.webkitFilter = '');
                        }),
                        (ao[t.id] = o),
                        l('shimmers').appendChild(o);
                    })(Game.shimmers[t]);
                })),
              Cn(),
              (b = G),
              0 === G && (ct = 0))
            : 1 === e.GCTimer &&
              y &&
              Object.keys(ao).forEach((e) => {
                (ao[e].style.opacity = ht[e].l.style.opacity),
                  (ao[e].style.transform = ht[e].l.style.transform),
                  (ao[e].textContent = Math.ceil(ht[e].life / Game.fps));
              });
      }
      function Fn() {
        let t = '';
        for (let o = 0; o < Dt.length; o++)
          t += `.CMText${Dt[o]} { color: ${e[`Colour${Dt[o]}`]}; }\n`;
        for (let o = 0; o < Dt.length; o++)
          t += `.CMBack${Dt[o]} { background-color: ${e[`Colour${Dt[o]}`]}; }\n`;
        for (let o = 0; o < Dt.length; o++)
          t += `.CMBorder${Dt[o]} { border: 1px solid ${e[`Colour${Dt[o]}`]}; }\n`;
        (l('CMCSS').textContent = t), so();
      }
      function Ln() {
        const e = b64_to_utf8(
            unescape(localStorage.getItem('CookieClickerGame')).split('!END!')[0],
          ),
          t = e.match(/CookieMonster.*(;|$)/);
        if (null !== t) {
          const o = e.replace(t[0], `CookieMonster:${xn()}`);
          localStorage.setItem('CookieClickerGame', escape(`${utf8_to_b64(o)}!END!`));
        }
      }
      function Wn(t) {
        if ((void 0 !== localStorage.CMConfig && delete localStorage.CMConfig, void 0 !== t)) {
          (e = t), void 0 !== e.Colors && delete e.Colors, void 0 !== e.Colours && delete e.Colours;
          let o = !1;
          Object.keys(mn).forEach((t) => {
            void 0 === e[t]
              ? ((o = !0), (e[t] = mn[t]))
              : 'Header' === t &&
                Object.keys(mn.Header).forEach((n) => {
                  (void 0 !== e[t][n] && e[t][n] > -1 && e[t][n] < 2) ||
                    ((o = !0), (e[t][n] = mn[t][n]));
                });
          }),
            o && Ln(),
            On(),
            Object.keys(mn).forEach((e) => {
              'Header' !== e && void 0 !== wn[e].func && wn[e].func();
            });
        } else Wn(mn);
        Game.UpdateMenu(), Fn();
      }
      function An() {
        Object.keys(Game.wrinklers).forEach((e) => {
          Game.wrinklers[e].sucked > 0 &&
            0 === Game.wrinklers[e].type &&
            (Game.wrinklers[e].hp = 0);
        });
      }
      function jn(t, o) {
        if ('b' === t) {
          if (((l('tooltip').innerHTML = Game.Objects[o].tooltip()), 1 === e.TooltipAmor)) {
            const e = Jo(
                Game.Objects[o],
                Game.Objects[o].basePrice,
                0,
                Game.Objects[o].free,
                Game.Objects[o].amount,
              ),
              t = e - Game.Objects[o].totalCookies;
            t > 0 &&
              (l('tooltip').innerHTML = l('tooltip')
                .innerHTML.split('so far</div>')
                .join(
                  `so far<br/>&bull; <b>${P(t)}</b> ${
                    1 === Math.floor(t) ? 'cookie' : 'cookies'
                  } left to amortize (${
                    mo(
                      (e - Game.Objects[o].totalCookies) /
                        (Game.Objects[o].storedTotalCps * Game.globalCpsMult),
                    ).text
                  })</div>`,
                ));
          }
          -1 === Game.buyMode &&
            (l('tooltip').innerHTML = l('tooltip')
              .innerHTML.split(P(Game.Objects[o].bulkPrice))
              .join(
                P(
                  (Game.Objects[o],
                  Game.Objects[o].basePrice,
                  Game.Objects[o].amount,
                  Game.Objects[o].free,
                  Game.buyBulk,
                  1),
                ),
              ));
        } else if ('u' === t) {
          if (!Game.UpgradesInStore[o]) return '';
          l('tooltip').innerHTML = Game.crateTooltip(Game.UpgradesInStore[o], 'store');
        } else
          's' === t
            ? (l('tooltip').innerHTML = Game.lumpTooltip())
            : 'g' === t
            ? (l('tooltip').innerHTML = Game.Objects['Wizard tower'].minigame.spellTooltip(o)())
            : 'p' === t
            ? (l('tooltip').innerHTML = Game.ObjectsById[2].minigame.tileTooltip(o[0], o[1])())
            : 'ha' === t
            ? (l('tooltip').innerHTML = Game.ObjectsById[2].minigame.toolTooltip(1)())
            : 'wb' === t
            ? (l('tooltip').innerHTML = '')
            : 'pag' === t
            ? (l('tooltip').innerHTML = Game.Objects.Temple.minigame.godTooltip(o)())
            : 'pas' === t &&
              (l('tooltip').innerHTML = Game.Objects.Temple.minigame.slotTooltip(o[0])());
        if (
          ('b' === t && 1 === Game.buyMode) ||
          'u' === t ||
          's' === t ||
          'g' === t ||
          ('p' === t && !Game.keys[16]) ||
          'ha' === t ||
          'wb' === t ||
          'pag' === t ||
          ('pas' === t && -1 !== o[1])
        ) {
          const e = document.createElement('div');
          (e.id = 'CMTooltipArea'), l('tooltip').appendChild(e);
        }
        return (eo = t), (to = o), zo(), l('tooltip').innerHTML;
      }
      function Dn() {
        Game.Objects['Wizard tower'].minigameLoaded &&
          Object.keys(Game.Objects['Wizard tower'].minigame.spellsById).forEach((e) => {
            null !== l(`grimoireSpell${e}`).onmouseover &&
              ((x[e] = l(`grimoireSpell${e}`).onmouseover),
              (l(`grimoireSpell${e}`).onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => jn('g', `${e}`), 'this'),
                  Game.tooltip.wobble();
              }));
          });
      }
      function Hn() {
        if (!m && Game.Objects['Wizard tower'].minigameLoaded) {
          const { minigame: t } = Game.Objects['Wizard tower'];
          (p = t.draw),
            (Game.Objects['Wizard tower'].minigame.draw = function () {
              p(),
                1 === e.GrimoireBar &&
                  t.magic < t.magicM &&
                  (t.magicBarTextL.innerHTML += ` (${uo(Ro(t.magic, t.magicM, t.magicM))})`);
            }),
            (m = !0);
        }
      }
      function Un() {
        !(function () {
          if (!u && Game.Objects['Wizard tower'].minigameLoaded) {
            const { minigame: e } = Game.Objects['Wizard tower'];
            (c = e.launch),
              (d = new Function(
                `return ${e.launch
                  .toString()
                  .split('=this')
                  .join("= Game.Objects['Wizard tower'].minigame")}`,
              )),
              (Game.Objects['Wizard tower'].minigame.launch = function () {
                d(), Dn(), (m = !1), Hn(), (u = !0);
              });
          }
        })(),
          Hn();
      }
      var $n = o(877),
        Rn = o.n($n);
      const In = 'CMConfig';
      function zn(t) {
        null !== l(`slider${t}`) &&
          ((l(`slider${t}right`).innerHTML = `${l(`slider${t}`).value}%`),
          (e[t] = Math.round(l(`slider${t}`).value))),
          Ln();
      }
      function Vn(t) {
        (e.Header[t] += 1), e.Header[t] > 1 && (e.Header[t] = 0), Ln();
      }
      function _n(t, o) {
        const n = document.createElement('div');
        (n.className = 'title'),
          (n.style.padding = '0px 16px'),
          (n.style.opacity = '0.7'),
          (n.style.fontSize = '17px'),
          (n.style.fontFamily = '"Kavoon", Georgia, serif'),
          n.appendChild(document.createTextNode(`${t} `));
        const i = document.createElement('span');
        return (
          (i.style.cursor = 'pointer'),
          (i.style.display = 'inline-block'),
          (i.style.height = '14px'),
          (i.style.width = '14px'),
          (i.style.borderRadius = '7px'),
          (i.style.textAlign = 'center'),
          (i.style.backgroundColor = '#C0C0C0'),
          (i.style.color = 'black'),
          (i.style.fontSize = '13px'),
          (i.style.verticalAlign = 'middle'),
          (i.textContent = e.Header[o] ? '-' : '+'),
          (i.onclick = function () {
            Vn(o), Game.UpdateMenu();
          }),
          n.appendChild(i),
          n
        );
      }
      function Qn(e, t, o, n) {
        const i = document.createElement('div');
        i.className = 'listing';
        const a = document.createElement('b');
        if (((a.textContent = t), i.appendChild(a), 'withTooltip' === e)) {
          (i.className = 'listing'), i.appendChild(document.createTextNode(' '));
          const e = document.createElement('span');
          (e.onmouseout = function () {
            Game.tooltip.hide();
          }),
            (e.onmouseover = function () {
              Game.tooltip.draw(this, escape(Ut[n].innerHTML));
            }),
            (e.style.cursor = 'default'),
            (e.style.display = 'inline-block'),
            (e.style.height = '10px'),
            (e.style.width = '10px'),
            (e.style.borderRadius = '5px'),
            (e.style.textAlign = 'center'),
            (e.style.backgroundColor = '#C0C0C0'),
            (e.style.color = 'black'),
            (e.style.fontSize = '9px'),
            (e.style.verticalAlign = 'bottom'),
            (e.textContent = '?'),
            i.appendChild(e);
        }
        return i.appendChild(document.createTextNode(': ')), i.appendChild(o), i;
      }
      function Xn(e) {
        const t = document.createDocumentFragment();
        t.appendChild(document.createTextNode(`${e.length} `));
        const o = document.createElement('span');
        o.onmouseout = function () {
          Game.tooltip.hide();
        };
        const n = document.createElement('div'),
          i = document.createElement('div');
        (i.style.minWidth = '140px'), (i.style.marginBottom = '4px');
        const a = document.createElement('div');
        return (
          (a.className = 'name'),
          (a.style.marginBottom = '4px'),
          (a.style.textAlign = 'center'),
          (a.textContent = 'Missing'),
          i.appendChild(a),
          Object.keys(e).forEach((t) => {
            const o = document.createElement('div');
            (o.style.textAlign = 'center'),
              o.appendChild(document.createTextNode(e[t])),
              i.appendChild(o);
          }),
          n.appendChild(i),
          (o.onmouseover = function () {
            Game.tooltip.draw(this, escape(n.innerHTML));
          }),
          (o.style.cursor = 'default'),
          (o.style.display = 'inline-block'),
          (o.style.height = '10px'),
          (o.style.width = '10px'),
          (o.style.borderRadius = '5px'),
          (o.style.textAlign = 'center'),
          (o.style.backgroundColor = '#C0C0C0'),
          (o.style.color = 'black'),
          (o.style.fontSize = '9px'),
          (o.style.verticalAlign = 'bottom'),
          (o.textContent = '?'),
          t.appendChild(o),
          t
        );
      }
      function qn(t) {
        const o = document.createElement('div');
        if (
          ((o.className = 'subsection'),
          o.appendChild(t),
          o.appendChild(_n('Lucky Cookies', 'Lucky')),
          e.Header.Lucky &&
            o.appendChild(
              (function () {
                const e = Game.auraMult("Dragon's Fortune")
                    ? 'GoldCookDragonsFortuneTooltipPlaceholder'
                    : 'GoldCookTooltipPlaceholder',
                  t = document.createElement('div');
                t.className = 'CMStatsLuckySection';
                const o = Game.cookies + go() < Ce ? Ft : Et,
                  n = Game.cookies + go() < Ce ? uo((Ce - (Game.cookies + go())) / ho()) : '',
                  i = document.createDocumentFragment(),
                  a = document.createElement('span');
                if (
                  ((a.style.fontWeight = 'bold'),
                  (a.className = St + o),
                  (a.textContent = P(Ce)),
                  i.appendChild(a),
                  '' !== n)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${n})`), i.appendChild(e);
                }
                t.appendChild(Qn('withTooltip', '"Lucky!" cookies required', i, e));
                const r = Game.cookies + go() < ke ? Ft : Et,
                  l = Game.cookies + go() < ke ? uo((ke - (Game.cookies + go())) / ho()) : '',
                  s = document.createDocumentFragment(),
                  c = document.createElement('span');
                if (
                  ((c.style.fontWeight = 'bold'),
                  (c.className = St + r),
                  (c.textContent = P(ke)),
                  s.appendChild(c),
                  '' !== l)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${l})`), s.appendChild(e);
                }
                t.appendChild(Qn('withTooltip', '"Lucky!" cookies required (frenzy)', s, e));
                const d = ye !== be,
                  p = document.createElement('span');
                (p.style.fontWeight = 'bold'),
                  (p.className = St + ye),
                  (p.textContent = P(ye) + (d ? ` / ${P(be)}` : '')),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      '"Lucky!" reward (max)' + (d ? ' (golden / wrath)' : ''),
                      p,
                      e,
                    ),
                  );
                const u = document.createElement('span');
                (u.style.fontWeight = 'bold'),
                  (u.className = St + u),
                  (u.textContent = P(Ge) + (d ? ` / ${P(ve)}` : '')),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      '"Lucky!" reward (max) (frenzy)' + (d ? ' (golden / wrath)' : ''),
                      u,
                      e,
                    ),
                  );
                const m = Math.min(0.15 * (Game.cookies + go()), Se * Be * 60 * 15) + 13,
                  h = document.createElement('span');
                return (
                  (h.style.fontWeight = 'bold'),
                  (h.className = St + h),
                  (h.textContent = P(Pe * m) + (d ? ` / ${P(Ee * m)}` : '')),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      '"Lucky!" reward (cur)' + (d ? ' (golden / wrath)' : ''),
                      h,
                      e,
                    ),
                  ),
                  t
                );
              })(),
            ),
          o.appendChild(_n('Chain Cookies', 'Chain')),
          e.Header.Chain &&
            o.appendChild(
              (function () {
                const e = Game.auraMult("Dragon's Fortune")
                    ? 'GoldCookDragonsFortuneTooltipPlaceholder'
                    : 'GoldCookTooltipPlaceholder',
                  t = document.createElement('div');
                t.className = 'CMStatsChainSection';
                const o = Game.cookies + go() < qe ? Ft : Et,
                  n = Game.cookies + go() < qe ? uo((qe - (Game.cookies + go())) / ho()) : '',
                  i = document.createDocumentFragment(),
                  a = document.createElement('span');
                if (
                  ((a.style.fontWeight = 'bold'),
                  (a.className = St + o),
                  (a.textContent = P(qe)),
                  i.appendChild(a),
                  '' !== n)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${n})`), i.appendChild(e);
                }
                t.appendChild(Qn('withTooltip', '"Chain" cookies required', i, e));
                const r = Game.cookies + go() < Je ? Ft : Et,
                  l = Game.cookies + go() < Je ? uo((Je - (Game.cookies + go())) / ho()) : '',
                  s = document.createDocumentFragment(),
                  c = document.createElement('span');
                if (
                  ((c.style.fontWeight = 'bold'),
                  (c.className = St + r),
                  (c.textContent = P(Je)),
                  s.appendChild(c),
                  '' !== l)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${l})`), s.appendChild(e);
                }
                t.appendChild(Qn('withTooltip', '"Chain" cookies required (Wrath)', s, e));
                const d = Game.cookies + go() < tt ? Ft : Et,
                  p = Game.cookies + go() < tt ? uo((tt - (Game.cookies + go())) / ho()) : '',
                  u = document.createDocumentFragment(),
                  m = document.createElement('span');
                if (
                  ((m.style.fontWeight = 'bold'),
                  (m.className = St + d),
                  (m.textContent = P(tt)),
                  u.appendChild(m),
                  '' !== p)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${p})`), u.appendChild(e);
                }
                t.appendChild(Qn('withTooltip', '"Chain" cookies required (Frenzy)', u, e));
                const h = Game.cookies + go() < it ? Ft : Et,
                  g = Game.cookies + go() < it ? uo((it - (Game.cookies + go())) / ho()) : '',
                  f = document.createDocumentFragment(),
                  C = document.createElement('span');
                if (
                  ((C.style.fontWeight = 'bold'),
                  (C.className = St + h),
                  (C.textContent = P(it)),
                  f.appendChild(C),
                  '' !== g)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${g})`), f.appendChild(e);
                }
                t.appendChild(Qn('withTooltip', '"Chain" cookies required (frenzy) (Wrath)', f, e)),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      '"Chain" reward (max) (golden / wrath)',
                      document.createTextNode(`${P(Ke[0])} / ${P(et[0])}`),
                      e,
                    ),
                  ),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      '"Chain" reward (max) (frenzy) (golden / wrath)',
                      document.createTextNode(`${P(nt[0])} / ${P(nt[0])}`),
                      e,
                    ),
                  );
                const y = Math.min(60 * Game.cookiesPs * 60 * 6 * Be, 0.5 * Game.cookies),
                  b = on(7, y, Pe)[0],
                  k = on(6, y, Ee)[0];
                return (
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      '"Chain" reward (cur) (golden / wrath)',
                      document.createTextNode(`${P(b)} / ${P(k)}`),
                      e,
                    ),
                  ),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      'CPS needed for next level (g / w)',
                      document.createTextNode(`${P(Ye)} / ${P(Ze)}`),
                      'ChainNextLevelPlaceholder',
                    ),
                  ),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      'CPS needed for next level (frenzy) (g / w)',
                      document.createTextNode(`${P(ot)} / ${P(at)}`),
                      'ChainNextLevelPlaceholder',
                    ),
                  ),
                  t
                );
              })(),
            ),
          Game.Objects['Wizard tower'].minigameLoaded &&
            (o.appendChild(_n('Spells', 'Spells')),
            e.Header.Spells &&
              o.appendChild(
                (function () {
                  const e = document.createElement('div');
                  e.className = 'CMStatsSpellsSection';
                  const t = Game.cookies + go() < we ? Ft : Et,
                    o = Game.cookies + go() < we ? uo((we - (Game.cookies + go())) / ho()) : '',
                    n = document.createDocumentFragment(),
                    i = document.createElement('span');
                  if (
                    ((i.style.fontWeight = 'bold'),
                    (i.className = St + t),
                    (i.textContent = P(we)),
                    n.appendChild(i),
                    '' !== o)
                  ) {
                    const e = document.createElement('small');
                    (e.textContent = ` (${o})`), n.appendChild(e);
                  }
                  e.appendChild(
                    Qn(
                      'withTooltip',
                      '"Conjure Baked Goods" cookies required',
                      n,
                      'GoldCookTooltipPlaceholder',
                    ),
                  ),
                    e.appendChild(
                      Qn(
                        'withTooltip',
                        '"Conjure Baked Goods" reward (max)',
                        document.createTextNode(P(xe)),
                        'GoldCookTooltipPlaceholder',
                      ),
                    );
                  const a = Game.cookies + go() < 7 * we ? Ft : Et,
                    r = Math.min(0.15 * (Game.cookies + go()), 60 * Se * 30),
                    l =
                      Game.cookies + go() < 7 * we
                        ? uo((7 * we - (Game.cookies + go())) / ho())
                        : '',
                    s = document.createDocumentFragment(),
                    c = document.createElement('span');
                  if (
                    ((c.style.fontWeight = 'bold'),
                    (c.className = St + a),
                    (c.textContent = P(7 * we)),
                    s.appendChild(c),
                    '' !== l)
                  ) {
                    const e = document.createElement('small');
                    (e.textContent = ` (${l})`), s.appendChild(e);
                  }
                  return (
                    e.appendChild(
                      Qn(
                        'withTooltip',
                        '"Conjure Baked Goods" cookies required (frenzy)',
                        s,
                        'GoldCookTooltipPlaceholder',
                      ),
                    ),
                    e.appendChild(
                      Qn(
                        'withTooltip',
                        '"Conjure Baked Goods" reward (max) (frenzy)',
                        document.createTextNode(P(7 * xe)),
                        'GoldCookTooltipPlaceholder',
                      ),
                    ),
                    e.appendChild(
                      Qn(
                        'withTooltip',
                        '"Conjure Baked Goods" reward (cur)',
                        document.createTextNode(P(r)),
                        'GoldCookTooltipPlaceholder',
                      ),
                    ),
                    Te &&
                      e.appendChild(
                        Qn(
                          'withTooltip',
                          '"Spontaneous Edifice" cookies required (most expensive building)',
                          document.createTextNode(`${P(Te)} (${Me})`),
                          'GoldCookTooltipPlaceholder',
                        ),
                      ),
                    e
                  );
                })(),
              )),
          Game.Objects.Farm.minigameLoaded &&
            (o.appendChild(_n('Garden', 'Garden')),
            e.Header.Garden &&
              o.appendChild(
                (function () {
                  const e = document.createElement('div');
                  e.className = 'CMStatsGardenSection';
                  const t = Game.cookies < 60 * Game.cookiesPs * 10 * 100 ? Ft : Et,
                    o = document.createElement('span');
                  (o.style.fontWeight = 'bold'),
                    (o.className = St + t),
                    (o.textContent = P(60 * Game.cookiesPs * 10 * 100)),
                    e.appendChild(Qn('basic', 'Cookies required for max reward of Bakeberry: ', o));
                  const n = Game.cookies < 60 * Game.cookiesPs * 100 ? Ft : Et,
                    i = document.createElement('span');
                  (i.style.fontWeight = 'bold'),
                    (i.className = St + n),
                    (i.textContent = P(60 * Game.cookiesPs * 100)),
                    e.appendChild(Qn('basic', 'Cookies required for max reward of Chocoroot: ', i));
                  const a = Game.cookies < 60 * Game.cookiesPs * 60 * 25 ? Ft : Et,
                    r = document.createElement('span');
                  (r.style.fontWeight = 'bold'),
                    (r.className = St + a),
                    (r.textContent = P(60 * Game.cookiesPs * 60 * 25)),
                    e.appendChild(Qn('basic', 'Cookies required for max reward of Queenbeet: ', r));
                  const l = Game.cookies < 60 * Game.cookiesPs * 15 * 100 ? Ft : Et,
                    s = document.createElement('span');
                  (s.style.fontWeight = 'bold'),
                    (s.className = St + l),
                    (s.textContent = P(60 * Game.cookiesPs * 15 * 100)),
                    e.appendChild(Qn('basic', 'Cookies required for max reward of Duketater: ', s));
                  const c = [];
                  return (
                    Object.keys(Do).forEach((e) => {
                      Game.HasUnlocked(Do[e]) || c.push(Do[e]);
                    }),
                    0 !== c.length &&
                      e.appendChild(Qn('basic', 'Rare plant drops left to unlock', Xn(c))),
                    e
                  );
                })(),
              )),
          o.appendChild(_n('Prestige', 'Prestige')),
          e.Header.Prestige &&
            o.appendChild(
              (function () {
                const t = document.createElement('div');
                t.className = 'CMStatsPrestigeSection';
                const o = Math.floor(
                  Game.HowMuchPrestige(
                    lt +
                      Game.cookiesReset +
                      He +
                      (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg') ? Le : 0),
                  ),
                );
                t.appendChild(
                  Qn(
                    'withTooltip',
                    'Prestige level (cur / max)',
                    document.createTextNode(`${P(Game.prestige)} / ${P(o)}`),
                    'PrestMaxTooltipPlaceholder',
                  ),
                );
                const n = Math.max(
                    0,
                    Game.HowManyCookiesReset(o + 1) -
                      (lt +
                        Game.cookiesReset +
                        He +
                        (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg') && Le
                          ? Le
                          : 0)),
                  ),
                  i = document.createDocumentFragment();
                i.appendChild(document.createTextNode(P(n)));
                const a = document.createElement('small');
                (a.textContent = ` (${uo(n / st, 1)})`),
                  i.appendChild(a),
                  t.appendChild(
                    Qn('withTooltip', 'Cookies to next level', i, 'NextPrestTooltipPlaceholder'),
                  ),
                  t.appendChild(
                    Qn(
                      'withTooltip',
                      'Heavenly chips (cur / max)',
                      document.createTextNode(
                        `${P(Game.heavenlyChips)} / ${P(o - Game.prestige + Game.heavenlyChips)}`,
                      ),
                      'HeavenChipMaxTooltipPlaceholder',
                    ),
                  ),
                  t.appendChild(
                    Qn(
                      'basic',
                      'Heavenly chips per second (last 5 seconds)',
                      document.createTextNode(P(Ne, 2)),
                    ),
                  );
                const r = Number(e.HeavenlyChipsTarget);
                if (!Number.isNaN(r)) {
                  const e =
                    r - Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
                  e > 0 &&
                    (t.appendChild(
                      Qn(
                        'basic',
                        'Heavenly chips to target set in settings (cur)',
                        document.createTextNode(P(e)),
                      ),
                    ),
                    t.appendChild(
                      Qn(
                        'basic',
                        'Time till target (cur, current 5 second average)',
                        document.createTextNode(uo(e / Ne)),
                      ),
                    ));
                }
                const l = (function (e) {
                    let t = Game.cookiesPs;
                    So(),
                      0 === yt['Heavenly key'].bought &&
                        ((yt['Heavenly chip secret'].bought = 1),
                        (yt['Heavenly cookie stand'].bought = 1),
                        (yt['Heavenly bakery'].bought = 1),
                        (yt['Heavenly confectionery'].bought = 1),
                        (yt['Heavenly key'].bought = 1),
                        Fo(),
                        (t = de),
                        So()),
                      lt >= 1e6 && Oo('Sacrifice'),
                      lt >= 1e9 && Oo('Oblivion'),
                      lt >= 1e12 && Oo('From scratch'),
                      lt >= 1e15 && Oo('Nihilism'),
                      lt >= 1e18 && Oo('Dematerialize'),
                      lt >= 1e21 && Oo('Nil zero zilch'),
                      lt >= 1e24 && Oo('Transcendence'),
                      lt >= 1e27 && Oo('Obliterate'),
                      lt >= 1e30 && Oo('Negative void'),
                      lt >= 1e33 && Oo('To crumbs, you say?'),
                      lt >= 1e36 && Oo('You get nothing'),
                      lt >= 1e39 && Oo('Humble rebeginnings'),
                      lt >= 1e42 && Oo('The end of the world'),
                      lt >= 1e45 && Oo("Oh, you're back"),
                      lt >= 1e48 && Oo('Lazarus'),
                      lt >= 1e51 && Oo('Smurf account'),
                      lt >= 1e54 && Oo("If at first you don't succeed"),
                      (yt['Heavenly chip secret'].bought = 1),
                      (yt['Heavenly cookie stand'].bought = 1),
                      (yt['Heavenly bakery'].bought = 1),
                      (yt['Heavenly confectionery'].bought = 1),
                      (yt['Heavenly key'].bought = 1),
                      (oe = e);
                    const o = ee;
                    Fo(), Uo(), o !== ee && Fo();
                    const n = de - t;
                    return (oe = Game.prestige), n;
                  })(o),
                  s = document.createDocumentFragment();
                s.appendChild(document.createTextNode(P(l)));
                const c = Math.round((l / Game.cookiesPs) * 1e4);
                if (Number.isFinite(c) && 0 !== c) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${c / 100}% of income)`), s.appendChild(e);
                }
                t.appendChild(
                  Qn('withTooltip', 'Reset bonus income', s, 'ResetTooltipPlaceholder'),
                );
                const d = Math.floor(Game.HowMuchPrestige(Game.cookiesReset)),
                  p = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)),
                  u = p - d;
                if (!Game.Has('Lucky digit')) {
                  let e = 7 - (p % 10);
                  e < 0 && (e += 10);
                  const o = u + e,
                    n = p + e,
                    i = document.createDocumentFragment();
                  i.appendChild(
                    document.createTextNode(
                      `${n.toLocaleString()} / ${o.toLocaleString()} (+${e})`,
                    ),
                  ),
                    t.appendChild(Qn('basic', 'Next "Lucky Digit" (total / reset)', i));
                }
                if (!Game.Has('Lucky number')) {
                  let e = 777 - (p % 1e3);
                  e < 0 && (e += 1e3);
                  const o = u + e,
                    n = p + e,
                    i = document.createDocumentFragment();
                  i.appendChild(
                    document.createTextNode(
                      `${n.toLocaleString()} / ${o.toLocaleString()} (+${e})`,
                    ),
                  ),
                    t.appendChild(Qn('basic', 'Next "Lucky Number" (total / reset)', i));
                }
                if (!Game.Has('Lucky payout')) {
                  let e = 777777 - (p % 1e6);
                  e < 0 && (e += 1e6);
                  const o = u + e,
                    n = p + e,
                    i = document.createDocumentFragment();
                  i.appendChild(
                    document.createTextNode(
                      `${n.toLocaleString()} / ${o.toLocaleString()} (+${e})`,
                    ),
                  ),
                    t.appendChild(Qn('basic', 'Next "Lucky Payout" (total / reset)', i));
                }
                return t;
              })(),
            ),
          Game.cpsSucked > 0 && (o.appendChild(_n('Wrinklers', 'Wrink')), e.Header.Wrink))
        ) {
          const e = document.createDocumentFragment();
          e.appendChild(document.createTextNode(`${P(He)} / ${P(Ue)} `));
          const t = document.createElement('a');
          (t.textContent = 'Pop All Normal'),
            (t.className = 'option'),
            (t.onclick = function () {
              An();
            }),
            e.appendChild(t),
            o.appendChild(Qn('basic', 'Rewards of Popping (All/Normal)', e));
          const n = document.createDocumentFragment();
          n.appendChild(document.createTextNode(`${P($e[0])} `));
          const i = document.createElement('a');
          (i.textContent = 'Pop Single Fattest'),
            (i.className = 'option'),
            (i.onclick = function () {
              null !== $e[1] && (Game.wrinklers[$e[1]].hp = 0);
            }),
            n.appendChild(i),
            o.appendChild(
              Qn(
                'basic',
                `Rewards of Popping Single Fattest Non-Shiny Wrinkler (id: ${
                  null !== $e[1] ? $e[1] : 'None'
                })`,
                n,
              ),
            );
        }
        if (
          (o.appendChild(
            (function () {
              const t = document.createElement('div');
              t.className = 'CMStatsSeasonSection';
              let o = !1;
              const n = [];
              Object.keys(Wo).forEach((e) => {
                Game.Has(Wo[e]) || (n.push(Wo[e]), (o = !0));
              });
              const i = [];
              Object.keys(Ao).forEach((e) => {
                Game.Has(Ao[e]) || (i.push(Ao[e]), (o = !0));
              });
              const a = [];
              Object.keys(jo).forEach((e) => {
                Game.Has(jo[e]) || (a.push(jo[e]), (o = !0));
              });
              const r = [];
              Object.keys(Game.eggDrops).forEach((e) => {
                Game.HasUnlocked(Game.eggDrops[e]) || (r.push(Game.eggDrops[e]), (o = !0));
              });
              const l = [];
              Object.keys(Game.rareEggDrops).forEach((e) => {
                Game.HasUnlocked(Game.rareEggDrops[e]) || (l.push(Game.rareEggDrops[e]), (o = !0));
              });
              const s = Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg'),
                c = Game.Has('Century egg');
              if (
                ('christmas' === Game.season || o || s || c) &&
                (t.appendChild(_n('Season Specials', 'Sea')), e.Header.Sea)
              ) {
                if (0 !== n.length) {
                  t.appendChild(Qn('basic', 'Halloween cookies left to buy', Xn(n)));
                  let e = 0.95;
                  if (
                    (Game.HasAchiev('Spooky cookies') && (e = 0.8),
                    Game.Has('Starterror') && (e *= 0.9),
                    (e *= 1 / Game.dropRateMult()),
                    Game.hasGod)
                  ) {
                    const t = Game.hasGod('seasons');
                    1 === t ? (e *= 0.9) : 2 === t ? (e *= 0.95) : 3 === t && (e *= 0.97);
                  }
                  const o = n.length / 7;
                  t.appendChild(
                    Qn(
                      'basic',
                      'Chance of receiving a cookie from wrinkler/shiny wrinkler',
                      document.createTextNode(
                        `${P((1 - e) * o * 100)}% / ${P((1 - 0.9 * e) * o * 100)}%`,
                      ),
                    ),
                  );
                }
                if (0 !== i.length) {
                  t.appendChild(Qn('basic', 'Christmas cookies left to buy', Xn(i)));
                  let e = 0.8;
                  if (
                    (Game.HasAchiev('Let it snow') && (e = 0.6),
                    (e *= 1 / Game.dropRateMult()),
                    Game.Has('Starsnow') && (e *= 0.95),
                    Game.hasGod)
                  ) {
                    const t = Game.hasGod('seasons');
                    1 === t ? (e *= 0.9) : 2 === t ? (e *= 0.95) : 3 === t && (e *= 0.97);
                  }
                  const o = i.length / 7;
                  t.appendChild(
                    Qn(
                      'basic',
                      'Chance of receiving a cookie from reindeer',
                      document.createTextNode(`${P((1 - e) * o * 100)}%`),
                    ),
                  );
                }
                0 !== a.length &&
                  t.appendChild(Qn('basic', 'Valentine cookies left to buy', Xn(a)));
                const e = function (e) {
                  let t = e * (1 / Game.dropRateMult());
                  if (
                    (Game.HasAchiev('Hide & seek champion') && (t *= 0.7),
                    Game.Has('Omelette') && (t *= 0.9),
                    Game.Has('Starspawn') && (t *= 0.9),
                    Game.hasGod)
                  ) {
                    const e = Game.hasGod('seasons');
                    1 === e ? (t *= 0.9) : 2 === e ? (t *= 0.95) : 3 === e && (t *= 0.97);
                  }
                  const o = 1 - t,
                    n = Game.eggDrops.length - r.length,
                    i = Game.rareEggDrops.length - l.length,
                    a = 0.9 * o * (1 - n / Game.eggDrops.length),
                    s = 0.1 * o * (1 - i / Game.rareEggDrops.length),
                    c =
                      0.9 * o * (n / Game.eggDrops.length) +
                      0.1 * o * (i / Game.rareEggDrops.length);
                  return [
                    a + 0.9 * c * (1 - n / Game.eggDrops.length),
                    s + 0.1 * c * (1 - i / Game.rareEggDrops.length),
                  ];
                };
                0 !== r.length &&
                  (t.appendChild(Qn('basic', 'Normal easter eggs left to unlock', Xn(r))),
                  t.appendChild(
                    Qn(
                      'basic',
                      'Chance of receiving an egg from wrinkler/golden cookie',
                      document.createTextNode(`${P(100 * e(0.98)[0])}% / ${P(100 * e(0.9)[0])}%`),
                    ),
                  )),
                  0 !== l.length &&
                    (t.appendChild(Qn('basic', 'Rare easter eggs left to unlock', Xn(l))),
                    t.appendChild(
                      Qn(
                        'basic',
                        'Chance of receiving a rare egg from wrinkler/golden cookie',
                        document.createTextNode(`${P(100 * e(0.98)[1])}% / ${P(100 * e(0.9)[1])}%`),
                      ),
                    )),
                  'christmas' === Game.season &&
                    t.appendChild(Qn('basic', 'Reindeer reward', document.createTextNode(P(Fe)))),
                  s &&
                    t.appendChild(
                      Qn(
                        'withTooltip',
                        'Chocolate egg cookies',
                        document.createTextNode(P(Le)),
                        'ChoEggTooltipPlaceholder',
                      ),
                    ),
                  c &&
                    t.appendChild(
                      Qn(
                        'basic',
                        'Century egg multiplier',
                        document.createTextNode(Math.round(1e4 * (Oe - 1)) / 100 + '%'),
                      ),
                    );
              }
              return t;
            })(),
          ),
          o.appendChild(_n('Miscellaneous', 'Misc')),
          e.Header.Misc)
        ) {
          if (
            (o.appendChild(
              Qn(
                'basic',
                `Average cookies per second (past ${
                  qt[e.AvgCPSHist] < 60
                    ? `${qt[e.AvgCPSHist]} seconds`
                    : qt[e.AvgCPSHist] / 60 + (3 === e.AvgCPSHist ? ' minute' : ' minutes')
                })`,
                document.createTextNode(P(ho(), 3)),
              ),
            ),
            o.appendChild(
              Qn(
                'basic',
                `Average cookie clicks per second (past ${Yt[e.AvgClicksHist]}${
                  0 === e.AvgClicksHist ? ' second' : ' seconds'
                })`,
                document.createTextNode(P(Ve, 1)),
              ),
            ),
            o.appendChild(
              Qn(
                'basic',
                `Cookies from clicking (past ${Yt[e.AvgClicksHist]}${
                  0 === e.AvgClicksHist ? ' second' : ' seconds'
                })`,
                document.createTextNode(P(E.calcSum(Ve * Yt[e.AvgClicksHist]))),
              ),
            ),
            Game.Has('Fortune cookies'))
          ) {
            const e = [];
            Object.keys(Lo).forEach((t) => {
              Game.Has(Lo[t]) || e.push(Lo[t]);
            }),
              0 !== e.length && o.appendChild(Qn('basic', 'Fortune Upgrades Left to Buy', Xn(e)));
          }
          if (
            (e.ShowMissedGC &&
              o.appendChild(
                Qn(
                  'basic',
                  'Missed golden cookies',
                  document.createTextNode(P(Game.missedGoldenClicks)),
                ),
              ),
            Game.prefs.autosave)
          ) {
            const e = document.createElement('span');
            (e.id = 'CMStatsAutosaveTimer'),
              (e.innerText = Game.sayTime(
                60 * Game.fps - (Game.OnAscend ? 0 : Game.T % (60 * Game.fps)),
                4,
              )),
              o.appendChild(Qn('basic', 'Time till autosave', e));
          }
        }
        l('menu').insertBefore(o, l('menu').childNodes[2]),
          e.MissingUpgrades &&
            l('menu').childNodes.forEach((e) => {
              if (e.children[0])
                if ('Prestige' === e.children[0].innerHTML && Qe) {
                  const t = Qe.match(new RegExp('div', 'g') || 0).length / 2,
                    o = document.createElement('div');
                  (o.id = 'CMMissingUpgradesPrestigeTitle'), (o.className = 'listing');
                  const n = document.createElement('div');
                  (n.innerHTML = `<b>Missing Prestige upgrades:</b> ${t}/${
                    Game.PrestigeUpgrades.length
                  } (${Math.floor((t / Game.PrestigeUpgrades.length) * 100)}%)`),
                    o.appendChild(n),
                    e.appendChild(o);
                  const i = document.createElement('div');
                  (i.className = 'listing crateBox'), (i.innerHTML = Qe), e.appendChild(i);
                } else if ('Upgrades' === e.children[0].innerHTML) {
                  if (_e) {
                    const t = _e.match(new RegExp('div', 'g') || 0).length / 2,
                      o = document.createElement('div');
                    (o.id = 'CMMissingUpgradesTitle'), (o.className = 'listing');
                    const n = document.createElement('div');
                    (n.innerHTML = `<b>Missing normal upgrades:</b> ${t}/${
                      Game.UpgradesByPool[''].length + Game.UpgradesByPool.tech.length
                    } (${Math.floor(
                      (t / (Game.UpgradesByPool[''].length + Game.UpgradesByPool.tech.length)) *
                        100,
                    )}%)`),
                      o.appendChild(n),
                      e.insertBefore(o, e.childNodes[3]);
                    const i = document.createElement('div');
                    (i.className = 'listing crateBox'),
                      (i.innerHTML = _e),
                      e.insertBefore(
                        i,
                        document.getElementById('CMMissingUpgradesTitle').nextSibling,
                      );
                  }
                  if (Xe) {
                    const t = Xe.match(new RegExp('div', 'g') || 0).length / 2,
                      o = document.createElement('div');
                    (o.id = 'CMMissingUpgradesCookiesTitle'), (o.className = 'listing');
                    const n = document.createElement('div');
                    (n.innerHTML = `<b>Missing Cookie upgrades:</b> ${t}/${
                      Game.UpgradesByPool.cookie.length
                    } (${Math.floor((t / Game.UpgradesByPool.cookie.length) * 100)}%)`),
                      o.appendChild(n),
                      e.appendChild(o);
                    const i = document.createElement('div');
                    (i.className = 'listing crateBox'), (i.innerHTML = Xe), e.appendChild(i);
                  }
                }
            }),
          e.MissingAchievements &&
            (function () {
              let t;
              Object.values(document.querySelectorAll('div.title')).forEach((e) => {
                e.textContent.includes('Achievements') &&
                  (t = e.parentElement.querySelectorAll('div.listing.crateBox')[0]);
              }),
                e.MissingAchievements &&
                  Object.values(t.children).forEach((e) => {
                    if (!e.className.includes('enabled')) {
                      const t = e.onclick.toString().split(/\[(.*)\]/gi)[1],
                        { icon: o } = Game.AchievementsById[t];
                      (e.style.backgroundPosition = `${48 * -o[0]}px ${48 * -o[1]}px`),
                        (e.onmouseover = function () {
                          Game.mouseDown ||
                            (Game.setOnCrate(this),
                            (Game.tooltip.dynamic = 1),
                            Game.tooltip.draw(
                              this,
                              () =>
                                (function (e) {
                                  const t = [];
                                  'shadow' === e.pool
                                    ? t.push('Shadow Achievement', '#9700cf')
                                    : t.push('Achievement', 0),
                                    t.push('Locked', 0);
                                  let o = 0;
                                  (Game.Has('Neuromancy') || (Game.sesame && 'debug' === e.pool)) &&
                                    (o = 1),
                                    o && 0 === e.won
                                      ? t.push('Click to win!', '#00c462')
                                      : o && e.won > 0 && t.push('Click to lose!', '#00c462');
                                  let { icon: n } = e;
                                  e.iconFunction && (n = e.iconFunction());
                                  let { desc: i } = e;
                                  e.descFunc && (i = e.descFunc('stats'));
                                  let a = '';
                                  for (let e = 0; e < t.length; e += 2)
                                    e % 2 == 0 &&
                                      (a += ` <div class="tag" style="color:${
                                        0 === t[e + 1] ? '#fff' : t[e + 1]
                                      };">[${t[e]}]</div>`);
                                  return (
                                    (a = a.substring(1)),
                                    `<div style="padding:8px 4px;min-width:350px;opacity:0.5">\n  <div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:${
                                      48 * -n[0]
                                    }px ${48 * -n[1]}px;"></div>\n  <div class="name">${
                                      e.name
                                    }</div>\n  ${a}<div class="line"></div><div class="description">${i}</div></div>\n  ${
                                      Game.sesame
                                        ? `<div style="font-size:9px;">Id : ${
                                            e.id
                                          } | Order : ${Math.floor(e.order)}${
                                            e.tier ? ` | Tier : ${e.tier}` : ''
                                          }</div>`
                                        : ''
                                    }`
                                  );
                                })(Game.AchievementsById[t]),
                              'top',
                            ),
                            Game.tooltip.wobble());
                        });
                    }
                  });
            })();
      }
      const Yn = {
          Favourite: 'Favourite Settings',
          Calculation: 'Calculation',
          Notation: 'Notation',
          Colours: 'Colours and colour coding',
          BarsDisplay: 'Infobars and visual settings',
          Tooltip: 'Tooltips',
          Statistics: 'Statistics',
          Notification: 'Notifications',
          Miscellaneous: 'Miscellaneous',
        },
        Kn = {
          NotificationGeneral: 'General Notifications',
          NotificationGC: 'Golden Cookie',
          NotificationFC: 'Fortune Cookie',
          NotificationSea: 'Season Special',
          NotificationGard: 'Garden Tick',
          NotificationMagi: 'Full Magic Bar',
          NotificationWrink: 'Wrinkler',
          NotificationWrinkMax: 'Maximum Wrinklers',
        };
      function Jn(t, o) {
        const n = document.createElement('div');
        (n.className = 'title'),
          (n.style.opacity = '0.7'),
          (n.style.fontSize = '17px'),
          n.appendChild(document.createTextNode(`${o} `));
        const i = document.createElement('span');
        return (
          (i.style.cursor = 'pointer'),
          (i.style.display = 'inline-block'),
          (i.style.height = '14px'),
          (i.style.width = '14px'),
          (i.style.borderRadius = '7px'),
          (i.style.textAlign = 'center'),
          (i.style.backgroundColor = '#C0C0C0'),
          (i.style.color = 'black'),
          (i.style.fontSize = '13px'),
          (i.style.verticalAlign = 'middle'),
          (i.textContent = e.Header[t] ? '-' : '+'),
          (i.onclick = function () {
            Vn(t), Game.UpdateMenu();
          }),
          n.appendChild(i),
          n
        );
      }
      function Zn(t) {
        const o = document.createElement('div');
        if (
          ((o.className = 'listing'),
          1 === e.FavouriteSettings &&
            o.appendChild(
              (function (e) {
                const t = document.createElement('a');
                return (
                  lo.includes(e)
                    ? ((t.innerText = '★'), (t.style.color = 'yellow'))
                    : (t.innerText = '☆'),
                  (t.className = 'option'),
                  (t.onclick = function () {
                    !(function (e) {
                      lo.includes(e) ? (lo = lo.filter((t) => t !== e)) : lo.push(e);
                    })(e),
                      Ln(),
                      Game.UpdateMenu();
                  }),
                  (t.onmouseover = function () {
                    Game.tooltip.draw(this, escape(Ut.FavouriteSettingPlaceholder.innerHTML));
                  }),
                  (t.onmouseout = function () {
                    Game.tooltip.hide();
                  }),
                  t.appendChild(document.createTextNode(' ')),
                  t
                );
              })(t),
            ),
          'bool' === wn[t].type)
        ) {
          const n = document.createElement('a');
          wn[t].toggle && 0 === e[t] ? (n.className = 'option off') : (n.className = 'option'),
            (n.id = In + t),
            (n.onclick = function () {
              !(function (t) {
                (e[t] += 1),
                  e[t] === wn[t].label.length
                    ? ((e[t] = 0), wn[t].toggle && (l(In + t).className = 'option off'))
                    : (l(In + t).className = 'option'),
                  void 0 !== wn[t].func && wn[t].func(),
                  Ln();
              })(t),
                Game.UpdateMenu();
            }),
            (n.textContent = wn[t].label[e[t]]),
            o.appendChild(n);
          const i = document.createElement('label');
          return (i.textContent = wn[t].desc), (i.style.lineHeight = '1.6'), o.appendChild(i), o;
        }
        if ('vol' === wn[t].type) {
          const n = document.createElement('div');
          n.className = 'sliderBox';
          const i = document.createElement('div');
          (i.style.float = 'left'), (i.innerHTML = wn[t].desc), n.appendChild(i);
          const a = document.createElement('div');
          (a.id = `slider${t}right`),
            (a.style.float = 'right'),
            (a.innerHTML = `${e[t]}%`),
            n.appendChild(a);
          const r = document.createElement('input');
          (r.className = 'slider'),
            (r.id = `slider${t}`),
            (r.style.clear = 'both'),
            (r.type = 'range'),
            (r.min = '0'),
            (r.max = '100'),
            (r.step = '1'),
            (r.value = e[t]),
            (r.oninput = function () {
              zn(t), Game.UpdateMenu();
            }),
            (r.onchange = function () {
              zn(t), Game.UpdateMenu();
            }),
            n.appendChild(r),
            o.appendChild(n);
          const l = document.createElement('a');
          return (
            (l.className = 'option'),
            (l.onclick = function () {
              En(e[t.replace('Volume', 'SoundURL')], t.replace('Volume', 'Sound'), t, !0);
            }),
            (l.textContent = 'Test sound'),
            o.appendChild(l),
            o
          );
        }
        if ('url' === wn[t].type) {
          const n = document.createElement('span');
          (n.className = 'option'),
            (n.textContent = `${wn[t].label} `),
            (n.style.lineHeight = '1.6'),
            o.appendChild(n);
          const i = document.createElement('input');
          (i.id = In + t),
            (i.className = 'option'),
            (i.type = 'text'),
            (i.readOnly = !0),
            i.setAttribute('value', e[t]),
            (i.style.width = '300px'),
            o.appendChild(i),
            o.appendChild(document.createTextNode(' '));
          const a = document.createElement('input');
          (a.id = `${In + t}Prompt`),
            (a.className = 'option'),
            (a.type = 'text'),
            a.setAttribute('value', e[t]);
          const r = document.createElement('a');
          (r.className = 'option'),
            (r.onclick = function () {
              !(function (e, t) {
                Game.promptWrapL.className = 'framed';
                const o = e;
                (Game.promptL.innerHTML = `${o}<div class="optionBox"></div>`),
                  Object.keys(t).forEach((e) => {
                    const o = document.createElement('a');
                    (o.id = `promptOption${e}`),
                      (o.className = 'option'),
                      (o.onclick = function () {
                        PlaySound('snd/tick.mp3'), t[e][1]();
                      }),
                      (o.textContent = t[e][0]),
                      Game.promptL.children[1].appendChild(o);
                  }),
                  (Game.promptAnchorL.style.display = 'block'),
                  (Game.darkenL.style.display = 'block'),
                  Game.promptL.focus(),
                  (Game.promptOn = 1),
                  Game.UpdatePrompt();
              })(a.outerHTML, [
                [
                  'Save',
                  function () {
                    (e[t] = l(`CMConfig${t}Prompt`).value),
                      Ln(),
                      Game.ClosePrompt(),
                      Game.UpdateMenu();
                  },
                ],
                [
                  'Cancel',
                  function () {
                    Game.ClosePrompt();
                  },
                ],
              ]);
            }),
            (r.textContent = 'Edit'),
            o.appendChild(r);
          const s = document.createElement('label');
          return (s.textContent = wn[t].desc), (s.style.lineHeight = '1.6'), o.appendChild(s), o;
        }
        if ('colour' === wn[t].type) {
          const n = document.createElement('span');
          n.className = 'option';
          const i = document.createElement('input');
          (i.id = t),
            (i.style.width = '65px'),
            i.setAttribute('value', e[t]),
            n.appendChild(i),
            new $n(i, {
              hash: !0,
              position: 'right',
              onInput: function () {
                (e[this.targetElement.id] = this.toHEXString()), Fn(), Ln(), Game.UpdateMenu();
              },
            });
          const a = document.createElement('label');
          if (
            ((a.textContent = wn[t].desc),
            (a.style.lineHeight = '1.6'),
            n.appendChild(a),
            t.includes('Flash'))
          ) {
            const e = document.createElement('a');
            (e.className = 'option'),
              (e.onclick = function () {
                Pn(3, t.replace('Colour', ''), !0);
              }),
              (e.textContent = 'Test flash'),
              n.appendChild(e);
          }
          return o.appendChild(n), Rn().init(), o;
        }
        if ('numscale' === wn[t].type) {
          const n = document.createElement('span');
          (n.className = 'option'),
            (n.textContent = `${wn[t].label} `),
            (n.style.lineHeight = '1.6'),
            o.appendChild(n);
          const i = document.createElement('input');
          (i.id = In + t),
            (i.className = 'option'),
            (i.type = 'number'),
            (i.value = e[t]),
            (i.min = wn[t].min),
            (i.max = wn[t].max),
            (i.oninput = function () {
              (e[t] = this.value), Ln(), fn(), Game.UpdateMenu();
            }),
            o.appendChild(i),
            o.appendChild(document.createTextNode(' '));
          const a = document.createElement('label');
          return (a.textContent = wn[t].desc), (a.style.lineHeight = '1.6'), o.appendChild(a), o;
        }
        return o;
      }
      function ei(t) {
        if (1 === e.TimerBar && 0 === e.TimerBarPos) {
          const e = parseInt(l('CMTimerBar').style.height, 10);
          (Game.mouseY -= e), t(), (Game.mouseY += e);
        } else t();
      }
      function ti() {
        (M.Beautify = Beautify),
          (Beautify = P),
          (M.CalculateGains = Game.CalculateGains),
          (Game.CalculateGains = function () {
            M.CalculateGains(), (se = 1), (S = Date.now()), (B = Date.now());
          }),
          (M.tooltip = {}),
          (M.tooltip.draw = Game.tooltip.draw),
          (M.tooltip.drawMod = new Function(
            `return ${Game.tooltip.draw.toString().split('this').join('Game.tooltip')}`,
          )()),
          (Game.tooltip.draw = function (e, t, o) {
            M.tooltip.drawMod(e, t, o);
          }),
          (M.tooltip.update = Game.tooltip.update),
          (M.tooltip.updateMod = new Function(
            `return ${Game.tooltip.update.toString().split('this.').join('Game.tooltip.')}`,
          )()),
          (Game.tooltip.update = function () {
            M.tooltip.updateMod(),
              (function () {
                if ('store' === Game.tooltip.origin) {
                  let t = 0;
                  1 === e.ToolWarnLucky &&
                    1 === e.ToolWarnPos &&
                    null !== l('CMDispTooltipWarningParent') &&
                    (t = l('CMDispTooltipWarningParent').clientHeight - 4),
                    (Game.tooltip.tta.style.top = `${Math.min(
                      parseInt(Game.tooltip.tta.style.top, 10),
                      l('game').clientHeight +
                        l('topBar').clientHeight -
                        Game.tooltip.tt.clientHeight -
                        t -
                        46,
                    )}px`);
                }
              })();
          }),
          (M.UpdateWrinklers = Game.UpdateWrinklers),
          (Game.UpdateWrinklers = function () {
            ei(M.UpdateWrinklers);
          }),
          (M.UpdateSpecial = Game.UpdateSpecial),
          (Game.UpdateSpecial = function () {
            ei(M.UpdateSpecial);
          }),
          l('bigCookie').removeEventListener('click', Game.ClickCookie, !1),
          l('bigCookie').addEventListener(
            'click',
            () => {
              ei(Game.ClickCookie);
            },
            !1,
          ),
          (M.RebuildUpgrades = Game.RebuildUpgrades),
          (Game.RebuildUpgrades = function () {
            M.RebuildUpgrades(),
              (T = []),
              Object.keys(Game.UpgradesInStore).forEach((e) => {
                null !== l(`upgrade${e}`).onmouseover &&
                  ((T[e] = l(`upgrade${e}`).onmouseover),
                  (l(`upgrade${e}`).onmouseover = function () {
                    Game.mouseDown ||
                      (Game.setOnCrate(this),
                      (Game.tooltip.dynamic = 1),
                      Game.tooltip.draw(this, () => jn('u', `${e}`), 'store'),
                      Game.tooltip.wobble());
                  }));
              }),
              Game.CalculateGains();
          }),
          (M.ClickProduct = Game.ClickProduct),
          (Game.ClickProduct = function (t) {
            (!e.BulkBuyBlock ||
              Game.ObjectsById[t].bulkPrice < Game.cookies ||
              -1 === Game.buyMode) &&
              M.ClickProduct(t);
          }),
          (M.DescribeDragonAura = Game.DescribeDragonAura),
          (Game.DescribeDragonAura = function (t) {
            M.DescribeDragonAura(t),
              (function (t) {
                if (1 === e.DragonAuraInfo) {
                  const [e, o] = (function (e) {
                      So(),
                        l('promptContent').children[0].innerHTML.includes('secondary')
                          ? (ie = e)
                          : (ne = e);
                      let t = 0;
                      if (ne !== me || ie !== he)
                        for (let e = Game.ObjectsById.length - 1; e > -1; --e)
                          if (Game.ObjectsById[e].amount > 0) {
                            const o = Ct[Game.ObjectsById[e].name].name;
                            (Ct[o].amount -= 1),
                              (K -= 1),
                              (t =
                                Ct[o].basePrice *
                                Game.priceIncrease ** Math.max(0, Ct[o].amount - 1 - Ct[o].free)),
                              (t = Game.modifyBuildingPrice(Ct[o], t)),
                              (t = Math.ceil(t));
                            break;
                          }
                      const o = ee;
                      return Fo(), Uo(), o !== ee && Fo(), [de - Game.cookiesPs, t];
                    })(t),
                    n = uo(o / (e + Game.cookiesPs));
                  let i;
                  (i = 0 === Game.cookiesPs ? P(1 / 0) : P((e / Game.cookiesPs) * 100)),
                    (l('dragonAuraInfo').style.minHeight = '60px'),
                    (l('dragonAuraInfo').style.margin = '8px'),
                    (l('dragonAuraInfo').appendChild(document.createElement('div')).className =
                      'line');
                  const a = document.createElement('div');
                  (a.style.minWidth = '200px'),
                    (a.style.textAlign = 'center'),
                    (a.textContent = `Picking this aura will change CPS by ${P(
                      e,
                    )} (${i}% of current CPS).`),
                    l('dragonAuraInfo').appendChild(a);
                  const r = document.createElement('div');
                  (r.style.minWidth = '200px'),
                    (r.style.textAlign = 'center'),
                    (r.textContent = `It will take ${n} to recover the cost.`),
                    l('dragonAuraInfo').appendChild(r);
                }
              })(t);
          }),
          (M.ToggleSpecialMenu = Game.ToggleSpecialMenu),
          (Game.ToggleSpecialMenu = function (e) {
            M.ToggleSpecialMenu(e),
              (function () {
                if (
                  null !==
                  (l('specialPopup').className.match(/onScreen/) &&
                    l('specialPopup').children[0].style.background.match(/dragon/))
                )
                  for (let e = 0; e < l('specialPopup').childNodes.length; e++)
                    'optionBox' === l('specialPopup').childNodes[e].className &&
                      ((l('specialPopup').children[e].onmouseover = function () {
                        Tn(),
                          (Game.tooltip.dynamic = 1),
                          Game.tooltip.draw(
                            l('specialPopup'),
                            `<div style="min-width:200px;text-align:center;">${fe}</div>`,
                            'this',
                          ),
                          Game.tooltip.wobble();
                      }),
                      (l('specialPopup').children[e].onmouseout = function () {
                        Game.tooltip.shouldHide = 1;
                      }));
              })();
          }),
          (M.UpdateMenu = Game.UpdateMenu),
          (Game.UpdateMenu = function () {
            (void 0 !== Rn().picker && void 0 !== Rn().picker.owner) ||
              (M.UpdateMenu(),
              (function () {
                const t = document.createElement('div');
                (t.className = 'title'),
                  'prefs' === Game.onMenu
                    ? ((t.textContent = 'Cookie Monster Settings'),
                      (function (t) {
                        const o = document.createDocumentFragment();
                        o.appendChild(t),
                          Object.keys(Yn).forEach((t) => {
                            if ('Favourite' === t) {
                              if (
                                0 !== lo.length &&
                                e.FavouriteSettings > 0 &&
                                (o.appendChild(Jn(t, Yn[t])), e.Header[t])
                              )
                                for (let e = 0; e < lo.length; e++) o.appendChild(Zn(lo[e]));
                            } else
                              o.appendChild(Jn(t, Yn[t])),
                                e.Header[t] &&
                                  ('Notification' === t
                                    ? Object.keys(Kn).forEach((t) => {
                                        const n = Jn(t, Kn[t]);
                                        (n.style.fontSize = '15px'),
                                          (n.style.opacity = '0.5'),
                                          o.appendChild(n),
                                          e.Header[t] &&
                                            Object.keys(wn).forEach((e) => {
                                              wn[e].group === t && o.appendChild(Zn(e));
                                            });
                                      })
                                    : Object.keys(wn).forEach((e) => {
                                        wn[e].group === t && o.appendChild(Zn(e));
                                      }));
                          });
                        const n = document.createElement('div');
                        n.className = 'listing';
                        const i = document.createElement('a');
                        (i.className = 'option'),
                          (i.onclick = function () {
                            Wn(mn);
                          }),
                          (i.textContent = 'Restore Default'),
                          n.appendChild(i),
                          o.appendChild(n),
                          l('menu').childNodes[2].insertBefore(
                            o,
                            l('menu').childNodes[2].childNodes[
                              l('menu').childNodes[2].childNodes.length - 1
                            ],
                          );
                      })(t))
                    : 'stats' === Game.onMenu
                    ? e.Stats && ((t.textContent = 'Cookie Monster Statistics'), qn(t))
                    : 'log' === Game.onMenu &&
                      ((t.textContent = 'Cookie Monster '),
                      (function (t) {
                        const o = document.createElement('div');
                        o.className = 'subsection';
                        const n = document.createElement('span');
                        if (
                          ((n.style.cursor = 'pointer'),
                          (n.style.display = 'inline-block'),
                          (n.style.height = '14px'),
                          (n.style.width = '14px'),
                          (n.style.borderRadius = '7px'),
                          (n.style.textAlign = 'center'),
                          (n.style.backgroundColor = '#C0C0C0'),
                          (n.style.color = 'black'),
                          (n.style.fontSize = '13px'),
                          (n.style.verticalAlign = 'middle'),
                          (n.textContent = e.Header.InfoTab ? '-' : '+'),
                          (n.onclick = function () {
                            Vn('InfoTab'), Game.UpdateMenu();
                          }),
                          t.appendChild(n),
                          o.appendChild(t),
                          e.Header.InfoTab)
                        ) {
                          const e = document.createElement('div');
                          (e.innerHTML =
                            '<div class="listing">\n <a href="https://github.com/Aktanusa/CookieMonster" target="blank">Cookie Monster</a>\n offers a wide range of tools and statistics to enhance your game experience.\n It is not a cheat interface – although it does offer helpers for golden cookies and such, everything can be toggled off at will to only leave how much information you want.</br>\n Progess on new updates and all previous release notes can be found on the GitHub page linked above!</br>\n Please also report any bugs you may find over there!</br>\n </div>\n '),
                            o.appendChild(e);
                          const t = document.createElement('div');
                          (t.innerHTML =
                            "<div class=\"listing\">\nThese are the release notes for the latest update (v 2.031.7).</br>\n</br>\nThis update implements the following functions:</br>\n- Updated the ordering and description of all settings of Cookie Monster</br>\n- Colours of Flash notifications can now be set by the user</br>\n- You can now select a number of settings to be your 'favourite'. They will be displayed at the top of all other settings in a new section. This functionality is toggleable and you can find it in the miscellaneous section</br>\n- The statistics page now shows cookies earned by clicking for a selected time period</br>\n- The statistics page can now show missing normal achievements, this can be toggled in the settings</br>\n</br>\nThis update fixes the following bugs:</br>\n- Fixed some typo's</br>\n- No longer show the wrinkler pop buttons when wrinklers can't spawn</br>\n- Fixed incorrect calculation of plant maturity for relevant tooltips</br>\n- Fixed edit prompts not working in settings</br>\n- Fixed red and purple being switched around for PP colour coding</br>\n- Fixed incorrect notation of numbers in Dragon tooltip and interface</br>\n- Fixed incorrect calculation of changing Dragon aura cost</br>\n- Fixed incorrect calculation of changing Pantheon gods effect</br>\n- Fixed fluctuating PP values when god Cyclius was selected</br>\n- Fixed black flickering when Golden Cookies or buffs start</br>\n</div>\n"),
                            o.appendChild(t);
                        }
                        const i = l('menu').children[1];
                        i.insertBefore(o, i.children[1]);
                      })(t));
              })());
          }),
          (M.sayTime = Game.sayTime),
          (Vt = function (e, t) {
            return Number.isNaN(e) || e <= 0 ? M.sayTime(e, t) : uo(e / Game.fps, 1);
          }),
          (M.Logic = Game.Logic),
          (Game.Logic = function () {
            M.Logic();
            let t = 'Cookie Clicker';
            'fools' === Game.season && (t = 'Cookie Baker'),
              (ro = `${Game.OnAscend ? 'Ascending! ' : ''}${P(Game.cookies)} ${
                1 === Game.cookies ? 'cookie' : 'cookies'
              } - ${t}`),
              (function () {
                if (Game.OnAscend || 0 === e.Title) document.title = ro;
                else if (1 === e.Title) {
                  let e,
                    t,
                    o,
                    n = !1,
                    i = !1;
                  (e = ct
                    ? ct.wrath
                      ? `[W${Math.ceil(ct.life / Game.fps)}]`
                      : `[G${Math.ceil(ct.life / Game.fps)}]`
                    : Game.Has('Golden switch [off]')
                    ? '[GS]'
                    : `[${Number(l('CMTimerBarGCMinBar').textContent) < 0 ? '!' : ''}${Math.ceil(
                        (Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time) /
                          Game.fps,
                      )}]`),
                    f && ((n = !0), (t = '[F]')),
                    'christmas' === Game.season &&
                      ((i = !0),
                      (o = g
                        ? `[R${Math.ceil(dt.life / Game.fps)}]`
                        : `[${
                            Number(l('CMTimerBarRenMinBar').textContent) < 0 ? '!' : ''
                          }${Math.ceil(
                            (Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time) /
                              Game.fps,
                          )}]`));
                  let a = ro;
                  '[' === a.charAt(0) && (a = a.substring(a.lastIndexOf(']') + 1)),
                    (document.title = `${e + (n ? t : '') + (i ? o : '')} ${a}`);
                } else if (2 === e.Title) {
                  let e = '',
                    t = !1;
                  ct &&
                    ((t = !0),
                    ct.wrath
                      ? (e += `[W${Math.ceil(ct.life / Game.fps)}]`)
                      : (e += `[G${Math.ceil(ct.life / Game.fps)}]`)),
                    f && ((t = !0), (e += '[F]')),
                    'christmas' === Game.season &&
                      g &&
                      ((e += `[R${Math.ceil(dt.life / Game.fps)}]`), (t = !0)),
                    t && (e += ' - ');
                  let o = 'Cookie Clicker';
                  'fools' === Game.season && (o = 'Cookie Baker'), (e += o), (document.title = e);
                }
              })(),
              (function () {
                const t = Math.max(
                    0,
                    Game.HowManyCookiesReset(
                      Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) + 1,
                    ) -
                      (Game.cookiesEarned + Game.cookiesReset),
                  ),
                  o = Game.sayTime(((Date.now() - Game.startDate) / 1e3) * Game.fps, -1);
                let n = '';
                (n += `You've been on this run for <b>${'' === o ? 'not very long' : o}</b>.<br>`),
                  (n += '<div class="line"></div>'),
                  Game.prestige > 0 &&
                    ((n += `Your prestige level is currently <b>${P(
                      Game.prestige,
                    )}</b>.<br>(CpS +${P(Game.prestige)}%)`),
                    (n += '<div class="line"></div>')),
                  (n +=
                    X < 1
                      ? 'Ascending now would grant you no prestige.'
                      : X < 2
                      ? 'Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend.'
                      : `Ascending now would grant you<br><b>${P(X)} prestige levels</b> (+${P(
                          X,
                        )}% CpS)<br>and <b>${P(X)} heavenly chips</b> to spend.`),
                  (n += '<div class="line"></div>'),
                  (n += `You need <b>${P(t)} more cookies</b> for the next level.<br>`),
                  (n += e.TooltipAscendButton
                    ? `<div class='line'></div>It takes ${pt} to reach the next level and you were making ${P(
                        Ne,
                        2,
                      )} chips on average in the last 5 seconds.<br>`
                    : ''),
                  (l('ascendTooltip').innerHTML = n);
              })();
          });
      }
      function oi() {
        Sn(),
          sn(),
          un(),
          (r = Object.keys(Game.mods).length),
          (ue = document.createElement('style')),
          (ue.type = 'text/css'),
          (ue.id = 'CMCSS'),
          document.head.appendChild(ue),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMBotBar'),
              (e.style.height = '69px'),
              (e.style.width = '100%'),
              (e.style.position = 'absolute'),
              (e.style.display = 'none'),
              (e.style.backgroundColor = '#262224'),
              (e.style.backgroundImage = 'linear-gradient(to bottom, #4d4548, #000000)'),
              (e.style.borderTop = '1px solid black'),
              (e.style.overflow = 'auto'),
              (e.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black');
            const t = e.appendChild(document.createElement('table'));
            (t.style.width = '100%'),
              (t.style.textAlign = 'center'),
              (t.style.whiteSpace = 'nowrap');
            const o = t.appendChild(document.createElement('tbody')),
              n = function (e, t) {
                const o = document.createElement('td');
                return (
                  (o.style.textAlign = 'right'), (o.className = St + t), (o.textContent = e), o
                );
              },
              i = o.appendChild(document.createElement('tr'));
            (i.style.fontWeight = 'bold'),
              i.appendChild(n('CM 2.031.7', Nt)),
              o.appendChild(document.createElement('tr')).appendChild(n('Bonus Income', Pt)),
              o.appendChild(document.createElement('tr')).appendChild(n('Payback Period', Pt)),
              o.appendChild(document.createElement('tr')).appendChild(n('Time Left', Pt)),
              l('wrapper').appendChild(e),
              Object.keys(Game.Objects).forEach((e) => {
                Co(e);
              });
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMTimerBar'),
              (e.style.position = 'absolute'),
              (e.style.display = 'none'),
              (e.style.height = '0px'),
              (e.style.fontSize = '10px'),
              (e.style.fontWeight = 'bold'),
              (e.style.backgroundColor = 'black');
            const t = fo('CMTimerBarGC', 'Next Cookie', [
              { id: 'CMTimerBarGCMinBar', color: Wt },
              { id: 'CMTimerBarGCBar', color: Lt },
            ]);
            e.appendChild(t);
            const o = fo('CMTimerBarRen', 'Next Reindeer', [
              { id: 'CMTimerBarRenMinBar', color: Wt },
              { id: 'CMTimerBarRenBar', color: Ot },
            ]);
            e.appendChild(o);
            const n = document.createElement('div');
            (n.id = 'CMTimerBarBuffTimers'), e.appendChild(n), l('wrapper').appendChild(e);
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMUpgradeBar'),
              (e.style.width = '100%'),
              (e.style.backgroundColor = 'black'),
              (e.style.textAlign = 'center'),
              (e.style.fontWeight = 'bold'),
              (e.style.display = 'none'),
              (e.style.zIndex = '21'),
              (e.onmouseout = function () {
                Game.tooltip.hide();
              });
            const t = document.createElement('div');
            t.appendChild(
              (function () {
                const e = document.createElement('div');
                (e.style.minWidth = '330px'), (e.style.marginBottom = '4px');
                const t = document.createElement('div');
                (t.className = 'name'),
                  (t.style.marginBottom = '4px'),
                  (t.textContent = 'Legend'),
                  e.appendChild(t);
                const o = function (e, t) {
                  const o = document.createElement('div');
                  o.style.verticalAlign = 'middle';
                  const n = document.createElement('span');
                  return (
                    (n.className = Bt + e),
                    (n.style.display = 'inline-block'),
                    (n.style.height = '10px'),
                    (n.style.width = '10px'),
                    (n.style.marginRight = '4px'),
                    o.appendChild(n),
                    o.appendChild(document.createTextNode(t)),
                    o
                  );
                };
                return (
                  e.appendChild(o(Pt, 'Better than the best PP of a building option')),
                  e.appendChild(o(Et, 'Same as the best PP building option')),
                  e.appendChild(o(Nt, 'Within the top 10 of PP for buildings')),
                  e.appendChild(o(Ot, 'Within the top 20 of PP for buildings')),
                  e.appendChild(o(Ft, 'Within the top 30 of PP for buildings')),
                  e.appendChild(o(Lt, 'Outside of the top 30 of PP for buildings')),
                  e.appendChild(o(Wt, 'Negative or infinity PP')),
                  e
                );
              })(),
            ),
              (e.onmouseover = function () {
                Game.tooltip.draw(this, escape(t.innerHTML), 'store');
              });
            const o = function (e, t) {
              const o = document.createElement('span');
              return (
                (o.id = e),
                (o.className = St + t),
                (o.style.width = '14.28571428571429%'),
                (o.style.display = 'inline-block'),
                (o.textContent = '0'),
                o
              );
            };
            e.appendChild(o('CMUpgradeBarBlue', Pt)),
              e.appendChild(o('CMUpgradeBarGreen', Et)),
              e.appendChild(o('CMUpgradeBarYellow', Nt)),
              e.appendChild(o('CMUpgradeBarOrange', Ot)),
              e.appendChild(o('CMUpgradeBarRed', Ft)),
              e.appendChild(o('CMUpgradeBarPurple', Lt)),
              e.appendChild(o('CMUpgradeBarGray', Wt)),
              l('upgrades').parentNode.insertBefore(e, l('upgrades').parentNode.childNodes[3]);
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMFlashScreen'),
              (e.style.width = '100%'),
              (e.style.height = '100%'),
              (e.style.backgroundColor = 'white'),
              (e.style.display = 'none'),
              (e.style.zIndex = '9999999999'),
              (e.style.position = 'absolute'),
              l('wrapper').appendChild(e);
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMSectionHidButtons'), (e.style.textAlign = 'center');
            const t = document.createElement('a');
            (t.className = 'option'),
              (t.onclick = function () {
                'flex' === l('upgrades').style.display
                  ? ((l('upgrades').style.display = 'none'),
                    (l('toggleUpgrades').style.display = 'none'),
                    (l('techUpgrades').style.display = 'none'),
                    (l('vaultUpgrades').style.display = 'none'))
                  : ((l('upgrades').style.display = 'flex'),
                    0 !== l('toggleUpgrades').children.length &&
                      (l('toggleUpgrades').style.display = 'block'),
                    0 !== l('techUpgrades').children.length &&
                      (l('techUpgrades').style.display = 'block'),
                    0 !== l('vaultUpgrades').children.length &&
                      (l('vaultUpgrades').style.display = 'block'));
              }),
              (t.textContent = 'Hide/Show Upgrades'),
              e.appendChild(t);
            const o = document.createElement('a');
            (o.className = 'option'),
              (o.onclick = function () {
                'grid' === l('products').style.display
                  ? (l('products').style.display = 'none')
                  : (l('products').style.display = 'grid');
              }),
              (o.textContent = 'Hide/Show Buildings'),
              e.appendChild(o),
              l('store').insertBefore(e, l('store').childNodes[2]);
          })(),
          (function () {
            const e = document.createElement('link');
            (e.id = 'CMFavicon'),
              (e.rel = 'shortcut icon'),
              (e.href = 'https://orteil.dashnet.org/cookieclicker/favicon.ico'),
              document.getElementsByTagName('head')[0].appendChild(e);
          })(),
          Object.keys(Ht).forEach((e) => {
            !(function (e, t, o) {
              const n = document.createElement('div');
              n.id = e;
              const i = document.createElement('div');
              (i.style.minWidth = o), (i.style.marginBottom = '4px');
              const a = document.createElement('div');
              (a.style.textAlign = 'left'),
                (a.textContent = t),
                i.appendChild(a),
                n.appendChild(i),
                (Ut[e] = n);
            })(Ht[e][0], Ht[e][1], Ht[e][2]);
          }),
          (function () {
            const e = document.createElement('a');
            (e.id = 'PopAllNormalWrinklerButton'),
              (e.textContent = 'Pop All Normal'),
              (e.className = 'option'),
              (e.onclick = function () {
                An();
              }),
              (e.onmouseout = function () {
                Game.tooltip.shouldHide = 1;
              }),
              (e.onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => jn('wb', 'PopAll'), 'this'),
                  Game.tooltip.wobble();
              }),
              l('sectionLeftExtra').children[0].append(e);
            const t = document.createElement('a');
            (t.id = 'PopFattestWrinklerButton'),
              (t.textContent = 'Pop Single Fattest'),
              (t.className = 'option'),
              (t.onclick = function () {
                null !== $e[1] && (Game.wrinklers[$e[1]].hp = 0);
              }),
              (t.onmouseout = function () {
                Game.tooltip.shouldHide = 1;
              }),
              (t.onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => jn('wb', 'PopFattest'), 'this'),
                  Game.tooltip.wobble();
              }),
              l('sectionLeftExtra').children[0].append(t);
          })(),
          (l('products').style.display = 'grid'),
          (l('storeBulk').style.gridRow = '1/1'),
          (l('upgrades').style.display = 'flex'),
          (l('upgrades').style['flex-wrap'] = 'wrap'),
          Object.keys(Game.Objects).forEach((e) => {
            const t = Game.Objects[e];
            null !== l(`product${t.id}`).onmouseover &&
              ((w[e] = l(`product${t.id}`).onmouseover),
              (l(`product${t.id}`).onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => jn('b', `${e}`), 'store'),
                  Game.tooltip.wobble();
              }));
          }),
          Game.canLumps() &&
            ((s = l('lumps').onmouseover),
            (l('lumps').onmouseover = function () {
              (Game.tooltip.dynamic = 1),
                Game.tooltip.draw(this, () => jn('s', 'Lump'), 'this'),
                Game.tooltip.wobble();
            })),
          (h = Game.LoadMinigames),
          (Game.LoadMinigames = function () {
            h(),
              Game.Objects.Farm.minigameLoaded &&
                ((l('gardenTool-1').onmouseover = function () {
                  (Game.tooltip.dynamic = 1),
                    Game.tooltip.draw(this, () => jn('ha', 'HarvestAllButton'), 'this'),
                    Game.tooltip.wobble();
                }),
                Array.from(l('gardenPlot').children).forEach((e) => {
                  const t = e.id.slice(-3);
                  e.onmouseover = function () {
                    (Game.tooltip.dynamic = 1),
                      Game.tooltip.draw(this, () => jn('p', [`${t[0]}`, `${t[2]}`]), 'this'),
                      Game.tooltip.wobble();
                  };
                })),
              Dn(),
              (function () {
                if (Game.Objects.Temple.minigameLoaded) {
                  for (let e = 0; e < 11; e += 1)
                    l(`templeGod${e}`).onmouseover = function () {
                      (Game.tooltip.dynamic = 1),
                        Game.tooltip.draw(this, () => jn('pag', e), 'this'),
                        Game.tooltip.wobble();
                    };
                  for (let e = 0; e < 3; e += 1)
                    l(`templeSlot${e}`).onmouseover = function () {
                      (Game.tooltip.dynamic = 1),
                        Game.tooltip.draw(
                          this,
                          () => jn('pas', [e, Game.Objects.Temple.minigame.slot[e]]),
                          'this',
                        ),
                        Game.tooltip.wobble();
                    };
                }
              })(),
              Un();
          }),
          Game.LoadMinigames(),
          (l('backgroundLeftCanvas').onmouseover = function () {
            Rt = 1;
          }),
          (l('backgroundLeftCanvas').onmouseout = function () {
            (Rt = 0),
              Game.tooltip.hide(),
              Object.keys(Game.wrinklers).forEach((e) => {
                zt[e] = 0;
              });
          }),
          ti(),
          Un(),
          Game.CalculateGains(),
          Wn(),
          ($t = Game.OnAscend),
          Game.prefs.popups
            ? Game.Popup('Cookie Monster version 2.031.7 loaded!')
            : Game.Notify('Cookie Monster version 2.031.7 loaded!', '', '', 1, 1),
          Game.Win('Third-party');
      }
      const ni = {
        init: function () {
          Bn = !0;
          let e = !0;
          Game.version !== Number('2.031') &&
            (e = confirm(
              'Cookie Monster version 2.031.7 is meant for Game version 2.031. Loading a different version may cause errors. Do you still want to load Cookie Monster?',
            )),
            e &&
              (oi(),
              Game.registerHook('click', _o),
              Game.registerHook('draw', Vo),
              Game.registerHook('logic', On),
              (Bn = !1));
        },
        load: function (e) {
          const t = JSON.parse(e);
          Sn(),
            void 0 !== t.favouriteSettings && (lo = t.favouriteSettings),
            Wn(t.settings),
            '2.031.7' !== t.version &&
              (Game.prefs.popups
                ? Game.Popup(
                    'A new version of Cookie Monster has been loaded, check out the release notes in the info tab!',
                  )
                : Game.Notify(
                    'A new version of Cookie Monster has been loaded, check out the release notes in the info tab!',
                    '',
                    '',
                    0,
                    1,
                  ));
        },
        save: xn,
      };
      Game.registerMod('CookieMonster', ni);
    })();
})();
