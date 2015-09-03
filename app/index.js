var React = require('react');
var mountNode = document.getElementById("reactNode");

var BarChart = require('./BarChart');

React.render(<BarChart data={[1, 2, 3]} />, mountNode);
window.setTimeout(function () {
	React.render((<BarChart data={[1, 3, 5, 2]} />), mountNode);
}, 0);
