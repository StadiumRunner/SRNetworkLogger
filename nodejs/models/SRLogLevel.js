
var _ = require('underscore');

var loglevels = {

	unknown: 	0,

	error: 		1,
	warn: 		2,
	info: 		4,
	debug: 		8,
	verbose: 	16

}

var _StripLogLevelString = function (level) {

	// 'level' must be a string
	if ( !_.isString(level) ) {
		throw new Error('Log level class name must be a string!');
	}

	return level.toUpperCase().replace('DDLOG', '')				// DDLogError >> Error
				.toUpperCase().replace('LOG_LEVEL_', '')		// LOG_LEVEL_ERROR >> ERROR
				.toLowerCase();

}



var SRLogLevel = function (logLevel) {

	// If logLevel has already been converted from
	// a string to a log level (valid number) then
	// don't throw an error, just return the number.
	if ( _.isNumber(logLevel) && _.isFinite(logLevel) && !_.isNaN(logLevel) ) {

		var levels = _.values(loglevels);
		var isValid = _.contains(levels, logLevel);

		return isValid ? logLevel : loglevels.unknown;

	}

	else if ( _.isString(logLevel) ) {

		var level = logLevel.toUpperCase().replace('DDLOG', '')				// DDLogError >> Error
							.toUpperCase().replace('LOG_LEVEL_', '')		// LOG_LEVEL_ERROR >> ERROR
							.toLowerCase();

		var isValid = _.has(loglevels, level);

		return isValid ? loglevels[ level ] : loglevels.unknown;

	}

	else {
		throw new Error('SRLogLevel paramter must be a string or number!');
	}

}

SRLogLevel.loglevels = loglevels;



module.exports = SRLogLevel;



