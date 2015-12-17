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
 *
 * @param {Array.<String>} directivesToEnable - The directives you wish to enable.
 */
function init(directivesToEnable) {
}

module.exports = {
	init: init
};
