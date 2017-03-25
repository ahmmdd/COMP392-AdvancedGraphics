/*
 *  This is the game.ts file that contains all the impelementations for the 
 *  Tapered Tower.
 *  
 *  Source File Name:   game.ts
 *  Author Name:        Mohammed Juned Ahmed (300833356)
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: March 03, 2016
 *  Revision History:   1.0.1
 */

/// <reference path="_reference.ts"/>

// MAIN GAME FILE

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
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

// declare game objects
var scene: Scene = new Scene();
var renderer: Renderer;
var camera: PerspectiveCamera;
var axis: AxisHelper;
var control: Control;
var gui: GUI;
var stats: Stats;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var plane: Mesh;

var cube1Object: Object3D;
var cube2Object: Object3D;
var cube3Object: Object3D;
var cube4Object: Object3D;
var cube5Object: Object3D;


var cube1Mesh: Mesh;
var cube2Mesh: Mesh;
var cube3Mesh: Mesh;
var cube4Mesh: Mesh;
var cube5Mesh: Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
        
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera

    /* ENTER CODE HERE */
    //add new axis helper
    axis = new AxisHelper(5);
    scene.add(axis);
    console.log("Axis Helper added to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(20, 20, 1, 1), 
        new LambertMaterial({ color: 0x00ffb8}),
         0, -12, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //add game objects
    cube1Object = new Object3D();
    cube2Object = new Object3D();
    cube3Object = new Object3D();
    cube4Object = new Object3D();
    cube5Object = new Object3D();
    
    cube1Object.position.set(0, -10, 0);
    cube2Object.position.set(0, -5.5, 0);
    cube3Object.position.set(0, -2.5, 0);
    cube4Object.position.set(0, 0, 0);
    cube5Object.position.set(0, 2, 0);
    
    // add cube1
    cube1Mesh = new gameObject(
        new CubeGeometry(3, 5, 3),
        new LambertMaterial({map: THREE.ImageUtils.loadTexture(
            "../../Content/Building1.jpg")}),
        -5,0,0);
    cube1Object.add(cube1Mesh);
    scene.add(cube1Object);
    console.log("Cube1 added to scene...");
    
    // add cube2
    cube2Mesh = new gameObject(
        new CubeGeometry(2.5, 3.5, 2.5),
        new LambertMaterial({map: THREE.ImageUtils.loadTexture(
            "../../Content/Building2.jpg")}),
        -5,0,0);
    cube2Object.add(cube2Mesh);
    scene.add(cube2Object);
    console.log("Cube2 added to scene...");
    
    // add cube3
    cube3Mesh = new gameObject(
        new CubeGeometry(2, 3, 2),
        new LambertMaterial({map: THREE.ImageUtils.loadTexture(
            "../../Content/Building3.jpg")}),
        -5,0,0);
    cube3Object.add(cube3Mesh);
    scene.add(cube3Object);
    console.log("Cube3 added to scene...");
    
    // add cube4
    cube4Mesh = new gameObject(
        new CubeGeometry(1.5, 2.5, 1.5),
        new LambertMaterial({map: THREE.ImageUtils.loadTexture(
            "../../Content/Building4.jpg")}),
        -5,0,0);
    cube4Object.add(cube4Mesh);
    scene.add(cube4Object);
    console.log("Cube4 added to scene...");
    
    // add cube5
    cube5Mesh = new gameObject(
        new CubeGeometry(1, 2, 1),
        new LambertMaterial({map: THREE.ImageUtils.loadTexture(
            "../../Content/Building5.jpg")}),
        -5,0,0);
    cube5Object.add(cube5Mesh);
    scene.add(cube5Object);
    console.log("Cube5 added to scene...");
    
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
    control = new Control();
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
}

function addControl(controlObject: Control): void {
    /* ENTER CODE for the GUI CONTROL HERE */
    /*
   gui.add(controlObject, 'rotateCube1');
    gui.add(controlObject, 'rotate').listen();
    
    gui.add(controlObject, 'rotateCube2');
    gui.add(controlObject, 'rotate').listen();
    
    gui.add(controlObject, 'rotateCube3');
    gui.add(controlObject, 'rotate').listen();
    
    gui.add(controlObject, 'rotateCube4');
    gui.add(controlObject, 'rotate').listen();
    
    gui.add(controlObject, 'rotateCube5');
    gui.add(controlObject, 'rotate').listen();
    */
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
    cube1Mesh.rotation.y += 0.015;
    cube2Mesh.rotation.y += 0.018;
    cube3Mesh.rotation.y += 0.016;
    cube4Mesh.rotation.y += 0.02;
    cube5Mesh.rotation.y += 0.01;
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x404040, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
    camera.position.x = 15.3;
    camera.position.y = 18.5;
    camera.position.z = -28.7;
    camera.rotation.set(-1.10305, 0.49742, -0.1396);
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

window.onload = init;

return {
    scene: scene
}

})();

