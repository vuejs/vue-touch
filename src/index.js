import Hammer from 'hammerjs'

import {
  createProp,
  capitalize,
  guardDirections,
  gestures,
  gestureMap,
  directions,
  assign
} from './utils'

const customEvents = {}
let installed = false

const vueTouch = { config: {}, customEvents }

vueTouch.component = {
  props: {
    tapOptions: createProp(),
    panOptions: createProp(),
    pinchOptions: createProp(),
    pressOptions: createProp(),
    rotateOptions: createProp(),
    swipeOptions: createProp(),
    tag: createProp()
  },

  mounted() {
    this.hammer = new Hammer.Manager(this.$el)
    this.recognizers = {} // not reactive
    this.setupBuiltinRecognizers()
    this.setupCustomRecognizers()
  },
  destroyed() {
    this.hammer.destroy()
  },

  methods: {

    setupBuiltinRecognizers()  {
      // Built-in Hammer events
      // We check weither any event callbacks are registered
      // for the gesture, and if so, add a Recognizer
      for (let i = 0; i < gestures.length; i++) {
        const gesture = gestures[i]
        if (this._events[gesture]) {
          // get the main gesture (e.g. 'panstart' -> 'pan')
          const mainGesture = gestureMap[gesture]
          //merge global and local options
          const options = assign({}, vueTouch.config[mainGesture], this[`${mainGesture}Options`])
          // add recognizer for this main gesture
          this.addRecognizer(mainGesture, options)
          // register Event Emit for the specific gesture
          this.addEvent(gesture)
        }
      }
    },

    setupCustomRecognizers() {
      // Custom events
      // We get the customGestures and options from the
      // customEvents object, then basically do the same check
      // as we did for the built-in events.
      const gestures = Object.keys(customEvents)

      for (let i = 0; i < gestures.length; i++) {

        const gesture = gestures[i]

        if (this._events[gesture]) {
          const opts = customEvents[gesture]
          const localCustomOpts = this[`${gesture}Options`] || {}
          const options = assign({}, opts, localCustomOpts)
          this.addRecognizer(gesture, options, {mainGesture: options.type})
          this.addEvent(gesture)
        }
      }
    },

    addRecognizer(gesture, options, { mainGesture } = {}) {
      // create recognizer, e.g. new Hammer['Swipe'](options)
      if (!this.recognizers[gesture]) {
        const recognizer = new Hammer[capitalize(mainGesture || gesture)](guardDirections(options))
        this.recognizers[gesture] = recognizer
        this.hammer.add(recognizer)
        recognizer.recognizeWith(this.hammer.recognizers)
      }
    },

    addEvent(gesture) {
      this.hammer.on(gesture, (e) => this.$emit(gesture, e))
    },

    // Enabling / Disabling certain recognizers.
    //
    enable(r) { this.recognizers[r].set({ enable: true }) },
    disable(r) { this.recognizers[r].set({ enable: false }) },
    enableAll(r) { this.toggleAll({ enable: true }) },
    disableAll(r) { this.toggleAll({ enable: false }) },
    toggleAll({ enable }) {
      const keys = Object.keys(this.recognizers)
      for (let i = 0; i < keys.length; i++) {
        const r = this.recognizers[keys[i]]
        r.set({ enable: enable })
      }
    },
    isEnabled(r) {
      return this.recognizers[r] && this.recognizers[r].options.enable
    }
  },

  render(h) {
    return h(this.tag, {}, this.$slots.default)
  }
}

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


// Register
if  (typeof exports !== "object" &&  // no commmonJS
    (typeof define !== "function" && !define.amd) && // no AMD
    window.Vue) {
  window.VueTouch = vueTouch
  Vue.use(vueTouch)
}
