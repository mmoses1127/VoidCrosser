import MovingObject from './moving_object.js';
import Sound from './sound.js';

export default class Astronaut extends MovingObject {

    constructor(game) {
        super({
            color: 'green', 
            radius: 30, 
            vel: [0, 0],
            pos: [600, 0],
            game: game

        });
        this.rotation = 0;
        this.maxRotationSpeed = 1;
        this.stick(this.game.debris[0]);
        this.inventory = [];
        this.oxygen = 100.00;
        this.dead = false;
        this.image = 'assets/imagery/astronaut.png';
        this.pushoffSpeed = 1;
        this.oxygenRate = 1;
        this.loseOxygen();
        this.chokingSound = new Sound('../assets/sounds/choking.wav');
        this.jetpack = false;
    }

    loseOxygen() {
        setInterval( () => {
            this.oxygen -= this.oxygenRate;
        }, 2000)
    }

    stick(otherObject) {
        this.surface = otherObject;
        this.rotation = this.opposingAngle(this.surface) + 2.2;
        this.rotationSpeed = this.surface.rotationSpeed;     
        this.vel = [...this.surface.vel];
    }

    pushOff(otherObject) {
        let vector = this.makeVector(6, -this.rotation); 
        this.surface = null;
        this.rotationSpeed = 0;
        this.resetVelocity(vector);       
    }


    putOnCircumference(otherObject) {
        let grabVector = this.makeVector(otherObject.radius, -this.rotation);
        let grabPosition = [(otherObject.pos[0] + grabVector[0]), (otherObject.pos[1] + grabVector[1])];
        this.pos = grabPosition
    }

    astronautCollision = function(otherObject) {
        let sumRadii = this.radius + otherObject.radius;   
        let distance = Math.sqrt(((otherObject.pos[0] - this.pos[0]) ** 2) + ((otherObject.pos[1] - this.pos[1]) ** 2))

        return (sumRadii * .5) >= distance;
    }

    increasePower() {
        setInterval(() => {
            if (this.pushoffSpeed < 10) this.pushoffSpeed += 1;
        }, 300) 
        
    }

    resetPower() {
        this.pushoffSpeed = 1;

    }

    // choking() {
    //     if (this.oxygen < 10) {
    //         this.chokingSound.play();
    //     }
    // }

    throttleRotation() {
        if (this.rotationSpeed > this.maxRotationSpeed) {
            this.rotationSpeed = this.maxRotationSpeed;
        }

        if (this.rotationSpeed < -this.maxRotationSpeed) {
            this.rotationSpeed = -this.maxRotationSpeed;
        }
    }
}

