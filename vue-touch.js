var Hammer = require('hammerjs');
var Vue = require('vue');
var isNotSet = require('is-not-set');
var allege = require('allege');
var arrayUnique = require('array-uniq');
var isFunction = require('is-function');

var supportedDirectives = [
	'swipe-left',
	'swipe-right',
	'tap',
	'long-press-down',
	'long-press-up'
];

function registerLeftSwipeDirective() {
	Vue.directive('swipe-left', {
		bind: function () {
		},
		update: function (newValue, oldValue) {
			var callbackFn = this.vm.$options.methods[this.expression];

			if (isNotSet(callbackFn)) {
				throw new ReferenceError(
					'This directive is designed to be used with a callback. e.g. \'v-swipe-left="nameOfCallback"\''
				)
			}
			if (isFunction(callbackFn) === false) {
				throw new TypeError(
					'Argument callback was not of required type Function'
				)
			}
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('swipeleft');
			hammerListener.on('swipeleft', callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('swipeleft');
		}
	});
}

function registerRightSwipeDirective() {
	Vue.directive('swipe-right', {
		bind: function () {
		},
		update: function (newValue, oldValue) {
						var callbackFn = this.vm.$options.methods[this.expression];

			if (isNotSet(callbackFn)) {
				throw new ReferenceError(
					'This directive is designed to be used with a callback. e.g. \'v-swipe-right="nameOfCallback"\''
				)
			}
			if (isFunction(callbackFn) === false) {
				throw new TypeError(
					'Argument callback was not of required type Function'
				)
			}
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('swiperight');
			hammerListener.on('swiperight', callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('swiperight');
		}
	});
}

function registerTapDirective() {
	Vue.directive('tap', {
		bind: function () {
		},
		update: function (newValue, oldValue) {
						var callbackFn = this.vm.$options.methods[this.expression];

			if (isNotSet(callbackFn)) {
				throw new ReferenceError(
					'This directive is designed to be used with a callback. e.g. \'v-tap="nameOfCallback"\''
				)
			}
			if (isFunction(callbackFn) === false) {
				throw new TypeError(
					'Argument callback was not of required type Function'
				)
			}
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('tap');
			hammerListener.on('tap', callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('tap');
		}
	});
}

function registerPressDownDirective() {
	Vue.directive('long-press-down', {
		bind: function () {
		},
		update: function (newValue, oldValue) {
						var callbackFn = this.vm.$options.methods[this.expression];

			if (isNotSet(callbackFn)) {
				throw new ReferenceError(
					'This directive is designed to be used with a callback. e.g. \'v-long-press-down="nameOfCallback"\''
				)
			}
			if (isFunction(callbackFn) === false) {
				throw new TypeError(
					'Argument callback was not of required type Function'
				)
			}
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('press');
			hammerListener.on('press', callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('press');
		}
	});
}

function registerPressUpDirective() {
	Vue.directive('long-press-up', {
		bind: function () {
		},
		update: function (newValue, oldValue) {
						var callbackFn = this.vm.$options.methods[this.expression];

			if (isNotSet(callbackFn)) {
				throw new ReferenceError(
					'This directive is designed to be used with a callback. e.g. \'v-long-press-up="nameOfCallback"\''
				)
			}
			if (isFunction(callbackFn) === false) {
				throw new TypeError(
					'Argument callback was not of required type Function'
				)
			}
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('pressup');
			hammerListener.on('pressup', callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('pressup');
		}
	});
}

/**
 *
 * @param {Array.<*>} arrayInput - the array to compare
 * @returns {boolean}
 */
function areAllArrayItemsUnique(arrayInput) {
	var uniqueArrayLength = arrayUnique(arrayInput).length;
	var rawArrayLength = arrayInput.length;
	return uniqueArrayLength === rawArrayLength;
}

/**
 *
 * @param {Array.<String>} directivesToEnable - The directives you wish to enable.
 */
function init(directivesToEnable) {
	if (isNotSet(directivesToEnable)) {
		throw new ReferenceError('Required argument "directivesToEnable" was not set.');
	}
	if (Array.isArray(directivesToEnable) === false) {
		throw new TypeError('Argument "directivesToEnable" was not of required type Array');
	}
	if (directivesToEnable.length === 0) {
		throw new RangeError('"directivesToEnable" was passed an empty array');
	}
	directivesToEnable.forEach(function(directive) {
		if (allege(directive).isNoneOf.apply(this, supportedDirectives)) {
			throw new RangeError(
				directive + ' is not a supported directive. Supported directives are ' + supportedDirectives
			)
		}
	});
	if (areAllArrayItemsUnique(directivesToEnable) === false) {
		console.warn(
			'You are trying to enable directives multiple times in "directivesToEnable". Please make directives unique'
		);
	}
	if (directivesToEnable.indexOf('swipe-left') !== -1) {
		registerLeftSwipeDirective();
	}
	if (directivesToEnable.indexOf('swipe-right') !== -1) {
		registerRightSwipeDirective();
	}
	if (directivesToEnable.indexOf('tap') !== -1) {
		registerTapDirective();
	}
	if (directivesToEnable.indexOf('long-press-down') !== -1) {
		registerPressDownDirective();
	}
	if (directivesToEnable.indexOf('long-press-up') !== -1) {
		registerPressUpDirective();
	}
}

module.exports = {
	init: init
};

