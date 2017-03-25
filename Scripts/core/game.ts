/*
This is the main typescript file that imports all the functions available in ThreeJS, 
need for the purpose of 3-Dimensional modelling in TypeScript. This script file is used
to add all the details for the cube man for the purpose of the assignment for Advanced 
Graphics.
GitHub Repository: https://github.com/300833356COMP392/Assignment01
Azure Deployment Link: http://300833356--comp392-assignment1.azurewebsites.net
Source File: Game.ts 
@author Mohammed Juned Ahmed
Last Modified Date: Feburaru 05, 2016 
Last Modified by: Mohammed Juned Ahmed
*/
/// <reference path="_reference.ts"/>

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
//Custom Game Objects
import gameObject = objects.gameObject;
var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var head: Mesh;
var body: Mesh;
var rightArm: Mesh;
var leftArm: Mesh;
var rightLeg: Mesh;
var leftLeg: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var headGeometry:CubeGeometry;
var headMaterial:LambertMaterial;
var bodyGeometry:CubeGeometry;
var bodyMaterial:LambertMaterial;
var legGeometry:CubeGeometry;
var legMaterial:LambertMaterial;
var armGeometry:CubeGeometry;
var armMaterial:LambertMaterial;

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
    plane = new gameObject(
        new PlaneGeometry(20, 20, 1, 1), 
        new LambertMaterial({ color: 0x00ffb8}),
         0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");

    // Body Material and Geomentry
    bodyMaterial = new LambertMaterial({color:0xa6a4c0});
    bodyGeometry = new CubeGeometry(1.5, 1.5, 1);
    
    // Legs Material and Geomentry
    legMaterial = new LambertMaterial({color:0xff0000});
    legGeometry = new CubeGeometry(0.5, 2, 0.5);
    
    // Head Material and Geomentry
    headMaterial = new LambertMaterial({color:0xe59a5b});
    headGeometry = new CubeGeometry(0.921, 0.921, 0.614);
    
    // Arms Material and Geomentry
    armMaterial = new LambertMaterial({color:0xc9fbed});
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

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
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
function gameLoop(): void {
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
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
}
