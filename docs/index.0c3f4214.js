import { r as h, j as m, a as r, R as y, b as R, c as b } from './vendor-recoil.b20d3368.js'
import { r as u, c as g } from './vendor-zustand.41246771.js'
import { a as v, u as P } from './vendor-jotai.45ac9c4f.js'
;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) c(t)
  new MutationObserver((t) => {
    for (const s of t)
      if (s.type === 'childList')
        for (const i of s.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && c(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(t) {
    const s = {}
    return (
      t.integrity && (s.integrity = t.integrity),
      t.referrerpolicy && (s.referrerPolicy = t.referrerpolicy),
      t.crossorigin === 'use-credentials'
        ? (s.credentials = 'include')
        : t.crossorigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    )
  }
  function c(t) {
    if (t.ep) return
    t.ep = !0
    const s = n(t)
    fetch(t.href, s)
  }
})()
var f,
  d = h.exports
;(f = d.createRoot), d.hydrateRoot
const C = new Array(1e4).fill(0),
  l = (o) => {
    const { name: e, useCount: n } = o,
      { count: c, countPlus: t } = n(),
      [s, i] = u.exports.useState(!1),
      [x, a] = u.exports.useState(!1)
    return m('div', {
      style: { display: 'flex', gap: 4 },
      children: [
        e,
        r('button', {
          onClick: () => {
            i(!0), setTimeout(() => i(!1), 1e3)
          },
          children: 'read1',
        }),
        r('button', {
          onClick: () => {
            a(!0), setTimeout(() => a(!1), 1e3)
          },
          children: 'read10000',
        }),
        r('button', {
          onClick: () => {
            console.time(`${e}-write1`), t(), console.timeEnd(`${e}-write1`)
          },
          children: 'write1',
        }),
        r('button', {
          onClick: () => {
            console.time(`${e}-write10000`),
              C.forEach(() => t()),
              console.timeEnd(`${e}-write10000`)
          },
          children: 'write10000',
        }),
        c,
        s && r(k, { ...o }),
        x && r(w, { ...o }),
      ],
    })
  },
  k = (o) => {
    const { name: e, useCount: n } = o
    return (
      console.time(`${e}-read1`),
      n(),
      console.timeEnd(`${e}-read1`),
      r('div', { children: 'read1' })
    )
  },
  w = (o) => {
    const { name: e, useCount: n } = o
    return (
      console.time(`${e}-read10000`),
      C.forEach(() => n()),
      console.timeEnd(`${e}-read10000`),
      r('div', { children: 'read10000' })
    )
  },
  p = u.exports.createContext({ count: 0, countPlus: () => null }),
  E = (o) => {
    const [e, n] = u.exports.useState(0),
      c = u.exports.useCallback(() => {
        n((s) => s + 1)
      }, [n]),
      t = u.exports.useMemo(() => ({ count: e, countPlus: c }), [e, c])
    return r(p.Provider, { value: t, children: o.children })
  },
  $ = () => u.exports.useContext(p),
  A = v(0),
  _ = () => {
    const [o, e] = P(A),
      n = u.exports.useCallback(() => {
        e((c) => c + 1)
      }, [e])
    return { count: o, countPlus: n }
  },
  j = y({ key: 'recoilCountAtom', default: 0 }),
  L = () => {
    const [o, e] = R(j),
      n = u.exports.useCallback(() => {
        e((c) => c + 1)
      }, [e])
    return { count: o, countPlus: n }
  },
  O = g((o) => ({
    count: 0,
    countPlus: () => {
      o((n) => ({ count: n.count + 1 }))
    },
  }))
f(document.getElementById('root')).render(r(b, { children: r(E, { children: r(S, {}) }) }))
function S() {
  return m('div', {
    style: { display: 'flex', flexDirection: 'column', gap: 8 },
    children: [
      r(l, { name: 'zustand', useCount: O }),
      r(l, { name: 'jotai', useCount: _ }),
      r(l, { name: 'recoil', useCount: L }),
      r(l, { name: 'context', useCount: $ }),
    ],
  })
}
