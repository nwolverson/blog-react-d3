var connect = require('connect');
var serveStatic = require('serve-static');
var serve = serveStatic('./');
var template = require('ejs-template');

require("babel/register");
var serveChart = require('./serve_chart');

connect()
	.use(template.middleware({basedir:__dirname}))
	.use(serveChart)
	.use(serve)
	.listen(8989, '127.0.0.1');
