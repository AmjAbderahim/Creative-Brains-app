<?php
	include 'db.php';
        $idPost = $_GET["idPost"];
        $current_username = $_GET["username"];
        $sql = "SELECT * FROM publication WHERE id='$idPost'";
        $res = mysqli_query($con, $sql);
        $post = mysqli_fetch_assoc($res);
        $sql4 = "SELECT * FROM user WHERE username='$current_username'";
        $res4 = mysqli_query($con, $sql4);
        $user = mysqli_fetch_assoc($res4);
        $sql2 = "SELECT * FROM commentaires WHERE id_publication ='$idPost'";
        $res2 = mysqli_query($con, $sql2);
        $comments = array();
         $sql5 = "SELECT count(id) as 'count' FROM likes WHERE id_publication='$idPost' AND id_user=".$user["id"];
        $res5 = mysqli_query($con, $sql5);
        $like = mysqli_fetch_assoc($res5);
        $isLiked = "notLiked";
        if($like["count"] != 0){
                $isLiked = "liked";
        }
        while($row = mysqli_fetch_assoc($res2)) {
        	$sql3 = "SELECT PhotoProfil FROM profile WHERE id_User=".$row["id_user"];
	        $res3 = mysqli_query($con, $sql3);
	        $photo = mysqli_fetch_assoc($res3);
	        array_push($comments,array("comment" => $row["text"],"photo" => $photo["PhotoProfil"]));
        }

        $sql6 = "SELECT count(id) as 'count' FROM commentaires WHERE id_publication ='$idPost'";
        $res6 = mysqli_query($con, $sql6);
        $commentsCount = mysqli_fetch_assoc($res6);

        $sql3 = "SELECT count(id) as 'count' FROM likes WHERE id_publication ='$idPost'";
        $res3 = mysqli_query($con, $sql3);
        $likes = mysqli_fetch_assoc($res3);

        echo json_encode(array("isLiked" => $isLiked,"post" => $post,"likes"=>$likes["count"],"commentsCount" => $commentsCount["count"],"comments" => $comments));
?>