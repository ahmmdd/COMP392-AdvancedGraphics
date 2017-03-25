var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * Instruction Scene extends scenes.Scene superclass is used to
     * create a custom instruction for the game in THREEJS
     *
     * @class Instruction
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _instructionLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     * @param _exitButton {createjs.Bitmap}
     */
    var Instruction = (function (_super) {
        __extends(Instruction, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Instruction() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Instruction.prototype._setupCanvas = function () {
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
        Instruction.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for instruction scene
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
        Instruction.prototype.start = function () {
            this._instructionLabel = new createjs.Text("Game Rules:", "80px Consolas", "#fff000");
            this._instructionLabel.regX = this._instructionLabel.getMeasuredWidth() * 0.5;
            this._instructionLabel.regY = this._instructionLabel.getMeasuredLineHeight() * 0.5;
            this._instructionLabel.x = config.Screen.WIDTH * 0.5;
            this._instructionLabel.y = (config.Screen.HEIGHT * 0.15);
            this._stage.addChild(this._instructionLabel);
            // create start button
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.scaleX = 0.45;
            this._startButton.scaleY = 0.45;
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = (this._startButton.getBounds().height * 0.5);
            this._startButton.x = config.Screen.WIDTH * 0.25;
            this._startButton.y = (config.Screen.HEIGHT * 0.9);
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
                currentScene = config.Scene.PLAY;
                changeScene();
            });
            // create exit button
            this._exitButton = new createjs.Bitmap(assets.getResult("ExitButton"));
            this._exitButton.scaleX = 0.5;
            this._exitButton.scaleY = 0.5;
            this._exitButton.regX = this._exitButton.getBounds().width * 0.5;
            this._exitButton.regY = (this._exitButton.getBounds().height * 0.5);
            this._exitButton.x = config.Screen.WIDTH * 0.75;
            this._exitButton.y = (config.Screen.HEIGHT * 0.9);
            this._stage.addChild(this._exitButton);
            //Add mouseover effect on the exit button
            /*
            this._exitButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.8;
            });

            this._exitButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for exit button
            this._exitButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.OVER;
                changeScene();
            });*/
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Instruction.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Instruction.prototype.resize = function () {
            this._setupCanvas();
        };
        return Instruction;
    }(scenes.Scene));
    scenes.Instruction = Instruction;
})(scenes || (scenes = {}));

//# sourceMappingURL=instruction.js.map
