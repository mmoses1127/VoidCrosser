import Game from "./game.js"
import Sound from "./sound.js"

export default class GameView {
    
    constructor(ctx) {
        this.game = new Game(ctx);  
        this.astronaut = this.game.astronaut;
        this.music = new Sound('../assets/sounds/september_song.mp3');
    }


    loadsounds() {
        this.instructions = new Sound('../assets/sounds/instructions.wav');
        this.chargingUp = new Sound('../assets/sounds/charging_up.wav');
        this.jumping = new Sound('../assets/sounds/jumping.wav');
        this.grunt = new Sound('../assets/sounds/grunt.mp3');
        this.howTheHell = new Sound('../assets/sounds/how_the_hell.wav');
        this.success = new Sound('../assets/sounds/success.wav');
    }

    start() { 
        this.loadsounds();
        this.toggleScreen('start-menu', false);
        this.toggleScreen('game-canvas', true);
        this.music.play();
        setTimeout(this.instructions.play(), 2000)

        window.addEventListener('keypress', (e) => {

            if (e.key === 'a') {
                console.log(`closest object is ${this.game.grabbableObject()}`)
                if(this.game.grabbableObject() !== []) {
                    this.astronaut.stick(this.game.grabbableObject());
                    this.grunt.play();
                }
            }

        });

        window.addEventListener('keydown', (e) => {

            if (e.key === ' ') {
                if (this.astronaut.attached) {
                    this.chargingUp.play();
                    this.astronaut.increasePower();
                }
                
            }
        });

        window.addEventListener('keyup', (e) => {

            if (e.key === ' ') {
                if (this.astronaut.attached) {
                    this.astronaut.pushOff(this.astronaut.surface);
                    // this.chargingUp.pause();
                    this.jumping.play();
                    this.astronaut.pushoffSpeed = 1;
                }
                // clearInterval()
            }
        });

        setInterval(()=>{
            this.game.step();
            this.game.draw();
            this.game.checkCollisions();
        }, 30);
    }

    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'block' : 'none';
        element.style.display = display;
    }

}

