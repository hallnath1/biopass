<?php
    
    session_start();
    if(!isset($_SESSION['uName'])){
        header('Location: index.php');
    }

    require 'database.php';
    $db = new Database();

    $uName = $_SESSION["uName"];

    $site = $_POST['site'];
    $accName = $_POST["userName"];
    include 'encode.php';
    $password = encode($_POST["password"]);

    if($site != "" && $accName !="" && $password!=""){
        $sql = "SELECT UserID FROM Users WHERE userName = :username;";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':username', $uName, SQLITE3_TEXT);
        $userID = ($stmt->execute()->fetchArray())[0];

        $sql = "INSERT INTO UserKeys VALUES (null, :userID, :site, :accName, :pass);";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':userID', $userID, SQLITE3_INTEGER);
        $stmt->bindValue(':site', $site, SQLITE3_TEXT);
        $stmt->bindValue(':accName', $accName, SQLITE3_TEXT);
        $stmt->bindValue(':pass', $password, SQLITE3_TEXT);
        $stmt->execute();
        echo $password;
    }
    else{
        echo " ";
    }
?>