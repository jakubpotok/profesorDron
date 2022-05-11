<?php
header("Access-Control-Allow-Origin: *");
$host = "localhost"; 
$user = "root"; 
$password = ""; 
$dbname = "szkolenia-drony"; 
$id = '';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$userId = $_GET['data'];
$method = $_SERVER['REQUEST_METHOD'];


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


// zwracanie informacji o produktach
switch ($method) {
    case 'GET':
      $sql = "SELECT status
              FROM teacher_applications 
              WHERE user_id=$userId"; 
      break;
}
 
// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}else {
    echo mysqli_affected_rows($con);
}
 
$con->close();