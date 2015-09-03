var React = require('react/addons');
var BarChart = require('./app/BarChart');

function serveChart(req,res,next){
	if (req.url === "/" || req.url === "/index.html") {
		var reactHtml = React.renderToString(<BarChart data={[1, 2, 3]} />);
		res.endTemplate('index.html', { reactOutput: reactHtml });
	} else {
		next();
	}
}

module.exports = serveChart;
