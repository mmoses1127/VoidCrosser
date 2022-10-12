import MovingObject from "./moving_object.js";


export default class Flame extends MovingObject {
    constructor(pos, game) {
        super({
            color: 'orange', 
            radius: 60, 
            vel: [0,0],
            pos: pos, 
            game: game
        });
        this.image = 'assets/imagery/flame_ball.gif';
        this.rotation = 0;
        this.rotationSpeed = this.toRads(Math.random() * Math.PI);
        this.notOnMap = true;
    }
}