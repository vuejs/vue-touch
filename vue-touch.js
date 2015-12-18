var Hammer = require('hammerjs');
var Vue = require('vue');
var isNotSet = require('is-not-set');
var allege = require('allege');
var arrayUnique = require('array-uniq');
var isFunction = require('is-function');

/**
 * An hash representing the gesture event names that `Hammer` can listen for, and which ones are used for each directive
 * @type {Object}
 */
var hammerDirectiveMapping = {
	'swipe-left':      'swipeleft',
	'swipe-right':     'swiperight',
	'tap':             'tap',
	'long-press-down': 'press',
	'long-press-up':   'pressup'
};

/**
 * @type {Array.<string>}
 */
var supportedDirectives = Object.keys(hammerDirectiveMapping);

/**
 * This function does the actual hard work of creating a usable Vue directive, based on the list of supported directives
 * in {@link supportedDirectives}. Uses `Hammer` to do the heavy lifting.
 *
 * @param {string} directiveName
 */
function registerTouchDirective(directiveName) {
	var hammerEventName = hammerDirectiveMapping[directiveName];

	Vue.directive(directiveName, {
		update: function (callbackFn) {
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
		registerTouchDirective('swipe-left');
	}
	if (directivesToEnable.indexOf('swipe-right') !== -1) {
		registerTouchDirective('swipe-right');
	}
	if (directivesToEnable.indexOf('tap') !== -1) {
		registerTouchDirective('tap');
	}
	if (directivesToEnable.indexOf('long-press-down') !== -1) {
		registerTouchDirective('long-press-down');
	}
	if (directivesToEnable.indexOf('long-press-up') !== -1) {
		registerTouchDirective('long-press-up');
	}
}

module.exports = {
	init: init
};