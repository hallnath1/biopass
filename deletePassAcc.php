<?php
    session_start();
    if(!isset($_SESSION['uName'])){
        header('Location: index.php');
    }

    require 'database.php';
    $db = new Database();

    $id = $_POST['id'];

    if($id != ""){
     
        $sql = "DELETE FROM UserKeys WHERE UserKeysID = :id;";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
        $stmt->execute();
    }
?>