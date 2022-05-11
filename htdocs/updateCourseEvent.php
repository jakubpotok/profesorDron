<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$event_id = mysqli_real_escape_string($conn, $_POST['event_id']);
$title = mysqli_real_escape_string($conn, $_POST['title']);
$youtubeLink = mysqli_real_escape_string($conn, $_POST['youtubeLink']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$date = mysqli_real_escape_string($conn, $_POST['date']);

try {
  $query = "UPDATE course_events SET title='${title}', description='${description}', date='${date}', youtubeLink='${youtubeLink}' WHERE id=${event_id}";

  $query_output = mysqli_query($conn, $query);
  $arr = array('result' => 'wydarzenie zostało zedytowane');
  echo json_encode($arr);
} catch (PDOException $e) {
  echo $e;
}

$conn->close();
