import MovingObject from "./moving_object.js";


export default class Star extends MovingObject {
    constructor(pos, game) {
        super({
            color: 'white', 
            radius: 5, 
            vel: [25,25],
            pos: pos, 
            game: game
        });
    }
}