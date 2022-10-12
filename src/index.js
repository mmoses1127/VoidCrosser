import MovingObject from './moving_object.js';
import Astronaut from './astronaut.js';
import Game from './game.js';
import GameView from './game_view.js';
import Debris from "./debris.js";
import Sound from "./sound.js";

document.addEventListener('DOMContentLoaded', function() {
    const button = new Sound('assets/sounds/button.ogg');
    const selected = new Sound('assets/sounds/selected.wav');
    const lobbyMusic = new Sound('assets/sounds/september_song.mp3');
    const canvas = document.getElementById('game-canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    let difficulty = 'easy';
    
    
    
    
    const startGame = function() {
        const gameView = new GameView(ctx, difficulty);
        gameView.startGame();
    }

    const clickSound = function() {
        button.play();
    }

    const changeDifficulty = function(e) {
        difficulty = e.target.value;
        selected.play();
    }


    
    
    const difficultySelect = document.getElementById('difficulty-zone');
    difficultySelect.addEventListener('click', changeDifficulty);
    
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('mouseover', clickSound);
    startButton.addEventListener('click', startGame);
    
    



    



    



})