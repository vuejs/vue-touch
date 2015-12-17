var Vue = require('vue');
var vueTouch = require('../vue-touch.js');

// Define the touch controls you wish to enable.
vueTouch.init([
    'swipe-left',
	'swipe-right',
	'tap',
	'long-press-down',
	'long-press-up'
]);

function callback() {
    alert('hello');
}

global.pageView = new Vue ({
    el: 'body',
    methods: {
        callback: callback
    }
});

