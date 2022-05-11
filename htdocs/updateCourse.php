<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$course_id = mysqli_real_escape_string($conn, $_POST['course_id']);
$title = mysqli_real_escape_string($conn, $_POST['title']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$price = mysqli_real_escape_string($conn, $_POST['price']);

try {
  $query = "UPDATE courses SET title='${title}', description='${description}', price='${price}' WHERE id=${course_id} ";

  $query_output = mysqli_query($conn, $query);
  $arr = array('result' => 'kurs został zedytowany');
  echo json_encode($arr);
} catch (PDOException $e) {
  echo $e;
}

$conn->close();
