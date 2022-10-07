import MovingObject from './moving_object.js';

export default class Astronaut extends MovingObject {

    constructor(game) {
        super({
            color: 'green', 
            radius: 40, 
            vel: game.debris[0].vel,
            pos: game.debris[0].pos, 
            game: game

        });
        this.inventory = [];
        this.oxygen = 100;
        this.attached = true;
        this.surface = this.game.debris[0];
        this.dead = false;
        this.image = 'assets/imagery/astronaut.png'    
    }

    stick() {
        if (this.attached) {
            this.vel = this.surface.vel;
        }
    }

    pushOff(otherObject) {
        let pushoffSpeed = 10;
        console.log(`pushoffSpeed is ${pushoffSpeed}`)
        let pushoffDirection = this.opposingAngleDegrees(otherObject);
        let newVec = this.makeVector(pushoffSpeed, pushoffDirection);
        console.log(`newVec is ${newVec}`)
        this.attached = false;
        this.surface = null;
        this.combineVectors(newVec);
        console.log(`pushoffDirection is ${pushoffDirection}`)
    }

    

}