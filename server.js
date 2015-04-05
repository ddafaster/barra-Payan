var http = require('http');
var url = require('url');

function start(route, handle){
	function onRequest(request, response){
		response.setHeader("Access-Control-Allow-Origin", "*");
		var pathname =  url.parse(request.url).pathname;
		var postData= '';
		request.setEncoding('utf8');
		request.addListener	('data', function(postDataChunk){
			postData += postDataChunk;
		});
		
		request.addListener('end', function(){
			route(handle, response, pathname, postData);
		});
		
		
	}
	http.createServer(onRequest).listen(86);
	console.log('Server has started');
}

exports.start = start;