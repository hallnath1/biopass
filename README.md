![](https://github.com/hallnath1/biopass/blob/master/media/Screen%20Shot%202018-09-03%20at%2016.30.23%20(1).png)

Nobody likes passwords, they are hard to remember, often forgotten or simply aren't secure enough. The solution for now seems to the use of password managers, however the user groups that benifit the most for password managers are unlikely to use the higher friction services of current solutions. 
This project aims to provide a secure and unique alternative to current systems by the use of biometric technologies.
## The Project
  * A web hosted password manager that does not store passwords in anyway (plaintext, hash or encrypted)
  * Passwords are generated through a users unique biometric - currently facial recognition but could be fingerprint in mobile version
  * Focus on creating a frictionless authentication process to promote use of password managers, reducing human risk

## Details

![](https://github.com/hallnath1/biopass/blob/master/media/Screenshot%202019-09-12%20at%2016.04.11.png)

* * *
![](https://github.com/hallnath1/biopass/blob/master/media/Screenshot%202019-09-12%20at%2016.04.18.png)

* * *
![](https://github.com/hallnath1/biopass/blob/master/media/Screenshot%202019-09-12%20at%2016.04.28.png)

***
### Full Video Breakdown
https://streamable.com/t030x

## Current State of Projet

  * Users can successfully create account and generate passwords from their facial biometric template
  * Passwords can be generated to a specified length or be user-made
  * Scan has some anti-photo spoofing protection (requires a smile then a frown)
  * Accuracy of scan is good but could be improved, there is a possibility of similar facial structures accessing others accounts (2FA would be required with the current technology used for a commercial product) - would require more testing!
  * Login friction is minimal, and guidance using the webcam reduces the click-wall of login
  * Biometric capture uses the BRFv4 framework, which generates the anchor points used in the project
  
## Future Advancements

  * Update the biometric capture to a more advanced method to improve the accuracy of the scan
  * Improve web vulnerability security
  * More control for password generation (e.g. characters available)
  * Editing of current entries
  * Potential for mobile application using a variety of biometrics (face, fingerprint, retina, voice, etc)
  * Improved web scalability for more varied screen sizes
  * Luminosity check to recommend when a light source is required for more accurate scan
  
![](https://github.com/hallnath1/biopass/blob/master/media/Screen%20Shot%202018-09-11%20at%2013.06.01.jpg)
