function A(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e
}
var _ = { exports: {} },
  u = {}
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var m = Symbol.for('react.element'),
  K = Symbol.for('react.portal'),
  Q = Symbol.for('react.fragment'),
  Y = Symbol.for('react.strict_mode'),
  X = Symbol.for('react.profiler'),
  Z = Symbol.for('react.provider'),
  ee = Symbol.for('react.context'),
  te = Symbol.for('react.forward_ref'),
  re = Symbol.for('react.suspense'),
  ne = Symbol.for('react.memo'),
  oe = Symbol.for('react.lazy'),
  V = Symbol.iterator
function ue(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (V && e[V]) || e['@@iterator']), typeof e == 'function' ? e : null)
}
var F = {
    isMounted: function () {
      return !1
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  L = Object.assign,
  M = {}
function h(e, t, r) {
  ;(this.props = e), (this.context = t), (this.refs = M), (this.updater = r || F)
}
h.prototype.isReactComponent = {}
h.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
    )
  this.updater.enqueueSetState(this, e, t, 'setState')
}
h.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate')
}
function U() {}
U.prototype = h.prototype
function b(e, t, r) {
  ;(this.props = e), (this.context = t), (this.refs = M), (this.updater = r || F)
}
var R = (b.prototype = new U())
R.constructor = b
L(R, h.prototype)
R.isPureReactComponent = !0
var I = Array.isArray,
  N = Object.prototype.hasOwnProperty,
  O = { current: null },
  B = { key: !0, ref: !0, __self: !0, __source: !0 }
function W(e, t, r) {
  var o,
    n = {},
    c = null,
    f = null
  if (t != null)
    for (o in (t.ref !== void 0 && (f = t.ref), t.key !== void 0 && (c = '' + t.key), t))
      N.call(t, o) && !B.hasOwnProperty(o) && (n[o] = t[o])
  var i = arguments.length - 2
  if (i === 1) n.children = r
  else if (1 < i) {
    for (var s = Array(i), l = 0; l < i; l++) s[l] = arguments[l + 2]
    n.children = s
  }
  if (e && e.defaultProps) for (o in ((i = e.defaultProps), i)) n[o] === void 0 && (n[o] = i[o])
  return { $$typeof: m, type: e, key: c, ref: f, props: n, _owner: O.current }
}
function ce(e, t) {
  return { $$typeof: m, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner }
}
function C(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === m
}
function se(e) {
  var t = { '=': '=0', ':': '=2' }
  return (
    '$' +
    e.replace(/[=:]/g, function (r) {
      return t[r]
    })
  )
}
var D = /\/+/g
function k(e, t) {
  return typeof e == 'object' && e !== null && e.key != null ? se('' + e.key) : t.toString(36)
}
function w(e, t, r, o, n) {
  var c = typeof e
  ;(c === 'undefined' || c === 'boolean') && (e = null)
  var f = !1
  if (e === null) f = !0
  else
    switch (c) {
      case 'string':
      case 'number':
        f = !0
        break
      case 'object':
        switch (e.$$typeof) {
          case m:
          case K:
            f = !0
        }
    }
  if (f)
    return (
      (f = e),
      (n = n(f)),
      (e = o === '' ? '.' + k(f, 0) : o),
      I(n)
        ? ((r = ''),
          e != null && (r = e.replace(D, '$&/') + '/'),
          w(n, t, r, '', function (l) {
            return l
          }))
        : n != null &&
          (C(n) &&
            (n = ce(
              n,
              r +
                (!n.key || (f && f.key === n.key) ? '' : ('' + n.key).replace(D, '$&/') + '/') +
                e,
            )),
          t.push(n)),
      1
    )
  if (((f = 0), (o = o === '' ? '.' : o + ':'), I(e)))
    for (var i = 0; i < e.length; i++) {
      c = e[i]
      var s = o + k(c, i)
      f += w(c, t, r, s, n)
    }
  else if (((s = ue(e)), typeof s == 'function'))
    for (e = s.call(e), i = 0; !(c = e.next()).done; )
      (c = c.value), (s = o + k(c, i++)), (f += w(c, t, r, s, n))
  else if (c === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
          '). If you meant to render a collection of children, use an array instead.',
      ))
    )
  return f
}
function $(e, t, r) {
  if (e == null) return e
  var o = [],
    n = 0
  return (
    w(e, o, '', '', function (c) {
      return t.call(r, c, n++)
    }),
    o
  )
}
function ie(e) {
  if (e._status === -1) {
    var t = e._result
    ;(t = t()),
      t.then(
        function (r) {
          ;(e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = r))
        },
        function (r) {
          ;(e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = r))
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t))
  }
  if (e._status === 1) return e._result.default
  throw e._result
}
var a = { current: null },
  x = { transition: null },
  fe = { ReactCurrentDispatcher: a, ReactCurrentBatchConfig: x, ReactCurrentOwner: O }
u.Children = {
  map: $,
  forEach: function (e, t, r) {
    $(
      e,
      function () {
        t.apply(this, arguments)
      },
      r,
    )
  },
  count: function (e) {
    var t = 0
    return (
      $(e, function () {
        t++
      }),
      t
    )
  },
  toArray: function (e) {
    return (
      $(e, function (t) {
        return t
      }) || []
    )
  },
  only: function (e) {
    if (!C(e)) throw Error('React.Children.only expected to receive a single React element child.')
    return e
  },
}
u.Component = h
u.Fragment = Q
u.Profiler = X
u.PureComponent = b
u.StrictMode = Y
u.Suspense = re
u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fe
u.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.',
    )
  var o = L({}, e.props),
    n = e.key,
    c = e.ref,
    f = e._owner
  if (t != null) {
    if (
      (t.ref !== void 0 && ((c = t.ref), (f = O.current)),
      t.key !== void 0 && (n = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var i = e.type.defaultProps
    for (s in t)
      N.call(t, s) && !B.hasOwnProperty(s) && (o[s] = t[s] === void 0 && i !== void 0 ? i[s] : t[s])
  }
  var s = arguments.length - 2
  if (s === 1) o.children = r
  else if (1 < s) {
    i = Array(s)
    for (var l = 0; l < s; l++) i[l] = arguments[l + 2]
    o.children = i
  }
  return { $$typeof: m, type: e.type, key: n, ref: c, props: o, _owner: f }
}
u.createContext = function (e) {
  return (
    (e = {
      $$typeof: ee,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Z, _context: e }),
    (e.Consumer = e)
  )
}
u.createElement = W
u.createFactory = function (e) {
  var t = W.bind(null, e)
  return (t.type = e), t
}
u.createRef = function () {
  return { current: null }
}
u.forwardRef = function (e) {
  return { $$typeof: te, render: e }
}
u.isValidElement = C
u.lazy = function (e) {
  return { $$typeof: oe, _payload: { _status: -1, _result: e }, _init: ie }
}
u.memo = function (e, t) {
  return { $$typeof: ne, type: e, compare: t === void 0 ? null : t }
}
u.startTransition = function (e) {
  var t = x.transition
  x.transition = {}
  try {
    e()
  } finally {
    x.transition = t
  }
}
u.unstable_act = function () {
  throw Error('act(...) is not supported in production builds of React.')
}
u.useCallback = function (e, t) {
  return a.current.useCallback(e, t)
}
u.useContext = function (e) {
  return a.current.useContext(e)
}
u.useDebugValue = function () {}
u.useDeferredValue = function (e) {
  return a.current.useDeferredValue(e)
}
u.useEffect = function (e, t) {
  return a.current.useEffect(e, t)
}
u.useId = function () {
  return a.current.useId()
}
u.useImperativeHandle = function (e, t, r) {
  return a.current.useImperativeHandle(e, t, r)
}
u.useInsertionEffect = function (e, t) {
  return a.current.useInsertionEffect(e, t)
}
u.useLayoutEffect = function (e, t) {
  return a.current.useLayoutEffect(e, t)
}
u.useMemo = function (e, t) {
  return a.current.useMemo(e, t)
}
u.useReducer = function (e, t, r) {
  return a.current.useReducer(e, t, r)
}
u.useRef = function (e) {
  return a.current.useRef(e)
}
u.useState = function (e) {
  return a.current.useState(e)
}
u.useSyncExternalStore = function (e, t, r) {
  return a.current.useSyncExternalStore(e, t, r)
}
u.useTransition = function () {
  return a.current.useTransition()
}
u.version = '18.2.0'
;(function (e) {
  e.exports = u
})(_)
const Pe = A(_.exports),
  q = (e) => {
    let t
    const r = new Set(),
      o = (s, l) => {
        const p = typeof s == 'function' ? s(t) : s
        if (!Object.is(p, t)) {
          const d = t
          ;(t = (l != null ? l : typeof p != 'object') ? p : Object.assign({}, t, p)),
            r.forEach((E) => E(t, d))
        }
      },
      n = () => t,
      i = {
        setState: o,
        getState: n,
        subscribe: (s) => (r.add(s), () => r.delete(s)),
        destroy: () => r.clear(),
      }
    return (t = e(o, n, i)), i
  },
  le = (e) => (e ? q(e) : q)
var z = { exports: {} },
  H = {},
  G = { exports: {} },
  J = {}
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var S = _.exports
function ae(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
}
var pe = typeof Object.is == 'function' ? Object.is : ae,
  ye = S.useState,
  de = S.useEffect,
  ve = S.useLayoutEffect,
  Se = S.useDebugValue
function he(e, t) {
  var r = t(),
    o = ye({ inst: { value: r, getSnapshot: t } }),
    n = o[0].inst,
    c = o[1]
  return (
    ve(
      function () {
        ;(n.value = r), (n.getSnapshot = t), g(n) && c({ inst: n })
      },
      [e, r, t],
    ),
    de(
      function () {
        return (
          g(n) && c({ inst: n }),
          e(function () {
            g(n) && c({ inst: n })
          })
        )
      },
      [e],
    ),
    Se(r),
    r
  )
}
function g(e) {
  var t = e.getSnapshot
  e = e.value
  try {
    var r = t()
    return !pe(e, r)
  } catch {
    return !0
  }
}
function _e(e, t) {
  return t()
}
var me =
  typeof window > 'u' || typeof window.document > 'u' || typeof window.document.createElement > 'u'
    ? _e
    : he
J.useSyncExternalStore = S.useSyncExternalStore !== void 0 ? S.useSyncExternalStore : me
;(function (e) {
  e.exports = J
})(G)
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var j = _.exports,
  Ee = G.exports
function $e(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
}
var we = typeof Object.is == 'function' ? Object.is : $e,
  xe = Ee.useSyncExternalStore,
  je = j.useRef,
  ke = j.useEffect,
  ge = j.useMemo,
  be = j.useDebugValue
H.useSyncExternalStoreWithSelector = function (e, t, r, o, n) {
  var c = je(null)
  if (c.current === null) {
    var f = { hasValue: !1, value: null }
    c.current = f
  } else f = c.current
  c = ge(
    function () {
      function s(y) {
        if (!l) {
          if (((l = !0), (p = y), (y = o(y)), n !== void 0 && f.hasValue)) {
            var v = f.value
            if (n(v, y)) return (d = v)
          }
          return (d = y)
        }
        if (((v = d), we(p, y))) return v
        var P = o(y)
        return n !== void 0 && n(v, P) ? v : ((p = y), (d = P))
      }
      var l = !1,
        p,
        d,
        E = r === void 0 ? null : r
      return [
        function () {
          return s(t())
        },
        E === null
          ? void 0
          : function () {
              return s(E())
            },
      ]
    },
    [t, r, o, n],
  )
  var i = xe(e, c[0], c[1])
  return (
    ke(
      function () {
        ;(f.hasValue = !0), (f.value = i)
      },
      [i],
    ),
    be(i),
    i
  )
}
;(function (e) {
  e.exports = H
})(z)
const Re = A(z.exports),
  { useSyncExternalStoreWithSelector: Oe } = Re
function Ce(e, t = e.getState, r) {
  const o = Oe(e.subscribe, e.getState, e.getServerState || e.getState, t, r)
  return _.exports.useDebugValue(o), o
}
const T = (e) => {
    const t = typeof e == 'function' ? le(e) : e,
      r = (o, n) => Ce(t, o, n)
    return Object.assign(r, t), r
  },
  Ve = (e) => (e ? T(e) : T)
export { Pe as a, Ve as c, A as g, _ as r }
