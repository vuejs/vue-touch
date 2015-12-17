var Vue = require('vue');
var vueTouch = require('../vue-touch.js');

vueTouch.init([
    'swipe-left',
	'swipe-right',
	'tap',
	'press-down',
	'press-up'
]);

function callback() {
    alert('hello');
}

global.pageView = new Vue ({
    el: 'div',
    methods: {
        callback: callback
    }
});

