<?php
    require_once('functions.php');
    require_once('dbConnection.php');

    $data = $_POST["data"];

   print_r($data);

    $json = json_decode($data,true);
    print_r($data);

   add_to_table($connection,$json);



?>