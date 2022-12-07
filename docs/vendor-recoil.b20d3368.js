import { r as Pc, g as dh, a as Ee } from './vendor-zustand.41246771.js'
var Mc = { exports: {} },
  be = {},
  Vc = { exports: {} },
  Ic = {}
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ ;(function (e) {
  function t(M, j) {
    var V = M.length
    M.push(j)
    e: for (; 0 < V; ) {
      var O = (V - 1) >>> 1,
        y = M[O]
      if (0 < o(y, j)) (M[O] = j), (M[V] = y), (V = O)
      else break e
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0]
  }
  function r(M) {
    if (M.length === 0) return null
    var j = M[0],
      V = M.pop()
    if (V !== j) {
      M[0] = V
      e: for (var O = 0, y = M.length, N = y >>> 1; O < N; ) {
        var A = 2 * (O + 1) - 1,
          K = M[A],
          z = A + 1,
          Y = M[z]
        if (0 > o(K, V))
          z < y && 0 > o(Y, K)
            ? ((M[O] = Y), (M[z] = V), (O = z))
            : ((M[O] = K), (M[A] = V), (O = A))
        else if (z < y && 0 > o(Y, V)) (M[O] = Y), (M[z] = V), (O = z)
        else break e
      }
    }
    return j
  }
  function o(M, j) {
    var V = M.sortIndex - j.sortIndex
    return V !== 0 ? V : M.id - j.id
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var l = performance
    e.unstable_now = function () {
      return l.now()
    }
  } else {
    var i = Date,
      u = i.now()
    e.unstable_now = function () {
      return i.now() - u
    }
  }
  var s = [],
    a = [],
    d = 1,
    p = null,
    m = 3,
    _ = !1,
    S = !1,
    w = !1,
    B = typeof setTimeout == 'function' ? setTimeout : null,
    h = typeof clearTimeout == 'function' ? clearTimeout : null,
    c = typeof setImmediate < 'u' ? setImmediate : null
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling)
  function f(M) {
    for (var j = n(a); j !== null; ) {
      if (j.callback === null) r(a)
      else if (j.startTime <= M) r(a), (j.sortIndex = j.expirationTime), t(s, j)
      else break
      j = n(a)
    }
  }
  function R(M) {
    if (((w = !1), f(M), !S))
      if (n(s) !== null) (S = !0), St(k)
      else {
        var j = n(a)
        j !== null && Ge(R, j.startTime - M)
      }
  }
  function k(M, j) {
    ;(S = !1), w && ((w = !1), h(I), (I = -1)), (_ = !0)
    var V = m
    try {
      for (f(j), p = n(s); p !== null && (!(p.expirationTime > j) || (M && !ne())); ) {
        var O = p.callback
        if (typeof O == 'function') {
          ;(p.callback = null), (m = p.priorityLevel)
          var y = O(p.expirationTime <= j)
          ;(j = e.unstable_now()),
            typeof y == 'function' ? (p.callback = y) : p === n(s) && r(s),
            f(j)
        } else r(s)
        p = n(s)
      }
      if (p !== null) var N = !0
      else {
        var A = n(a)
        A !== null && Ge(R, A.startTime - j), (N = !1)
      }
      return N
    } finally {
      ;(p = null), (m = V), (_ = !1)
    }
  }
  var C = !1,
    L = null,
    I = -1,
    b = 5,
    U = -1
  function ne() {
    return !(e.unstable_now() - U < b)
  }
  function Qe() {
    if (L !== null) {
      var M = e.unstable_now()
      U = M
      var j = !0
      try {
        j = L(!0, M)
      } finally {
        j ? de() : ((C = !1), (L = null))
      }
    } else C = !1
  }
  var de
  if (typeof c == 'function')
    de = function () {
      c(Qe)
    }
  else if (typeof MessageChannel < 'u') {
    var xe = new MessageChannel(),
      $t = xe.port2
    ;(xe.port1.onmessage = Qe),
      (de = function () {
        $t.postMessage(null)
      })
  } else
    de = function () {
      B(Qe, 0)
    }
  function St(M) {
    ;(L = M), C || ((C = !0), de())
  }
  function Ge(M, j) {
    I = B(function () {
      M(e.unstable_now())
    }, j)
  }
  ;(e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null
    }),
    (e.unstable_continueExecution = function () {
      S || _ || ((S = !0), St(k))
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (b = 0 < M ? Math.floor(1e3 / M) : 5)
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s)
    }),
    (e.unstable_next = function (M) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var j = 3
          break
        default:
          j = m
      }
      var V = m
      m = j
      try {
        return M()
      } finally {
        m = V
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, j) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break
        default:
          M = 3
      }
      var V = m
      m = M
      try {
        return j()
      } finally {
        m = V
      }
    }),
    (e.unstable_scheduleCallback = function (M, j, V) {
      var O = e.unstable_now()
      switch (
        (typeof V == 'object' && V !== null
          ? ((V = V.delay), (V = typeof V == 'number' && 0 < V ? O + V : O))
          : (V = O),
        M)
      ) {
        case 1:
          var y = -1
          break
        case 2:
          y = 250
          break
        case 5:
          y = 1073741823
          break
        case 4:
          y = 1e4
          break
        default:
          y = 5e3
      }
      return (
        (y = V + y),
        (M = {
          id: d++,
          callback: j,
          priorityLevel: M,
          startTime: V,
          expirationTime: y,
          sortIndex: -1,
        }),
        V > O
          ? ((M.sortIndex = V),
            t(a, M),
            n(s) === null && M === n(a) && (w ? (h(I), (I = -1)) : (w = !0), Ge(R, V - O)))
          : ((M.sortIndex = y), t(s, M), S || _ || ((S = !0), St(k))),
        M
      )
    }),
    (e.unstable_shouldYield = ne),
    (e.unstable_wrapCallback = function (M) {
      var j = m
      return function () {
        var V = m
        m = j
        try {
          return M.apply(this, arguments)
        } finally {
          m = V
        }
      }
    })
})(Ic)
;(function (e) {
  e.exports = Ic
})(Vc)
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zc = Pc.exports,
  qe = Vc.exports
function T(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n])
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  )
}
var Dc = new Set(),
  Hr = {}
function kn(e, t) {
  Jn(e, t), Jn(e + 'Capture', t)
}
function Jn(e, t) {
  for (Hr[e] = t, e = 0; e < t.length; e++) Dc.add(t[e])
}
var Mt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  Ki = Object.prototype.hasOwnProperty,
  ph =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  oa = {},
  la = {}
function hh(e) {
  return Ki.call(la, e) ? !0 : Ki.call(oa, e) ? !1 : ph.test(e) ? (la[e] = !0) : ((oa[e] = !0), !1)
}
function vh(e, t, n, r) {
  if (n !== null && n.type === 0) return !1
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0
    case 'boolean':
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-')
    default:
      return !1
  }
}
function mh(e, t, n, r) {
  if (t === null || typeof t > 'u' || vh(e, t, n, r)) return !0
  if (r) return !1
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t
      case 4:
        return t === !1
      case 5:
        return isNaN(t)
      case 6:
        return isNaN(t) || 1 > t
    }
  return !1
}
function Ue(e, t, n, r, o, l, i) {
  ;(this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = i)
}
var Ae = {}
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    Ae[e] = new Ue(e, 0, !1, e, null, !1, !1)
  })
;[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0]
  Ae[t] = new Ue(t, 1, !1, e[1], null, !1, !1)
})
;['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  Ae[e] = new Ue(e, 2, !1, e.toLowerCase(), null, !1, !1)
})
;['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
  Ae[e] = new Ue(e, 2, !1, e, null, !1, !1)
})
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    Ae[e] = new Ue(e, 3, !1, e.toLowerCase(), null, !1, !1)
  })
;['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  Ae[e] = new Ue(e, 3, !0, e, null, !1, !1)
})
;['capture', 'download'].forEach(function (e) {
  Ae[e] = new Ue(e, 4, !1, e, null, !1, !1)
})
;['cols', 'rows', 'size', 'span'].forEach(function (e) {
  Ae[e] = new Ue(e, 6, !1, e, null, !1, !1)
})
;['rowSpan', 'start'].forEach(function (e) {
  Ae[e] = new Ue(e, 5, !1, e.toLowerCase(), null, !1, !1)
})
var Ku = /[\-:]([a-z])/g
function Qu(e) {
  return e[1].toUpperCase()
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ku, Qu)
    Ae[t] = new Ue(t, 1, !1, e, null, !1, !1)
  })
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ku, Qu)
    Ae[t] = new Ue(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
  })
;['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Ku, Qu)
  Ae[t] = new Ue(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1)
})
;['tabIndex', 'crossOrigin'].forEach(function (e) {
  Ae[e] = new Ue(e, 1, !1, e.toLowerCase(), null, !1, !1)
})
Ae.xlinkHref = new Ue('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)
;['src', 'href', 'action', 'formAction'].forEach(function (e) {
  Ae[e] = new Ue(e, 1, !1, e.toLowerCase(), null, !0, !0)
})
function Gu(e, t, n, r) {
  var o = Ae.hasOwnProperty(t) ? Ae[t] : null
  ;(o !== null
    ? o.type !== 0
    : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
    (mh(t, n, o, r) && (n = null),
    r || o === null
      ? hh(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : o.mustUseProperty
      ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : '') : n)
      : ((t = o.attributeName),
        (r = o.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (n = o === 3 || (o === 4 && n === !0) ? '' : '' + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Dt = zc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  _o = Symbol.for('react.element'),
  Mn = Symbol.for('react.portal'),
  Vn = Symbol.for('react.fragment'),
  Yu = Symbol.for('react.strict_mode'),
  Qi = Symbol.for('react.profiler'),
  Uc = Symbol.for('react.provider'),
  $c = Symbol.for('react.context'),
  Zu = Symbol.for('react.forward_ref'),
  Gi = Symbol.for('react.suspense'),
  Yi = Symbol.for('react.suspense_list'),
  Xu = Symbol.for('react.memo'),
  Ft = Symbol.for('react.lazy'),
  Oc = Symbol.for('react.offscreen'),
  ia = Symbol.iterator
function hr(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (ia && e[ia]) || e['@@iterator']), typeof e == 'function' ? e : null)
}
var me = Object.assign,
  di
function Cr(e) {
  if (di === void 0)
    try {
      throw Error()
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/)
      di = (t && t[1]) || ''
    }
  return (
    `
` +
    di +
    e
  )
}
var pi = !1
function hi(e, t) {
  if (!e || pi) return ''
  pi = !0
  var n = Error.prepareStackTrace
  Error.prepareStackTrace = void 0
  try {
    if (t)
      if (
        ((t = function () {
          throw Error()
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error()
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, [])
        } catch (a) {
          var r = a
        }
        Reflect.construct(e, [], t)
      } else {
        try {
          t.call()
        } catch (a) {
          r = a
        }
        e.call(t.prototype)
      }
    else {
      try {
        throw Error()
      } catch (a) {
        r = a
      }
      e()
    }
  } catch (a) {
    if (a && r && typeof a.stack == 'string') {
      for (
        var o = a.stack.split(`
`),
          l = r.stack.split(`
`),
          i = o.length - 1,
          u = l.length - 1;
        1 <= i && 0 <= u && o[i] !== l[u];

      )
        u--
      for (; 1 <= i && 0 <= u; i--, u--)
        if (o[i] !== l[u]) {
          if (i !== 1 || u !== 1)
            do
              if ((i--, u--, 0 > u || o[i] !== l[u])) {
                var s =
                  `
` + o[i].replace(' at new ', ' at ')
                return (
                  e.displayName &&
                    s.includes('<anonymous>') &&
                    (s = s.replace('<anonymous>', e.displayName)),
                  s
                )
              }
            while (1 <= i && 0 <= u)
          break
        }
    }
  } finally {
    ;(pi = !1), (Error.prepareStackTrace = n)
  }
  return (e = e ? e.displayName || e.name : '') ? Cr(e) : ''
}
function yh(e) {
  switch (e.tag) {
    case 5:
      return Cr(e.type)
    case 16:
      return Cr('Lazy')
    case 13:
      return Cr('Suspense')
    case 19:
      return Cr('SuspenseList')
    case 0:
    case 2:
    case 15:
      return (e = hi(e.type, !1)), e
    case 11:
      return (e = hi(e.type.render, !1)), e
    case 1:
      return (e = hi(e.type, !0)), e
    default:
      return ''
  }
}
function Zi(e) {
  if (e == null) return null
  if (typeof e == 'function') return e.displayName || e.name || null
  if (typeof e == 'string') return e
  switch (e) {
    case Vn:
      return 'Fragment'
    case Mn:
      return 'Portal'
    case Qi:
      return 'Profiler'
    case Yu:
      return 'StrictMode'
    case Gi:
      return 'Suspense'
    case Yi:
      return 'SuspenseList'
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case $c:
        return (e.displayName || 'Context') + '.Consumer'
      case Uc:
        return (e._context.displayName || 'Context') + '.Provider'
      case Zu:
        var t = e.render
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        )
      case Xu:
        return (t = e.displayName || null), t !== null ? t : Zi(e.type) || 'Memo'
      case Ft:
        ;(t = e._payload), (e = e._init)
        try {
          return Zi(e(t))
        } catch {}
    }
  return null
}
function gh(e) {
  var t = e.type
  switch (e.tag) {
    case 24:
      return 'Cache'
    case 9:
      return (t.displayName || 'Context') + '.Consumer'
    case 10:
      return (t._context.displayName || 'Context') + '.Provider'
    case 18:
      return 'DehydratedFragment'
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      )
    case 7:
      return 'Fragment'
    case 5:
      return t
    case 4:
      return 'Portal'
    case 3:
      return 'Root'
    case 6:
      return 'Text'
    case 16:
      return Zi(t)
    case 8:
      return t === Yu ? 'StrictMode' : 'Mode'
    case 22:
      return 'Offscreen'
    case 12:
      return 'Profiler'
    case 21:
      return 'Scope'
    case 13:
      return 'Suspense'
    case 19:
      return 'SuspenseList'
    case 25:
      return 'TracingMarker'
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null
      if (typeof t == 'string') return t
  }
  return null
}
function tn(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e
    case 'object':
      return e
    default:
      return ''
  }
}
function Fc(e) {
  var t = e.type
  return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio')
}
function Sh(e) {
  var t = Fc(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t]
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var o = n.get,
      l = n.set
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this)
        },
        set: function (i) {
          ;(r = '' + i), l.call(this, i)
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r
        },
        setValue: function (i) {
          r = '' + i
        },
        stopTracking: function () {
          ;(e._valueTracker = null), delete e[t]
        },
      }
    )
  }
}
function wo(e) {
  e._valueTracker || (e._valueTracker = Sh(e))
}
function Bc(e) {
  if (!e) return !1
  var t = e._valueTracker
  if (!t) return !0
  var n = t.getValue(),
    r = ''
  return (
    e && (r = Fc(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  )
}
function qo(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null
  try {
    return e.activeElement || e.body
  } catch {
    return e.body
  }
}
function Xi(e, t) {
  var n = t.checked
  return me({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n != null ? n : e._wrapperState.initialChecked,
  })
}
function ua(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked
  ;(n = tn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
    })
}
function jc(e, t) {
  ;(t = t.checked), t != null && Gu(e, 'checked', t, !1)
}
function Ji(e, t) {
  jc(e, t)
  var n = tn(t.value),
    r = t.type
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n)
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value')
    return
  }
  t.hasOwnProperty('value')
    ? qi(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && qi(e, t.type, tn(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function sa(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type
    if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return
    ;(t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t)
  }
  ;(n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n)
}
function qi(e, t, n) {
  ;(t !== 'number' || qo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n))
}
var Lr = Array.isArray
function Hn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {}
    for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0)
  } else {
    for (n = '' + tn(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ;(e[o].selected = !0), r && (e[o].defaultSelected = !0)
        return
      }
      t !== null || e[o].disabled || (t = e[o])
    }
    t !== null && (t.selected = !0)
  }
}
function bi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(T(91))
  return me({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  })
}
function aa(e, t) {
  var n = t.value
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(T(92))
      if (Lr(n)) {
        if (1 < n.length) throw Error(T(93))
        n = n[0]
      }
      t = n
    }
    t == null && (t = ''), (n = t)
  }
  e._wrapperState = { initialValue: tn(n) }
}
function Wc(e, t) {
  var n = tn(t.value),
    r = tn(t.defaultValue)
  n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r)
}
function ca(e) {
  var t = e.textContent
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t)
}
function Hc(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg'
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML'
    default:
      return 'http://www.w3.org/1999/xhtml'
  }
}
function eu(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Hc(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
    ? 'http://www.w3.org/1999/xhtml'
    : e
}
var Ro,
  Kc = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o)
          })
        }
      : e
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t
    else {
      for (
        Ro = Ro || document.createElement('div'),
          Ro.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Ro.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild)
      for (; t.firstChild; ) e.appendChild(t.firstChild)
    }
  })
function Kr(e, t) {
  if (t) {
    var n = e.firstChild
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t
      return
    }
  }
  e.textContent = t
}
var Mr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  _h = ['Webkit', 'ms', 'Moz', 'O']
Object.keys(Mr).forEach(function (e) {
  _h.forEach(function (t) {
    ;(t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Mr[t] = Mr[e])
  })
})
function Qc(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (Mr.hasOwnProperty(e) && Mr[e])
    ? ('' + t).trim()
    : t + 'px'
}
function Gc(e, t) {
  e = e.style
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        o = Qc(n, t[n], r)
      n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, o) : (e[n] = o)
    }
}
var wh = me(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
)
function tu(e, t) {
  if (t) {
    if (wh[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(T(137, e))
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(T(60))
      if (typeof t.dangerouslySetInnerHTML != 'object' || !('__html' in t.dangerouslySetInnerHTML))
        throw Error(T(61))
    }
    if (t.style != null && typeof t.style != 'object') throw Error(T(62))
  }
}
function nu(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string'
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1
    default:
      return !0
  }
}
var ru = null
function Ju(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  )
}
var ou = null,
  Kn = null,
  Qn = null
function fa(e) {
  if ((e = ao(e))) {
    if (typeof ou != 'function') throw Error(T(280))
    var t = e.stateNode
    t && ((t = Pl(t)), ou(e.stateNode, e.type, t))
  }
}
function Yc(e) {
  Kn ? (Qn ? Qn.push(e) : (Qn = [e])) : (Kn = e)
}
function Zc() {
  if (Kn) {
    var e = Kn,
      t = Qn
    if (((Qn = Kn = null), fa(e), t)) for (e = 0; e < t.length; e++) fa(t[e])
  }
}
function Xc(e, t) {
  return e(t)
}
function Jc() {}
var vi = !1
function qc(e, t, n) {
  if (vi) return e(t, n)
  vi = !0
  try {
    return Xc(e, t, n)
  } finally {
    ;(vi = !1), (Kn !== null || Qn !== null) && (Jc(), Zc())
  }
}
function Qr(e, t) {
  var n = e.stateNode
  if (n === null) return null
  var r = Pl(n)
  if (r === null) return null
  n = r[t]
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ;(r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
        (e = !r)
      break e
    default:
      e = !1
  }
  if (e) return null
  if (n && typeof n != 'function') throw Error(T(231, t, typeof n))
  return n
}
var lu = !1
if (Mt)
  try {
    var vr = {}
    Object.defineProperty(vr, 'passive', {
      get: function () {
        lu = !0
      },
    }),
      window.addEventListener('test', vr, vr),
      window.removeEventListener('test', vr, vr)
  } catch {
    lu = !1
  }
function Rh(e, t, n, r, o, l, i, u, s) {
  var a = Array.prototype.slice.call(arguments, 3)
  try {
    t.apply(n, a)
  } catch (d) {
    this.onError(d)
  }
}
var Vr = !1,
  bo = null,
  el = !1,
  iu = null,
  Eh = {
    onError: function (e) {
      ;(Vr = !0), (bo = e)
    },
  }
function Th(e, t, n, r, o, l, i, u, s) {
  ;(Vr = !1), (bo = null), Rh.apply(Eh, arguments)
}
function kh(e, t, n, r, o, l, i, u, s) {
  if ((Th.apply(this, arguments), Vr)) {
    if (Vr) {
      var a = bo
      ;(Vr = !1), (bo = null)
    } else throw Error(T(198))
    el || ((el = !0), (iu = a))
  }
}
function Nn(e) {
  var t = e,
    n = e
  if (e.alternate) for (; t.return; ) t = t.return
  else {
    e = t
    do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return)
    while (e)
  }
  return t.tag === 3 ? n : null
}
function bc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated
  }
  return null
}
function da(e) {
  if (Nn(e) !== e) throw Error(T(188))
}
function Nh(e) {
  var t = e.alternate
  if (!t) {
    if (((t = Nn(e)), t === null)) throw Error(T(188))
    return t !== e ? null : e
  }
  for (var n = e, r = t; ; ) {
    var o = n.return
    if (o === null) break
    var l = o.alternate
    if (l === null) {
      if (((r = o.return), r !== null)) {
        n = r
        continue
      }
      break
    }
    if (o.child === l.child) {
      for (l = o.child; l; ) {
        if (l === n) return da(o), e
        if (l === r) return da(o), t
        l = l.sibling
      }
      throw Error(T(188))
    }
    if (n.return !== r.return) (n = o), (r = l)
    else {
      for (var i = !1, u = o.child; u; ) {
        if (u === n) {
          ;(i = !0), (n = o), (r = l)
          break
        }
        if (u === r) {
          ;(i = !0), (r = o), (n = l)
          break
        }
        u = u.sibling
      }
      if (!i) {
        for (u = l.child; u; ) {
          if (u === n) {
            ;(i = !0), (n = l), (r = o)
            break
          }
          if (u === r) {
            ;(i = !0), (r = l), (n = o)
            break
          }
          u = u.sibling
        }
        if (!i) throw Error(T(189))
      }
    }
    if (n.alternate !== r) throw Error(T(190))
  }
  if (n.tag !== 3) throw Error(T(188))
  return n.stateNode.current === n ? e : t
}
function ef(e) {
  return (e = Nh(e)), e !== null ? tf(e) : null
}
function tf(e) {
  if (e.tag === 5 || e.tag === 6) return e
  for (e = e.child; e !== null; ) {
    var t = tf(e)
    if (t !== null) return t
    e = e.sibling
  }
  return null
}
var nf = qe.unstable_scheduleCallback,
  pa = qe.unstable_cancelCallback,
  Ch = qe.unstable_shouldYield,
  Lh = qe.unstable_requestPaint,
  ge = qe.unstable_now,
  Ah = qe.unstable_getCurrentPriorityLevel,
  qu = qe.unstable_ImmediatePriority,
  rf = qe.unstable_UserBlockingPriority,
  tl = qe.unstable_NormalPriority,
  xh = qe.unstable_LowPriority,
  of = qe.unstable_IdlePriority,
  Cl = null,
  Et = null
function Ph(e) {
  if (Et && typeof Et.onCommitFiberRoot == 'function')
    try {
      Et.onCommitFiberRoot(Cl, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var mt = Math.clz32 ? Math.clz32 : Ih,
  Mh = Math.log,
  Vh = Math.LN2
function Ih(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Mh(e) / Vh) | 0)) | 0
}
var Eo = 64,
  To = 4194304
function Ar(e) {
  switch (e & -e) {
    case 1:
      return 1
    case 2:
      return 2
    case 4:
      return 4
    case 8:
      return 8
    case 16:
      return 16
    case 32:
      return 32
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424
    case 134217728:
      return 134217728
    case 268435456:
      return 268435456
    case 536870912:
      return 536870912
    case 1073741824:
      return 1073741824
    default:
      return e
  }
}
function nl(e, t) {
  var n = e.pendingLanes
  if (n === 0) return 0
  var r = 0,
    o = e.suspendedLanes,
    l = e.pingedLanes,
    i = n & 268435455
  if (i !== 0) {
    var u = i & ~o
    u !== 0 ? (r = Ar(u)) : ((l &= i), l !== 0 && (r = Ar(l)))
  } else (i = n & ~o), i !== 0 ? (r = Ar(i)) : l !== 0 && (r = Ar(l))
  if (r === 0) return 0
  if (
    t !== 0 &&
    t !== r &&
    (t & o) === 0 &&
    ((o = r & -r), (l = t & -t), o >= l || (o === 16 && (l & 4194240) !== 0))
  )
    return t
  if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - mt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o)
  return r
}
function zh(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1
    default:
      return -1
  }
}
function Dh(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes;
    0 < l;

  ) {
    var i = 31 - mt(l),
      u = 1 << i,
      s = o[i]
    s === -1
      ? ((u & n) === 0 || (u & r) !== 0) && (o[i] = zh(u, t))
      : s <= t && (e.expiredLanes |= u),
      (l &= ~u)
  }
}
function uu(e) {
  return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function lf() {
  var e = Eo
  return (Eo <<= 1), (Eo & 4194240) === 0 && (Eo = 64), e
}
function mi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e)
  return t
}
function uo(e, t, n) {
  ;(e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - mt(t)),
    (e[t] = n)
}
function Uh(e, t) {
  var n = e.pendingLanes & ~t
  ;(e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements)
  var r = e.eventTimes
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - mt(n),
      l = 1 << o
    ;(t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~l)
  }
}
function bu(e, t) {
  var n = (e.entangledLanes |= t)
  for (e = e.entanglements; n; ) {
    var r = 31 - mt(n),
      o = 1 << r
    ;(o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o)
  }
}
var ee = 0
function uf(e) {
  return (e &= -e), 1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
}
var sf,
  es,
  af,
  cf,
  ff,
  su = !1,
  ko = [],
  Gt = null,
  Yt = null,
  Zt = null,
  Gr = new Map(),
  Yr = new Map(),
  Wt = [],
  $h =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' ',
    )
function ha(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Gt = null
      break
    case 'dragenter':
    case 'dragleave':
      Yt = null
      break
    case 'mouseover':
    case 'mouseout':
      Zt = null
      break
    case 'pointerover':
    case 'pointerout':
      Gr.delete(t.pointerId)
      break
    case 'gotpointercapture':
    case 'lostpointercapture':
      Yr.delete(t.pointerId)
  }
}
function mr(e, t, n, r, o, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [o],
      }),
      t !== null && ((t = ao(t)), t !== null && es(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e)
}
function Oh(e, t, n, r, o) {
  switch (t) {
    case 'focusin':
      return (Gt = mr(Gt, e, t, n, r, o)), !0
    case 'dragenter':
      return (Yt = mr(Yt, e, t, n, r, o)), !0
    case 'mouseover':
      return (Zt = mr(Zt, e, t, n, r, o)), !0
    case 'pointerover':
      var l = o.pointerId
      return Gr.set(l, mr(Gr.get(l) || null, e, t, n, r, o)), !0
    case 'gotpointercapture':
      return (l = o.pointerId), Yr.set(l, mr(Yr.get(l) || null, e, t, n, r, o)), !0
  }
  return !1
}
function df(e) {
  var t = pn(e.target)
  if (t !== null) {
    var n = Nn(t)
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = bc(n)), t !== null)) {
          ;(e.blockedOn = t),
            ff(e.priority, function () {
              af(n)
            })
          return
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
        return
      }
    }
  }
  e.blockedOn = null
}
function Bo(e) {
  if (e.blockedOn !== null) return !1
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = au(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent)
    if (n === null) {
      n = e.nativeEvent
      var r = new n.constructor(n.type, n)
      ;(ru = r), n.target.dispatchEvent(r), (ru = null)
    } else return (t = ao(n)), t !== null && es(t), (e.blockedOn = n), !1
    t.shift()
  }
  return !0
}
function va(e, t, n) {
  Bo(e) && n.delete(t)
}
function Fh() {
  ;(su = !1),
    Gt !== null && Bo(Gt) && (Gt = null),
    Yt !== null && Bo(Yt) && (Yt = null),
    Zt !== null && Bo(Zt) && (Zt = null),
    Gr.forEach(va),
    Yr.forEach(va)
}
function yr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    su || ((su = !0), qe.unstable_scheduleCallback(qe.unstable_NormalPriority, Fh)))
}
function Zr(e) {
  function t(o) {
    return yr(o, e)
  }
  if (0 < ko.length) {
    yr(ko[0], e)
    for (var n = 1; n < ko.length; n++) {
      var r = ko[n]
      r.blockedOn === e && (r.blockedOn = null)
    }
  }
  for (
    Gt !== null && yr(Gt, e),
      Yt !== null && yr(Yt, e),
      Zt !== null && yr(Zt, e),
      Gr.forEach(t),
      Yr.forEach(t),
      n = 0;
    n < Wt.length;
    n++
  )
    (r = Wt[n]), r.blockedOn === e && (r.blockedOn = null)
  for (; 0 < Wt.length && ((n = Wt[0]), n.blockedOn === null); )
    df(n), n.blockedOn === null && Wt.shift()
}
var Gn = Dt.ReactCurrentBatchConfig,
  rl = !0
function Bh(e, t, n, r) {
  var o = ee,
    l = Gn.transition
  Gn.transition = null
  try {
    ;(ee = 1), ts(e, t, n, r)
  } finally {
    ;(ee = o), (Gn.transition = l)
  }
}
function jh(e, t, n, r) {
  var o = ee,
    l = Gn.transition
  Gn.transition = null
  try {
    ;(ee = 4), ts(e, t, n, r)
  } finally {
    ;(ee = o), (Gn.transition = l)
  }
}
function ts(e, t, n, r) {
  if (rl) {
    var o = au(e, t, n, r)
    if (o === null) Ni(e, t, r, ol, n), ha(e, r)
    else if (Oh(o, e, t, n, r)) r.stopPropagation()
    else if ((ha(e, r), t & 4 && -1 < $h.indexOf(e))) {
      for (; o !== null; ) {
        var l = ao(o)
        if ((l !== null && sf(l), (l = au(e, t, n, r)), l === null && Ni(e, t, r, ol, n), l === o))
          break
        o = l
      }
      o !== null && r.stopPropagation()
    } else Ni(e, t, r, null, n)
  }
}
var ol = null
function au(e, t, n, r) {
  if (((ol = null), (e = Ju(r)), (e = pn(e)), e !== null))
    if (((t = Nn(e)), t === null)) e = null
    else if (((n = t.tag), n === 13)) {
      if (((e = bc(t)), e !== null)) return e
      e = null
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null
      e = null
    } else t !== e && (e = null)
  return (ol = e), null
}
function pf(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4
    case 'message':
      switch (Ah()) {
        case qu:
          return 1
        case rf:
          return 4
        case tl:
        case xh:
          return 16
        case of:
          return 536870912
        default:
          return 16
      }
    default:
      return 16
  }
}
var Kt = null,
  ns = null,
  jo = null
function hf() {
  if (jo) return jo
  var e,
    t = ns,
    n = t.length,
    r,
    o = 'value' in Kt ? Kt.value : Kt.textContent,
    l = o.length
  for (e = 0; e < n && t[e] === o[e]; e++);
  var i = n - e
  for (r = 1; r <= i && t[n - r] === o[l - r]; r++);
  return (jo = o.slice(e, 1 < r ? 1 - r : void 0))
}
function Wo(e) {
  var t = e.keyCode
  return (
    'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  )
}
function No() {
  return !0
}
function ma() {
  return !1
}
function et(e) {
  function t(n, r, o, l, i) {
    ;(this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = l),
      (this.target = i),
      (this.currentTarget = null)
    for (var u in e) e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(l) : l[u]))
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? No
        : ma),
      (this.isPropagationStopped = ma),
      this
    )
  }
  return (
    me(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0
        var n = this.nativeEvent
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = No))
      },
      stopPropagation: function () {
        var n = this.nativeEvent
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = No))
      },
      persist: function () {},
      isPersistent: No,
    }),
    t
  )
}
var ar = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  rs = et(ar),
  so = me({}, ar, { view: 0, detail: 0 }),
  Wh = et(so),
  yi,
  gi,
  gr,
  Ll = me({}, so, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: os,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== gr &&
            (gr && e.type === 'mousemove'
              ? ((yi = e.screenX - gr.screenX), (gi = e.screenY - gr.screenY))
              : (gi = yi = 0),
            (gr = e)),
          yi)
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : gi
    },
  }),
  ya = et(Ll),
  Hh = me({}, Ll, { dataTransfer: 0 }),
  Kh = et(Hh),
  Qh = me({}, so, { relatedTarget: 0 }),
  Si = et(Qh),
  Gh = me({}, ar, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Yh = et(Gh),
  Zh = me({}, ar, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData
    },
  }),
  Xh = et(Zh),
  Jh = me({}, ar, { data: 0 }),
  ga = et(Jh),
  qh = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  bh = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  ev = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
function tv(e) {
  var t = this.nativeEvent
  return t.getModifierState ? t.getModifierState(e) : (e = ev[e]) ? !!t[e] : !1
}
function os() {
  return tv
}
var nv = me({}, so, {
    key: function (e) {
      if (e.key) {
        var t = qh[e.key] || e.key
        if (t !== 'Unidentified') return t
      }
      return e.type === 'keypress'
        ? ((e = Wo(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
        ? bh[e.keyCode] || 'Unidentified'
        : ''
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: os,
    charCode: function (e) {
      return e.type === 'keypress' ? Wo(e) : 0
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Wo(e)
        : e.type === 'keydown' || e.type === 'keyup'
        ? e.keyCode
        : 0
    },
  }),
  rv = et(nv),
  ov = me({}, Ll, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Sa = et(ov),
  lv = me({}, so, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: os,
  }),
  iv = et(lv),
  uv = me({}, ar, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  sv = et(uv),
  av = me({}, Ll, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
        ? -e.wheelDeltaY
        : 'wheelDelta' in e
        ? -e.wheelDelta
        : 0
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  cv = et(av),
  fv = [9, 13, 27, 32],
  ls = Mt && 'CompositionEvent' in window,
  Ir = null
Mt && 'documentMode' in document && (Ir = document.documentMode)
var dv = Mt && 'TextEvent' in window && !Ir,
  vf = Mt && (!ls || (Ir && 8 < Ir && 11 >= Ir)),
  _a = String.fromCharCode(32),
  wa = !1
function mf(e, t) {
  switch (e) {
    case 'keyup':
      return fv.indexOf(t.keyCode) !== -1
    case 'keydown':
      return t.keyCode !== 229
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0
    default:
      return !1
  }
}
function yf(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null
}
var In = !1
function pv(e, t) {
  switch (e) {
    case 'compositionend':
      return yf(t)
    case 'keypress':
      return t.which !== 32 ? null : ((wa = !0), _a)
    case 'textInput':
      return (e = t.data), e === _a && wa ? null : e
    default:
      return null
  }
}
function hv(e, t) {
  if (In)
    return e === 'compositionend' || (!ls && mf(e, t))
      ? ((e = hf()), (jo = ns = Kt = null), (In = !1), e)
      : null
  switch (e) {
    case 'paste':
      return null
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char
        if (t.which) return String.fromCharCode(t.which)
      }
      return null
    case 'compositionend':
      return vf && t.locale !== 'ko' ? null : t.data
    default:
      return null
  }
}
var vv = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
}
function Ra(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return t === 'input' ? !!vv[e.type] : t === 'textarea'
}
function gf(e, t, n, r) {
  Yc(r),
    (t = ll(t, 'onChange')),
    0 < t.length &&
      ((n = new rs('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t }))
}
var zr = null,
  Xr = null
function mv(e) {
  Af(e, 0)
}
function Al(e) {
  var t = Un(e)
  if (Bc(t)) return e
}
function yv(e, t) {
  if (e === 'change') return t
}
var Sf = !1
if (Mt) {
  var _i
  if (Mt) {
    var wi = 'oninput' in document
    if (!wi) {
      var Ea = document.createElement('div')
      Ea.setAttribute('oninput', 'return;'), (wi = typeof Ea.oninput == 'function')
    }
    _i = wi
  } else _i = !1
  Sf = _i && (!document.documentMode || 9 < document.documentMode)
}
function Ta() {
  zr && (zr.detachEvent('onpropertychange', _f), (Xr = zr = null))
}
function _f(e) {
  if (e.propertyName === 'value' && Al(Xr)) {
    var t = []
    gf(t, Xr, e, Ju(e)), qc(mv, t)
  }
}
function gv(e, t, n) {
  e === 'focusin'
    ? (Ta(), (zr = t), (Xr = n), zr.attachEvent('onpropertychange', _f))
    : e === 'focusout' && Ta()
}
function Sv(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Al(Xr)
}
function _v(e, t) {
  if (e === 'click') return Al(t)
}
function wv(e, t) {
  if (e === 'input' || e === 'change') return Al(t)
}
function Rv(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
}
var gt = typeof Object.is == 'function' ? Object.is : Rv
function Jr(e, t) {
  if (gt(e, t)) return !0
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1
  var n = Object.keys(e),
    r = Object.keys(t)
  if (n.length !== r.length) return !1
  for (r = 0; r < n.length; r++) {
    var o = n[r]
    if (!Ki.call(t, o) || !gt(e[o], t[o])) return !1
  }
  return !0
}
function ka(e) {
  for (; e && e.firstChild; ) e = e.firstChild
  return e
}
function Na(e, t) {
  var n = ka(e)
  e = 0
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e }
      e = r
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling
          break e
        }
        n = n.parentNode
      }
      n = void 0
    }
    n = ka(n)
  }
}
function wf(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? wf(e, t.parentNode)
      : 'contains' in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1
}
function Rf() {
  for (var e = window, t = qo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string'
    } catch {
      n = !1
    }
    if (n) e = t.contentWindow
    else break
    t = qo(e.document)
  }
  return t
}
function is(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  )
}
function Ev(e) {
  var t = Rf(),
    n = e.focusedElem,
    r = e.selectionRange
  if (t !== n && n && n.ownerDocument && wf(n.ownerDocument.documentElement, n)) {
    if (r !== null && is(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length))
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
      ) {
        e = e.getSelection()
        var o = n.textContent.length,
          l = Math.min(r.start, o)
        ;(r = r.end === void 0 ? l : Math.min(r.end, o)),
          !e.extend && l > r && ((o = r), (r = l), (l = o)),
          (o = Na(n, l))
        var i = Na(n, r)
        o &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          l > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)))
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop })
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top)
  }
}
var Tv = Mt && 'documentMode' in document && 11 >= document.documentMode,
  zn = null,
  cu = null,
  Dr = null,
  fu = !1
function Ca(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
  fu ||
    zn == null ||
    zn !== qo(r) ||
    ((r = zn),
    'selectionStart' in r && is(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Dr && Jr(Dr, r)) ||
      ((Dr = r),
      (r = ll(cu, 'onSelect')),
      0 < r.length &&
        ((t = new rs('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = zn))))
}
function Co(e, t) {
  var n = {}
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  )
}
var Dn = {
    animationend: Co('Animation', 'AnimationEnd'),
    animationiteration: Co('Animation', 'AnimationIteration'),
    animationstart: Co('Animation', 'AnimationStart'),
    transitionend: Co('Transition', 'TransitionEnd'),
  },
  Ri = {},
  Ef = {}
Mt &&
  ((Ef = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Dn.animationend.animation,
    delete Dn.animationiteration.animation,
    delete Dn.animationstart.animation),
  'TransitionEvent' in window || delete Dn.transitionend.transition)
function xl(e) {
  if (Ri[e]) return Ri[e]
  if (!Dn[e]) return e
  var t = Dn[e],
    n
  for (n in t) if (t.hasOwnProperty(n) && n in Ef) return (Ri[e] = t[n])
  return e
}
var Tf = xl('animationend'),
  kf = xl('animationiteration'),
  Nf = xl('animationstart'),
  Cf = xl('transitionend'),
  Lf = new Map(),
  La =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' ',
    )
function rn(e, t) {
  Lf.set(e, t), kn(t, [e])
}
for (var Ei = 0; Ei < La.length; Ei++) {
  var Ti = La[Ei],
    kv = Ti.toLowerCase(),
    Nv = Ti[0].toUpperCase() + Ti.slice(1)
  rn(kv, 'on' + Nv)
}
rn(Tf, 'onAnimationEnd')
rn(kf, 'onAnimationIteration')
rn(Nf, 'onAnimationStart')
rn('dblclick', 'onDoubleClick')
rn('focusin', 'onFocus')
rn('focusout', 'onBlur')
rn(Cf, 'onTransitionEnd')
Jn('onMouseEnter', ['mouseout', 'mouseover'])
Jn('onMouseLeave', ['mouseout', 'mouseover'])
Jn('onPointerEnter', ['pointerout', 'pointerover'])
Jn('onPointerLeave', ['pointerout', 'pointerover'])
kn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '))
kn(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(' '),
)
kn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste'])
kn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '))
kn('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '))
kn('onCompositionUpdate', 'compositionupdate focusout keydown keypress keyup mousedown'.split(' '))
var xr =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' ',
    ),
  Cv = new Set('cancel close invalid load scroll toggle'.split(' ').concat(xr))
function Aa(e, t, n) {
  var r = e.type || 'unknown-event'
  ;(e.currentTarget = n), kh(r, t, void 0, e), (e.currentTarget = null)
}
function Af(e, t) {
  t = (t & 4) !== 0
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event
    r = r.listeners
    e: {
      var l = void 0
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i],
            s = u.instance,
            a = u.currentTarget
          if (((u = u.listener), s !== l && o.isPropagationStopped())) break e
          Aa(o, u, a), (l = s)
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((u = r[i]),
            (s = u.instance),
            (a = u.currentTarget),
            (u = u.listener),
            s !== l && o.isPropagationStopped())
          )
            break e
          Aa(o, u, a), (l = s)
        }
    }
  }
  if (el) throw ((e = iu), (el = !1), (iu = null), e)
}
function le(e, t) {
  var n = t[mu]
  n === void 0 && (n = t[mu] = new Set())
  var r = e + '__bubble'
  n.has(r) || (xf(t, e, 2, !1), n.add(r))
}
function ki(e, t, n) {
  var r = 0
  t && (r |= 4), xf(n, e, r, t)
}
var Lo = '_reactListening' + Math.random().toString(36).slice(2)
function qr(e) {
  if (!e[Lo]) {
    ;(e[Lo] = !0),
      Dc.forEach(function (n) {
        n !== 'selectionchange' && (Cv.has(n) || ki(n, !1, e), ki(n, !0, e))
      })
    var t = e.nodeType === 9 ? e : e.ownerDocument
    t === null || t[Lo] || ((t[Lo] = !0), ki('selectionchange', !1, t))
  }
}
function xf(e, t, n, r) {
  switch (pf(t)) {
    case 1:
      var o = Bh
      break
    case 4:
      o = jh
      break
    default:
      o = ts
  }
  ;(n = o.bind(null, t, n, e)),
    (o = void 0),
    !lu || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1)
}
function Ni(e, t, n, r, o) {
  var l = r
  if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
    e: for (;;) {
      if (r === null) return
      var i = r.tag
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo
        if (u === o || (u.nodeType === 8 && u.parentNode === o)) break
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var s = i.tag
            if (
              (s === 3 || s === 4) &&
              ((s = i.stateNode.containerInfo), s === o || (s.nodeType === 8 && s.parentNode === o))
            )
              return
            i = i.return
          }
        for (; u !== null; ) {
          if (((i = pn(u)), i === null)) return
          if (((s = i.tag), s === 5 || s === 6)) {
            r = l = i
            continue e
          }
          u = u.parentNode
        }
      }
      r = r.return
    }
  qc(function () {
    var a = l,
      d = Ju(n),
      p = []
    e: {
      var m = Lf.get(e)
      if (m !== void 0) {
        var _ = rs,
          S = e
        switch (e) {
          case 'keypress':
            if (Wo(n) === 0) break e
          case 'keydown':
          case 'keyup':
            _ = rv
            break
          case 'focusin':
            ;(S = 'focus'), (_ = Si)
            break
          case 'focusout':
            ;(S = 'blur'), (_ = Si)
            break
          case 'beforeblur':
          case 'afterblur':
            _ = Si
            break
          case 'click':
            if (n.button === 2) break e
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            _ = ya
            break
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            _ = Kh
            break
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            _ = iv
            break
          case Tf:
          case kf:
          case Nf:
            _ = Yh
            break
          case Cf:
            _ = sv
            break
          case 'scroll':
            _ = Wh
            break
          case 'wheel':
            _ = cv
            break
          case 'copy':
          case 'cut':
          case 'paste':
            _ = Xh
            break
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            _ = Sa
        }
        var w = (t & 4) !== 0,
          B = !w && e === 'scroll',
          h = w ? (m !== null ? m + 'Capture' : null) : m
        w = []
        for (var c = a, f; c !== null; ) {
          f = c
          var R = f.stateNode
          if (
            (f.tag === 5 &&
              R !== null &&
              ((f = R), h !== null && ((R = Qr(c, h)), R != null && w.push(br(c, R, f)))),
            B)
          )
            break
          c = c.return
        }
        0 < w.length && ((m = new _(m, S, null, n, d)), p.push({ event: m, listeners: w }))
      }
    }
    if ((t & 7) === 0) {
      e: {
        if (
          ((m = e === 'mouseover' || e === 'pointerover'),
          (_ = e === 'mouseout' || e === 'pointerout'),
          m && n !== ru && (S = n.relatedTarget || n.fromElement) && (pn(S) || S[Vt]))
        )
          break e
        if (
          (_ || m) &&
          ((m =
            d.window === d ? d : (m = d.ownerDocument) ? m.defaultView || m.parentWindow : window),
          _
            ? ((S = n.relatedTarget || n.toElement),
              (_ = a),
              (S = S ? pn(S) : null),
              S !== null && ((B = Nn(S)), S !== B || (S.tag !== 5 && S.tag !== 6)) && (S = null))
            : ((_ = null), (S = a)),
          _ !== S)
        ) {
          if (
            ((w = ya),
            (R = 'onMouseLeave'),
            (h = 'onMouseEnter'),
            (c = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((w = Sa), (R = 'onPointerLeave'), (h = 'onPointerEnter'), (c = 'pointer')),
            (B = _ == null ? m : Un(_)),
            (f = S == null ? m : Un(S)),
            (m = new w(R, c + 'leave', _, n, d)),
            (m.target = B),
            (m.relatedTarget = f),
            (R = null),
            pn(d) === a &&
              ((w = new w(h, c + 'enter', S, n, d)),
              (w.target = f),
              (w.relatedTarget = B),
              (R = w)),
            (B = R),
            _ && S)
          )
            t: {
              for (w = _, h = S, c = 0, f = w; f; f = xn(f)) c++
              for (f = 0, R = h; R; R = xn(R)) f++
              for (; 0 < c - f; ) (w = xn(w)), c--
              for (; 0 < f - c; ) (h = xn(h)), f--
              for (; c--; ) {
                if (w === h || (h !== null && w === h.alternate)) break t
                ;(w = xn(w)), (h = xn(h))
              }
              w = null
            }
          else w = null
          _ !== null && xa(p, m, _, w, !1), S !== null && B !== null && xa(p, B, S, w, !0)
        }
      }
      e: {
        if (
          ((m = a ? Un(a) : window),
          (_ = m.nodeName && m.nodeName.toLowerCase()),
          _ === 'select' || (_ === 'input' && m.type === 'file'))
        )
          var k = yv
        else if (Ra(m))
          if (Sf) k = wv
          else {
            k = Sv
            var C = gv
          }
        else
          (_ = m.nodeName) &&
            _.toLowerCase() === 'input' &&
            (m.type === 'checkbox' || m.type === 'radio') &&
            (k = _v)
        if (k && (k = k(e, a))) {
          gf(p, k, n, d)
          break e
        }
        C && C(e, m, a),
          e === 'focusout' &&
            (C = m._wrapperState) &&
            C.controlled &&
            m.type === 'number' &&
            qi(m, 'number', m.value)
      }
      switch (((C = a ? Un(a) : window), e)) {
        case 'focusin':
          ;(Ra(C) || C.contentEditable === 'true') && ((zn = C), (cu = a), (Dr = null))
          break
        case 'focusout':
          Dr = cu = zn = null
          break
        case 'mousedown':
          fu = !0
          break
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ;(fu = !1), Ca(p, n, d)
          break
        case 'selectionchange':
          if (Tv) break
        case 'keydown':
        case 'keyup':
          Ca(p, n, d)
      }
      var L
      if (ls)
        e: {
          switch (e) {
            case 'compositionstart':
              var I = 'onCompositionStart'
              break e
            case 'compositionend':
              I = 'onCompositionEnd'
              break e
            case 'compositionupdate':
              I = 'onCompositionUpdate'
              break e
          }
          I = void 0
        }
      else
        In
          ? mf(e, n) && (I = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (I = 'onCompositionStart')
      I &&
        (vf &&
          n.locale !== 'ko' &&
          (In || I !== 'onCompositionStart'
            ? I === 'onCompositionEnd' && In && (L = hf())
            : ((Kt = d), (ns = 'value' in Kt ? Kt.value : Kt.textContent), (In = !0))),
        (C = ll(a, I)),
        0 < C.length &&
          ((I = new ga(I, e, null, n, d)),
          p.push({ event: I, listeners: C }),
          L ? (I.data = L) : ((L = yf(n)), L !== null && (I.data = L)))),
        (L = dv ? pv(e, n) : hv(e, n)) &&
          ((a = ll(a, 'onBeforeInput')),
          0 < a.length &&
            ((d = new ga('onBeforeInput', 'beforeinput', null, n, d)),
            p.push({ event: d, listeners: a }),
            (d.data = L)))
    }
    Af(p, t)
  })
}
function br(e, t, n) {
  return { instance: e, listener: t, currentTarget: n }
}
function ll(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var o = e,
      l = o.stateNode
    o.tag === 5 &&
      l !== null &&
      ((o = l),
      (l = Qr(e, n)),
      l != null && r.unshift(br(e, l, o)),
      (l = Qr(e, t)),
      l != null && r.push(br(e, l, o))),
      (e = e.return)
  }
  return r
}
function xn(e) {
  if (e === null) return null
  do e = e.return
  while (e && e.tag !== 5)
  return e || null
}
function xa(e, t, n, r, o) {
  for (var l = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n,
      s = u.alternate,
      a = u.stateNode
    if (s !== null && s === r) break
    u.tag === 5 &&
      a !== null &&
      ((u = a),
      o
        ? ((s = Qr(n, l)), s != null && i.unshift(br(n, s, u)))
        : o || ((s = Qr(n, l)), s != null && i.push(br(n, s, u)))),
      (n = n.return)
  }
  i.length !== 0 && e.push({ event: t, listeners: i })
}
var Lv = /\r\n?/g,
  Av = /\u0000|\uFFFD/g
function Pa(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Lv,
      `
`,
    )
    .replace(Av, '')
}
function Ao(e, t, n) {
  if (((t = Pa(t)), Pa(e) !== t && n)) throw Error(T(425))
}
function il() {}
var du = null,
  pu = null
function hu(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  )
}
var vu = typeof setTimeout == 'function' ? setTimeout : void 0,
  xv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Ma = typeof Promise == 'function' ? Promise : void 0,
  Pv =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Ma < 'u'
      ? function (e) {
          return Ma.resolve(null).then(e).catch(Mv)
        }
      : vu
function Mv(e) {
  setTimeout(function () {
    throw e
  })
}
function Ci(e, t) {
  var n = t,
    r = 0
  do {
    var o = n.nextSibling
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === '/$')) {
        if (r === 0) {
          e.removeChild(o), Zr(t)
          return
        }
        r--
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++
    n = o
  } while (n)
  Zr(t)
}
function Xt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType
    if (t === 1 || t === 3) break
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break
      if (t === '/$') return null
    }
  }
  return e
}
function Va(e) {
  e = e.previousSibling
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e
        t--
      } else n === '/$' && t++
    }
    e = e.previousSibling
  }
  return null
}
var cr = Math.random().toString(36).slice(2),
  Rt = '__reactFiber$' + cr,
  eo = '__reactProps$' + cr,
  Vt = '__reactContainer$' + cr,
  mu = '__reactEvents$' + cr,
  Vv = '__reactListeners$' + cr,
  Iv = '__reactHandles$' + cr
function pn(e) {
  var t = e[Rt]
  if (t) return t
  for (var n = e.parentNode; n; ) {
    if ((t = n[Vt] || n[Rt])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = Va(e); e !== null; ) {
          if ((n = e[Rt])) return n
          e = Va(e)
        }
      return t
    }
    ;(e = n), (n = e.parentNode)
  }
  return null
}
function ao(e) {
  return (
    (e = e[Rt] || e[Vt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  )
}
function Un(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode
  throw Error(T(33))
}
function Pl(e) {
  return e[eo] || null
}
var yu = [],
  $n = -1
function on(e) {
  return { current: e }
}
function ie(e) {
  0 > $n || ((e.current = yu[$n]), (yu[$n] = null), $n--)
}
function oe(e, t) {
  $n++, (yu[$n] = e.current), (e.current = t)
}
var nn = {},
  Ie = on(nn),
  Be = on(!1),
  gn = nn
function qn(e, t) {
  var n = e.type.contextTypes
  if (!n) return nn
  var r = e.stateNode
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext
  var o = {},
    l
  for (l in n) o[l] = t[l]
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  )
}
function je(e) {
  return (e = e.childContextTypes), e != null
}
function ul() {
  ie(Be), ie(Ie)
}
function Ia(e, t, n) {
  if (Ie.current !== nn) throw Error(T(168))
  oe(Ie, t), oe(Be, n)
}
function Pf(e, t, n) {
  var r = e.stateNode
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n
  r = r.getChildContext()
  for (var o in r) if (!(o in t)) throw Error(T(108, gh(e) || 'Unknown', o))
  return me({}, n, r)
}
function sl(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || nn),
    (gn = Ie.current),
    oe(Ie, e),
    oe(Be, Be.current),
    !0
  )
}
function za(e, t, n) {
  var r = e.stateNode
  if (!r) throw Error(T(169))
  n
    ? ((e = Pf(e, t, gn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ie(Be),
      ie(Ie),
      oe(Ie, e))
    : ie(Be),
    oe(Be, n)
}
var Lt = null,
  Ml = !1,
  Li = !1
function Mf(e) {
  Lt === null ? (Lt = [e]) : Lt.push(e)
}
function zv(e) {
  ;(Ml = !0), Mf(e)
}
function ln() {
  if (!Li && Lt !== null) {
    Li = !0
    var e = 0,
      t = ee
    try {
      var n = Lt
      for (ee = 1; e < n.length; e++) {
        var r = n[e]
        do r = r(!0)
        while (r !== null)
      }
      ;(Lt = null), (Ml = !1)
    } catch (o) {
      throw (Lt !== null && (Lt = Lt.slice(e + 1)), nf(qu, ln), o)
    } finally {
      ;(ee = t), (Li = !1)
    }
  }
  return null
}
var On = [],
  Fn = 0,
  al = null,
  cl = 0,
  rt = [],
  ot = 0,
  Sn = null,
  At = 1,
  xt = ''
function cn(e, t) {
  ;(On[Fn++] = cl), (On[Fn++] = al), (al = e), (cl = t)
}
function Vf(e, t, n) {
  ;(rt[ot++] = At), (rt[ot++] = xt), (rt[ot++] = Sn), (Sn = e)
  var r = At
  e = xt
  var o = 32 - mt(r) - 1
  ;(r &= ~(1 << o)), (n += 1)
  var l = 32 - mt(t) + o
  if (30 < l) {
    var i = o - (o % 5)
    ;(l = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (o -= i),
      (At = (1 << (32 - mt(t) + o)) | (n << o) | r),
      (xt = l + e)
  } else (At = (1 << l) | (n << o) | r), (xt = e)
}
function us(e) {
  e.return !== null && (cn(e, 1), Vf(e, 1, 0))
}
function ss(e) {
  for (; e === al; ) (al = On[--Fn]), (On[Fn] = null), (cl = On[--Fn]), (On[Fn] = null)
  for (; e === Sn; )
    (Sn = rt[--ot]),
      (rt[ot] = null),
      (xt = rt[--ot]),
      (rt[ot] = null),
      (At = rt[--ot]),
      (rt[ot] = null)
}
var Je = null,
  Xe = null,
  ae = !1,
  vt = null
function If(e, t) {
  var n = lt(5, null, null, 0)
  ;(n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n)
}
function Da(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (Je = e), (Xe = Xt(t.firstChild)), !0) : !1
      )
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Je = e), (Xe = null), !0) : !1
      )
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Sn !== null ? { id: At, overflow: xt } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = lt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Je = e),
            (Xe = null),
            !0)
          : !1
      )
    default:
      return !1
  }
}
function gu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function Su(e) {
  if (ae) {
    var t = Xe
    if (t) {
      var n = t
      if (!Da(e, t)) {
        if (gu(e)) throw Error(T(418))
        t = Xt(n.nextSibling)
        var r = Je
        t && Da(e, t) ? If(r, n) : ((e.flags = (e.flags & -4097) | 2), (ae = !1), (Je = e))
      }
    } else {
      if (gu(e)) throw Error(T(418))
      ;(e.flags = (e.flags & -4097) | 2), (ae = !1), (Je = e)
    }
  }
}
function Ua(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return
  Je = e
}
function xo(e) {
  if (e !== Je) return !1
  if (!ae) return Ua(e), (ae = !0), !1
  var t
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== 'head' && t !== 'body' && !hu(e.type, e.memoizedProps))),
    t && (t = Xe))
  ) {
    if (gu(e)) throw (zf(), Error(T(418)))
    for (; t; ) If(e, t), (t = Xt(t.nextSibling))
  }
  if ((Ua(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(T(317))
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data
          if (n === '/$') {
            if (t === 0) {
              Xe = Xt(e.nextSibling)
              break e
            }
            t--
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++
        }
        e = e.nextSibling
      }
      Xe = null
    }
  } else Xe = Je ? Xt(e.stateNode.nextSibling) : null
  return !0
}
function zf() {
  for (var e = Xe; e; ) e = Xt(e.nextSibling)
}
function bn() {
  ;(Xe = Je = null), (ae = !1)
}
function as(e) {
  vt === null ? (vt = [e]) : vt.push(e)
}
var Dv = Dt.ReactCurrentBatchConfig
function pt(e, t) {
  if (e && e.defaultProps) {
    ;(t = me({}, t)), (e = e.defaultProps)
    for (var n in e) t[n] === void 0 && (t[n] = e[n])
    return t
  }
  return t
}
var fl = on(null),
  dl = null,
  Bn = null,
  cs = null
function fs() {
  cs = Bn = dl = null
}
function ds(e) {
  var t = fl.current
  ie(fl), (e._currentValue = t)
}
function _u(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break
    e = e.return
  }
}
function Yn(e, t) {
  ;(dl = e),
    (cs = Bn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      ((e.lanes & t) !== 0 && (Fe = !0), (e.firstContext = null))
}
function ut(e) {
  var t = e._currentValue
  if (cs !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Bn === null)) {
      if (dl === null) throw Error(T(308))
      ;(Bn = e), (dl.dependencies = { lanes: 0, firstContext: e })
    } else Bn = Bn.next = e
  return t
}
var hn = null
function ps(e) {
  hn === null ? (hn = [e]) : hn.push(e)
}
function Df(e, t, n, r) {
  var o = t.interleaved
  return (
    o === null ? ((n.next = n), ps(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    It(e, r)
  )
}
function It(e, t) {
  e.lanes |= t
  var n = e.alternate
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return)
  return n.tag === 3 ? n.stateNode : null
}
var Bt = !1
function hs(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  }
}
function Uf(e, t) {
  ;(e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      })
}
function Pt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null }
}
function Jt(e, t, n) {
  var r = e.updateQueue
  if (r === null) return null
  if (((r = r.shared), (q & 2) !== 0)) {
    var o = r.pending
    return o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)), (r.pending = t), It(e, n)
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), ps(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    It(e, n)
  )
}
function Ho(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes
    ;(r &= e.pendingLanes), (n |= r), (t.lanes = n), bu(e, n)
  }
}
function $a(e, t) {
  var n = e.updateQueue,
    r = e.alternate
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      l = null
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        }
        l === null ? (o = l = i) : (l = l.next = i), (n = n.next)
      } while (n !== null)
      l === null ? (o = l = t) : (l = l.next = t)
    } else o = l = t
    ;(n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: l,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n)
    return
  }
  ;(e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t)
}
function pl(e, t, n, r) {
  var o = e.updateQueue
  Bt = !1
  var l = o.firstBaseUpdate,
    i = o.lastBaseUpdate,
    u = o.shared.pending
  if (u !== null) {
    o.shared.pending = null
    var s = u,
      a = s.next
    ;(s.next = null), i === null ? (l = a) : (i.next = a), (i = s)
    var d = e.alternate
    d !== null &&
      ((d = d.updateQueue),
      (u = d.lastBaseUpdate),
      u !== i && (u === null ? (d.firstBaseUpdate = a) : (u.next = a), (d.lastBaseUpdate = s)))
  }
  if (l !== null) {
    var p = o.baseState
    ;(i = 0), (d = a = s = null), (u = l)
    do {
      var m = u.lane,
        _ = u.eventTime
      if ((r & m) === m) {
        d !== null &&
          (d = d.next =
            {
              eventTime: _,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            })
        e: {
          var S = e,
            w = u
          switch (((m = t), (_ = n), w.tag)) {
            case 1:
              if (((S = w.payload), typeof S == 'function')) {
                p = S.call(_, p, m)
                break e
              }
              p = S
              break e
            case 3:
              S.flags = (S.flags & -65537) | 128
            case 0:
              if (((S = w.payload), (m = typeof S == 'function' ? S.call(_, p, m) : S), m == null))
                break e
              p = me({}, p, m)
              break e
            case 2:
              Bt = !0
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64), (m = o.effects), m === null ? (o.effects = [u]) : m.push(u))
      } else
        (_ = {
          eventTime: _,
          lane: m,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          d === null ? ((a = d = _), (s = p)) : (d = d.next = _),
          (i |= m)
      if (((u = u.next), u === null)) {
        if (((u = o.shared.pending), u === null)) break
        ;(m = u), (u = m.next), (m.next = null), (o.lastBaseUpdate = m), (o.shared.pending = null)
      }
    } while (1)
    if (
      (d === null && (s = p),
      (o.baseState = s),
      (o.firstBaseUpdate = a),
      (o.lastBaseUpdate = d),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t
      do (i |= o.lane), (o = o.next)
      while (o !== t)
    } else l === null && (o.shared.lanes = 0)
    ;(wn |= i), (e.lanes = i), (e.memoizedState = p)
  }
}
function Oa(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != 'function')) throw Error(T(191, o))
        o.call(r)
      }
    }
}
var $f = new zc.Component().refs
function wu(e, t, n, r) {
  ;(t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : me({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Vl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Nn(e) === e : !1
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals
    var r = De(),
      o = bt(e),
      l = Pt(r, o)
    ;(l.payload = t),
      n != null && (l.callback = n),
      (t = Jt(e, l, o)),
      t !== null && (yt(t, e, o, r), Ho(t, e, o))
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals
    var r = De(),
      o = bt(e),
      l = Pt(r, o)
    ;(l.tag = 1),
      (l.payload = t),
      n != null && (l.callback = n),
      (t = Jt(e, l, o)),
      t !== null && (yt(t, e, o, r), Ho(t, e, o))
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals
    var n = De(),
      r = bt(e),
      o = Pt(n, r)
    ;(o.tag = 2),
      t != null && (o.callback = t),
      (t = Jt(e, o, r)),
      t !== null && (yt(t, e, r, n), Ho(t, e, r))
  },
}
function Fa(e, t, n, r, o, l, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, l, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Jr(n, r) || !Jr(o, l)
      : !0
  )
}
function Of(e, t, n) {
  var r = !1,
    o = nn,
    l = t.contextType
  return (
    typeof l == 'object' && l !== null
      ? (l = ut(l))
      : ((o = je(t) ? gn : Ie.current),
        (r = t.contextTypes),
        (l = (r = r != null) ? qn(e, o) : nn)),
    (t = new t(n, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Vl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  )
}
function Ba(e, t, n, r) {
  ;(e = t.state),
    typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Vl.enqueueReplaceState(t, t.state, null)
}
function Ru(e, t, n, r) {
  var o = e.stateNode
  ;(o.props = n), (o.state = e.memoizedState), (o.refs = $f), hs(e)
  var l = t.contextType
  typeof l == 'object' && l !== null
    ? (o.context = ut(l))
    : ((l = je(t) ? gn : Ie.current), (o.context = qn(e, l))),
    (o.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == 'function' && (wu(e, t, l, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' &&
        typeof o.componentWillMount != 'function') ||
      ((t = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
      t !== o.state && Vl.enqueueReplaceState(o, o.state, null),
      pl(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308)
}
function Sr(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(T(309))
        var r = n.stateNode
      }
      if (!r) throw Error(T(147, e))
      var o = r,
        l = '' + e
      return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === l
        ? t.ref
        : ((t = function (i) {
            var u = o.refs
            u === $f && (u = o.refs = {}), i === null ? delete u[l] : (u[l] = i)
          }),
          (t._stringRef = l),
          t)
    }
    if (typeof e != 'string') throw Error(T(284))
    if (!n._owner) throw Error(T(290, e))
  }
  return e
}
function Po(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      T(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e),
    ))
  )
}
function ja(e) {
  var t = e._init
  return t(e._payload)
}
function Ff(e) {
  function t(h, c) {
    if (e) {
      var f = h.deletions
      f === null ? ((h.deletions = [c]), (h.flags |= 16)) : f.push(c)
    }
  }
  function n(h, c) {
    if (!e) return null
    for (; c !== null; ) t(h, c), (c = c.sibling)
    return null
  }
  function r(h, c) {
    for (h = new Map(); c !== null; )
      c.key !== null ? h.set(c.key, c) : h.set(c.index, c), (c = c.sibling)
    return h
  }
  function o(h, c) {
    return (h = en(h, c)), (h.index = 0), (h.sibling = null), h
  }
  function l(h, c, f) {
    return (
      (h.index = f),
      e
        ? ((f = h.alternate),
          f !== null ? ((f = f.index), f < c ? ((h.flags |= 2), c) : f) : ((h.flags |= 2), c))
        : ((h.flags |= 1048576), c)
    )
  }
  function i(h) {
    return e && h.alternate === null && (h.flags |= 2), h
  }
  function u(h, c, f, R) {
    return c === null || c.tag !== 6
      ? ((c = zi(f, h.mode, R)), (c.return = h), c)
      : ((c = o(c, f)), (c.return = h), c)
  }
  function s(h, c, f, R) {
    var k = f.type
    return k === Vn
      ? d(h, c, f.props.children, R, f.key)
      : c !== null &&
        (c.elementType === k ||
          (typeof k == 'object' && k !== null && k.$$typeof === Ft && ja(k) === c.type))
      ? ((R = o(c, f.props)), (R.ref = Sr(h, c, f)), (R.return = h), R)
      : ((R = Xo(f.type, f.key, f.props, null, h.mode, R)),
        (R.ref = Sr(h, c, f)),
        (R.return = h),
        R)
  }
  function a(h, c, f, R) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== f.containerInfo ||
      c.stateNode.implementation !== f.implementation
      ? ((c = Di(f, h.mode, R)), (c.return = h), c)
      : ((c = o(c, f.children || [])), (c.return = h), c)
  }
  function d(h, c, f, R, k) {
    return c === null || c.tag !== 7
      ? ((c = yn(f, h.mode, R, k)), (c.return = h), c)
      : ((c = o(c, f)), (c.return = h), c)
  }
  function p(h, c, f) {
    if ((typeof c == 'string' && c !== '') || typeof c == 'number')
      return (c = zi('' + c, h.mode, f)), (c.return = h), c
    if (typeof c == 'object' && c !== null) {
      switch (c.$$typeof) {
        case _o:
          return (
            (f = Xo(c.type, c.key, c.props, null, h.mode, f)),
            (f.ref = Sr(h, null, c)),
            (f.return = h),
            f
          )
        case Mn:
          return (c = Di(c, h.mode, f)), (c.return = h), c
        case Ft:
          var R = c._init
          return p(h, R(c._payload), f)
      }
      if (Lr(c) || hr(c)) return (c = yn(c, h.mode, f, null)), (c.return = h), c
      Po(h, c)
    }
    return null
  }
  function m(h, c, f, R) {
    var k = c !== null ? c.key : null
    if ((typeof f == 'string' && f !== '') || typeof f == 'number')
      return k !== null ? null : u(h, c, '' + f, R)
    if (typeof f == 'object' && f !== null) {
      switch (f.$$typeof) {
        case _o:
          return f.key === k ? s(h, c, f, R) : null
        case Mn:
          return f.key === k ? a(h, c, f, R) : null
        case Ft:
          return (k = f._init), m(h, c, k(f._payload), R)
      }
      if (Lr(f) || hr(f)) return k !== null ? null : d(h, c, f, R, null)
      Po(h, f)
    }
    return null
  }
  function _(h, c, f, R, k) {
    if ((typeof R == 'string' && R !== '') || typeof R == 'number')
      return (h = h.get(f) || null), u(c, h, '' + R, k)
    if (typeof R == 'object' && R !== null) {
      switch (R.$$typeof) {
        case _o:
          return (h = h.get(R.key === null ? f : R.key) || null), s(c, h, R, k)
        case Mn:
          return (h = h.get(R.key === null ? f : R.key) || null), a(c, h, R, k)
        case Ft:
          var C = R._init
          return _(h, c, f, C(R._payload), k)
      }
      if (Lr(R) || hr(R)) return (h = h.get(f) || null), d(c, h, R, k, null)
      Po(c, R)
    }
    return null
  }
  function S(h, c, f, R) {
    for (var k = null, C = null, L = c, I = (c = 0), b = null; L !== null && I < f.length; I++) {
      L.index > I ? ((b = L), (L = null)) : (b = L.sibling)
      var U = m(h, L, f[I], R)
      if (U === null) {
        L === null && (L = b)
        break
      }
      e && L && U.alternate === null && t(h, L),
        (c = l(U, c, I)),
        C === null ? (k = U) : (C.sibling = U),
        (C = U),
        (L = b)
    }
    if (I === f.length) return n(h, L), ae && cn(h, I), k
    if (L === null) {
      for (; I < f.length; I++)
        (L = p(h, f[I], R)),
          L !== null && ((c = l(L, c, I)), C === null ? (k = L) : (C.sibling = L), (C = L))
      return ae && cn(h, I), k
    }
    for (L = r(h, L); I < f.length; I++)
      (b = _(L, h, I, f[I], R)),
        b !== null &&
          (e && b.alternate !== null && L.delete(b.key === null ? I : b.key),
          (c = l(b, c, I)),
          C === null ? (k = b) : (C.sibling = b),
          (C = b))
    return (
      e &&
        L.forEach(function (ne) {
          return t(h, ne)
        }),
      ae && cn(h, I),
      k
    )
  }
  function w(h, c, f, R) {
    var k = hr(f)
    if (typeof k != 'function') throw Error(T(150))
    if (((f = k.call(f)), f == null)) throw Error(T(151))
    for (
      var C = (k = null), L = c, I = (c = 0), b = null, U = f.next();
      L !== null && !U.done;
      I++, U = f.next()
    ) {
      L.index > I ? ((b = L), (L = null)) : (b = L.sibling)
      var ne = m(h, L, U.value, R)
      if (ne === null) {
        L === null && (L = b)
        break
      }
      e && L && ne.alternate === null && t(h, L),
        (c = l(ne, c, I)),
        C === null ? (k = ne) : (C.sibling = ne),
        (C = ne),
        (L = b)
    }
    if (U.done) return n(h, L), ae && cn(h, I), k
    if (L === null) {
      for (; !U.done; I++, U = f.next())
        (U = p(h, U.value, R)),
          U !== null && ((c = l(U, c, I)), C === null ? (k = U) : (C.sibling = U), (C = U))
      return ae && cn(h, I), k
    }
    for (L = r(h, L); !U.done; I++, U = f.next())
      (U = _(L, h, I, U.value, R)),
        U !== null &&
          (e && U.alternate !== null && L.delete(U.key === null ? I : U.key),
          (c = l(U, c, I)),
          C === null ? (k = U) : (C.sibling = U),
          (C = U))
    return (
      e &&
        L.forEach(function (Qe) {
          return t(h, Qe)
        }),
      ae && cn(h, I),
      k
    )
  }
  function B(h, c, f, R) {
    if (
      (typeof f == 'object' &&
        f !== null &&
        f.type === Vn &&
        f.key === null &&
        (f = f.props.children),
      typeof f == 'object' && f !== null)
    ) {
      switch (f.$$typeof) {
        case _o:
          e: {
            for (var k = f.key, C = c; C !== null; ) {
              if (C.key === k) {
                if (((k = f.type), k === Vn)) {
                  if (C.tag === 7) {
                    n(h, C.sibling), (c = o(C, f.props.children)), (c.return = h), (h = c)
                    break e
                  }
                } else if (
                  C.elementType === k ||
                  (typeof k == 'object' && k !== null && k.$$typeof === Ft && ja(k) === C.type)
                ) {
                  n(h, C.sibling),
                    (c = o(C, f.props)),
                    (c.ref = Sr(h, C, f)),
                    (c.return = h),
                    (h = c)
                  break e
                }
                n(h, C)
                break
              } else t(h, C)
              C = C.sibling
            }
            f.type === Vn
              ? ((c = yn(f.props.children, h.mode, R, f.key)), (c.return = h), (h = c))
              : ((R = Xo(f.type, f.key, f.props, null, h.mode, R)),
                (R.ref = Sr(h, c, f)),
                (R.return = h),
                (h = R))
          }
          return i(h)
        case Mn:
          e: {
            for (C = f.key; c !== null; ) {
              if (c.key === C)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === f.containerInfo &&
                  c.stateNode.implementation === f.implementation
                ) {
                  n(h, c.sibling), (c = o(c, f.children || [])), (c.return = h), (h = c)
                  break e
                } else {
                  n(h, c)
                  break
                }
              else t(h, c)
              c = c.sibling
            }
            ;(c = Di(f, h.mode, R)), (c.return = h), (h = c)
          }
          return i(h)
        case Ft:
          return (C = f._init), B(h, c, C(f._payload), R)
      }
      if (Lr(f)) return S(h, c, f, R)
      if (hr(f)) return w(h, c, f, R)
      Po(h, f)
    }
    return (typeof f == 'string' && f !== '') || typeof f == 'number'
      ? ((f = '' + f),
        c !== null && c.tag === 6
          ? (n(h, c.sibling), (c = o(c, f)), (c.return = h), (h = c))
          : (n(h, c), (c = zi(f, h.mode, R)), (c.return = h), (h = c)),
        i(h))
      : n(h, c)
  }
  return B
}
var er = Ff(!0),
  Bf = Ff(!1),
  co = {},
  Tt = on(co),
  to = on(co),
  no = on(co)
function vn(e) {
  if (e === co) throw Error(T(174))
  return e
}
function vs(e, t) {
  switch ((oe(no, t), oe(to, e), oe(Tt, co), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : eu(null, '')
      break
    default:
      ;(e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = eu(t, e))
  }
  ie(Tt), oe(Tt, t)
}
function tr() {
  ie(Tt), ie(to), ie(no)
}
function jf(e) {
  vn(no.current)
  var t = vn(Tt.current),
    n = eu(t, e.type)
  t !== n && (oe(to, e), oe(Tt, n))
}
function ms(e) {
  to.current === e && (ie(Tt), ie(to))
}
var he = on(0)
function hl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState
      if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!'))
        return t
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if ((t.flags & 128) !== 0) return t
    } else if (t.child !== null) {
      ;(t.child.return = t), (t = t.child)
      continue
    }
    if (t === e) break
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null
      t = t.return
    }
    ;(t.sibling.return = t.return), (t = t.sibling)
  }
  return null
}
var Ai = []
function ys() {
  for (var e = 0; e < Ai.length; e++) Ai[e]._workInProgressVersionPrimary = null
  Ai.length = 0
}
var Ko = Dt.ReactCurrentDispatcher,
  xi = Dt.ReactCurrentBatchConfig,
  _n = 0,
  ve = null,
  we = null,
  ke = null,
  vl = !1,
  Ur = !1,
  ro = 0,
  Uv = 0
function Pe() {
  throw Error(T(321))
}
function gs(e, t) {
  if (t === null) return !1
  for (var n = 0; n < t.length && n < e.length; n++) if (!gt(e[n], t[n])) return !1
  return !0
}
function Ss(e, t, n, r, o, l) {
  if (
    ((_n = l),
    (ve = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ko.current = e === null || e.memoizedState === null ? Bv : jv),
    (e = n(r, o)),
    Ur)
  ) {
    l = 0
    do {
      if (((Ur = !1), (ro = 0), 25 <= l)) throw Error(T(301))
      ;(l += 1), (ke = we = null), (t.updateQueue = null), (Ko.current = Wv), (e = n(r, o))
    } while (Ur)
  }
  if (
    ((Ko.current = ml),
    (t = we !== null && we.next !== null),
    (_n = 0),
    (ke = we = ve = null),
    (vl = !1),
    t)
  )
    throw Error(T(300))
  return e
}
function _s() {
  var e = ro !== 0
  return (ro = 0), e
}
function wt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }
  return ke === null ? (ve.memoizedState = ke = e) : (ke = ke.next = e), ke
}
function st() {
  if (we === null) {
    var e = ve.alternate
    e = e !== null ? e.memoizedState : null
  } else e = we.next
  var t = ke === null ? ve.memoizedState : ke.next
  if (t !== null) (ke = t), (we = e)
  else {
    if (e === null) throw Error(T(310))
    ;(we = e),
      (e = {
        memoizedState: we.memoizedState,
        baseState: we.baseState,
        baseQueue: we.baseQueue,
        queue: we.queue,
        next: null,
      }),
      ke === null ? (ve.memoizedState = ke = e) : (ke = ke.next = e)
  }
  return ke
}
function oo(e, t) {
  return typeof t == 'function' ? t(e) : t
}
function Pi(e) {
  var t = st(),
    n = t.queue
  if (n === null) throw Error(T(311))
  n.lastRenderedReducer = e
  var r = we,
    o = r.baseQueue,
    l = n.pending
  if (l !== null) {
    if (o !== null) {
      var i = o.next
      ;(o.next = l.next), (l.next = i)
    }
    ;(r.baseQueue = o = l), (n.pending = null)
  }
  if (o !== null) {
    ;(l = o.next), (r = r.baseState)
    var u = (i = null),
      s = null,
      a = l
    do {
      var d = a.lane
      if ((_n & d) === d)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action))
      else {
        var p = {
          lane: d,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        }
        s === null ? ((u = s = p), (i = r)) : (s = s.next = p), (ve.lanes |= d), (wn |= d)
      }
      a = a.next
    } while (a !== null && a !== l)
    s === null ? (i = r) : (s.next = u),
      gt(r, t.memoizedState) || (Fe = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = s),
      (n.lastRenderedState = r)
  }
  if (((e = n.interleaved), e !== null)) {
    o = e
    do (l = o.lane), (ve.lanes |= l), (wn |= l), (o = o.next)
    while (o !== e)
  } else o === null && (n.lanes = 0)
  return [t.memoizedState, n.dispatch]
}
function Mi(e) {
  var t = st(),
    n = t.queue
  if (n === null) throw Error(T(311))
  n.lastRenderedReducer = e
  var r = n.dispatch,
    o = n.pending,
    l = t.memoizedState
  if (o !== null) {
    n.pending = null
    var i = (o = o.next)
    do (l = e(l, i.action)), (i = i.next)
    while (i !== o)
    gt(l, t.memoizedState) || (Fe = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (n.lastRenderedState = l)
  }
  return [l, r]
}
function Wf() {}
function Hf(e, t) {
  var n = ve,
    r = st(),
    o = t(),
    l = !gt(r.memoizedState, o)
  if (
    (l && ((r.memoizedState = o), (Fe = !0)),
    (r = r.queue),
    ws(Gf.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || (ke !== null && ke.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), lo(9, Qf.bind(null, n, r, o, t), void 0, null), Ne === null))
      throw Error(T(349))
    ;(_n & 30) !== 0 || Kf(n, t, o)
  }
  return o
}
function Kf(e, t, n) {
  ;(e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ve.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (ve.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e))
}
function Qf(e, t, n, r) {
  ;(t.value = n), (t.getSnapshot = r), Yf(t) && Zf(e)
}
function Gf(e, t, n) {
  return n(function () {
    Yf(t) && Zf(e)
  })
}
function Yf(e) {
  var t = e.getSnapshot
  e = e.value
  try {
    var n = t()
    return !gt(e, n)
  } catch {
    return !0
  }
}
function Zf(e) {
  var t = It(e, 1)
  t !== null && yt(t, e, 1, -1)
}
function Wa(e) {
  var t = wt()
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: oo,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Fv.bind(null, ve, e)),
    [t.memoizedState, e]
  )
}
function lo(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ve.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ve.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  )
}
function Xf() {
  return st().memoizedState
}
function Qo(e, t, n, r) {
  var o = wt()
  ;(ve.flags |= e), (o.memoizedState = lo(1 | t, n, void 0, r === void 0 ? null : r))
}
function Il(e, t, n, r) {
  var o = st()
  r = r === void 0 ? null : r
  var l = void 0
  if (we !== null) {
    var i = we.memoizedState
    if (((l = i.destroy), r !== null && gs(r, i.deps))) {
      o.memoizedState = lo(t, n, l, r)
      return
    }
  }
  ;(ve.flags |= e), (o.memoizedState = lo(1 | t, n, l, r))
}
function Ha(e, t) {
  return Qo(8390656, 8, e, t)
}
function ws(e, t) {
  return Il(2048, 8, e, t)
}
function Jf(e, t) {
  return Il(4, 2, e, t)
}
function qf(e, t) {
  return Il(4, 4, e, t)
}
function bf(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null)
      }
    )
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null
      }
    )
}
function ed(e, t, n) {
  return (n = n != null ? n.concat([e]) : null), Il(4, 4, bf.bind(null, t, e), n)
}
function Rs() {}
function td(e, t) {
  var n = st()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && gs(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e)
}
function nd(e, t) {
  var n = st()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && gs(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e)
}
function rd(e, t, n) {
  return (_n & 21) === 0
    ? (e.baseState && ((e.baseState = !1), (Fe = !0)), (e.memoizedState = n))
    : (gt(n, t) || ((n = lf()), (ve.lanes |= n), (wn |= n), (e.baseState = !0)), t)
}
function $v(e, t) {
  var n = ee
  ;(ee = n !== 0 && 4 > n ? n : 4), e(!0)
  var r = xi.transition
  xi.transition = {}
  try {
    e(!1), t()
  } finally {
    ;(ee = n), (xi.transition = r)
  }
}
function od() {
  return st().memoizedState
}
function Ov(e, t, n) {
  var r = bt(e)
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), ld(e)))
    id(t, n)
  else if (((n = Df(e, t, n, r)), n !== null)) {
    var o = De()
    yt(n, e, r, o), ud(n, t, r)
  }
}
function Fv(e, t, n) {
  var r = bt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }
  if (ld(e)) id(t, o)
  else {
    var l = e.alternate
    if (e.lanes === 0 && (l === null || l.lanes === 0) && ((l = t.lastRenderedReducer), l !== null))
      try {
        var i = t.lastRenderedState,
          u = l(i, n)
        if (((o.hasEagerState = !0), (o.eagerState = u), gt(u, i))) {
          var s = t.interleaved
          s === null ? ((o.next = o), ps(t)) : ((o.next = s.next), (s.next = o)),
            (t.interleaved = o)
          return
        }
      } catch {
      } finally {
      }
    ;(n = Df(e, t, o, r)), n !== null && ((o = De()), yt(n, e, r, o), ud(n, t, r))
  }
}
function ld(e) {
  var t = e.alternate
  return e === ve || (t !== null && t === ve)
}
function id(e, t) {
  Ur = vl = !0
  var n = e.pending
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t)
}
function ud(e, t, n) {
  if ((n & 4194240) !== 0) {
    var r = t.lanes
    ;(r &= e.pendingLanes), (n |= r), (t.lanes = n), bu(e, n)
  }
}
var ml = {
    readContext: ut,
    useCallback: Pe,
    useContext: Pe,
    useEffect: Pe,
    useImperativeHandle: Pe,
    useInsertionEffect: Pe,
    useLayoutEffect: Pe,
    useMemo: Pe,
    useReducer: Pe,
    useRef: Pe,
    useState: Pe,
    useDebugValue: Pe,
    useDeferredValue: Pe,
    useTransition: Pe,
    useMutableSource: Pe,
    useSyncExternalStore: Pe,
    useId: Pe,
    unstable_isNewReconciler: !1,
  },
  Bv = {
    readContext: ut,
    useCallback: function (e, t) {
      return (wt().memoizedState = [e, t === void 0 ? null : t]), e
    },
    useContext: ut,
    useEffect: Ha,
    useImperativeHandle: function (e, t, n) {
      return (n = n != null ? n.concat([e]) : null), Qo(4194308, 4, bf.bind(null, t, e), n)
    },
    useLayoutEffect: function (e, t) {
      return Qo(4194308, 4, e, t)
    },
    useInsertionEffect: function (e, t) {
      return Qo(4, 2, e, t)
    },
    useMemo: function (e, t) {
      var n = wt()
      return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
    },
    useReducer: function (e, t, n) {
      var r = wt()
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Ov.bind(null, ve, e)),
        [r.memoizedState, e]
      )
    },
    useRef: function (e) {
      var t = wt()
      return (e = { current: e }), (t.memoizedState = e)
    },
    useState: Wa,
    useDebugValue: Rs,
    useDeferredValue: function (e) {
      return (wt().memoizedState = e)
    },
    useTransition: function () {
      var e = Wa(!1),
        t = e[0]
      return (e = $v.bind(null, e[1])), (wt().memoizedState = e), [t, e]
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ve,
        o = wt()
      if (ae) {
        if (n === void 0) throw Error(T(407))
        n = n()
      } else {
        if (((n = t()), Ne === null)) throw Error(T(349))
        ;(_n & 30) !== 0 || Kf(r, t, n)
      }
      o.memoizedState = n
      var l = { value: n, getSnapshot: t }
      return (
        (o.queue = l),
        Ha(Gf.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        lo(9, Qf.bind(null, r, l, n, t), void 0, null),
        n
      )
    },
    useId: function () {
      var e = wt(),
        t = Ne.identifierPrefix
      if (ae) {
        var n = xt,
          r = At
        ;(n = (r & ~(1 << (32 - mt(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = ro++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':')
      } else (n = Uv++), (t = ':' + t + 'r' + n.toString(32) + ':')
      return (e.memoizedState = t)
    },
    unstable_isNewReconciler: !1,
  },
  jv = {
    readContext: ut,
    useCallback: td,
    useContext: ut,
    useEffect: ws,
    useImperativeHandle: ed,
    useInsertionEffect: Jf,
    useLayoutEffect: qf,
    useMemo: nd,
    useReducer: Pi,
    useRef: Xf,
    useState: function () {
      return Pi(oo)
    },
    useDebugValue: Rs,
    useDeferredValue: function (e) {
      var t = st()
      return rd(t, we.memoizedState, e)
    },
    useTransition: function () {
      var e = Pi(oo)[0],
        t = st().memoizedState
      return [e, t]
    },
    useMutableSource: Wf,
    useSyncExternalStore: Hf,
    useId: od,
    unstable_isNewReconciler: !1,
  },
  Wv = {
    readContext: ut,
    useCallback: td,
    useContext: ut,
    useEffect: ws,
    useImperativeHandle: ed,
    useInsertionEffect: Jf,
    useLayoutEffect: qf,
    useMemo: nd,
    useReducer: Mi,
    useRef: Xf,
    useState: function () {
      return Mi(oo)
    },
    useDebugValue: Rs,
    useDeferredValue: function (e) {
      var t = st()
      return we === null ? (t.memoizedState = e) : rd(t, we.memoizedState, e)
    },
    useTransition: function () {
      var e = Mi(oo)[0],
        t = st().memoizedState
      return [e, t]
    },
    useMutableSource: Wf,
    useSyncExternalStore: Hf,
    useId: od,
    unstable_isNewReconciler: !1,
  }
function nr(e, t) {
  try {
    var n = '',
      r = t
    do (n += yh(r)), (r = r.return)
    while (r)
    var o = n
  } catch (l) {
    o =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack
  }
  return { value: e, source: t, stack: o, digest: null }
}
function Vi(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null }
}
function Eu(e, t) {
  try {
    console.error(t.value)
  } catch (n) {
    setTimeout(function () {
      throw n
    })
  }
}
var Hv = typeof WeakMap == 'function' ? WeakMap : Map
function sd(e, t, n) {
  ;(n = Pt(-1, n)), (n.tag = 3), (n.payload = { element: null })
  var r = t.value
  return (
    (n.callback = function () {
      gl || ((gl = !0), (Vu = r)), Eu(e, t)
    }),
    n
  )
}
function ad(e, t, n) {
  ;(n = Pt(-1, n)), (n.tag = 3)
  var r = e.type.getDerivedStateFromError
  if (typeof r == 'function') {
    var o = t.value
    ;(n.payload = function () {
      return r(o)
    }),
      (n.callback = function () {
        Eu(e, t)
      })
  }
  var l = e.stateNode
  return (
    l !== null &&
      typeof l.componentDidCatch == 'function' &&
      (n.callback = function () {
        Eu(e, t), typeof r != 'function' && (qt === null ? (qt = new Set([this])) : qt.add(this))
        var i = t.stack
        this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' })
      }),
    n
  )
}
function Ka(e, t, n) {
  var r = e.pingCache
  if (r === null) {
    r = e.pingCache = new Hv()
    var o = new Set()
    r.set(t, o)
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o))
  o.has(n) || (o.add(n), (e = om.bind(null, e, t, n)), t.then(e, e))
}
function Qa(e) {
  do {
    var t
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e
    e = e.return
  } while (e !== null)
  return null
}
function Ga(e, t, n, r, o) {
  return (e.mode & 1) === 0
    ? (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = Pt(-1, 1)), (t.tag = 2), Jt(n, t, 1))),
          (n.lanes |= 1)),
      e)
    : ((e.flags |= 65536), (e.lanes = o), e)
}
var Kv = Dt.ReactCurrentOwner,
  Fe = !1
function ze(e, t, n, r) {
  t.child = e === null ? Bf(t, null, n, r) : er(t, e.child, n, r)
}
function Ya(e, t, n, r, o) {
  n = n.render
  var l = t.ref
  return (
    Yn(t, o),
    (r = Ss(e, t, n, r, l, o)),
    (n = _s()),
    e !== null && !Fe
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), zt(e, t, o))
      : (ae && n && us(t), (t.flags |= 1), ze(e, t, r, o), t.child)
  )
}
function Za(e, t, n, r, o) {
  if (e === null) {
    var l = n.type
    return typeof l == 'function' &&
      !xs(l) &&
      l.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), cd(e, t, l, r, o))
      : ((e = Xo(n.type, null, r, t, t.mode, o)), (e.ref = t.ref), (e.return = t), (t.child = e))
  }
  if (((l = e.child), (e.lanes & o) === 0)) {
    var i = l.memoizedProps
    if (((n = n.compare), (n = n !== null ? n : Jr), n(i, r) && e.ref === t.ref)) return zt(e, t, o)
  }
  return (t.flags |= 1), (e = en(l, r)), (e.ref = t.ref), (e.return = t), (t.child = e)
}
function cd(e, t, n, r, o) {
  if (e !== null) {
    var l = e.memoizedProps
    if (Jr(l, r) && e.ref === t.ref)
      if (((Fe = !1), (t.pendingProps = r = l), (e.lanes & o) !== 0))
        (e.flags & 131072) !== 0 && (Fe = !0)
      else return (t.lanes = e.lanes), zt(e, t, o)
  }
  return Tu(e, t, n, r, o)
}
function fd(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    l = e !== null ? e.memoizedState : null
  if (r.mode === 'hidden')
    if ((t.mode & 1) === 0)
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        oe(Wn, Ze),
        (Ze |= n)
    else {
      if ((n & 1073741824) === 0)
        return (
          (e = l !== null ? l.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          oe(Wn, Ze),
          (Ze |= e),
          null
        )
      ;(t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : n),
        oe(Wn, Ze),
        (Ze |= r)
    }
  else
    l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n), oe(Wn, Ze), (Ze |= r)
  return ze(e, t, o, n), t.child
}
function dd(e, t) {
  var n = t.ref
  ;((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152))
}
function Tu(e, t, n, r, o) {
  var l = je(n) ? gn : Ie.current
  return (
    (l = qn(t, l)),
    Yn(t, o),
    (n = Ss(e, t, n, r, l, o)),
    (r = _s()),
    e !== null && !Fe
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), zt(e, t, o))
      : (ae && r && us(t), (t.flags |= 1), ze(e, t, n, o), t.child)
  )
}
function Xa(e, t, n, r, o) {
  if (je(n)) {
    var l = !0
    sl(t)
  } else l = !1
  if ((Yn(t, o), t.stateNode === null)) Go(e, t), Of(t, n, r), Ru(t, n, r, o), (r = !0)
  else if (e === null) {
    var i = t.stateNode,
      u = t.memoizedProps
    i.props = u
    var s = i.context,
      a = n.contextType
    typeof a == 'object' && a !== null
      ? (a = ut(a))
      : ((a = je(n) ? gn : Ie.current), (a = qn(t, a)))
    var d = n.getDerivedStateFromProps,
      p = typeof d == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'
    p ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((u !== r || s !== a) && Ba(t, i, r, a)),
      (Bt = !1)
    var m = t.memoizedState
    ;(i.state = m),
      pl(t, r, i, o),
      (s = t.memoizedState),
      u !== r || m !== s || Be.current || Bt
        ? (typeof d == 'function' && (wu(t, n, d, r), (s = t.memoizedState)),
          (u = Bt || Fa(t, n, u, r, m, s, a))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (i.props = r),
          (i.state = s),
          (i.context = a),
          (r = u))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1))
  } else {
    ;(i = t.stateNode),
      Uf(e, t),
      (u = t.memoizedProps),
      (a = t.type === t.elementType ? u : pt(t.type, u)),
      (i.props = a),
      (p = t.pendingProps),
      (m = i.context),
      (s = n.contextType),
      typeof s == 'object' && s !== null
        ? (s = ut(s))
        : ((s = je(n) ? gn : Ie.current), (s = qn(t, s)))
    var _ = n.getDerivedStateFromProps
    ;(d = typeof _ == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((u !== p || m !== s) && Ba(t, i, r, s)),
      (Bt = !1),
      (m = t.memoizedState),
      (i.state = m),
      pl(t, r, i, o)
    var S = t.memoizedState
    u !== p || m !== S || Be.current || Bt
      ? (typeof _ == 'function' && (wu(t, n, _, r), (S = t.memoizedState)),
        (a = Bt || Fa(t, n, a, r, m, S, s) || !1)
          ? (d ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(r, S, s),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(r, S, s)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (u === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (u === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (i.props = r),
        (i.state = S),
        (i.context = s),
        (r = a))
      : (typeof i.componentDidUpdate != 'function' ||
          (u === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (u === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1))
  }
  return ku(e, t, n, r, l, o)
}
function ku(e, t, n, r, o, l) {
  dd(e, t)
  var i = (t.flags & 128) !== 0
  if (!r && !i) return o && za(t, n, !1), zt(e, t, l)
  ;(r = t.stateNode), (Kv.current = t)
  var u = i && typeof n.getDerivedStateFromError != 'function' ? null : r.render()
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = er(t, e.child, null, l)), (t.child = er(t, null, u, l)))
      : ze(e, t, u, l),
    (t.memoizedState = r.state),
    o && za(t, n, !0),
    t.child
  )
}
function pd(e) {
  var t = e.stateNode
  t.pendingContext
    ? Ia(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ia(e, t.context, !1),
    vs(e, t.containerInfo)
}
function Ja(e, t, n, r, o) {
  return bn(), as(o), (t.flags |= 256), ze(e, t, n, r), t.child
}
var Nu = { dehydrated: null, treeContext: null, retryLane: 0 }
function Cu(e) {
  return { baseLanes: e, cachePool: null, transitions: null }
}
function hd(e, t, n) {
  var r = t.pendingProps,
    o = he.current,
    l = !1,
    i = (t.flags & 128) !== 0,
    u
  if (
    ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    u ? ((l = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (o |= 1),
    oe(he, o & 1),
    e === null)
  )
    return (
      Su(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? ((t.mode & 1) === 0
            ? (t.lanes = 1)
            : e.data === '$!'
            ? (t.lanes = 8)
            : (t.lanes = 1073741824),
          null)
        : ((i = r.children),
          (e = r.fallback),
          l
            ? ((r = t.mode),
              (l = t.child),
              (i = { mode: 'hidden', children: i }),
              (r & 1) === 0 && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = i))
                : (l = Ul(i, r, 0, null)),
              (e = yn(e, r, n, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = Cu(n)),
              (t.memoizedState = Nu),
              e)
            : Es(t, i))
    )
  if (((o = e.memoizedState), o !== null && ((u = o.dehydrated), u !== null)))
    return Qv(e, t, i, r, u, o, n)
  if (l) {
    ;(l = r.fallback), (i = t.mode), (o = e.child), (u = o.sibling)
    var s = { mode: 'hidden', children: r.children }
    return (
      (i & 1) === 0 && t.child !== o
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
        : ((r = en(o, s)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      u !== null ? (l = en(u, l)) : ((l = yn(l, i, n, null)), (l.flags |= 2)),
      (l.return = t),
      (r.return = t),
      (r.sibling = l),
      (t.child = r),
      (r = l),
      (l = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Cu(n)
          : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
      (l.memoizedState = i),
      (l.childLanes = e.childLanes & ~n),
      (t.memoizedState = Nu),
      r
    )
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = en(l, { mode: 'visible', children: r.children })),
    (t.mode & 1) === 0 && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  )
}
function Es(e, t) {
  return (t = Ul({ mode: 'visible', children: t }, e.mode, 0, null)), (t.return = e), (e.child = t)
}
function Mo(e, t, n, r) {
  return (
    r !== null && as(r),
    er(t, e.child, null, n),
    (e = Es(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  )
}
function Qv(e, t, n, r, o, l, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Vi(Error(T(422)))), Mo(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((l = r.fallback),
        (o = t.mode),
        (r = Ul({ mode: 'visible', children: r.children }, o, 0, null)),
        (l = yn(l, o, i, null)),
        (l.flags |= 2),
        (r.return = t),
        (l.return = t),
        (r.sibling = l),
        (t.child = r),
        (t.mode & 1) !== 0 && er(t, e.child, null, i),
        (t.child.memoizedState = Cu(i)),
        (t.memoizedState = Nu),
        l)
  if ((t.mode & 1) === 0) return Mo(e, t, i, null)
  if (o.data === '$!') {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var u = r.dgst
    return (r = u), (l = Error(T(419))), (r = Vi(l, r, void 0)), Mo(e, t, i, r)
  }
  if (((u = (i & e.childLanes) !== 0), Fe || u)) {
    if (((r = Ne), r !== null)) {
      switch (i & -i) {
        case 4:
          o = 2
          break
        case 16:
          o = 8
          break
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32
          break
        case 536870912:
          o = 268435456
          break
        default:
          o = 0
      }
      ;(o = (o & (r.suspendedLanes | i)) !== 0 ? 0 : o),
        o !== 0 && o !== l.retryLane && ((l.retryLane = o), It(e, o), yt(r, e, o, -1))
    }
    return As(), (r = Vi(Error(T(421)))), Mo(e, t, i, r)
  }
  return o.data === '$?'
    ? ((t.flags |= 128), (t.child = e.child), (t = lm.bind(null, e)), (o._reactRetry = t), null)
    : ((e = l.treeContext),
      (Xe = Xt(o.nextSibling)),
      (Je = t),
      (ae = !0),
      (vt = null),
      e !== null &&
        ((rt[ot++] = At),
        (rt[ot++] = xt),
        (rt[ot++] = Sn),
        (At = e.id),
        (xt = e.overflow),
        (Sn = t)),
      (t = Es(t, r.children)),
      (t.flags |= 4096),
      t)
}
function qa(e, t, n) {
  e.lanes |= t
  var r = e.alternate
  r !== null && (r.lanes |= t), _u(e.return, t, n)
}
function Ii(e, t, n, r, o) {
  var l = e.memoizedState
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = n),
      (l.tailMode = o))
}
function vd(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    l = r.tail
  if ((ze(e, t, r.children, n), (r = he.current), (r & 2) !== 0))
    (r = (r & 1) | 2), (t.flags |= 128)
  else {
    if (e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && qa(e, n, t)
        else if (e.tag === 19) qa(e, n, t)
        else if (e.child !== null) {
          ;(e.child.return = e), (e = e.child)
          continue
        }
        if (e === t) break e
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e
          e = e.return
        }
        ;(e.sibling.return = e.return), (e = e.sibling)
      }
    r &= 1
  }
  if ((oe(he, r), (t.mode & 1) === 0)) t.memoizedState = null
  else
    switch (o) {
      case 'forwards':
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate), e !== null && hl(e) === null && (o = n), (n = n.sibling)
        ;(n = o),
          n === null ? ((o = t.child), (t.child = null)) : ((o = n.sibling), (n.sibling = null)),
          Ii(t, !1, o, n, l)
        break
      case 'backwards':
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && hl(e) === null)) {
            t.child = o
            break
          }
          ;(e = o.sibling), (o.sibling = n), (n = o), (o = e)
        }
        Ii(t, !0, n, null, l)
        break
      case 'together':
        Ii(t, !1, null, null, void 0)
        break
      default:
        t.memoizedState = null
    }
  return t.child
}
function Go(e, t) {
  ;(t.mode & 1) === 0 && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2))
}
function zt(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (wn |= t.lanes), (n & t.childLanes) === 0))
    return null
  if (e !== null && t.child !== e.child) throw Error(T(153))
  if (t.child !== null) {
    for (e = t.child, n = en(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      (e = e.sibling), (n = n.sibling = en(e, e.pendingProps)), (n.return = t)
    n.sibling = null
  }
  return t.child
}
function Gv(e, t, n) {
  switch (t.tag) {
    case 3:
      pd(t), bn()
      break
    case 5:
      jf(t)
      break
    case 1:
      je(t.type) && sl(t)
      break
    case 4:
      vs(t, t.stateNode.containerInfo)
      break
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value
      oe(fl, r._currentValue), (r._currentValue = o)
      break
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (oe(he, he.current & 1), (t.flags |= 128), null)
          : (n & t.child.childLanes) !== 0
          ? hd(e, t, n)
          : (oe(he, he.current & 1), (e = zt(e, t, n)), e !== null ? e.sibling : null)
      oe(he, he.current & 1)
      break
    case 19:
      if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
        if (r) return vd(e, t, n)
        t.flags |= 128
      }
      if (
        ((o = t.memoizedState),
        o !== null && ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        oe(he, he.current),
        r)
      )
        break
      return null
    case 22:
    case 23:
      return (t.lanes = 0), fd(e, t, n)
  }
  return zt(e, t, n)
}
var md, Lu, yd, gd
md = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode)
    else if (n.tag !== 4 && n.child !== null) {
      ;(n.child.return = n), (n = n.child)
      continue
    }
    if (n === t) break
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return
      n = n.return
    }
    ;(n.sibling.return = n.return), (n = n.sibling)
  }
}
Lu = function () {}
yd = function (e, t, n, r) {
  var o = e.memoizedProps
  if (o !== r) {
    ;(e = t.stateNode), vn(Tt.current)
    var l = null
    switch (n) {
      case 'input':
        ;(o = Xi(e, o)), (r = Xi(e, r)), (l = [])
        break
      case 'select':
        ;(o = me({}, o, { value: void 0 })), (r = me({}, r, { value: void 0 })), (l = [])
        break
      case 'textarea':
        ;(o = bi(e, o)), (r = bi(e, r)), (l = [])
        break
      default:
        typeof o.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = il)
    }
    tu(n, r)
    var i
    n = null
    for (a in o)
      if (!r.hasOwnProperty(a) && o.hasOwnProperty(a) && o[a] != null)
        if (a === 'style') {
          var u = o[a]
          for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''))
        } else
          a !== 'dangerouslySetInnerHTML' &&
            a !== 'children' &&
            a !== 'suppressContentEditableWarning' &&
            a !== 'suppressHydrationWarning' &&
            a !== 'autoFocus' &&
            (Hr.hasOwnProperty(a) ? l || (l = []) : (l = l || []).push(a, null))
    for (a in r) {
      var s = r[a]
      if (
        ((u = o != null ? o[a] : void 0),
        r.hasOwnProperty(a) && s !== u && (s != null || u != null))
      )
        if (a === 'style')
          if (u) {
            for (i in u)
              !u.hasOwnProperty(i) || (s && s.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ''))
            for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), (n[i] = s[i]))
          } else n || (l || (l = []), l.push(a, n)), (n = s)
        else
          a === 'dangerouslySetInnerHTML'
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (l = l || []).push(a, s))
            : a === 'children'
            ? (typeof s != 'string' && typeof s != 'number') || (l = l || []).push(a, '' + s)
            : a !== 'suppressContentEditableWarning' &&
              a !== 'suppressHydrationWarning' &&
              (Hr.hasOwnProperty(a)
                ? (s != null && a === 'onScroll' && le('scroll', e), l || u === s || (l = []))
                : (l = l || []).push(a, s))
    }
    n && (l = l || []).push('style', n)
    var a = l
    ;(t.updateQueue = a) && (t.flags |= 4)
  }
}
gd = function (e, t, n, r) {
  n !== r && (t.flags |= 4)
}
function _r(e, t) {
  if (!ae)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling)
        n === null ? (e.tail = null) : (n.sibling = null)
        break
      case 'collapsed':
        n = e.tail
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling)
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null)
    }
}
function Me(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling)
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling)
  return (e.subtreeFlags |= r), (e.childLanes = n), t
}
function Yv(e, t, n) {
  var r = t.pendingProps
  switch ((ss(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Me(t), null
    case 1:
      return je(t.type) && ul(), Me(t), null
    case 3:
      return (
        (r = t.stateNode),
        tr(),
        ie(Be),
        ie(Ie),
        ys(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (xo(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
              ((t.flags |= 1024), vt !== null && (Du(vt), (vt = null)))),
        Lu(e, t),
        Me(t),
        null
      )
    case 5:
      ms(t)
      var o = vn(no.current)
      if (((n = t.type), e !== null && t.stateNode != null))
        yd(e, t, n, r, o), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152))
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(T(166))
          return Me(t), null
        }
        if (((e = vn(Tt.current)), xo(t))) {
          ;(r = t.stateNode), (n = t.type)
          var l = t.memoizedProps
          switch (((r[Rt] = t), (r[eo] = l), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              le('cancel', r), le('close', r)
              break
            case 'iframe':
            case 'object':
            case 'embed':
              le('load', r)
              break
            case 'video':
            case 'audio':
              for (o = 0; o < xr.length; o++) le(xr[o], r)
              break
            case 'source':
              le('error', r)
              break
            case 'img':
            case 'image':
            case 'link':
              le('error', r), le('load', r)
              break
            case 'details':
              le('toggle', r)
              break
            case 'input':
              ua(r, l), le('invalid', r)
              break
            case 'select':
              ;(r._wrapperState = { wasMultiple: !!l.multiple }), le('invalid', r)
              break
            case 'textarea':
              aa(r, l), le('invalid', r)
          }
          tu(n, l), (o = null)
          for (var i in l)
            if (l.hasOwnProperty(i)) {
              var u = l[i]
              i === 'children'
                ? typeof u == 'string'
                  ? r.textContent !== u &&
                    (l.suppressHydrationWarning !== !0 && Ao(r.textContent, u, e),
                    (o = ['children', u]))
                  : typeof u == 'number' &&
                    r.textContent !== '' + u &&
                    (l.suppressHydrationWarning !== !0 && Ao(r.textContent, u, e),
                    (o = ['children', '' + u]))
                : Hr.hasOwnProperty(i) && u != null && i === 'onScroll' && le('scroll', r)
            }
          switch (n) {
            case 'input':
              wo(r), sa(r, l, !0)
              break
            case 'textarea':
              wo(r), ca(r)
              break
            case 'select':
            case 'option':
              break
            default:
              typeof l.onClick == 'function' && (r.onclick = il)
          }
          ;(r = o), (t.updateQueue = r), r !== null && (t.flags |= 4)
        } else {
          ;(i = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Hc(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === 'select' &&
                    ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Rt] = t),
            (e[eo] = r),
            md(e, t, !1, !1),
            (t.stateNode = e)
          e: {
            switch (((i = nu(n, r)), n)) {
              case 'dialog':
                le('cancel', e), le('close', e), (o = r)
                break
              case 'iframe':
              case 'object':
              case 'embed':
                le('load', e), (o = r)
                break
              case 'video':
              case 'audio':
                for (o = 0; o < xr.length; o++) le(xr[o], e)
                o = r
                break
              case 'source':
                le('error', e), (o = r)
                break
              case 'img':
              case 'image':
              case 'link':
                le('error', e), le('load', e), (o = r)
                break
              case 'details':
                le('toggle', e), (o = r)
                break
              case 'input':
                ua(e, r), (o = Xi(e, r)), le('invalid', e)
                break
              case 'option':
                o = r
                break
              case 'select':
                ;(e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = me({}, r, { value: void 0 })),
                  le('invalid', e)
                break
              case 'textarea':
                aa(e, r), (o = bi(e, r)), le('invalid', e)
                break
              default:
                o = r
            }
            tu(n, o), (u = o)
            for (l in u)
              if (u.hasOwnProperty(l)) {
                var s = u[l]
                l === 'style'
                  ? Gc(e, s)
                  : l === 'dangerouslySetInnerHTML'
                  ? ((s = s ? s.__html : void 0), s != null && Kc(e, s))
                  : l === 'children'
                  ? typeof s == 'string'
                    ? (n !== 'textarea' || s !== '') && Kr(e, s)
                    : typeof s == 'number' && Kr(e, '' + s)
                  : l !== 'suppressContentEditableWarning' &&
                    l !== 'suppressHydrationWarning' &&
                    l !== 'autoFocus' &&
                    (Hr.hasOwnProperty(l)
                      ? s != null && l === 'onScroll' && le('scroll', e)
                      : s != null && Gu(e, l, s, i))
              }
            switch (n) {
              case 'input':
                wo(e), sa(e, r, !1)
                break
              case 'textarea':
                wo(e), ca(e)
                break
              case 'option':
                r.value != null && e.setAttribute('value', '' + tn(r.value))
                break
              case 'select':
                ;(e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? Hn(e, !!r.multiple, l, !1)
                    : r.defaultValue != null && Hn(e, !!r.multiple, r.defaultValue, !0)
                break
              default:
                typeof o.onClick == 'function' && (e.onclick = il)
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus
                break e
              case 'img':
                r = !0
                break e
              default:
                r = !1
            }
          }
          r && (t.flags |= 4)
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152))
      }
      return Me(t), null
    case 6:
      if (e && t.stateNode != null) gd(e, t, e.memoizedProps, r)
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(T(166))
        if (((n = vn(no.current)), vn(Tt.current), xo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Rt] = t),
            (l = r.nodeValue !== n) && ((e = Je), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ao(r.nodeValue, n, (e.mode & 1) !== 0)
                break
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ao(r.nodeValue, n, (e.mode & 1) !== 0)
            }
          l && (t.flags |= 4)
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Rt] = t),
            (t.stateNode = r)
      }
      return Me(t), null
    case 13:
      if (
        (ie(he),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ae && Xe !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
          zf(), bn(), (t.flags |= 98560), (l = !1)
        else if (((l = xo(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(T(318))
            if (((l = t.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
              throw Error(T(317))
            l[Rt] = t
          } else bn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4)
          Me(t), (l = !1)
        } else vt !== null && (Du(vt), (vt = null)), (l = !0)
        if (!l) return t.flags & 65536 ? t : null
      }
      return (t.flags & 128) !== 0
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            (t.mode & 1) !== 0 &&
              (e === null || (he.current & 1) !== 0 ? Re === 0 && (Re = 3) : As())),
          t.updateQueue !== null && (t.flags |= 4),
          Me(t),
          null)
    case 4:
      return tr(), Lu(e, t), e === null && qr(t.stateNode.containerInfo), Me(t), null
    case 10:
      return ds(t.type._context), Me(t), null
    case 17:
      return je(t.type) && ul(), Me(t), null
    case 19:
      if ((ie(he), (l = t.memoizedState), l === null)) return Me(t), null
      if (((r = (t.flags & 128) !== 0), (i = l.rendering), i === null))
        if (r) _r(l, !1)
        else {
          if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
            for (e = t.child; e !== null; ) {
              if (((i = hl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    _r(l, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (l = n),
                    (e = r),
                    (l.flags &= 14680066),
                    (i = l.alternate),
                    i === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = i.childLanes),
                        (l.lanes = i.lanes),
                        (l.child = i.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = i.memoizedProps),
                        (l.memoizedState = i.memoizedState),
                        (l.updateQueue = i.updateQueue),
                        (l.type = i.type),
                        (e = i.dependencies),
                        (l.dependencies =
                          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling)
                return oe(he, (he.current & 1) | 2), t.child
              }
              e = e.sibling
            }
          l.tail !== null &&
            ge() > rr &&
            ((t.flags |= 128), (r = !0), _r(l, !1), (t.lanes = 4194304))
        }
      else {
        if (!r)
          if (((e = hl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              _r(l, !0),
              l.tail === null && l.tailMode === 'hidden' && !i.alternate && !ae)
            )
              return Me(t), null
          } else
            2 * ge() - l.renderingStartTime > rr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), _r(l, !1), (t.lanes = 4194304))
        l.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = l.last), n !== null ? (n.sibling = i) : (t.child = i), (l.last = i))
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = ge()),
          (t.sibling = null),
          (n = he.current),
          oe(he, r ? (n & 1) | 2 : n & 1),
          t)
        : (Me(t), null)
    case 22:
    case 23:
      return (
        Ls(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && (t.mode & 1) !== 0
          ? (Ze & 1073741824) !== 0 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Me(t),
        null
      )
    case 24:
      return null
    case 25:
      return null
  }
  throw Error(T(156, t.tag))
}
function Zv(e, t) {
  switch ((ss(t), t.tag)) {
    case 1:
      return (
        je(t.type) && ul(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 3:
      return (
        tr(),
        ie(Be),
        ie(Ie),
        ys(),
        (e = t.flags),
        (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 5:
      return ms(t), null
    case 13:
      if ((ie(he), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(T(340))
        bn()
      }
      return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
    case 19:
      return ie(he), null
    case 4:
      return tr(), null
    case 10:
      return ds(t.type._context), null
    case 22:
    case 23:
      return Ls(), null
    case 24:
      return null
    default:
      return null
  }
}
var Vo = !1,
  Ve = !1,
  Xv = typeof WeakSet == 'function' ? WeakSet : Set,
  D = null
function jn(e, t) {
  var n = e.ref
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null)
      } catch (r) {
        ye(e, t, r)
      }
    else n.current = null
}
function Au(e, t, n) {
  try {
    n()
  } catch (r) {
    ye(e, t, r)
  }
}
var ba = !1
function Jv(e, t) {
  if (((du = rl), (e = Rf()), is(e))) {
    if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd }
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window
        var r = n.getSelection && n.getSelection()
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode
          var o = r.anchorOffset,
            l = r.focusNode
          r = r.focusOffset
          try {
            n.nodeType, l.nodeType
          } catch {
            n = null
            break e
          }
          var i = 0,
            u = -1,
            s = -1,
            a = 0,
            d = 0,
            p = e,
            m = null
          t: for (;;) {
            for (
              var _;
              p !== n || (o !== 0 && p.nodeType !== 3) || (u = i + o),
                p !== l || (r !== 0 && p.nodeType !== 3) || (s = i + r),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (_ = p.firstChild) !== null;

            )
              (m = p), (p = _)
            for (;;) {
              if (p === e) break t
              if (
                (m === n && ++a === o && (u = i),
                m === l && ++d === r && (s = i),
                (_ = p.nextSibling) !== null)
              )
                break
              ;(p = m), (m = p.parentNode)
            }
            p = _
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s }
        } else n = null
      }
    n = n || { start: 0, end: 0 }
  } else n = null
  for (pu = { focusedElem: e, selectionRange: n }, rl = !1, D = t; D !== null; )
    if (((t = D), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (D = e)
    else
      for (; D !== null; ) {
        t = D
        try {
          var S = t.alternate
          if ((t.flags & 1024) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break
              case 1:
                if (S !== null) {
                  var w = S.memoizedProps,
                    B = S.memoizedState,
                    h = t.stateNode,
                    c = h.getSnapshotBeforeUpdate(t.elementType === t.type ? w : pt(t.type, w), B)
                  h.__reactInternalSnapshotBeforeUpdate = c
                }
                break
              case 3:
                var f = t.stateNode.containerInfo
                f.nodeType === 1
                  ? (f.textContent = '')
                  : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement)
                break
              case 5:
              case 6:
              case 4:
              case 17:
                break
              default:
                throw Error(T(163))
            }
        } catch (R) {
          ye(t, t.return, R)
        }
        if (((e = t.sibling), e !== null)) {
          ;(e.return = t.return), (D = e)
          break
        }
        D = t.return
      }
  return (S = ba), (ba = !1), S
}
function $r(e, t, n) {
  var r = t.updateQueue
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next)
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy
        ;(o.destroy = void 0), l !== void 0 && Au(t, n, l)
      }
      o = o.next
    } while (o !== r)
  }
}
function zl(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next)
    do {
      if ((n.tag & e) === e) {
        var r = n.create
        n.destroy = r()
      }
      n = n.next
    } while (n !== t)
  }
}
function xu(e) {
  var t = e.ref
  if (t !== null) {
    var n = e.stateNode
    switch (e.tag) {
      case 5:
        e = n
        break
      default:
        e = n
    }
    typeof t == 'function' ? t(e) : (t.current = e)
  }
}
function Sd(e) {
  var t = e.alternate
  t !== null && ((e.alternate = null), Sd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[Rt], delete t[eo], delete t[mu], delete t[Vv], delete t[Iv])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null)
}
function _d(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function ec(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || _d(e.return)) return null
      e = e.return
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e
      ;(e.child.return = e), (e = e.child)
    }
    if (!(e.flags & 2)) return e.stateNode
  }
}
function Pu(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = il))
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Pu(e, t, n), e = e.sibling; e !== null; ) Pu(e, t, n), (e = e.sibling)
}
function Mu(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e)
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Mu(e, t, n), e = e.sibling; e !== null; ) Mu(e, t, n), (e = e.sibling)
}
var Ce = null,
  ht = !1
function Ot(e, t, n) {
  for (n = n.child; n !== null; ) wd(e, t, n), (n = n.sibling)
}
function wd(e, t, n) {
  if (Et && typeof Et.onCommitFiberUnmount == 'function')
    try {
      Et.onCommitFiberUnmount(Cl, n)
    } catch {}
  switch (n.tag) {
    case 5:
      Ve || jn(n, t)
    case 6:
      var r = Ce,
        o = ht
      ;(Ce = null),
        Ot(e, t, n),
        (Ce = r),
        (ht = o),
        Ce !== null &&
          (ht
            ? ((e = Ce),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ce.removeChild(n.stateNode))
      break
    case 18:
      Ce !== null &&
        (ht
          ? ((e = Ce),
            (n = n.stateNode),
            e.nodeType === 8 ? Ci(e.parentNode, n) : e.nodeType === 1 && Ci(e, n),
            Zr(e))
          : Ci(Ce, n.stateNode))
      break
    case 4:
      ;(r = Ce),
        (o = ht),
        (Ce = n.stateNode.containerInfo),
        (ht = !0),
        Ot(e, t, n),
        (Ce = r),
        (ht = o)
      break
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ve && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        o = r = r.next
        do {
          var l = o,
            i = l.destroy
          ;(l = l.tag),
            i !== void 0 && ((l & 2) !== 0 || (l & 4) !== 0) && Au(n, t, i),
            (o = o.next)
        } while (o !== r)
      }
      Ot(e, t, n)
      break
    case 1:
      if (!Ve && (jn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
        try {
          ;(r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount()
        } catch (u) {
          ye(n, t, u)
        }
      Ot(e, t, n)
      break
    case 21:
      Ot(e, t, n)
      break
    case 22:
      n.mode & 1
        ? ((Ve = (r = Ve) || n.memoizedState !== null), Ot(e, t, n), (Ve = r))
        : Ot(e, t, n)
      break
    default:
      Ot(e, t, n)
  }
}
function tc(e) {
  var t = e.updateQueue
  if (t !== null) {
    e.updateQueue = null
    var n = e.stateNode
    n === null && (n = e.stateNode = new Xv()),
      t.forEach(function (r) {
        var o = im.bind(null, e, r)
        n.has(r) || (n.add(r), r.then(o, o))
      })
  }
}
function ft(e, t) {
  var n = t.deletions
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r]
      try {
        var l = e,
          i = t,
          u = i
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              ;(Ce = u.stateNode), (ht = !1)
              break e
            case 3:
              ;(Ce = u.stateNode.containerInfo), (ht = !0)
              break e
            case 4:
              ;(Ce = u.stateNode.containerInfo), (ht = !0)
              break e
          }
          u = u.return
        }
        if (Ce === null) throw Error(T(160))
        wd(l, i, o), (Ce = null), (ht = !1)
        var s = o.alternate
        s !== null && (s.return = null), (o.return = null)
      } catch (a) {
        ye(o, t, a)
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Rd(t, e), (t = t.sibling)
}
function Rd(e, t) {
  var n = e.alternate,
    r = e.flags
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ft(t, e), _t(e), r & 4)) {
        try {
          $r(3, e, e.return), zl(3, e)
        } catch (w) {
          ye(e, e.return, w)
        }
        try {
          $r(5, e, e.return)
        } catch (w) {
          ye(e, e.return, w)
        }
      }
      break
    case 1:
      ft(t, e), _t(e), r & 512 && n !== null && jn(n, n.return)
      break
    case 5:
      if ((ft(t, e), _t(e), r & 512 && n !== null && jn(n, n.return), e.flags & 32)) {
        var o = e.stateNode
        try {
          Kr(o, '')
        } catch (w) {
          ye(e, e.return, w)
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var l = e.memoizedProps,
          i = n !== null ? n.memoizedProps : l,
          u = e.type,
          s = e.updateQueue
        if (((e.updateQueue = null), s !== null))
          try {
            u === 'input' && l.type === 'radio' && l.name != null && jc(o, l), nu(u, i)
            var a = nu(u, l)
            for (i = 0; i < s.length; i += 2) {
              var d = s[i],
                p = s[i + 1]
              d === 'style'
                ? Gc(o, p)
                : d === 'dangerouslySetInnerHTML'
                ? Kc(o, p)
                : d === 'children'
                ? Kr(o, p)
                : Gu(o, d, p, a)
            }
            switch (u) {
              case 'input':
                Ji(o, l)
                break
              case 'textarea':
                Wc(o, l)
                break
              case 'select':
                var m = o._wrapperState.wasMultiple
                o._wrapperState.wasMultiple = !!l.multiple
                var _ = l.value
                _ != null
                  ? Hn(o, !!l.multiple, _, !1)
                  : m !== !!l.multiple &&
                    (l.defaultValue != null
                      ? Hn(o, !!l.multiple, l.defaultValue, !0)
                      : Hn(o, !!l.multiple, l.multiple ? [] : '', !1))
            }
            o[eo] = l
          } catch (w) {
            ye(e, e.return, w)
          }
      }
      break
    case 6:
      if ((ft(t, e), _t(e), r & 4)) {
        if (e.stateNode === null) throw Error(T(162))
        ;(o = e.stateNode), (l = e.memoizedProps)
        try {
          o.nodeValue = l
        } catch (w) {
          ye(e, e.return, w)
        }
      }
      break
    case 3:
      if ((ft(t, e), _t(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          Zr(t.containerInfo)
        } catch (w) {
          ye(e, e.return, w)
        }
      break
    case 4:
      ft(t, e), _t(e)
      break
    case 13:
      ft(t, e),
        _t(e),
        (o = e.child),
        o.flags & 8192 &&
          ((l = o.memoizedState !== null),
          (o.stateNode.isHidden = l),
          !l || (o.alternate !== null && o.alternate.memoizedState !== null) || (Ns = ge())),
        r & 4 && tc(e)
      break
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ve = (a = Ve) || d), ft(t, e), (Ve = a)) : ft(t, e),
        _t(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null), (e.stateNode.isHidden = a) && !d && (e.mode & 1) !== 0)
        )
          for (D = e, d = e.child; d !== null; ) {
            for (p = D = d; D !== null; ) {
              switch (((m = D), (_ = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $r(4, m, m.return)
                  break
                case 1:
                  jn(m, m.return)
                  var S = m.stateNode
                  if (typeof S.componentWillUnmount == 'function') {
                    ;(r = m), (n = m.return)
                    try {
                      ;(t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount()
                    } catch (w) {
                      ye(r, n, w)
                    }
                  }
                  break
                case 5:
                  jn(m, m.return)
                  break
                case 22:
                  if (m.memoizedState !== null) {
                    rc(p)
                    continue
                  }
              }
              _ !== null ? ((_.return = m), (D = _)) : rc(p)
            }
            d = d.sibling
          }
        e: for (d = null, p = e; ; ) {
          if (p.tag === 5) {
            if (d === null) {
              d = p
              try {
                ;(o = p.stateNode),
                  a
                    ? ((l = o.style),
                      typeof l.setProperty == 'function'
                        ? l.setProperty('display', 'none', 'important')
                        : (l.display = 'none'))
                    : ((u = p.stateNode),
                      (s = p.memoizedProps.style),
                      (i = s != null && s.hasOwnProperty('display') ? s.display : null),
                      (u.style.display = Qc('display', i)))
              } catch (w) {
                ye(e, e.return, w)
              }
            }
          } else if (p.tag === 6) {
            if (d === null)
              try {
                p.stateNode.nodeValue = a ? '' : p.memoizedProps
              } catch (w) {
                ye(e, e.return, w)
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) || p.memoizedState === null || p === e) &&
            p.child !== null
          ) {
            ;(p.child.return = p), (p = p.child)
            continue
          }
          if (p === e) break e
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e
            d === p && (d = null), (p = p.return)
          }
          d === p && (d = null), (p.sibling.return = p.return), (p = p.sibling)
        }
      }
      break
    case 19:
      ft(t, e), _t(e), r & 4 && tc(e)
      break
    case 21:
      break
    default:
      ft(t, e), _t(e)
  }
}
function _t(e) {
  var t = e.flags
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (_d(n)) {
            var r = n
            break e
          }
          n = n.return
        }
        throw Error(T(160))
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode
          r.flags & 32 && (Kr(o, ''), (r.flags &= -33))
          var l = ec(e)
          Mu(e, l, o)
          break
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            u = ec(e)
          Pu(e, u, i)
          break
        default:
          throw Error(T(161))
      }
    } catch (s) {
      ye(e, e.return, s)
    }
    e.flags &= -3
  }
  t & 4096 && (e.flags &= -4097)
}
function qv(e, t, n) {
  ;(D = e), Ed(e)
}
function Ed(e, t, n) {
  for (var r = (e.mode & 1) !== 0; D !== null; ) {
    var o = D,
      l = o.child
    if (o.tag === 22 && r) {
      var i = o.memoizedState !== null || Vo
      if (!i) {
        var u = o.alternate,
          s = (u !== null && u.memoizedState !== null) || Ve
        u = Vo
        var a = Ve
        if (((Vo = i), (Ve = s) && !a))
          for (D = o; D !== null; )
            (i = D),
              (s = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? oc(o)
                : s !== null
                ? ((s.return = i), (D = s))
                : oc(o)
        for (; l !== null; ) (D = l), Ed(l), (l = l.sibling)
        ;(D = o), (Vo = u), (Ve = a)
      }
      nc(e)
    } else (o.subtreeFlags & 8772) !== 0 && l !== null ? ((l.return = o), (D = l)) : nc(e)
  }
}
function nc(e) {
  for (; D !== null; ) {
    var t = D
    if ((t.flags & 8772) !== 0) {
      var n = t.alternate
      try {
        if ((t.flags & 8772) !== 0)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ve || zl(5, t)
              break
            case 1:
              var r = t.stateNode
              if (t.flags & 4 && !Ve)
                if (n === null) r.componentDidMount()
                else {
                  var o = t.elementType === t.type ? n.memoizedProps : pt(t.type, n.memoizedProps)
                  r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                }
              var l = t.updateQueue
              l !== null && Oa(t, l, r)
              break
            case 3:
              var i = t.updateQueue
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode
                      break
                    case 1:
                      n = t.child.stateNode
                  }
                Oa(t, i, n)
              }
              break
            case 5:
              var u = t.stateNode
              if (n === null && t.flags & 4) {
                n = u
                var s = t.memoizedProps
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    s.autoFocus && n.focus()
                    break
                  case 'img':
                    s.src && (n.src = s.src)
                }
              }
              break
            case 6:
              break
            case 4:
              break
            case 12:
              break
            case 13:
              if (t.memoizedState === null) {
                var a = t.alternate
                if (a !== null) {
                  var d = a.memoizedState
                  if (d !== null) {
                    var p = d.dehydrated
                    p !== null && Zr(p)
                  }
                }
              }
              break
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break
            default:
              throw Error(T(163))
          }
        Ve || (t.flags & 512 && xu(t))
      } catch (m) {
        ye(t, t.return, m)
      }
    }
    if (t === e) {
      D = null
      break
    }
    if (((n = t.sibling), n !== null)) {
      ;(n.return = t.return), (D = n)
      break
    }
    D = t.return
  }
}
function rc(e) {
  for (; D !== null; ) {
    var t = D
    if (t === e) {
      D = null
      break
    }
    var n = t.sibling
    if (n !== null) {
      ;(n.return = t.return), (D = n)
      break
    }
    D = t.return
  }
}
function oc(e) {
  for (; D !== null; ) {
    var t = D
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return
          try {
            zl(4, t)
          } catch (s) {
            ye(t, n, s)
          }
          break
        case 1:
          var r = t.stateNode
          if (typeof r.componentDidMount == 'function') {
            var o = t.return
            try {
              r.componentDidMount()
            } catch (s) {
              ye(t, o, s)
            }
          }
          var l = t.return
          try {
            xu(t)
          } catch (s) {
            ye(t, l, s)
          }
          break
        case 5:
          var i = t.return
          try {
            xu(t)
          } catch (s) {
            ye(t, i, s)
          }
      }
    } catch (s) {
      ye(t, t.return, s)
    }
    if (t === e) {
      D = null
      break
    }
    var u = t.sibling
    if (u !== null) {
      ;(u.return = t.return), (D = u)
      break
    }
    D = t.return
  }
}
var bv = Math.ceil,
  yl = Dt.ReactCurrentDispatcher,
  Ts = Dt.ReactCurrentOwner,
  it = Dt.ReactCurrentBatchConfig,
  q = 0,
  Ne = null,
  Se = null,
  Le = 0,
  Ze = 0,
  Wn = on(0),
  Re = 0,
  io = null,
  wn = 0,
  Dl = 0,
  ks = 0,
  Or = null,
  Oe = null,
  Ns = 0,
  rr = 1 / 0,
  Ct = null,
  gl = !1,
  Vu = null,
  qt = null,
  Io = !1,
  Qt = null,
  Sl = 0,
  Fr = 0,
  Iu = null,
  Yo = -1,
  Zo = 0
function De() {
  return (q & 6) !== 0 ? ge() : Yo !== -1 ? Yo : (Yo = ge())
}
function bt(e) {
  return (e.mode & 1) === 0
    ? 1
    : (q & 2) !== 0 && Le !== 0
    ? Le & -Le
    : Dv.transition !== null
    ? (Zo === 0 && (Zo = lf()), Zo)
    : ((e = ee), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : pf(e.type))), e)
}
function yt(e, t, n, r) {
  if (50 < Fr) throw ((Fr = 0), (Iu = null), Error(T(185)))
  uo(e, n, r),
    ((q & 2) === 0 || e !== Ne) &&
      (e === Ne && ((q & 2) === 0 && (Dl |= n), Re === 4 && Ht(e, Le)),
      We(e, r),
      n === 1 && q === 0 && (t.mode & 1) === 0 && ((rr = ge() + 500), Ml && ln()))
}
function We(e, t) {
  var n = e.callbackNode
  Dh(e, t)
  var r = nl(e, e === Ne ? Le : 0)
  if (r === 0) n !== null && pa(n), (e.callbackNode = null), (e.callbackPriority = 0)
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && pa(n), t === 1))
      e.tag === 0 ? zv(lc.bind(null, e)) : Mf(lc.bind(null, e)),
        Pv(function () {
          ;(q & 6) === 0 && ln()
        }),
        (n = null)
    else {
      switch (uf(r)) {
        case 1:
          n = qu
          break
        case 4:
          n = rf
          break
        case 16:
          n = tl
          break
        case 536870912:
          n = of
          break
        default:
          n = tl
      }
      n = Pd(n, Td.bind(null, e))
    }
    ;(e.callbackPriority = t), (e.callbackNode = n)
  }
}
function Td(e, t) {
  if (((Yo = -1), (Zo = 0), (q & 6) !== 0)) throw Error(T(327))
  var n = e.callbackNode
  if (Zn() && e.callbackNode !== n) return null
  var r = nl(e, e === Ne ? Le : 0)
  if (r === 0) return null
  if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = _l(e, r)
  else {
    t = r
    var o = q
    q |= 2
    var l = Nd()
    ;(Ne !== e || Le !== t) && ((Ct = null), (rr = ge() + 500), mn(e, t))
    do
      try {
        nm()
        break
      } catch (u) {
        kd(e, u)
      }
    while (1)
    fs(), (yl.current = l), (q = o), Se !== null ? (t = 0) : ((Ne = null), (Le = 0), (t = Re))
  }
  if (t !== 0) {
    if ((t === 2 && ((o = uu(e)), o !== 0 && ((r = o), (t = zu(e, o)))), t === 1))
      throw ((n = io), mn(e, 0), Ht(e, r), We(e, ge()), n)
    if (t === 6) Ht(e, r)
    else {
      if (
        ((o = e.current.alternate),
        (r & 30) === 0 &&
          !em(o) &&
          ((t = _l(e, r)), t === 2 && ((l = uu(e)), l !== 0 && ((r = l), (t = zu(e, l)))), t === 1))
      )
        throw ((n = io), mn(e, 0), Ht(e, r), We(e, ge()), n)
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(T(345))
        case 2:
          fn(e, Oe, Ct)
          break
        case 3:
          if ((Ht(e, r), (r & 130023424) === r && ((t = Ns + 500 - ge()), 10 < t))) {
            if (nl(e, 0) !== 0) break
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              De(), (e.pingedLanes |= e.suspendedLanes & o)
              break
            }
            e.timeoutHandle = vu(fn.bind(null, e, Oe, Ct), t)
            break
          }
          fn(e, Oe, Ct)
          break
        case 4:
          if ((Ht(e, r), (r & 4194240) === r)) break
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var i = 31 - mt(r)
            ;(l = 1 << i), (i = t[i]), i > o && (o = i), (r &= ~l)
          }
          if (
            ((r = o),
            (r = ge() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * bv(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = vu(fn.bind(null, e, Oe, Ct), r)
            break
          }
          fn(e, Oe, Ct)
          break
        case 5:
          fn(e, Oe, Ct)
          break
        default:
          throw Error(T(329))
      }
    }
  }
  return We(e, ge()), e.callbackNode === n ? Td.bind(null, e) : null
}
function zu(e, t) {
  var n = Or
  return (
    e.current.memoizedState.isDehydrated && (mn(e, t).flags |= 256),
    (e = _l(e, t)),
    e !== 2 && ((t = Oe), (Oe = n), t !== null && Du(t)),
    e
  )
}
function Du(e) {
  Oe === null ? (Oe = e) : Oe.push.apply(Oe, e)
}
function em(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            l = o.getSnapshot
          o = o.value
          try {
            if (!gt(l(), o)) return !1
          } catch {
            return !1
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n)
    else {
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0
        t = t.return
      }
      ;(t.sibling.return = t.return), (t = t.sibling)
    }
  }
  return !0
}
function Ht(e, t) {
  for (
    t &= ~ks, t &= ~Dl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - mt(t),
      r = 1 << n
    ;(e[n] = -1), (t &= ~r)
  }
}
function lc(e) {
  if ((q & 6) !== 0) throw Error(T(327))
  Zn()
  var t = nl(e, 0)
  if ((t & 1) === 0) return We(e, ge()), null
  var n = _l(e, t)
  if (e.tag !== 0 && n === 2) {
    var r = uu(e)
    r !== 0 && ((t = r), (n = zu(e, r)))
  }
  if (n === 1) throw ((n = io), mn(e, 0), Ht(e, t), We(e, ge()), n)
  if (n === 6) throw Error(T(345))
  return (
    (e.finishedWork = e.current.alternate), (e.finishedLanes = t), fn(e, Oe, Ct), We(e, ge()), null
  )
}
function Cs(e, t) {
  var n = q
  q |= 1
  try {
    return e(t)
  } finally {
    ;(q = n), q === 0 && ((rr = ge() + 500), Ml && ln())
  }
}
function Rn(e) {
  Qt !== null && Qt.tag === 0 && (q & 6) === 0 && Zn()
  var t = q
  q |= 1
  var n = it.transition,
    r = ee
  try {
    if (((it.transition = null), (ee = 1), e)) return e()
  } finally {
    ;(ee = r), (it.transition = n), (q = t), (q & 6) === 0 && ln()
  }
}
function Ls() {
  ;(Ze = Wn.current), ie(Wn)
}
function mn(e, t) {
  ;(e.finishedWork = null), (e.finishedLanes = 0)
  var n = e.timeoutHandle
  if ((n !== -1 && ((e.timeoutHandle = -1), xv(n)), Se !== null))
    for (n = Se.return; n !== null; ) {
      var r = n
      switch ((ss(r), r.tag)) {
        case 1:
          ;(r = r.type.childContextTypes), r != null && ul()
          break
        case 3:
          tr(), ie(Be), ie(Ie), ys()
          break
        case 5:
          ms(r)
          break
        case 4:
          tr()
          break
        case 13:
          ie(he)
          break
        case 19:
          ie(he)
          break
        case 10:
          ds(r.type._context)
          break
        case 22:
        case 23:
          Ls()
      }
      n = n.return
    }
  if (
    ((Ne = e),
    (Se = e = en(e.current, null)),
    (Le = Ze = t),
    (Re = 0),
    (io = null),
    (ks = Dl = wn = 0),
    (Oe = Or = null),
    hn !== null)
  ) {
    for (t = 0; t < hn.length; t++)
      if (((n = hn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null
        var o = r.next,
          l = n.pending
        if (l !== null) {
          var i = l.next
          ;(l.next = o), (r.next = i)
        }
        n.pending = r
      }
    hn = null
  }
  return e
}
function kd(e, t) {
  do {
    var n = Se
    try {
      if ((fs(), (Ko.current = ml), vl)) {
        for (var r = ve.memoizedState; r !== null; ) {
          var o = r.queue
          o !== null && (o.pending = null), (r = r.next)
        }
        vl = !1
      }
      if (
        ((_n = 0),
        (ke = we = ve = null),
        (Ur = !1),
        (ro = 0),
        (Ts.current = null),
        n === null || n.return === null)
      ) {
        ;(Re = 1), (io = t), (Se = null)
        break
      }
      e: {
        var l = e,
          i = n.return,
          u = n,
          s = t
        if (
          ((t = Le),
          (u.flags |= 32768),
          s !== null && typeof s == 'object' && typeof s.then == 'function')
        ) {
          var a = s,
            d = u,
            p = d.tag
          if ((d.mode & 1) === 0 && (p === 0 || p === 11 || p === 15)) {
            var m = d.alternate
            m
              ? ((d.updateQueue = m.updateQueue),
                (d.memoizedState = m.memoizedState),
                (d.lanes = m.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null))
          }
          var _ = Qa(i)
          if (_ !== null) {
            ;(_.flags &= -257), Ga(_, i, u, l, t), _.mode & 1 && Ka(l, a, t), (t = _), (s = a)
            var S = t.updateQueue
            if (S === null) {
              var w = new Set()
              w.add(s), (t.updateQueue = w)
            } else S.add(s)
            break e
          } else {
            if ((t & 1) === 0) {
              Ka(l, a, t), As()
              break e
            }
            s = Error(T(426))
          }
        } else if (ae && u.mode & 1) {
          var B = Qa(i)
          if (B !== null) {
            ;(B.flags & 65536) === 0 && (B.flags |= 256), Ga(B, i, u, l, t), as(nr(s, u))
            break e
          }
        }
        ;(l = s = nr(s, u)), Re !== 4 && (Re = 2), Or === null ? (Or = [l]) : Or.push(l), (l = i)
        do {
          switch (l.tag) {
            case 3:
              ;(l.flags |= 65536), (t &= -t), (l.lanes |= t)
              var h = sd(l, s, t)
              $a(l, h)
              break e
            case 1:
              u = s
              var c = l.type,
                f = l.stateNode
              if (
                (l.flags & 128) === 0 &&
                (typeof c.getDerivedStateFromError == 'function' ||
                  (f !== null &&
                    typeof f.componentDidCatch == 'function' &&
                    (qt === null || !qt.has(f))))
              ) {
                ;(l.flags |= 65536), (t &= -t), (l.lanes |= t)
                var R = ad(l, u, t)
                $a(l, R)
                break e
              }
          }
          l = l.return
        } while (l !== null)
      }
      Ld(n)
    } catch (k) {
      ;(t = k), Se === n && n !== null && (Se = n = n.return)
      continue
    }
    break
  } while (1)
}
function Nd() {
  var e = yl.current
  return (yl.current = ml), e === null ? ml : e
}
function As() {
  ;(Re === 0 || Re === 3 || Re === 2) && (Re = 4),
    Ne === null || ((wn & 268435455) === 0 && (Dl & 268435455) === 0) || Ht(Ne, Le)
}
function _l(e, t) {
  var n = q
  q |= 2
  var r = Nd()
  ;(Ne !== e || Le !== t) && ((Ct = null), mn(e, t))
  do
    try {
      tm()
      break
    } catch (o) {
      kd(e, o)
    }
  while (1)
  if ((fs(), (q = n), (yl.current = r), Se !== null)) throw Error(T(261))
  return (Ne = null), (Le = 0), Re
}
function tm() {
  for (; Se !== null; ) Cd(Se)
}
function nm() {
  for (; Se !== null && !Ch(); ) Cd(Se)
}
function Cd(e) {
  var t = xd(e.alternate, e, Ze)
  ;(e.memoizedProps = e.pendingProps), t === null ? Ld(e) : (Se = t), (Ts.current = null)
}
function Ld(e) {
  var t = e
  do {
    var n = t.alternate
    if (((e = t.return), (t.flags & 32768) === 0)) {
      if (((n = Yv(n, t, Ze)), n !== null)) {
        Se = n
        return
      }
    } else {
      if (((n = Zv(n, t)), n !== null)) {
        ;(n.flags &= 32767), (Se = n)
        return
      }
      if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)
      else {
        ;(Re = 6), (Se = null)
        return
      }
    }
    if (((t = t.sibling), t !== null)) {
      Se = t
      return
    }
    Se = t = e
  } while (t !== null)
  Re === 0 && (Re = 5)
}
function fn(e, t, n) {
  var r = ee,
    o = it.transition
  try {
    ;(it.transition = null), (ee = 1), rm(e, t, n, r)
  } finally {
    ;(it.transition = o), (ee = r)
  }
  return null
}
function rm(e, t, n, r) {
  do Zn()
  while (Qt !== null)
  if ((q & 6) !== 0) throw Error(T(327))
  n = e.finishedWork
  var o = e.finishedLanes
  if (n === null) return null
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(T(177))
  ;(e.callbackNode = null), (e.callbackPriority = 0)
  var l = n.lanes | n.childLanes
  if (
    (Uh(e, l),
    e === Ne && ((Se = Ne = null), (Le = 0)),
    ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
      Io ||
      ((Io = !0),
      Pd(tl, function () {
        return Zn(), null
      })),
    (l = (n.flags & 15990) !== 0),
    (n.subtreeFlags & 15990) !== 0 || l)
  ) {
    ;(l = it.transition), (it.transition = null)
    var i = ee
    ee = 1
    var u = q
    ;(q |= 4),
      (Ts.current = null),
      Jv(e, n),
      Rd(n, e),
      Ev(pu),
      (rl = !!du),
      (pu = du = null),
      (e.current = n),
      qv(n),
      Lh(),
      (q = u),
      (ee = i),
      (it.transition = l)
  } else e.current = n
  if (
    (Io && ((Io = !1), (Qt = e), (Sl = o)),
    (l = e.pendingLanes),
    l === 0 && (qt = null),
    Ph(n.stateNode),
    We(e, ge()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest })
  if (gl) throw ((gl = !1), (e = Vu), (Vu = null), e)
  return (
    (Sl & 1) !== 0 && e.tag !== 0 && Zn(),
    (l = e.pendingLanes),
    (l & 1) !== 0 ? (e === Iu ? Fr++ : ((Fr = 0), (Iu = e))) : (Fr = 0),
    ln(),
    null
  )
}
function Zn() {
  if (Qt !== null) {
    var e = uf(Sl),
      t = it.transition,
      n = ee
    try {
      if (((it.transition = null), (ee = 16 > e ? 16 : e), Qt === null)) var r = !1
      else {
        if (((e = Qt), (Qt = null), (Sl = 0), (q & 6) !== 0)) throw Error(T(331))
        var o = q
        for (q |= 4, D = e.current; D !== null; ) {
          var l = D,
            i = l.child
          if ((D.flags & 16) !== 0) {
            var u = l.deletions
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s]
                for (D = a; D !== null; ) {
                  var d = D
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $r(8, d, l)
                  }
                  var p = d.child
                  if (p !== null) (p.return = d), (D = p)
                  else
                    for (; D !== null; ) {
                      d = D
                      var m = d.sibling,
                        _ = d.return
                      if ((Sd(d), d === a)) {
                        D = null
                        break
                      }
                      if (m !== null) {
                        ;(m.return = _), (D = m)
                        break
                      }
                      D = _
                    }
                }
              }
              var S = l.alternate
              if (S !== null) {
                var w = S.child
                if (w !== null) {
                  S.child = null
                  do {
                    var B = w.sibling
                    ;(w.sibling = null), (w = B)
                  } while (w !== null)
                }
              }
              D = l
            }
          }
          if ((l.subtreeFlags & 2064) !== 0 && i !== null) (i.return = l), (D = i)
          else
            e: for (; D !== null; ) {
              if (((l = D), (l.flags & 2048) !== 0))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    $r(9, l, l.return)
                }
              var h = l.sibling
              if (h !== null) {
                ;(h.return = l.return), (D = h)
                break e
              }
              D = l.return
            }
        }
        var c = e.current
        for (D = c; D !== null; ) {
          i = D
          var f = i.child
          if ((i.subtreeFlags & 2064) !== 0 && f !== null) (f.return = i), (D = f)
          else
            e: for (i = c; D !== null; ) {
              if (((u = D), (u.flags & 2048) !== 0))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zl(9, u)
                  }
                } catch (k) {
                  ye(u, u.return, k)
                }
              if (u === i) {
                D = null
                break e
              }
              var R = u.sibling
              if (R !== null) {
                ;(R.return = u.return), (D = R)
                break e
              }
              D = u.return
            }
        }
        if (((q = o), ln(), Et && typeof Et.onPostCommitFiberRoot == 'function'))
          try {
            Et.onPostCommitFiberRoot(Cl, e)
          } catch {}
        r = !0
      }
      return r
    } finally {
      ;(ee = n), (it.transition = t)
    }
  }
  return !1
}
function ic(e, t, n) {
  ;(t = nr(n, t)),
    (t = sd(e, t, 1)),
    (e = Jt(e, t, 1)),
    (t = De()),
    e !== null && (uo(e, 1, t), We(e, t))
}
function ye(e, t, n) {
  if (e.tag === 3) ic(e, e, n)
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ic(t, e, n)
        break
      } else if (t.tag === 1) {
        var r = t.stateNode
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' && (qt === null || !qt.has(r)))
        ) {
          ;(e = nr(n, e)),
            (e = ad(t, e, 1)),
            (t = Jt(t, e, 1)),
            (e = De()),
            t !== null && (uo(t, 1, e), We(t, e))
          break
        }
      }
      t = t.return
    }
}
function om(e, t, n) {
  var r = e.pingCache
  r !== null && r.delete(t),
    (t = De()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ne === e &&
      (Le & n) === n &&
      (Re === 4 || (Re === 3 && (Le & 130023424) === Le && 500 > ge() - Ns) ? mn(e, 0) : (ks |= n)),
    We(e, t)
}
function Ad(e, t) {
  t === 0 &&
    ((e.mode & 1) === 0
      ? (t = 1)
      : ((t = To), (To <<= 1), (To & 130023424) === 0 && (To = 4194304)))
  var n = De()
  ;(e = It(e, t)), e !== null && (uo(e, t, n), We(e, n))
}
function lm(e) {
  var t = e.memoizedState,
    n = 0
  t !== null && (n = t.retryLane), Ad(e, n)
}
function im(e, t) {
  var n = 0
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState
      o !== null && (n = o.retryLane)
      break
    case 19:
      r = e.stateNode
      break
    default:
      throw Error(T(314))
  }
  r !== null && r.delete(t), Ad(e, n)
}
var xd
xd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Be.current) Fe = !0
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return (Fe = !1), Gv(e, t, n)
      Fe = (e.flags & 131072) !== 0
    }
  else (Fe = !1), ae && (t.flags & 1048576) !== 0 && Vf(t, cl, t.index)
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type
      Go(e, t), (e = t.pendingProps)
      var o = qn(t, Ie.current)
      Yn(t, n), (o = Ss(null, t, r, e, o, n))
      var l = _s()
      return (
        (t.flags |= 1),
        typeof o == 'object' && o !== null && typeof o.render == 'function' && o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            je(r) ? ((l = !0), sl(t)) : (l = !1),
            (t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
            hs(t),
            (o.updater = Vl),
            (t.stateNode = o),
            (o._reactInternals = t),
            Ru(t, r, e, n),
            (t = ku(null, t, r, !0, l, n)))
          : ((t.tag = 0), ae && l && us(t), ze(null, t, o, n), (t = t.child)),
        t
      )
    case 16:
      r = t.elementType
      e: {
        switch (
          (Go(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = sm(r)),
          (e = pt(r, e)),
          o)
        ) {
          case 0:
            t = Tu(null, t, r, e, n)
            break e
          case 1:
            t = Xa(null, t, r, e, n)
            break e
          case 11:
            t = Ya(null, t, r, e, n)
            break e
          case 14:
            t = Za(null, t, r, pt(r.type, e), n)
            break e
        }
        throw Error(T(306, r, ''))
      }
      return t
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : pt(r, o)),
        Tu(e, t, r, o, n)
      )
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : pt(r, o)),
        Xa(e, t, r, o, n)
      )
    case 3:
      e: {
        if ((pd(t), e === null)) throw Error(T(387))
        ;(r = t.pendingProps), (l = t.memoizedState), (o = l.element), Uf(e, t), pl(t, r, null, n)
        var i = t.memoizedState
        if (((r = i.element), l.isDehydrated))
          if (
            ((l = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            ;(o = nr(Error(T(423)), t)), (t = Ja(e, t, r, n, o))
            break e
          } else if (r !== o) {
            ;(o = nr(Error(T(424)), t)), (t = Ja(e, t, r, n, o))
            break e
          } else
            for (
              Xe = Xt(t.stateNode.containerInfo.firstChild),
                Je = t,
                ae = !0,
                vt = null,
                n = Bf(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling)
        else {
          if ((bn(), r === o)) {
            t = zt(e, t, n)
            break e
          }
          ze(e, t, r, n)
        }
        t = t.child
      }
      return t
    case 5:
      return (
        jf(t),
        e === null && Su(t),
        (r = t.type),
        (o = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (i = o.children),
        hu(r, o) ? (i = null) : l !== null && hu(r, l) && (t.flags |= 32),
        dd(e, t),
        ze(e, t, i, n),
        t.child
      )
    case 6:
      return e === null && Su(t), null
    case 13:
      return hd(e, t, n)
    case 4:
      return (
        vs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = er(t, null, r, n)) : ze(e, t, r, n),
        t.child
      )
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : pt(r, o)),
        Ya(e, t, r, o, n)
      )
    case 7:
      return ze(e, t, t.pendingProps, n), t.child
    case 8:
      return ze(e, t, t.pendingProps.children, n), t.child
    case 12:
      return ze(e, t, t.pendingProps.children, n), t.child
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (l = t.memoizedProps),
          (i = o.value),
          oe(fl, r._currentValue),
          (r._currentValue = i),
          l !== null)
        )
          if (gt(l.value, i)) {
            if (l.children === o.children && !Be.current) {
              t = zt(e, t, n)
              break e
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var u = l.dependencies
              if (u !== null) {
                i = l.child
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (l.tag === 1) {
                      ;(s = Pt(-1, n & -n)), (s.tag = 2)
                      var a = l.updateQueue
                      if (a !== null) {
                        a = a.shared
                        var d = a.pending
                        d === null ? (s.next = s) : ((s.next = d.next), (d.next = s)),
                          (a.pending = s)
                      }
                    }
                    ;(l.lanes |= n),
                      (s = l.alternate),
                      s !== null && (s.lanes |= n),
                      _u(l.return, n, t),
                      (u.lanes |= n)
                    break
                  }
                  s = s.next
                }
              } else if (l.tag === 10) i = l.type === t.type ? null : l.child
              else if (l.tag === 18) {
                if (((i = l.return), i === null)) throw Error(T(341))
                ;(i.lanes |= n),
                  (u = i.alternate),
                  u !== null && (u.lanes |= n),
                  _u(i, n, t),
                  (i = l.sibling)
              } else i = l.child
              if (i !== null) i.return = l
              else
                for (i = l; i !== null; ) {
                  if (i === t) {
                    i = null
                    break
                  }
                  if (((l = i.sibling), l !== null)) {
                    ;(l.return = i.return), (i = l)
                    break
                  }
                  i = i.return
                }
              l = i
            }
        ze(e, t, o.children, n), (t = t.child)
      }
      return t
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Yn(t, n),
        (o = ut(o)),
        (r = r(o)),
        (t.flags |= 1),
        ze(e, t, r, n),
        t.child
      )
    case 14:
      return (r = t.type), (o = pt(r, t.pendingProps)), (o = pt(r.type, o)), Za(e, t, r, o, n)
    case 15:
      return cd(e, t, t.type, t.pendingProps, n)
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : pt(r, o)),
        Go(e, t),
        (t.tag = 1),
        je(r) ? ((e = !0), sl(t)) : (e = !1),
        Yn(t, n),
        Of(t, r, o),
        Ru(t, r, o, n),
        ku(null, t, r, !0, e, n)
      )
    case 19:
      return vd(e, t, n)
    case 22:
      return fd(e, t, n)
  }
  throw Error(T(156, t.tag))
}
function Pd(e, t) {
  return nf(e, t)
}
function um(e, t, n, r) {
  ;(this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null)
}
function lt(e, t, n, r) {
  return new um(e, t, n, r)
}
function xs(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent)
}
function sm(e) {
  if (typeof e == 'function') return xs(e) ? 1 : 0
  if (e != null) {
    if (((e = e.$$typeof), e === Zu)) return 11
    if (e === Xu) return 14
  }
  return 2
}
function en(e, t) {
  var n = e.alternate
  return (
    n === null
      ? ((n = lt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  )
}
function Xo(e, t, n, r, o, l) {
  var i = 2
  if (((r = e), typeof e == 'function')) xs(e) && (i = 1)
  else if (typeof e == 'string') i = 5
  else
    e: switch (e) {
      case Vn:
        return yn(n.children, o, l, t)
      case Yu:
        ;(i = 8), (o |= 8)
        break
      case Qi:
        return (e = lt(12, n, t, o | 2)), (e.elementType = Qi), (e.lanes = l), e
      case Gi:
        return (e = lt(13, n, t, o)), (e.elementType = Gi), (e.lanes = l), e
      case Yi:
        return (e = lt(19, n, t, o)), (e.elementType = Yi), (e.lanes = l), e
      case Oc:
        return Ul(n, o, l, t)
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Uc:
              i = 10
              break e
            case $c:
              i = 9
              break e
            case Zu:
              i = 11
              break e
            case Xu:
              i = 14
              break e
            case Ft:
              ;(i = 16), (r = null)
              break e
          }
        throw Error(T(130, e == null ? e : typeof e, ''))
    }
  return (t = lt(i, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = l), t
}
function yn(e, t, n, r) {
  return (e = lt(7, e, r, t)), (e.lanes = n), e
}
function Ul(e, t, n, r) {
  return (
    (e = lt(22, e, r, t)), (e.elementType = Oc), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e
  )
}
function zi(e, t, n) {
  return (e = lt(6, e, null, t)), (e.lanes = n), e
}
function Di(e, t, n) {
  return (
    (t = lt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  )
}
function am(e, t, n, r, o) {
  ;(this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = mi(0)),
    (this.expirationTimes = mi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = mi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null)
}
function Ps(e, t, n, r, o, l, i, u, s) {
  return (
    (e = new am(e, t, n, u, s)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = lt(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    hs(l),
    e
  )
}
function cm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
  return {
    $$typeof: Mn,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  }
}
function Md(e) {
  if (!e) return nn
  e = e._reactInternals
  e: {
    if (Nn(e) !== e || e.tag !== 1) throw Error(T(170))
    var t = e
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context
          break e
        case 1:
          if (je(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext
            break e
          }
      }
      t = t.return
    } while (t !== null)
    throw Error(T(171))
  }
  if (e.tag === 1) {
    var n = e.type
    if (je(n)) return Pf(e, n, t)
  }
  return t
}
function Vd(e, t, n, r, o, l, i, u, s) {
  return (
    (e = Ps(n, r, !0, e, o, l, i, u, s)),
    (e.context = Md(null)),
    (n = e.current),
    (r = De()),
    (o = bt(n)),
    (l = Pt(r, o)),
    (l.callback = t != null ? t : null),
    Jt(n, l, o),
    (e.current.lanes = o),
    uo(e, o, r),
    We(e, r),
    e
  )
}
function $l(e, t, n, r) {
  var o = t.current,
    l = De(),
    i = bt(o)
  return (
    (n = Md(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Pt(l, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Jt(o, t, i)),
    e !== null && (yt(e, o, i, l), Ho(e, o, i)),
    i
  )
}
function wl(e) {
  if (((e = e.current), !e.child)) return null
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode
    default:
      return e.child.stateNode
  }
}
function uc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane
    e.retryLane = n !== 0 && n < t ? n : t
  }
}
function Ms(e, t) {
  uc(e, t), (e = e.alternate) && uc(e, t)
}
function fm() {
  return null
}
var Id =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e)
      }
function Vs(e) {
  this._internalRoot = e
}
Ol.prototype.render = Vs.prototype.render = function (e) {
  var t = this._internalRoot
  if (t === null) throw Error(T(409))
  $l(e, t, null, null)
}
Ol.prototype.unmount = Vs.prototype.unmount = function () {
  var e = this._internalRoot
  if (e !== null) {
    this._internalRoot = null
    var t = e.containerInfo
    Rn(function () {
      $l(null, e, null, null)
    }),
      (t[Vt] = null)
  }
}
function Ol(e) {
  this._internalRoot = e
}
Ol.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = cf()
    e = { blockedOn: null, target: e, priority: t }
    for (var n = 0; n < Wt.length && t !== 0 && t < Wt[n].priority; n++);
    Wt.splice(n, 0, e), n === 0 && df(e)
  }
}
function Is(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
}
function Fl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  )
}
function sc() {}
function dm(e, t, n, r, o) {
  if (o) {
    if (typeof r == 'function') {
      var l = r
      r = function () {
        var a = wl(i)
        l.call(a)
      }
    }
    var i = Vd(t, r, e, 0, null, !1, !1, '', sc)
    return (
      (e._reactRootContainer = i),
      (e[Vt] = i.current),
      qr(e.nodeType === 8 ? e.parentNode : e),
      Rn(),
      i
    )
  }
  for (; (o = e.lastChild); ) e.removeChild(o)
  if (typeof r == 'function') {
    var u = r
    r = function () {
      var a = wl(s)
      u.call(a)
    }
  }
  var s = Ps(e, 0, !1, null, null, !1, !1, '', sc)
  return (
    (e._reactRootContainer = s),
    (e[Vt] = s.current),
    qr(e.nodeType === 8 ? e.parentNode : e),
    Rn(function () {
      $l(t, s, n, r)
    }),
    s
  )
}
function Bl(e, t, n, r, o) {
  var l = n._reactRootContainer
  if (l) {
    var i = l
    if (typeof o == 'function') {
      var u = o
      o = function () {
        var s = wl(i)
        u.call(s)
      }
    }
    $l(t, i, e, o)
  } else i = dm(n, t, e, o, r)
  return wl(i)
}
sf = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode
      if (t.current.memoizedState.isDehydrated) {
        var n = Ar(t.pendingLanes)
        n !== 0 && (bu(t, n | 1), We(t, ge()), (q & 6) === 0 && ((rr = ge() + 500), ln()))
      }
      break
    case 13:
      Rn(function () {
        var r = It(e, 1)
        if (r !== null) {
          var o = De()
          yt(r, e, 1, o)
        }
      }),
        Ms(e, 1)
  }
}
es = function (e) {
  if (e.tag === 13) {
    var t = It(e, 134217728)
    if (t !== null) {
      var n = De()
      yt(t, e, 134217728, n)
    }
    Ms(e, 134217728)
  }
}
af = function (e) {
  if (e.tag === 13) {
    var t = bt(e),
      n = It(e, t)
    if (n !== null) {
      var r = De()
      yt(n, e, t, r)
    }
    Ms(e, t)
  }
}
cf = function () {
  return ee
}
ff = function (e, t) {
  var n = ee
  try {
    return (ee = e), t()
  } finally {
    ee = n
  }
}
ou = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((Ji(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode
        for (
          n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t]
          if (r !== e && r.form === e.form) {
            var o = Pl(r)
            if (!o) throw Error(T(90))
            Bc(r), Ji(r, o)
          }
        }
      }
      break
    case 'textarea':
      Wc(e, n)
      break
    case 'select':
      ;(t = n.value), t != null && Hn(e, !!n.multiple, t, !1)
  }
}
Xc = Cs
Jc = Rn
var pm = { usingClientEntryPoint: !1, Events: [ao, Un, Pl, Yc, Zc, Cs] },
  wr = {
    findFiberByHostInstance: pn,
    bundleType: 0,
    version: '18.2.0',
    rendererPackageName: 'react-dom',
  },
  hm = {
    bundleType: wr.bundleType,
    version: wr.version,
    rendererPackageName: wr.rendererPackageName,
    rendererConfig: wr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Dt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = ef(e)), e === null ? null : e.stateNode
    },
    findFiberByHostInstance: wr.findFiberByHostInstance || fm,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
  }
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var zo = __REACT_DEVTOOLS_GLOBAL_HOOK__
  if (!zo.isDisabled && zo.supportsFiber)
    try {
      ;(Cl = zo.inject(hm)), (Et = zo)
    } catch {}
}
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pm
be.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
  if (!Is(t)) throw Error(T(200))
  return cm(e, t, null, n)
}
be.createRoot = function (e, t) {
  if (!Is(e)) throw Error(T(299))
  var n = !1,
    r = '',
    o = Id
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Ps(e, 1, !1, null, null, n, !1, r, o)),
    (e[Vt] = t.current),
    qr(e.nodeType === 8 ? e.parentNode : e),
    new Vs(t)
  )
}
be.findDOMNode = function (e) {
  if (e == null) return null
  if (e.nodeType === 1) return e
  var t = e._reactInternals
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(T(188))
      : ((e = Object.keys(e).join(',')), Error(T(268, e)))
  return (e = ef(t)), (e = e === null ? null : e.stateNode), e
}
be.flushSync = function (e) {
  return Rn(e)
}
be.hydrate = function (e, t, n) {
  if (!Fl(t)) throw Error(T(200))
  return Bl(null, e, t, !0, n)
}
be.hydrateRoot = function (e, t, n) {
  if (!Is(e)) throw Error(T(405))
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    l = '',
    i = Id
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Vd(t, null, e, 1, n != null ? n : null, o, !1, l, i)),
    (e[Vt] = t.current),
    qr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o)
  return new Ol(t)
}
be.render = function (e, t, n) {
  if (!Fl(t)) throw Error(T(200))
  return Bl(null, e, t, !1, n)
}
be.unmountComponentAtNode = function (e) {
  if (!Fl(e)) throw Error(T(40))
  return e._reactRootContainer
    ? (Rn(function () {
        Bl(null, null, e, !1, function () {
          ;(e._reactRootContainer = null), (e[Vt] = null)
        })
      }),
      !0)
    : !1
}
be.unstable_batchedUpdates = Cs
be.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Fl(n)) throw Error(T(200))
  if (e == null || e._reactInternals === void 0) throw Error(T(38))
  return Bl(e, t, n, !1, r)
}
be.version = '18.2.0-next-9e3b772b8-20220608'
;(function (e) {
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)
      } catch (n) {
        console.error(n)
      }
  }
  t(), (e.exports = be)
})(Mc)
const vm = dh(Mc.exports)
var zs = { exports: {} },
  jl = {}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mm = Pc.exports,
  ym = Symbol.for('react.element'),
  gm = Symbol.for('react.fragment'),
  Sm = Object.prototype.hasOwnProperty,
  _m = mm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  wm = { key: !0, ref: !0, __self: !0, __source: !0 }
function zd(e, t, n) {
  var r,
    o = {},
    l = null,
    i = null
  n !== void 0 && (l = '' + n),
    t.key !== void 0 && (l = '' + t.key),
    t.ref !== void 0 && (i = t.ref)
  for (r in t) Sm.call(t, r) && !wm.hasOwnProperty(r) && (o[r] = t[r])
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r])
  return { $$typeof: ym, type: e, key: l, ref: i, props: o, _owner: _m.current }
}
jl.Fragment = gm
jl.jsx = zd
jl.jsxs = zd
;(function (e) {
  e.exports = jl
})(zs)
const Rl = zs.exports.jsx,
  Rm = zs.exports.jsxs
function Em(e) {
  const t = new Error(e)
  if (t.stack === void 0)
    try {
      throw t
    } catch {}
  return t
}
var Tm = Em,
  Z = Tm
function km(e) {
  return !!e && typeof e.then == 'function'
}
var ce = km
function Nm(e, t) {
  if (e != null) return e
  throw Z(t != null ? t : 'Got unexpected null or undefined')
}
var fe = Nm
function G(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  )
}
class Wl {
  getValue() {
    throw Z('BaseLoadable')
  }
  toPromise() {
    throw Z('BaseLoadable')
  }
  valueMaybe() {
    throw Z('BaseLoadable')
  }
  valueOrThrow() {
    throw Z(`Loadable expected value, but in "${this.state}" state`)
  }
  promiseMaybe() {
    throw Z('BaseLoadable')
  }
  promiseOrThrow() {
    throw Z(`Loadable expected promise, but in "${this.state}" state`)
  }
  errorMaybe() {
    throw Z('BaseLoadable')
  }
  errorOrThrow() {
    throw Z(`Loadable expected error, but in "${this.state}" state`)
  }
  is(t) {
    return t.state === this.state && t.contents === this.contents
  }
  map(t) {
    throw Z('BaseLoadable')
  }
}
class Cm extends Wl {
  constructor(t) {
    super(), G(this, 'state', 'hasValue'), G(this, 'contents', void 0), (this.contents = t)
  }
  getValue() {
    return this.contents
  }
  toPromise() {
    return Promise.resolve(this.contents)
  }
  valueMaybe() {
    return this.contents
  }
  valueOrThrow() {
    return this.contents
  }
  promiseMaybe() {}
  errorMaybe() {}
  map(t) {
    try {
      const n = t(this.contents)
      return ce(n) ? En(n) : or(n) ? n : fo(n)
    } catch (n) {
      return ce(n) ? En(n.next(() => this.map(t))) : Hl(n)
    }
  }
}
class Lm extends Wl {
  constructor(t) {
    super(), G(this, 'state', 'hasError'), G(this, 'contents', void 0), (this.contents = t)
  }
  getValue() {
    throw this.contents
  }
  toPromise() {
    return Promise.reject(this.contents)
  }
  valueMaybe() {}
  promiseMaybe() {}
  errorMaybe() {
    return this.contents
  }
  errorOrThrow() {
    return this.contents
  }
  map(t) {
    return this
  }
}
class Dd extends Wl {
  constructor(t) {
    super(), G(this, 'state', 'loading'), G(this, 'contents', void 0), (this.contents = t)
  }
  getValue() {
    throw this.contents
  }
  toPromise() {
    return this.contents
  }
  valueMaybe() {}
  promiseMaybe() {
    return this.contents
  }
  promiseOrThrow() {
    return this.contents
  }
  errorMaybe() {}
  map(t) {
    return En(
      this.contents
        .then((n) => {
          const r = t(n)
          if (or(r)) {
            const o = r
            switch (o.state) {
              case 'hasValue':
                return o.contents
              case 'hasError':
                throw o.contents
              case 'loading':
                return o.contents
            }
          }
          return r
        })
        .catch((n) => {
          if (ce(n)) return n.then(() => this.map(t).contents)
          throw n
        }),
    )
  }
}
function fo(e) {
  return Object.freeze(new Cm(e))
}
function Hl(e) {
  return Object.freeze(new Lm(e))
}
function En(e) {
  return Object.freeze(new Dd(e))
}
function Ud() {
  return Object.freeze(new Dd(new Promise(() => {})))
}
function Am(e) {
  return e.every((t) => t.state === 'hasValue')
    ? fo(e.map((t) => t.contents))
    : e.some((t) => t.state === 'hasError')
    ? Hl(
        fe(
          e.find((t) => t.state === 'hasError'),
          'Invalid loadable passed to loadableAll',
        ).contents,
      )
    : En(Promise.all(e.map((t) => t.contents)))
}
function $d(e) {
  const n = (Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map((o) => e[o])).map((o) =>
      or(o) ? o : ce(o) ? En(o) : fo(o),
    ),
    r = Am(n)
  return Array.isArray(e)
    ? r
    : r.map((o) => Object.getOwnPropertyNames(e).reduce((l, i, u) => ({ ...l, [i]: o[u] }), {}))
}
function or(e) {
  return e instanceof Wl
}
const xm = {
  of: (e) => (ce(e) ? En(e) : or(e) ? e : fo(e)),
  error: (e) => Hl(e),
  loading: () => Ud(),
  all: $d,
  isLoadable: or,
}
var Cn = {
    loadableWithValue: fo,
    loadableWithError: Hl,
    loadableWithPromise: En,
    loadableLoading: Ud,
    loadableAll: $d,
    isLoadable: or,
    RecoilLoadable: xm,
  },
  Pm = Cn.loadableWithValue,
  Mm = Cn.loadableWithError,
  Vm = Cn.loadableWithPromise,
  Im = Cn.loadableLoading,
  zm = Cn.loadableAll,
  Dm = Cn.isLoadable,
  Um = Cn.RecoilLoadable,
  po = Object.freeze({
    __proto__: null,
    loadableWithValue: Pm,
    loadableWithError: Mm,
    loadableWithPromise: Vm,
    loadableLoading: Im,
    loadableAll: zm,
    isLoadable: Dm,
    RecoilLoadable: Um,
  })
const Kl = new Map()
  .set('recoil_hamt_2020', !0)
  .set('recoil_sync_external_store', !0)
  .set('recoil_suppress_rerender_in_callback', !0)
  .set('recoil_memory_managament_2020', !0)
function Ql(e) {
  var t
  return (t = Kl.get(e)) !== null && t !== void 0 ? t : !1
}
Ql.setPass = (e) => {
  Kl.set(e, !0)
}
Ql.setFail = (e) => {
  Kl.set(e, !1)
}
Ql.clear = () => {
  Kl.clear()
}
var re = Ql
function $m(e, t, { error: n } = {}) {
  return null
}
var Om = $m,
  Ds = Om,
  Ui,
  $i,
  Oi
const Fm =
    (Ui = Ee.createMutableSource) !== null && Ui !== void 0 ? Ui : Ee.unstable_createMutableSource,
  Od = ($i = Ee.useMutableSource) !== null && $i !== void 0 ? $i : Ee.unstable_useMutableSource,
  Fd =
    (Oi = Ee.useSyncExternalStore) !== null && Oi !== void 0 ? Oi : Ee.unstable_useSyncExternalStore
function Bm() {
  var e
  const { ReactCurrentDispatcher: t, ReactCurrentOwner: n } =
    Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  return (
    ((e = t == null ? void 0 : t.current) !== null && e !== void 0 ? e : n.currentDispatcher)
      .useSyncExternalStore != null
  )
}
function jm() {
  return re('recoil_transition_support')
    ? { mode: 'TRANSITION_SUPPORT', early: !0, concurrent: !0 }
    : re('recoil_sync_external_store') && Fd != null
    ? { mode: 'SYNC_EXTERNAL_STORE', early: !0, concurrent: !1 }
    : re('recoil_mutable_source') &&
      Od != null &&
      typeof window < 'u' &&
      !window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE
    ? re('recoil_suppress_rerender_in_callback')
      ? { mode: 'MUTABLE_SOURCE', early: !0, concurrent: !0 }
      : { mode: 'MUTABLE_SOURCE', early: !1, concurrent: !1 }
    : re('recoil_suppress_rerender_in_callback')
    ? { mode: 'LEGACY', early: !0, concurrent: !1 }
    : { mode: 'LEGACY', early: !1, concurrent: !1 }
}
function Wm() {
  return !1
}
var ho = {
  createMutableSource: Fm,
  useMutableSource: Od,
  useSyncExternalStore: Fd,
  currentRendererSupportsUseSyncExternalStore: Bm,
  reactMode: jm,
  isFastRefreshEnabled: Wm,
}
const Bd = { RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: !0 }
function Hm() {
  var e, t, n
  if (typeof process > 'u' || ((e = process) === null || e === void 0 ? void 0 : e.env) == null)
    return
  const r =
    (t = {}.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED) === null ||
    t === void 0 ||
    (n = t.toLowerCase()) === null ||
    n === void 0
      ? void 0
      : n.trim()
  if (r == null || r === '') return
  if (!['true', 'false'].includes(r))
    throw Z(
      `({}).RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED value must be 'true', 'false', or empty: ${r}`,
    )
  Bd.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = r === 'true'
}
Hm()
var jd = Bd
class Us {
  constructor(t) {
    G(this, 'key', void 0), (this.key = t)
  }
  toJSON() {
    return { key: this.key }
  }
}
class Wd extends Us {}
class Hd extends Us {}
function Km(e) {
  return e instanceof Wd || e instanceof Hd
}
var Gl = { AbstractRecoilValue: Us, RecoilState: Wd, RecoilValueReadOnly: Hd, isRecoilValue: Km },
  Qm = Gl.AbstractRecoilValue,
  Gm = Gl.RecoilState,
  Ym = Gl.RecoilValueReadOnly,
  Zm = Gl.isRecoilValue,
  lr = Object.freeze({
    __proto__: null,
    AbstractRecoilValue: Qm,
    RecoilState: Gm,
    RecoilValueReadOnly: Ym,
    isRecoilValue: Zm,
  })
function Xm(e, t) {
  return (function* () {
    let n = 0
    for (const r of e) yield t(r, n++)
  })()
}
var Yl = Xm
class Kd {}
const Jm = new Kd(),
  Tn = new Map(),
  $s = new Map()
function qm(e) {
  return Yl(e, (t) => fe($s.get(t)))
}
function bm(e) {
  if (Tn.has(e)) {
    const t = `Duplicate atom key "${e}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`
    console.warn(t)
  }
}
function ey(e) {
  jd.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED && bm(e.key), Tn.set(e.key, e)
  const t = e.set == null ? new lr.RecoilValueReadOnly(e.key) : new lr.RecoilState(e.key)
  return $s.set(e.key, t), t
}
class Qd extends Error {}
function ty(e) {
  const t = Tn.get(e)
  if (t == null) throw new Qd(`Missing definition for RecoilValue: "${e}""`)
  return t
}
function ny(e) {
  return Tn.get(e)
}
const El = new Map()
function ry(e) {
  var t
  if (!re('recoil_memory_managament_2020')) return
  const n = Tn.get(e)
  if (n != null && (t = n.shouldDeleteConfigOnRelease) !== null && t !== void 0 && t.call(n)) {
    var r
    Tn.delete(e), (r = Gd(e)) === null || r === void 0 || r(), El.delete(e)
  }
}
function oy(e, t) {
  !re('recoil_memory_managament_2020') || (t === void 0 ? El.delete(e) : El.set(e, t))
}
function Gd(e) {
  return El.get(e)
}
var Ke = {
  nodes: Tn,
  recoilValues: $s,
  registerNode: ey,
  getNode: ty,
  getNodeMaybe: ny,
  deleteNodeConfigIfPossible: ry,
  setConfigDeletionHandler: oy,
  getConfigDeletionHandler: Gd,
  recoilValuesForKeys: qm,
  NodeMissingError: Qd,
  DefaultValue: Kd,
  DEFAULT_VALUE: Jm,
}
function ly(e, t) {
  t()
}
var iy = { enqueueExecution: ly }
function uy(e, t) {
  return (t = { exports: {} }), e(t, t.exports), t.exports
}
var sy = uy(function (e) {
  var t =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (g) {
            return typeof g
          }
        : function (g) {
            return g &&
              typeof Symbol == 'function' &&
              g.constructor === Symbol &&
              g !== Symbol.prototype
              ? 'symbol'
              : typeof g
          },
    n = {},
    r = 5,
    o = Math.pow(2, r),
    l = o - 1,
    i = o / 2,
    u = o / 4,
    s = {},
    a = function (v) {
      return function () {
        return v
      }
    },
    d = (n.hash = function (g) {
      var v = typeof g > 'u' ? 'undefined' : t(g)
      if (v === 'number') return g
      v !== 'string' && (g += '')
      for (var E = 0, x = 0, P = g.length; x < P; ++x) {
        var $ = g.charCodeAt(x)
        E = ((E << 5) - E + $) | 0
      }
      return E
    }),
    p = function (v) {
      return (
        (v -= (v >> 1) & 1431655765),
        (v = (v & 858993459) + ((v >> 2) & 858993459)),
        (v = (v + (v >> 4)) & 252645135),
        (v += v >> 8),
        (v += v >> 16),
        v & 127
      )
    },
    m = function (v, E) {
      return (E >>> v) & l
    },
    _ = function (v) {
      return 1 << v
    },
    S = function (v, E) {
      return p(v & (E - 1))
    },
    w = function (v, E, x, P) {
      var $ = P
      if (!v) {
        var Q = P.length
        $ = new Array(Q)
        for (var W = 0; W < Q; ++W) $[W] = P[W]
      }
      return ($[E] = x), $
    },
    B = function (v, E, x) {
      var P = x.length - 1,
        $ = 0,
        Q = 0,
        W = x
      if (v) $ = Q = E
      else for (W = new Array(P); $ < E; ) W[Q++] = x[$++]
      for (++$; $ <= P; ) W[Q++] = x[$++]
      return v && (W.length = P), W
    },
    h = function (v, E, x, P) {
      var $ = P.length
      if (v) {
        for (var Q = $; Q >= E; ) P[Q--] = P[Q]
        return (P[E] = x), P
      }
      for (var W = 0, H = 0, X = new Array($ + 1); W < E; ) X[H++] = P[W++]
      for (X[E] = x; W < $; ) X[++H] = P[W++]
      return X
    },
    c = 1,
    f = 2,
    R = 3,
    k = 4,
    C = { __hamt_isEmpty: !0 },
    L = function (v) {
      return v === C || (v && v.__hamt_isEmpty)
    },
    I = function (v, E, x, P) {
      return { type: c, edit: v, hash: E, key: x, value: P, _modify: M }
    },
    b = function (v, E, x) {
      return { type: f, edit: v, hash: E, children: x, _modify: j }
    },
    U = function (v, E, x) {
      return { type: R, edit: v, mask: E, children: x, _modify: V }
    },
    ne = function (v, E, x) {
      return { type: k, edit: v, size: E, children: x, _modify: O }
    },
    Qe = function (v) {
      return v === C || v.type === c || v.type === f
    },
    de = function (v, E, x, P, $) {
      for (var Q = [], W = P, H = 0, X = 0; W; ++X) W & 1 && (Q[X] = $[H++]), (W >>>= 1)
      return (Q[E] = x), ne(v, H + 1, Q)
    },
    xe = function (v, E, x, P) {
      for (var $ = new Array(E - 1), Q = 0, W = 0, H = 0, X = P.length; H < X; ++H)
        if (H !== x) {
          var se = P[H]
          se && !L(se) && (($[Q++] = se), (W |= 1 << H))
        }
      return U(v, W, $)
    },
    $t = function g(v, E, x, P, $, Q) {
      if (x === $) return b(v, x, [Q, P])
      var W = m(E, x),
        H = m(E, $)
      return U(v, _(W) | _(H), W === H ? [g(v, E + r, x, P, $, Q)] : W < H ? [P, Q] : [Q, P])
    },
    St = function (v, E, x, P, $, Q, W, H) {
      for (var X = $.length, se = 0; se < X; ++se) {
        var $e = $[se]
        if (x(W, $e.key)) {
          var Te = $e.value,
            nt = Q(Te)
          return nt === Te ? $ : nt === s ? (--H.value, B(v, se, $)) : w(v, se, I(E, P, W, nt), $)
        }
      }
      var ct = Q()
      return ct === s ? $ : (++H.value, w(v, X, I(E, P, W, ct), $))
    },
    Ge = function (v, E) {
      return v === E.edit
    },
    M = function (v, E, x, P, $, Q, W) {
      if (E(Q, this.key)) {
        var H = P(this.value)
        return H === this.value
          ? this
          : H === s
          ? (--W.value, C)
          : Ge(v, this)
          ? ((this.value = H), this)
          : I(v, $, Q, H)
      }
      var X = P()
      return X === s ? this : (++W.value, $t(v, x, this.hash, this, $, I(v, $, Q, X)))
    },
    j = function (v, E, x, P, $, Q, W) {
      if ($ === this.hash) {
        var H = Ge(v, this),
          X = St(H, v, E, this.hash, this.children, P, Q, W)
        return X === this.children ? this : X.length > 1 ? b(v, this.hash, X) : X[0]
      }
      var se = P()
      return se === s ? this : (++W.value, $t(v, x, this.hash, this, $, I(v, $, Q, se)))
    },
    V = function (v, E, x, P, $, Q, W) {
      var H = this.mask,
        X = this.children,
        se = m(x, $),
        $e = _(se),
        Te = S(H, $e),
        nt = H & $e,
        ct = nt ? X[Te] : C,
        An = ct._modify(v, E, x + r, P, $, Q, W)
      if (ct === An) return this
      var So = Ge(v, this),
        dr = H,
        pr = void 0
      if (nt && L(An)) {
        if (((dr &= ~$e), !dr)) return C
        if (X.length <= 2 && Qe(X[Te ^ 1])) return X[Te ^ 1]
        pr = B(So, Te, X)
      } else if (!nt && !L(An)) {
        if (X.length >= i) return de(v, se, An, H, X)
        ;(dr |= $e), (pr = h(So, Te, An, X))
      } else pr = w(So, Te, An, X)
      return So ? ((this.mask = dr), (this.children = pr), this) : U(v, dr, pr)
    },
    O = function (v, E, x, P, $, Q, W) {
      var H = this.size,
        X = this.children,
        se = m(x, $),
        $e = X[se],
        Te = ($e || C)._modify(v, E, x + r, P, $, Q, W)
      if ($e === Te) return this
      var nt = Ge(v, this),
        ct = void 0
      if (L($e) && !L(Te)) ++H, (ct = w(nt, se, Te, X))
      else if (!L($e) && L(Te)) {
        if ((--H, H <= u)) return xe(v, H, se, X)
        ct = w(nt, se, C, X)
      } else ct = w(nt, se, Te, X)
      return nt ? ((this.size = H), (this.children = ct), this) : ne(v, H, ct)
    }
  C._modify = function (g, v, E, x, P, $, Q) {
    var W = x()
    return W === s ? C : (++Q.value, I(g, P, $, W))
  }
  function y(g, v, E, x, P) {
    ;(this._editable = g), (this._edit = v), (this._config = E), (this._root = x), (this._size = P)
  }
  y.prototype.setTree = function (g, v) {
    return this._editable
      ? ((this._root = g), (this._size = v), this)
      : g === this._root
      ? this
      : new y(this._editable, this._edit, this._config, g, v)
  }
  var N = (n.tryGetHash = function (g, v, E, x) {
    for (var P = x._root, $ = 0, Q = x._config.keyEq; ; )
      switch (P.type) {
        case c:
          return Q(E, P.key) ? P.value : g
        case f: {
          if (v === P.hash)
            for (var W = P.children, H = 0, X = W.length; H < X; ++H) {
              var se = W[H]
              if (Q(E, se.key)) return se.value
            }
          return g
        }
        case R: {
          var $e = m($, v),
            Te = _($e)
          if (P.mask & Te) {
            ;(P = P.children[S(P.mask, Te)]), ($ += r)
            break
          }
          return g
        }
        case k: {
          if (((P = P.children[m($, v)]), P)) {
            $ += r
            break
          }
          return g
        }
        default:
          return g
      }
  })
  y.prototype.tryGetHash = function (g, v, E) {
    return N(g, v, E, this)
  }
  var A = (n.tryGet = function (g, v, E) {
    return N(g, E._config.hash(v), v, E)
  })
  y.prototype.tryGet = function (g, v) {
    return A(g, v, this)
  }
  var K = (n.getHash = function (g, v, E) {
    return N(void 0, g, v, E)
  })
  ;(y.prototype.getHash = function (g, v) {
    return K(g, v, this)
  }),
    (n.get = function (g, v) {
      return N(void 0, v._config.hash(g), g, v)
    }),
    (y.prototype.get = function (g, v) {
      return A(v, g, this)
    })
  var z = (n.has = function (g, v, E) {
    return N(s, g, v, E) !== s
  })
  y.prototype.hasHash = function (g, v) {
    return z(g, v, this)
  }
  var Y = (n.has = function (g, v) {
    return z(v._config.hash(g), g, v)
  })
  y.prototype.has = function (g) {
    return Y(g, this)
  }
  var J = function (v, E) {
    return v === E
  }
  ;(n.make = function (g) {
    return new y(0, 0, { keyEq: (g && g.keyEq) || J, hash: (g && g.hash) || d }, C, 0)
  }),
    (n.empty = n.make())
  var F = (n.isEmpty = function (g) {
    return g && !!L(g._root)
  })
  y.prototype.isEmpty = function () {
    return F(this)
  }
  var ue = (n.modifyHash = function (g, v, E, x) {
    var P = { value: x._size },
      $ = x._root._modify(x._editable ? x._edit : NaN, x._config.keyEq, 0, g, v, E, P)
    return x.setTree($, P.value)
  })
  y.prototype.modifyHash = function (g, v, E) {
    return ue(E, g, v, this)
  }
  var _e = (n.modify = function (g, v, E) {
    return ue(g, E._config.hash(v), v, E)
  })
  y.prototype.modify = function (g, v) {
    return _e(v, g, this)
  }
  var te = (n.setHash = function (g, v, E, x) {
    return ue(a(E), g, v, x)
  })
  y.prototype.setHash = function (g, v, E) {
    return te(g, v, E, this)
  }
  var pe = (n.set = function (g, v, E) {
    return te(E._config.hash(g), g, v, E)
  })
  y.prototype.set = function (g, v) {
    return pe(g, v, this)
  }
  var at = a(s),
    an = (n.removeHash = function (g, v, E) {
      return ue(at, g, v, E)
    })
  y.prototype.removeHash = y.prototype.deleteHash = function (g, v) {
    return an(g, v, this)
  }
  var tt = (n.remove = function (g, v) {
    return an(v._config.hash(g), g, v)
  })
  y.prototype.remove = y.prototype.delete = function (g) {
    return tt(g, this)
  }
  var Ye = (n.beginMutation = function (g) {
    return new y(g._editable + 1, g._edit + 1, g._config, g._root, g._size)
  })
  y.prototype.beginMutation = function () {
    return Ye(this)
  }
  var ea = (n.endMutation = function (g) {
    return (g._editable = g._editable && g._editable - 1), g
  })
  y.prototype.endMutation = function () {
    return ea(this)
  }
  var nh = (n.mutate = function (g, v) {
    var E = Ye(v)
    return g(E), ea(E)
  })
  y.prototype.mutate = function (g) {
    return nh(g, this)
  }
  var ai = function (v) {
      return v && ta(v[0], v[1], v[2], v[3], v[4])
    },
    ta = function (v, E, x, P, $) {
      for (; x < v; ) {
        var Q = E[x++]
        if (Q && !L(Q)) return na(Q, P, [v, E, x, P, $])
      }
      return ai($)
    },
    na = function (v, E, x) {
      switch (v.type) {
        case c:
          return { value: E(v), rest: x }
        case f:
        case k:
        case R:
          var P = v.children
          return ta(P.length, P, 0, E, x)
        default:
          return ai(x)
      }
    },
    rh = { done: !0 }
  function ci(g) {
    this.v = g
  }
  ;(ci.prototype.next = function () {
    if (!this.v) return rh
    var g = this.v
    return (this.v = ai(g.rest)), g
  }),
    (ci.prototype[Symbol.iterator] = function () {
      return this
    })
  var fi = function (v, E) {
      return new ci(na(v._root, E))
    },
    oh = function (v) {
      return [v.key, v.value]
    },
    lh = (n.entries = function (g) {
      return fi(g, oh)
    })
  y.prototype.entries = y.prototype[Symbol.iterator] = function () {
    return lh(this)
  }
  var ih = function (v) {
      return v.key
    },
    uh = (n.keys = function (g) {
      return fi(g, ih)
    })
  y.prototype.keys = function () {
    return uh(this)
  }
  var sh = function (v) {
      return v.value
    },
    ah =
      (n.values =
      y.prototype.values =
        function (g) {
          return fi(g, sh)
        })
  y.prototype.values = function () {
    return ah(this)
  }
  var ra = (n.fold = function (g, v, E) {
    var x = E._root
    if (x.type === c) return g(v, x.value, x.key)
    for (var P = [x.children], $ = void 0; ($ = P.pop()); )
      for (var Q = 0, W = $.length; Q < W; ) {
        var H = $[Q++]
        H && H.type && (H.type === c ? (v = g(v, H.value, H.key)) : P.push(H.children))
      }
    return v
  })
  y.prototype.fold = function (g, v) {
    return ra(g, v, this)
  }
  var ch = (n.forEach = function (g, v) {
    return ra(
      function (E, x, P) {
        return g(x, P, v)
      },
      null,
      v,
    )
  })
  y.prototype.forEach = function (g) {
    return ch(g, this)
  }
  var fh = (n.count = function (g) {
    return g._size
  })
  ;(y.prototype.count = function () {
    return fh(this)
  }),
    Object.defineProperty(y.prototype, 'size', { get: y.prototype.count }),
    e.exports ? (e.exports = n) : ((void 0).hamt = n)
})
class ay {
  constructor(t) {
    G(this, '_map', void 0), (this._map = new Map(t == null ? void 0 : t.entries()))
  }
  keys() {
    return this._map.keys()
  }
  entries() {
    return this._map.entries()
  }
  get(t) {
    return this._map.get(t)
  }
  has(t) {
    return this._map.has(t)
  }
  set(t, n) {
    return this._map.set(t, n), this
  }
  delete(t) {
    return this._map.delete(t), this
  }
  clone() {
    return Fs(this)
  }
  toMap() {
    return new Map(this._map)
  }
}
class Os {
  constructor(t) {
    if ((G(this, '_hamt', sy.empty.beginMutation()), t instanceof Os)) {
      const n = t._hamt.endMutation()
      ;(t._hamt = n.beginMutation()), (this._hamt = n.beginMutation())
    } else if (t) for (const [n, r] of t.entries()) this._hamt.set(n, r)
  }
  keys() {
    return this._hamt.keys()
  }
  entries() {
    return this._hamt.entries()
  }
  get(t) {
    return this._hamt.get(t)
  }
  has(t) {
    return this._hamt.has(t)
  }
  set(t, n) {
    return this._hamt.set(t, n), this
  }
  delete(t) {
    return this._hamt.delete(t), this
  }
  clone() {
    return Fs(this)
  }
  toMap() {
    return new Map(this._hamt)
  }
}
function Fs(e) {
  return re('recoil_hamt_2020') ? new Os(e) : new ay(e)
}
var cy = { persistentMap: Fs },
  fy = cy.persistentMap,
  dy = Object.freeze({ __proto__: null, persistentMap: fy })
function py(e, ...t) {
  const n = new Set()
  e: for (const r of e) {
    for (const o of t) if (o.has(r)) continue e
    n.add(r)
  }
  return n
}
var Br = py
function hy(e, t) {
  const n = new Map()
  return (
    e.forEach((r, o) => {
      n.set(o, t(r, o))
    }),
    n
  )
}
var Tl = hy
function vy() {
  return { nodeDeps: new Map(), nodeToNodeSubscriptions: new Map() }
}
function my(e) {
  return {
    nodeDeps: Tl(e.nodeDeps, (t) => new Set(t)),
    nodeToNodeSubscriptions: Tl(e.nodeToNodeSubscriptions, (t) => new Set(t)),
  }
}
function Fi(e, t, n, r) {
  const { nodeDeps: o, nodeToNodeSubscriptions: l } = n,
    i = o.get(e)
  if (i && r && i !== r.nodeDeps.get(e)) return
  o.set(e, t)
  const u = i == null ? t : Br(t, i)
  for (const s of u) l.has(s) || l.set(s, new Set()), fe(l.get(s)).add(e)
  if (i) {
    const s = Br(i, t)
    for (const a of s) {
      if (!l.has(a)) return
      const d = fe(l.get(a))
      d.delete(e), d.size === 0 && l.delete(a)
    }
  }
}
function yy(e, t, n, r) {
  var o, l, i, u
  const s = n.getState()
  r === s.currentTree.version ||
    r === ((o = s.nextTree) === null || o === void 0 ? void 0 : o.version) ||
    (l = s.previousTree) === null ||
    l === void 0 ||
    l.version
  const a = n.getGraph(r)
  if ((Fi(e, t, a), r === ((i = s.previousTree) === null || i === void 0 ? void 0 : i.version))) {
    const p = n.getGraph(s.currentTree.version)
    Fi(e, t, p, a)
  }
  if (
    r === ((u = s.previousTree) === null || u === void 0 ? void 0 : u.version) ||
    r === s.currentTree.version
  ) {
    var d
    const p = (d = s.nextTree) === null || d === void 0 ? void 0 : d.version
    if (p !== void 0) {
      const m = n.getGraph(p)
      Fi(e, t, m, a)
    }
  }
}
var vo = { cloneGraph: my, graph: vy, saveDepsToStore: yy }
let gy = 0
const Sy = () => gy++
let _y = 0
const wy = () => _y++
let Ry = 0
const Ey = () => Ry++
var Zl = { getNextTreeStateVersion: Sy, getNextStoreID: wy, getNextComponentID: Ey }
const { persistentMap: ac } = dy,
  { graph: Ty } = vo,
  { getNextTreeStateVersion: Yd } = Zl
function Zd() {
  const e = Yd()
  return {
    version: e,
    stateID: e,
    transactionMetadata: {},
    dirtyAtoms: new Set(),
    atomValues: ac(),
    nonvalidatedAtoms: ac(),
  }
}
function ky() {
  const e = Zd()
  return {
    currentTree: e,
    nextTree: null,
    previousTree: null,
    commitDepth: 0,
    knownAtoms: new Set(),
    knownSelectors: new Set(),
    transactionSubscriptions: new Map(),
    nodeTransactionSubscriptions: new Map(),
    nodeToComponentSubscriptions: new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: new Set(),
    graphsByVersion: new Map().set(e.version, Ty()),
    retention: {
      referenceCounts: new Map(),
      nodesRetainedByZone: new Map(),
      retainablesToCheckForRelease: new Set(),
    },
    nodeCleanupFunctions: new Map(),
  }
}
var Xd = { makeEmptyTreeState: Zd, makeEmptyStoreState: ky, getNextTreeStateVersion: Yd }
class Jd {}
function Ny() {
  return new Jd()
}
var Xl = { RetentionZone: Jd, retentionZone: Ny }
function Cy(e, t) {
  const n = new Set(e)
  return n.add(t), n
}
function Ly(e, t) {
  const n = new Set(e)
  return n.delete(t), n
}
function Ay(e, t, n) {
  const r = new Map(e)
  return r.set(t, n), r
}
function xy(e, t, n) {
  const r = new Map(e)
  return r.set(t, n(r.get(t))), r
}
function Py(e, t) {
  const n = new Map(e)
  return n.delete(t), n
}
function My(e, t) {
  const n = new Map(e)
  return t.forEach((r) => n.delete(r)), n
}
var qd = {
  setByAddingToSet: Cy,
  setByDeletingFromSet: Ly,
  mapBySettingInMap: Ay,
  mapByUpdatingInMap: xy,
  mapByDeletingFromMap: Py,
  mapByDeletingMultipleFromMap: My,
}
function* Vy(e, t) {
  let n = 0
  for (const r of e) t(r, n++) && (yield r)
}
var Bs = Vy
function Iy(e, t) {
  return new Proxy(e, {
    get: (r, o) => (!(o in r) && o in t && (r[o] = t[o]()), r[o]),
    ownKeys: (r) => Object.keys(r),
  })
}
var bd = Iy
const { getNode: mo, getNodeMaybe: zy, recoilValuesForKeys: cc } = Ke,
  { RetentionZone: fc } = Xl,
  { setByAddingToSet: Dy } = qd,
  Uy = Object.freeze(new Set())
class $y extends Error {}
function Oy(e, t, n) {
  if (!re('recoil_memory_managament_2020')) return () => {}
  const { nodesRetainedByZone: r } = e.getState().retention
  function o(l) {
    let i = r.get(l)
    i || r.set(l, (i = new Set())), i.add(t)
  }
  if (n instanceof fc) o(n)
  else if (Array.isArray(n)) for (const l of n) o(l)
  return () => {
    if (!re('recoil_memory_managament_2020')) return
    const { retention: l } = e.getState()
    function i(u) {
      const s = l.nodesRetainedByZone.get(u)
      s == null || s.delete(t), s && s.size === 0 && l.nodesRetainedByZone.delete(u)
    }
    if (n instanceof fc) i(n)
    else if (Array.isArray(n)) for (const u of n) i(u)
  }
}
function js(e, t, n, r) {
  const o = e.getState()
  if (o.nodeCleanupFunctions.has(n)) return
  const l = mo(n),
    i = Oy(e, n, l.retainedBy),
    u = l.init(e, t, r)
  o.nodeCleanupFunctions.set(n, () => {
    u(), i()
  })
}
function Fy(e, t, n) {
  js(e, e.getState().currentTree, t, n)
}
function By(e, t) {
  var n
  const r = e.getState()
  ;(n = r.nodeCleanupFunctions.get(t)) === null || n === void 0 || n(),
    r.nodeCleanupFunctions.delete(t)
}
function jy(e, t, n) {
  return js(e, t, n, 'get'), mo(n).get(e, t)
}
function ep(e, t, n) {
  return mo(n).peek(e, t)
}
function Wy(e, t, n) {
  var r
  const o = zy(t)
  return (
    o == null || (r = o.invalidate) === null || r === void 0 || r.call(o, e),
    {
      ...e,
      atomValues: e.atomValues.clone().delete(t),
      nonvalidatedAtoms: e.nonvalidatedAtoms.clone().set(t, n),
      dirtyAtoms: Dy(e.dirtyAtoms, t),
    }
  )
}
function Hy(e, t, n, r) {
  const o = mo(n)
  if (o.set == null) throw new $y(`Attempt to set read-only RecoilValue: ${n}`)
  const l = o.set
  return js(e, t, n, 'set'), l(e, t, r)
}
function Ky(e, t, n) {
  const r = e.getState(),
    o = e.getGraph(t.version),
    l = mo(n).nodeType
  return bd(
    { type: l },
    {
      loadable: () => ep(e, t, n),
      isActive: () => r.knownAtoms.has(n) || r.knownSelectors.has(n),
      isSet: () => (l === 'selector' ? !1 : t.atomValues.has(n)),
      isModified: () => t.dirtyAtoms.has(n),
      deps: () => {
        var i
        return cc((i = o.nodeDeps.get(n)) !== null && i !== void 0 ? i : [])
      },
      subscribers: () => {
        var i, u
        return {
          nodes: cc(Bs(tp(e, t, new Set([n])), (s) => s !== n)),
          components: Yl(
            (i =
              (u = r.nodeToComponentSubscriptions.get(n)) === null || u === void 0
                ? void 0
                : u.values()) !== null && i !== void 0
              ? i
              : [],
            ([s]) => ({ name: s }),
          ),
        }
      },
    },
  )
}
function tp(e, t, n) {
  const r = new Set(),
    o = Array.from(n),
    l = e.getGraph(t.version)
  for (let u = o.pop(); u; u = o.pop()) {
    var i
    r.add(u)
    const s = (i = l.nodeToNodeSubscriptions.get(u)) !== null && i !== void 0 ? i : Uy
    for (const a of s) r.has(a) || o.push(a)
  }
  return r
}
var un = {
  getNodeLoadable: jy,
  peekNodeLoadable: ep,
  setNodeValue: Hy,
  initializeNode: Fy,
  cleanUpNode: By,
  setUnvalidatedAtomValue_DEPRECATED: Wy,
  peekNodeInfo: Ky,
  getDownstreamNodes: tp,
}
let np = null
function Qy(e) {
  np = e
}
function Gy() {
  var e
  ;(e = np) === null || e === void 0 || e()
}
var rp = { setInvalidateMemoizedSnapshot: Qy, invalidateMemoizedSnapshot: Gy }
const { getDownstreamNodes: Yy, getNodeLoadable: op, setNodeValue: Zy } = un,
  { getNextComponentID: Xy } = Zl,
  { getNode: Jy, getNodeMaybe: lp } = Ke,
  { DefaultValue: Ws } = Ke,
  { reactMode: qy } = ho,
  { AbstractRecoilValue: by, RecoilState: eg, RecoilValueReadOnly: tg, isRecoilValue: ng } = lr,
  { invalidateMemoizedSnapshot: rg } = rp
function og(e, { key: t }, n = e.getState().currentTree) {
  var r, o
  const l = e.getState()
  n.version === l.currentTree.version ||
    n.version === ((r = l.nextTree) === null || r === void 0 ? void 0 : r.version) ||
    (n.version, (o = l.previousTree) === null || o === void 0 || o.version)
  const i = op(e, n, t)
  return i.state === 'loading' && i.contents.catch(() => {}), i
}
function lg(e, t) {
  const n = e.clone()
  return (
    t.forEach((r, o) => {
      r.state === 'hasValue' && r.contents instanceof Ws ? n.delete(o) : n.set(o, r)
    }),
    n
  )
}
function ig(e, t, { key: n }, r) {
  if (typeof r == 'function') {
    const o = op(e, t, n)
    if (o.state === 'loading') {
      const l = `Tried to set atom or selector "${n}" using an updater function while the current state is pending, this is not currently supported.`
      throw Z(l)
    } else if (o.state === 'hasError') throw o.contents
    return r(o.contents)
  } else return r
}
function ug(e, t, n) {
  if (n.type === 'set') {
    const { recoilValue: o, valueOrUpdater: l } = n,
      i = ig(e, t, o, l),
      u = Zy(e, t, o.key, i)
    for (const [s, a] of u.entries()) Uu(t, s, a)
  } else if (n.type === 'setLoadable') {
    const {
      recoilValue: { key: o },
      loadable: l,
    } = n
    Uu(t, o, l)
  } else if (n.type === 'markModified') {
    const {
      recoilValue: { key: o },
    } = n
    t.dirtyAtoms.add(o)
  } else if (n.type === 'setUnvalidated') {
    var r
    const {
        recoilValue: { key: o },
        unvalidatedValue: l,
      } = n,
      i = lp(o)
    i == null || (r = i.invalidate) === null || r === void 0 || r.call(i, t),
      t.atomValues.delete(o),
      t.nonvalidatedAtoms.set(o, l),
      t.dirtyAtoms.add(o)
  } else Ds(`Unknown action ${n.type}`)
}
function Uu(e, t, n) {
  n.state === 'hasValue' && n.contents instanceof Ws
    ? e.atomValues.delete(t)
    : e.atomValues.set(t, n),
    e.dirtyAtoms.add(t),
    e.nonvalidatedAtoms.delete(t)
}
function ip(e, t) {
  e.replaceState((n) => {
    const r = up(n)
    for (const o of t) ug(e, r, o)
    return sp(e, r), rg(), r
  })
}
function Jl(e, t) {
  if (jr.length) {
    const n = jr[jr.length - 1]
    let r = n.get(e)
    r || n.set(e, (r = [])), r.push(t)
  } else ip(e, [t])
}
const jr = []
function sg() {
  const e = new Map()
  return (
    jr.push(e),
    () => {
      for (const [t, n] of e) ip(t, n)
      jr.pop()
    }
  )
}
function up(e) {
  return {
    ...e,
    atomValues: e.atomValues.clone(),
    nonvalidatedAtoms: e.nonvalidatedAtoms.clone(),
    dirtyAtoms: new Set(e.dirtyAtoms),
  }
}
function sp(e, t) {
  const n = Yy(e, t, t.dirtyAtoms)
  for (const l of n) {
    var r, o
    ;(r = lp(l)) === null ||
      r === void 0 ||
      (o = r.invalidate) === null ||
      o === void 0 ||
      o.call(r, t)
  }
}
function ap(e, t, n) {
  Jl(e, { type: 'set', recoilValue: t, valueOrUpdater: n })
}
function ag(e, t, n) {
  if (n instanceof Ws) return ap(e, t, n)
  Jl(e, { type: 'setLoadable', recoilValue: t, loadable: n })
}
function cg(e, t) {
  Jl(e, { type: 'markModified', recoilValue: t })
}
function fg(e, t, n) {
  Jl(e, { type: 'setUnvalidated', recoilValue: t, unvalidatedValue: n })
}
function dg(e, { key: t }, n, r = null) {
  const o = Xy(),
    l = e.getState()
  l.nodeToComponentSubscriptions.has(t) || l.nodeToComponentSubscriptions.set(t, new Map()),
    fe(l.nodeToComponentSubscriptions.get(t)).set(o, [r != null ? r : '<not captured>', n])
  const i = qy()
  if (i.early && (i.mode === 'LEGACY' || i.mode === 'MUTABLE_SOURCE')) {
    const u = e.getState().nextTree
    u && u.dirtyAtoms.has(t) && n(u)
  }
  return {
    release: () => {
      const u = e.getState(),
        s = u.nodeToComponentSubscriptions.get(t)
      s === void 0 ||
        !s.has(o) ||
        (s.delete(o), s.size === 0 && u.nodeToComponentSubscriptions.delete(t))
    },
  }
}
function pg(e, t) {
  var n
  const { currentTree: r } = e.getState(),
    o = Jy(t.key)
  ;(n = o.clearCache) === null || n === void 0 || n.call(o, e, r)
}
var kt = {
  RecoilValueReadOnly: tg,
  AbstractRecoilValue: by,
  RecoilState: eg,
  getRecoilValueAsLoadable: og,
  setRecoilValue: ap,
  setRecoilValueLoadable: ag,
  markRecoilValueModified: cg,
  setUnvalidatedRecoilValue: fg,
  subscribeToRecoilValue: dg,
  isRecoilValue: ng,
  applyAtomValueWrites: lg,
  batchStart: sg,
  writeLoadableToTreeState: Uu,
  invalidateDownstreams: sp,
  copyTreeState: up,
  refreshRecoilValue: pg,
}
function hg(e, t, n) {
  const r = e.entries()
  let o = r.next()
  for (; !o.done; ) {
    const l = o.value
    if (t.call(n, l[1], l[0], e)) return !0
    o = r.next()
  }
  return !1
}
var vg = hg
const { cleanUpNode: mg } = un,
  { deleteNodeConfigIfPossible: yg, getNode: cp } = Ke,
  { RetentionZone: fp } = Xl,
  gg = 12e4,
  dp = new Set()
function pp(e, t) {
  const n = e.getState(),
    r = n.currentTree
  if (n.nextTree) return
  const o = new Set()
  for (const i of t)
    if (i instanceof fp) for (const u of Rg(n, i)) o.add(u)
    else o.add(i)
  const l = Sg(e, o)
  for (const i of l) wg(e, r, i)
}
function Sg(e, t) {
  const n = e.getState(),
    r = n.currentTree,
    o = e.getGraph(r.version),
    l = new Set(),
    i = new Set()
  return u(t), l
  function u(s) {
    const a = new Set(),
      d = _g(e, r, s, l, i)
    for (const S of d) {
      var p
      if (cp(S).retainedBy === 'recoilRoot') {
        i.add(S)
        continue
      }
      if (((p = n.retention.referenceCounts.get(S)) !== null && p !== void 0 ? p : 0) > 0) {
        i.add(S)
        continue
      }
      if (hp(S).some((B) => n.retention.referenceCounts.get(B))) {
        i.add(S)
        continue
      }
      const w = o.nodeToNodeSubscriptions.get(S)
      if (w && vg(w, (B) => i.has(B))) {
        i.add(S)
        continue
      }
      l.add(S), a.add(S)
    }
    const m = new Set()
    for (const S of a)
      for (const w of (_ = o.nodeDeps.get(S)) !== null && _ !== void 0 ? _ : dp) {
        var _
        l.has(w) || m.add(w)
      }
    m.size && u(m)
  }
}
function _g(e, t, n, r, o) {
  const l = e.getGraph(t.version),
    i = [],
    u = new Set()
  for (; n.size > 0; ) s(fe(n.values().next().value))
  return i
  function s(a) {
    if (r.has(a) || o.has(a)) {
      n.delete(a)
      return
    }
    if (u.has(a)) return
    const d = l.nodeToNodeSubscriptions.get(a)
    if (d) for (const p of d) s(p)
    u.add(a), n.delete(a), i.push(a)
  }
}
function wg(e, t, n) {
  if (!re('recoil_memory_managament_2020')) return
  mg(e, n)
  const r = e.getState()
  r.knownAtoms.delete(n),
    r.knownSelectors.delete(n),
    r.nodeTransactionSubscriptions.delete(n),
    r.retention.referenceCounts.delete(n)
  const o = hp(n)
  for (const s of o) {
    var l
    ;(l = r.retention.nodesRetainedByZone.get(s)) === null || l === void 0 || l.delete(n)
  }
  t.atomValues.delete(n), t.dirtyAtoms.delete(n), t.nonvalidatedAtoms.delete(n)
  const i = r.graphsByVersion.get(t.version)
  if (i) {
    const s = i.nodeDeps.get(n)
    if (s !== void 0) {
      i.nodeDeps.delete(n)
      for (const a of s) {
        var u
        ;(u = i.nodeToNodeSubscriptions.get(a)) === null || u === void 0 || u.delete(n)
      }
    }
    i.nodeToNodeSubscriptions.delete(n)
  }
  yg(n)
}
function Rg(e, t) {
  var n
  return (n = e.retention.nodesRetainedByZone.get(t)) !== null && n !== void 0 ? n : dp
}
function hp(e) {
  const t = cp(e).retainedBy
  return t === void 0 || t === 'components' || t === 'recoilRoot' ? [] : t instanceof fp ? [t] : t
}
function Eg(e, t) {
  const n = e.getState()
  n.nextTree ? n.retention.retainablesToCheckForRelease.add(t) : pp(e, new Set([t]))
}
function Tg(e, t, n) {
  var r
  if (!re('recoil_memory_managament_2020')) return
  const o = e.getState().retention.referenceCounts,
    l = ((r = o.get(t)) !== null && r !== void 0 ? r : 0) + n
  l === 0 ? vp(e, t) : o.set(t, l)
}
function vp(e, t) {
  if (!re('recoil_memory_managament_2020')) return
  e.getState().retention.referenceCounts.delete(t), Eg(e, t)
}
function kg(e) {
  if (!re('recoil_memory_managament_2020')) return
  const t = e.getState()
  pp(e, t.retention.retainablesToCheckForRelease), t.retention.retainablesToCheckForRelease.clear()
}
function Ng(e) {
  return e === void 0 ? 'recoilRoot' : e
}
var Ln = {
  SUSPENSE_TIMEOUT_MS: gg,
  updateRetainCount: Tg,
  updateRetainCountToZero: vp,
  releaseScheduledRetainablesNow: kg,
  retainedByOptionWithDefault: Ng,
}
const { unstable_batchedUpdates: Cg } = vm
var Lg = { unstable_batchedUpdates: Cg }
const { unstable_batchedUpdates: Ag } = Lg
var xg = { unstable_batchedUpdates: Ag }
const { batchStart: Pg } = kt,
  { unstable_batchedUpdates: Mg } = xg
let Hs = Mg
const Vg = (e) => {
    Hs = e
  },
  Ig = () => Hs,
  zg = (e) => {
    Hs(() => {
      let t = () => {}
      try {
        ;(t = Pg()), e()
      } finally {
        t()
      }
    })
  }
var ql = { getBatcher: Ig, setBatcher: Vg, batchUpdates: zg }
function* Dg(e) {
  for (const t of e) for (const n of t) yield n
}
var mp = Dg
const yp = typeof Window > 'u' || typeof window > 'u',
  Ug = (e) => !yp && (e === window || e instanceof Window),
  $g = typeof navigator < 'u' && navigator.product === 'ReactNative'
var Ks = { isSSR: yp, isReactNative: $g, isWindow: Ug }
function Og(e, t) {
  let n
  return (...o) => {
    n || (n = {})
    const l = t(...o)
    return Object.hasOwnProperty.call(n, l) || (n[l] = e(...o)), n[l]
  }
}
function Fg(e, t) {
  let n, r
  return (...l) => {
    const i = t(...l)
    return n === i || ((n = i), (r = e(...l))), r
  }
}
function Bg(e, t) {
  let n, r
  return [
    (...i) => {
      const u = t(...i)
      return n === u || ((n = u), (r = e(...i))), r
    },
    () => {
      n = null
    },
  ]
}
var jg = {
  memoizeWithArgsHash: Og,
  memoizeOneWithArgsHash: Fg,
  memoizeOneWithArgsHashAndInvalidation: Bg,
}
const { batchUpdates: $u } = ql,
  { initializeNode: Wg, peekNodeInfo: Hg } = un,
  { graph: Kg } = vo,
  { getNextStoreID: Qg } = Zl,
  { DEFAULT_VALUE: Gg, recoilValues: dc, recoilValuesForKeys: pc } = Ke,
  {
    AbstractRecoilValue: Yg,
    getRecoilValueAsLoadable: Zg,
    setRecoilValue: hc,
    setUnvalidatedRecoilValue: Xg,
  } = kt,
  { updateRetainCount: Jo } = Ln,
  { setInvalidateMemoizedSnapshot: Jg } = rp,
  { getNextTreeStateVersion: qg, makeEmptyStoreState: bg } = Xd,
  { isSSR: e0 } = Ks,
  { memoizeOneWithArgsHashAndInvalidation: t0 } = jg
class bl {
  constructor(t, n) {
    G(this, '_store', void 0),
      G(this, '_refCount', 1),
      G(this, 'getLoadable', (r) => (this.checkRefCount_INTERNAL(), Zg(this._store, r))),
      G(
        this,
        'getPromise',
        (r) => (this.checkRefCount_INTERNAL(), this.getLoadable(r).toPromise()),
      ),
      G(this, 'getNodes_UNSTABLE', (r) => {
        if ((this.checkRefCount_INTERNAL(), (r == null ? void 0 : r.isModified) === !0)) {
          if ((r == null ? void 0 : r.isInitialized) === !1) return []
          const i = this._store.getState().currentTree
          return pc(i.dirtyAtoms)
        }
        const o = this._store.getState().knownAtoms,
          l = this._store.getState().knownSelectors
        return (r == null ? void 0 : r.isInitialized) == null
          ? dc.values()
          : r.isInitialized === !0
          ? pc(mp([o, l]))
          : Bs(dc.values(), ({ key: i }) => !o.has(i) && !l.has(i))
      }),
      G(
        this,
        'getInfo_UNSTABLE',
        ({ key: r }) => (
          this.checkRefCount_INTERNAL(), Hg(this._store, this._store.getState().currentTree, r)
        ),
      ),
      G(this, 'map', (r) => {
        this.checkRefCount_INTERNAL()
        const o = new Ou(this, $u)
        return r(o), o
      }),
      G(this, 'asyncMap', async (r) => {
        this.checkRefCount_INTERNAL()
        const o = new Ou(this, $u)
        return o.retain(), await r(o), o.autoRelease_INTERNAL(), o
      }),
      (this._store = {
        storeID: Qg(),
        parentStoreID: n,
        getState: () => t,
        replaceState: (r) => {
          t.currentTree = r(t.currentTree)
        },
        getGraph: (r) => {
          const o = t.graphsByVersion
          if (o.has(r)) return fe(o.get(r))
          const l = Kg()
          return o.set(r, l), l
        },
        subscribeToTransactions: () => ({ release: () => {} }),
        addTransactionMetadata: () => {
          throw Z('Cannot subscribe to Snapshots')
        },
      })
    for (const r of this._store.getState().knownAtoms)
      Wg(this._store, r, 'get'), Jo(this._store, r, 1)
    this.autoRelease_INTERNAL()
  }
  retain() {
    this._refCount <= 0, this._refCount++
    let t = !1
    return () => {
      t || ((t = !0), this._release())
    }
  }
  autoRelease_INTERNAL() {
    e0 || window.setTimeout(() => this._release(), 10)
  }
  _release() {
    if ((this._refCount--, this._refCount === 0)) {
      if (
        (this._store.getState().nodeCleanupFunctions.forEach((t) => t()),
        this._store.getState().nodeCleanupFunctions.clear(),
        !re('recoil_memory_managament_2020'))
      )
        return
    } else this._refCount < 0
  }
  isRetained() {
    return this._refCount > 0
  }
  checkRefCount_INTERNAL() {
    re('recoil_memory_managament_2020') && this._refCount <= 0
  }
  getStore_INTERNAL() {
    return this.checkRefCount_INTERNAL(), this._store
  }
  getID() {
    return this.checkRefCount_INTERNAL(), this._store.getState().currentTree.stateID
  }
  getStoreID() {
    return this.checkRefCount_INTERNAL(), this._store.storeID
  }
}
function gp(e, t, n = !1) {
  const r = e.getState(),
    o = n ? qg() : t.version
  return {
    currentTree: {
      version: n ? o : t.version,
      stateID: n ? o : t.stateID,
      transactionMetadata: { ...t.transactionMetadata },
      dirtyAtoms: new Set(t.dirtyAtoms),
      atomValues: t.atomValues.clone(),
      nonvalidatedAtoms: t.nonvalidatedAtoms.clone(),
    },
    commitDepth: 0,
    nextTree: null,
    previousTree: null,
    knownAtoms: new Set(r.knownAtoms),
    knownSelectors: new Set(r.knownSelectors),
    transactionSubscriptions: new Map(),
    nodeTransactionSubscriptions: new Map(),
    nodeToComponentSubscriptions: new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: new Set(),
    graphsByVersion: new Map().set(o, e.getGraph(t.version)),
    retention: {
      referenceCounts: new Map(),
      nodesRetainedByZone: new Map(),
      retainablesToCheckForRelease: new Set(),
    },
    nodeCleanupFunctions: new Map(Yl(r.nodeCleanupFunctions.entries(), ([l]) => [l, () => {}])),
  }
}
function n0(e) {
  const t = new bl(bg())
  return e != null ? t.map(e) : t
}
const [vc, Sp] = t0(
  (e, t) => {
    var n
    const r = e.getState(),
      o =
        t === 'latest'
          ? (n = r.nextTree) !== null && n !== void 0
            ? n
            : r.currentTree
          : fe(r.previousTree)
    return new bl(gp(e, o), e.storeID)
  },
  (e, t) => {
    var n, r
    return (
      String(t) +
      String(e.storeID) +
      String((n = e.getState().nextTree) === null || n === void 0 ? void 0 : n.version) +
      String(e.getState().currentTree.version) +
      String((r = e.getState().previousTree) === null || r === void 0 ? void 0 : r.version)
    )
  },
)
Jg(Sp)
function r0(e, t = 'latest') {
  const n = vc(e, t)
  return n.isRetained() ? n : (Sp(), vc(e, t))
}
class Ou extends bl {
  constructor(t, n) {
    super(
      gp(t.getStore_INTERNAL(), t.getStore_INTERNAL().getState().currentTree, !0),
      t.getStoreID(),
    ),
      G(this, '_batch', void 0),
      G(this, 'set', (r, o) => {
        this.checkRefCount_INTERNAL()
        const l = this.getStore_INTERNAL()
        this._batch(() => {
          Jo(l, r.key, 1), hc(this.getStore_INTERNAL(), r, o)
        })
      }),
      G(this, 'reset', (r) => {
        this.checkRefCount_INTERNAL()
        const o = this.getStore_INTERNAL()
        this._batch(() => {
          Jo(o, r.key, 1), hc(this.getStore_INTERNAL(), r, Gg)
        })
      }),
      G(this, 'setUnvalidatedAtomValues_DEPRECATED', (r) => {
        this.checkRefCount_INTERNAL()
        const o = this.getStore_INTERNAL()
        $u(() => {
          for (const [l, i] of r.entries()) Jo(o, l, 1), Xg(o, new Yg(l), i)
        })
      }),
      (this._batch = n)
  }
}
var ei = { Snapshot: bl, MutableSnapshot: Ou, freshSnapshot: n0, cloneSnapshot: r0 },
  o0 = ei.Snapshot,
  l0 = ei.MutableSnapshot,
  i0 = ei.freshSnapshot,
  u0 = ei.cloneSnapshot,
  ti = Object.freeze({
    __proto__: null,
    Snapshot: o0,
    MutableSnapshot: l0,
    freshSnapshot: i0,
    cloneSnapshot: u0,
  })
function s0(...e) {
  const t = new Set()
  for (const n of e) for (const r of n) t.add(r)
  return t
}
var a0 = s0
const { useRef: c0 } = Ee
function f0(e) {
  const t = c0(e)
  return t.current === e && typeof e == 'function' && (t.current = e()), t
}
var mc = f0
const { getNextTreeStateVersion: d0, makeEmptyStoreState: _p } = Xd,
  {
    cleanUpNode: p0,
    getDownstreamNodes: h0,
    initializeNode: v0,
    setNodeValue: m0,
    setUnvalidatedAtomValue_DEPRECATED: y0,
  } = un,
  { graph: g0 } = vo,
  { cloneGraph: S0 } = vo,
  { getNextStoreID: wp } = Zl,
  { createMutableSource: Bi, reactMode: Rp } = ho,
  { applyAtomValueWrites: _0 } = kt,
  { releaseScheduledRetainablesNow: Ep } = Ln,
  { freshSnapshot: w0 } = ti,
  { useCallback: R0, useContext: Tp, useEffect: Fu, useMemo: E0, useRef: T0, useState: k0 } = Ee
function Rr() {
  throw Z('This component must be used inside a <RecoilRoot> component.')
}
const kp = Object.freeze({
  storeID: wp(),
  getState: Rr,
  replaceState: Rr,
  getGraph: Rr,
  subscribeToTransactions: Rr,
  addTransactionMetadata: Rr,
})
let Bu = !1
function yc(e) {
  if (Bu)
    throw Z(
      'An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.',
    )
  const t = e.getState()
  if (t.nextTree === null) {
    re('recoil_memory_managament_2020') &&
      re('recoil_release_on_cascading_update_killswitch_2021') &&
      t.commitDepth > 0 &&
      Ep(e)
    const n = t.currentTree.version,
      r = d0()
    ;(t.nextTree = {
      ...t.currentTree,
      version: r,
      stateID: r,
      dirtyAtoms: new Set(),
      transactionMetadata: {},
    }),
      t.graphsByVersion.set(r, S0(fe(t.graphsByVersion.get(n))))
  }
}
const Np = Ee.createContext({ current: kp }),
  ni = () => Tp(Np),
  Cp = Ee.createContext(null)
function N0() {
  return Tp(Cp)
}
function Qs(e, t, n) {
  const r = h0(e, n, n.dirtyAtoms)
  for (const o of r) {
    const l = t.nodeToComponentSubscriptions.get(o)
    if (l) for (const [i, [u, s]] of l) s(n)
  }
}
function Lp(e) {
  const t = e.getState(),
    n = t.currentTree,
    r = n.dirtyAtoms
  if (r.size) {
    for (const [o, l] of t.nodeTransactionSubscriptions) if (r.has(o)) for (const [i, u] of l) u(e)
    for (const [o, l] of t.transactionSubscriptions) l(e)
    ;(!Rp().early || t.suspendedComponentResolvers.size > 0) &&
      (Qs(e, t, n),
      t.suspendedComponentResolvers.forEach((o) => o()),
      t.suspendedComponentResolvers.clear())
  }
  t.queuedComponentCallbacks_DEPRECATED.forEach((o) => o(n)),
    t.queuedComponentCallbacks_DEPRECATED.splice(0, t.queuedComponentCallbacks_DEPRECATED.length)
}
function C0(e) {
  const t = e.getState()
  t.commitDepth++
  try {
    const { nextTree: n } = t
    if (n == null) return
    ;(t.previousTree = t.currentTree),
      (t.currentTree = n),
      (t.nextTree = null),
      Lp(e),
      t.previousTree != null
        ? t.graphsByVersion.delete(t.previousTree.version)
        : Ds('Ended batch with no previous state, which is unexpected', 'recoil'),
      (t.previousTree = null),
      re('recoil_memory_managament_2020') && n == null && Ep(e)
  } finally {
    t.commitDepth--
  }
}
function L0({ setNotifyBatcherOfChange: e }) {
  const t = ni(),
    [, n] = k0([])
  return (
    e(() => n({})),
    Fu(
      () => (
        e(() => n({})),
        () => {
          e(() => {})
        }
      ),
      [e],
    ),
    Fu(() => {
      iy.enqueueExecution('Batcher', () => {
        C0(t.current)
      })
    }),
    null
  )
}
function A0(e, t) {
  const n = _p()
  return (
    t({
      set: (r, o) => {
        const l = n.currentTree,
          i = m0(e, l, r.key, o),
          u = new Set(i.keys()),
          s = l.nonvalidatedAtoms.clone()
        for (const a of u) s.delete(a)
        n.currentTree = {
          ...l,
          dirtyAtoms: a0(l.dirtyAtoms, u),
          atomValues: _0(l.atomValues, i),
          nonvalidatedAtoms: s,
        }
      },
      setUnvalidatedAtomValues: (r) => {
        r.forEach((o, l) => {
          n.currentTree = y0(n.currentTree, l, o)
        })
      },
    }),
    n
  )
}
function x0(e) {
  const t = w0(e),
    n = t.getStore_INTERNAL().getState()
  return t.retain(), n.nodeCleanupFunctions.forEach((r) => r()), n.nodeCleanupFunctions.clear(), n
}
let gc = 0
function P0({ initializeState_DEPRECATED: e, initializeState: t, store_INTERNAL: n, children: r }) {
  let o
  const l = (_) => {
      const S = o.current.graphsByVersion
      if (S.has(_)) return fe(S.get(_))
      const w = g0()
      return S.set(_, w), w
    },
    i = (_, S) => {
      if (S == null) {
        const { transactionSubscriptions: w } = p.current.getState(),
          B = gc++
        return (
          w.set(B, _),
          {
            release: () => {
              w.delete(B)
            },
          }
        )
      } else {
        const { nodeTransactionSubscriptions: w } = p.current.getState()
        w.has(S) || w.set(S, new Map())
        const B = gc++
        return (
          fe(w.get(S)).set(B, _),
          {
            release: () => {
              const h = w.get(S)
              h && (h.delete(B), h.size === 0 && w.delete(S))
            },
          }
        )
      }
    },
    u = (_) => {
      yc(p.current)
      for (const S of Object.keys(_))
        fe(p.current.getState().nextTree).transactionMetadata[S] = _[S]
    },
    s = (_) => {
      yc(p.current)
      const S = fe(o.current.nextTree)
      let w
      try {
        ;(Bu = !0), (w = _(S))
      } finally {
        Bu = !1
      }
      w !== S &&
        ((o.current.nextTree = w), Rp().early && Qs(p.current, o.current, w), fe(a.current)())
    },
    a = T0(null),
    d = R0(
      (_) => {
        a.current = _
      },
      [a],
    ),
    p = mc(() =>
      n != null
        ? n
        : {
            storeID: wp(),
            getState: () => o.current,
            replaceState: s,
            getGraph: l,
            subscribeToTransactions: i,
            addTransactionMetadata: u,
          },
    )
  n != null && (p.current = n),
    (o = mc(() => (e != null ? A0(p.current, e) : t != null ? x0(t) : _p())))
  const m = E0(() => (Bi == null ? void 0 : Bi(o, () => o.current.currentTree.version)), [o])
  return (
    Fu(() => {
      const _ = p.current
      for (const S of new Set(_.getState().knownAtoms)) v0(_, S, 'get')
      return () => {
        for (const S of _.getState().knownAtoms) p0(_, S)
      }
    }, [p]),
    Rl(Np.Provider, {
      value: p,
      children: Rm(Cp.Provider, {
        value: m,
        children: [Rl(L0, { setNotifyBatcherOfChange: d }), r],
      }),
    })
  )
}
function M0(e) {
  const { override: t, ...n } = e,
    r = ni()
  return t === !1 && r.current !== kp ? e.children : Rl(P0, { ...n })
}
function V0() {
  return ni().current.storeID
}
var Ut = {
  RecoilRoot: M0,
  useStoreRef: ni,
  useRecoilMutableSource: N0,
  useRecoilStoreID: V0,
  notifyComponents_FOR_TESTING: Qs,
  sendEndOfBatchNotifications_FOR_TESTING: Lp,
}
function I0(e, t) {
  if (e === t) return !0
  if (e.length !== t.length) return !1
  for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1
  return !0
}
var z0 = I0
const { useEffect: D0, useRef: U0 } = Ee
function $0(e) {
  const t = U0()
  return (
    D0(() => {
      t.current = e
    }),
    t.current
  )
}
var Ap = $0
const { useStoreRef: O0 } = Ut,
  { SUSPENSE_TIMEOUT_MS: F0 } = Ln,
  { updateRetainCount: Er } = Ln,
  { RetentionZone: B0 } = Xl,
  { useEffect: j0, useRef: W0 } = Ee,
  { isSSR: Sc } = Ks
function H0(e) {
  if (!!re('recoil_memory_managament_2020')) return K0(e)
}
function K0(e) {
  const n = (Array.isArray(e) ? e : [e]).map((i) => (i instanceof B0 ? i : i.key)),
    r = O0()
  j0(() => {
    if (!re('recoil_memory_managament_2020')) return
    const i = r.current
    if (o.current && !Sc) window.clearTimeout(o.current), (o.current = null)
    else for (const u of n) Er(i, u, 1)
    return () => {
      for (const u of n) Er(i, u, -1)
    }
  }, [r, ...n])
  const o = W0(),
    l = Ap(n)
  if (!Sc && (l === void 0 || !z0(l, n))) {
    const i = r.current
    for (const u of n) Er(i, u, 1)
    if (l) for (const u of l) Er(i, u, -1)
    o.current && window.clearTimeout(o.current),
      (o.current = window.setTimeout(() => {
        o.current = null
        for (const u of n) Er(i, u, -1)
      }, F0))
  }
}
var Gs = H0
function Q0() {
  return '<component name not available>'
}
var yo = Q0
const { batchUpdates: G0 } = ql,
  { DEFAULT_VALUE: xp } = Ke,
  {
    currentRendererSupportsUseSyncExternalStore: Y0,
    reactMode: fr,
    useMutableSource: Z0,
    useSyncExternalStore: X0,
  } = ho,
  { useRecoilMutableSource: J0, useStoreRef: Nt } = Ut,
  {
    AbstractRecoilValue: ju,
    getRecoilValueAsLoadable: go,
    setRecoilValue: kl,
    setUnvalidatedRecoilValue: q0,
    subscribeToRecoilValue: ir,
  } = kt,
  { useCallback: He, useEffect: ur, useMemo: Pp, useRef: Wr, useState: Ys } = Ee,
  { setByAddingToSet: b0 } = qd
function Zs(e, t, n) {
  if (e.state === 'hasValue') return e.contents
  throw e.state === 'loading'
    ? new Promise((o) => {
        n.current.getState().suspendedComponentResolvers.add(o)
      })
    : e.state === 'hasError'
    ? e.contents
    : Z(`Invalid value of loadable atom "${t.key}"`)
}
function eS() {
  const e = yo(),
    t = Nt(),
    [, n] = Ys([]),
    r = Wr(new Set())
  r.current = new Set()
  const o = Wr(new Set()),
    l = Wr(new Map()),
    i = He(
      (s) => {
        const a = l.current.get(s)
        a && (a.release(), l.current.delete(s))
      },
      [l],
    ),
    u = He((s, a) => {
      l.current.has(a) && n([])
    }, [])
  return (
    ur(() => {
      const s = t.current
      Br(r.current, o.current).forEach((a) => {
        if (l.current.has(a)) return
        const d = ir(s, new ju(a), (m) => u(m, a), e)
        l.current.set(a, d),
          s.getState().nextTree
            ? s.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
                u(s.getState(), a)
              })
            : u(s.getState(), a)
      }),
        Br(o.current, r.current).forEach((a) => {
          i(a)
        }),
        (o.current = r.current)
    }),
    ur(() => {
      const s = l.current
      return (
        Br(r.current, new Set(s.keys())).forEach((a) => {
          const d = ir(t.current, new ju(a), (p) => u(p, a), e)
          s.set(a, d)
        }),
        () => s.forEach((a, d) => i(d))
      )
    }, [e, t, i, u]),
    Pp(() => {
      function s(S) {
        return (w) => {
          kl(t.current, S, w)
        }
      }
      function a(S) {
        return () => kl(t.current, S, xp)
      }
      function d(S) {
        var w
        r.current.has(S.key) || (r.current = b0(r.current, S.key))
        const B = t.current.getState()
        return go(
          t.current,
          S,
          fr().early && (w = B.nextTree) !== null && w !== void 0 ? w : B.currentTree,
        )
      }
      function p(S) {
        const w = d(S)
        return Zs(w, S, t)
      }
      function m(S) {
        return [p(S), s(S)]
      }
      function _(S) {
        return [d(S), s(S)]
      }
      return {
        getRecoilValue: p,
        getRecoilValueLoadable: d,
        getRecoilState: m,
        getRecoilStateLoadable: _,
        getSetRecoilState: s,
        getResetRecoilState: a,
      }
    }, [r, t])
  )
}
const tS = { current: 0 }
function nS(e) {
  const t = Nt(),
    n = yo(),
    r = He(() => {
      var u
      const s = t.current,
        a = s.getState(),
        d = fr().early && (u = a.nextTree) !== null && u !== void 0 ? u : a.currentTree
      return { loadable: go(s, e, d), key: e.key }
    }, [t, e]),
    o = He((u) => {
      let s
      return () => {
        var a, d
        const p = u()
        return (a = s) !== null &&
          a !== void 0 &&
          a.loadable.is(p.loadable) &&
          ((d = s) === null || d === void 0 ? void 0 : d.key) === p.key
          ? s
          : ((s = p), p)
      }
    }, []),
    l = Pp(() => o(r), [r, o]),
    i = He(
      (u) => {
        const s = t.current
        return ir(s, e, u, n).release
      },
      [t, e, n],
    )
  return X0(i, l, l).loadable
}
function rS(e) {
  const t = Nt(),
    n = He(() => {
      var a
      const d = t.current,
        p = d.getState(),
        m = fr().early && (a = p.nextTree) !== null && a !== void 0 ? a : p.currentTree
      return go(d, e, m)
    }, [t, e]),
    r = He(() => n(), [n]),
    o = yo(),
    l = He(
      (a, d) => {
        const p = t.current
        return ir(
          p,
          e,
          () => {
            if (!re('recoil_suppress_rerender_in_callback')) return d()
            const _ = n()
            s.current.is(_) || d(), (s.current = _)
          },
          o,
        ).release
      },
      [t, e, o, n],
    ),
    i = J0()
  if (i == null)
    throw Z('Recoil hooks must be used in components contained within a <RecoilRoot> component.')
  const u = Z0(i, r, l),
    s = Wr(u)
  return (
    ur(() => {
      s.current = u
    }),
    u
  )
}
function Wu(e) {
  const t = Nt(),
    n = yo(),
    r = He(() => {
      var s
      const a = t.current,
        d = a.getState(),
        p = fr().early && (s = d.nextTree) !== null && s !== void 0 ? s : d.currentTree
      return go(a, e, p)
    }, [t, e]),
    o = He(() => ({ loadable: r(), key: e.key }), [r, e.key]),
    l = He(
      (s) => {
        const a = o()
        return s.loadable.is(a.loadable) && s.key === a.key ? s : a
      },
      [o],
    )
  ur(() => {
    const s = ir(
      t.current,
      e,
      (a) => {
        u(l)
      },
      n,
    )
    return u(l), s.release
  }, [n, e, t, l])
  const [i, u] = Ys(o)
  return i.key !== e.key ? o().loadable : i.loadable
}
function oS(e) {
  const t = Nt(),
    [, n] = Ys([]),
    r = yo(),
    o = He(() => {
      var u
      const s = t.current,
        a = s.getState(),
        d = fr().early && (u = a.nextTree) !== null && u !== void 0 ? u : a.currentTree
      return go(s, e, d)
    }, [t, e]),
    l = o(),
    i = Wr(l)
  return (
    ur(() => {
      i.current = l
    }),
    ur(() => {
      const u = t.current,
        s = u.getState(),
        a = ir(
          u,
          e,
          (p) => {
            var m
            if (!re('recoil_suppress_rerender_in_callback')) return n([])
            const _ = o()
            ;((m = i.current) !== null && m !== void 0 && m.is(_)) || n(_), (i.current = _)
          },
          r,
        )
      if (s.nextTree)
        u.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
          ;(i.current = null), n([])
        })
      else {
        var d
        if (!re('recoil_suppress_rerender_in_callback')) return n([])
        const p = o()
        ;((d = i.current) !== null && d !== void 0 && d.is(p)) || n(p), (i.current = p)
      }
      return a.release
    }, [r, o, e, t]),
    l
  )
}
function Xs(e) {
  return (
    re('recoil_memory_managament_2020') && Gs(e),
    { TRANSITION_SUPPORT: Wu, SYNC_EXTERNAL_STORE: Y0() ? nS : Wu, MUTABLE_SOURCE: rS, LEGACY: oS }[
      fr().mode
    ](e)
  )
}
function Mp(e) {
  const t = Nt(),
    n = Xs(e)
  return Zs(n, e, t)
}
function ri(e) {
  const t = Nt()
  return He(
    (n) => {
      kl(t.current, e, n)
    },
    [t, e],
  )
}
function lS(e) {
  const t = Nt()
  return He(() => {
    kl(t.current, e, xp)
  }, [t, e])
}
function iS(e) {
  return [Mp(e), ri(e)]
}
function uS(e) {
  return [Xs(e), ri(e)]
}
function sS() {
  const e = Nt()
  return (t, n = {}) => {
    G0(() => {
      e.current.addTransactionMetadata(n), t.forEach((r, o) => q0(e.current, new ju(o), r))
    })
  }
}
function Vp(e) {
  return re('recoil_memory_managament_2020') && Gs(e), Wu(e)
}
function Ip(e) {
  const t = Nt(),
    n = Vp(e)
  return Zs(n, e, t)
}
function aS(e) {
  return [Ip(e), ri(e)]
}
var cS = {
  recoilComponentGetRecoilValueCount_FOR_TESTING: tS,
  useRecoilInterface: eS,
  useRecoilState: iS,
  useRecoilStateLoadable: uS,
  useRecoilValue: Mp,
  useRecoilValueLoadable: Xs,
  useResetRecoilState: lS,
  useSetRecoilState: ri,
  useSetUnvalidatedAtomValues: sS,
  useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: Vp,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: Ip,
  useRecoilState_TRANSITION_SUPPORT_UNSTABLE: aS,
}
function fS(e, t) {
  const n = new Map()
  for (const [r, o] of e) t(o, r) && n.set(r, o)
  return n
}
var dS = fS
function pS(e, t) {
  const n = new Set()
  for (const r of e) t(r) && n.add(r)
  return n
}
var hS = pS
function vS(...e) {
  const t = new Map()
  for (let n = 0; n < e.length; n++) {
    const r = e[n].keys()
    let o
    for (; !(o = r.next()).done; ) t.set(o.value, e[n].get(o.value))
  }
  return t
}
var mS = vS
const { batchUpdates: yS } = ql,
  { DEFAULT_VALUE: gS, getNode: zp, nodes: SS } = Ke,
  { useStoreRef: Js } = Ut,
  { AbstractRecoilValue: _S, setRecoilValueLoadable: wS } = kt,
  { SUSPENSE_TIMEOUT_MS: RS } = Ln,
  { cloneSnapshot: Nl } = ti,
  { useCallback: oi, useEffect: Dp, useRef: _c, useState: ES } = Ee,
  { isSSR: wc } = Ks
function li(e) {
  const t = Js()
  Dp(() => t.current.subscribeToTransactions(e).release, [e, t])
}
function Rc(e) {
  const t = e.atomValues.toMap(),
    n = Tl(
      dS(t, (r, o) => {
        const i = zp(o).persistence_UNSTABLE
        return i != null && i.type !== 'none' && r.state === 'hasValue'
      }),
      (r) => r.contents,
    )
  return mS(e.nonvalidatedAtoms.toMap(), n)
}
function TS(e) {
  li(
    oi(
      (t) => {
        let n = t.getState().previousTree
        const r = t.getState().currentTree
        n || (n = t.getState().currentTree)
        const o = Rc(r),
          l = Rc(n),
          i = Tl(SS, (s) => {
            var a, d, p, m
            return {
              persistence_UNSTABLE: {
                type:
                  (a = (d = s.persistence_UNSTABLE) === null || d === void 0 ? void 0 : d.type) !==
                    null && a !== void 0
                    ? a
                    : 'none',
                backButton:
                  (p =
                    (m = s.persistence_UNSTABLE) === null || m === void 0
                      ? void 0
                      : m.backButton) !== null && p !== void 0
                    ? p
                    : !1,
              },
            }
          }),
          u = hS(r.dirtyAtoms, (s) => o.has(s) || l.has(s))
        e({
          atomValues: o,
          previousAtomValues: l,
          atomInfo: i,
          modifiedAtoms: u,
          transactionMetadata: { ...r.transactionMetadata },
        })
      },
      [e],
    ),
  )
}
function kS(e) {
  li(
    oi(
      (t) => {
        const n = Nl(t, 'latest'),
          r = Nl(t, 'previous')
        e({ snapshot: n, previousSnapshot: r })
      },
      [e],
    ),
  )
}
function NS() {
  const e = Js(),
    [t, n] = ES(() => Nl(e.current)),
    r = Ap(t),
    o = _c(),
    l = _c()
  if (
    (li(oi((u) => n(Nl(u)), [])),
    Dp(() => {
      const u = t.retain()
      if (o.current && !wc) {
        var s
        window.clearTimeout(o.current),
          (o.current = null),
          (s = l.current) === null || s === void 0 || s.call(l),
          (l.current = null)
      }
      return () => {
        window.setTimeout(u, 10)
      }
    }, [t]),
    r !== t && !wc)
  ) {
    if (o.current) {
      var i
      window.clearTimeout(o.current),
        (o.current = null),
        (i = l.current) === null || i === void 0 || i.call(l),
        (l.current = null)
    }
    ;(l.current = t.retain()),
      (o.current = window.setTimeout(() => {
        var u
        ;(o.current = null),
          (u = l.current) === null || u === void 0 || u.call(l),
          (l.current = null)
      }, RS))
  }
  return t
}
function Up(e, t) {
  var n
  const r = e.getState(),
    o = (n = r.nextTree) !== null && n !== void 0 ? n : r.currentTree,
    l = t.getStore_INTERNAL().getState().currentTree
  yS(() => {
    const i = new Set()
    for (const a of [o.atomValues.keys(), l.atomValues.keys()])
      for (const d of a) {
        var u, s
        ;((u = o.atomValues.get(d)) === null || u === void 0 ? void 0 : u.contents) !==
          ((s = l.atomValues.get(d)) === null || s === void 0 ? void 0 : s.contents) &&
          zp(d).shouldRestoreFromSnapshots &&
          i.add(d)
      }
    i.forEach((a) => {
      wS(e, new _S(a), l.atomValues.has(a) ? fe(l.atomValues.get(a)) : gS)
    }),
      e.replaceState((a) => ({ ...a, stateID: t.getID() }))
  })
}
function CS() {
  const e = Js()
  return oi((t) => Up(e.current, t), [e])
}
var $p = {
  useRecoilSnapshot: NS,
  gotoSnapshot: Up,
  useGotoRecoilSnapshot: CS,
  useRecoilTransactionObserver: kS,
  useTransactionObservation_DEPRECATED: TS,
  useTransactionSubscription_DEPRECATED: li,
}
const { peekNodeInfo: LS } = un,
  { useStoreRef: AS } = Ut
function xS() {
  const e = AS()
  return ({ key: t }) => LS(e.current, e.current.getState().currentTree, t)
}
var PS = xS
const { reactMode: MS } = ho,
  { RecoilRoot: VS, useStoreRef: IS } = Ut,
  { useMemo: zS } = Ee
function DS() {
  MS().mode === 'MUTABLE_SOURCE' &&
    console.warn(
      'Warning: There are known issues using useRecoilBridgeAcrossReactRoots() in recoil_mutable_source rendering mode.  Please consider upgrading to recoil_sync_external_store mode.',
    )
  const e = IS().current
  return zS(() => {
    function t({ children: n }) {
      return Rl(VS, { store_INTERNAL: e, children: n })
    }
    return t
  }, [e])
}
var US = DS
const { loadableWithValue: $S } = po,
  { initializeNode: OS } = un,
  { DEFAULT_VALUE: FS, getNode: BS } = Ke,
  {
    copyTreeState: jS,
    getRecoilValueAsLoadable: WS,
    invalidateDownstreams: HS,
    writeLoadableToTreeState: KS,
  } = kt
function Ec(e) {
  return BS(e.key).nodeType === 'atom'
}
class QS {
  constructor(t, n) {
    G(this, '_store', void 0),
      G(this, '_treeState', void 0),
      G(this, '_changes', void 0),
      G(this, 'get', (r) => {
        if (this._changes.has(r.key)) return this._changes.get(r.key)
        if (!Ec(r)) throw Z('Reading selectors within atomicUpdate is not supported')
        const o = WS(this._store, r, this._treeState)
        if (o.state === 'hasValue') return o.contents
        throw o.state === 'hasError'
          ? o.contents
          : Z(`Expected Recoil atom ${r.key} to have a value, but it is in a loading state.`)
      }),
      G(this, 'set', (r, o) => {
        if (!Ec(r)) throw Z('Setting selectors within atomicUpdate is not supported')
        if (typeof o == 'function') {
          const l = this.get(r)
          this._changes.set(r.key, o(l))
        } else OS(this._store, r.key, 'set'), this._changes.set(r.key, o)
      }),
      G(this, 'reset', (r) => {
        this.set(r, FS)
      }),
      (this._store = t),
      (this._treeState = n),
      (this._changes = new Map())
  }
  newTreeState_INTERNAL() {
    if (this._changes.size === 0) return this._treeState
    const t = jS(this._treeState)
    for (const [n, r] of this._changes) KS(t, n, $S(r))
    return HS(this._store, t), t
  }
}
function GS(e) {
  return (t) => {
    e.replaceState((n) => {
      const r = new QS(e, n)
      return t(r), r.newTreeState_INTERNAL()
    })
  }
}
var YS = { atomicUpdater: GS },
  ZS = YS.atomicUpdater,
  Op = Object.freeze({ __proto__: null, atomicUpdater: ZS })
function XS(e, t) {
  if (!e) throw new Error(t)
}
var JS = XS,
  Pr = JS
const { atomicUpdater: qS } = Op,
  { batchUpdates: bS } = ql,
  { DEFAULT_VALUE: e1 } = Ke,
  { useStoreRef: t1 } = Ut,
  { refreshRecoilValue: n1, setRecoilValue: Tc } = kt,
  { cloneSnapshot: r1 } = ti,
  { gotoSnapshot: o1 } = $p,
  { useCallback: l1 } = Ee
class Fp {}
const i1 = new Fp()
function Bp(e, t, n, r) {
  let o = i1,
    l
  if (
    (bS(() => {
      const u =
        'useRecoilCallback() expects a function that returns a function: it accepts a function of the type (RecoilInterface) => (Args) => ReturnType and returns a callback function (Args) => ReturnType, where RecoilInterface is an object {snapshot, set, ...} and Args and ReturnType are the argument and return types of the callback you want to create.  Please see the docs at recoiljs.org for details.'
      if (typeof t != 'function') throw Z(u)
      const s = bd(
          {
            ...(r != null ? r : {}),
            set: (d, p) => Tc(e, d, p),
            reset: (d) => Tc(e, d, e1),
            refresh: (d) => n1(e, d),
            gotoSnapshot: (d) => o1(e, d),
            transact_UNSTABLE: (d) => qS(e)(d),
          },
          {
            snapshot: () => {
              const d = r1(e)
              return (l = d.retain()), d
            },
          },
        ),
        a = t(s)
      if (typeof a != 'function') throw Z(u)
      o = a(...n)
    }),
    o instanceof Fp && Pr(!1),
    ce(o))
  )
    o.finally(() => {
      var u
      ;(u = l) === null || u === void 0 || u()
    })
  else {
    var i
    ;(i = l) === null || i === void 0 || i()
  }
  return o
}
function u1(e, t) {
  const n = t1()
  return l1((...r) => Bp(n.current, e, r), t != null ? [...t, n] : void 0)
}
var jp = { recoilCallback: Bp, useRecoilCallback: u1 }
const { useStoreRef: s1 } = Ut,
  { refreshRecoilValue: a1 } = kt,
  { useCallback: c1 } = Ee
function f1(e) {
  const t = s1()
  return c1(() => {
    const n = t.current
    a1(n, e)
  }, [e, t])
}
var d1 = f1
const { atomicUpdater: p1 } = Op,
  { useStoreRef: h1 } = Ut,
  { useMemo: v1 } = Ee
function m1(e, t) {
  const n = h1()
  return v1(
    () =>
      (...r) => {
        p1(n.current)((l) => {
          e(l)(...r)
        })
      },
    t != null ? [...t, n] : void 0,
  )
}
var y1 = m1
class g1 {
  constructor(t) {
    G(this, 'value', void 0), (this.value = t)
  }
}
var S1 = { WrappedValue: g1 },
  _1 = S1.WrappedValue,
  Wp = Object.freeze({ __proto__: null, WrappedValue: _1 })
const { isFastRefreshEnabled: w1 } = ho
class kc extends Error {}
class R1 {
  constructor(t) {
    var n, r, o
    G(this, '_name', void 0),
      G(this, '_numLeafs', void 0),
      G(this, '_root', void 0),
      G(this, '_onHit', void 0),
      G(this, '_onSet', void 0),
      G(this, '_mapNodeValue', void 0),
      (this._name = t == null ? void 0 : t.name),
      (this._numLeafs = 0),
      (this._root = null),
      (this._onHit = (n = t == null ? void 0 : t.onHit) !== null && n !== void 0 ? n : () => {}),
      (this._onSet = (r = t == null ? void 0 : t.onSet) !== null && r !== void 0 ? r : () => {}),
      (this._mapNodeValue =
        (o = t == null ? void 0 : t.mapNodeValue) !== null && o !== void 0 ? o : (l) => l)
  }
  size() {
    return this._numLeafs
  }
  root() {
    return this._root
  }
  get(t, n) {
    var r
    return (r = this.getLeafNode(t, n)) === null || r === void 0 ? void 0 : r.value
  }
  getLeafNode(t, n) {
    if (this._root == null) return
    let r = this._root
    for (; r; ) {
      if ((n == null || n.onNodeVisit(r), r.type === 'leaf')) return this._onHit(r), r
      const o = this._mapNodeValue(t(r.nodeKey))
      r = r.branches.get(o)
    }
  }
  set(t, n, r) {
    const o = () => {
      var l, i, u, s
      let a, d
      for (const [B, h] of t) {
        var p, m, _
        const c = this._root
        if ((c == null ? void 0 : c.type) === 'leaf') throw this.invalidCacheError()
        const f = a
        if (
          ((a = f ? f.branches.get(d) : c),
          (a =
            (p = a) !== null && p !== void 0
              ? p
              : { type: 'branch', nodeKey: B, parent: f, branches: new Map(), branchKey: d }),
          a.type !== 'branch' || a.nodeKey !== B)
        )
          throw this.invalidCacheError()
        f == null || f.branches.set(d, a),
          r == null || (m = r.onNodeVisit) === null || m === void 0 || m.call(r, a),
          (d = this._mapNodeValue(h)),
          (this._root = (_ = this._root) !== null && _ !== void 0 ? _ : a)
      }
      const S = a ? ((l = a) === null || l === void 0 ? void 0 : l.branches.get(d)) : this._root
      if (S != null && (S.type !== 'leaf' || S.branchKey !== d)) throw this.invalidCacheError()
      const w = { type: 'leaf', value: n, parent: a, branchKey: d }
      ;(i = a) === null || i === void 0 || i.branches.set(d, w),
        (this._root = (u = this._root) !== null && u !== void 0 ? u : w),
        this._numLeafs++,
        this._onSet(w),
        r == null || (s = r.onNodeVisit) === null || s === void 0 || s.call(r, w)
    }
    try {
      o()
    } catch (l) {
      if (l instanceof kc) this.clear(), o()
      else throw l
    }
  }
  delete(t) {
    const n = this.root()
    if (!n) return !1
    if (t === n) return (this._root = null), (this._numLeafs = 0), !0
    let r = t.parent,
      o = t.branchKey
    for (; r; ) {
      var l
      if ((r.branches.delete(o), r === n))
        return (
          r.branches.size === 0 ? ((this._root = null), (this._numLeafs = 0)) : this._numLeafs--, !0
        )
      if (r.branches.size > 0) break
      ;(o = (l = r) === null || l === void 0 ? void 0 : l.branchKey), (r = r.parent)
    }
    for (; r !== n; r = r.parent) if (r == null) return !1
    return this._numLeafs--, !0
  }
  clear() {
    ;(this._numLeafs = 0), (this._root = null)
  }
  invalidCacheError() {
    const t = w1()
      ? 'Possible Fast Refresh module reload detected.  This may also be caused by an selector returning inconsistent values. Resetting cache.'
      : 'Invalid cache values.  This happens when selectors do not return consistent values for the same input dependency values.  That may also be caused when using Fast Refresh to change a selector implementation.  Resetting cache.'
    throw (Ds(t + (this._name != null ? ` - ${this._name}` : '')), new kc())
  }
}
var E1 = { TreeCache: R1 },
  T1 = E1.TreeCache,
  Hp = Object.freeze({ __proto__: null, TreeCache: T1 })
class k1 {
  constructor(t) {
    var n
    G(this, '_maxSize', void 0),
      G(this, '_size', void 0),
      G(this, '_head', void 0),
      G(this, '_tail', void 0),
      G(this, '_map', void 0),
      G(this, '_keyMapper', void 0),
      (this._maxSize = t.maxSize),
      (this._size = 0),
      (this._head = null),
      (this._tail = null),
      (this._map = new Map()),
      (this._keyMapper = (n = t.mapKey) !== null && n !== void 0 ? n : (r) => r)
  }
  head() {
    return this._head
  }
  tail() {
    return this._tail
  }
  size() {
    return this._size
  }
  maxSize() {
    return this._maxSize
  }
  has(t) {
    return this._map.has(this._keyMapper(t))
  }
  get(t) {
    const n = this._keyMapper(t),
      r = this._map.get(n)
    if (!!r) return this.set(t, r.value), r.value
  }
  set(t, n) {
    const r = this._keyMapper(t)
    this._map.get(r) && this.delete(t)
    const l = this.head(),
      i = { key: t, right: l, left: null, value: n }
    l ? (l.left = i) : (this._tail = i),
      this._map.set(r, i),
      (this._head = i),
      this._size++,
      this._maybeDeleteLRU()
  }
  _maybeDeleteLRU() {
    this.size() > this.maxSize() && this.deleteLru()
  }
  deleteLru() {
    const t = this.tail()
    t && this.delete(t.key)
  }
  delete(t) {
    const n = this._keyMapper(t)
    if (!this._size || !this._map.has(n)) return
    const r = fe(this._map.get(n)),
      o = r.right,
      l = r.left
    o && (o.left = r.left),
      l && (l.right = r.right),
      r === this.head() && (this._head = o),
      r === this.tail() && (this._tail = l),
      this._map.delete(n),
      this._size--
  }
  clear() {
    ;(this._size = 0), (this._head = null), (this._tail = null), (this._map = new Map())
  }
}
var N1 = { LRUCache: k1 },
  C1 = N1.LRUCache,
  Kp = Object.freeze({ __proto__: null, LRUCache: C1 })
const { LRUCache: L1 } = Kp,
  { TreeCache: A1 } = Hp
function x1({ name: e, maxSize: t, mapNodeValue: n = (r) => r }) {
  const r = new L1({ maxSize: t }),
    o = new A1({
      name: e,
      mapNodeValue: n,
      onHit: (l) => {
        r.set(l, !0)
      },
      onSet: (l) => {
        const i = r.tail()
        r.set(l, !0), i && o.size() > t && o.delete(i.key)
      },
    })
  return o
}
var Nc = x1
function dt(e, t, n) {
  if (typeof e == 'string' && !e.includes('"') && !e.includes('\\')) return `"${e}"`
  switch (typeof e) {
    case 'undefined':
      return ''
    case 'boolean':
      return e ? 'true' : 'false'
    case 'number':
    case 'symbol':
      return String(e)
    case 'string':
      return JSON.stringify(e)
    case 'function':
      if ((t == null ? void 0 : t.allowFunctions) !== !0)
        throw Z('Attempt to serialize function in a Recoil cache key')
      return `__FUNCTION(${e.name})__`
  }
  if (e === null) return 'null'
  if (typeof e != 'object') {
    var r
    return (r = JSON.stringify(e)) !== null && r !== void 0 ? r : ''
  }
  if (ce(e)) return '__PROMISE__'
  if (Array.isArray(e)) return `[${e.map((o, l) => dt(o, t, l.toString()))}]`
  if (typeof e.toJSON == 'function') return dt(e.toJSON(n), t, n)
  if (e instanceof Map) {
    const o = {}
    for (const [l, i] of e) o[typeof l == 'string' ? l : dt(l, t)] = i
    return dt(o, t, n)
  }
  return e instanceof Set
    ? dt(
        Array.from(e).sort((o, l) => dt(o, t).localeCompare(dt(l, t))),
        t,
        n,
      )
    : Symbol !== void 0 && e[Symbol.iterator] != null && typeof e[Symbol.iterator] == 'function'
    ? dt(Array.from(e), t, n)
    : `{${Object.keys(e)
        .filter((o) => e[o] !== void 0)
        .sort()
        .map((o) => `${dt(o, t)}:${dt(e[o], t, o)}`)
        .join(',')}}`
}
function P1(e, t = { allowFunctions: !1 }) {
  return dt(e, t)
}
var ii = P1
const { TreeCache: M1 } = Hp,
  Do = { equality: 'reference', eviction: 'keep-all', maxSize: 1 / 0 }
function V1(
  { equality: e = Do.equality, eviction: t = Do.eviction, maxSize: n = Do.maxSize } = Do,
  r,
) {
  const o = I1(e)
  return z1(t, n, o, r)
}
function I1(e) {
  switch (e) {
    case 'reference':
      return (t) => t
    case 'value':
      return (t) => ii(t)
  }
  throw Z(`Unrecognized equality policy ${e}`)
}
function z1(e, t, n, r) {
  switch (e) {
    case 'keep-all':
      return new M1({ name: r, mapNodeValue: n })
    case 'lru':
      return Nc({ name: r, maxSize: fe(t), mapNodeValue: n })
    case 'most-recent':
      return Nc({ name: r, maxSize: 1, mapNodeValue: n })
  }
  throw Z(`Unrecognized eviction policy ${e}`)
}
var D1 = V1
function U1(e) {
  return () => null
}
var $1 = { startPerfBlock: U1 }
const {
    isLoadable: O1,
    loadableWithError: Uo,
    loadableWithPromise: F1,
    loadableWithValue: ji,
  } = po,
  { WrappedValue: Qp } = Wp,
  { getNodeLoadable: $o, peekNodeLoadable: B1, setNodeValue: j1 } = un,
  { saveDepsToStore: W1 } = vo,
  { DEFAULT_VALUE: H1, getConfigDeletionHandler: K1, getNode: Q1, registerNode: Cc } = Ke,
  { isRecoilValue: G1 } = lr,
  { markRecoilValueModified: Lc } = kt,
  { retainedByOptionWithDefault: Y1 } = Ln,
  { recoilCallback: Z1 } = jp,
  { startPerfBlock: X1 } = $1
class Gp {}
const Tr = new Gp(),
  kr = [],
  Oo = new Map(),
  J1 = (() => {
    let e = 0
    return () => e++
  })()
function Yp(e) {
  let t = null
  const { key: n, get: r, cachePolicy_UNSTABLE: o } = e,
    l = e.set != null ? e.set : void 0,
    i = new Set(),
    u = D1(o != null ? o : { equality: 'reference', eviction: 'keep-all' }, n),
    s = Y1(e.retainedBy_UNSTABLE),
    a = new Map()
  let d = 0
  function p() {
    return !re('recoil_memory_managament_2020') || d > 0
  }
  function m(y) {
    return (
      y.getState().knownSelectors.add(n),
      d++,
      () => {
        d--
      }
    )
  }
  function _() {
    return K1(n) !== void 0 && !p()
  }
  function S(y, N, A, K, z) {
    St(N, K, z), w(y, A)
  }
  function w(y, N) {
    xe(y, N) && de(y), h(N, !0)
  }
  function B(y, N) {
    xe(y, N) && (fe(U(y)).stateVersions.clear(), h(N, !1))
  }
  function h(y, N) {
    const A = Oo.get(y)
    if (A != null) {
      for (const K of A) Lc(K, fe(t))
      N && Oo.delete(y)
    }
  }
  function c(y, N) {
    let A = Oo.get(N)
    A == null && Oo.set(N, (A = new Set())), A.add(y)
  }
  function f(y, N, A, K, z, Y) {
    return N.then((J) => {
      if (!p()) throw (de(y), Tr)
      const F = ji(J)
      return S(y, A, z, F, K), J
    }).catch((J) => {
      if (!p()) throw (de(y), Tr)
      if (ce(J)) return R(y, J, A, K, z, Y)
      const F = Uo(J)
      throw (S(y, A, z, F, K), J)
    })
  }
  function R(y, N, A, K, z, Y) {
    return N.then((J) => {
      if (!p()) throw (de(y), Tr)
      Y.loadingDepKey != null && Y.loadingDepPromise === N
        ? A.atomValues.set(Y.loadingDepKey, ji(J))
        : y.getState().knownSelectors.forEach((te) => {
            A.atomValues.delete(te)
          })
      const F = L(y, A)
      if (F && F.state !== 'loading') {
        if (((xe(y, z) || U(y) == null) && w(y, z), F.state === 'hasValue')) return F.contents
        throw F.contents
      }
      if (!xe(y, z)) {
        const te = b(y, A)
        if (te != null) return te.loadingLoadable.contents
      }
      const [ue, _e] = C(y, A, z)
      if ((ue.state !== 'loading' && S(y, A, z, ue, _e), ue.state === 'hasError')) throw ue.contents
      return ue.contents
    }).catch((J) => {
      if (J instanceof Gp) throw Tr
      if (!p()) throw (de(y), Tr)
      const F = Uo(J)
      throw (S(y, A, z, F, K), J)
    })
  }
  function k(y, N, A, K) {
    var z, Y, J, F
    if (
      xe(y, K) ||
      N.version ===
        ((z = y.getState()) === null || z === void 0 || (Y = z.currentTree) === null || Y === void 0
          ? void 0
          : Y.version) ||
      N.version ===
        ((J = y.getState()) === null || J === void 0 || (F = J.nextTree) === null || F === void 0
          ? void 0
          : F.version)
    ) {
      var ue, _e, te
      W1(
        n,
        A,
        y,
        (ue =
          (_e = y.getState()) === null ||
          _e === void 0 ||
          (te = _e.nextTree) === null ||
          te === void 0
            ? void 0
            : te.version) !== null && ue !== void 0
          ? ue
          : y.getState().currentTree.version,
      )
    }
    for (const pe of A) i.add(pe)
  }
  function C(y, N, A) {
    const K = X1(n)
    let z = !0,
      Y = !0
    const J = () => {
      K(), (Y = !1)
    }
    let F,
      ue = !1,
      _e
    const te = { loadingDepKey: null, loadingDepPromise: null },
      pe = new Map()
    function at({ key: tt }) {
      const Ye = $o(y, N, tt)
      switch ((pe.set(tt, Ye), z || (k(y, N, new Set(pe.keys()), A), B(y, A)), Ye.state)) {
        case 'hasValue':
          return Ye.contents
        case 'hasError':
          throw Ye.contents
        case 'loading':
          throw ((te.loadingDepKey = tt), (te.loadingDepPromise = Ye.contents), Ye.contents)
      }
      throw Z('Invalid Loadable state')
    }
    const an =
      (tt) =>
      (...Ye) => {
        if (Y)
          throw Z(
            'Callbacks from getCallback() should only be called asynchronously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that can work with Recoil state without a subscription.',
          )
        return t == null && Pr(!1), Z1(y, tt, Ye, { node: t })
      }
    try {
      ;(F = r({ get: at, getCallback: an })),
        (F = G1(F) ? at(F) : F),
        O1(F) && (F.state === 'hasError' && (ue = !0), (F = F.contents)),
        ce(F) ? (F = f(y, F, N, pe, A, te).finally(J)) : J(),
        (F = F instanceof Qp ? F.value : F)
    } catch (tt) {
      ;(F = tt), ce(F) ? (F = R(y, F, N, pe, A, te).finally(J)) : ((ue = !0), J())
    }
    return (
      ue ? (_e = Uo(F)) : ce(F) ? (_e = F1(F)) : (_e = ji(F)),
      (z = !1),
      Qe(y, A, pe),
      k(y, N, new Set(pe.keys()), A),
      [_e, pe]
    )
  }
  function L(y, N) {
    let A = N.atomValues.get(n)
    if (A != null) return A
    const K = new Set()
    try {
      A = u.get((Y) => (typeof Y != 'string' && Pr(!1), $o(y, N, Y).contents), {
        onNodeVisit: (Y) => {
          Y.type === 'branch' && Y.nodeKey !== n && K.add(Y.nodeKey)
        },
      })
    } catch (Y) {
      throw Z(`Problem with cache lookup for selector "${n}": ${Y.message}`)
    }
    if (A) {
      var z
      N.atomValues.set(n, A),
        k(y, N, K, (z = U(y)) === null || z === void 0 ? void 0 : z.executionID)
    }
    return A
  }
  function I(y, N) {
    const A = L(y, N)
    if (A != null) return de(y), A
    const K = b(y, N)
    if (K != null) {
      var z
      return (
        ((z = K.loadingLoadable) === null || z === void 0 ? void 0 : z.state) === 'loading' &&
          c(y, K.executionID),
        K.loadingLoadable
      )
    }
    const Y = J1(),
      [J, F] = C(y, N, Y)
    return J.state === 'loading' ? (ne(y, Y, J, F, N), c(y, Y)) : (de(y), St(N, J, F)), J
  }
  function b(y, N) {
    const A = mp([
      a.has(y) ? [fe(a.get(y))] : [],
      Yl(
        Bs(a, ([z]) => z !== y),
        ([, z]) => z,
      ),
    ])
    function K(z) {
      for (const [Y, J] of z) if (!$o(y, N, Y).is(J)) return !0
      return !1
    }
    for (const z of A) {
      if (z.stateVersions.get(N.version) || !K(z.depValuesDiscoveredSoFarDuringAsyncWork))
        return z.stateVersions.set(N.version, !0), z
      z.stateVersions.set(N.version, !1)
    }
  }
  function U(y) {
    return a.get(y)
  }
  function ne(y, N, A, K, z) {
    a.set(y, {
      depValuesDiscoveredSoFarDuringAsyncWork: K,
      executionID: N,
      loadingLoadable: A,
      stateVersions: new Map([[z.version, !0]]),
    })
  }
  function Qe(y, N, A) {
    if (xe(y, N)) {
      const K = U(y)
      K != null && (K.depValuesDiscoveredSoFarDuringAsyncWork = A)
    }
  }
  function de(y) {
    a.delete(y)
  }
  function xe(y, N) {
    var A
    return N === ((A = U(y)) === null || A === void 0 ? void 0 : A.executionID)
  }
  function $t(y) {
    return Array.from(y.entries()).map(([N, A]) => [N, A.contents])
  }
  function St(y, N, A) {
    y.atomValues.set(n, N)
    try {
      u.set($t(A), N)
    } catch (K) {
      throw Z(`Problem with setting cache for selector "${n}": ${K.message}`)
    }
  }
  function Ge(y) {
    if (kr.includes(n)) {
      const N = `Recoil selector has circular dependencies: ${kr
        .slice(kr.indexOf(n))
        .join(' \u2192 ')}`
      return Uo(Z(N))
    }
    kr.push(n)
    try {
      return y()
    } finally {
      kr.pop()
    }
  }
  function M(y, N) {
    const A = N.atomValues.get(n)
    return A != null
      ? A
      : u.get((K) => {
          var z
          return (
            typeof K != 'string' && Pr(!1),
            (z = B1(y, N, K)) === null || z === void 0 ? void 0 : z.contents
          )
        })
  }
  function j(y, N) {
    return Ge(() => I(y, N))
  }
  function V(y) {
    y.atomValues.delete(n)
  }
  function O(y, N) {
    t == null && Pr(!1)
    for (const K of i) {
      var A
      const z = Q1(K)
      ;(A = z.clearCache) === null || A === void 0 || A.call(z, y, N)
    }
    i.clear(), V(N), u.clear(), Lc(y, t)
  }
  return l != null
    ? (t = Cc({
        key: n,
        nodeType: 'selector',
        peek: M,
        get: j,
        set: (N, A, K) => {
          let z = !1
          const Y = new Map()
          function J({ key: te }) {
            if (z) throw Z('Recoil: Async selector sets are not currently supported.')
            const pe = $o(N, A, te)
            if (pe.state === 'hasValue') return pe.contents
            if (pe.state === 'loading') {
              const at = `Getting value of asynchronous atom or selector "${te}" in a pending state while setting selector "${n}" is not yet supported.`
              throw Z(at)
            } else throw pe.contents
          }
          function F(te, pe) {
            if (z) throw Z('Recoil: Async selector sets are not currently supported.')
            const at = typeof pe == 'function' ? pe(J(te)) : pe
            j1(N, A, te.key, at).forEach((tt, Ye) => Y.set(Ye, tt))
          }
          function ue(te) {
            F(te, H1)
          }
          const _e = l({ set: F, get: J, reset: ue }, K)
          if (_e !== void 0)
            throw ce(_e)
              ? Z('Recoil: Async selector sets are not currently supported.')
              : Z('Recoil: selector set should be a void function.')
          return (z = !0), Y
        },
        init: m,
        invalidate: V,
        clearCache: O,
        shouldDeleteConfigOnRelease: _,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        shouldRestoreFromSnapshots: !1,
        retainedBy: s,
      }))
    : (t = Cc({
        key: n,
        nodeType: 'selector',
        peek: M,
        get: j,
        init: m,
        invalidate: V,
        clearCache: O,
        shouldDeleteConfigOnRelease: _,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        shouldRestoreFromSnapshots: !1,
        retainedBy: s,
      }))
}
Yp.value = (e) => new Qp(e)
var sr = Yp
const {
    isLoadable: q1,
    loadableWithError: Wi,
    loadableWithPromise: Hi,
    loadableWithValue: Pn,
  } = po,
  { WrappedValue: Zp } = Wp,
  { peekNodeInfo: b1 } = un,
  {
    DEFAULT_VALUE: dn,
    DefaultValue: jt,
    getConfigDeletionHandler: Xp,
    registerNode: e_,
    setConfigDeletionHandler: t_,
  } = Ke,
  { isRecoilValue: n_ } = lr,
  {
    getRecoilValueAsLoadable: r_,
    markRecoilValueModified: o_,
    setRecoilValue: Ac,
    setRecoilValueLoadable: l_,
  } = kt,
  { retainedByOptionWithDefault: i_ } = Ln,
  Nr = (e) => (e instanceof Zp ? e.value : e)
function u_(e) {
  const { key: t, persistence_UNSTABLE: n } = e,
    r = i_(e.retainedBy_UNSTABLE)
  let o = 0
  function l(c) {
    return Hi(
      c
        .then((f) => ((i = Pn(f)), f))
        .catch((f) => {
          throw ((i = Wi(f)), f)
        }),
    )
  }
  let i = ce(e.default)
    ? l(e.default)
    : q1(e.default)
    ? e.default.state === 'loading'
      ? l(e.default.contents)
      : e.default
    : Pn(Nr(e.default))
  i.contents
  let u
  const s = new Map()
  function a(c) {
    return c
  }
  function d(c, f) {
    const R = f
      .then((k) => {
        var C, L
        return (
          ((L = (
            (C = c.getState().nextTree) !== null && C !== void 0 ? C : c.getState().currentTree
          ).atomValues.get(t)) === null || L === void 0
            ? void 0
            : L.contents) === R && Ac(c, h, k),
          k
        )
      })
      .catch((k) => {
        var C, L
        throw (
          (((L = (
            (C = c.getState().nextTree) !== null && C !== void 0 ? C : c.getState().currentTree
          ).atomValues.get(t)) === null || L === void 0
            ? void 0
            : L.contents) === R && l_(c, h, Wi(k)),
          k)
        )
      })
    return R
  }
  function p(c, f, R) {
    var k
    o++
    const C = () => {
      var U
      o--, (U = s.get(c)) === null || U === void 0 || U.forEach((ne) => ne()), s.delete(c)
    }
    if ((c.getState().knownAtoms.add(t), i.state === 'loading')) {
      const U = () => {
        var ne
        ;((ne = c.getState().nextTree) !== null && ne !== void 0
          ? ne
          : c.getState().currentTree
        ).atomValues.has(t) || o_(c, h)
      }
      i.contents.finally(U)
    }
    const L = (k = e.effects) !== null && k !== void 0 ? k : e.effects_UNSTABLE
    if (L != null) {
      let xe = function (V) {
          if (ne && V.key === t) {
            const O = U
            return O instanceof jt
              ? m(c, f)
              : ce(O)
              ? Hi(O.then((y) => (y instanceof jt ? i.toPromise() : y)))
              : Pn(O)
          }
          return r_(c, V)
        },
        $t = function (V) {
          return xe(V).toPromise()
        },
        St = function (V) {
          var O
          const y = b1(
            c,
            (O = c.getState().nextTree) !== null && O !== void 0 ? O : c.getState().currentTree,
            V.key,
          )
          return ne && V.key === t && !(U instanceof jt) ? { ...y, isSet: !0, loadable: xe(V) } : y
        },
        U = dn,
        ne = !0,
        Qe = !1,
        de = null
      const Ge = (V) => (O) => {
          if (ne) {
            const y = xe(h),
              N = y.state === 'hasValue' ? y.contents : dn
            ;(U = typeof O == 'function' ? O(N) : O),
              ce(U) && (U = U.then((A) => ((de = { effect: V, value: A }), A)))
          } else {
            if (ce(O)) throw Z('Setting atoms to async values is not implemented.')
            typeof O != 'function' && (de = { effect: V, value: Nr(O) }),
              Ac(
                c,
                h,
                typeof O == 'function'
                  ? (y) => {
                      const N = Nr(O(y))
                      return (de = { effect: V, value: N }), N
                    }
                  : Nr(O),
              )
          }
        },
        M = (V) => () => Ge(V)(dn),
        j = (V) => (O) => {
          var y
          const { release: N } = c.subscribeToTransactions((A) => {
            var K
            let { currentTree: z, previousTree: Y } = A.getState()
            Y || (Y = z)
            const J = (K = z.atomValues.get(t)) !== null && K !== void 0 ? K : i
            if (J.state === 'hasValue') {
              var F, ue, _e, te
              const pe = J.contents,
                at = (F = Y.atomValues.get(t)) !== null && F !== void 0 ? F : i,
                an = at.state === 'hasValue' ? at.contents : dn
              ;((ue = de) === null || ue === void 0 ? void 0 : ue.effect) !== V ||
              ((_e = de) === null || _e === void 0 ? void 0 : _e.value) !== pe
                ? O(pe, an, !z.atomValues.has(t))
                : ((te = de) === null || te === void 0 ? void 0 : te.effect) === V && (de = null)
            }
          }, t)
          s.set(c, [...((y = s.get(c)) !== null && y !== void 0 ? y : []), N])
        }
      for (const V of L)
        try {
          const O = V({
            node: h,
            storeID: c.storeID,
            parentStoreID_UNSTABLE: c.parentStoreID,
            trigger: R,
            setSelf: Ge(V),
            resetSelf: M(V),
            onSet: j(V),
            getPromise: $t,
            getLoadable: xe,
            getInfo_UNSTABLE: St,
          })
          if (O != null) {
            var I
            s.set(c, [...((I = s.get(c)) !== null && I !== void 0 ? I : []), O])
          }
        } catch (O) {
          ;(U = O), (Qe = !0)
        }
      if (((ne = !1), !(U instanceof jt))) {
        var b
        const V = Qe ? Wi(U) : ce(U) ? Hi(d(c, U)) : Pn(Nr(U))
        V.contents,
          f.atomValues.set(t, V),
          (b = c.getState().nextTree) === null || b === void 0 || b.atomValues.set(t, V)
      }
    }
    return C
  }
  function m(c, f) {
    var R, k
    return (R = (k = f.atomValues.get(t)) !== null && k !== void 0 ? k : u) !== null && R !== void 0
      ? R
      : i
  }
  function _(c, f) {
    if (f.atomValues.has(t)) return fe(f.atomValues.get(t))
    if (f.nonvalidatedAtoms.has(t)) {
      if (u != null) return u
      if (n == null) return i
      const R = f.nonvalidatedAtoms.get(t),
        k = n.validator(R, dn)
      return (u = k instanceof jt ? i : Pn(k)), u
    } else return i
  }
  function S() {
    u = void 0
  }
  function w(c, f, R) {
    if (f.atomValues.has(t)) {
      const k = fe(f.atomValues.get(t))
      if (k.state === 'hasValue' && R === k.contents) return new Map()
    } else if (!f.nonvalidatedAtoms.has(t) && R instanceof jt) return new Map()
    return (u = void 0), new Map().set(t, Pn(R))
  }
  function B() {
    return Xp(t) !== void 0 && o <= 0
  }
  const h = e_({
    key: t,
    nodeType: 'atom',
    peek: m,
    get: _,
    set: w,
    init: p,
    invalidate: S,
    shouldDeleteConfigOnRelease: B,
    dangerouslyAllowMutability: e.dangerouslyAllowMutability,
    persistence_UNSTABLE: e.persistence_UNSTABLE
      ? { type: e.persistence_UNSTABLE.type, backButton: e.persistence_UNSTABLE.backButton }
      : void 0,
    shouldRestoreFromSnapshots: !0,
    retainedBy: r,
  })
  return h
}
function qs(e) {
  const { ...t } = e,
    n = 'default' in e ? e.default : new Promise(() => {})
  return n_(n) ? s_({ ...t, default: n }) : u_({ ...t, default: n })
}
function s_(e) {
  const t = qs({
      ...e,
      default: dn,
      persistence_UNSTABLE:
        e.persistence_UNSTABLE === void 0
          ? void 0
          : {
              ...e.persistence_UNSTABLE,
              validator: (r) => (r instanceof jt ? r : fe(e.persistence_UNSTABLE).validator(r, dn)),
            },
      effects: e.effects,
      effects_UNSTABLE: e.effects_UNSTABLE,
    }),
    n = sr({
      key: `${e.key}__withFallback`,
      get: ({ get: r }) => {
        const o = r(t)
        return o instanceof jt ? e.default : o
      },
      set: ({ set: r }, o) => r(t, o),
      cachePolicy_UNSTABLE: { eviction: 'most-recent' },
      dangerouslyAllowMutability: e.dangerouslyAllowMutability,
    })
  return t_(n.key, Xp(e.key)), n
}
qs.value = (e) => new Zp(e)
var Jp = qs
class a_ {
  constructor(t) {
    var n
    G(this, '_map', void 0),
      G(this, '_keyMapper', void 0),
      (this._map = new Map()),
      (this._keyMapper =
        (n = t == null ? void 0 : t.mapKey) !== null && n !== void 0 ? n : (r) => r)
  }
  size() {
    return this._map.size
  }
  has(t) {
    return this._map.has(this._keyMapper(t))
  }
  get(t) {
    return this._map.get(this._keyMapper(t))
  }
  set(t, n) {
    this._map.set(this._keyMapper(t), n)
  }
  delete(t) {
    this._map.delete(this._keyMapper(t))
  }
  clear() {
    this._map.clear()
  }
}
var c_ = { MapCache: a_ },
  f_ = c_.MapCache,
  d_ = Object.freeze({ __proto__: null, MapCache: f_ })
const { LRUCache: xc } = Kp,
  { MapCache: p_ } = d_,
  Fo = { equality: 'reference', eviction: 'none', maxSize: 1 / 0 }
function h_({
  equality: e = Fo.equality,
  eviction: t = Fo.eviction,
  maxSize: n = Fo.maxSize,
} = Fo) {
  const r = v_(e)
  return m_(t, n, r)
}
function v_(e) {
  switch (e) {
    case 'reference':
      return (t) => t
    case 'value':
      return (t) => ii(t)
  }
  throw Z(`Unrecognized equality policy ${e}`)
}
function m_(e, t, n) {
  switch (e) {
    case 'keep-all':
      return new p_({ mapKey: n })
    case 'lru':
      return new xc({ mapKey: n, maxSize: fe(t) })
    case 'most-recent':
      return new xc({ mapKey: n, maxSize: 1 })
  }
  throw Z(`Unrecognized eviction policy ${e}`)
}
var qp = h_
const { setConfigDeletionHandler: y_ } = Ke
function g_(e) {
  var t, n
  const r = qp({
    equality:
      (t = (n = e.cachePolicyForParams_UNSTABLE) === null || n === void 0 ? void 0 : n.equality) !==
        null && t !== void 0
        ? t
        : 'value',
    eviction: 'keep-all',
  })
  return (o) => {
    var l, i
    const u = r.get(o)
    if (u != null) return u
    const { cachePolicyForParams_UNSTABLE: s, ...a } = e,
      d = 'default' in e ? e.default : new Promise(() => {}),
      p = Jp({
        ...a,
        key: `${e.key}__${(l = ii(o)) !== null && l !== void 0 ? l : 'void'}`,
        default: typeof d == 'function' ? d(o) : d,
        retainedBy_UNSTABLE:
          typeof e.retainedBy_UNSTABLE == 'function'
            ? e.retainedBy_UNSTABLE(o)
            : e.retainedBy_UNSTABLE,
        effects:
          typeof e.effects == 'function'
            ? e.effects(o)
            : typeof e.effects_UNSTABLE == 'function'
            ? e.effects_UNSTABLE(o)
            : (i = e.effects) !== null && i !== void 0
            ? i
            : e.effects_UNSTABLE,
      })
    return (
      r.set(o, p),
      y_(p.key, () => {
        r.delete(o)
      }),
      p
    )
  }
}
var S_ = g_
const { setConfigDeletionHandler: __ } = Ke
let w_ = 0
function R_(e) {
  var t, n
  const r = qp({
    equality:
      (t = (n = e.cachePolicyForParams_UNSTABLE) === null || n === void 0 ? void 0 : n.equality) !==
        null && t !== void 0
        ? t
        : 'value',
    eviction: 'keep-all',
  })
  return (o) => {
    var l
    let i
    try {
      i = r.get(o)
    } catch (m) {
      throw Z(`Problem with cache lookup for selector ${e.key}: ${m.message}`)
    }
    if (i != null) return i
    const u = `${e.key}__selectorFamily/${
        (l = ii(o, { allowFunctions: !0 })) !== null && l !== void 0 ? l : 'void'
      }/${w_++}`,
      s = (m) => e.get(o)(m),
      a = e.cachePolicy_UNSTABLE,
      d =
        typeof e.retainedBy_UNSTABLE == 'function'
          ? e.retainedBy_UNSTABLE(o)
          : e.retainedBy_UNSTABLE
    let p
    if (e.set != null) {
      const m = e.set
      p = sr({
        key: u,
        get: s,
        set: (S, w) => m(o)(S, w),
        cachePolicy_UNSTABLE: a,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: d,
      })
    } else
      p = sr({
        key: u,
        get: s,
        cachePolicy_UNSTABLE: a,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: d,
      })
    return (
      r.set(o, p),
      __(p.key, () => {
        r.delete(o)
      }),
      p
    )
  }
}
var sn = R_
const E_ = sn({
  key: '__constant',
  get: (e) => () => e,
  cachePolicyForParams_UNSTABLE: { equality: 'reference' },
})
function T_(e) {
  return E_(e)
}
var k_ = T_
const N_ = sn({
  key: '__error',
  get: (e) => () => {
    throw Z(e)
  },
  cachePolicyForParams_UNSTABLE: { equality: 'reference' },
})
function C_(e) {
  return N_(e)
}
var L_ = C_
function A_(e) {
  return e
}
var x_ = A_
const { loadableWithError: bp, loadableWithPromise: eh, loadableWithValue: th } = po
function ui(e, t) {
  const n = Array(t.length).fill(void 0),
    r = Array(t.length).fill(void 0)
  for (const [o, l] of t.entries())
    try {
      n[o] = e(l)
    } catch (i) {
      r[o] = i
    }
  return [n, r]
}
function P_(e) {
  return e != null && !ce(e)
}
function si(e) {
  return Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map((t) => e[t])
}
function Hu(e, t) {
  return Array.isArray(e)
    ? t
    : Object.getOwnPropertyNames(e).reduce((n, r, o) => ({ ...n, [r]: t[o] }), {})
}
function Xn(e, t, n) {
  const r = n.map((o, l) => (o == null ? th(t[l]) : ce(o) ? eh(o) : bp(o)))
  return Hu(e, r)
}
function M_(e, t) {
  return t.map((n, r) => (n === void 0 ? e[r] : n))
}
const V_ = sn({
    key: '__waitForNone',
    get:
      (e) =>
      ({ get: t }) => {
        const n = si(e),
          [r, o] = ui(t, n)
        return Xn(e, r, o)
      },
    dangerouslyAllowMutability: !0,
  }),
  I_ = sn({
    key: '__waitForAny',
    get:
      (e) =>
      ({ get: t }) => {
        const n = si(e),
          [r, o] = ui(t, n)
        return o.some((l) => !ce(l))
          ? Xn(e, r, o)
          : new Promise((l) => {
              for (const [i, u] of o.entries())
                ce(u) &&
                  u
                    .then((s) => {
                      ;(r[i] = s), (o[i] = void 0), l(Xn(e, r, o))
                    })
                    .catch((s) => {
                      ;(o[i] = s), l(Xn(e, r, o))
                    })
            })
      },
    dangerouslyAllowMutability: !0,
  }),
  z_ = sn({
    key: '__waitForAll',
    get:
      (e) =>
      ({ get: t }) => {
        const n = si(e),
          [r, o] = ui(t, n)
        if (o.every((i) => i == null)) return Hu(e, r)
        const l = o.find(P_)
        if (l != null) throw l
        return Promise.all(o).then((i) => Hu(e, M_(r, i)))
      },
    dangerouslyAllowMutability: !0,
  }),
  D_ = sn({
    key: '__waitForAllSettled',
    get:
      (e) =>
      ({ get: t }) => {
        const n = si(e),
          [r, o] = ui(t, n)
        return o.every((l) => !ce(l))
          ? Xn(e, r, o)
          : Promise.all(
              o.map((l, i) =>
                ce(l)
                  ? l
                      .then((u) => {
                        ;(r[i] = u), (o[i] = void 0)
                      })
                      .catch((u) => {
                        ;(r[i] = void 0), (o[i] = u)
                      })
                  : null,
              ),
            ).then(() => Xn(e, r, o))
      },
    dangerouslyAllowMutability: !0,
  }),
  U_ = sn({
    key: '__noWait',
    get:
      (e) =>
      ({ get: t }) => {
        try {
          return sr.value(th(t(e)))
        } catch (n) {
          return sr.value(ce(n) ? eh(n) : bp(n))
        }
      },
    dangerouslyAllowMutability: !0,
  })
var $_ = { waitForNone: V_, waitForAny: I_, waitForAll: z_, waitForAllSettled: D_, noWait: U_ }
const { RecoilLoadable: O_ } = po,
  { DefaultValue: F_ } = Ke,
  { RecoilRoot: B_, useRecoilStoreID: j_ } = Ut,
  { isRecoilValue: W_ } = lr,
  { retentionZone: H_ } = Xl,
  { freshSnapshot: K_ } = ti,
  {
    useRecoilState: Q_,
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE: G_,
    useRecoilStateLoadable: Y_,
    useRecoilValue: Z_,
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: X_,
    useRecoilValueLoadable: J_,
    useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: q_,
    useResetRecoilState: b_,
    useSetRecoilState: ew,
  } = cS,
  { useGotoRecoilSnapshot: tw, useRecoilSnapshot: nw, useRecoilTransactionObserver: rw } = $p,
  { useRecoilCallback: ow } = jp,
  { noWait: lw, waitForAll: iw, waitForAllSettled: uw, waitForAny: sw, waitForNone: aw } = $_
var bs = {
    DefaultValue: F_,
    isRecoilValue: W_,
    RecoilLoadable: O_,
    RecoilEnv: jd,
    RecoilRoot: B_,
    useRecoilStoreID: j_,
    useRecoilBridgeAcrossReactRoots_UNSTABLE: US,
    atom: Jp,
    selector: sr,
    atomFamily: S_,
    selectorFamily: sn,
    constSelector: k_,
    errorSelector: L_,
    readOnlySelector: x_,
    noWait: lw,
    waitForNone: aw,
    waitForAny: sw,
    waitForAll: iw,
    waitForAllSettled: uw,
    useRecoilValue: Z_,
    useRecoilValueLoadable: J_,
    useRecoilState: Q_,
    useRecoilStateLoadable: Y_,
    useSetRecoilState: ew,
    useResetRecoilState: b_,
    useGetRecoilValueInfo_UNSTABLE: PS,
    useRecoilRefresher_UNSTABLE: d1,
    useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: q_,
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: X_,
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE: G_,
    useRecoilCallback: ow,
    useRecoilTransaction_UNSTABLE: y1,
    useGotoRecoilSnapshot: tw,
    useRecoilSnapshot: nw,
    useRecoilTransactionObserver_UNSTABLE: rw,
    snapshot_UNSTABLE: K_,
    useRetain: Gs,
    retentionZone: H_,
  },
  fw = bs.RecoilRoot,
  dw = bs.atom,
  pw = bs.useRecoilState
export { dw as R, Rl as a, pw as b, fw as c, Rm as j, Mc as r }
