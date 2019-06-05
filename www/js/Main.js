
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
	next(from, to);
	Swal.fire(
		'Good job!',
		message,
		'success'
	);
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
	result = JSON.parse(result);
	$("#Creations").html("");
	for (var index = 0; index < result.length; index++) {
		$("#Creations").append(getHTML(result[index]));
	}
	
}

function getHTML(params) {
	var post = '<div class="post" id="post"><header><div class="uimg"><img src="img/static_img/user1.png" width="30px" height="30px"></div>';
        post += '<span>'+params["username"]+'</span>';
	post += '<span class="time">'+params["date"]+'</span></header>';
	post += '<img src="uploads/'+params["file_name"]+'" style="width:100%;height:30vh;"></div>';
	return post;
}