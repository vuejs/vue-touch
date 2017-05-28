import test from 'ava'

import Vue from 'vue/dist/vue.common'
import VueTouch from './helpers/vue-touch'

Vue.use(VueTouch)

import {
  createFromTemplate,
  isEnabled, isDisabled,
  allEnabled, allDisabled
} from './helpers'

test('prop is true by default & events are enabled', t => {
  t.plan(2)

  const vt = createFromTemplate(`
    <v-touch
    @tap="cb"
    @swipe="cb"
    />
  `)
  const propEnabled = vt.enabled
  t.true(propEnabled)

  const rcEnabled = isEnabled(vt, 'tap')
  t.true(rcEnabled)
})

test('all rcg disabled when enabled="false"', t => {
  t.plan(2)

  const vt = createFromTemplate(`
    <v-touch
    v-bind:enabled="false"
    v-on:tap="cb"
    v-on:swipe="cb"
    />
  `)

  t.false(vt.enabled)
  const areAllDisabled = allDisabled(vt)
  t.true(areAllDisabled)
})

test.cb('Passing obj to enabled prop correctly toggles recognizers', t => {
  t.plan(2)

  const vt = createFromTemplate(`
    <v-touch
    v-bind:enabled="{ tap: true, swipe: false }"
    v-on:tap="cb"
    v-on:swipe="cb"
    />
  `)

  vt.$nextTick()
    .then(() => {
      const tapEnabled = isEnabled(vt, 'tap')
      const swipeDisabled =  isDisabled(vt, 'swipe')
      t.true(tapEnabled && swipeDisabled)
    })

    .then(() => {
      vt.updateEnabled({ tap: false, swipe: true })

      return vt.$nextTick()
    })

    .then(() => {
      const tapDisabled = isDisabled(vt, 'tap')
      const swipeEnabled= isEnabled(vt, 'swipe')
      t.true(tapDisabled && swipeEnabled)
      t.end()
    })
})
