import Hammer from 'hammerjs'

import Component from './component'
import { assign, config, customEvents } from './utils'

let installed = false

const vueTouch = { config, customEvents }

vueTouch.component = Component

// Plugin API
// *********
vueTouch.install = function install(Vue, opts = {}) {

  if (!opts.hammer && !window.Hammer) {
    console.warn(`
      [vue-touch] Hammer constructor not found. Either make it available globally,
      or pass it as an option to the plugin: Vue.use(VueTouch, {hammer: Hammer})
      notice the lowercase property key!
    `)
    return
  }
  const name = opts.name || 'v-touch'
  Hammer = opts.hammer || window.Hammer
  Vue.component(name, assign(this.component, { name }))
  installed = true

}

vueTouch.registerCustomEvent = function registerCustomEvent(event, options = {}) {
  if (installed) {
    console.warn(`
      [vue-touch]: Custom Event '${event}' couldn't be added to vue-touch.
      Custom Events have to be registered before installing the plugin.
      `)
    return
  }
  options.event = event
  customEvents[event] = options
  this.component.props[`${event}Options`] = {
    type: Object,
    default() { return {} }
  }
}.bind(vueTouch)

// Utilities
// ********


if (typeof exports == "object") {
  module.exports = vueTouch
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return vueTouch })
} else if (window.Vue) {
  window.VueTouch = vueTouch
  Vue.use(vueTouch)
}
