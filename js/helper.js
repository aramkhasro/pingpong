Helper = {};
Helper.captureCursor = function captureCursor(userFunctionOnMoveCursor){

	var canvas = document.querySelector('canvas');
	canvas.requestPointerLock = canvas.requestPointerLock ||
        						canvas.mozRequestPointerLock ||
        						canvas.webkitRequestPointerLock;
	document.exitPointerLock = document.exitPointerLock ||
        						document.mozExitPointerLock ||
        						document.webkitExitPointerLock;

	canvas.onclick = function() {
		canvas.requestPointerLock();
	}

	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

	function lockChangeAlert() {
		if(document.pointerLockElement === canvas ||
			document.mozPointerLockElement === canvas ||
			document.webkitPointerLockElement === canvas) {
				document.addEventListener("mousemove", canvasLoop, false);
		}else{
			document.removeEventListener("mousemove", canvasLoop, false);
		}
	}

	function canvasLoop(e){
		var movementX = e.movementX      ||
						e.mozMovementX	 ||
						e.webkitMovementX||
						0;

		var movementY = e.movementY      ||
						e.mozMovementY   ||
						e.webkitMovementY||
						0;
		userFunctionOnMoveCursor({clientX:movementX,clientY:movementY});
	}
}

Helper.zoomCamera = function(camera){
	function onDocumentKeyDown(event){
		var speedKeyShift = 10;
		var keyCode = event.which;
		if(keyCode == 38){//Cursor up
			camera.position.y += speedKeyShift;
		}else if(keyCode == 40){//Cursor down
			camera.position.y -= speedKeyShift;
		}else if(keyCode == 37){//Cursor left
			camera.position.x -= speedKeyShift;
		}else if(keyCode == 39){//Cursor right
			camera.position.x += speedKeyShift; 
		}else if(keyCode == 70){//F
			camera.position.z += speedKeyShift+10; 
		}else if(keyCode == 76){//L
			camera.position.z -= speedKeyShift+10; 
		}else if(keyCode == 32){
			animation();
			clearHelp();
		}
		render.render(scene,camera);
	}
	document.addEventListener("keydown",onDocumentKeyDown,false);
}