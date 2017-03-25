/**
 *  The Scenes module is a namespace to reference all scene objects
 *  
 *  Source File Name:   instruction.ts
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
     * Instruction Scene extends scenes.Scene superclass is used to
     * create a custom instruction for the game in THREEJS
     * 
     * @class Instruction
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _instructionLabel {createjs.Text}
     * @param _instructionInformationLabel {createjs.Text}
     * @param _menuButton {createjs.Bitmap}
     * @param _exitButton {createjs.Bitmap}
     * @param _screenShot {createjs.Bitmap}
     */
    export class Instruction extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _instructionLabel: createjs.Text;
        private _instructionInformationLabel: createjs.Text;
        private _instructionInformationLabel2: createjs.Text;
        private _menuButton: createjs.Bitmap;
        private _exitButton: createjs.Bitmap;
        private _screenShot: createjs.Bitmap;

        /**
         * Empty Constructor - calls _initialize and menu methods
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
            //Game rule label
            this._instructionLabel = new createjs.Text(
                "Game Rules:",
                "80px Courgette",
                "#fff000");
            this._instructionLabel.regX = this._instructionLabel.getMeasuredWidth() * 0.5;
            this._instructionLabel.regY = this._instructionLabel.getMeasuredLineHeight() * 0.5;
            this._instructionLabel.x = config.Screen.WIDTH * 0.5;
            this._instructionLabel.y = (config.Screen.HEIGHT * 0.15);
            this._stage.addChild(this._instructionLabel);
            
            
            //instructions part 1
            this._instructionInformationLabel = new createjs.Text(
                "Avoid colliding with the cubes\nReach target score by collecting spheres\n\nControls:",
                "20px Courgette",
                "#00ff00");
            //this._instructionInformationLabel.regX = this._instructionInformationLabel.getMeasuredWidth() * 0.5;
            this._instructionInformationLabel.regY = this._instructionInformationLabel.getMeasuredLineHeight() * 0.5;
            this._instructionInformationLabel.x = config.Screen.WIDTH * 0.1;
            this._instructionInformationLabel.y = (config.Screen.HEIGHT * 0.35);
            this._stage.addChild(this._instructionInformationLabel);
            
            //instructions part 2
            this._instructionInformationLabel2 = new createjs.Text(
                "\tW/Up Arrow -> Accelarate\n\t S/DownArrow -> Break/Reverse\n\tA/Left Arrow -> Move Left\n\tD/Right Arrow -> Move Right\n\tSpace -> Jump",
                "15px Courgette",
                "#00ff00");
            //this._instructionInformationLabel.regX = this._instructionInformationLabel.getMeasuredWidth() * 0.5;
            this._instructionInformationLabel2.regY = this._instructionInformationLabel2.getMeasuredLineHeight() * 0.5;
            this._instructionInformationLabel2.x = config.Screen.WIDTH * 0.1;
            this._instructionInformationLabel2.y = (config.Screen.HEIGHT * 0.45);
            this._stage.addChild(this._instructionInformationLabel2);
             
            
            // create menu button
            this._menuButton = new createjs.Bitmap(assets.getResult("MenuButton"));
            this._menuButton.regX = this._menuButton.getBounds().width * 0.5;
            this._menuButton.regY = (this._menuButton.getBounds().height * 0.5);
            this._menuButton.x = config.Screen.WIDTH * 0.25;
            this._menuButton.y = (config.Screen.HEIGHT * 0.9);
            this._stage.addChild(this._menuButton);
            //Add mouseover effect on the menu button
            this._menuButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._menuButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });
            //create mouse click event for menu button
            this._menuButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.MENU;
                changeScene();
            });
            // create exit button
            this._exitButton = new createjs.Bitmap(assets.getResult("ExitButton"));
            this._exitButton.regX = this._exitButton.getBounds().width * 0.5;
            this._exitButton.regY = (this._exitButton.getBounds().height * 0.5);
            this._exitButton.x = config.Screen.WIDTH * 0.75;
            this._exitButton.y = (config.Screen.HEIGHT * 0.9);
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
            /*
            // create screen shot
            this._screenShot = new createjs.Bitmap(assets.getResult("SS"));
            this._screenShot.regX = this._screenShot.getBounds().width * 0.5;
            this._screenShot.regY = (this._screenShot.getBounds().height * 0.5);
            this._screenShot.x = config.Screen.WIDTH * 0.75;
            this._screenShot.y = (config.Screen.HEIGHT * 0.4);
            this._stage.addChild(this._screenShot);*/
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