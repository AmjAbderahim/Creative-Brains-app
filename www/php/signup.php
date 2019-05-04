<?php
	include 'db.php';
	$username = $_POST['username-signup'];
	$email=$_POST['email'];
	$password=$_POST['password-signup'];
	$confirmed_password=$_POST['confirm-password'];
	$errors = array();

	if (empty($username)) { array_push($errors, "Username is required"); }
  	if (empty($email)) { array_push($errors, "Email is required"); }
  	else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  		array_push($errors, "Invalid email format");
	}
  	if (empty($password)) { array_push($errors, "Password is required"); }
  	if ($password != $confirmed_password) {
		array_push($errors, "The two passwords do not match");
  	}
  	
  	$user_check_query = "SELECT * FROM user WHERE username='$username' OR email='$email' LIMIT 1";
  	$result = mysqli_query($con, $user_check_query);
  	$user = mysqli_fetch_assoc($result);
  	if ($user) {
	    if ($user['username'] === $username) {
	      array_push($errors, "Username already exists");
	    }
	    if ($user['email'] === $email) {
	      array_push($errors, "email already exists");
	    }
 	}
  	if(!empty($errors)){
  		echo json_encode($errors);
  	}else{
  		$passwordEncy = md5($password);//encrypt the password before saving in the database
  		$verification_code = rand(1000,9999);
  		//E-mail party
  		$to      = $email; // Send email to our user
		$subject = 'E-mail Verification'; // Give the email a subject 
		$message = '
		Thanks for signing up!
		Your account has been created, you can login with the following credentials after you have activated your account by the code below.
		 
		------------------------
		Username: '.$username.'
		Password: '.$password.'
		------------------------
		 
		This is your Verification Code:
		'.$verification_code.'
		 
		'; // Our message above including the link
		                     
		$headers = 'From:galaxy.darbouz@gmail.com' . "\r\n"; // Set from headers
		mail($to, $subject, $message, $headers); // Send our email
  		$query = "INSERT INTO user(username,password,email,Actived,creativity,verification_code) VALUES('$username','$passwordEncy','$email',0,0,'$verification_code')";
  		mysqli_query($con, $query);
  		echo "success";
  	}
?>