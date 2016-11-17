require('malta').checkDeps('svg-to-png');

var svg_to_png = require("svg-to-png"),
	path = require('path'),
	fs = require('fs');

function malta_svg2png(o, options) {
	var self = this,
		start = new Date(),
		msg,
        pluginName = path.basename(path.dirname(__filename));

	return function (solve, reject){
		try {
			svg_to_png.convert(o.name, path.dirname(o.name), {compress : true}) // async, returns promise 
			.then( function() {
				o.name = o.name.replace(/\.svg$/, '.png');
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_svg2png.ext = 'svg';
module.exports = malta_svg2png;