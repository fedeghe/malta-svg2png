require('malta').checkDeps('svg-to-png');

var svg_to_png = require("svg-to-png"),
	path = require('path'),
	fs = require('fs');

function malta_svg2png(o, options) {
	var self = this,
		start = new Date(),
		msg;

	return function (solve, reject){
		try {
			svg_to_png.convert(o.name, path.dirname(o.name), {compress : true}) // async, returns promise 
			.then( function() {
				o.name = o.name.replace(/\.svg$/, '.png');
				msg = 'plugin ' + path.basename(__filename) + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (e) {
			console.log('[PARSE ERROR: svg-to-png] ' + e.message + ' @' + e.line + ' maybe on ' + self.lastEditedFile);
			console.log('[WARN: Png version skipped]');
			self.stop();
		}
	};
}
malta_svg2png.ext = 'svg';
module.exports = malta_svg2png;