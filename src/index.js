var Hammer = typeof require === 'function'
  ? require('hammerjs')
  : window.Hammer

const gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
const directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']
const customEvents = {}

const vueTouch = {}

vueTouch.install = function(Vue, opts = {}) {

  var name = opts.name || 'v-touch'

  Vue.component(name, {

    props: {
     tapOptions: {
       type: Object,
       default: () => ({}),
     },
     panOptions: {
       type: Object,
       default: () => ({}),
     },
     pinchOptions: {
       type: Object,
       default: () => ({}),
     },
     pressOptions: {
       type: Object,
       default: () => ({}),
     },
     rotateOptions: {
       type: Object,
       default: () => ({}),
     },
     swipeOptions: {
       type: Object,
       default: () => ({}),
     },
     customOptions: {
       type: Object,
       default: () => ({}),
     },

     tag: {
       type: String,
       default: 'a'
     }
    },

    mounted() {
     this.hammer = new Hammer.Manager(this.$el)
     this.setupListeners()
    },
    destroyed() {
     this.hammer.destroy()
    },

    methods: {

      setupListeners() {
        // Built-in events
        // We check weither any event callback are registered
        // for the default gesture, and if so, add a Recognizer
        for (let i = 0; i < gestures.length; i++) {
        const gesture = gestures[i]
        if (this._events[gesture]) {
          const options = this[`${gesture}Options`]
          this.addRecognizer(gesture, options)
        }
        }

        // Custom events
        // We get the customGestures and options from the
        // customEvents object, then basically do the same check
        // as we did for the built-in events.
        const customs = customEvents
        const customGestures = Object.keys(customs)

        for (let i = 0; i < customGestures.length; i++) {

          const customGesture = customGestures[i]
          const options = customs[customGesture]

          if (this._events[customGesture]) {
            this.addRecognizer(customGesture, options, {custom: true})
          }
        }
      },

      addRecognizer(gesture, opts, { custom = false } = {}) {
        const mc = this.hammer
        const localCustomOpts = this.customOptions[gesture] || {}
        const options = guardDirections(Object.assign({}, opts, localCustomOpts))

        // if opts has a type property, it's a custom gesture,
        // and we have to use this type as the gesture to listen for
        const baseGesture = custom ? opts.type : gesture
        // create recognizer, e.g. new Hammer['Pan'](options)
        const recognizer = new Hammer[capitalize(baseGesture)](options)
        recognizer.recognizeWith(mc.recognizers)

        mc.add(recognizer)
        mc.on(gesture, (e) => { this.$emit(gesture, e)})
      }
    },

    render(h) {
      return h(this.tag, {}, this.$slots.default)
    }
  })

}

vueTouch.registerCustomEvent = function registerCustomEvent(event, options = {}) {
  options.event = event
  customEvents[event] = options
}

vueTouch.setDefaults = function setDefaults(newDefaults = {}) {
  const keys = Object.keys(newDefaults)
  for(let i = 0; i < keys.length; i++) {
    Hammer.defaults[keys[i]] = newDefaults[keys[i]]
  }
}

// Utilities
function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function guardDirections (options) {
  var dir = options.direction
  if (typeof dir === 'string') {
    var hammerDirection = 'DIRECTION_' + dir.toUpperCase()
    if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
      options.direction = Hammer[hammerDirection]
    } else {
      console.warn('[vue-touch] invalid direction: ' + dir)
    }
  }
  return options
}

if (typeof exports == "object") {
  module.exports = vueTouch
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return vueTouch })
} else if (window.Vue) {
  window.VueTouch = vueTouch
  Vue.use(vueTouch)
}
