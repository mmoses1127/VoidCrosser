import MovingObject from './moving_object.js';

export default class Satellite extends MovingObject {
    constructor(game) {
        super({
            color: 'blue', 
            radius: 100, 
            vel: [0,0],
            pos: [0,0], 
            game: game
        });
        this.pos = game.astronaut.pos
        this.vel = this.randomVec(3);
        this.rotationSpeed = 0;
        this.rotation = 0;
        this.image = '../assets/imagery/long_satellite.jpg';
    }
}