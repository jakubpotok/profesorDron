<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$id = mysqli_real_escape_string($conn, $_POST['id']);

try {

  $query = "DELETE FROM course_events WHERE id=$id";
  $query_output = mysqli_query($conn, $query);

  $arr = array('result' => 'pomyślnie usunięto wydarzenie');
  echo json_encode($arr);
} catch (PDOException $e) {
  echo $e;
}

$conn->close();
