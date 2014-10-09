# vue-touch

> Touch events plugin for Vue.js

This is a directive wrapper for Hammer.js 2.0.

## Usage

### CommonJS

- Available through npm as `vue-touch`. For Duo/Component you can isntall as `vuejs/vue-touch`.

  ``` js
  var vueTouch = require('vue-touch')
  Vue.use(vueTouch)
  ```

### Direct include

- You can also directly include it with a `<script>` tag when you have Vue itself included globally. It will automatically install itself, and will add a global `VueTouch`.

### Use in templates

Then you can do this:

``` html
<a v-touch="tap:onTap">Tap me!</a>
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

See [Hammer.js documentation](http://hammerjs.github.io/getting-started.html) for all available events.

See `/example` for a multi-event demo. To build the example, you need to have Browserify installed and then `npm run build`.

## License

MIT