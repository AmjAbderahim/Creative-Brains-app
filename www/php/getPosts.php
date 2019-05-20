<?php
	include 'db.php';
        
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
                array_push($data, array("id" => $row["id"],"username"=>$username["username"],"status" => $row["status"],"date" => $diff,"id_categorie" => $row["id_categorie"],"id_user" => $row["id_user"],"file_name" => $row["file_name"]));

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
                        $secs .= " seconds";
                        if ($secs=="1 seconds") $secs = "1 second"; 
                }
                else $secs = '';
                if ($mins!=0) 
                {
                        $mins .= " mins ";
                        if ($mins=="1 mins ") $mins = "1 min "; 
                        $secs = '';
                }
                else $mins = '';
                if ($hours!=0) 
                {
                        $hours .= " hours ";
                        if ($hours=="1 hours ") $hours = "1 hour ";             
                        $secs = '';
                }
                else $hours = '';
                if ($days!=0) 
                {
                        $days .= " days "; 
                        if ($days=="1 days ") $days = "1 day ";                 
                        $mins = '';
                        $secs = '';
                        if ($days == "-1 days ") {
                        $days = $hours = $mins = '';
                        $secs = "less than 10 seconds";
                        }
                }
                else $days = '';
                return "$days $hours $mins $secs ago";
        }
?>