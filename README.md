# vue-touch

> Touch events plugin for Vue.js

This is a directive wrapper for Hammer.js 2.0.

## Usage

### CommonJS

- Available through npm as `vue-touch`.

  ``` js
  var VueTouch = require('vue-touch')
  Vue.use(VueTouch)
  ```

### Direct include

- You can also directly include it with a `<script>` tag when you have Vue and Hammer.js already included globally. It will automatically install itself, and will add a global `VueTouch`.

### Using the `v-touch` directive

Then you can do this:

``` html
<a v-touch:tap="onTap">Tap me!</a>
```

### Register a custom event

``` js
// example registering a custom doubletap event.
// the `type` indicates the base recognizer to use from Hammer
// all other options are Hammer recognizer options.
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
```

See [Hammer.js documentation](http://hammerjs.github.io/getting-started/) for all available events.

See `/example` for a multi-event demo. To build it, run `npm install && npm run build`.

## License

MIT
