import Hammer from 'hammerjs' // used by guardDirections

/**
 * Tiny Object.assign replacement
 * @param  {Object} target  Any type of object
 * @param  {Object} sources Any type of object
 * @return {Object}         Merged Object
 */
export function assign(target, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i]
    const keys = Object.keys(source)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      target[key] = source[key]
    }
  }
  return target
}

/**
 * Small helper method to generate prop options for all the
 * *-options props.
 * @return {[type]} [description]
 */
export function createProp() {
  return {
    type: Object,
    default: function() { return {} }
  }
}

export function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Directions that VueTouch understands.
 * Will be tanslated to Hammer-style directions by guardDirections()
 * @type {Array}
 */
export const directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']

/**
 * Translates VueTouch direction names into Hammer Direction numbers.
 * @param  {Objects} options Hammer Options
 * @return {Object}         [Hammer Options]
 */
export function guardDirections (options) {
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

/**
 * This pobject will contain global options for recognizers
 * see index.js -> vueTouch.config
 * @type {Object}
 */
export const config = {

}

/**
 * This object will contain recognizer options for custom events.
 * see index.js -> registerCustomEvent
 * @type {Object}
 */
export const customEvents = {

}

/**
 * Names of all the builtin gestures of Hammer
 * @type {Array}
 */
export const gestures = [
  'pan','panstart','panmove','panend','pancancel','panleft','panright','panup','pandown',
  'pinch','pinchstart','pinchmove','pinchend','pinchcancel','pinchin','pinchout',
  'press','pressup',
  'rotate','rotatestart','rotatemove','rotateend','rotatecancel',
  'swipe','swipeleft','swiperight','swipeup','swipedown',
  'tap'
]

/**
 * Maps the gestures to their "main gesture" (the name of the recognizer)
 * @type {Object}
 */
export const gestureMap = {
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
}
