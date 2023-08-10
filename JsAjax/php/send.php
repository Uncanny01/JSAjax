<?php

include("connection.php");

$data = stripslashes(file_get_contents("php://input"));
$myData = json_decode($data, true);

$fname = $myData['fname'];
$lname = $myData['lname'];
$mail = $myData['mail'];
$pass = $myData['password'];    

// $hash = "$1$10$";
// $password = crypt($pass, $hash);

$insertQuery = "INSERT INTO js(fname, lname, mail, password) VALUES('$fname', '$lname', '$mail', '$pass')";

$insertQuery_run = mysqli_query($connect, $insertQuery);

if($insertQuery_run)
{
    echo "Student saved successfully.";
}
else
{
    echo "Error saving student data.";
}

?>