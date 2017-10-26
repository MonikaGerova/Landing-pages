
<?php
    require_once("dbConnection.php");
    $select = "SELECT * from pages";
    $query = $connection->query($select) or die("<h2>failed showing the items of the table!</h2>");

    $table = "";
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        var_dump($row);
    }

    //echo $table;

?>