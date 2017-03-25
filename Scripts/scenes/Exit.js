var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  The Scenes module is a namespace to reference all scene objects
 *
 *  Source File Name:   Exit.ts
 *  Author Name(s):     Mohammed Juned Ahmed
 *                      Joshua Collaco
 *                      Ryan Sterling
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: April 20, 2016
 *  Revision History:   4.2.8
 *
 *  @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * Exit Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     *
     * @class Exit
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _credits {createjs.Text}
     * @param _logo {createjs.Bitmap}
     */
    var Exit = (function (_super) {
        __extends(Exit, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Exit() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Exit.prototype._setupCanvas = function () {
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
        Exit.prototype._initialize = function () {
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
        Exit.prototype.start = function () {
            // create logo
            this._logo = new createjs.Bitmap(assets.getResult("Logo"));
            this._logo.regX = this._logo.getBounds().width * 0.5;
            this._logo.regY = (this._logo.getBounds().height * 0.5);
            this._logo.x = config.Screen.WIDTH * 0.5;
            this._logo.y = (config.Screen.HEIGHT * 0.3);
            this._stage.addChild(this._logo);
            //
            this._gameLabel = new createjs.Text("Thank You for Playing, Enjoy!!!", "60px Courgette", "#fff000");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = (config.Screen.HEIGHT * 0.15);
            this._stage.addChild(this._gameLabel);
            //
            this._credits = new createjs.Text("Developed by:\nMohammed Ahmed\nJoshua Collaco\nRyan Sterling", "20px Courgette", "#000fff");
            this._credits.regX = this._credits.getMeasuredWidth() * 0.5;
            this._credits.regY = this._credits.getMeasuredLineHeight() * 0.5;
            this._credits.x = config.Screen.WIDTH * 0.5;
            this._credits.y = (config.Screen.HEIGHT * 0.15) + 360;
            this._stage.addChild(this._credits);
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Exit.prototype.update = function () {
            this._stage.update();
            this.keyboardControls.enabled = true;
            this.mouseControls.enabled = true;
            this.blocker.style.display = 'none';
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Exit.prototype.resize = function () {
            this._setupCanvas();
        };
        return Exit;
    }(scenes.Scene));
    scenes.Exit = Exit;
})(scenes || (scenes = {}));

//# sourceMappingURL=Exit.js.map
