var Vue = require('vue');
var vueTouch = require('../vue-touch.js');

//Enable the plugin with the plugin name and the touch directives to enable.
Vue.use(vueTouch, {
	directivesToEnable: [
		'swipe-left',
		'swipe-right',
		'tap',
		'long-press-down',
		'long-press-up'
	]
});


function callback() {
    alert('hello');
}

global.pageView = new Vue ({
    el: 'body',
    methods: {
        callback: callback
    }
});

