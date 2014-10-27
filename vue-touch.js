;(function () {

  var vueTouch = {}
  var Hammer = typeof require === 'function'
    ? require('hammerjs')
    : window.Hammer
  var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
  var customeEvents = {}

  vueTouch.install = function (Vue) {

    Vue.directive('touch', {

      isFn: true,
      acceptStatement: true,

      bind: function () {
        if (!this.el.hammer) {
          this.el.hammer = new Hammer.Manager(this.el)
        }
        var mc = this.mc = this.el.hammer
        // determine event type
        var event = this.arg
        var recognizerType, recognizer

        if (customeEvents[event]) { // custom event

          var custom = customeEvents[event]
          recognizerType = custom.type
          recognizer = new Hammer[capitalize(recognizerType)](custom)
          recognizer.recognizeWith(mc.recognizers)
          mc.add(recognizer)

        } else { // built-in event

          for (var i = 0; i < gestures.length; i++) {
            if (event.indexOf(gestures[i]) === 0) {
              recognizerType = gestures[i]
              break
            }
          }
          if (!recognizerType) {
            console.warn('Invalid v-touch event: ' + event)
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

        }
      },

      update: function (fn) {
        var mc = this.mc
        var vm = this.vm
        var event = this.arg
        // teardown old handler
        if (this.handler) {
          mc.off(event, this.handler)
        }
        // define new handler
        this.handler = function (e) {
          e.targetVM = vm
          fn.call(vm, e)
        }
        mc.on(event, this.handler)
      },

      unbind: function () {
        this.mc.off(this.arg, this.handler)
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
    customeEvents[event] = options
  }

  function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
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