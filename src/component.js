import Hammer  from 'hammerjs'

import {
  createProp,
  capitalize,
  guardDirections,
  normalizeGesture,
  objectHasArrayValues,
} from './utils'

import {
  customEvents
} from './events'

export default {
  props: {
    options: createProp(),
    tap: createProp(),
    pan: createProp(),
    pinch: createProp(),
    press: createProp(),
    rotate: createProp(),
    swipe: createProp(),
    tag: { type: String, default: 'div' },
    recognizeWith: {
      type: Object,
      default: () => ({}),
      validate: objectHasArrayValues,
    },
    requireFailure: {
      type: Object, default: () => ({}),
      validate: objectHasArrayValues,
    },
    enabled: {
      default: true,
      type: [Boolean, Object],
    }
  },

  mounted() {
    if (!this.$isServer) {
      this.hammer = new Hammer.Manager(this.$el, this.options)
      this.recognizers = {}
      this.setupRecognizers()
      this.setupRecognizerDependencies()
      this.updateEnabled(this.enabled)
    }
  },

  destroyed() {
    if (!this.$isServer) {
      this.hammer.destroy()
    }
  },

  watch: {
    enabled: {
      deep: true,
      handler(...args) {
        this.updateEnabled(...args)
      }
    }
  },

  methods: {

    /**
     * Register recognizers for any event that matches
     * a defined gesture or custom event.
     */
    setupRecognizers()  {
      for (let gesture of Object.keys(this._events)) {
        if (normalizeGesture(gesture)) {
          this.addEvent(gesture)

          gesture = normalizeGesture(gesture)
          const options = Object.assign({}, this.$options.config[gesture] || {}, this[gesture])
          this.addRecognizer(gesture, options)
        } else if (customEvents(gesture)) {
          this.addEvent(gesture)

          const options = Object.assign({}, customEvents(gesture), this[gesture])
          this.addRecognizer(gesture, options, { mainGesture: options.type })
        } else {
          throw new Error(`Unknown gesture: ${gesture}`)
        }
      }
    },

    setupRecognizerDependencies() {
      for (const [key, value] of Object.entries(this.recognizeWith)) {
        this.recognizers[key] && this.recognizers[key].recognizeWith(value.map(name => this.recognizers[name]))
      }

      for (const [key, value] of Object.entries(this.requireFailure)) {
        this.recognizers[key] && this.recognizers[key].requireFailure(value.map(name => this.recognizers[name]))
      }
    },

    /**
     * Registers a new Recognizer with the manager and saves it on the component instance
     *
     * @param {String} gesture     See utils.js -> gestures
     * @param {Object} options     Hammer options
     * @param {String} mainGesture if gesture is a custom event name, mapping to utils.js -> gestures
     */
    addRecognizer: function addRecognizer(gesture, options, { mainGesture } = {}) {
      // create recognizer, e.g. new Hammer['Swipe'](options)
      if (!this.recognizers[gesture]) {
        this.recognizers[gesture] = new Hammer[capitalize(mainGesture || gesture)](guardDirections(options))
        this.hammer.add(this.recognizers[gesture])
      }
    },

    addEvent(gesture) {
      this.hammer.on(gesture, e => this.$emit(gesture, e))
    },

    /**
     * Called when the `enabled` prop changes, and during mounted()
     * It enables/disables values according to the value of the `enabled` prop
     * @param  {Boolean|Object} newVal If an object: { recognizer: true|false }
     * @param  {Boolean|Object} oldVal The previous value
     * @return {undefined}
     */
    updateEnabled: function updateEnabled(newVal, oldVal) {
      if (newVal === true) {
        this.enableAll()
      } else if (newVal === false) {
        this.disableAll()
      } else if (typeof newVal === 'object') {
        for (const [event, status] of Object.entries(newVal)) {
          this.recognizers[event] && status ? this.enable(event) : this.disable(event)
        }
      }
    },

    enable(gesture) {
      const recognizer = this.recognizers[gesture]
      if (!recognizer.options.enable) {
        recognizer.set({ enable: true })
      }
    },

    disable(gesture) {
      const recognizer = this.recognizers[gesture]
      if (recognizer.options.enable) {
        recognizer.set({ enable: false })
      }
    },

    toggle(gesture) {
      const recognizer = this.recognizers[gesture]

      if (recognizer) {
        recognizer.options.enable ? this.disable(gesture) : this.enable(gesture)
      }
    },

    enableAll() {
      this.setAll({ enable: true })
    },

    disableAll() {
      this.setAll({ enable: false })
    },

    setAll({ enable }) {
      for (const recognizer of Object.values(this.recognizers)) {
        if (recognizer.options.enable !== enable) {
          recognizer.set({ enable })
        }
      }
    },

    isEnabled(gesture) {
      return this.recognizers[gesture] && this.recognizers[gesture].options.enable
    }
  },

  render(h) {
    return h(this.tag, {}, this.$slots.default)
  }
}
