var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  The Scenes module is a namespace to reference all scene objects
 *
 * Source File Name:   game.ts
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
     * Menu Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     *
     * @class Menu
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     * @param _instructionButton {createjs.Bitmap}
     * @param _exitButton {createjs.Bitmap}
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Menu() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype._setupCanvas = function () {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#ffffff";
        };
        /**
         * This method sets up default values for class member variables
         * and objects
         *
         * @method _initialize
         * @return void
         */
        Menu.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Menu.prototype.start = function () {
            this._gameLabel = new createjs.Text("Dodge Meteor Shower", "60px Courgette", "#fff000");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = (config.Screen.HEIGHT * 0.15);
            this._stage.addChild(this._gameLabel);
            // create logo
            this._logo = new createjs.Bitmap(assets.getResult("Logo"));
            //this._logo.background = "ffffff";
            this._logo.regX = this._logo.getBounds().width * 0.5;
            this._logo.regY = (this._logo.getBounds().height * 0.5);
            this._logo.x = config.Screen.WIDTH * 0.5;
            this._logo.y = (config.Screen.HEIGHT * 0.3) + 30;
            this._stage.addChild(this._logo);
            // create start button
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = (this._startButton.getBounds().height * 0.5);
            this._startButton.x = config.Screen.WIDTH * 0.5;
            this._startButton.y = (config.Screen.HEIGHT * 0.3) + 140;
            this._stage.addChild(this._startButton);
            //Add mouseover effect on the start button
            this._startButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._startButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            //create mouse click event for start button
            this._startButton.on("click", function (event) {
                currentScene = config.Scene.PLAY1;
                changeScene();
            });
            // create instruction button
            this._instructionButton = new createjs.Bitmap(assets.getResult("InstructionButton"));
            this._instructionButton.regX = this._instructionButton.getBounds().width * 0.5;
            this._instructionButton.regY = (this._instructionButton.getBounds().height * 0.5);
            this._instructionButton.x = config.Screen.WIDTH * 0.5;
            this._instructionButton.y = (config.Screen.HEIGHT * 0.3) + 210;
            this._stage.addChild(this._instructionButton);
            //Add mouseover effect on the instruction button
            this._instructionButton.on("mouseover", function (event) {
                event.target.alpha = 0.8;
            });
            this._instructionButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            //create mouse click event for instruction button
            this._instructionButton.on("click", function (event) {
                currentScene = config.Scene.INSTRUCTION;
                changeScene();
            });
            // create exit button
            this._exitButton = new createjs.Bitmap(assets.getResult("ExitButton"));
            this._exitButton.regX = this._exitButton.getBounds().width * 0.5;
            this._exitButton.regY = (this._exitButton.getBounds().height * 0.5);
            this._exitButton.x = config.Screen.WIDTH * 0.5;
            this._exitButton.y = (config.Screen.HEIGHT * 0.3) + 280;
            this._stage.addChild(this._exitButton);
            //Add mouseover effect on the exit button
            this._exitButton.on("mouseover", function (event) {
                event.target.alpha = 0.8;
            });
            this._exitButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            //create mouse click event for exit button
            this._exitButton.on("click", function (event) {
                currentScene = config.Scene.EXIT;
                changeScene();
            });
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Menu.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Menu.prototype.resize = function () {
            this._setupCanvas();
        };
        return Menu;
    }(scenes.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));

//# sourceMappingURL=Menu.js.map
