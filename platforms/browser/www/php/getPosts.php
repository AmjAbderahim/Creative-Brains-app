<?php
	include 'db.php';
        
        $sql = "SELECT * FROM publication LIMIT 10";
        $res = mysqli_query($con, $sql);
        $posts = mysqli_fetch_array($res);
          
        echo json_encode($posts);
?>