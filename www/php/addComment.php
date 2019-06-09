<?php
	include 'db.php';
    $idPost = $_GET["idPost"];
    $username = $_GET["username"];
    $comment = $_GET["comment"];
    $sql2 = "SELECT id FROM user where username='$username'";
    $res2 = mysqli_query($con, $sql2);
    $id_user = mysqli_fetch_assoc($res2);
    $id = $id_user["id"];
    $query = "INSERT INTO commentaires(id_user,id_publication,date,text) VALUES('$id','$idPost',now(),'$comment')";
  	mysqli_query($con, $query);

  	echo $idPost;
?>