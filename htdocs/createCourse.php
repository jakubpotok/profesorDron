<?php 
header('Access-Control-Allow-Origin: *');


$conn = new mysqli("localhost", "root", "", "szkolenia-drony");

if ($conn-> connect_error) {
		die("Connection failed: " .$conn->connect_error);
}

// Jeżeli plik został wybrany to sprawdza czy może zostać dodany do bazy danych
if(isset($_FILES['image'])) {
    $errors     = array();
    $maxsize    = 2097152;
    $acceptable = array(
        'image/jpeg',
        'image/jpg',
        'image/png'
    );

    //Jeżeli plik większy niż 2MB
    if(($_FILES['image']['size'] >= $maxsize) || ($_FILES["image"]["size"] == 0)) {
        $errors[] = 'Przesłany plik jest za duży. Plik musi mieć mniej niż 2MB.';
    }

    //Jeżeli plik nie jest JPG lub PNG
    if((!in_array($_FILES['image']['type'], $acceptable)) && (!empty($_FILES["image"]["type"]))) {
        $errors[] = 'Nieprawidłowy typ pliku. Tylko pliki JPG i PNG są akceptowalne.';
    }

    //Jeżeli wszystko się zgadza to dodaje cały produkt do bazy danych
    if(count($errors) === 0) {
        // //dodawanie zdjecia
        $files=$_FILES['image'];
        $filename=$files['name'];
        $templocation = $files['tmp_name'];

        $splitname = explode('.', $filename);
        $fileextension = strtolower(end($splitname));

        $new_file_name = uniqid().'.'.$fileextension;
        $file_destination = 'images/courses/'.$new_file_name;
        if (move_uploaded_file($templocation, $file_destination)) {
            echo "uploaded";
        }
        
        $author_id=mysqli_real_escape_string($conn, $_POST['author_id']);
        $author=mysqli_real_escape_string($conn, $_POST['author']);
        $title=mysqli_real_escape_string($conn, $_POST['title']);
        $description=mysqli_real_escape_string($conn, $_POST['description']);
		$price=mysqli_real_escape_string($conn, $_POST['price']);

		$query1 = "INSERT INTO `courses` (`author_id`, `author`, `title`, `description`, `price`, `image`) VALUES ('{$author_id}', '{$author}', '{$title}', '{$description}', '{$price}', '{$new_file_name}')";
		$query1_output = mysqli_query($conn, $query1);
		$arr = array('result'=>'Kurs został utworzony');
		echo json_encode($arr);
    } else {
        foreach($errors as $error) {
            echo ';<script>alert("'.$error.'");</script>;';
        }

        die(); //Ensure no more processing is done
    }
}

$conn->close();
?>