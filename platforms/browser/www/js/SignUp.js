
function SignUp(){
	this.inputs = $("#signUpForm input");
}

SignUp.prototype.submit = function(){
	var dataString = "";
	for(var i=0;i<this.inputs.length;i++){
    	dataString += this.inputs[i].name + "=" + this.inputs[i].value + "&";
    }
    doPost("signup.php",dataString,SignUpSuccess,Error);
}
SignUp.prototype.verify = function() {
	var dataString = "codeVerification="+$("#codeVerification").val()+"&username="+user.arguments["username-signup"];
	doPost("verify.php",dataString,VerificationSuccess,Error);
};
//verification
function VerificationSuccess (result) {
	hideLoader();
	if(result == "success"){
		Swal.fire(
  			'SUCCESS',
		  	'Welcom to CREATIVE BRAINS',
		  	'success'
		);
		next("verify", "genre-choice");
	}else{
		console.log(result);
		result = JSON.parse(result);
		var stringResult = "";
		for (var i = 0; i < result.length; i++) {
			stringResult += result[i] + "<br/>";
		}
		Swal.fire({
		  type: 'error',
		  title: 'Oops...',
		  text: "toFill"
		});
		document.getElementById("swal2-content").innerHTML = stringResult;
	}
}
// signup
function SignUpSuccess (result) {
	hideLoader();
	if(result == "success"){
		Swal.fire(
  			'Good job!',
		  	'Now please check your E-mail',
		  	'success'
		);
		user = new User(signup.inputs);
		next("signup","verify");
	}else{
		console.log(result);
		result = JSON.parse(result);
		var stringResult = "";
		for (var i = 0; i < result.length; i++) {
			stringResult += result[i] + "<br/>";
		}
		Swal.fire({
		  type: 'error',
		  title: 'Oops...',
		  text: "toFill"
		});
		document.getElementById("swal2-content").innerHTML = stringResult;
	}
}
function Error (result) {
	hideLoader();
	console.log(result);
	Swal.fire({
		type: 'error',
		title: 'Oops...',
		text: "Something went wrong",
		footer:"If this still happen please <a href='#'>contact us.</a>"
	});
}
