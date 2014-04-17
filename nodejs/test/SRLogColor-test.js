
var _ = require('underscore'),
	chalk = require('chalk'),
	SRLogColor = require('../models/SRLogColor');


exports.testColorProperties = function (test) {

	var testData = SRLogColor.colors;

	test.expect( testData.length );

	_.each(testData, function (color) {

		test.ok( _.has(SRLogColor, color) );

	});

	test.done();

}

exports.testChalkEquality = function (test) {

	var testData = SRLogColor.colors;

	test.expect( testData.length );

	_.each(testData, function (color) {

		var fromMe = SRLogColor[ color ],
			fromChalk = chalk[ color ];

		// Gotta test the _styles property b/c the actual
		// object has 'self' tied to it somehow so
		// test.deepEqual(fromMe, fromChalk) == false
		test.deepEqual(fromMe._styles, fromChalk._styles);

	});

	test.done();

}

exports.testErrors = function (test) {

	var testData = [ undefined, null, true, false, NaN, Infinity, {}, SRLogColor, new Error ];

	test.expect( testData.length );

	_.each(testData, function (data) {

		test.throws(function () {

			var logLevel = SRLogColor(data);

		});

	});

	test.done();

}



