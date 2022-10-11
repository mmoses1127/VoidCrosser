import Game from "./game.js"
import Sound from "./sound.js"

export default class GameView {
    
    constructor(ctx) {
        this.game = new Game(ctx);  
        this.astronaut = this.game.astronaut;
        this.music = new Sound('../assets/sounds/80s_theme.mp3');
        this.lobbyMusic = new Sound('../assets/sounds/september_song.mp3');
        this.button = new Sound('../assets/sounds/button.ogg');
        this.ctx = ctx;
    }


    loadsounds() {
        this.instructions = new Sound('../assets/sounds/instructions.wav');
        this.chargingUp = new Sound('../assets/sounds/charging_up.wav');
        this.jumping = new Sound('../assets/sounds/jumping.wav');
        this.grunt = new Sound('../assets/sounds/grunt.mp3');
        this.howTheHell = new Sound('../assets/sounds/how_the_hell.wav');
        this.success = new Sound('../assets/sounds/success.wav');
        this.start = new Sound('../assets/sounds/door_open.wav');
        this.jetpack = new Sound('../assets/sounds/jetpack.wav')
    }

    startGame = () => {
        this.loadsounds();
        this.start.play();
        // this.paused = true;
        
        setTimeout(() => this.startup(), 2000);
    }

    restart = () => {
        this.music.stop();
        this.start.play();
        this.game.gameOff = true;
        setTimeout(() => {
            this.toggleScreen('start-menu', true);
            this.toggleScreen('game-canvas', false);
            this.toggleScreen('minimap', false);
            this.game = new Game(this.ctx);  
            this.astronaut = this.game.astronaut;
            this.music = new Sound('../assets/sounds/80s_theme.mp3');
            this.lobbyMusic = new Sound('../assets/sounds/september_song.mp3');
            this.button = new Sound('../assets/sounds/button.ogg'); 
        }, 1000)
    }

    startup() { 
        this.game.gameOff = false;
        this.game.paused = false;
        this.lobbyMusic.stop();
        this.music.play()
        this.music.loop();
        this.toggleScreen('start-menu', false);
        this.toggleScreen('game-canvas', true);
        this.toggleScreen('minimap', true);
        // setTimeout(this.instructions.play(), 2000)


        window.addEventListener('keydown', (e) => {

            if (e.key === ' ') {
                if (this.astronaut.surface) {
                    this.chargingUp.play();
                    this.astronaut.resetPower();
                    this.astronaut.increasePower();
                } else {
                    if(this.game.grabbableObject !== []) {
                        console.log('you grabbed')
                        this.astronaut.stick(this.game.grabbableObject());
                        this.grunt.play();
                    }
                }
            }

            if (e.code === 'ArrowLeft') {
                if (!this.astronaut.surface) {
                    this.astronaut.vel[0] -= .4
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                    // this.game.drawSteam();
                }
            }

            if (e.code === 'ArrowRight') {
                if (!this.astronaut.surface) {
                    this.astronaut.vel[0] += .4
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                }
            }

            if (e.code === 'ArrowUp') {
                if (!this.astronaut.surface) {
                    this.astronaut.vel[1] -= .4
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                }
            }

            if (e.code === 'ArrowDown') {
                if (!this.astronaut.surface) {
                    this.astronaut.vel[1] += .4
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
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
        document.getElementById('pause').addEventListener('click', this.togglePause)
        document.getElementById('restart').addEventListener('click', this.restart)
        document.getElementById('start-menu').addEventListener('click', this.lobbySound);

        
        setInterval(()=>{
            this.game.runGame();
        }, 20);
    }

    lobbySound = function() {
        if (this.game.gameOff) this.lobbyMusic.play();
    }
    
    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'block' : 'none';
        element.style.display = display;
    }

    togglePause = () => {
        if (this.game.paused === true) {
            this.game.paused = false;
        } else {
            this.game.paused = true;
        }
        console.log(this.paused);
    }


}

