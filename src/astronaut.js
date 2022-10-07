import MovingObject from './moving_object.js';

export default class Astronaut extends MovingObject {

    constructor(game) {
        super({
            color: 'green', 
            radius: 20, 
            vel: [0, 0], 
            pos: [800, 800], 
            game: game

        });
        this.inventory = [];
        this.oxygen = 100;
        this.attached = true;
        this.dead = false;
        this.image = 'assets/imagery/astronaut.png'    
    }
}