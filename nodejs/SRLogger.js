
var _ = require('underscore'),
	SocketIO = require('socket.io'),
	SRLogMessage = require('./models/SRLogMessage'),
	SRLogColor = require('./models/SRLogColor'),
	SRLogLevel = require('./models/SRLogLevel');



// Utilities

var _FormatLogMessage = function (message, formatSettings) {

	// Check for function match
	if ( _.has(formatSettings.functions, message.function) ) {

		var format = formatSettings.functions[ message.function ];

		return format(message.message);

	}

	// Check for file match
	else if () {}

	// Check for level match
	else if ( _.has(formatSettings.levels, message.level) ) {

		var format = formatSettings.levels[ message.level ];

		return format(message.message);

	}

	//
	else {}

}



var SRLogger = function (data) {

	_io = undefined;

	_settings = {
		levels: {
			SRLogLevel.loglevels.error: 	SRLogColor('red'),
			SRLogLevel.loglevels.warn: 		SRLogColor('yellow'),
			SRLogLevel.loglevels.info: 		SRLogColor('blue')
		},
		files: {},
		functions: {}
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
			var str = _FormatLogMessage(logMsg, _settings);

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



// 'color' should be an SRLogColor or string that SRLogColor supports.
SRLogger.prototype.setColorForLogLevel = function (color, logLevel) {

	//if (!color || !color instanceof SRLogColor) {
	//	throw new Error('SRLogMessage#setColorForLogLevel must be passed in an SRLogColor object!');
	//}

}

SRLogger.prototype.setColorForFile = function (color, filename) {

	// Do something...

}

SRLogger.prototype.setColorForFunction = function (color, fn) {

	// Do something...

}



module.exports = SRLogger;



