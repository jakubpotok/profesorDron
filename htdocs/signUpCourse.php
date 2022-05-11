<?php

header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn-> connect_error) {
		die("Connection failed: " .$conn->connect_error);
}

$user_id=mysqli_real_escape_string($conn, $_POST['user_id']);
$course_id=mysqli_real_escape_string($conn, $_POST['course_id']);
$expire_date=mysqli_real_escape_string($conn, $_POST['expire_date']);
$buyer_id=mysqli_real_escape_string($conn, $_POST['buyer_id']);
$author_id=mysqli_real_escape_string($conn, $_POST['author_id']);
$money=mysqli_real_escape_string($conn, $_POST['money']);

try {

	// $check_if_exists = "SELECT * FROM `user_courses` WHERE `user_id`=$user_id AND `course_id`=$course_id";
 //    $check_if_exists_stmt = $conn->prepare($check_if_exists);
 //    $check_if_exists_stmt->execute();

    // if ($check_if_exists_stmt->rowCount()) :
    // 	$returnData = msg(0, 422, 'Jesteś zapisany już do tego kursu');

    // if (mysqli_query($conn, "SELECT * FROM user_courses WHERE user_id=$user_id AND course_id=$course_id LIMIT 1")){
    //     //my_column exists in my_table
    //     // $returnData = msg(0, 422, 'Jesteś zapisany już do tego kursu');
    // }

    // else:

	$query = "INSERT INTO `user_courses` (`id`, `user_id`, `course_id`, `expire_date`) VALUES (NULL, '{$user_id}', '{$course_id}', '{$expire_date}')";
	$query_output = mysqli_query($conn, $query);

	// dodawanie pieniedzy autorowi kursu
	$query2 = "UPDATE users SET money = money + $money WHERE id=$author_id";
	$query2_output = mysqli_query($conn, $query2);

	// odejmowanie pieniedzy kupujacemu
	$query3 = "UPDATE users SET money = money - $money WHERE id=$buyer_id";
	$query3_output = mysqli_query($conn, $query3);

	$arr = array('result'=>'pomyślnie zapisano do kursu');
	echo json_encode($arr);

	// endif;
    
}
catch(PDOException $e){
	echo $e;
}

$conn->close();
?>