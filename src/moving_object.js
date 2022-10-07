export default class MovingObject {
    constructor(argumentHash) {
        this.pos = argumentHash.pos;
        this.vel = argumentHash.vel;
        this.radius = argumentHash.radius;
        this.color = argumentHash.color;
        this.game = argumentHash.game
    }
    
    // drawCircle = function(ctx) {
    //     ctx.fillStyle = this.color;
    //     ctx.beginPath();
    //     ctx.arc(
    //                 this.pos[0],
    //                 this.pos[1],
    //                 this.radius,
    //                 0,
    //                 2 * Math.PI,
    //                 false
    //         )
    //     ctx.fill()
    // };

    drawObject = function(ctx) {
        let img = new Image();
        img.src = this.image
        ctx.drawImage(img, this.pos[0], this.pos[1], this.radius * 2, this.radius * 2)
    }

    spinDrawing = function(ctx) {
        ctx.save();
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(45 * Math.PI / 180);
        this.drawObject(ctx);
        ctx.translate(-200, -200);
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
    
        
        return sumRadii > distance;
    }

    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return scale([Math.sin(deg), Math.cos(deg)], length);
    }

    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    }

}




