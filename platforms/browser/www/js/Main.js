var signup = new SignUp();
var user;
function showLoader () {
	$(".loader").css("display","block");
}

function hideLoader () {
	$(".loader").css("display","none");
}
function currentUser () {
	return username;
}