# vue-touch

> Touch events plugin for Vue.js

This is a directive wrapper for Hammer.js 2.0.

## Usage

Currently only available via Component or Browserify. For other use cases just take a look at the source. It's really simple.

``` js
var vueTouch = require('vue-touch')
Vue.use(vueTouch)
```

``` html
<a v-touch="tap:onTap">Tap me!</a>
```

See [Hammer.js documentation](http://hammerjs.github.io/getting-started.html) for all available events.

See `/example` for listening to multiple events together and how to register a custom event like `'doubletap'`. To build the example, you need to have Browserify installed and then `npm run build`.

## License

MIT