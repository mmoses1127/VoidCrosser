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
        // this.vel[1] = this.randomVec(3);
        this.rotationSpeed = this.toRads(Math.random() * 2 * Math.PI) ;
        // this.rotationSpeed = 0;
        this.rotation = 0;
        this.image = '../assets/imagery/large_debris_burning.png';
    }

}
