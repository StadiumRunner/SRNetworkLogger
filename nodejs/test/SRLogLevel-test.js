
var _ = require('underscore'),
	SRLogLevel = require('../models/SRLogLevel'),
	loglevels = SRLogLevel.loglevels;

exports.testLevel = function (test) {

	var testData = [
		{ given: loglevels.unknown, expected: loglevels.unknown },
		{ given: loglevels.error, expected: loglevels.error },
		{ given: loglevels.warn, expected: loglevels.warn },
		{ given: loglevels.info, expected: loglevels.info },
		{ given: loglevels.debug, expected: loglevels.debug },
		{ given: loglevels.verbose, expected: loglevels.verbose }
	];

	test.expect( testData.length );

	_.each(testData, function (data, idx) {

		var logLevel = SRLogLevel( data.given );

		test.equals(logLevel, data.expected);

	});

	test.done();

}

exports.testLevelString = function (test) {

	var testData = [
		{ given: 'unknown', expected: loglevels.unknown },
		{ given: 'error', expected: loglevels.error },
		{ given: 'warn', expected: loglevels.warn },
		{ given: 'info', expected: loglevels.info },
		{ given: 'debug', expected: loglevels.debug },
		{ given: 'verbose', expected: loglevels.verbose }
	];

	test.expect( testData.length );

	_.each(testData, function (data, idx) {

		var logLevel = SRLogLevel( data.given );

		test.equals(logLevel, data.expected);

	});

	test.done();

}

exports.testDDLogString = function (test) {

	var testData = [
		{ given: 'DDLogUnknown', expected: loglevels.unknown },
		{ given: 'DDLogError', expected: loglevels.error },
		{ given: 'DDLogWarn', expected: loglevels.warn },
		{ given: 'DDLogInfo', expected: loglevels.info },
		{ given: 'DDLogDebug', expected: loglevels.debug },
		{ given: 'DDLogVerbose', expected: loglevels.verbose }
	];

	test.expect( testData.length );

	_.each(testData, function (data, idx) {

		var logLevel = SRLogLevel( data.given );

		test.equals(logLevel, data.expected);

	});

	test.done();

}

exports.testLogLevelString = function (test) {

	var testData = [
		{ given: 'LOG_LEVEL_UNKNOWN', expected: loglevels.unknown },
		{ given: 'LOG_LEVEL_ERROR', expected: loglevels.error },
		{ given: 'LOG_LEVEL_WARN', expected: loglevels.warn },
		{ given: 'LOG_LEVEL_INFO', expected: loglevels.info },
		{ given: 'LOG_LEVEL_DEBUG', expected: loglevels.debug },
		{ given: 'LOG_LEVEL_VERBOSE', expected: loglevels.verbose }
	];

	test.expect( testData.length );

	_.each(testData, function (data, idx) {

		var logLevel = SRLogLevel( data.given );

		test.equals(logLevel, data.expected);

	});

	test.done();

}

exports.testErrors = function (test) {

	var testData = [ undefined, null, true, false, NaN, Infinity, {}, SRLogLevel, new Error ];

	test.expect( testData.length );

	_.each(testData, function (data) {

		test.throws(function () {

			var logLevel = SRLogLevel(data);

		});

	});

	test.done();

}


