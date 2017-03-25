/// <reference path="../core/_reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  The Scenes module is a namespace to reference all scene objects
 *
 *  Source File Name:   play.ts
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
    var Play1 = (function (_super) {
        __extends(Play1, _super);
        /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
        /**
         * @constructor
         */
        function Play1() {
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
        Play1.prototype._setupCanvas = function () {
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
        Play1.prototype._initialize = function () {
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
            this.nextGroundZPosition = 20;
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
        Play1.prototype.setupScoreboard = function () {
            // initialize  score and lives values
            scoreValue = 0;
            livesValue = 10;
            this.targetValue = 500;
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
        Play1.prototype.addSpotLight = function () {
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
            this.dirLight = new DirectionalLight(0xffffff, 1);
            this.add(this.dirLight);
            console.log("Added dir Light to scene");
        };
        /**
         * Initializes the first Ground
         *
         * @method initializeFirstGround
         */
        Play1.prototype.initializeFirstGround = function () {
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/road-seamless.jpg');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(4, 256);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundGeometry = new BoxGeometry(32, 1, 4000);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.receiveShadow = true;
            this.ground.position.set(0, 0, 1950);
            this.ground.name = "Ground";
            this.add(this.ground);
            console.log("Added Burnt Ground to scene");
        };
        Play1.prototype.createPickups = function () {
            var max = this.nextGroundZPosition + 75;
            var min = this.nextGroundZPosition + 50;
            this.sphereGeometryPickup = new SphereGeometry(1, 32, 32);
            this.sphereMaterialPickup = Physijs.createMaterial(new LambertMaterial({ color: 0xffaa11 }), 0.4, 0);
            this.spherePickup = new Physijs.SphereMesh(this.sphereGeometryPickup, this.sphereMaterialPickup, 1);
            this.spherePickup.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 10, Math.floor(Math.random() * (max - min + 1)) + min);
            this.spherePickup.name = "Coin";
            this.add(this.spherePickup);
        };
        Play1.prototype.initializeEnemies = function () {
            this.enemyGeometry = new BoxGeometry(4, 4, 4);
            this.enemyMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0xff0000 }), 0.4, 0);
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
            console.log("Enemies added");
            this.add(this.enemyOne);
            this.add(this.enemyTwo);
            this.add(this.enemyThree);
        };
        Play1.prototype.spawnEnemies = function () {
            var max = this.nextGroundZPosition + 75;
            var min = this.nextGroundZPosition + 15;
            this.enemyOne.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 50, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemyTwo.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 40, Math.floor(Math.random() * (max - min + 1)) + min);
            this.enemyThree.position.set(Math.floor(Math.random() * (15 - -15 + 1)) + -15, 30, Math.floor(Math.random() * (max - min + 1)) + min);
            this.add(this.enemyOne);
            this.add(this.enemyTwo);
            this.add(this.enemyThree);
        };
        Play1.prototype.spawnEnemies2 = function () {
            var minZPos = this.nextGroundZPosition + 50;
            var maxZPos = this.nextGroundZPosition + 150;
            var ranZPosition = Math.random() * (maxZPos - minZPos) + minZPos;
            var minYPos = 30;
            var maxYPos = 50;
            var ranYPosition = Math.random() * (maxYPos - minYPos) + minYPos;
            var minXPos = -13;
            var maxXPos = 13;
            var ranXPosition = Math.random() * (maxXPos - minXPos) + minXPos;
            var minRot = -45;
            var maxRot = 45;
            var ranRot = Math.random() * (maxRot - minRot) + minRot;
            this.enemyGeometry = new BoxGeometry(4, 4, 4);
            this.enemyMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x550055 }), 0.4, 0);
            this.enemyOne = new Physijs.BoxMesh(this.enemyGeometry, this.enemyMaterial, 1);
            this.enemyOne.position.set(ranXPosition, ranYPosition, ranZPosition);
            this.enemyOne.rotation.set(ranRot, ranRot, ranRot);
            this.enemyOne.receiveShadow = true;
            this.enemyOne.castShadow = true;
            this.enemyOne.name = "Enemy One";
            ranZPosition = Math.random() * (maxZPos - minZPos) + minZPos;
            ranYPosition = Math.random() * (maxYPos - minYPos) + minYPos;
            ranXPosition = Math.random() * (maxXPos - minXPos) + minXPos;
            ranRot = Math.random() * (maxRot - minRot) + minRot;
            this.enemyTwo = new Physijs.BoxMesh(this.enemyGeometry, this.enemyMaterial, 1);
            this.enemyTwo.position.set(ranXPosition, ranYPosition, ranZPosition);
            this.enemyTwo.rotation.set(ranRot, ranRot, ranRot);
            this.enemyTwo.receiveShadow = true;
            this.enemyTwo.castShadow = true;
            this.enemyTwo.name = "Enemy Two";
            ranZPosition = Math.random() * (maxZPos - minZPos) + minZPos;
            ranYPosition = Math.random() * (maxYPos - minYPos) + minYPos;
            ranXPosition = Math.random() * (maxXPos - minXPos) + minXPos;
            ranRot = Math.random() * (maxRot - minRot) + minRot;
            this.enemyThree = new Physijs.BoxMesh(this.enemyGeometry, this.enemyMaterial, 1);
            this.enemyThree.position.set(ranXPosition, ranYPosition, ranZPosition);
            this.enemyThree.rotation.set(ranRot, ranRot, ranRot);
            this.enemyThree.receiveShadow = true;
            this.enemyThree.castShadow = true;
            this.enemyThree.name = "Enemy Three";
            console.log("Enemies added");
            this.add(this.enemyOne);
            this.add(this.enemyTwo);
            this.add(this.enemyThree);
        };
        /**
         * creates the rolling ground effect
         *
         */
        Play1.prototype.newCheckpoint = function () {
            this.spawnEnemies2();
            this.createPickups();
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Play1.prototype.addPlayer = function () {
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
        Play1.prototype.addDeathPlane = function () {
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
        Play1.prototype.addCoinMesh = function () {
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
        Play1.prototype.setCoinPosition = function (coin) {
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
        Play1.prototype.pointerLockChange = function (event) {
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
        Play1.prototype.pointerLockError = function (event) {
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
        Play1.prototype.checkControls = function () {
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
                        this.velocity.y += 9000.0 * delta;
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
        Play1.prototype.deathCheck = function () {
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
        Play1.prototype.start = function () {
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
            this.fog = new THREE.Fog(0xffffff, 0, 2750);
            this.setGravity(new THREE.Vector3(0, -10, 0));
            // Ground Object
            this.initializeFirstGround();
            // Add Spot Light to the scene
            this.addSpotLight();
            this.createPickups();
            this.initializeEnemies();
            // Add player controller
            this.addPlayer();
            this.spotLight.target = this.player;
            this.player.add(this.spotLight);
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
                    //eventObject.applyCentralForce(new Vector3(0, 9000, 0));
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
        Play1.prototype.playerPositionCheck = function () {
            this.playersZPosition = this.player.position.z;
            if (this.playersZPosition > this.nextGroundZPosition) {
                this.nextGroundZPosition += 150;
                var minZ = 30;
                var maxZ = 150;
                var ranZ = Math.random() * (maxZ - minZ) + minZ;
                this.nextGroundZPosition += ranZ;
                console.log("Player z: " + this.player.position.z + "\n");
                this.generatorCounter++;
                console.log(this.generatorCounter);
                this.newCheckpoint();
            }
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Play1.prototype.cameraLook = function () {
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
        Play1.prototype.update = function () {
            this.checkControls();
            this.stage.update();
            this.playerPositionCheck();
            this.deathCheck();
            this.endState();
            this.simulate();
        };
        Play1.prototype.endState = function () {
            if (scoreValue >= 500) {
                console.log("SHOULD CHANGE SCENE");
                currentScene = config.Scene.PLAY2;
                changeScene();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Play1.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Play1;
    }(scenes.Scene));
    scenes.Play1 = Play1;
})(scenes || (scenes = {}));

//# sourceMappingURL=Play1.js.map
