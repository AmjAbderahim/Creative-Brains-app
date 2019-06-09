<?php
	include 'db.php';
	$text = $_POST['text'];
	$file = $_FILES['file'];
	$username = $_POST['username'];
	$errors = array();
	$file_name = $file['name'];
	$file_size =$file['size'];
	$file_tmp =$file['tmp_name'];
	$file_type=$file['type'];
	$exploded = explode('.',$file_name);
	$file_ext=strtolower(end($exploded));
	  
	$extensions= array("jpeg","jpg","png","mp4","amv");

	if ( 0 < $file['error'] ) {
        array_push($errors, $file['error']);
    }
	if(in_array($file_ext,$extensions)=== false){
		array_push($errors, "Extension not allowed, please choose an Image/Video file.");
    }
    if($file_size > 50097152){
        array_push($errors,'File size must be small than 50MB');
    }
	if(empty($errors)==true){
        move_uploaded_file($file_tmp, '../uploads/' . $file_name);
        $sql = "SELECT * FROM user WHERE username='$username'";
		$result = mysqli_query($con,$sql);
		$user = mysqli_fetch_assoc($result);
		$date = date("\l jS \of F Y h:i:s A");
		$id = $user['id'];
        $query = "INSERT INTO publication(status,date,id_categorie,id_user,file_name) VALUES('$text','$date',0,'$id','$file_name')";
  		mysqli_query($con, $query);
  		$success = array('success' => true, 'from' => "newPost", 'to' => "home", 'message' => "");
        echo json_encode($success);
  	}else{
     	echo json_encode($errors);
  	}
	
?>