import { r as D } from './vendor-zustand.41246771.js'
let at = 0
function lt(i, d) {
  const f = `atom${++at}`,
    a = { toString: () => f }
  return (
    typeof i == 'function'
      ? (a.read = i)
      : ((a.init = i),
        (a.read = (l) => l(a)),
        (a.write = (l, w, h) => w(a, typeof h == 'function' ? h(l(a)) : h))),
    d && (a.write = d),
    a
  )
}
const g = Symbol(),
  j = (i) => !!i[g],
  V = (i) => !i[g].c,
  P = (i) => {
    var d
    const { b: f, c: a } = i[g]
    a && (a(), (d = Et.get(f)) == null || d())
  },
  U = (i, d) => {
    const f = i[g].o,
      a = d[g].o
    return f === a || i === a || (j(f) && U(f, d))
  },
  G = (i, d) => {
    const f = { b: i, o: d, c: null },
      a = new Promise((l) => {
        ;(f.c = () => {
          ;(f.c = null), l()
        }),
          d.finally(f.c)
      })
    return (a[g] = f), a
  },
  pt = (i) => G(i[g].b, i[g].o),
  Et = new WeakMap(),
  k = (i) => 'init' in i,
  $ = 'r',
  q = 'w',
  B = 'c',
  H = 's',
  ot = 'h',
  St = 'n',
  ht = 'l',
  At = 'a',
  mt = 'm',
  wt = (i) => {
    const d = new WeakMap(),
      f = new WeakMap(),
      a = new Map()
    let l, w
    if (
      (({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
        'production') !== 'production' && ((l = new Set()), (w = new Set())),
      i)
    )
      for (const [e, t] of i) {
        const n = { v: t, r: 0, y: !0, d: new Map() }
        ;(({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
          'production') !== 'production' &&
          (Object.freeze(n),
          k(e) ||
            console.warn(
              'Found initial value for derived atom which can cause unexpected behavior',
              e,
            )),
          d.set(e, n))
      }
    const h = new WeakMap(),
      M = (e, t, n) => {
        let r = h.get(t)
        r || ((r = new Map()), h.set(t, r)),
          n.then(() => {
            r.get(e) === n && (r.delete(e), r.size || h.delete(t))
          }),
          r.set(e, n)
      },
      R = (e) => {
        const t = new Set(),
          n = h.get(e)
        return (
          n &&
            (h.delete(e),
            n.forEach((r, o) => {
              P(r), t.add(o)
            })),
          t
        )
      },
      x = new WeakMap(),
      O = (e) => {
        let t = x.get(e)
        return t || ((t = new Map()), x.set(e, t)), t
      },
      p = (e, t) => {
        if (e) {
          const n = O(e)
          let r = n.get(t)
          return (
            r || ((r = p(e.p, t)), r && 'p' in r && V(r.p) && (r = void 0), r && n.set(t, r)), r
          )
        }
        return d.get(t)
      },
      E = (e, t, n) => {
        if (
          (({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
            'production') !== 'production' && Object.freeze(n),
          e)
        )
          O(e).set(t, n)
        else {
          const r = d.get(t)
          d.set(t, n), a.has(t) || a.set(t, r)
        }
      },
      S = (e, t = new Map(), n) => {
        if (!n) return t
        const r = new Map()
        let o = !1
        return (
          n.forEach((s) => {
            var c
            const u = ((c = p(e, s)) == null ? void 0 : c.r) || 0
            r.set(s, u), t.get(s) !== u && (o = !0)
          }),
          t.size === r.size && !o ? t : r
        )
      },
      b = (e, t, n, r, o) => {
        const s = p(e, t)
        if (s) {
          if (o && (!('p' in s) || !U(s.p, o))) return s
          'p' in s && P(s.p)
        }
        const c = {
          v: n,
          r: (s == null ? void 0 : s.r) || 0,
          y: !0,
          d: S(e, s == null ? void 0 : s.d, r),
        }
        let u = !(s != null && s.y)
        return (
          !s || !('v' in s) || !Object.is(s.v, n)
            ? ((u = !0), ++c.r, c.d.has(t) && (c.d = new Map(c.d).set(t, c.r)))
            : c.d !== s.d &&
              (c.d.size !== s.d.size || !Array.from(c.d.keys()).every((m) => s.d.has(m))) &&
              ((u = !0),
              Promise.resolve().then(() => {
                y(e)
              })),
          s && !u ? s : (E(e, t, c), c)
        )
      },
      J = (e, t, n, r, o) => {
        const s = p(e, t)
        if (s) {
          if (o && (!('p' in s) || !U(s.p, o))) return s
          'p' in s && P(s.p)
        }
        const c = {
          e: n,
          r: ((s == null ? void 0 : s.r) || 0) + 1,
          y: !0,
          d: S(e, s == null ? void 0 : s.d, r),
        }
        return E(e, t, c), c
      },
      K = (e, t, n, r) => {
        const o = p(e, t)
        if (o && 'p' in o) {
          if (U(o.p, n) && !V(o.p)) return o.y ? o : { ...o, y: !0 }
          P(o.p)
        }
        M(e, t, n)
        const s = {
          p: n,
          r: ((o == null ? void 0 : o.r) || 0) + 1,
          y: !0,
          d: S(e, o == null ? void 0 : o.d, r),
        }
        return E(e, t, s), s
      },
      z = (e, t, n, r) => {
        if (n instanceof Promise) {
          const o = G(
            n,
            n
              .then((s) => {
                b(e, t, s, r, o)
              })
              .catch((s) => {
                if (s instanceof Promise)
                  return j(s)
                    ? s.then(() => {
                        _(e, t, !0)
                      })
                    : s
                J(e, t, s, r, o)
              }),
          )
          return K(e, t, o, r)
        }
        return b(e, t, n, r)
      },
      st = (e, t) => {
        const n = p(e, t)
        if (n) {
          const r = { ...n, y: !1 }
          E(e, t, r)
        } else
          (({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
            'production') !== 'production' &&
            console.warn('[Bug] could not invalidate non existing atom', t))
      },
      _ = (e, t, n) => {
        if (!n) {
          const o = p(e, t)
          if (o) {
            if (o.y && 'p' in o && !V(o.p)) return o
            if (
              (o.d.forEach((s, c) => {
                if (c !== t)
                  if (!f.has(c)) _(e, c)
                  else {
                    const u = p(e, c)
                    u && !u.y && _(e, c)
                  }
              }),
              Array.from(o.d).every(([s, c]) => {
                const u = p(e, s)
                return u && !('p' in u) && u.r === c
              }))
            )
              return o.y ? o : { ...o, y: !0 }
          }
        }
        const r = new Set()
        try {
          const o = t.read((s) => {
            r.add(s)
            const c = s === t ? p(e, s) : _(e, s)
            if (c) {
              if ('e' in c) throw c.e
              if ('p' in c) throw c.p
              return c.v
            }
            if (k(s)) return s.init
            throw new Error('no atom init')
          })
          return z(e, t, o, r)
        } catch (o) {
          if (o instanceof Promise) {
            const s = j(o) && V(o) ? pt(o) : G(o, o)
            return K(e, t, s, r)
          }
          return J(e, t, o, r)
        }
      },
      Q = (e, t) => _(t, e),
      ct = (e, t) => {
        let n = f.get(t)
        return n || (n = I(e, t)), n
      },
      C = (e, t) => !t.l.size && (!t.t.size || (t.t.size === 1 && t.t.has(e))),
      it = (e, t) => {
        const n = f.get(t)
        n && C(t, n) && W(e, t)
      },
      v = (e, t) => {
        const n = f.get(t)
        n == null ||
          n.t.forEach((r) => {
            r !== t && (st(e, r), v(e, r))
          })
      },
      X = (e, t, n) => {
        let r = !0
        const o = (u, m) => {
            const A = _(e, u)
            if ('e' in A) throw A.e
            if ('p' in A) {
              if (m != null && m.unstable_promise)
                return A.p.then(() => {
                  const T = p(e, u)
                  return T && 'p' in T && T.p === A.p
                    ? new Promise((F) => setTimeout(F)).then(() => o(u, m))
                    : o(u, m)
                })
              throw (
                (({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
                  'production') !== 'production' &&
                  console.info(
                    'Reading pending atom state in write operation. We throw a promise for now.',
                    u,
                  ),
                A.p)
              )
            }
            if ('v' in A) return A.v
            throw (
              (({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
                'production') !== 'production' &&
                console.warn(
                  '[Bug] no value found while reading atom in write operation. This is probably a bug.',
                  u,
                ),
              new Error('no value found'))
            )
          },
          s = (u, m) => {
            let A
            if (u === t) {
              if (!k(u)) throw new Error('atom not writable')
              R(u).forEach((nt) => {
                nt !== e && z(nt, u, m)
              })
              const F = p(e, u),
                ft = z(e, u, m)
              F !== ft && v(e, u)
            } else A = X(e, u, m)
            return r || y(e), A
          },
          c = t.write(o, s, n)
        return (r = !1), c
      },
      L = (e, t, n) => {
        const r = X(n, e, t)
        return y(n), r
      },
      ut = (e) => !!e.write,
      I = (e, t, n) => {
        const r = { t: new Set(n && [n]), l: new Set() }
        if (
          (f.set(t, r),
          ({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
            'production') !== 'production' && w.add(t),
          _(void 0, t).d.forEach((s, c) => {
            const u = f.get(c)
            u ? u.t.add(t) : c !== t && I(e, c, t)
          }),
          ut(t) && t.onMount)
        ) {
          const s = (u) => L(t, u, e),
            c = t.onMount(s)
          ;(e = void 0), c && (r.u = c)
        }
        return r
      },
      W = (e, t) => {
        var n
        const r = (n = f.get(t)) == null ? void 0 : n.u
        r && r(),
          f.delete(t),
          ({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
            'production') !== 'production' && w.delete(t)
        const o = p(e, t)
        o
          ? ('p' in o && P(o.p),
            o.d.forEach((s, c) => {
              if (c !== t) {
                const u = f.get(c)
                u && (u.t.delete(t), C(c, u) && W(e, c))
              }
            }))
          : ({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
              'production') !== 'production' &&
            console.warn('[Bug] could not find atom state to unmount', t)
      },
      Y = (e, t, n, r) => {
        const o = new Set(n.d.keys())
        r == null ||
          r.forEach((s, c) => {
            if (o.has(c)) {
              o.delete(c)
              return
            }
            const u = f.get(c)
            u && (u.t.delete(t), C(c, u) && W(e, c))
          }),
          o.forEach((s) => {
            const c = f.get(s)
            c ? c.t.add(t) : f.has(t) && I(e, s, t)
          })
      },
      y = (e) => {
        if (e) {
          O(e).forEach((n, r) => {
            const o = d.get(r)
            if (n !== o) {
              const s = f.get(r)
              s == null || s.l.forEach((c) => c(e))
            }
          })
          return
        }
        for (; a.size; ) {
          const t = Array.from(a)
          a.clear(),
            t.forEach(([n, r]) => {
              const o = p(void 0, n)
              if (
                (o &&
                  o.d !== (r == null ? void 0 : r.d) &&
                  Y(void 0, n, o, r == null ? void 0 : r.d),
                r && !r.y && (o == null ? void 0 : o.y))
              )
                return
              const s = f.get(n)
              s == null || s.l.forEach((c) => c())
            })
        }
        ;(({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
          'production') !== 'production' && l.forEach((t) => t()))
      },
      dt = (e) => {
        O(e).forEach((n, r) => {
          const o = d.get(r)
          ;(!o || n.r > o.r || n.y !== o.y || (n.r === o.r && n.d !== o.d)) &&
            (d.set(r, n),
            n.d !== (o == null ? void 0 : o.d) && Y(e, r, n, o == null ? void 0 : o.d))
        })
      },
      Z = (e, t) => {
        t && dt(t), y(void 0)
      },
      tt = (e, t, n) => {
        const o = ct(n, e).l
        return (
          o.add(t),
          () => {
            o.delete(t), it(n, e)
          }
        )
      },
      et = (e, t) => {
        for (const [n, r] of e) k(n) && (z(t, n, r), v(t, n))
        y(t)
      }
    return ({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
      'production') !== 'production'
      ? {
          [$]: Q,
          [q]: L,
          [B]: Z,
          [H]: tt,
          [ot]: et,
          [St]: (e) => (
            l.add(e),
            () => {
              l.delete(e)
            }
          ),
          [ht]: () => w.values(),
          [At]: (e) => d.get(e),
          [mt]: (e) => f.get(e),
        }
      : { [$]: Q, [q]: L, [B]: Z, [H]: tt, [ot]: et }
  },
  Mt = (i, d) => ({ s: d ? d(i).SECRET_INTERNAL_store : wt(i) }),
  N = new Map(),
  rt = (i) => (N.has(i) || N.set(i, D.exports.createContext(Mt())), N.get(i))
function _t(i, d) {
  return lt(i, d)
}
function Ot(i, d) {
  const f = rt(d),
    a = D.exports.useContext(f),
    { s: l, v: w } = a,
    h = (E) => {
      const S = l[$](i, E)
      if (
        ({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
          'production') !== 'production' &&
        !S.y
      )
        throw new Error('should not be invalidated')
      if ('e' in S) throw S.e
      if ('p' in S) throw S.p
      if ('v' in S) return S.v
      throw new Error('no atom value')
    },
    [[M, R, x], O] = D.exports.useReducer(
      (E, S) => {
        const b = h(S)
        return Object.is(E[1], b) && E[2] === i ? E : [S, b, i]
      },
      w,
      (E) => {
        const S = h(E)
        return [E, S, i]
      },
    )
  let p = R
  return (
    x !== i && (O(M), (p = h(M))),
    D.exports.useEffect(() => {
      const { v: E } = a
      E && l[B](i, E)
      const S = l[H](i, O, E)
      return O(E), S
    }, [l, i, a]),
    D.exports.useEffect(() => {
      l[B](i, M)
    }),
    D.exports.useDebugValue(p),
    p
  )
}
function Dt(i, d) {
  const f = rt(d),
    { s: a, w: l } = D.exports.useContext(f)
  return D.exports.useCallback(
    (h) => {
      if (
        ({ BASE_URL: '/zustand-benchmark/', MODE: 'production', DEV: !1, PROD: !0 } &&
          'production') !== 'production' &&
        !('write' in i)
      )
        throw new Error('not writable atom')
      const M = (R) => a[q](i, h, R)
      return l ? l(M) : M()
    },
    [a, l, i],
  )
}
function Rt(i, d) {
  return (
    'scope' in i &&
      (console.warn('atom.scope is deprecated. Please do useAtom(atom, scope) instead.'),
      (d = i.scope)),
    [Ot(i, d), Dt(i, d)]
  )
}
export { _t as a, Rt as u }
