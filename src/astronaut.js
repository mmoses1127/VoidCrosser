import MovingObject from './moving_object.js';

export default class Astronaut extends MovingObject {

    constructor(game) {
        super({
            color: 'green', 
            radius: 40, 
            vel: [0, 0],
            pos: [600, 0],
            game: game

        });
        this.stick(this.game.debris[0]);
        // this.pos = this.putOnCircumference(this.surface);
        this.inventory = [];
        this.oxygen = 100;
        this.dead = false;
        this.image = 'assets/imagery/astronaut.png'
        this.rotation = 0; 
        this.pushoffSpeed = 1;   
    }

    stick(otherObject) {
        this.surface = otherObject;
        console.log(this.astronaut);
        this.attached = true;
        this.rotation = this.surface.rotation;
        this.vel = [...this.surface.vel];
    }

    pushOff(otherObject) {
        // let pushoffSpeed = 6;
        let radians = this.surface.rotation;
        let vector = this.makeVector(this.pushoffSpeed, -radians);
        this.attached = false;
        this.surface = null;
        this.rotationSpeed = 0;
        this.combineVectors(vector);       
    }


    putOnCircumference(otherObject) {
        let startingRads = this.opposingAngleDegrees(this.surface);
        this.grabAngle = this.makeVector(otherObject.radius, startingRads);
        // console.log(vector);
        let position;
        position = [(otherObject.pos[0] - this.grabAngle[0]), (otherObject.pos[1] - this.grabAngle[1])];
        // console.log(position);

        return position
    }

    // magnitude of vector if surface.radius
    // direction of vector is the changing surface rotation .makevector
    // astronauts speed should be changed by that
    rotateAroundSurface() {
        if (this.attached) {
            this.grabAngle += this.surface.startingRotation;
            let magnitude = this.surface.radius;

            let vector = this.makeVector(magnitude, this.grabAngle);
            this.pos = [this.surface.pos[0] + vector[0], this.surface.pos[1] + vector[1]];
        }
    }
    
    increasePower() {
        setInterval(() => {
            if (this.pushoffSpeed < 10) this.pushoffSpeed += 1;
        }, 200) 
    }
}

