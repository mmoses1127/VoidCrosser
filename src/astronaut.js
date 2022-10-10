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
        this.rotation = 0;
        this.stick(this.game.debris[0]);
        this.inventory = [];
        this.oxygen = 100;
        this.dead = false;
        this.image = 'assets/imagery/astronaut.png';
        this.pushoffSpeed = 1;
        this.oxygenRate = 1;
        this.loseOxygen();   
    }

    loseOxygen() {
        setInterval( () => {
            this.oxygen -= this.oxygenRate;
        }, 2000)
    }

    stick(otherObject) {
        this.surface = otherObject;
        this.rotation = this.opposingAngle(this.surface);
        // console.log(this.rotation);
        this.rotationSpeed = this.surface.rotationSpeed;     
        this.vel = [...this.surface.vel];
    }

    pushOff(otherObject) {
        let vector = this.makeVector(this.pushoffSpeed, -this.rotation);
        this.surface = null;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.resetVelocity(vector);       
    }


    putOnCircumference(otherObject) {
        let grabVector = this.makeVector(otherObject.radius, -this.rotation);
        // console.log(vector);
        let grabPosition = [(otherObject.pos[0] + grabVector[0]), (otherObject.pos[1] + grabVector[1])];
        // console.log(position);
        this.pos = grabPosition
    }

    // magnitude of vector if surface.radius
    // direction of vector is the changing surface rotation .makevector
    // astronauts speed should be changed by that
    // rotateAroundSurface() {
    //     if (this.attached) {
    //         // console.log(`this.rotation.is ${this.rotation}`);
    //         // console.log(`this.rotationspeed is ${this.rotationSpeed}`);
    //         // let rotationStep = this.rotation - this.rotationSpeed;
    //         // this.rotation = rotationStep;
    //         // console.log(`incremented astro rotation is ${this.rotationSpeed}`);
    //         this.putOnCircumference(this.surface);
            // console.log(`grab Vector is ${this.grabVector}`)
            // let magnitude = this.surface.radius;
            // let vector = this.makeVector(magnitude, this.rotation);
            // console.log(`grabrotatevector is ${vector}`)
            // this.pos = [this.surface.pos[0] + vector[0], this.surface.pos[1] + vector[1]];
    //     }
    // }
    
    increasePower() {
        setInterval(() => {
            if (this.pushoffSpeed < 10) this.pushoffSpeed += 1;
        }, 300) 
        
    }

    resetPower() {
        this.pushoffSpeed = 1;
        // console.log(`reset pushoffspeed is ${this.pushoffSpeed}`)

    }
}

