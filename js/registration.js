(function exampleCode() {
	"use strict";

	var _faceDetectionRoi = new brfv4.Rectangle();

	brfv4Example.initCurrentExample = function(brfManager, resolution) {

		brfManager.init(resolution, resolution, brfv4Example.appId);

		// Sometimes you want to restrict the position and pose of a face.

		// In this setup we will restrict pick up of the face to the center of the image
		// and we will let BRFv4 reset if the user turns his head too much.

		// We limit the face detection region of interest to be in the central
		// part of the overall analysed image (green rectangle).

		_faceDetectionRoi.setTo(
			resolution.width * 0.25, resolution.height * 0.10,
			resolution.width * 0.50, resolution.height * 0.80
		);
		brfManager.setFaceDetectionRoi(_faceDetectionRoi);

		// We can have either a landscape area (desktop), then choose height or
		// we can have a portrait area (mobile), then choose width as max face size.

		var maxFaceSize = _faceDetectionRoi.height;

		if(_faceDetectionRoi.width < _faceDetectionRoi.height) {
			maxFaceSize = _faceDetectionRoi.width;
		}

		// Use the usual detection distances to be able to tell the user what to do.

		brfManager.setFaceDetectionParams(maxFaceSize * 0.30, maxFaceSize * 1.00, 12, 8);

		// Set up the pickup parameters for the face tracking:
		// startMinFaceSize, startMaxFaceSize, startRotationX/Y/Z

		// Faces will only get picked up, if they look straight into the camera
		// and have a certain size (distance to camera).

		brfManager.setFaceTrackingStartParams(maxFaceSize * 0.50, maxFaceSize * 0.70, 15, 15, 15);

		// Set up the reset conditions for the face tracking:
		// resetMinFaceSize, resetMaxFaceSize, resetRotationX/Y/Z

		// Face tracking will reset to face detection, if the face turns too much or leaves
		// the desired distance to the camera.

		brfManager.setFaceTrackingResetParams(maxFaceSize * 0.45, maxFaceSize * 0.75, 25, 25, 25);
	};

	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {

		brfManager.update(imageData);

		draw.clear();

		draw.drawRect(_faceDetectionRoi,					false, 6, 0x16E7CF, 4);
		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x16E7CF, 0.5);

		var mergedFaces = brfManager.getMergedDetectedFaces();

		draw.drawRects(mergedFaces,							false, 4.0, 0xffae42, 4.0);

		var face = brfManager.getFaces()[0];

        var coords = [Object.assign({}, face.points[33]), Object.assign({}, face.points[36]), Object.assign({}, face.points[45]), Object.assign({}, face.points[20]), Object.assign({}, face.points[21]), Object.assign({}, face.points[22]), Object.assign({}, face.points[23]), Object.assign({}, face.points[27]), Object.assign({}, face.points[28]), Object.assign({}, face.points[29]), Object.assign({}, face.points[30]), Object.assign({}, face.points[31]), Object.assign({}, face.points[32]), Object.assign({}, face.points[33]), Object.assign({}, face.points[34]), Object.assign({}, face.points[35]), Object.assign({}, face.points[39]), Object.assign({}, face.points[42]), Object.assign({}, face.points[48]), Object.assign({}, face.points[54])];

        var bobFace = [{"x":0,"y":0},{"x":-5,"y":5},{"x":5,"y":5},{"x":-6,"y":7},{"x":-4,"y":7},{"x":-3,"y":7},{"x":-1,"y":7},{"x":1,"y":6},{"x":3,"y":7},{"x":4,"y":7},{"x":6,"y":7},{"x":7,"y":6},{"x":0,"y":5},{"x":0,"y":4},{"x":0,"y":3},{"x":0,"y":1},{"x":-2,"y":0},{"x":-1,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":0},{"x":-2,"y":5},{"x":2,"y":5}];

        var nathanFaceBad = [{"x":0,"y":0},{"x":-1,"y":1},{"x":1,"y":1},{"x":-1,"y":2},{"x":0,"y":1},{"x":0,"y":1},{"x":1,"y":2},{"x":0,"y":1},{"x":0,"y":1},{"x":0,"y":1},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":1},{"x":0,"y":1},{"x":-1,"y":0},{"x":1,"y":-1}];
        
        var nathanFace = [{"x":0,"y":0},{"x":-2,"y":2},{"x":2,"y":2},{"x":-1,"y":3},{"x":0,"y":3},{"x":1,"y":3},{"x":1,"y":3},{"x":0,"y":2},{"x":0,"y":2},{"x":0,"y":1},{"x":0,"y":1},{"x":-1,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":-1,"y":2},{"x":1,"y":2},{"x":-1,"y":-1},{"x":1,"y":-1}];
        
        var nathanFaceGood = [{"x":0,"y":0},{"x":-3,"y":3},{"x":3,"y":3},{"x":-1,"y":5},{"x":-1,"y":5},{"x":1,"y":5},{"x":2,"y":5},{"x":0,"y":4},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":1},{"x":-1,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":-1,"y":3},{"x":1,"y":3},{"x":-1,"y":-2},{"x":2,"y":-2}];

        var nathanFaceComplex = [{"x":0,"y":0},{"x":-4,"y":4},{"x":4,"y":4},{"x":-2,"y":6},{"x":-1,"y":6},{"x":1,"y":6},{"x":2,"y":6},{"x":0,"y":5},{"x":0,"y":4},{"x":0,"y":2},{"x":0,"y":1},{"x":-1,"y":0},{"x":-1,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":0},{"x":-2,"y":4},{"x":2,"y":4},{"x":-2,"y":-2},{"x":2,"y":-2}];
        
        var benFace = [{"x":0,"y":0},{"x":-2,"y":2},{"x":2,"y":2},{"x":-1,"y":3},{"x":0,"y":3},{"x":1,"y":3},{"x":1,"y":3},{"x":0,"y":2},{"x":0,"y":2},{"x":0,"y":1},{"x":0,"y":1},{"x":-1,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":-1,"y":2},{"x":1,"y":2},{"x":-1,"y":-1},{"x":1,"y":-1}];
        
        var benFaceGood = [{"x":0,"y":0},{"x":-3,"y":3},{"x":3,"y":3},{"x":-1,"y":4},{"x":0,"y":4},{"x":1,"y":4},{"x":2,"y":4},{"x":0,"y":3},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":1},{"x":-1,"y":0},{"x":-1,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":0},{"x":-1,"y":3},{"x":1,"y":3},{"x":-2,"y":-1},{"x":2,"y":-1}];
        
        var benFaceComplex = [{"x":0,"y":0},{"x":-4,"y":4},{"x":4,"y":4},{"x":-2,"y":6},{"x":0,"y":5},{"x":1,"y":5},{"x":3,"y":6},{"x":0,"y":4},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":1},{"x":-1,"y":0},{"x":-1,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":0},{"x":-1,"y":4},{"x":2,"y":4},{"x":-3,"y":-1},{"x":3,"y":-1}];

        var radFaceGood = [{"x":0,"y":0},{"x":-3,"y":3},{"x":3,"y":3},{"x":-1,"y":5},{"x":-1,"y":4},{"x":1,"y":4},{"x":1,"y":5},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":2},{"x":0,"y":1},{"x":-1,"y":0},{"x":-1,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":0},{"x":-1,"y":3},{"x":1,"y":3},{"x":-2,"y":-1},{"x":2,"y":-1}];

        var mid = Object.assign({}, coords[0]);
        for(var i = 0; i < coords.length; i++){
            coords[i].x -= mid.x;
            coords[i].y = mid.y - coords[i].y;
        }

		var m = (coords[1].y-coords[2].y)/(coords[1].x-coords[2].x);
		var mInv = -(1/m);
		var c = coords[1].y - m * coords[1].x;
		var xPoint = c / (mInv-m);
		var yPoint = mInv * xPoint;

		var theta = Math.atan((xPoint)/(yPoint));

		for(var i = 0; i < coords.length; i++){
            var temp = coords[i];

			coords[i].x = (temp.x * Math.cos(theta)) - (temp.y * Math.sin(theta));
            coords[i].y = (temp.x * Math.sin(theta)) + (temp.y * Math.cos(theta));
		}

		var xRange = coords[2].x-coords[1].x;	//Protection from weirdness
		var yRange = (coords[1].y+coords[2].y)/2;
		var xMult = 6/xRange;
		var yMult = 3/yRange;

		for(var i = 0; i < coords.length; i++){
			coords[i].x *= xMult;
            coords[i].y *= yMult;
		}
		
        var oneFaceTracked = false;
		//Lumionosity check (40%-60%)
        if(face.state === brfv4.BRFState.FACE_TRACKING) {

            // Read the rotation of the face and draw it
            // green if the face is frontal or
            // red if the user turns the head too much.

            var maxRot = brfv4.BRFv4PointUtils.toDegree(
                Math.max(
                    Math.abs(face.rotationX),
                    Math.abs(face.rotationY),
                    Math.abs(face.rotationZ)
                )
            );
			
            var percent = maxRot / 20.0;

            if(percent < 0.0) { percent = 0.0; }
            if(percent > 1.0) { percent = 1.0; }
            var color = (((0xff * percent) & 0xff) << 16) + (((0xff * (1.0 - percent) & 0xff) << 8));
			
			count++;

            var meString = sha256(JSON.stringify(coords));
            
            draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
            draw.drawVertices(	face.vertices, 2.0, false, color, 1);
            oneFaceTracked = true;
        }
		else{
			count = 0;
		}
		
		if(!oneFaceTracked && mergedFaces.length > 0) {

            var mergedFace = mergedFaces[0];
			
            if(mergedFace.width < _faceDetectionRoi.width * 0.50) { // startMinFaceSize
				document.getElementById("closerDiv").style.display = "table";

            } else if(mergedFace.width > _faceDetectionRoi.width * 0.70) { // startMaxFaceSize
				document.getElementById("furtherDiv").style.display = "table";
            }

        }
		else{
        	document.getElementById("closerDiv").style.display = "none";
        	document.getElementById("furtherDiv").style.display = "none";
		}
		
		if(percent > 0.2) { 
			count = 0
			document.getElementById("stayDiv").style.display = "table";
		}
		else{
			document.getElementById("stayDiv").style.display = "none";
		}
		
		if(count == 50){
			document.getElementById("countDiv").style.display = "table";
		}
		else if(count == 60){
			document.getElementById("countDiv").children[0].innerHTML = "5";
		}
		else if(count == 80){
			document.getElementById("countDiv").children[0].innerHTML = "4";
		}
		else if(count == 100){
			document.getElementById("countDiv").children[0].innerHTML = "3";
		}
		else if(count == 120){
			document.getElementById("countDiv").children[0].innerHTML = "2";
		}
		else if(count == 140){
			document.getElementById("countDiv").children[0].innerHTML = "1";
		}
		else if(count == 160){
			document.getElementById("countDiv").children[0].innerHTML = "Done!";
		}
		else if(count == 150){
			var averFace = [];
            
            for(var i = 0; i < 20; i++){
                averFace[i] = {"x":0, "y":0};      
            }
            
            for(var i = 0; i < 20; i++){
                for(var j = 0; j < 90; j++){
                    averFace[i].x += record[j][i].x;
                    averFace[i].y += record[j][i].y;
                }
                averFace[i].x = Math.round(averFace[i].x / 90);
                averFace[i].y = Math.round(averFace[i].y / 90);
            }
            
            var hashFace = sha256(JSON.stringify(averFace));
            var fName = document.getElementById("fName").value;
            var uName = document.getElementById("uName").value;
            var response = '';
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    response = this.responseText;
                    if (response == "Completed"){
                        var valueRet = manipulate(sha256(hashFace));
                        postAjax('./passGen.php', { uName: uName, data: valueRet }, function(data){ 
                            if(data == "1"){
                                document.location.href = "./pass.php";
                            }   
                            console.log(data);
                        });
                    }
                }
            };
            request.open("GET", "../newUser.php?uName="+uName+"&fName="+fName+"&hash="+hashFace, true)
            request.setRequestHeader("Content-type", "application/json")
            request.send();
            
            
            
		}
		else if(count == 0){
			document.getElementById("countDiv").children[0].innerHTML = "Don't Move";
			document.getElementById("countDiv").style.display = "none";
		}
        
        if((count >= 60) && (count <=150)){
            record[count-60] = coords;
        }
		
	};
    
    String.prototype.hashCode = function() {
        var hash = 0;
        if (this.length == 0) {
            return hash;
        }
        for (var i = 0; i < this.length; i++) {
            var char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        hash = Math.abs(hash);
        return hash;
    }
    
    var p0              = new brfv4.Point();
    var p1              = new brfv4.Point();
    var lock = false;
    var setPoint        = brfv4.BRFv4PointUtils.setPoint;
    var calcDistance    = brfv4.BRFv4PointUtils.calcDistance;
    
})();

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

var latch1 = false;
var count = 0;
var record = new Object();