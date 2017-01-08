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

test.beforeEach(t => {

  vt = createFromTemplate(`
    <v-touch
    @tap="cb"
    @swipe="cb"
    />
  `)
})

test('enable/disable', t => {
  t.plan(4)
  t.true(isEnabled(vt, 'tap'))
  t.true(isEnabled(vt, 'swipe'))

  vt.disable('swipe')
  t.true(isDisabled(vt, 'swipe'))
  t.true(isEnabled(vt, 'tap'))
})

test.('toggle', t => {
  test.plan(2)

  vm.toggle('tap')
  let disabled = isDisabled(vm, 'tap')

  t.true(disabled)

  vm.toggle('tap')
  let enabled = isEnabled(vm, 'tap')

  t.true(enabled)
})

test('enableAll / disableAll', t => {
  t.plan(3)

  t.true(allEnabled(vt))

  vt.disableAll()

  t.true(allDisabled(vt))

  vt.enableAll()

  t.true(allEnabled(vt))
})

test('isEnabled()', t => {
  t.plan(2)

  t.true(vt.isEnabled('tap'))

  vt.disable('tap')

  t.false(vt.isEnabled('tap'))
})
