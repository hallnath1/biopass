<?php
    
    session_start();
    if(!isset($_SESSION['uName'])){
        header('Location: index.php');
    }

    require 'database.php';
    $db = new Database();
    
    $id = $_POST['id'];
    include 'decode.php';
    if($id != ""){
     
        $sql = "SELECT passKey FROM UserKeys WHERE UserKeysID = :id;";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
        $result = $stmt->execute()->fetchArray();
        echo decode($result['passKey']);
    }
?>