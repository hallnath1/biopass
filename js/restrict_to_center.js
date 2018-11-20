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

        var uName = document.getElementById('uName').value;
        
        if(uName != oldUserName){
            oldUserName = uName;
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    userValue = this.responseText
                    if (userValue!=""){
                        obj = JSON.parse(userValue);
                    }
                }
            };
            request.open("GET", "../getHash.php?uName="+uName, true)
            request.setRequestHeader("Content-type", "application/json")
            request.send();
        
        }
        
        
		brfManager.update(imageData);

		draw.clear();

		draw.drawRect(_faceDetectionRoi,					false, 6, 0x16E7CF, 4);
		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x16E7CF, 0.5);

		var mergedFaces = brfManager.getMergedDetectedFaces();

		draw.drawRects(mergedFaces,							false, 4.0, 0xffae42, 4.0);

		var face = brfManager.getFaces()[0];

        var coords = [Object.assign({}, face.points[33]), Object.assign({}, face.points[36]), Object.assign({}, face.points[45]), Object.assign({}, face.points[20]), Object.assign({}, face.points[21]), Object.assign({}, face.points[22]), Object.assign({}, face.points[23]), Object.assign({}, face.points[27]), Object.assign({}, face.points[28]), Object.assign({}, face.points[29]), Object.assign({}, face.points[30]), Object.assign({}, face.points[31]), Object.assign({}, face.points[32]), Object.assign({}, face.points[33]), Object.assign({}, face.points[34]), Object.assign({}, face.points[35]), Object.assign({}, face.points[39]), Object.assign({}, face.points[42]), Object.assign({}, face.points[48]), Object.assign({}, face.points[54])];

        var nathanFaceQA = [{"x":0,"y":0},{"x":-3,"y":3},{"x":3,"y":3},{"x":-1,"y":5},{"x":-1,"y":5},{"x":1,"y":5},{"x":2,"y":5},{"x":0,"y":4},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":1},{"x":-1,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":1,"y":0},{"x":-1,"y":3},{"x":1,"y":3},{"x":-1,"y":-2},{"x":2,"y":-2}];
		
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

			coords[i].x = Math.round(coords[i].x);
			coords[i].y = Math.round(coords[i].y);
		}
		
        var oneFaceTracked = false;

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

            if(!latch1){
                meString = sha256(JSON.stringify(coords));
            }			
			
            if ((obj["hash"] == sha256(obj['salt']+"--"+meString)) || latch1){
                latch1 = true;
                setPoint(face.vertices, 48, p0); // mouth corner left
                setPoint(face.vertices, 54, p1); // mouth corner right
                
                var mouthWidth = calcDistance(p0, p1);

                setPoint(face.vertices, 39, p1); // left eye inner corner
                setPoint(face.vertices, 42, p0); // right eye outer corner
        
                var eyeDist = calcDistance(p0, p1);
                var smileFactor = mouthWidth / eyeDist;

                smileFactor -= 1.40; // 1.40 - neutral, 1.70 smiling

                if(smileFactor > 0.25) smileFactor = 0.25;
                if(smileFactor < 0.00) smileFactor = 0.00;

                smileFactor *= 4.0;

                if(smileFactor < 0.0) { smileFactor = 0.0; }
                if(smileFactor > 1.0) { smileFactor = 1.0; }
				
                document.getElementById("smileDiv").style.display = "table";
				
                if((smileFactor > 0.2) || latch2){
                    latch2 = true;
					document.getElementById("smileDiv").style.display = "none";
                    document.getElementById("stopDiv").style.display = "table";
                    if(smileFactor == 0){
                        latch1 = false;
                        latch2 = false;
                        
                        var valueRet = manipulate(sha256(meString));
                        
                        postAjax('./passGen.php', { uName: uName, data: valueRet }, function(data){ 
                            if(data == "1"){
                                document.location.href = "./pass.php";
                            }
                        });
                    }
                }
            }
            draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
            draw.drawVertices(	face.vertices, 2.0, false, color, 1);
            oneFaceTracked = true;
        }
		if(!oneFaceTracked && mergedFaces.length > 0) {

            var mergedFace = mergedFaces[0];
			
            if(mergedFace.width < _faceDetectionRoi.width * 0.50) { // startMinFaceSize
				document.getElementById("closerDiv").style.display = "table";

            } else if(mergedFace.width > _faceDetectionRoi.width * 0.70) { // startMaxFaceSize
				document.getElementById("furtherDiv").style.display = "table";
            }

        }
		else if(!latch1){
        	document.getElementById("closerDiv").style.display = "none";
        	document.getElementById("furtherDiv").style.display = "none";
		}
	};
    
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

var oldUserName= " ";
var userValue;
var obj;
var meString = "";
var latch1 = false;
var latch2 = false;