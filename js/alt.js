ALT = {};

ALT.initWorld = function(exports){
	var scene, camera, render;

	contaiter = document.createElement('div');
	document.body.appendChild(contaiter);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.y = 0;
	camera.position.z = 550;
	var render = new THREE.WebGLRenderer();
	render.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( render.domElement );

	exports.scene = scene;
	exports.camera = camera;
	exports.render = render;
}

ALT.drawWalls = function(scene,radius_sphere,limit){
	var lengthWall = limit*2+radius_sphere*2;
	var cube_geometry = new THREE.CubeGeometry(lengthWall+10,10,50);	
	var cube_texture = new THREE.MeshNormalMaterial();
	var cube = new THREE.Mesh(cube_geometry,cube_texture);
	cube.position.x = -limit-(radius_sphere);
	cube.rotation.z = Math.PI/2;
	scene.add(cube);

	var cube = new THREE.Mesh(cube_geometry,cube_texture);
	cube.position.x = limit+(radius_sphere);
	cube.rotation.z = Math.PI/2;
	scene.add(cube);

	var cube = new THREE.Mesh(cube_geometry,cube_texture);
	cube.position.y = -limit-(radius_sphere);
	scene.add(cube);

	var cube = new THREE.Mesh(cube_geometry,cube_texture);
	cube.position.y = limit+(radius_sphere);
	scene.add(cube);
}