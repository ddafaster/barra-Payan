var server = require('./server');
var route = require('./route');
var requestHandler = require('./requestHandler');

var handle = {};
	
handle['/user'] = requestHandler.handleUser;

server.start(route.route, handle);
