var Hammer = require('hammerjs');
var Vue = require('vue');
var isNotSet = require('is-not-set');
var allege = require('allege');
var arrayUnique = require('array-uniq');
var isFunction = require('is-function');

var supportedDirectives = [
	'swipe-left'
];

/**

function registerLeftSwipeDirective() {
	Vue.directive('swipe-left', {
		bind: function () {
		},
		update: function (newValue, oldValue) {
			if (isNotSet(this.value)) {
				throw new ReferenceError(
					'This directive is designed to be used with a callback. e.g. \'v-swipe-left="nameOfCallback"\''
				)
			}
			if (isFunction(this.value) === false) {
				throw new TypeError(
					'Argument callback was not of required type Function'
				)
			}
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('swipeleft');
			hammerListener.on('swipeleft', this.value);
		},
		unbind: function () {
			var element = this.el;
			var hammerListener = new Hammer(element);
			hammerListener.off('swipeleft');
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
}

module.exports = {
	init: init
};

