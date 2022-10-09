import MovingObject from './moving_object.js';


export default class Debris extends MovingObject {
    constructor(pos, game) {
        super({
            color: 'red', 
            radius: 100, 
            vel: [0,0],
            pos: pos, 
            game: game
        });
        this.vel = this.randomVec(3);
        this.rotationSpeed = Math.random() / 10;
        this.rotation = 0;
        this.image = '../assets/imagery/large_debris.png';
    }

}
