const MovingObject = require('./moving_object.js');
const Astronaut = require('./astronaut.js');
const Game = require('./game.js');
const GameView = require('./game_view.js');
const Debris = require("./debris.js");

document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.backgroundColor='black';

    const gameView = new GameView(ctx);

})