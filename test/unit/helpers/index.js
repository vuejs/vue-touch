import Vue from 'vue/dist/vue.common.js'

export function noop() { return }

/**
 * Create and return a Vue instance
 * @param  {String} template    String template to extend the base one with
 * @param  {Fucntion} [cb=noop] Callback function to register
 * @return {Object}                Vue Instance
 */
export function createInstanceFromTemplate (template, spy = noop) {
  const el = document.createElement('div')
  const i = new Vue({
    el,
    template: `<div id="app">${template}</div>`,
    methods: {
      cb(e) {
        spy(e)
      }
    }
  }).$mount()
  return i
}

/**
 * returns the v-touch instance from the Vue instance
 * that was created with createInstanceFromTemplate
 * @param  {String}   template String template to extend the base one with
 * @param  {Function} [cb=noop]      Callbakc function to register
 * @return {Object}            [description]
 */
export function createFromTemplate(template, cb = noop) {
  return createInstanceFromTemplate(template, cb).$children[0]
}

/**
 * returns true if the v.touch instance has a recognizer for
 * the given gesture
 * @param  {Object}  vt      The v-touch instance
 * @param  {String}  gesture The gesture/Event name
 * @return {Boolean}
 */
export function hasRecognizer(vt, gesture) {
  const rcg = vt.recognizers
  return Object.keys(rcg).some(key => (
    key === gesture &&
      rcg[key].constructor.name === `${capitalize(gesture)}Recognizer`
  ))
}

/**
 * Returns true if the Manager has a handler wit
 * at least one callback function for the given gesture
 * @param  {Object}  vm      v-touch instance
 * @param  {String}  gesture The gesture/Event name
 * @return {Boolean}
 */
export function hasHandler(vt, gesture) {
  const handlers = vt.hammer.handlers
  const keys = Object.keys(handlers)
  return keys.some(h => h === gesture && handlers[h].length > 0)
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * returns true if the given gesture is enabled on
 * the vue-touch instance
 * @param  {Object}  vm      The vue-touch instance
 * @param  {String}  gesture The Event/Gesture name
 * @return {Boolean}
 */
export function isEnabled(vm, gesture) {
  const rcg = vm.recognizers
  const keys = Object.keys(rcg)
  return keys.some(key =>  key === gesture && rcg[key].options.enable)
}

/**
 * Opposite of isEnabled.
 * @param  {Object}  args   vt, gesture
 * @return {Boolean}
 */
export function isDisabled(...args) {
  return !isEnabled(...args)
}

/**
 * Returns true if all recognizers are enabled
 *
 * @param  {Object} vm  vue-touch instance
 * @return {Boolean}
 */
export function allEnabled(vt) {
  const rcg = vt.recognizers
  const keys = Object.keys(rcg)
  return keys.every(key => rcg[key].options.enable)
}

/**
 * Returns true if all recognizers are Disabled
 * @param  {Object} vm vue.touch instance
 * @return {Boolean}
 */
export function allDisabled(vm) {
  const rcg = vm.recognizers
  const keys = Object.keys(rcg)
  return keys.every(key => !rcg[key].options.enable)
}
