import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1d34d4e4 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _21d3e33f = () => interopDefault(import('../pages/checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _62e8a99f = () => interopDefault(import('../pages/portfolio.vue' /* webpackChunkName: "pages/portfolio" */))
const _9efa34c0 = () => interopDefault(import('../pages/pricing/index.vue' /* webpackChunkName: "pages/pricing/index" */))
const _34a4cd56 = () => interopDefault(import('../pages/team.vue' /* webpackChunkName: "pages/team" */))
const _7b3daf4e = () => interopDefault(import('../pages/web-development.vue' /* webpackChunkName: "pages/web-development" */))
const _b9b1f30e = () => interopDefault(import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */))
const _21c7f717 = () => interopDefault(import('../pages/pricing/free-trial.vue' /* webpackChunkName: "pages/pricing/free-trial" */))
const _392cc97a = () => interopDefault(import('../pages/subscription/cancel.vue' /* webpackChunkName: "pages/subscription/cancel" */))
const _c302cfec = () => interopDefault(import('../pages/subscription/success.vue' /* webpackChunkName: "pages/subscription/success" */))
const _3cecafa9 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _1d34d4e4,
    name: "about"
  }, {
    path: "/checkout",
    component: _21d3e33f,
    name: "checkout"
  }, {
    path: "/portfolio",
    component: _62e8a99f,
    name: "portfolio"
  }, {
    path: "/pricing",
    component: _9efa34c0,
    name: "pricing"
  }, {
    path: "/team",
    component: _34a4cd56,
    name: "team"
  }, {
    path: "/web-development",
    component: _7b3daf4e,
    name: "web-development"
  }, {
    path: "/welcome",
    component: _b9b1f30e,
    name: "welcome"
  }, {
    path: "/pricing/free-trial",
    component: _21c7f717,
    name: "pricing-free-trial"
  }, {
    path: "/subscription/cancel",
    component: _392cc97a,
    name: "subscription-cancel"
  }, {
    path: "/subscription/success",
    component: _c302cfec,
    name: "subscription-success"
  }, {
    path: "/",
    component: _3cecafa9,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
