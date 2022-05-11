<?php
header("Access-Control-Allow-Origin: *");
$host = "localhost";
$user = "root";
$password = "";
$dbname = "szkolenia-drony";
$id = '';

$conn = mysqli_connect($host, $user, $password, $dbname);

//pobieranie danych z przeslanego pliku json
$author_id = $_GET['data'];
$method = $_SERVER['REQUEST_METHOD'];


if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
  case 'GET':
    $sql = "SELECT course_events.id AS id, course_events.title AS title, course_events.description AS description, course_events.date AS date, course_events.youtubeLink AS youtubeLink,  courses.title AS courseTitle, courses.id AS courseId FROM course_events INNER JOIN courses ON course_events.course_id=courses.id WHERE courses.author_id=$author_id";
    break;
}

// run SQL statement
$result = mysqli_query($conn, $sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($conn));
}

if ($method == 'GET') {
  if (!$id) echo '[';
  for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
  }
  if (!$id) echo ']';
} else {
  echo mysqli_affected_rows($conn);
}

$conn->close();
