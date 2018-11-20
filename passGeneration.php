<?php
    function accPassGen(){   

        if(!isset($_SESSION['uName'])){
            header('Location: index.php');
        }

        $passString = $_SESSION ["data"];
        $uName = $_SESSION ["uName"];
        include 'decode.php';
        $sql = "SELECT UserID FROM Users WHERE userName = :username;";
        $stmt = $GLOBALS['db']->prepare($sql);
        $stmt->bindValue(':username', $uName, SQLITE3_TEXT);
        $result = $stmt->execute()->fetchArray();
        
        $sql = "SELECT * FROM UserKeys WHERE UserID = :userid;";
        $stmt = $GLOBALS['db']->prepare($sql);
        $stmt->bindValue(':userid', $result['UserID'], SQLITE3_TEXT);
        $passKey = $stmt->execute();
        $i=0;
        
        
        while(($row = $passKey->fetchArray())){
            $i = $i+1;
            $index = $row['passKey'];
            
            
            echo "
            <div class='accAll' id='".$row['UserKeysID']."'>
                <span class='accName'>".htmlspecialchars($row['site'], ENT_QUOTES, 'UTF-8')."</span>
                <span class='divider'>::</span>
                <span class='uName'>".htmlspecialchars($row['accountName'], ENT_QUOTES, 'UTF-8')."</span>
                <span class='divider'>|</span>
                <span class='passCont' >".htmlspecialchars(decode($index))."</span>
                <span class='divider'>|</span>
                <span class='buttons'>
                    <span class='eye'><i class='fa fa-eye' aria-hidden='true'></i></span>
                    <span class='copy'><i class='fa fa-clone' aria-hidden='true'></i></span>
                    <span class='remove'><i class='fa fa-trash-o' aria-hidden='true'></i></span>
                </span>
            </div>    
                
            <div class='lineHor'></div>";
            
        }
    }
?>