import test from 'ava'

import Vue from 'vue/dist/vue.common'
import VueTouch, { registerCustomEvent } from './helpers/vue-touch'

registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
Vue.use(VueTouch)

import {
  createFromTemplate,
  hasRecognizer
} from './helpers'

let vt

test('custom Event `doubletap` gets triggered', t => {

  vt = createFromTemplate(`
    <v-touch
      v-on:doubletap="cb"
    />
    `)

  t.true(vt.recognizers.doubletap !== undefined)
})

test('Custom Event local options work', t => {
  vt = createFromTemplate(`
    <v-touch
      v-on:doubletap="cb"
      v-bind:doubletap="{taps: 3}"
    />
    `)

    const taps = vt.recognizers.doubletap.options.taps
    t.is(taps, 3)
})
