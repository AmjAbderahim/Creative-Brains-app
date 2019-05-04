function Authentification(){
	this.url = "http://192.168.1.104/Creative/www/php/";
}

Authentification.prototype.signUp = function(uri,data,successFunction,errorFunction){
	$.ajax({
		type:'POST',
		url:this.url+uri,
		data:data,
		success:successFunction,
		error:errorFunction
	});
};
