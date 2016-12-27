# vue-touch

> Touch events plugin for Vue.js

This is a component wrapper for Hammer.js 2.0.

## Install

#### CommonJS

- Available through npm as `vue-touch`.

  ``` js
  var Hammer = require('hammerjs')
  var VueTouch = require('vue-touch')
  Vue.use(VueTouch, {hammer: Hammer})
  ```

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

#### Configuring Recognizer Options

There are two ways to customize recognizer options such as `direction` and `threshold`. The first one is setting global options:

``` js
// change the threshold for all swipe recognizers
VueTouch.config.swipe = {
  threshold: 200
}
```

Or, you can use the matching `*-options` props to configure the behavior on a specific element:

``` html
<!-- detect only horizontal pans with a threshold of 100 -->
<v-touch
  v-on:pan="onPan"
  v-bind:pan-options="{ direction: 'horizontal', threshold: 100 }">
</v-touch>
```

#### Registering Custom Events

``` js
// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
```
**Warning**: You have to register your custom events *before* installing the plugin with `Vue.use(VueTouch)`.
VueTouch will throw an error if you try to do that afterwards, and the event will not work as intended if you try to use
local options for it on the `<v-touch>` element.

``` html
<v-touch v-on:doubletap="onDoubleTap"></v-touch>
<!-- with local options -->
<v-touch v-on:doubletap="onDoubleTap" v-bind:doubletap-options="{intervall: 250}"></v-touch>
```

See [Hammer.js documentation](http://hammerjs.github.io/getting-started/) for all available events.

See `/example` for a multi-event demo. To build it, run `npm install && npm run build`.

## License

[MIT](http://opensource.org/licenses/MIT)
