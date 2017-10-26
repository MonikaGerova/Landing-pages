<?php
    require_once("dbConnection.php");
    $select = "SELECT name,id from pages";
    $query = $connection->query($select) or die("<h2>failed showing the items of the table!</h2>");

    $names=array();

    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
    $temp = array("id"=>$row["id"],"name"=>$row["name"]);
    array_push($names, $temp);
    }

    print_r(json_encode($names));

?>