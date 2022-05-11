<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn-> connect_error) {
		die("Connection failed: " .$conn->connect_error);
}

//pobieranie danych z przeslanego pliku json z react
$data = json_decode(file_get_contents("php://input"));
$course_id= trim($data->course_id);

//usuwanie kursu
try {
	$query = "DELETE FROM courses WHERE id=$course_id";
	$query_output = mysqli_query($conn, $query);

	//usuwa obecne wydarzenia z usuwanego kursu
	$query2 = "DELETE FROM course_events WHERE course_id=$course_id";
	$query2_output = mysqli_query($conn, $query2);

	$arr = array('result'=>'kurs został usunięty');
	echo json_encode($arr);
    
}
catch(PDOException $e){
	echo $e;
}

$conn->close();
?>