# vue-touch

> Touch events plugin for Vue.js

This is a directive wrapper for Hammer.js 2.0.

## Usage

### CommonJS

- Available through npm as `vue-touch`.
- No touch directives are enabled by default, they need to be passed in using the options object.
- You do not have to use all of them, just pick the ones you want.

  ``` js
  var vueTouch = require('vue-touch')
  var options = {
  	directivesToEnable: [
  		'swipe-left',
		'swipe-right',
		'tap',
		'long-press-down',
		'long-press-up'
  	]
  }
  Vue.use(vueTouch, options)
  ```

### Direct include

- You can also directly include it with a `<script>` tag when you have Vue itself included globally.
It will automatically install itself, and will add a global `VueTouch`. Using this method, all of the
touch directives will be enabled by default.

### Use in templates

Then you can do this:

``` html
<div v-swipe-left="nameOfCallback">Swipe Left On Me</div>
```

- `nameOfCallback` must be a function which needs to be made available to the Vue instance in `methods`

### Register a custom event

Coming soon.

### Example

See `/example` for a multi-event demo. To build the example, you need to have Browserify installed and then `npm run build`.

## License

MIT
