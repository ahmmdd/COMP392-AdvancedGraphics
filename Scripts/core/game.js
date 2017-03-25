/// <reference path="_reference.ts"/>
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var head;
var body;
var rightArm;
var leftArm;
var rightLeg;
var leftLeg;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var headGeometry;
var headMaterial;
var bodyGeometry;
var bodyMaterial;
var legGeometry;
var legMaterial;
var armGeometry;
var armMaterial;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    // setup the default renderer
    setupRenderer();
    // setup the camera
    setupCamera();
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(20, 20, 1, 1), new LambertMaterial({ color: 0x00ffb8 }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    // Body Material and Geomentry
    bodyMaterial = new LambertMaterial({ color: 0xa6a4c0 });
    bodyGeometry = new CubeGeometry(1.5, 1.5, 1);
    // Legs Material and Geomentry
    legMaterial = new LambertMaterial({ color: 0xff0000 });
    legGeometry = new CubeGeometry(0.5, 2, 0.5);
    // Head Material and Geomentry
    headMaterial = new LambertMaterial({ color: 0xe59a5b });
    headGeometry = new CubeGeometry(0.921, 0.921, 0.614);
    // Arms Material and Geomentry
    armMaterial = new LambertMaterial({ color: 0xc9fbed });
    armGeometry = new CubeGeometry(2, 0.5, 0.5);
    //Add a body of Cube man
    body = new Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 3;
    scene.add(body);
    //Add a head of Cube man
    head = new Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 1;
    body.add(head);
    //Add a rightArm of Cube man
    rightArm = new Mesh(armGeometry, armMaterial);
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    rightArm.position.x = 1.1;
    rightArm.position.y = 0.4;
    body.add(rightArm);
    //Add a leftArm of Cube man
    leftArm = new Mesh(armGeometry, armMaterial);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    leftArm.position.x = -1.1;
    leftArm.position.y = 0.4;
    body.add(leftArm);
    // Add right leg to scene
    rightLeg = new Mesh(legGeometry, legMaterial);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    rightLeg.position.x = 0.4;
    rightLeg.position.y = -1.5;
    body.add(rightLeg);
    //Add a leftLeg of Cube man
    leftLeg = new Mesh(legGeometry, legMaterial);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    leftLeg.position.x = -0.4;
    leftLeg.position.y = -1.5;
    body.add(leftLeg);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x212121);
    scene.add(ambientLight);
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    // add controls
    gui = new GUI();
    control = new Control(0, 0.05, 0);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    // render the scene	
    gameLoop();
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed_x', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeed_y', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeed_z', -0.5, 0.5);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    body.rotation.x += control.rotationSpeed_x;
    body.rotation.y += control.rotationSpeed_y;
    body.rotation.z += control.rotationSpeed_z;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
}
//# sourceMappingURL=game.js.map