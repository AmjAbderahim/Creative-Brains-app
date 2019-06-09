
var user;
postDAO = new PostDAO();
function showLoader () {
	$(".loader").css("display","block");
}

function hideLoader () {
	$(".loader").css("display","none");
}

function checkAuthentification(){
	if(window.localStorage.getItem("isIn")){
		$("#choice").addClass("hidden");
	}
	else{
		$("#home").addClass("hidden");
	}
}

function submitForm (formName,fileName,success) {
	form = new Form(formName);
	form.doPost(fileName,success);
	return form;
}
function successAlert(from,to,message){
	Swal.fire(
		'Good job!',
		message,
		'success'
	);
	next(from, to);
}
function errorAlert (result) {
		console.log(result);
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

$(document).ready(function(e){
	$.ajaxSetup({cache:false});
	setInterval(function(){getPosts()},2300);
});

function getPosts(){
	var form = new Form();
	form.doGet("getPosts.php",successGetPosts);
}

function successGetPosts(result) {
	console.log(result);
	result = JSON.parse(result);
	console.log(result);
	for(var proprety in result){
		alert(proprety);
	}
	
}