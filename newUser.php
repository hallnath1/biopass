<?php
    require 'sha256.php';
    require 'database.php';
    $db = new Database();

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
	

    $fName = $_GET["fName"];
    $uName = $_GET["uName"];
    $hash = $_GET["hash"];

    $sql = "SELECT * FROM Users WHERE userName = :username;";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':username', $uName, SQLITE3_TEXT);
    $result = $stmt->execute()->fetchArray();

    if(($result == null) && ($fName != null) && ($uName != null) && ($hash != null)){
        //Hash a hash
        $salt = sha1(time());
        $hashS = SHA256::hashing($salt."--".$hash);
        $sql = "INSERT INTO Users VALUES (null, :uName, :fName, :hash, :salt);";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':uName', $uName, SQLITE3_TEXT);
        $stmt->bindValue(':fName', $fName, SQLITE3_TEXT);
        $stmt->bindValue(':hash', $hashS, SQLITE3_TEXT);
        $stmt->bindValue(':salt', $salt, SQLITE3_TEXT);
        $stmt->execute();
	echo "Completed";
    }
    else{
        echo "Fail";
    }
    error_reporting(E_ALL);
?>
