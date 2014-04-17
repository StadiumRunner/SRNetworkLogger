
var _ = require('underscore'),
	chalk = require('chalk');


var SRLogColor = function (color) {

	if ( !_.isString(color) ) {
		throw new Error('SRLogColor must be passed a valid color string!');
	}
	//else if ( _.has(SRLogColors, color) ) {
	else if ( _.contains(SRLogColor.colors, color) ) {
		return SRLogColor[ color ];
	}
	else {
		throw new Error('Unrecognized color: %s', color);
	}

}

SRLogColor.colors = [ 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray' ];

_.each(SRLogColor.colors, function (color) {
	SRLogColor[color] = chalk[color];
});



module.exports = SRLogColor;



