<?php
	include 'db.php';
	$email=$_POST['email'];
	$sql = "SELECT * FROM user WHERE email='$email'";
	$result = mysqli_query($con,$sql);
    $user = mysqli_fetch_assoc($result);
    if($user){
  		$password = rand(10000,99999);
  		$passwordEncy = md5($password);
  		//E-mail party
  		$to      = $email; // Send email to our user
		$subject = 'Password forgoten'; // Give the email a subject 
		$message = '
		This is your new password :
		'.$password.'
		and please change it as soon as posible.
		'; // Our message above including the link

		$headers = 'From:galaxy.darbouz@gmail.com' . "\r\n"; // Set from headers
		mail($to, $subject, $message, $headers); // Send our email
  		$query = "UPDATE `user` SET `password`='$passwordEncy' where `id`=".$user['id'];
  		mysqli_query($con, $query);
  		$success = array('success' => true, 'from' => "reset-password", 'to' => "login", 'message' => "Please Check your E-mail");
  		echo json_encode($success);
    }else{
    	$error = array("Your E-mail is invalid,please check that you are already sign-up");
	 	echo json_encode($error);
    }
?>