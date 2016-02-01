var Vue = require('vue')
var VueTouch = require('../')

// use the plugin
Vue.use(VueTouch)

// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

new Vue({
  el: 'div',
  data: {
    event: ''
  },
  methods: {
    test: function (e) {
      this.event = e.type
    }
  }
})
