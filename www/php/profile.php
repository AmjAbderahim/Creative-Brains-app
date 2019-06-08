<?php
include 'db.php';

$errorPass=null;
$choise=$_POST["getData"];
$data=array();
$profile=array();
if(isset($choise)){
if($choise=="UserData"){

//get user info
$q=mysqli_query($con,"select * from `user` where user.id=".$_POST["id"]);
 
 $data[]=mysqli_fetch_object($q);
 

//get related profile with User
$q=mysqli_query($con,"select * from `profile` where id_User=".$_POST["id"]);
 
 $profile[]=mysqli_fetch_object($q);
 

//set profile data as field of user
$data[0]->profile=$profile[0];


//encode data with json
echo json_encode($data[0]);

 }
 
 else if($choise=="UserDataChange"){
	
//update user
	
//get user info
$q=mysqli_query($con,"select * from `user` where user.id=".$_POST["id"]);
$user[]=mysqli_fetch_object($q);

$dataUsr=$_POST["account"];

$testPass="yes";

if($dataUsr["new_pass"]=="" && $dataUsr["confirm_pass"]=="" && $dataUsr["old_pass"]==""){
	$testPass="no";
}

if(trim($dataUsr["username"])=="")
	 $errorPass="User Name is required..!!";
	

else{
if($testPass=="no"){

$q=mysqli_query($con,"UPDATE user SET username='".$dataUsr['username']."',email='".$dataUsr['email']."' where id=".$_POST["id"]);
 

}
else{

if($dataUsr["new_pass"]=="" || $dataUsr["confirm_pass"]=="" || $dataUsr["old_pass"]==""){
$errorPass="You Have an Empty Field !!";
}
	
else if($user[0]->password != md5($dataUsr["old_pass"])){
$errorPass="The old password is incorrect !!";
}
else if($dataUsr["new_pass"] != $dataUsr["confirm_pass"]){
	$errorPass="Password and confirm password does not match !!";
}
else
$q=mysqli_query($con,"UPDATE user SET username='".$dataUsr['username']."',email='".$dataUsr['email']."',password='".md5($dataUsr['new_pass'])."' where id=".$_POST["id"]);
}
}

if($errorPass == null){
 //update profile
 
 	$dataUsr=$_POST["profile"];
	
	if($dataUsr["idProfile"]==""){
		
		$query="INSERT INTO profile(id,id_User,sexe,age,About) 
		VALUES ('','".$_POST['id']."','".$dataUsr['gender']."','".$dataUsr['age']."','".$dataUsr['about']."')";

$q2=mysqli_query($con,$query);
 if($q && $q2){

	$data = [
    "success" => true,
	"id" =>  $con->insert_id
         ];	 
		 
 echo json_encode($data);
 }
 else
 echo json_encode(mysqli_error($con));
			
	}
	else{
		
		$query="UPDATE profile SET sexe='".$dataUsr['gender']."',age='".$dataUsr['age']."',About='".$dataUsr['about']."' where id=".$dataUsr["idProfile"];     

$q2=mysqli_query($con,$query);
		
		if($q && $q2){
			$data = [
    "success" => true
         ];
       echo json_encode($data);
               }
    else
echo json_encode(mysqli_error($con));  } }

//errorMessage
else
	echo json_encode($errorPass);



}

else if($choise=="DeleteProject"){
mysqli_query($con,"DELETE FROM projectUsers WHERE idProject=".$_POST['id']);	
mysqli_query($con,"DELETE FROM Project WHERE id=".$_POST['id']);

if (mysqli_affected_rows($con)>0){
	echo json_encode("deleted");
}
else
echo json_encode(mysqli_error($con));
}
else if($choise=="getProject"){
$q=mysqli_query($con,"select * from `project` where id=".$_POST["id"]);
 
 $data=mysqli_fetch_object($q);

echo json_encode($data);

}
else if($choise=="projectsData"){
$q=mysqli_query($con,"select * from `project` where id_User=".$_POST["id"]." ORDER BY id_User DESC" );
$projects=mysqli_fetch_all($q,MYSQLI_ASSOC);
echo json_encode($projects);
}

else if($choise=="saveProject"){
    $pathUpload='../img/projects/';
	$id = $_POST['id'];
	$file = $_FILES['file'];
	$name = $_POST['name'];
	$id_User = $_POST['id_User'];
	$category = $_POST['category'];
	$description = $_POST['description'];
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
        move_uploaded_file($file_tmp,$pathUpload.basename($file_name));
     $query = "INSERT INTO `project`(`id`, `id_User`, `nom`, `logo`, `description`, `category`, `dateCreation`) VALUES ('$id','$id_User','$name','$file_name','$description','$category',now())";
  		mysqli_query($con, $query);
  		$success = array('success' => true, 'from' => "noDiv", 'to' => "noDiv", 'message' => "Project Saved with success...!!");
        echo json_encode($success);
  	}else{
     	echo json_encode($errors);
  	}
}

else if($choise=="addMemberToProject"){
$falseQuery=0;	
$idp=$_POST['id'];
$users=$_POST['users'];
foreach($users as $item){

$query="INSERT INTO projectUsers(idProject,id_User,etat) VALUES ('$idp','$item','en cours')";
		

$q=mysqli_query($con,$query);
 if(!$q)
 	$falseQuery++;
}

if($falseQuery==0)
 echo json_encode("success");
 else
 echo json_encode(mysqli_error($con));

	}
else if($choise=="addMember"){
	$key=$_POST['val'];
	$idP=$_POST['idP'];
    $array = array();
    $query=mysqli_query($con, "select id,username from user where username LIKE '%{$key}%' and Actived='1' and id not in (select id_User from projectUsers where idProject=$idP) limit 10 ");
    while($row=mysqli_fetch_object($query))
    {
      $array[] = $row;
    }
    echo json_encode($array);
}

else if($choise=="EditProject"){
	$exist = $_POST['isExist'];
    $id = $_POST['id'];
    $name = $_POST['name'];
	$category = $_POST['category'];
	$description = $_POST['description'];
if($exist=="true"){
    $pathUpload='../img/projects/';
	$file = $_FILES['file'];
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

                      }

	$errors = array();
	
	if(empty($errors)=="true"){
      if($exist=="true"){
        move_uploaded_file($file_tmp,$pathUpload.basename($file_name));
     $query="UPDATE project SET nom='$name',logo='$file_name',description='$description',category='$category' WHERE id=$id";
  		$q=mysqli_query($con, $query);
}
else{
     $query ="UPDATE project SET nom='$name',description='$description',category='$category' WHERE id=$id"; 
  		$q=mysqli_query($con, $query);
}
if($q){
 $success = array('success' => true, 'from' => "noDiv", 'to' => "noDiv", 'message' => "Project Saved with success...!!");
        echo json_encode($success);
      }
   else
            echo json_encode(mysqli_error($con));
  	}else{
     	echo json_encode($errors);
  	}
}


}




?>