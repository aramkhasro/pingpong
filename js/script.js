var radius_sphere = 30, limit = 300;
var wideDesc = 100,positionDesc = -limit+30;
var xdeltaInit = 6, ydeltaInit = 3, dl = 1.1, xdelta = xdeltaInit, ydelta = ydeltaInit, lengthWall = limit,
	right = top_ = lengthWall, left = bot = -lengthWall;

ALT.initWorld(window);
ALT.drawWalls(scene,radius_sphere,limit);

var sphere_geometry = new THREE.SphereGeometry(radius_sphere);	
var sphere_texture = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh(sphere_geometry,sphere_texture);
sphere.position.x = 0;
sphere.position.y = 0;
scene.add(sphere);

var desc_geometry = new THREE.CubeGeometry(wideDesc,10,50);	
var desc_texture = new THREE.MeshNormalMaterial();
var desc = new THREE.Mesh(desc_geometry,desc_texture);
desc.position.x = 0;
desc.position.y = positionDesc;
scene.add(desc);

function animation(){
	requestAnimationFrame(animation);	

	if(sphere.position.x < left || sphere.position.x > right){
		xdelta *= -1;
	}
	if(sphere.position.y > top_ || sphere.position.y < bot){
		ydelta *= -1;
	}
	sphere.position.x += xdelta;
	sphere.position.y += ydelta;

	if(sphere.position.y - radius_sphere < positionDesc && ydelta < 0)
	if(sphere.position.x > pointsDesc['left'] && sphere.position.x < pointsDesc['right']){
		ydelta *= -1;
		ydelta *= dl;
		xdelta *= dl;
		changeScore();
	}

	if(sphere.position.y - radius_sphere < bot){
		alert("You lose!");
		sphere.position.x = 0;
		sphere.position.y = 0;
		xdelta = xdeltaInit;
		ydelta = ydeltaInit;
		clearScore();
	}
	render.render(scene,camera);
}

function changeScore(){
	document.getElementById('count').innerHTML = parseInt(document.getElementById('count').innerHTML)+1;
	console.log(document.getElementById('count').innerHTML);
}

function clearScore(){
	document.getElementById('count').innerHTML = '0';
}

var pointsDesc = [];
function onDocumentMouseMove( event ) {
	
    if(desc.position.x > limit - 10){
		desc.position.x = limit-10-1;
		return;
    }
    if(desc.position.x < -limit + 10){
		desc.position.x = -limit+10+1;
		return;
    }
    desc.position.x += event.clientX;
    pointsDesc["left"] = desc.position.x - wideDesc/2;
    pointsDesc["right"] = desc.position.x + wideDesc/2;
}

function clearHelp(){
	document.getElementById('help').parentNode.removeChild(document.getElementById('help'));
}
Helper.captureCursor(onDocumentMouseMove);
Helper.zoomCamera(camera);
