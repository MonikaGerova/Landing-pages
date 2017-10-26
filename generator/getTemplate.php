<?php
    require_once("../dbConnection.php");
    $id = $_GET["id"];
        $select = "SELECT content from templates where id=".$id;
        $query = $connection->query($select) or die("<h2>failed showing the items of the table!</h2>");

        print_r($query->fetch(PDO::FETCH_ASSOC)["content"]);

?>