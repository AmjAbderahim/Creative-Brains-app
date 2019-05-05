
function signup (formName,fileName) {
	var form = submitForm(formName,fileName);
	user = new User(form.inputs);
	$("#hiddenUsername").val(user.arguments["username"]);
}

// still need to be upgraded (post...)
function signinSuccess (result) {
	console.log(result);
	result = JSON.parse(result);
	hideLoader();
	if(result['success']){
		$("#userNamePost").text(result['user']['username']);
		next(result['from'],result['to']);
	}else if(result['notVerified']){
		errorAlert([result['message']]);
		next("login","verify");
	}else{
		errorAlert(result);
	}
}
