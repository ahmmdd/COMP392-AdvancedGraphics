/*
 *  This is the game.ts file that contains all the impelementations for the
 *  solar system of 5 planets revolving around the sun.
 *
 *  Source File Name:   game.ts
 *  Author Name:        Mohammed Juned Ahmed (300833356)
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: February 08, 2016
 *  Revision History:   0.0.1
 */
/// <reference path="_reference.ts"/>
// MAIN GAME FILE
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var RingGeometry = THREE.RingGeometry;
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
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axis;
var ambientLight;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
var planet1Object;
var planet2Object;
var planet3Object;
var planet4Object;
var planet5Object;
//Sun
var sun;
//Planets and moons
var planet1Mesh;
var planet2Mesh;
var planet3Mesh;
var planet4Mesh;
var planet5Mesh;
var ringMesh;
var moonMesh;
function init() {
    //add new scene
    scene = new Scene();
    setupRenderer();
    setupCamera();
    //add new axis helper
    axis = new AxisHelper(20);
    scene.add(axis);
    //console.log("Axis Helper added to scene...");
    //add background color
    document.body.style.backgroundColor = "Black";
    //add sun
    sun = new gameObject(new SphereGeometry(3, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/sun.jpg") }), 0, 0, 0);
    scene.add(sun);
    //add game objects
    planet1Object = new Object3D();
    planet2Object = new Object3D();
    planet3Object = new Object3D();
    planet4Object = new Object3D();
    planet5Object = new Object3D();
    planet1Object.position.set(0, 0, 0);
    planet2Object.position.set(0, 0, 0);
    planet3Object.position.set(0, 0, 0);
    planet4Object.position.set(0, 0, 0);
    planet5Object.position.set(0, 0, 0);
    sun.add(planet1Object);
    sun.add(planet2Object);
    sun.add(planet3Object);
    sun.add(planet4Object);
    sun.add(planet5Object);
    //add planet 1
    planet1Mesh = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/planet1.jpg") }), -5, 0, 0);
    planet1Object.add(planet1Mesh);
    //console.log("Planet1 added to scene...");
    //add planet 2
    planet2Mesh = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/planet2.jpg") }), -10, 0, 0);
    planet2Object.add(planet2Mesh);
    //console.log("Planet2 added to scene...");
    //add Planet3
    planet3Mesh = new gameObject(new SphereGeometry(1.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/planet3.jpg") }), -13, 0, 0);
    planet3Object.add(planet3Mesh);
    //console.log("Planet3 added to scene...");
    //add Planet3 moon
    moonMesh = new gameObject(new SphereGeometry(0.5, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/moon.jpg") }), -1.5, 0, 1.5);
    planet3Mesh.add(moonMesh);
    //console.log("Planet 3 moon added to scene...");
    //add Planet 4
    planet4Mesh = new gameObject(new SphereGeometry(1.1, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/planet4.jpg") }), -16, 0, 0);
    planet4Object.add(planet4Mesh);
    //console.log("Mars added to scene...");
    //add Planet 5
    planet5Mesh = new gameObject(new SphereGeometry(1.2, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/planet5.jpg") }), -25, 0, 0);
    planet5Object.add(planet5Mesh);
    //console.log("Saturn added to scene...");
    //add Planet 5 ring
    ringMesh = new gameObject(new RingGeometry(1.5, 2, 32, 32, 0, Math.PI * 2), new LambertMaterial({ map: THREE.ImageUtils.loadTexture("../../Content/ring.jpg"), wireframe: true }), -25, 0, 0);
    ringMesh.rotation.y = 10;
    ringMesh.rotation.x = 20;
    planet5Object.add(ringMesh);
    //console.log("Plante5 ring mesh added to scene...");
    //add ambientLight to the scene
    ambientLight = new AmbientLight(0xa5a5a5);
    scene.add(ambientLight);
    //console.log("Ambient Light added to Scene");
    //add a PointLight to the scene
    pointLight = new PointLight(0xffffff);
    pointLight.castShadow = true;
    pointLight.intensity = 1;
    pointLight.shadowMapHeight = 2048;
    pointLight.shadowMapWidth = 2048;
    scene.add(pointLight);
    //console.log("PointLight added to the scene");
    //add controls
    gui = new GUI();
    control = new Control(0.002);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    //console.log("Stats added to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	   
    window.addEventListener('resize', onResize, false);
}
function gameLoop() {
    stats.update();
    //orbit of the planets
    planet1Object.rotation.y += 0.03;
    planet2Object.rotation.y += 0.02;
    planet3Object.rotation.y += 0.01;
    planet4Object.rotation.y += 0.032;
    planet5Object.rotation.y += 0.025;
    //Moon Orbit 
    planet3Mesh.rotation.y += 0.01;
    moonMesh.rotation.y += 0.01;
    requestAnimationFrame(gameLoop);
    renderer.render(scene, camera);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'zoomInEarth');
    gui.add(controlObject, 'zoom').listen();
}
//setup renderer for the scene
function setupRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //console.log("Finished setting up Renderer...");
}
//setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -50;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    //console.log("Finished setting up Camera...");
}

//# sourceMappingURL=game.js.map
