import Component from './component'
import { assign, config, customEvents } from './utils'

let installed = false

const vueTouch = { config, customEvents }

// Plugin API
// *********
vueTouch.install = function install(Vue, opts = {}) {
  const name = opts.name || 'v-touch'
  Vue.component(name, assign(Component, { name }))
  installed = true
}.bind(vueTouch)

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
  Component.props[`${event}Options`] = {
    type: Object,
    default() { return {} }
  }
}.bind(vueTouch)

vueTouch.component = Component

// Utilities
// ********

if (typeof exports == "object") {
  exports = vueTouch
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return vueTouch })
} else if (typeof window !== 'undefined' && window.Vue) {
  window.VueTouch = vueTouch
  Vue.use(vueTouch)
}
