<?php
header("Access-Control-Allow-Origin: *");
$host = "localhost";
$user = "root";
$password = "";
$dbname = "szkolenia-drony";
$id = '';

$con = mysqli_connect($host, $user, $password, $dbname);

//pobieranie user_id przesyłanego z frontendu
$user_id = $_GET['user'];
$course_id = $_GET['course_id'];
$method = $_SERVER['REQUEST_METHOD'];


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


// zwracanie informacji o produktach
switch ($method) {
  case 'GET':
    $sql = "SELECT user_courses.id AS userCourseId, user_courses.user_id AS userId, user_courses.course_id AS courseId, user_courses.expire_date AS expireDate
              FROM courses 
              INNER JOIN 
              user_courses ON courses.id=user_courses.course_id
              WHERE user_courses.user_id=$user_id AND user_courses.course_id=$course_id
              ORDER BY user_courses.id DESC LIMIT 1";
    break;
}

// run SQL statement
$result = mysqli_query($con, $sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
  if (!$id) echo '[';
  for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
  }
  if (!$id) echo ']';
} else {
  echo mysqli_affected_rows($con);
}

$con->close();
