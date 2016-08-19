var Vue = require('vue/dist/vue')
var VueTouch = require('../vue-touch.js')

// use the plugin
Vue.use(VueTouch)

// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

var App = {
  template: '#test',
  data: function () {
    return {
      event: ''
    }
  },
  methods: {
    test: function (e) {
      this.event = e.type
    }
  }
}

new Vue({
  components: { app: App },
  render(h) {
    return h(App)
  }
}).$mount('#app')
