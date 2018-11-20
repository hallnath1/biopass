<?php
    
    session_start();
    if(!isset($_SESSION['uName'])){
        header('Location: index.php');
    }

    $uName = $_SESSION['uName'];
    $sql = "SELECT firstName FROM Users WHERE userName = :username;";
    $stmt = $GLOBALS['db']->prepare($sql);
    $stmt->bindValue(':username', $uName, SQLITE3_TEXT);
    $result = $stmt->execute()->fetchArray();
    echo htmlspecialchars($result['firstName'], ENT_QUOTES, 'UTF-8');
?>