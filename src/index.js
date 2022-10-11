import MovingObject from './moving_object.js';
import Astronaut from './astronaut.js';
import Game from './game.js';
import GameView from './game_view.js';
import Debris from "./debris.js";
import Sound from "./sound.js";

document.addEventListener('DOMContentLoaded', function() {
    
    const canvas = document.getElementById('game-canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    const gameView = new GameView(ctx);




    const startGame = function() {
        gameView.startGame();
    }

    const clickSound = function() {
        gameView.button.play()
    }


    
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('mouseover', clickSound);
    startButton.addEventListener('click', startGame);

    




    



    



})