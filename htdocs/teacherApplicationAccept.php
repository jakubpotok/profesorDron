<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn-> connect_error) {
		die("Connection failed: " .$conn->connect_error);
}

//pobieranie danych z przeslanego pliku json z react
$data = json_decode(file_get_contents("php://input"));
$user_id= trim($data->user_id);

try {
	// usuwanie podania
	$query = "DELETE FROM teacher_applications WHERE user_id=$user_id";
	$query_output = mysqli_query($conn, $query);

	// dodawanie roli nauczyciela
	$query2 = "UPDATE users SET role=1 WHERE id=$user_id";
	$query2_output = mysqli_query($conn, $query2);

	$arr = array('result'=>'podanie zostało odrzucone');
	echo json_encode($arr);
    
}
catch(PDOException $e){
	echo $e;
}

$conn->close();
?>