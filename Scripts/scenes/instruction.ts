/**
 * @module scenes
 */
module scenes {
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
    export class Instruction extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _instructionLabel: createjs.Text;
        private _startButton: createjs.Bitmap;
        private _exitButton: createjs.Bitmap;

        /**
         * Empty Constructor - calls _initialize and start methods
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++

        private _setupCanvas(): void {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#ffffff";
        }


        /**
         * This method sets up default values for class member variables
         * and objects
         * 
         * @method _initialize
         * @return void
         */
        private _initialize(): void {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";

            // setup canvas for instruction scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            this._instructionLabel = new createjs.Text(
                "Game Rules:",
                "80px Consolas",
                "#fff000");
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
            this._startButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._startButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for start button
            this._startButton.on("click", (event: createjs.MouseEvent) => {
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
            
        }

        /**
         * The update method updates the animation loop and other objects
         * 
         * @method update
         * @return void
         */
        public update(): void {
            this._stage.update();
        }

        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            this._setupCanvas();
        }
    }
}