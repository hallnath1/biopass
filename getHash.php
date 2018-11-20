<?php
    
    require 'database.php';
    $db = new Database();


    $uName = $_GET["uName"];
    $sql = "SELECT hash, salt FROM Users WHERE userName = :uName;";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':uName', $uName, SQLITE3_TEXT);
    $result = $stmt->execute()->fetchArray();

    $obj->hash = $result['hash'];
    $obj->salt = $result['salt'];
    echo json_encode($obj);
?>
