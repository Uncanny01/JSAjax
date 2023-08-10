<?php

$dbserver = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'ajax';

$connect = mysqli_connect($dbserver, $dbuser, $dbpass, $dbname);

if(!$connect)
{
    die("Something went wrong while connecting to database.");
}

?>