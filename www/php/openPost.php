<?php
	include 'db.php';
        $idPost = $_GET["idPost"];
        $sql = "SELECT * FROM publication WHERE id='$idPost'";
        $res = mysqli_query($con, $sql);
        $post = mysqli_fetch_assoc($res);

        echo json_encode($post);
?>