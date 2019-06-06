
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
	setInterval(function(){getPosts()},5000);
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
	var post = '<div class="post" id="post"><div onclick=\'openPost("11.jpg")\'><header><div class="uimg"><img src="img/static_img/user1.jpg" width="30px" height="30px"></div>';
        post += '<span>'+params["username"]+'</span>';
	post += '<span class="time">'+params["date"]+'</span></header>';
	post += '<img src="uploads/'+params["file_name"]+'" class="postImage"></div>';
	post += '<p class="postText">' + params["status"] + '</p></div>';
	post += '<div class="feedback"><span onclick=\'openPost("11.jpg")\'>12 <i class="fas fa-comments"></i></span>';
	post += '<span onclick=\'like("1001")\' id="1001"><span id="likesNumber-1001">63</span> <i class="fas fa-sign-language"></i></span>';
	post += '</div></div>';
	return post;
}
