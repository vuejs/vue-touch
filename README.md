# vue-touch

> Touch events plugin for Vue.js

This is a directive wrapper for Hammer.js 2.0.

This version is only compatible with Vue 2.0.

## Install

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

```js
// add the callback method to the methods of our component:
methods: {
  onSwipeLeft(event) {
    // event is a Hammer Event Object
  }
}
```

See the [Hammer.js API documentation for the Event Object](https://hammerjs.github.io/api/#event-object) to learn about all of the event object's properties

#### Configuring Global Recognizer Options

You can set global options for your recognizers like this:

``` js
// change the threshold for all swipe recognizers
VueTouch.config.swipe = {
  threshold: 200
}
```

#### Registering Custom Events

If you want to use different options from the global ones for a Hammer event, you can create a custom event.

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
