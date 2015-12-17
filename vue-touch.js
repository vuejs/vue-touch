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
}

module.exports = {
	init: init
};
