<!DOCTYPE html>

<html lang="en">
    <head>
        <title>BioPass</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style/home.css">
        <link rel="stylesheet" href="style/webCam.css">
        <link href="https://fonts.googleapis.com/css?family=Sawarabi+Gothic" rel="stylesheet">        
	<link rel="icon" type="image/png" href="media/logo/bioPassLogo.png">
    </head>
    <body>
        
        <?php
            include "banner.php";
        ?>
        
        <div id="content">
            
            <h1>Welcome!</h1>
            <h3 id="description">BioPass captures the passwords of your face. Using your unique facial biometric we can generate and store your passwords for you without ever keeping them on physical storage! If you are new please Register below, otherwise welcome back! Hit Scan and generate your passwords.</h3>
            
            
          
        
                
            <a href="./scan.php"><input class="submit" type="button" value="Scan" style="margin-bottom:2vw;"></a>
            
            <h3 id="description">-or-</h3>
            
            <a href="./reg.php"><input class="submit" type="button" value="Register"></a>
        </div>
        

		
	
    </body>
</html>
