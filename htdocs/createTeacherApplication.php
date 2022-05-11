<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn-> connect_error) {
		die("Connection failed: " .$conn->connect_error);
}

//pobieranie danych z przeslanego pliku json z react
$user_id=mysqli_real_escape_string($conn, $_POST['user_id']);
$username=mysqli_real_escape_string($conn, $_POST['username']);

//usuwanie kursu
try {
	// $check_email = "SELECT `user_id` FROM `teacher_applications` WHERE `user_id`=:email";
 //            $check_email_stmt = $conn->prepare($check_email);
 //            $check_email_stmt->bindValue(':email', $user_id, PDO::PARAM_STR);
 //            $check_email_stmt->execute();

 //            if ($check_email_stmt->rowCount()) :
 //                $returnData = msg(0, 422, 'Ten adres e-mail jest już używany');

	if (false):
		//

    else:

	$query = "INSERT INTO teacher_applications (`id`, `user_id`, `username`, `status`) VALUES (NULL, '{$user_id}', '{$username}', 0)";
	$query_output = mysqli_query($conn, $query);

	$arr = array('result'=>'podanie zostało złożone');
	echo json_encode($arr);

	endif;
    
}
catch(PDOException $e){
	echo $e;
}

$conn->close();
?>