import Component from './component'
import { createProp } from './utils'

const events = {}

export const customEvents = (name) => name === undefined ? events : events[name]

export const register = (event, options = {}) => {
  options.event = event
  events[event] = options
  if (!(event in Component.props)) {
    Component.props[event] = createProp()
  }
}
