import MovingObject from "./moving_object";


export default class Jetpack extends MovingObject{
    constructor(pos, game) {
        super({
            color: 'red', 
            radius: 40, 
            vel: [0,0],
            pos: pos, 
            game: game
        });
        this.image = 'assets/imagery/jetpack.png';
        this.caught = false;
        this.rotation = 0;
        this.rotationSpeed = .01;
    }
}