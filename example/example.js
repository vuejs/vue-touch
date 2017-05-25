var Vue = require('vue')

var VueTouch

if (process.env.NODE_ENV === 'development') {
  VueTouch = require('../src').default
}
else {
  VueTouch = require('../dist/vue-touch.js')
}

import './styling.css'
import './components'

// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

Vue.use(VueTouch)

new Vue({
  el: '#app',
  data: {
    event: {},
    state: {rotate: true, doubletap: true}
  },
  methods: {
    test: function (e, name = '') {
      delete e.target
      this.event = e
      console.log(e, name)
    },
    testdouble: function (e) {
      console.log('doubletap')
      this.test(e)
    }
  }
})
