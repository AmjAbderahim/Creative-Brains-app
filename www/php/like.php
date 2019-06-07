<?php
	include 'db.php';
	$post_id = $_GET["id"];
	$username = $_GET["username"];
	echo $username;
	$sql2 = "SELECT id FROM user where username='$username'";
    $res2 = mysqli_query($con, $sql2);
    $id_user = mysqli_fetch_assoc($res2);
    $id=$id_user["id"];
    $sql = "INSERT INTO likes(id_user,id_publication,date) VALUES('$id','$post_id',now())";
    mysqli_query($con, $sql);
?>