import test from 'ava'
import sinon from 'sinon'
import Vue from 'vue/dist/vue.common'
import VueTouch from './helpers/vue-touch'

Vue.use(VueTouch)

import {
  createFromTemplate,
  hasRecognizer, hasHandler,
} from './helpers'


test('Add tap recognizer for tap event', t => {
  const vt = createFromTemplate(`
    <v-touch @tap="cb">
    `)

  t.true(hasRecognizer(vt, 'tap'))
})

test('Add pan recognizer with pantstart handler for panstart event', t => {
  t.plan(2)
  const vt = createFromTemplate(`
    <v-touch @panstart="cb">
    `)

  t.true(hasRecognizer(vt, 'pan'))
  t.true(hasHandler(vt, 'panstart'))
})

test('Uses global options from VueTouch.config', t => {
  t.plan(2)
  VueTouch.config.swipe = {
    direction: 'horizontal',
    threshold: 20
  }

  const vt = createFromTemplate(`
    <v-touch @swipe="cb" />
  `)
  const options = vt.recognizers['swipe'].options
  t.true(options.threshold === 20)
  t.true(options.direction === 6)
})

test('Options prop overwrites global config', t => {
  const vt = createFromTemplate(`
    <v-touch @swipe="cb" :swipe="{threshold: 15}"/>
  `)
  const options = vt.recognizers['swipe'].options
  t.true(options.threshold === 15)
})

test('callbacks are registered and fired', t => {
  const cb = sinon.spy()
  const vt = createFromTemplate(`
    <v-touch @tap="cb" />
  `, cb)


  vt.$emit('tap', {})

  t.true(cb.called)
})
