
function signup (formName,fileName) {
	var form = submitForm(formName,fileName);
	$("#hiddenUsername").val(form.inputs[0].value);
}

// still need to be upgraded (post...)
function signinSuccess (result) {
	console.log(result);
	result = JSON.parse(result);
	hideLoader();
	if(result['success']){
		$("#userNamePost").text(result['user']['username']);
		next(result['from'],result['to']);
		window.localStorage.setItem("isIn",true);
		window.localStorage.setItem("username",result['user']['username']);
		window.localStorage.setItem("id",result['user']['id']);
	
	}else if(result['notVerified']){
		$("#hiddenUsername").val(result['user']['username']);
		errorAlert([result['message']]);
		next("login","verify");
	}else{
		errorAlert(result);
	}
}

function verify(){
	submitForm("verify","verify.php",verifySuccess);
}
function verifySuccess (result) {
	console.log(result);
	result = JSON.parse(result);
	hideLoader();
	if(result['success']){
		successAlert(result['from'],result['to'],result['message']);
		window.localStorage.setItem("isIn",true);
		window.localStorage.setItem("username",result['user']['username']);
	}else{
		errorAlert(result);
	}
}

function logout() {
	killSession();
	hideMenu();
	next("home","choice");
}

function killSession () {
	window.localStorage.removeItem("isIn");
	window.localStorage.removeItem("username");
}

function openSession (username) {
	window.localStorage.setItem("isIn",true);
	window.localStorage.setItem("username",username);
}