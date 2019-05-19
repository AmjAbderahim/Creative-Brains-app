
var serverSideUrl = "http://192.168.1.104/Creative/www/php/";
function Form(formName){
	this.inputs = $("#"+formName+" input");
	this.dataString = "";
	for(var i=0;i<this.inputs.length;i++){
    	this.dataString += this.inputs[i].name + "=" + this.inputs[i].value + "&";
    }
}
Form.prototype.doPost = function(fileName,success){
	showLoader();
	if(success == undefined)success = defaultSuccess;
	$.ajax({
		type:'POST',
		url:serverSideUrl+fileName,
		data:this.dataString,
		success:success,
		error:defaultError
	});
}
Form.prototype.doGet = function(fileName,success) {
	showLoader();
	if(success == undefined)success = defaultSuccess;
	$.ajax({
		type:'GET',
		url:serverSideUrl+fileName,
		success:success,
		error:defaultError
	});
};

function defaultSuccess (result) {
	console.log(result);
	result = JSON.parse(result);
	hideLoader();
	if(result['success']){
		successAlert(result['from'],result['to'],result['message']);
	}else{
		errorAlert(result);
	}
}
function defaultError (result) {
	hideLoader();
	console.log(result);
	Swal.fire({
		type: 'error',
		title: 'Oops...',
		text: "Something went wrong",
		footer:"If this still happen please <a href='#'> contact us.</a>"
	});
}
