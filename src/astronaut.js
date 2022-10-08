import MovingObject from './moving_object.js';

export default class Astronaut extends MovingObject {

    constructor(game) {
        super({
            color: 'green', 
            radius: 40, 
            vel: [0, 0],
            pos: [0, 0],
            game: game

        });
        this.stick(game.debris[0]);
        this.pos = this.putOnCircumference(this.surface);
        this.inventory = [];
        this.oxygen = 100;
        this.attached = true;
        this.surface = this.game.debris[0];
        this.dead = false;
        this.image = 'assets/imagery/astronaut.png'
        this.rotation = 1;    
    }

    stick(otherObject) {
        this.surface = otherObject;
        this.attached = true;
        this.vel = [...this.surface.vel];
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

    putOnCircumference(otherObject) {
        let vector = this.randomVec(otherObject.radius);
        console.log(vector);
        let position;
        position= [(otherObject.pos[0] - vector[0]), (otherObject.pos[1] - vector[1])];
        console.log(position);
        return position
    }
    

}