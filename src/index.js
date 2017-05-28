import Component from './component'
import { customEvents, register } from './events'

function plugin(Vue, options = {}) {
  if (plugin.installed === true) return
  plugin.installed = true
  Component.config = plugin.config
  Vue.component(options.name || 'v-touch', Component)
}

plugin.config = {}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
export {
  Component,
  customEvents,
}
export const registerCustomEvent = (event, options) => {
  if (plugin.installed) {
    console.warn(`
      [vue-touch]: Custom Event '${event}' couldn't be added to vue-touch.
      Custom Events have to be registered before installing the plugin.
      `)
    return
  }

  register(event, options)
}
