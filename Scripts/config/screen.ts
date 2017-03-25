module config {
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        public static MENU: number = 0;
        public static PLAY: number = 1;
        public static OVER: number = 2;
        public static PLAYTWO: number = 3;
        public static INSTRUCTION: number = 4;
        public static PLAYTHREE: number = 5;
    }
    
}