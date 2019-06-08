<?php
	include 'db.php';
	$post_id = $_GET["id"];
	$username = $_GET["username"];

	$sql2 = "SELECT id FROM user where username='$username'";
    $res2 = mysqli_query($con, $sql2);
    $id_user = mysqli_fetch_assoc($res2);
    $id=$id_user["id"];

	$sql = "DELETE FROM likes WHERE id_user='$id' AND id_publication=$post_id";
	mysqli_query($con, $sql);

	echo "success";
?>