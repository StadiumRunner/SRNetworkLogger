
var path = require('path'),
	_ = require('underscore');

module.exports = function (message, formatSettings) {

	// Check for function match
	if ( _.has(formatSettings.functions, message.function) ) {

		var format = formatSettings.functions[ message.function ];

		return format(message.message);

	}

	/**
	  * Check for file match
	  *
	  * Checks for matching parts of a file path by serializing
	  * 'path/to/file' >> [ 'path', 'to', 'file' ] and compares it to
	  * a potential target path in reverse order to enable the following
	  * to match positive:
	  *
	  * 		path/to/file == my/special/path/to/file
	  *
	  * WARNING: UNTESTED CODE!!!!!
	  */
	else if (_.isString( message.file ) && message.file.length > 0 &&
				_.some(formatSettings.files, function (color, path) {

					var formatPath = path.split(path.sep).reverse();
					var messagePath = message.file.split(path.sep).reverse();

					return _.every(messagePath, function (msgPath, idx) {
						return formatPath[idx] === msgPath;
						// To make it case-insensitive:
						//return formatPath[idx].toUpperCase() === msgPath.toUpperCase();
					});

				})
			)  /* end of: else if (file) */
	{

		// Gets format by finding the first matching
		// 'path' key and returning it's color format function.
		var format = _.find(formatSettings.files, function (fn, path) {

			var formatPath = path.split(path.sep).reverse();
			var messagePath = message.file.split(path.sep).reverse();

			return _.every(messagePath, function (msgPath, idx) {
				return formatPath[idx] === msgPath;
				// To make it case-insensitive:
				//return formatPath[idx].toUpperCase() === msgPath.toUpperCase();
			});

		});

		if (format) {
			return format(message.message);
		}

	}

	// Check for level match
	else if ( _.has(formatSettings.levels, message.level) ) {

		var format = formatSettings.levels[ message.level ];

		return format(message.message);

	}

	// else...
	return message.message;

}
