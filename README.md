# vue-touch

> Touch events plugin for Vue.js

This is a component wrapper for Hammer.js 2.0.

This version is only compatible with Vue 2.0.

## Install

> This plugin requires Vue >= 2.0. For the Vue 1.\*-compatible version, see the `1.0` branch


- Available through npm as `vue-touch`.

```Javascript
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
```
You can pass an options object as the second argument, which at the moment accepts one property, `name`. It's used to define the name of the component that is registered with Vue and defaults to `'v-touch'`.

#### Direct include

- You can also directly include it with a `<script>` tag when you have Vue and Hammer.js already included globally. It will automatically install itself, and will add a global `VueTouch`.

## Usage

#### Using the `<v-touch>` component

``` html
<!-- Renders a div element by default -->
<v-touch v-on:swipeleft="onSwipeLeft">Swipe me!</v-touch>

<!-- Render as other elements with the 'tag' prop -->
<v-touch tag="a" v-on:tap="onTap">Tap me!</v-touch>
```

## API

### Component Events

vue-touch supports all Hammer Events ot of the box, just bind a listener to the component with `v-on` and vue-touch will setup the Hammer Manager & Recognizer for you.

|Recognizer|Events|Example|
|---|----|----|----|
|**Pan**|`pan`, `panstart`, `panmove`, `panend`, `pancancel`, `panleft`, `panright`, `panup`, `pandown` |`v-on:panstart="callback"`|
|**Pinch**|`pinch`, `pinchstart`, `pinchmove`,`pinchend`, `pinchcancel`, `pinchin`, `pinchout`| `v-on:pinchout="callback"`|
|**Press**|`press`, `pressup`|`v-on:pressup="callback"`|
|**Rotate**|`rotate`, `rotatestart`, `rotatemove`, `rotateend`, `rotatecancel`, |`v-on:rotateend="callback"`|
|**Swipe**|`swipe`, `swipeleft`, `swiperight`, `swipeup`, `swipedown`|`v-on:swipeleft="callback"`|
|**Tap**|`tap`|`v-on:tap="callback"`|

### Component Props

You can use the matching `*-options` props to pass Hammer options such as `direction` and `threshold`:

``` html
<!-- detect only horizontal pans with a threshold of 100 -->
<v-touch
  v-on:panstart="onPanStart"
  v-bind:pan-options="{ direction: 'horizontal', threshold: 100 }">
</v-touch>
```
There's one prop per `Recognizer` available.

|Recognizer|Prop|
|----------|----|
|**Pan**|`v-bind:pan-options`|
|**Pinch**|`v-bind:pinch-options`|
|**Rotate**|`v-bind:rotate-options`|
|**Swipe**|`v-bind:swipe-options`|
|**Tap**|`v-bind:tap-options`|

See [Hammer.js documentation](http://hammerjs.github.io/getting-started/) for all available options for events.

#### Directions

In the above example, not that we used `direction: 'horizontal'`. Hammer's directions interface is a little ugly (Hammer['DIRECTION_HORIZONTAL']).

VueTouch keeps that from you and accepts simple strings as directions:

```javascript
const directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']
```

## Public Component Methods

The component exposes a few convenience methods to enable and disable Recognizers:

|Method|Explanation|
|------|-----------|
|`disable(event)`|disable the Recognizer for `event`|
|`enable(event)`|disable the Recognizer for `event`|
|`disableAll`|disable all Recognizers|
|`enableAll`|enable all Recognizers|
|`isEnabled(event)`|returns `true` if Recognizer for `event` is currently enabled|

```html
<template>
  <v-touch ref="tapper" @tap="callback"></v-touch>
</template>
<script>
  export default {
    methods: {
      disableTap() {
        this.$refs.tapper.disable('tap')
      },
      enableTap() {
        this.$refs.tapper.enable('tap')
      }
    }
  }
</script>
```

### Plugin Methods

#### Global Event Options

You can define global defaults for the builtin recognizers

``` js
// change the threshold for all swipe recognizers
VueTouch.config.swipe = {
  threshold: 200
}
```

#### Registering Custom Events

You can register custom events with vue-touch.

``` js
// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
```
> **Warning**: You have to register your custom events *before* installing the plugin with `Vue.use(VueTouch)`.
VueTouch will log a warning to the console (in dev mode) if you try to do that afterwards, and the event will not work.

This will make it possible to listen for this event on `<v-touch>`. Additionally, just like for "normal" events, you can pass further options as the corresponding prop.

``` html
<v-touch v-on:doubletap="onDoubleTap"></v-touch>
<!-- with local options -->
<v-touch v-on:doubletap="onDoubleTap" v-bind:doubletap-options="{intervall: 250}"></v-touch>
```

See `/example` for a multi-event demo. To build it, run `npm install && npm run build`.

## Known Limitations & Bugs

* Curently, changing `-options` props will not change recogizer settings. The initial values will stay in place until the component is re-created.

## TODO

* [ ] Support updating recognizer options when props change.
* [ ] Find out if e2e tests are possible(contribution welcome)

## License

[MIT](http://opensource.org/licenses/MIT)
