import React from 'react/addons';
import BarChart from './app/BarChart';

function serveChart(req,res,next){
	if (req.url === "/" || req.url === "/index.html") {
		const reactHtml = React.renderToString(<BarChart data={[1, 2, 3]} />);
		res.endTemplate('index.html', { reactOutput: reactHtml });
	} else {
		next();
	}
}

export default serveChart;
