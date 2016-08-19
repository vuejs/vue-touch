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

      bind: function (el, binding) {

        // setup cache object for manager instance and
        // instances and handler functions
        if (!el.__vueTouch__) {
          el.__vueTouch__ = {
            mc: new Hammer.Manager(el),
            eventHandlers: {}
          }
        }
        var cache = el.__vueTouch__
        var mc = cache.mc

        // determine event type
        var event = binding.arg
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
        }
        update(el, binding)
      },

      update: update,

      unbind: function (el, binding) {

        var cache = el.__vueTouch__
        var mc = cache.mc
        var handlers = cache.eventHandlers

        //tear down old handler
        var event = binding.arg
        var oldHandler = handlers[event]
        if (oldHandler) {
          mc.off(binding.arg, oldHandler)
          handlers[event] = null
        }

        // if no more handlers left, destroy the hammer manager instance
        var allHandlersGone = Object.keys(mc.handlers).every(function (key) {
          return mc.handlers[key].length === 0
        })
        if (allHandlersGone) {
          mc.destroy()
          // cache.mc = null // do i need to do that?
          el.__vueTouch__ = null
        }
      }
    })
  }

  function update (el, binding) {

    var fn = binding.value
    var cache = el.__vueTouch__
    var mc = cache.mc
    var handlers = cache.eventHandlers
    var event = binding.arg

    // teardown old handler if there's a new one
    var oldHandler = handlers[event]
    if (oldHandler && oldHandler !== fn) {
      mc.off(event, oldHandler)
      handlers[event] = null
    }
    // if there's a new handler, add it
    if (oldHandler !== fn) {
      if (typeof fn === 'function') {
        mc.on(event, (handlers[event] = fn))
      } else {
        handlers[event] = null
        console.warn(
          '[vue-touch] invalid handler function for v-touch: ' +
          this.arg + '="' + fn
        )
      }
    }
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
