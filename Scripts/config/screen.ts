/**
 *  The Scenes module is a namespace to reference all scene objects
 *  
 *  Source File Name:   screen.ts
 *  Author Name(s):     Mohammed Juned Ahmed
 *                      Joshua Collaco
 *                      Ryan Sterling 
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: April 18, 2016
 *  Revision History:   2.0.1
 * 
 *  @module config
 */
module config {
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static PLAY1: number = 1;
        public static OVER: number = 2;
        public static PLAY2: number = 3;
        public static INSTRUCTION: number = 4;
        public static PLAY3: number = 5;
        public static EXIT: number = 6;
    }
}