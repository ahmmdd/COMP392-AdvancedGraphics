/**
 *  This is the game.ts file that calls all the scene files for the 
 *  game
 *  
 *  Source File Name:   game.ts
 *  Author Name(s):     Mohammed Juned Ahmed
 *                      Joshua Collaco
 *                      Ryan Sterling 
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: April 17, 2016
 *  Revision History:   1.5.2
 */
/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = Physijs.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import CylinderGeometry = THREE.CylinderGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import LineBasicMaterial = THREE.LineBasicMaterial;
import PhongMaterial = THREE.MeshPhongMaterial;
import Material = THREE.Material;
import Texture = THREE.Texture;
import Line = THREE.Line;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import DirectionalLight = THREE.DirectionalLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import CScreen = config.Screen;
import Clock = THREE.Clock;
import ShaderMaterial = THREE.ShaderMaterial;
import Uniform = THREE.UniformsLib;


// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";

// Game Variables
var scene: scenes.Scene;
var currentScene: number;
var renderer: Renderer;
var camera: PerspectiveCamera;

var play: scenes.Play1;
var menu: scenes.Menu;
var instruction: scenes.Instruction;
var over: scenes.Over;
var playtwo: scenes.Play2;
var playThree: scenes.Play3;
var exit: scenes.Exit;
var scoreValue: number;
var livesValue: number;

var stats: Stats;
var canvas: HTMLElement;
var assets: createjs.LoadQueue;
var manifest = [
    { id: "land", src: "../../Assets/audio/Land.wav" },
    { id: "hit", src: "../../Assets/audio/Crash.wav" },
    { id: "coin", src: "../../Assets/audio/coin.mp3" },
    { id: "accelerate", src: "../../Assets/audio/accelerate.mp3" },
    { id: "jump", src: "../../Assets/audio/Jump.wav" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png"},
    { id: "InstructionButton", src : "../../Assets/images/InstructionButton.png"},
    { id: "CanvasBackground", src : "../../Assets/images/IngameBackground.jpg"},
    { id: "ExitButton", src: "../../Assets/images/ExitButton.png"},
    { id: "Background", src: "../../Assets/images/Background.jpg" },
    { id: "PlayAgainButton", src: "../../Assets/images/PlayAgainButton.png" },
    { id: "BackgroundMusic", src: "../../Assets/audio/BackgroundMusic.mp3"},
    { id: "ContinueButton", src: "../../Assets/images/ContinueButton.png"},
    { id: "MenuButton", src: "../../Assets/images/MenuButton.png"},
    { id: "Logo", src: "../../Assets/images/Logo.png"},
    { id: "Screenshot", src: "../../Assets/images/ss.png"}
];

function preload(): void {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}

function setupCanvas(): void {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", config.Screen.WIDTH.toString());
    canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "100% 100%";
    canvas.style.backgroundImage = "url('../Assets/images/Background.jpg')";
}

function init(): void {
    // setup the canvas for the game
    setupCanvas();

    // setup the default renderer
    setupRenderer();

    // setup the camera
    setupCamera();

    // set initial scene
    currentScene = config.Scene.MENU;
    changeScene();

    // Add framerate stats
    addStatsObject();

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	

    // setup the resize event listener
    window.addEventListener('resize', onWindowResize, false);
}

// Window Resize Event Handler
function onWindowResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.resize();
}

// Add Frame Rate Stats to the Scene
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
    createjs.Sound.play("BackgroundMusic",{loop:-1});
    stats.update();

    scene.update();

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);

    // render the scene
    renderer.render(scene, camera);
}


// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer({ antialias: true });
    renderer.setClearColor(0x404040, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(55, config.Screen.RATIO, 0.1, 500);
    console.log("Finished setting up Camera...");
}

function changeScene(): void {
    // Launch various scenes
    switch (currentScene) {
        case config.Scene.MENU:
            // show the MENU scene
            menu = new scenes.Menu();
            scene = menu;
            console.log("Starting MENU Scene"); 
            break;
        case config.Scene.PLAY1:
            //show the PLAY scene
            play = new scenes.Play1();
            scene = play;
            scene.setGravity(new THREE.Vector3(0, -50, 0));
            console.log("Starting PLAY Scene");
            break;
        case config.Scene.OVER:
            // show the game OVER scene
            over = new scenes.Over();
            scene = over;
            console.log("Starting OVER Scene");
            break;
        case config.Scene.PLAY2:
            playtwo = new scenes.Play2();
            scene = playtwo;
            scene.setGravity(new THREE.Vector3(0, -50, 0));
            console.log("Starting PLAYTWO Scene");
            break;
        case config.Scene.INSTRUCTION:
            // show instructions scene
             instruction = new scenes.Instruction();
             scene = instruction;
             console.log("Starting INSTRUCTION Scene");   
            break;
        case config.Scene.PLAY3:
            //show play three scene
            playThree = new scenes.Play3();
            scene = playThree;
            scene.setGravity(new THREE.Vector3(0, -50, 0));
            console.log("Starting PLAYTHREE Scene");
            break;
        case config.Scene.EXIT:
            //show exit scene
            exit = new scenes.Exit();
            scene = exit;
            console.log("Starting PLAYTHREE Scene");
            break;
    }
}

window.onload = preload;

