
var serverSideUrl = "http://127.0.0.1/Creative/www/php/";
function Form(formName){
	if(formName == undefined)return;
	this.inputs = $("#"+formName+" input");
	this.dataString = new FormData();
	for(var i=0;i<this.inputs.length;i++){
    	this.dataString.append(this.inputs[i].name,this.inputs[i].value);
    }
}
Form.prototype.doPostWithData = function(fileName,data,success) {
	this.dataString = data;
	this.doPost(fileName,success);
};
Form.prototype.doPost = function(fileName,success){
	showLoader();
	if(success == undefined)success = defaultSuccess;
	$.ajax({
		type:'POST',
		url:serverSideUrl+fileName,
		dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
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
