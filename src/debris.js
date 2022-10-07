import MovingObject from './moving_object.js';


export default class Debris extends MovingObject {
    constructor(pos, game) {
        super({
            color: 'red', 
            radius: 100, 
            vel: [2,2], 
            pos: pos, 
            game: game
        });
        this.rotation = .02;
        this.image = '../assets/imagery/large_debris.png';
    }

}
