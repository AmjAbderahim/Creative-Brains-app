<?php
	include 'db.php';
	$errors = array();
	$codeVerification = $_POST['codeVerification'];
	$user_check_query = "SELECT * FROM user WHERE username=".$_POST['username']." LIMIT 1";
	$result = mysqli_query($con, $user_check_query);
  	$user = mysqli_fetch_assoc($result);
  	if($user){
  		if($user["verification_code"] == $codeVerification){
  			mysqli_query($con,"UPDATE `user` SET `Actived`=1 where `id`=".$user['id']);
  		}else{
  			array_push($errors, "Verification Code don't much");
  		}
  	}
  	echo "success";
?>