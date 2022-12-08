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
        this.vel = this.randomVec(1);
        this.rotationSpeed = .01;
        this.rotation = 0;
        this.image = 'assets/imagery/debris.png';
        this.notOnMap = true;
    }

}
