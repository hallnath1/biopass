<!DOCTYPE html>

<html lang="en">
    <head>
        <title>BioPass</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style/home.css">
        <link rel="stylesheet" href="style/webCam.css">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <script src="https://use.fontawesome.com/3dd0d643ab.js"></script>
		<script type="text/javascript"src="js/sha.js"></script>
		<script type="text/javascript"src="js/tempManipulation.js"></script>
        <script src="js/libs/createjs/preloadjs.min.js"></script>
        <script src="js/BRFv4Demo.js"></script>
        <script>
		  window.onload = brfv4Example.start; //see js/BRFv4Demo.js
	    </script>
        
    </head>
    <body>
        
        <?php
            include "banner.php";
        ?>
        
        <div id="content">

	        <a href="./index.php" style="color:red;">
	            <i class="fa fa-times" aria-hidden="true" id="signOut"></i>
	        </a>
            <h1>Login</h1>
            <h2>Username</h2>
            <div class="wrapper">
                <input class="username" id = "uName" type="text" placeholder="e.g. j0hnBl0gg5">
                <span class="underline"></span>
            </div>
            <h2>Scan Face Below</h2>
            <div class = "camCont">
                <video  id="_webcam" playsinline></video>
                <canvas id="_imageData"></canvas>
                <canvas id="_faceSub"></canvas>
                <canvas id="_t3d"></canvas>
                <canvas id="_f3d"></canvas>
                <canvas id="_drawing"></canvas>
                
                <div id="smileDiv"><div id = "smileMessage">SMILE</div></div>
				<div id="stopDiv"><div id = "stopMessage"><b>FROWN</b></div></div>
				<div id="closerDiv"><div id = "closerMessage">CLOSER</div></div>
				<div id="furtherDiv"><div id = "closerMessage">FURTHER<br>AWAY</div></div>
				<div id="stayDiv"><div id = "stayMessage">Stay Still<br><br><br><br><br>Keep Straight</div></div>
				<div id="countDiv"><div id = "countMessage">Don't Move!</div></div>
            </div>
        </div>
        

		
	
    </body>
</html>
