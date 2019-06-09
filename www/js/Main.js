
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


//simple Alerts
function AlertSimple(title,message,type){
	Swal.fire({
	 title:title,
	 text:message,
	 type:type
	});
}

$(document).ready(function(e){
	$.ajaxSetup({cache:false});
	getPosts();
	setInterval(function(){getPosts()},100000);
});

function getPosts(){
	var form = new Form();
	form.doGet("getPosts.php?username="+window.localStorage.getItem("username"),successGetPosts);
}

function successGetPosts(result) {
	result = JSON.parse(result);
	$("#Creations").html("");
	for (var index = 0; index < result.length; index++) {
		$("#Creations").append(getHTML(result[index]));
	}
	
}

function getHTML(params) {
	var post = '<div class="post" id="post"><div onclick="openPost('+params["id"]+')"><header><div class="uimg"><img src="img/static_img/user.png" width="30px" height="30px"></div>';
        post += '<span>'+params["username"]+'</span>';
	post += '<span class="time">'+params["date"]+'</span></header>';
	post += '<img class="postImage" src="uploads/'+params["file_name"]+'">';
	post += '<p class="postText">'+params["status"]+'</p>';
	post += '</div><div class="feedback"><span onclick="openPost('+params["id"]+')"> '+params["comments"]+' <i class="fas fa-comments"></i></span>';
    post += '<span class="'+params["isLiked"]+'" onclick="like('+params["id"]+')" id="'+params["id"]+'"><span id="likesNumber-'+params["id"]+'">'+params["count"]+'</span> <i class="fas fa-sign-language"></i></span></div></div>';
	return post;
}

getPosts()
function likeSuccess (result) {
	console.log(result);
}

function currentProfile () {
	var form = new Form();
	form.doGet("getCurrentProfile.php?username="+window.localStorage.getItem("username"),currentProfileSuccess);
}

function currentProfileSuccess (result) {
	console.log(result);
	result = JSON.parse(result);
	console.log(result);
	document.getElementById("imgUsername").innerHTML = "<img src='img/static_img/"+result["profile"]["PhotoProfil"]+"' width='80px' height='80px'><br><span>"+result["user"]["username"]+"</span>";
	document.getElementById("countPosts").innerHTML = result["posts"].length;
	for (var i = 0; i < result["posts"].length; i++) {
		document.getElementById("masonry").innerHTML += "<div class='item'><img src='uploads/"+ result["posts"][i]["file_name"] +"' onclick='openPost("+result["posts"][i]["id"]+");'></div>";
	}
	document.getElementById("newPostUsername").innerHTML = result["user"]["username"]; // hadi dnew post mais 7chitha hna :)
}

currentProfile ();
function search () {
	var keyWord = document.getElementById("searchField").value;
	var form = new Form();
	form.doGet("searchUsers.php?keyword="+keyWord,searchSuccess);
}

function searchSuccess (result) {
	console.log(result);
	result = JSON.parse(result);
	document.getElementById("searchedResult").innerHTML = "";
	for (var i = 0; i < result.length; i++) {
		document.getElementById("searchedResult").innerHTML += "<div id='resultSearch' onclick='profile("+result[i]["id"]+")'><div class='uimg'><img src='img/static_img/"+result[i]["photo"]+"' width='40px' height='40px'></div><span>"+result[i]["username"]+"</span></div><hr>";
	
	}
}
