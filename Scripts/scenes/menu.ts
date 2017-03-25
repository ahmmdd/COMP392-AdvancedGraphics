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
module scenes {
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
    export class Menu extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameLabel: createjs.Text;
        private _startButton: createjs.Bitmap;
        private _logo: createjs.Bitmap;
        private _instructionButton: createjs.Bitmap;
        private _exitButton: createjs.Bitmap;
        private keyboardControls: objects.KeyboardControls;
        private mouseControls: objects.MouseControls;

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
                "Dodge Meteor Shower",
                "60px Courgette",
                "#fff000");
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
            this._startButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._startButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for start button
            this._startButton.on("click", (event: createjs.MouseEvent) => {
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
            this._instructionButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.8;
            });

            this._instructionButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for instruction button
            this._instructionButton.on("click", (event: createjs.MouseEvent) => {
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
            this._exitButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.8;
            });

            this._exitButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for exit button
            this._exitButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.EXIT;
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