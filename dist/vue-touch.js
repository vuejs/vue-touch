(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

var Hammer;

var gestures = [
  'pan','panstart','panmove','panend','pancancel','panleft','panright','panup','pandown',
  'pinch','pinchstart','pinchmove','pinchend','pinchcancel','pinchin','pinchout',
  'press','pressup',
  'rotate','rotatestart','rotatemove','rotateend','rotatecancel',
  'swipe','swipeleft','swiperight','swipeup','swipedown',
  'tap'
];
var gestureMap = {
  pan: 'pan',
  panstart: 'pan',
  panmove: 'pan',
  panend: 'pan',
  pancancel: 'pan',
  panleft: 'pan',
  panright: 'pan',
  panup: 'pan',
  pandown: 'pan',
  pinch: 'pinch',
  pinchstart: 'pinch',
  pinchmove: 'pinch',
  pinchend: 'pinch',
  pinchcancel: 'pinch',
  pinchin: 'pinch',
  pinchout: 'pinch',
  press: 'press',
  pressup: 'press',
  rotate: 'rotate',
  rotatestart: 'rotate',
  rotatemove: 'rotate',
  rotateend: 'rotate',
  rotatecancel: 'rotate',
  swipe: 'swipe',
  swipeleft: 'swipe',
  swiperight: 'swipe',
  swipeup: 'swipe',
  swipedown: 'swipe',
  tap: 'tap'
};
var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all'];
var customEvents = {};
var installed = false;

var vueTouch = { config: {}, customEvents: customEvents };

vueTouch.component = {
  props: {
    tapOptions: {
      type: Object,
      default: function default$1() { return {} }
    },
    panOptions: {
      type: Object,
      default: function default$2() { return {} }
    },
    pinchOptions: {
      type: Object,
      default: function default$3() { return {} }
    },
    pressOptions: {
      type: Object,
      default: function default$4() { return {} }
    },
    rotateOptions: {
      type: Object,
      default: function default$5() { return {} }
    },
    swipeOptions: {
      type: Object,
      default: function default$6() { return {} }
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  mounted: function mounted() {
    this.hammer = new Hammer.Manager(this.$el);
    this.recognizers = {};
    this.setupRecognizers();
  },
  destroyed: function destroyed() {
    this.hammer.destroy();
  },

  methods: {
    setupRecognizers: function setupRecognizers() {
      this.setupBuiltinRecognizers();
      this.setupCustomRecognizers();
    },

    setupBuiltinRecognizers: function setupBuiltinRecognizers()  {
      var this$1 = this;

      // Built-in events
      // We check weither any event callbacks are registered
      // for the gesture, and if so, add a Recognizer
      for (var i = 0; i < gestures.length; i++) {
        var gesture = gestures[i];
        if (this$1._events[gesture]) {
          // get the main gesture (e.g. 'panstart' -> 'pan')
          var mainGesture = gestureMap[gesture];
          //merge global and local options
          var options = Object.assign({}, vueTouch.config[mainGesture], this$1[(mainGesture + "Options")]);
          // add recognizer for this main gesture
          this$1.addRecognizer(mainGesture, options);
          // register Event Emit for the specific gesture
          this$1.addEvent(gesture);
        }
      }
    },

    setupCustomRecognizers: function setupCustomRecognizers() {
      var this$1 = this;

      // Custom events
      // We get the customGestures and options from the
      // customEvents object, then basically do the same check
      // as we did for the built-in events.
      var gestures = Object.keys(customEvents);

      for (var i = 0; i < gestures.length; i++) {

        var gesture = gestures[i];

        if (this$1._events[gesture]) {
          var mainGesture = gestureMap[gesture];
          var opts = customEvents[gesture];
          var localCustomOpts = this$1[(gesture + "Options")] || {};
          var options = Object.assign({}, opts, localCustomOpts);
          this$1.addRecognizer(gesture, options, {mainGesture: options.type});
          this$1.addEvent(gesture);
        }
      }
    },

    addRecognizer: function addRecognizer(gesture, options, ref) {
      if ( ref === void 0 ) ref = {};
      var mainGesture = ref.mainGesture;

      // create recognizer, e.g. new Hammer['Swipe'](options)
      if (!this.recognizers[gesture]) {
        var recognizer = new Hammer[capitalize(mainGesture || gesture)](guardDirections(options));
        this.recognizers[gesture] = recognizer;
        this.hammer.add(recognizer);
        recognizer.recognizeWith(this.hammer.recognizers);
      }
    },

    addEvent: function addEvent(gesture) {
      var this$1 = this;

      this.hammer.on(gesture, function (e) { return this$1.$emit(gesture, e); });
    },

    // Enabling / Disabling certain recognizers.
    //
    enable: function enable(r) { this.recognizers[r].set({ enable: true }); },
    disable: function disable(r) { this.recognizers[r].set({ enable: false }); },
    enableAll: function enableAll(r) { this.toggleAll({ enable: true }); },
    disableAll: function disableAll(r) { this.toggleAll({ enable: false }); },
    toggleAll: function toggleAll(ref) {
      var this$1 = this;
      var enable = ref.enable;

      var keys = Object.keys(this.recognizers);
      for (var i = 0; i < keys.length; i++) {
        var r = this$1.recognizers[keys[i]];
        r.set({ enable: enable });
      }
    }
  },

  render: function render(h) {
    return h(this.tag, {}, this.$slots.default)
  }
};

// Plugin API
// *********
vueTouch.install = function(Vue, opts) {
  if ( opts === void 0 ) opts = {};


  if (!opts.hammer && !window.Hammer) {
    console.warn("\n      [vue-touch] Hammer constructor not found. Either make it available globally,\n      or pass it as an option to the plugin: Vue.use(VueTouch, {hammer: Hammer})\n      notice the lowercase property key!\n    ");
    return
  }
  var name = opts.name || 'v-touch';
  Hammer = opts.hammer || window.Hammer;
  Vue.component(name, Object.assign(this.component, { name: name }));
  installed = true;

};

vueTouch.registerCustomEvent = function registerCustomEvent(event, options) {
  if ( options === void 0 ) options = {};

  if (installed) {
    console.warn(("\n      [vue-touch]: Custom Event '" + event + "' couldn't be added to vue-touch.\n      Custom Events have to be registered before installing the plugin.\n      "));
    return
  }
  options.event = event;
  customEvents[event] = options;
  vueTouch.component.props[(event + "Options")] = {
    type: Object,
    default: function default$1() { return {} }
  };
};

// Utilities
// ********

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function guardDirections (options) {
  var dir = options.direction;
  if (typeof dir === 'string') {
    var hammerDirection = 'DIRECTION_' + dir.toUpperCase();
    if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
      options.direction = Hammer[hammerDirection];
    } else {
      console.warn('[vue-touch] invalid direction: ' + dir);
    }
  }
  return options
}

if (typeof exports == "object") {
  module.exports = vueTouch;
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return vueTouch });
} else if (window.Vue) {
  window.VueTouch = vueTouch;
  Vue.use(vueTouch);
}

})));
