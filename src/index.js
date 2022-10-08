import MovingObject from './moving_object.js';
import Astronaut from './astronaut.js';
import Game from './game.js';
import GameView from './game_view.js';
import Debris from "./debris.js";
import Sound from "./sound.js";

document.addEventListener('DOMContentLoaded', function() {

    window.MovingObject = MovingObject;

    const canvas = document.getElementById('game-canvas');
    canvas.height="1200";
    canvas.width="1600"
    const ctx = canvas.getContext('2d');
    // canvas.style.backgroundColor='black';

    
    const gameView = new GameView(ctx);

    gameView.start();

})