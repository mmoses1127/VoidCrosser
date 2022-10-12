import Sound from "./sound";


export default class MovingObject {
    constructor(argumentHash) {
        this.pos = argumentHash.pos;
        this.vel = argumentHash.vel;
        this.radius = argumentHash.radius;
        this.color = argumentHash.color;
        this.game = argumentHash.game;
        this.collideSound = new Sound('../assets/sounds/collision.wav');
        this.maxVelocity = 6;
    }

    drawObject = function(ctx) {
        let img = new Image();
        img.src = this.image
        ctx.drawImage(img, this.pos[0] - this.radius - this.game.cameraX, this.pos[1] - this.radius - this.game.cameraY, this.radius * 2, this.radius * 2)
    }

    spinDraw = function(ctx) {
        let img = new Image();
        img.src = this.image;

        this.drawX = this.pos[0] - this.game.cameraX;
        this.drawY = this.pos[1] - this.game.cameraY;

        if ((this.drawX + this.radius * 2) > this.game.MAP_WIDTH) {
            this.drawX = this.drawX - this.game.MAP_WIDTH;
        } else if ((this.drawX + this.radius * 2) < 0) {
            this.drawX = this.drawX + this.game.MAP_WIDTH;
        } 
        if ((this.drawY + this.radius * 2) > this.game.MAP_HEIGHT) {
            this.drawY = this.drawY - this.game.MAP_HEIGHT;
        } else if ((this.drawY + this.radius * 2) < 0) {
            this.drawY = this.drawY + this.game.MAP_HEIGHT;
        }  

        ctx.save();
        // ctx.translate(this.pos[0], this.pos[1]);
        ctx.translate((this.drawX), (this.drawY));
        ctx.rotate(this.rotation);
        ctx.translate(-(this.drawX), -(this.drawY));
        ctx.drawImage(img, this.drawX - this.radius, this.drawY - this.radius, this.radius * 2, this.radius * 2)
        ctx.restore();
    }


    drawPoint = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
                    this.pos[0] - this.game.cameraX,
                    this.pos[1] - this.game.cameraY,
                    1,
                    0,
                    2 * Math.PI,
                    false
            )
        ctx.fill()
    }

    drawShrunk(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
                    this.pos[0] / this.game.MAP_WIDTH * 200,
                    this.pos[1] / this.game.MAP_WIDTH * 200,
                    3,
                    0,
                    2 * Math.PI,
                    false
                )
        ctx.fill()
    }

    throttleVelocity() {
        for (let i = 0; i < 2; i++) {
            if (this.vel[i] > this.maxVelocity) {
                this.vel[i] = this.maxVelocity;
            } else if (this.vel[i] < -this.maxVelocity) {
                this.vel[i] = -this.maxVelocity
            }
        }
    }
    
    move = function(){
        this.throttleVelocity();
        this.pos[0] += this.vel[0]
        this.pos[1] += this.vel[1]
        this.pos = this.game.wrap(this.pos);        
    }
    
    isCollidedWith = function(otherObject) {
        let sumRadii = this.radius + otherObject.radius;   
        let distance = Math.sqrt(((otherObject.pos[0] - this.pos[0]) ** 2) + ((otherObject.pos[1] - this.pos[1]) ** 2))

        return (sumRadii * .9) >= distance;
    }

    canBeGrabbed = function(otherObject) {
        let sumRadii = this.radius + otherObject.radius;   
        let distance = Math.sqrt(((this.pos[0] - otherObject.pos[0]) ** 2) + ((this.pos[1] - otherObject.pos[1]) ** 2))

        return sumRadii + 30 >= distance;
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
        this.rotation += this.rotationSpeed;
    }

    bounce() {
        // this.collideSound.play();
        this.vel[0] = -this.vel[0];
        this.vel[1] = -this.vel[1];
        // let bounceDirection = this.opposingAngle(otherObject);
        // let bounceVector = this.makeVector(2, bounceDirection)
        this.pos[0] += this.vel[0] * 5;
        this.pos[1] += this.vel[1] * 5;
        // this.combineVectors(bounceVector);
    }

    resetVelocity(newVel) {
        this.vel[0] = newVel[0];
        this.vel[1] = newVel[1];
    }

    combinePositions(vector) {
        this.pos[0] += vector[0];
        this.pos[1] += vector[1];
    }

    opposingAngle(otherObject) {
        return Math.atan2((otherObject.pos[1] - this.pos[1]), (otherObject.pos[0] - this.pos[0]));
    }

    makeVector(length, degrees) {
        return this.scale([Math.sin(degrees), Math.cos(degrees)], length);
    }

    toDegrees(rads) {
        return rads * 180 / Math.PI;
    }

    toRads(degrees) {
        return degrees * Math.PI / 180
    }

    makeAngleFromVector(vector) {
        return Math.atan2(-vector[1], vector[0])
    }
}




