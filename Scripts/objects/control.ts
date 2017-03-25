/*
This is a GUI controller class for the game.ts script.
GitHub Repository: https://github.com/300833356COMP392/Assignment01
Azure Deployment Link: http://300833356--comp392-assignment1.azurewebsites.net
Source File: Game.ts 
@author Mohammed Juned Ahmed
Last Modified Date: Feburaru 05, 2016 
Last Modified by: Mohammed Juned Ahmed
*/
/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed_x:number;
        public rotationSpeed_y:number;
        public rotationSpeed_z:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(speedX:number, speedY:number, speedZ:number) {
           this.rotationSpeed_x = speedX;
           this.rotationSpeed_y = speedY;
           this.rotationSpeed_z = speedZ;
        }
    }
}
