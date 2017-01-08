import Hammer from 'hammerjs'

import {
  createProp,
  capitalize,
  guardDirections,
  gestures,
  gestureMap,
  directions,
  assign,
  config,
  customEvents
} from './utils'

export default {
  props: {
    tapOptions: createProp(),
    panOptions: createProp(),
    pinchOptions: createProp(),
    pressOptions: createProp(),
    rotateOptions: createProp(),
    swipeOptions: createProp(),
    tag: { type: String, default: 'div' },
    enabled: {
      default: true,
      type: [Boolean, Object],

    }
  },

  mounted() {
    if (!this.$isServer) {
      this.hammer = new Hammer.Manager(this.$el)
      this.recognizers = {} // not reactive
      this.setupBuiltinRecognizers()
      this.setupCustomRecognizers()
    }
  },
  destroyed() {
    if (!this.$isServer) {
      this.hammer.destroy()
    }
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
          const options = assign({}, (config[mainGesture] || {}), this[`${mainGesture}Options`])
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

    /**
     * Registers a new Recognizer with the manager and saves it on the component
     * instance
     * @param {String} gesture     See utils.js -> gestures
     * @param {Object} options     Hammer options
     * @param {String} mainGesture if gesture is a custom event name, mapping to utils.js -> gestures
     */
    addRecognizer: function addRecognizer(gesture, options, { mainGesture } = {}) {
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
    updateEnabled(newVal, oldVal) {
      if (newVal === true) {
        this.enableAll()
      } else if (newVal === false) {
        this.disableAll()
      } else if (typeof newVal === 'object') {
        const keys = Object.keys(newVal)
        for (let i = 0; i < keys.length; i++) {
          const event = keys[i]
          if (this.recognizers[event]) {
            newVal[event]
              ? this.enable(event)
              : this.disable(event)
          }
        }
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
