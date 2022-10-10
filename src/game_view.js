import Game from "./game.js"
import Sound from "./sound.js"

export default class GameView {
    
    constructor(ctx) {
        this.game = new Game(ctx);  
        this.astronaut = this.game.astronaut;
        this.music = new Sound('../assets/sounds/80s_theme.mp3');
    }


    loadsounds() {
        this.instructions = new Sound('../assets/sounds/instructions.wav');
        this.chargingUp = new Sound('../assets/sounds/charging_up.wav');
        this.jumping = new Sound('../assets/sounds/jumping.wav');
        this.grunt = new Sound('../assets/sounds/grunt.mp3');
        this.howTheHell = new Sound('../assets/sounds/how_the_hell.wav');
        this.success = new Sound('../assets/sounds/success.wav');
        this.start = new Sound('../assets/sounds/door_open.wav');
        this.reactor = new Sound('../assets/sounds/reactor.wav');
    }

    start() { 
        this.loadsounds();
        this.start.play();
        setTimeout(() => this.music.play(), 2000)
        this.music.loop();
        this.toggleScreen('start-menu', false);
        this.toggleScreen('game-canvas', true);
        this.toggleScreen('minimap', true);
        // setTimeout(this.instructions.play(), 2000)

        window.addEventListener('keypress', (e) => {

            if (e.key === 'a') {
                // console.log(`closest object is ${this.game.grabbableObject()}`)
                if(this.game.grabbableObject.length > 0) {
                    this.astronaut.stick(this.game.grabbableObject());
                    this.grunt.play();
                }
            }

        });

        window.addEventListener('keydown', (e) => {

            if (e.key === ' ') {
                if (this.astronaut.surface) {
                    this.chargingUp.play();
                    this.astronaut.resetPower();
                    this.astronaut.increasePower();
                }
                
            }
        });

        window.addEventListener('keyup', (e) => {

            if (e.key === ' ') {
                if (this.astronaut.surface) {
                    this.astronaut.pushOff(this.astronaut.surface);
                    this.chargingUp.stop();
                    this.jumping.play();
                    // console.log(`pushed off with ${this.astronaut.pushoffSpeed} power`)
                }
                this.astronaut.resetPower();
            }
        });

        document.getElementById('mute').addEventListener('click', this.music.muteToggle)

        setInterval(()=>{
            this.game.step();
            this.game.draw();
            this.game.checkCollisions();
            this.game.checkAstronautCollision();
        }, 20);
    }

    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'block' : 'none';
        element.style.display = display;
    }


}

