<?php
header("Access-Control-Allow-Origin: *");
$host = "localhost";
$user = "root";
$password = "";
$dbname = "szkolenia-drony";
$id = '';

$conn = mysqli_connect($host, $user, $password, $dbname);

//pobieranie danych z przeslanego pliku json
$user_id = $_GET['data'];
$method = $_SERVER['REQUEST_METHOD'];


if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
  case 'GET':
    $sql = "SELECT user_events.id AS id, user_events.event_id AS eventId, user_events.user_id AS userId, user_events.course_id AS courseId, course_events.title AS title, course_events.description AS description, course_events.date AS date, courses.title AS courseTitle, course_events.youtubeLink AS youtubeLink
    FROM user_events 
    INNER JOIN course_events ON user_events.event_id=course_events.id
    INNER JOIN courses ON user_events.course_id=courses.id WHERE user_events.user_id=$user_id 
    GROUP BY event_id";
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
