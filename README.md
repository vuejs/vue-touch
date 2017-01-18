# vue-touch

> Touch events plugin for Vue.js. **This plugin does not support Vue 2.0 yet.**

This is a directive wrapper for Hammer.js 2.0.

## Install

> This branch is only compatible with Vue 1.0. For the Vue 2.0 compatible rewrite, see the `next` branch

#### CommonJS

- Available through npm as `vue-touch`.

  ``` js
  var VueTouch = require('vue-touch')
  Vue.use(VueTouch)
  ```

#### Direct include

- You can also directly include it with a `<script>` tag when you have Vue and Hammer.js already included globally. It will automatically install itself, and will add a global `VueTouch`.

## Usage

#### Using the `v-touch` directive

``` html
<a v-touch:tap="onTap">Tap me!</a>

<div v-touch:swipeleft="onSwipeLeft">Swipe me!</div>
```

#### Configuring Recognizer Options

There are two ways to customize recognizer options such as `direction` and `threshold`. The first one is setting global options:

``` js
// change the threshold for all swipe recognizers
VueTouch.config.swipe = {
  threshold: 200
}
```

Or, you can use the `v-touch-options` directive to configure the behavior on a specific element:

``` html
<!-- detect only horizontal pans with a threshold of 100 -->
<a
  v-touch:pan="onPan"
  v-touch-options:pan="{ direction: 'horizontal', threshold: 100 }">
</a>
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
``` html
<a v-touch:doubletap="onDoubleTap"></a>
```

See [Hammer.js documentation](http://hammerjs.github.io/getting-started/) for all available events.

See `/example` for a multi-event demo. To build it, run `npm install && npm run build`.

## License

[MIT](http://opensource.org/licenses/MIT)
