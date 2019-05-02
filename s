[1mdiff --git a/www/index.html b/www/index.html[m
[1mindex 5a845de..b116275 100644[m
[1m--- a/www/index.html[m
[1m+++ b/www/index.html[m
[36m@@ -86,6 +86,5 @@[m
                 </form>[m
             </div>[m
         </div>[m
[31m-        <script type="text/javascript " src="cordova.js"></script>[m
[31m-    </body>[m
[32m+[m[32m     </body>[m
 </html>[m
[1mdiff --git a/www/php/Profile.php b/www/php/Profile.php[m
[1mindex 602aeb6..259b855 100644[m
[1m--- a/www/php/Profile.php[m
[1m+++ b/www/php/Profile.php[m
[36m@@ -1,3 +1,10 @@[m
 <?php[m
 include 'db.php';[m
[32m+[m[32m$data=array();[m
[32m+[m[32m$q=mysqli_query($con,"select * from user");[m
[32m+[m[32mwhile ($row=mysqli_fetch_object($q)){[m
[32m+[m[32m $data[]=$row;[m
[32m+[m[32m}[m
[32m+[m[32mecho json_encode($data);[m
[32m+[m
 ?>[m
\ No newline at end of file[m
[1mdiff --git a/www/php/db.php b/www/php/db.php[m
[1mindex 414365e..c121319 100644[m
[1m--- a/www/php/db.php[m
[1m+++ b/www/php/db.php[m
[36m@@ -1,3 +1,4 @@[m
 <?php[m
[32m+[m[32m header("Access-Control-Allow-Origin: *");[m
  $con = mysqli_connect("localhost","root","","cbdb") or die ("could not connect database");[m
 ?>[m
\ No newline at end of file[m
