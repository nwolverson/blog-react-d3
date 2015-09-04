var connect = require('connect');
var serveStatic = require('serve-static');
var serve = serveStatic('./');
var template = require('ejs-template');

// This file is not transformed by babel, all subsequent requires will be so can
// use ES6, JSX syntax. Client/server shared files are pre-transformed for the client
// by grunt build, again using babel via browserify.
require("babel/register");
var serveChart = require('./serve_chart');

connect()
	.use(template.middleware({basedir:__dirname}))
	.use(serveChart)
	.use(serve)
	.listen(8989, '127.0.0.1');
