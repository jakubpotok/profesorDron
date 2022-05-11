<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));
$user_id = trim($data->user_id);

try {
  $query = "UPDATE users SET role='0' WHERE id=${user_id}";

  $query_output = mysqli_query($conn, $query);
  $arr = array('result' => 'permisje został odebrane');
  echo json_encode($arr);
} catch (PDOException $e) {
  echo $e;
}

$conn->close();
