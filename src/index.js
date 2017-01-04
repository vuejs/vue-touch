import Hammer from 'hammerjs'

import Component from './component'
import { assign, config, customEvents } from './utils'

let installed = false

const vueTouch = { config, customEvents }

vueTouch.component = Component

// Plugin API
// *********
vueTouch.install = function install(Vue, opts = {}) {
  const name = opts.name || 'v-touch'
  Vue.component(name, assign(this.component, { name }))
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
