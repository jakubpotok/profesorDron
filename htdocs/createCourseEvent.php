<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$course_id = mysqli_real_escape_string($conn, $_POST['course_id']);
$title = mysqli_real_escape_string($conn, $_POST['title']);
$youtubeLink = mysqli_real_escape_string($conn, $_POST['youtubeLink']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$date = mysqli_real_escape_string($conn, $_POST['date']);

try {
	//dodaje do tabeli nowe wydarzenie
	$query = "INSERT INTO `course_events` (`id`, `course_id`, `title`, `description`, `date`, `youtubeLink`) VALUES (NULL, '{$course_id}', '{$title}', '{$description}', '{$date}', '${youtubeLink}')";
	$query_output = mysqli_query($conn, $query);
	$arr = array('result' => 'wydarzenie zostało dodane');
	echo json_encode($arr);
} catch (PDOException $e) {
	echo $e;
}

$conn->close();
