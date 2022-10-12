import MovingObject from './moving_object.js';


export default class Debris extends MovingObject {
    constructor(pos, game) {
        super({
            color: 'red', 
            radius: 70, 
            vel: [0,0],
            pos: pos, 
            game: game
        });
        this.vel = this.randomVec(3);
        // this.rotationSpeed = this.toRads(Math.random() * 2 * Math.PI);
        this.rotationSpeed = .03;
        this.rotation = 0;
        this.image = 'assets/imagery/debris.png';
        this.notOnMap = true;
    }

}
