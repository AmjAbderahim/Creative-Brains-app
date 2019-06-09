<?php
	include 'db.php';
    $keyword = $_GET["keyword"];

    $sql2 = "SELECT * FROM user where username like '%$keyword%'";
    $res2 = mysqli_query($con, $sql2);
    $users = array();
    if (mysqli_num_rows($res2) > 0) {
	    while($row = $res2->fetch_assoc()) {
	    	$sql = "SELECT * FROM profile where id_User=".$row["id"];
    		$res = mysqli_query($con, $sql);
    		$profile = mysqli_fetch_assoc($res);
	        array_push($users,array("id" => $row["id"],"username" => $row["username"],"photo"=>$profile["PhotoProfil"]));
	    }
	}

	echo json_encode($users);
?>