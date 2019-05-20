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

$q=mysqli_query($con,"UPDATE user SET userName='".$dataUsr['username']."',email='".$dataUsr['email']."' where id=".$_POST["id"]);
 

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
$q=mysqli_query($con,"UPDATE user SET userName='".$dataUsr['username']."',email='".$dataUsr['email']."',password='".md5($dataUsr['new_pass'])."' where id=".$_POST["id"]);
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



}}}



?>