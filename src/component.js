import MovingObject from "./moving_object.js";


export default class Component extends MovingObject{
    constructor(pos, game) {
        super({
            color: 'white', 
            radius: 50, 
            vel: [0,0],
            pos: pos, 
            game: game
        });
        this.image = '../assets/imagery/gear.png';
        this.caught = false;
    }
}