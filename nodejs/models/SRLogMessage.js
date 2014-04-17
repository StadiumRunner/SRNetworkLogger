
var _ = require('underscore'),
	SRLogColor = require('./SRLogColor');

var SRLogMessage = function (data) {

	this.message = undefined;
	this.level = undefined;
	this.file = undefined;
	this.function = undefined;
	this.line = undefined;

	_settings = {
		levels: {},
		flags: {},
		files: {},
		functions: {}
	}

	if ( _.isString(data) ) {
		this.message = data;
	}
	else if ( _.isObject(data) ) {
		this.message = data.message;
		this.level = data.flag;  // data.level isn't nice, but data.flag works :)
		this.file = data.file;
		this.function = data.function;
		this.line = data.line;
	}

}



module.exports = SRLogMessage;
