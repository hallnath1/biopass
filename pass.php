<!DOCTYPE html>

<html lang="en">
    <head>
        <title>BioPass</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style/home.css">
        <link rel="stylesheet" href="style/accPass.css">
        <script src="https://use.fontawesome.com/3dd0d643ab.js"></script>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/accPass.js"></script>
    </head>
    <body>
        
        <?php
            include "banner.php";
        ?>
        
        <div id="content">
            <a href="./kill.php" style="color:red;">
                <i class="fa fa-times" aria-hidden="true" id="signOut"></i>
            </a>
            
            <h1>Welcome back, 
            <?php
                
                session_start();
                if(!isset($_SESSION['uName'])){
                    header('Location: index.php');
                }

                require 'database.php';
                $db = new Database();
                include 'getName.php';
            ?>!                
            </h1>
            <h3 id="description">That's it! You have recreated your passwords. Now you can use, edit, add and remove them from your account. When you click on the red cross your digital password signature is deleted.</h3>
            
            <div class="lineHor"></div>
            <div class="lineHor"></div>
                
            <?php 
                include 'passGeneration.php';
                accPassGen();
            ?>
            
            <div class="restrict">
                <form class="accAll" id="new">
                    <input class="accNameNew" placeholder="Webpage" type="text">
                    <input class="uNameNew" placeholder="Username" type="text">
                    <span class="buttons">
                        <i id="up" class="fa fa-caret-up" aria-hidden="true"></i>
                        <p  style="margin: 0 0.2vw;" id="sizePass">14</p>
                        <i id="down" class="fa fa-caret-down" aria-hidden="true"></i>
                        <i id='refresh' class="fa fa-refresh" aria-hidden="true"></i>
                    </span>
                    
                    <input class="passContNew" placeholder="Password"  type="text">
                </form>   
            </div>
                
            <div class="lineHor" id="hidden"></div>
            <div class="lineHor"></div>
            
            <i id="newAcc"class="fa fa-plus" aria-hidden="true"></i>
            <i id="cancel"class="fa fa-times" aria-hidden="true"></i>
        </div>
    </body>
</html>
