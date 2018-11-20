<?php
    session_start();
    if(!isset($_SESSION['uName'])){
        header('Location: index.php');
    }

    $arr = str_split($_GET['val']);

    $passVal = $_SESSION ["data"];
    
    for($i = 0; $i < 127; $i++){
        $needle = chr($i);
        $lastPos = 0;
        $positions = array();

        while (($lastPos = strpos($passVal, $needle, $lastPos))!== false) {
            $positions[] = $lastPos;
            $lastPos = $lastPos + strlen($needle);
        }

        if(sizeof($positions) == 0){
            $passVal = $passVal . $needle;
        }
    }

    $coded = "";
    var_dump($arr);
    foreach($arr as $needle){
        $lastPos = 0;
        $positions = array();

        while (($lastPos = strpos($passVal, $needle, $lastPos))!== false) {
            $positions[] = $lastPos;
            $lastPos = $lastPos + strlen($needle);
        }
        $x = rand(0, sizeof($positions));
        echo sizeof($positions) . "<br>";
        $coded = $coded . " " . $positions[$x];
    }
?>