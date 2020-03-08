const svg_to_png = require("svg-to-png"),
	path = require('path');

function malta_svg2png(o, options) {
	const self = this,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename))
    let msg;

	return (solve, reject) => {
		try {
			svg_to_png.convert(o.name, path.dirname(o.name), {compress : true}) // async, returns promise 
			.then(() => {
				o.name = o.name.replace(/\.svg$/, '.png');
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
            self.doErr(err, o, pluginName);
            reject(`Plugin ${pluginName} error:\n${err}`);
		}
	};
}
malta_svg2png.ext = 'svg';
module.exports = malta_svg2png;