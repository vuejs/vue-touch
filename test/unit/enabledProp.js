import test from 'ava'

import Vue from 'vue/dist/vue.common'
import VueTouch from './helpers/vue-touch'
import Hammer from 'hammerjs'

Vue.use(VueTouch)

import {
  createFromTemplate,
  isEnabled, isDisabled,
  allEnabled, allDisabled
} from './helpers'

let vt

test.skip('before', t => {

  vt = createFromTemplate(`
    <v-touch
    @tap="cb"
    @swipe="cb"
    />
  `)
})

test('prop is true by default & events are enabled', t => {
  t.plan(2)

  vt = createFromTemplate(`
    <v-touch
    @tap="cb"
    @swipe="cb"
    />
  `)
  const propEnabled = vt.enabled
  t.true(propEnabled)

  const rcEnabled = isEnabled(vm, 'tap')
  t.true(rcEnabled)
})

test.todo('all rcg disabled when enabled="false"')

test.todo('Passing obj to enabled prop correctly toggles recognizers')
