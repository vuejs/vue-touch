if (process.env.NODE_ENV === 'development') {
  var vueTouch = require('../../src/index.js')
} else {
  var vueTouch = require('../../dist/vue-touch.js')
}

export default vueTouch
