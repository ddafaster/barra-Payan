function route(handle, response, pathname,postData){
	if(typeof handle[pathname]==='function'){
		console.log('routing');
		handle[pathname](response, pathname,postData);
	}
	
}

exports.route = route;