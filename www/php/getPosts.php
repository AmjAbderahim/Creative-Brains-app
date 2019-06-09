<?php
	include 'db.php';
        $current_username = $_GET["username"];
        $sql = "SELECT * FROM publication";
        $res = mysqli_query($con, $sql);
        $data = array();
        while($row = mysqli_fetch_assoc($res)) {
                $sql2 = "SELECT username FROM user where id=".$row["id_user"];
                $res2 = mysqli_query($con, $sql2);
                $username = mysqli_fetch_assoc($res2);
                /*$sql3 = "SELECT PhotoProfil FROM user where id_User=".$row["id_user"];
                $res3 = mysqli_query($con, $sql3);
                $photo = mysqli_fetch_assoc($res3);*/
                $diff = time_since(strtotime($row["date"]));
                $sql3 = "SELECT count(id) as 'count' FROM likes WHERE id_publication =".$row["id"];
                $res3 = mysqli_query($con, $sql3);
                $likes = mysqli_fetch_assoc($res3);

                $sql4 = "SELECT * FROM user WHERE username='$current_username'";
                $res4 = mysqli_query($con, $sql4);
                $user = mysqli_fetch_assoc($res4);

                $sql5 = "SELECT count(id) as 'count' FROM likes WHERE id_publication=".$row["id"]." AND id_user=".$user["id"];
                $res5 = mysqli_query($con, $sql5);
                $like = mysqli_fetch_assoc($res5);
                $isLiked = "notLiked";
                if($like["count"] != 0){
                        $isLiked = "liked";
                }
                array_push($data, array("id" => $row["id"],"username"=>$username["username"],"status" => $row["status"],"date" => $diff,"id_categorie" => $row["id_categorie"],"id_user" => $row["id_user"],"file_name" => $row["file_name"],"count" => $likes["count"],"isLiked" => $isLiked));

        }
        echo json_encode($data);

        function time_since ( $start )
        {
                $end = time();
                $diff = $end - $start;
                $days = floor ( $diff/86400 ); //calculate the days
                $diff = $diff - ($days*86400); // subtract the days
                $hours = floor ( $diff/3600 ); // calculate the hours
                $diff = $diff - ($hours*3600); // subtract the hours
                $mins = floor ( $diff/60 ); // calculate the minutes
                $diff = $diff - ($mins*60); // subtract the mins
                $secs = $diff; // what's left is the seconds;
                if ($secs!=0) 
                {
                        $secs .= "s";
                        if ($secs=="1s") $secs = "1s"; 
                }
                else $secs = '';
                if ($mins!=0) 
                {
                        $mins .= "m ";
                        if ($mins=="1m ") $mins = "1m "; 
                        $secs = '';
                }
                else $mins = '';
                if ($hours!=0) 
                {
                        $hours .= "h ";
                        if ($hours=="1h ") $hours = "1h ";             
                        $secs = '';
                }
                else $hours = '';
                if ($days!=0) 
                {
                        $days .= "d "; 
                        if ($days=="1d ") $days = "1d ";                
                        $mins = '';
                        $secs = '';
                        if ($days == "-1d ") {
                        $days = $hours = $mins = '';
                        $secs = "less than 10 seconds";
                        }
                }
                else $days = '';
                return "$days$hours$mins$secs";
        }
?>