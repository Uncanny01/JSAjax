<?php

include("connection.php");

$retrieveQuery = "SELECT * FROM js";
$retrieveQuery_run = mysqli_query($connect, $retrieveQuery);

if(mysqli_num_rows($retrieveQuery_run)>0)
{
    $data = array();
    while($rows = mysqli_fetch_assoc($retrieveQuery_run))
    {
        $data[] = $rows;
    }
}

// Conversion of PHP array to json string format

echo json_encode($data);

?>