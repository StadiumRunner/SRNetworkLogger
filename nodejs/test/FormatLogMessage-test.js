
var _ = require('underscore'),
	SRLogMessage = require('../models/SRLogMessage'),
	SRLogLevel = require('../models/SRLogLevel'),
	SRLogColor = require('../models/SRLogColor'),
	FormatLogMessage = require('../utils/FormatLogMessage');

var _formatColor = SRLogColor('red');


exports.setUp = function (done) {

	this.message = new SRLogMessage();

	this.formatSettings = {
		/*
		levels: {
			SRLogLevel.loglevels.error: 	SRLogColor('red'),
			SRLogLevel.loglevels.warn: 		SRLogColor('yellow'),
			SRLogLevel.loglevels.info: 		SRLogColor('blue')
		},
		*/
		levels: {},
		files: {},
		functions: {}
	}

	// Scoped so 'levels' doesn't get tied to 'this'
	{
		var levels = SRLogLevel.loglevels;
		this.formatSettings.levels[ levels.error ] = SRLogColor('red');
		this.formatSettings.levels[ levels.warn ] = SRLogColor('yellow');
		this.formatSettings.levels[ levels.info ] = SRLogColor('blue');
	}

	done();

}

/*
exports.testFiles = function (test) {

	var testData = [ 'file', 'file.js', '.file', '.file.js', './file.js' ];

	test.expect( testData.length );

	_.each(testData, function (file) {

		this.message.file = file;
		this.formatSettings.files[ file ] = _formatColor;

		var result = FormatLogMessage(this.message, this.formatSettings);
		var expected = _formatColor(this.message.message);

		test.equal(result, expected);

	});

	test.done();

}
*/



