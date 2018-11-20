<?php
    function decode($str){
        session_start();
        if(!isset($_SESSION['uName'])){
            header('Location: index.php');
        }

        $passVal = $_SESSION["data"];
        $arr = explode(" ", $str);
        
        for($i = 33; $i < 127; $i++){
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
        
        
        $decoded = "";
        foreach($arr as $ind){
            $decoded = $decoded . $passVal[$ind];
        }
        
        return $decoded;
    }
?>