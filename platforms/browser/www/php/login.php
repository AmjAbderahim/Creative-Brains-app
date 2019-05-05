<?php
	include 'db.php';
	$username = $_POST['username'];
	$password=md5($_POST['password']);
	$sql = "SELECT * FROM user WHERE username='$username' and password='$password'";
	$result = mysqli_query($con,$sql);
    $user = mysqli_fetch_assoc($result);
  	
	if($user) {
		if($user["Actived"] == 1){
			$success = array('success' => true, 'from' => "login", 'to' => "home",'user' => $user);
  			echo json_encode($success);
		}else{
			$error = array('notVerified' => true,'message' => "Your account is not active, please active it and try again.");
	 		echo json_encode($error);
		}
	}else {
	 	$error = array("Your Login Name or Password is invalid");
	 	echo json_encode($error);
	}
?>