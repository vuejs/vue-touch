import Hammer from 'hammerjs'

/**
 * Small helper method to generate prop options for all the
 * *-options props.
 * @return {[type]} [description]
 */
export function createProp() {
  return {
    type: Object,
    default: function () {
      return {}
    }
  }
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Directions that VueTouch understands.
 * Will be translated to Hammer-style directions by guardDirections()
 * @type {Array}
 */
export const directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']

/**
 * Translates VueTouch direction names into Hammer Direction numbers.
 * @param  {Object} options Hammer Options
 * @return {Object}         [Hammer Options]
 */
export function guardDirections(options) {
  const dir = options.direction
  if (typeof dir === 'string') {
    const hammerDirection = 'DIRECTION_' + dir.toUpperCase()
    if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
      options.direction = Hammer[hammerDirection]
    } else {
      console.warn('[vue-touch] invalid direction: ' + dir)
    }
  }
  return options
}

/**
 * This object will contain global options for recognizers
 * see index.js -> vueTouch.config
 * @type {Object}
 */
export const config = {}

/**
 * Names of all the builtin gestures of Hammer
 *
 * @type {Array}
 */
export const gestures = [
  'pan', 'panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown',
  'pinch', 'pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout',
  'press', 'pressup',
  'rotate', 'rotatestart', 'rotatemove', 'rotateend', 'rotatecancel',
  'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
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

export const normalizeGesture = name => gestureMap[name]

export const objectHasArrayValues = value => typeof value === 'object' && Object.values(value).every(any => Array.isArray(any))