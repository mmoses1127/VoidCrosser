import Game from "./game.js"
import Sound from "./sound.js"

export default class GameView {
    
    constructor(ctx, difficulty) {
        this.music = new Sound('assets/sounds/80s_theme.mp3');
        this.lobbyMusic = new Sound('assets/sounds/september_song.mp3');
        this.button = new Sound('assets/sounds/button.ogg');
        this.ctx = ctx;
        this.difficulty = difficulty;
    }


    loadsounds() {
        this.instructions = new Sound('assets/sounds/instructions.wav');
        this.chargingUp = new Sound('assets/sounds/charging_up.wav');
        this.jumping = new Sound('assets/sounds/jumping.wav');
        this.grunt = new Sound('assets/sounds/grunt.mp3');
        this.startSound = new Sound('assets/sounds/door_open.wav');
        this.jetpack = new Sound('assets/sounds/jetpack.wav');
        this.selected = new Sound('assets/sounds/selected.wav');
    }

    startGame = () => {
        let pause = document.getElementById('pause');
        let quit = document.getElementById('restart');
        let lobbyMusic = document.querySelectorAll('[src="assets/sounds/september_song.mp3"]')[0];;
        lobbyMusic.src=''
        console.log(document.querySelectorAll('[src="assets/sounds/september_song.mp3"]'))

        pause.style.display = "inline-block";
        quit.style.display = "inline-block";
        this.loadsounds();
        this.startSound.play();        
        setTimeout(() => this.startup(), 2000);
    }

    restart = () => {
        document.getElementById('game-on').setAttribute('id', 'game-off');
        // var lobbyMusic = new Sound('assets/sounds/september_song.mp3');
        let pause = document.getElementById('pause');
        let quit = document.getElementById('restart');
        pause.style.display = "none";
        quit.style.display = "none";
        this.music.stop();
        this.startSound.play();
        this.game.gameOff = true;
        setTimeout(() => {
            this.toggleScreen('start-menu', true);
            this.toggleScreen('game-canvas', false);
            this.toggleScreen('minimap', false);
        }, 1000)
    }

    startup = () => { 
        document.getElementById('game-off').setAttribute('id', 'game-on');
        this.game = new Game(this.ctx, this, this.difficulty);  
        this.astronaut = this.game.astronaut;
        this.game.gameOff = false;
        this.game.paused = false;
        this.lobbyMusic.stop();
        this.instructionsOn = false;
        this.music.play();
        this.music.loop();
        this.toggleScreen('start-menu', false);
        this.toggleScreen('game-canvas', true);
        this.toggleScreen('minimap', true);
        this.keyState = { ' ': false, 'ArrowLeft': false, 'ArrowRight': false, 'ArrowUp': false, 'ArrowDown': false, }

        window.addEventListener('keypress', (e) => {
            if (e.key === 'i') {
                this.instructionsOn = !this.instructionsOn;
            }
        });
        
        window.addEventListener('keydown', (e) => {
            if (!this.game.gameOver) {
                if (Object.keys(this.keyState).includes(e.key)) {
                    e.preventDefault();
                    this.keyState[e.key] = true;
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (Object.keys(this.keyState).includes(e.key)) {
                this.keyState[e.key] = false;
            }

            if (!this.game.gameOver) {
                if (e.key === ' ') {
                    if (this.astronaut.surface) {
                        this.astronaut.pushOff(this.astronaut.surface);
                        this.chargingUp.stop();
                        this.jumping.play();
                    }
                    this.astronaut.resetPower();
                }
            }   

            if (e.code === 'ArrowLeft') {
                    this.game.steamLeft = false;
            }

            if (e.code === 'ArrowRight') {
                    this.game.steamRight = false;
            }

            if (e.code === 'ArrowUp') {
                    this.game.steamUp = false;
            }

            if (e.code === 'ArrowDown') {
                    this.game.steamDown = false;
            }

        });

        
        document.getElementById('pause').addEventListener('click', this.togglePause)
        document.getElementById('restart').addEventListener('click', this.restart)
        document.getElementById('start-menu').addEventListener('click', this.lobbySound);
        
        window.requestAnimationFrame(this.game.runGame);
    }

    lobbySound = function() {
        if (this.game.gameOff) this.lobbyMusic.play();
    }
    
    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'flex' : 'none';
        element.style.display = display;
    }


    togglePause = () => {
        this.selected.play();
        if (this.game.paused === true) {
            this.game.paused = false;
        } else {
            this.game.paused = true;
        }
    }

    checkKeyState = () => {
        Object.keys(this.keyState).forEach((el) => {
            if (this.keyState[el] && !this.game.gameOver) this.runKeyAction(el);
        });
    }

    runKeyAction = (key) => {
        switch (key) {
            case ' ':
                if (this.astronaut.surface) {
                    this.astronaut.resetPower();
                    this.astronaut.increasePower();
                } else {
                    if(this.game.grabbableObject !== []) {
                        this.astronaut.stick(this.game.grabbableObject());
                        this.grunt.play();
                    }
                }
                break;            
            case 'ArrowLeft':
                if (!this.astronaut.surface && this.astronaut.jetpack) {
                    this.astronaut.vel[0] -= .03
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                    this.game.steamLeft = true;
                }
                break;
            case 'ArrowRight':
                if (!this.astronaut.surface && this.astronaut.jetpack) {
                    this.astronaut.vel[0] += .03
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                    this.game.steamRight = true;
                }
                break;
            case 'ArrowUp':
                if (!this.astronaut.surface && this.astronaut.jetpack) {
                    this.astronaut.vel[1] -= .03
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                    this.game.steamUp = true;
                }
                break;
            case 'ArrowDown':
                if (!this.astronaut.surface && this.astronaut.jetpack) {
                    this.astronaut.vel[1] += .03
                    this.jetpack.play();
                    this.astronaut.oxygen -= .1;
                    this.game.steamDown = true;
                }
                break;
        }
    }
}

