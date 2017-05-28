import devVueTouch, { registerCustomEvent as devRegisterCustomEvent } from '../../../src/index'
import VueTouch, { registerCustomEvent as prodRegisterCustomEvent } from '../../../dist/vue-touch'

function checkDev(a, b) {
  return process.env.NODE_ENV === 'development' ? a : b
}

export default checkDev(devVueTouch, VueTouch)
export const registerCustomEvent = checkDev(devRegisterCustomEvent, prodRegisterCustomEvent)
