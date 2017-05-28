import test from 'ava'

import Vue from 'vue/dist/vue.common'
import VueTouch from './helpers/vue-touch'

import { createFromTemplate, createInstanceFromTemplate } from './helpers'



test.before(t => {
  Vue.use(VueTouch)
})

test('Rendering without props renders as div', t => {
  const i = createInstanceFromTemplate(`
    <v-touch></v-touch>
    `)
  const vt = i.$children[0]

  t.is(vt.$el.tagName, 'DIV')
})

test('Tag prop renders as span element', t => {
  const vt = createFromTemplate(`
    <v-touch tag="span" />
  `)

  t.is(vt.$el.tagName, 'SPAN')
})
