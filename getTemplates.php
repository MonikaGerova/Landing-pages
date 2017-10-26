<?php
    require_once("dbConnection.php");
    $select = "SELECT name,id,settings,previewPicture from templates";
    $query = $connection->query($select) or die("<h2>failed showing the items of the table!</h2>");

    $templates=array();

    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
    $temp = array("id"=>$row["id"],"name"=>$row["name"],"settings"=>$row["settings"],"preview"=>$row["previewPicture"]);
    array_push($templates, $temp);
    }

    print_r(json_encode($templates));


?>