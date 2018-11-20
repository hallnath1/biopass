<?php
    
    session_start();
    if(!isset($_SESSION['uName'])){
        header('Location: index.php');
    }

    $passString = $_SESSION ["data"];
    $size = $_POST['size'];
    $string="";
    for($i = 0; $i < $size; $i++){
        $string = $string . $passString[rand(0, strlen($passString)-1)];
    }
    echo $string;
?>