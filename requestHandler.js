// Opening Database :D

var sqlite3 =  require('sqlite3').verbose();
var db = new sqlite3.Database('db.s3db');
var querystring = require('querystring');

// Handling Requests D:

function handleUser(response,pathname,postData){
	console.log('handling');
	console.log(querystring.parse(postData).txtEmail);
	if(postData!=''){
		
		var email = querystring.parse(postData).txtEmail;
		var password = querystring.parse(postData).txtPass;
		var cedula = querystring.parse(postData).txtCedula;
		var name = querystring.parse(postData).txtNombre;
		var id = querystring.parse(postData).txtUser_ID;
		var user = new User(id, name, email, password, cedula);
		user.save(response);
		
	}else{
		console.log('nothing happening');
	}
	
	
}

//User Class

function User(id, name, email, password, cedula){
	
	//User Properties
	
	this.id = id || 0;
	this.name = name;
	this.email = email;
	this.password = password;
	this.cedula = cedula;
	
	// User Functions

	this.save =  function(response){
		if(this.id > 0){
			var sql = "UPDATE Users SET  Email = '"+ this.email +"', Name = '"+ this.name +"', Password = '"+ this.password +"', Cedula = '"+ this.cedula +"'  WHERE User_ID =" + this.id;
			db.exec(sql, function(){
				response.writeHead(200,{'Content-type':'text/plain'});
				response.end('true');
			}, function(){ db.close();});
			
		}else{
			var sql ="INSERT INTO Users(Name, Email, Password, Cedula) VALUES('"+this.name+"','"+this.email+"','"+this.password+"','"+this.cedula+"')";
			db.exec(sql, function(){
				response.writeHead(200,{'Content-type':'text/plain'});
				response.end('true');
			}, function(){db.close();});
			
		}
	}
	
	
	
}

exports.handleUser = handleUser;