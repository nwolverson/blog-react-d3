import React from 'react';
import BarChart from './BarChart';

const mountNode = document.getElementById("reactNode");

React.render(<BarChart data={[1, 2, 3]} />, mountNode);
window.setTimeout(() =>
    React.render((<BarChart data={[1, 3, 5, 2]} />), mountNode),
    0);
