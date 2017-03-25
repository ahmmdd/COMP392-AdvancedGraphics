/**
 * @module scenes
 */
module scenes {
    /**
     * Over Scene extends scenes.Scene superclass is used to
     * create a custom over for the THREEJS Game
     * 
     * @class over
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _playAgainButton {createjs.Bitmap}
     */
    export class Over extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameLabel: createjs.Text;
        private _playAgainButton: createjs.Bitmap;

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

            // setup canvas for menu scene
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
            this._gameLabel = new createjs.Text(
                "Game Over!!!",
                "80px Consolas",
                "#fff000");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = (config.Screen.HEIGHT * 0.15);
            this._stage.addChild(this._gameLabel);
            /*
            this.score = new createjs.Text(
                "Your Score is: ",
                "40px Consolas",
                "#ff0000"
            );
            */
            // create play again button
            this._playAgainButton = new createjs.Bitmap(assets.getResult("PlayAgainButton"));
            this._playAgainButton.scaleX = 1.5;
            this._playAgainButton.scaleY = 1.5;
            this._playAgainButton.regX = this._playAgainButton.getBounds().width * 0.5;
            this._playAgainButton.regY = (this._playAgainButton.getBounds().height * 0.5);
            this._playAgainButton.x = config.Screen.WIDTH * 0.5;
            this._playAgainButton.y = (config.Screen.HEIGHT * 0.5);
            this._stage.addChild(this._playAgainButton);
            //Add mouseover effect on the start button
            this._playAgainButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._playAgainButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for start button
            this._playAgainButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.PLAY;
                changeScene();
            });
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