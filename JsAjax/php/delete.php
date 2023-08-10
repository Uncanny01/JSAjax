<?php

include("connection.php");

$myData = file_get_contents("php://input");
$data = json_decode($myData, true);

$id = $data["sid"];

$deleteQuery = "DELETE from js where id = '$id'";
$deleteQuery_run = mysqli_query($connect, $deleteQuery);

if($deleteQuery_run)
{
    echo "Student deleted successfully.";
}
else
{
    echo "Error deleting student data.";
}
?>