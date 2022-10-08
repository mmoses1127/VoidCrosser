import Sound from "./sound";

export default class MovingObject {
    constructor(argumentHash) {
        this.pos = argumentHash.pos;
        this.vel = argumentHash.vel;
        this.radius = argumentHash.radius;
        this.color = argumentHash.color;
        this.game = argumentHash.game
        this.collideSound = new Sound('../assets/sounds/collision.wav')
    }
    
    drawCircle = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
                    this.pos[0],
                    this.pos[1],
                    this.radius,
                    0,
                    2 * Math.PI,
                    false
            )
        ctx.fill()
    };

    drawObject = function(ctx) {
        let img = new Image();
        img.src = this.image
        ctx.drawImage(img, this.pos[0], this.pos[1], this.radius * 2, this.radius * 2)
    }

    spinDraw = function(ctx) {
        let img = new Image();
        img.src = this.image;
        this.stepRotation();

        ctx.save();
        ctx.translate(this.pos[0] + (this.radius), this.pos[1] + (this.radius));
        ctx.rotate(this.rotation);
        ctx.translate(-(this.pos[0] + this.radius), -(this.pos[1] + this.radius));
        ctx.drawImage(img, this.pos[0], this.pos[1], this.radius * 2, this.radius * 2)

        ctx.restore();
    }
    
    move = function(){
    
        this.pos[0] += this.vel[0]
        this.pos[1] += this.vel[1]
        this.pos = this.game.wrap(this.pos);        
    }
    
    isCollidedWith = function(otherObject) {
        let sumRadii = this.radius + otherObject.radius;   
        let distance = Math.sqrt(((this.pos[0] - otherObject.pos[0]) ** 2) + ((this.pos[1] - otherObject.pos[1]) ** 2))

        return sumRadii >= distance;
    }

    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return this.scale([Math.sin(deg), Math.cos(deg)], length);
    }

    randomRotation() {
        return (Math.random() * 2) * Math.PI / 180
    }

    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    }

    stepRotation() {
        // this.rotation = (this.rotation + this.initialRotation) % 6.283
        this.rotation += this.startingRotation;
    }

    bounce(otherObject) {
        // this.collideSound.play();
        // console.log(`before ${this.vel}`)
        // this.vel[0] = -this.vel[0];
        // this.vel[1] = -this.vel[1];
        // console.log(`after ${this.vel}`)
        let bounceDirection = this.opposingAngleDegrees(otherObject);
        let bounceVector = this.makeVector(2, bounceDirection)
        console.log(`bounceVec is ${bounceVector}`)
        this.pos[0] += bounceVector[0] * 5;
        this.pos[1] += bounceVector[1] * 5;
        this.combineVectors(bounceVector);
    }

    combineVectors(newVel) {
        this.vel[0] += newVel[0];
        this.vel[1] += newVel[1];
    }

    opposingAngleDegrees(otherObject) {
        // return 20;
        return Math.atan2(this.pos[1] - otherObject.pos[1], this.pos[0] - otherObject.pos[0]) * 180 / Math.PI;
    }

    makeVector(length, degrees) {
        return this.scale([Math.sin(degrees), Math.cos(degrees)], length);
    }
}




