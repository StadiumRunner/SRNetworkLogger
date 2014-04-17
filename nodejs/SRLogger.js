
// Modules
var path = require('path'),
	_ = require('underscore'),
	SocketIO = require('socket.io');

// Models
var SRLogMessage = require('./models/SRLogMessage'),
	SRLogLevel = require('./models/SRLogLevel'),
	SRLogColor = require('./models/SRLogColor');

// Utils
var FormatLogMessage = require('./utils/FormatLogMessage');



// TODO:
//	Add a second 'options' param to pass in config values.
var SRLogger = function (data) {

	_io = undefined;

	_settings = {
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
		_settings.levels[ levels.error ] = SRLogColor('red');
		_settings.levels[ levels.warn ] = SRLogColor('yellow');
		_settings.levels[ levels.info ] = SRLogColor('blue');
	}

}



SRLogger.prototype.listen = function (port) {

	if ( !_.isNumber(port) || !_.isFinite(port) ) {
		throw new Error('SRLogger#listen must be passed a valid port number!');
	}

	var self = this;

	_io = SocketIO.listen(port, { log: false, serveClient: false });

	_io.sockets.on('connection', function (socket) {

		self.log('New client connection: %s', socket.id);

		socket.on('log', function (data) {

			var logMsg = new SRLogMessage(data);
			var str = FormatLogMessage(logMsg, _settings);

			self.log(str);

		});

		socket.on('disconnect', function () {

			self.log('Disconnected client: %s', socket.id);

		});

	});

}



/*
SRLogger.prototype.log = function (msg) {
	//console.log(msg);
	console.log(arguments);
}
*/
SRLogger.prototype.log = console.log;



/**
  *	The following color setters are in descending order of
  *	priority. The end log result is reached by applying the
  *	following color rules in order:
  *		- log level color
  *		- file color
  *		- function color
  */

SRLogger.prototype.setColorForLogLevel = function (color, logLevel) {

	if ( !color || !_.isFunction(color) ) {
		throw new Error('Set invalid color for log level: %s', logLevel);
	}

	if ( !_.isString(logLevel) )
		logLevel = logLevel.toString();

	_settings.levels[ logLevel ] = color;

}

SRLogger.prototype.setColorForFile = function (color, filename) {

	if ( !color || !_.isFunction(color) ) {
		throw new Error('Set invalid color for file: %s', filename);
	}

	_settings.files[ filename ] = color;

}

SRLogger.prototype.setColorForFunction = function (color, fn) {

	if ( !color || !_.isFunction(color) ) {
		throw new Error('Set invalid color for function: %s', fn);
	}

	_settings.functions[ fn ] = color;

}



//
//	NODEJS MODULE
//

module.exports = SRLogger;



