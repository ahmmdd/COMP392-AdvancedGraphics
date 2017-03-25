/// <reference path="../core/_reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  The Scenes module is a namespace to reference all scene objects
 *
 *  Source File Name:   playleveltwo.ts
 *  Author Name(s):     Mohammed Juned Ahmed
 *                      Joshua Collaco
 *                      Ryan Sterling
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: April 18, 2016
 *  Revision History:   2.0.1
 *
 *  @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Play class is where the main action occurs for the game
     *
     * @class Play
     * @param havePointerLock {boolean}
     */
    var Play3 = (function (_super) {
        __extends(Play3, _super);
        /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        /**
         * @constructor
         */
        function Play3() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Play3.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Play3.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";
            // setup canvas for menu scene
            this._setupCanvas();
            this.coinCount = 10;
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            this.playersZPosition = 0;
            this.generatorCounter = 0;
            this.nextGroundZPosition = 55;
            // setup a THREE.JS Clock object
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
            this.playerSpeedZ = 2000;
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Play3.prototype.setupScoreboard = function () {
            this.targetValue = 1500;
            // Add Lives Label
            this.livesLabel = new createjs.Text("LIVES: " + livesValue, "40px Courgette", "#ffffff");
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");
            // Add Target Label
            this.targetLabel = new createjs.Text("Target: " + this.targetValue, "40px Courgette", "#0000ff");
            this.targetLabel.x = config.Screen.WIDTH * 0.4;
            this.targetLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.targetLabel);
            console.log("Added target Label to stage");
            // Add Score Label
            this.scoreLabel = new createjs.Text("SCORE: " + scoreValue, "40px Courgette", "#ffffff");
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        };
        /**
         * Add a spotLight to the scene
         *
         * @method addSpotLight
         * @return void
         */
        Play3.prototype.addSpotLight = function () {
            // Spot Light
            this.spotLight = new SpotLight(0xffffff);
            this.spotLight.position.set(0, 50, 0);
            this.spotLight.castShadow = true;
            this.spotLight.intensity = 2;
            this.spotLight.target = this.ground;
            this.spotLight.shadowCameraNear = 2;
            this.spotLight.shadowCameraFar = 200;
            this.spotLight.shadowCameraLeft = -5;
            this.spotLight.shadowCameraRight = 5;
            this.spotLight.shadowCameraTop = 5;
            this.spotLight.shadowCameraBottom = -5;
            this.spotLight.shadowMapWidth = 2048;
            this.spotLight.shadowMapHeight = 2048;
            this.spotLight.shadowDarkness = 0.5;
            this.spotLight.name = "Spot Light";
            this.add(this.spotLight);
            console.log("Added spotLight to scene");
        };
        /**
         *
         * creates new Spotlight
         */
        Play3.prototype.addSpotlightNext = function () {
            this.spotLightNext = new SpotLight(0xffffff);
            this.spotLightNext.position.set(0, 50, this.groundNext.position.z);
            this.spotLightNext.castShadow = true;
            this.spotLightNext.intensity = 2;
            this.spotLightNext.target = this.groundNext;
            this.spotLightNext.shadowCameraNear = 2;
            this.spotLightNext.shadowCameraFar = 200;
            this.spotLightNext.shadowCameraLeft = -5;
            this.spotLightNext.shadowCameraRight = 5;
            this.spotLightNext.shadowCameraTop = 5;
            this.spotLightNext.shadowCameraBottom = -5;
            this.spotLightNext.shadowMapWidth = 2048;
            this.spotLightNext.shadowMapHeight = 2048;
            this.spotLightNext.shadowDarkness = 0.5;
            this.spotLightNext.name = "Spot Light";
            this.add(this.spotLightNext);
            console.log("Added Second spotlight added to scene");
        };
        /**
         * Add a ground plane to the scene
         *
         * @method addGround
         * @return void
         */
        Play3.prototype.addGround = function () {
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 8);
            this.groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormal.repeat.set(8, 8);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;
            this.groundGeometry = new BoxGeometry(32, 1, 50);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.receiveShadow = true;
            this.ground.name = "Ground";
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        };
        /**
         * Initializes the first Ground
         *
         * @method initializeFirstGround
         */
        Play3.prototype.initializeFirstGround = function () {
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 8);
            this.groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormal.repeat.set(8, 8);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;
            this.groundGeometry = new BoxGeometry(32, 1, 50);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.receiveShadow = true;
            this.ground.position.set(0, 0, 0);
            this.ground.name = "Ground";
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        };
        /**
         * Initializes the second Ground
         *
         * @method Initialize the second ground
         */
        Play3.prototype.initializeSecondGround = function () {
            this.groundTextureNext = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTextureNext.wrapS = THREE.RepeatWrapping;
            this.groundTextureNext.wrapT = THREE.RepeatWrapping;
            this.groundTextureNext.repeat.set(8, 8);
            this.groundTextureNormalNext = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTextureNormalNext.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormalNext.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormalNext.repeat.set(8, 8);
            this.groundMaterialNext = new PhongMaterial();
            this.groundMaterialNext.map = this.groundTexture;
            this.groundMaterialNext.bumpMap = this.groundTextureNormal;
            this.groundMaterialNext.bumpScale = 0.2;
            this.groundGeometryNext = new BoxGeometry(32, 1, 50);
            this.groundPhysicsMaterialNext = Physijs.createMaterial(this.groundMaterialNext, 0, 0);
            this.groundNext = new Physijs.ConvexMesh(this.groundGeometryNext, this.groundPhysicsMaterial, 0);
            this.groundNext.receiveShadow = true;
            this.groundNext.name = "Ground";
            if (this.generatorCounter % 2 == 0) {
                this.groundNext.position.set(0, 3, this.nextGroundZPosition);
            }
            else {
                this.groundNext.position.set(0, 0, this.nextGroundZPosition);
            }
            this.add(this.groundNext);
            console.log("Added Road Ground to scene");
        };
        /**
         * creates the pickup at a random place
         */
        Play3.prototype.createPickups = function () {
            var max = this.nextGroundZPosition;
            var min = this.nextGroundZPosition - 15;
            this.sphereGeometryPickup = new SphereGeometry(1, 32, 32);
            this.sphereMaterialPickup = Physijs.createMaterial(new LambertMaterial({ color: 0xffaa11 }), 0.4, 0);
            this.spherePickup = new Physijs.SphereMesh(this.sphereGeometryPickup, this.sphereMaterialPickup, 1);
            this.spherePickup.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 50, Math.floor(Math.random() * (max - min + 1)) + min);
            this.spherePickup.name = "Coin";
            this.add(this.spherePickup);
        };
        Play3.prototype.initializeEnemies = function () {
            this.enemyGeometry = new BoxGeometry(4, 4, 4);
            this.smallEmemyGeomentry = new BoxGeometry(1, 1, 1);
            this.enemyMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0xff0000 }), 0.4, 0);
            this.smallEmemyMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0xfff000 }), 0.4, 0);
            this.enemyOne = new Physijs.BoxMesh(this.enemyGeometry, this.enemyMaterial, 1);
            this.enemyOne.position.set(0, 0, 10);
            this.enemyOne.receiveShadow = true;
            this.enemyOne.castShadow = true;
            this.enemyOne.name = "Enemy One";
            this.enemyTwo = new Physijs.BoxMesh(this.enemyGeometry, this.enemyMaterial, 1);
            this.enemyTwo.position.set(8, 0, 10);
            this.enemyTwo.receiveShadow = true;
            this.enemyTwo.castShadow = true;
            this.enemyTwo.name = "Enemy Two";
            this.enemyThree = new Physijs.BoxMesh(this.enemyGeometry, this.enemyMaterial, 1);
            this.enemyThree.position.set(-8, 0, 10);
            this.enemyThree.receiveShadow = true;
            this.enemyThree.castShadow = true;
            this.enemyThree.name = "Enemy Three";
            this.enemyFour = new Physijs.BoxMesh(this.smallEmemyGeomentry, this.smallEmemyMaterial, 1);
            this.enemyFour.position.set(0, 0, 10);
            this.enemyFour.receiveShadow = true;
            this.enemyFour.castShadow = true;
            this.enemyFour.name = "Enemy Four";
            this.enemyFive = new Physijs.BoxMesh(this.smallEmemyGeomentry, this.smallEmemyMaterial, 1);
            this.enemyFive.position.set(8, 0, 10);
            this.enemyFive.receiveShadow = true;
            this.enemyFive.castShadow = true;
            this.enemyFive.name = "Enemy Five";
            this.enemySix = new Physijs.BoxMesh(this.smallEmemyGeomentry, this.smallEmemyMaterial, 1);
            this.enemySix.position.set(-8, 0, 10);
            this.enemySix.receiveShadow = true;
            this.enemySix.castShadow = true;
            this.enemySix.name = "Enemy Six";
            this.enemySeven = new Physijs.BoxMesh(this.smallEmemyGeomentry, this.smallEmemyMaterial, 1);
            this.enemySeven.position.set(-8, 0, 10);
            this.enemySeven.receiveShadow = true;
            this.enemySeven.castShadow = true;
            this.enemySeven.name = "Enemy Seven";
            console.log("Enemies added");
            this.add(this.enemyOne);
            this.add(this.enemyTwo);
            this.add(this.enemyThree);
            this.add(this.enemyFour);
            this.add(this.enemyFive);
            this.add(this.enemySix);
            this.add(this.enemySeven);
        };
        Play3.prototype.spawnEnemies = function () {
            var max = this.nextGroundZPosition;
            var min = this.nextGroundZPosition - 15;
            this.enemyOne.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 50, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemyTwo.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 40, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemyThree.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 30, Math.floor(Math.random() * (max - min + 1)) + min);
            this.add(this.enemyOne);
            this.add(this.enemyTwo);
            this.add(this.enemyThree);
        };
        Play3.prototype.spawnSmallEnemies = function () {
            var max = this.nextGroundZPosition;
            var min = this.nextGroundZPosition - 15;
            this.enemyFour.position.set(Math.floor(Math.random() * (5 - -5 + 1)) + -15, 55, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemyFive.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 45, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemySix.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 35, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemySix.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 32, Math.floor(Math.random() * (max - min + 1)) + min);
            this.add(this.enemyFour);
            this.add(this.enemyFive);
            this.add(this.enemySix);
            this.add(this.enemySeven);
        };
        /**
         * creates the rolling ground effect
         *
         */
        Play3.prototype.createNewGround = function () {
            if (this.generatorCounter % 2 == 0) {
                //------Remove Everything-------//
                this.remove(this.groundNext);
                this.remove(this.spotLightNext);
                this.remove(this.spherePickup);
                //------Remove All Enemies------//
                this.remove(this.enemyOne);
                this.remove(this.enemyTwo);
                this.remove(this.enemyThree);
                //-------Take Care of the Environment-------//
                this.spawnEnemies();
                this.spawnSmallEnemies();
                if (this.generatorCounter % 2 == 0) {
                    this.groundNext.position.set(0, 3, this.nextGroundZPosition);
                }
                else {
                    this.groundNext.position.set(0, 0, this.nextGroundZPosition);
                }
                this.createPickups();
                this.spotLightNext.position.set(0, 50, this.groundNext.position.z);
                this.spotLightNext.target = this.groundNext;
                this.add(this.groundNext);
                this.add(this.spotLightNext);
            }
            else if (this.generatorCounter % 2 != 0) {
                //------Remove Everything -------//
                this.remove(this.ground);
                this.remove(this.spotLight);
                this.remove(this.spherePickup);
                //------Remove All Enemies------//
                this.remove(this.enemyOne);
                this.remove(this.enemyTwo);
                this.remove(this.enemyThree);
                this.remove(this.enemyFour);
                this.remove(this.enemyFive);
                this.remove(this.enemySix);
                this.remove(this.enemySeven);
                //-------Take Care of the Environment-------//
                this.spawnEnemies();
                this.spawnSmallEnemies();
                if (this.generatorCounter % 2 == 0) {
                    this.groundNext.position.set(0, 3, this.nextGroundZPosition);
                }
                else {
                    this.groundNext.position.set(0, 0, this.nextGroundZPosition);
                }
                this.createPickups();
                this.spotLight.position.set(0, 50, this.ground.position.z);
                this.spotLight.target = this.ground;
                this.add(this.ground);
                this.add(this.spotLight);
            }
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Play3.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 2, 3);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 10, -10);
            this.player.rotation.y = 3.14159;
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            console.log("Added Player to Scene");
        };
        /**
         * Add the death plane to the scene
         *
         * @method addDeathPlane
         * @return void
         */
        Play3.prototype.addDeathPlane = function () {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, 100);
            this.deathPlaneMaterial = Physijs.createMaterial(new MeshBasicMaterial({ color: 0xff0000 }), 0.4, 0.6);
            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -10, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
        };
        /**
         * This method adds a coin to the scene
         *
         * @method addCoinMesh
         * @return void
         */
        Play3.prototype.addCoinMesh = function () {
            var self = this;
            this.coins = new Array(); // Instantiate a convex mesh array
            var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function (geometry) {
                var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
                phongMaterial.emissive = new THREE.Color(0xE7AB32);
                var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < self.coinCount; count++) {
                    self.coins[count] = new Physijs.ConvexMesh(geometry, coinMaterial);
                    self.coins[count].receiveShadow = true;
                    self.coins[count].castShadow = true;
                    self.coins[count].name = "Coin";
                    self.setCoinPosition(self.coins[count]);
                    console.log("Added Coin Mesh to Scene, at position: " + self.coins[count].position);
                }
            });
        };
        /**
         * This method randomly sets the coin object's position
         *
         * @method setCoinPosition
         * @return void
         */
        Play3.prototype.setCoinPosition = function (coin) {
            var randomPointX = Math.floor(Math.random() * 20) - 10;
            var randomPointZ = Math.floor(Math.random() * 20) - 10;
            coin.position.set(randomPointX, 10, randomPointZ);
            this.add(coin);
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Play3.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                // disable our mouse and keyboard controls
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                this.blocker.style.display = '-webkit-box';
                this.blocker.style.display = '-moz-box';
                this.blocker.style.display = 'box';
                this.instructions.style.display = '';
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Play3.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Play3.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3(0, 23, 0);
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                if (this.isGrounded) {
                    var direction = new Vector3(0, 0, 0);
                    if (this.keyboardControls.moveForward) {
                        this.velocity.z -= this.playerSpeedZ * delta;
                    }
                    if (this.keyboardControls.moveLeft) {
                        this.velocity.x -= 400.0 * delta;
                    }
                    if (this.keyboardControls.moveBackward) {
                        this.velocity.z += 2000.0 * delta;
                    }
                    if (this.keyboardControls.moveRight) {
                        this.velocity.x += 400.0 * delta;
                    }
                    //Add Super Jump here
                    if (this.keyboardControls.jump) {
                        this.velocity.y += 5000.0 * delta;
                        if (this.player.position.y > 5) {
                            this.isGrounded = false;
                        }
                    }
                    this.player.setDamping(0.7, 0.1);
                    // Changing player's rotation
                    this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                    direction.addVectors(direction, this.velocity);
                    direction.applyQuaternion(this.player.quaternion);
                    if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                        this.player.applyCentralForce(direction);
                    }
                    this.cameraLook();
                } // isGrounded ends
                else if (!this.isGrounded) {
                    //fall
                    this.velocity.y -= 2500 * delta;
                    var direction = new Vector3(0, 0, 0);
                    if (this.keyboardControls.moveForward) {
                        this.velocity.z -= this.playerSpeedZ * 3 * delta;
                    }
                    if (this.keyboardControls.moveLeft) {
                        this.velocity.x -= 4000.0 * delta;
                    }
                    if (this.keyboardControls.moveBackward) {
                        this.velocity.z += 5000.0 * delta;
                    }
                    if (this.keyboardControls.moveRight) {
                        this.velocity.x += 4000.0 * delta;
                    }
                    if (this.player.position.y < 2) {
                        this.isGrounded = true;
                    }
                    this.player.setDamping(0.7, 0.1);
                    // Changing player's rotation
                    this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                    direction.addVectors(direction, this.velocity);
                    direction.applyQuaternion(this.player.quaternion);
                    if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                        this.player.applyCentralForce(direction);
                    }
                    this.cameraLook();
                }
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
                // For Switching Scenes
                if (this.keyboardControls.switchLevelOne) {
                    document.exitPointerLock();
                    this.children = []; //Clean up children objects
                    console.log(this);
                    currentScene = config.Scene.PLAY1;
                    changeScene();
                }
                if (this.keyboardControls.switchLevelTwo) {
                    document.exitPointerLock();
                    this.children = []; //Clean up children objects
                    console.log(this);
                    currentScene = config.Scene.PLAY2;
                    changeScene();
                }
                if (this.keyboardControls.switchLevelThree) {
                    document.exitPointerLock();
                    this.children = []; //Clean up children objects
                    console.log(this);
                    currentScene = config.Scene.PLAY3;
                    changeScene();
                }
                if (this.keyboardControls.switchMenu) {
                    document.exitPointerLock();
                    this.children = []; //Clean up children objects
                    console.log(this);
                    this.keyboardControls.enabled = true;
                    this.mouseControls.enabled = true;
                    this.blocker.style.display = 'none';
                    currentScene = config.Scene.MENU;
                    changeScene();
                }
                if (this.keyboardControls.switchOver) {
                    document.exitPointerLock();
                    this.children = []; //Clean up children objects
                    console.log(this);
                    this.keyboardControls.enabled = true;
                    this.mouseControls.enabled = true;
                    this.blocker.style.display = 'none';
                    currentScene = config.Scene.OVER;
                    changeScene();
                }
                if (this.keyboardControls.switchInstructions) {
                    document.exitPointerLock();
                    this.children = []; //Clean up children objects
                    console.log(this);
                    this.keyboardControls.enabled = true;
                    this.mouseControls.enabled = true;
                    this.blocker.style.display = 'none';
                    currentScene = config.Scene.INSTRUCTION;
                    changeScene();
                }
            } // Controls Enabled ends
            else {
                this.player.setAngularVelocity(new Vector3(0, 0, 0));
            }
        };
        /**
         * Death Condition Created when player falls below specific y
         *
         * @Method
         */
        Play3.prototype.deathCheck = function () {
            if (this.player.position.y <= -5) {
                createjs.Sound.play("hit");
                livesValue--;
                this.livesLabel.text = "LIVES: " + livesValue;
                this.remove(this.player);
                this.player.position.set(0, 10, this.nextGroundZPosition);
                this.player.rotation.y = 3.14159 * 2;
                if (livesValue === 0) {
                    scene = new scenes.Over();
                    scene.update();
                    console.log("Starting over Scene");
                }
                this.add(this.player);
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Play3.prototype.start = function () {
            var _this = this;
            // Set Up Scoreboard
            this.setupScoreboard();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, 10, 0));
            // Ground Object
            this.initializeFirstGround();
            // Ground Second Object
            this.initializeSecondGround();
            // Add Spot Light to the scene
            this.addSpotLight();
            //Add Second Spotlight to the scene
            this.addSpotlightNext();
            this.createPickups();
            this.initializeEnemies();
            // Add player controller
            this.addPlayer();
            // Add custom coin imported from Blender
            //this.addCoinMesh();
            // Add death plane to the scene
            //this.addDeathPlane();
            // Collision Check
            this.player.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "Ground") {
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "Coin") {
                    createjs.Sound.play("coin");
                    this.remove(eventObject);
                    this.setCoinPosition(eventObject);
                    scoreValue += 50;
                    this.scoreLabel.text = "SCORE: " + scoreValue;
                    this.playerSpeedZ += 500;
                }
                if (eventObject.name === "Enemy One"
                    || eventObject.name === "Enemy Two"
                    || eventObject.name === "Enemy Three") {
                    createjs.Sound.play("hit");
                    livesValue--;
                    this.livesLabel.text = "LIVES: " + livesValue;
                }
            }.bind(this));
            // create parent-child relationship with camera and player 
            this.player.add(camera);
            camera.position.set(0, 1, 0);
            this.simulate();
        };
        Play3.prototype.playerPositionCheck = function () {
            this.playersZPosition = this.player.position.z;
            if (this.playersZPosition > this.nextGroundZPosition) {
                this.nextGroundZPosition += 55;
                console.log("Player z: " + this.player.position.z + "\n");
                this.generatorCounter++;
                console.log(this.generatorCounter);
                this.createNewGround();
            }
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Play3.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(90);
            var nadir = THREE.Math.degToRad(-90);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Play3.prototype.update = function () {
            // this.coins.forEach(coin => {
            //     coin.setAngularFactor(new Vector3(0, 0, 0));
            //     coin.setAngularVelocity(new Vector3(0, 1, 0));
            // });
            this.checkControls();
            this.stage.update();
            this.playerPositionCheck();
            this.endState();
            this.deathCheck();
            this.simulate();
            // console.log("X "+this.player.position.x);
            // console.log("Y"+this.player.position.y);
            // console.log("Z "+this.player.position.z);
            //this.createNewEnemies();
        };
        Play3.prototype.endState = function () {
            if (scoreValue >= 1500) {
                console.log("SHOULD CHANGE SCENE");
                currentScene = config.Scene.OVER;
                changeScene();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Play3.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Play3;
    }(scenes.Scene));
    scenes.Play3 = Play3;
})(scenes || (scenes = {}));

//# sourceMappingURL=Play3.js.map