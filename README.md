# vue-touch

> Touch events plugin for Vue.js

This is simply a directive wrapper for Hammer.js.

## Usage

Currently only available via Component or Browserify. For other use cases just take a look at the source. It's really simple.

``` js
var vueTouch = require('vue-touch')
Vue.use(vueTouch)
```

``` html
<a v-touch="tap:onTap">Tap me!</a>
```

## License

MIT