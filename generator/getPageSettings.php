<?php
    require_once("../dbConnection.php");
    $id = $_GET["id"];

    $select = "SELECT * from pages WHERE id=".$id;
    $query = $connection->query($select) or die("<h2>failed showing the items of the table!</h2>");

    $result = $query->fetch(PDO::FETCH_ASSOC);
    $contactsA = explode(";",$result["contacts"]);

    $contactsArray = array();
    foreach($contactsA as $key=>$contact){
        $contactsArray[$key]= explode("-",$contact);
    }

     $result["contacts"] = $contactsArray;
    print_r(json_encode($result));
?>