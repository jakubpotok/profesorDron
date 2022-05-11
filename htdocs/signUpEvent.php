<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
$event_id = mysqli_real_escape_string($conn, $_POST['event_id']);
$course_id = mysqli_real_escape_string($conn, $_POST['course_id']);

try {

	$query = "INSERT INTO `user_events` (`id`, `user_id`, `event_id`, `course_id`) VALUES (NULL, '{$user_id}', '{$event_id}', '{$course_id}')";
	$query_output = mysqli_query($conn, $query);

	$arr = array('result' => 'pomyślnie zapisano do wydarzenia');
	echo json_encode($arr);
} catch (PDOException $e) {
	echo $e;
}

$conn->close();
