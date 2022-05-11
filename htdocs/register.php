<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

//DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

    $returnData = msg(0, 404, 'Page Not Found!');

elseif (
    !isset($data->name)
    || !isset($data->email)
    || !isset($data->password)
    || empty(trim($data->name))
    || empty(trim($data->email))
    || empty(trim($data->password))
) :

    $fields = ['fields' => ['name', 'email', 'password']];
    $returnData = msg(0, 422, 'Wypełnij wszystkie pola', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

    $name = trim($data->name);
    $email = trim($data->email);
    $password = trim($data->password);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 422, 'Niepoprawny adres e-mail');

    elseif (strlen($password) < 5) :
        $returnData = msg(0, 422, 'Hasło musi składać się z przynajmniej 5 znaków');

    elseif (strlen($name) < 3) :
        $returnData = msg(0, 422, 'Imie musi składać się z przynajmniej 3 znaków');

    else :
        try {

            $check_email = "SELECT `email` FROM `users` WHERE `email`=:email";
            $check_email_stmt = $conn->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            if ($check_email_stmt->rowCount()) :
                $returnData = msg(0, 422, 'Ten adres e-mail jest już używany');

            // $check_name = "SELECT `name` FROM `users` WHERE `name`=:name";
            // $check_name_stmt = $conn->prepare($check_name);
            // $check_name_stmt->bindValue(':name', $name, PDO::PARAM_STR);
            // $check_name_stmt->execute();

            // elseif ($check_name_stmt->rowCount()) :
            //     $returnData = msg(0, 422, 'Ta nazwa użytkownika jest już');

            else :
                $insert_query = "INSERT INTO `users`(`name`,`email`,`password`) VALUES(:name,:email,:password)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'Zarejestrowano pomyślnie');

            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;
endif;

echo json_encode($returnData);