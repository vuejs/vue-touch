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

/**
 * For when we need to call a function, but nothing needs to happen from it.
 */
function noop() {}

/**
 * An hash representing the gesture event names that `Hammer` can listen for, and which ones are used for each directive
 * @type {Object}
 */
var hammerDirectiveMapping = {
	'swipe-left': 'swipeleft',
	'swipe-right': 'swiperight',
	'tap': 'tap',
	'long-press-down': 'press',
	'long-press-up': 'pressup'
};

function registerLeftSwipeDirective() {
	var directiveName = 'swipe-left';
	var hammerEventName = hammerDirectiveMapping[directiveName];

	Vue.directive(directiveName, {
		bind: noop,
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
			hammerListener.off(hammerEventName);
			hammerListener.on(hammerEventName, callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off(hammerEventName);
		}
	});
}

function registerRightSwipeDirective() {
	var directiveName = 'swipe-right';
	var hammerEventName = hammerDirectiveMapping[directiveName];

	Vue.directive(directiveName, {
		bind: noop,
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
			hammerListener.off(hammerEventName);
			hammerListener.on(hammerEventName, callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off(hammerEventName);
		}
	});
}

function registerTapDirective() {
	var directiveName = 'tap';
	var hammerEventName = hammerDirectiveMapping[directiveName];

	Vue.directive(directiveName, {
		bind: noop,
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
			hammerListener.off(hammerEventName);
			hammerListener.on(hammerEventName, callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off(hammerEventName);
		}
	});
}

function registerPressDownDirective() {
	var directiveName = 'long-press-down';
	var hammerEventName = hammerDirectiveMapping[directiveName];

	Vue.directive(directiveName, {
		bind: noop,
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
			hammerListener.off(hammerEventName);
			hammerListener.on(hammerEventName, callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off(hammerEventName);
		}
	});
}

function registerPressUpDirective() {
	var directiveName = 'long-press-up';
	var hammerEventName = hammerDirectiveMapping[directiveName];

	Vue.directive(directiveName, {
		bind: noop,
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
			hammerListener.off(hammerEventName);
			hammerListener.on(hammerEventName, callbackFn);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off(hammerEventName);
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

