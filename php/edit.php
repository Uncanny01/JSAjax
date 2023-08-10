<?php

include("connection.php");

$myData = file_get_contents("php://input");
$data = json_decode($myData, true);

$id = $data["sid"];

$editQuery = "SELECT * from js where id = '$id'";
$editQuery_run = mysqli_query($connect, $editQuery);

$rows = mysqli_fetch_assoc($editQuery_run);

echo json_encode($rows);


?>