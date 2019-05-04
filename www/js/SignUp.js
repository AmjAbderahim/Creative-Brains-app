function SignUp(){
	this.inputs = $("#signUpForm input");
}

SignUp.prototype.submit = function(){
	var dataString = "";
	for(var i=0;i<this.inputs.length;i++){
    	dataString += this.inputs[i].name + "=" + this.inputs[i].value + "&";
    }
    showLoader();
    doPost("signup.php",dataString,SignUpSuccess,SignUpError);
}

function SignUpSuccess (result) {
	hideLoader();
	if(result == "success"){
		Swal.fire(
  			'Good job!',
		  	'Now please check your E-mail',
		  	'success'
		);
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
function SignUpError (result) {
	console.log(result);
}
