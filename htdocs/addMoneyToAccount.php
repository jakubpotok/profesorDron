<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn-> connect_error) {
		die("Connection failed: " .$conn->connect_error);
}

//pobieranie danych z przeslanego pliku json z react
$data = json_decode(file_get_contents("php://input"));
$user_id= trim($data->user_id);
$input_money= trim($data->input_money);

//usuwanie podania
try {
	$query = "UPDATE users SET money = money + $input_money WHERE id=$user_id";
	$query_output = mysqli_query($conn, $query);

	$arr = array('result'=>'pomyślnie dodano fundusze do konta');
	echo json_encode($arr);
    
}
catch(PDOException $e){
	echo $e;
}

$conn->close();
?>