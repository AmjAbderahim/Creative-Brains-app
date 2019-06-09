<?php
	include 'db.php';
    $current_username = $_GET["username"];
    $sql2 = "SELECT * FROM user where username='$current_username'";
    $res2 = mysqli_query($con, $sql2);
    $user = mysqli_fetch_assoc($res2);

    $sql3 = "SELECT * FROM profile where id_User=".$user["id"];
    $res3 = mysqli_query($con, $sql3);
    $profile = mysqli_fetch_assoc($res3);

    $sql4 = "SELECT * FROM publication where id_user=".$user["id"];
    $res4 = mysqli_query($con, $sql4);

    $posts = array();
    if (mysqli_num_rows($res4) > 0) {
	    while($row = $res4->fetch_assoc()) {
	        array_push($posts,$row);
	    }
	}

    echo json_encode(array('user' => $user, 'profile' => $profile, 'posts' => $posts));

?>