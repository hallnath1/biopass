<?php
    session_start();
    $uName = $_POST["uName"];
    $data = $_POST["data"];
    $_SESSION['uName'] = $uName;
    $_SESSION['data'] = $data;
    $location = 'pass.php';
    echo "1";
?>