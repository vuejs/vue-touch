var Vue = require('vue')
var VueTouch = require('../src')
// import './styling.css'
// import './components'
// use the plugin

// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

Vue.use(VueTouch)

new Vue({
  el: 'div',
  data: {
    event: {}
  },
  methods: {
    test: function (e) {
      delete e.target
      this.event = e
      console.log(e)
    }
  }
})
