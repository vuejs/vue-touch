;(function () {

  var vueTouch = {}
  var Hammer = typeof require === 'function'
    ? require('hammerjs')
    : window.Hammer
  var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
  var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']
  var customEvents = {}

  if (!Hammer) {
    throw new Error('[vue-touch] cannot locate Hammer.js.')
  }

  // exposed global options
  vueTouch.config = {}

  vueTouch.install = function (Vue) {

    Vue.directive('touch', {


      bind: function () {
        if (!this.el.hammer) {
          this.el.hammer = new Hammer.Manager(this.el)
        }
        var mc = this.mc = this.el.hammer
        // determine event type
        var event = this.arg
        if (!event) {
          console.warn('[vue-touch] event type argument is required.')
        }
        var recognizerType, recognizer

        if (customEvents[event]) {
          // custom event
          var custom = customEvents[event]
          recognizerType = custom.type
          recognizer = new Hammer[capitalize(recognizerType)](custom)
          recognizer.recognizeWith(mc.recognizers)
          mc.add(recognizer)
        } else {
          // built-in event
          for (var i = 0; i < gestures.length; i++) {
            if (event.indexOf(gestures[i]) === 0) {
              recognizerType = gestures[i]
              break
            }
          }
          if (!recognizerType) {
            console.warn('[vue-touch] invalid event type: ' + event)
            return
          }
          recognizer = mc.get(recognizerType)
          if (!recognizer) {
            // add recognizer
            recognizer = new Hammer[capitalize(recognizerType)]()
            // make sure multiple recognizers work together...
            recognizer.recognizeWith(mc.recognizers)
            mc.add(recognizer)
          }
          // apply global options
          var globalOptions = vueTouch.config[recognizerType]
          if (globalOptions) {
            guardDirections(globalOptions)
            recognizer.set(globalOptions)
          }
          // apply local options

      update: function (fn) {
        var mc = this.mc
        var event = this.arg
        // teardown old handler
        if (this.handler) {
          mc.off(event, this.handler)
        }
        if (typeof fn !== 'function') {
          this.handler = null
          console.warn(
            '[vue-touch] invalid handler function for v-touch: ' +
            this.arg + '="' + this.descriptor.raw
          )
        } else {
          mc.on(event, (this.handler = fn))
          // var localOptions =
          //   this.el.mcOptions &&
          //   this.el.mcOptions[recognizerType]
          // if (localOptions) {
          //   guardDirections(localOptions)
          //   recognizer.set(localOptions)
          // }
        }
      },

      unbind: function () {
        if (this.handler) {
          this.mc.off(this.arg, this.handler)
        }
        if (!Object.keys(this.mc.handlers).length) {
          this.mc.destroy()
          this.el.hammer = null
        }
      }
    })

  }

  /**
   * Register a custom event.
   *
   * @param {String} event
   * @param {Object} options - a Hammer.js recognizer option object.
   *                           required fields:
   *                           - type: the base recognizer to use for this event
   */

  vueTouch.registerCustomEvent = function (event, options) {
    options.event = event
    customEvents[event] = options
  }

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
  }

  if (typeof exports == "object") {
    module.exports = vueTouch
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueTouch })
  } else if (window.Vue) {
    window.VueTouch = vueTouch
    Vue.use(vueTouch)
  }

})()
