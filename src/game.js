import Debris from "./debris";
import Astronaut from "./astronaut";
import Sound from "./sound";

export default class Game {

    constructor(ctx) {
        this.CANVAS_WIDTH = ctx.canvas.width;
        this.CANVAS_HEIGHT = ctx.canvas.height;
        this.NUM_DEBRIS = 6;
        this.debris = this.addDebris();
        this.ctx = ctx;
        this.astronaut = new Astronaut(this);
        this.objects = this.allObjects();
        this.music = new Sound('../assets/sounds/september_song.mp3');
    }

    allObjects() {
        let things = [];
        things = things.concat(this.debris).concat(this.astronaut);
        return things;
    }

    addDebris = function(){
        let debris = [];
        for(let i = 0; i < this.NUM_DEBRIS; i++){
            debris.push(new Debris(this.randomPosition(), this));
        }
        return debris;
    }
    
    randomPosition = function(){
        let x;
        let y;
        x = Math.floor(Math.random() * this.CANVAS_WIDTH)
        y = Math.floor(Math.random() * this.CANVAS_HEIGHT)
        return [x,y];
    }
    
    draw = function(){
        this.ctx.clearRect(0,0,this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        
        for (let i = 0; i < this.debris.length; i++) {
            this.debris[i].spinDraw(this.ctx);
            // this.debris[i].drawCircle(this.ctx);
        }
        this.astronaut.spinDraw(this.ctx);
    }
    
    moveObjects = function(){
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].move();
        }
    }
    
    wrap = function(pos){
        let dimensions = [this.CANVAS_WIDTH, this.CANVAS_HEIGHT]
        for(let i = 0; i < pos.length; i++){
            if(pos[i] < 0){
                pos[i] = dimensions[i];
            }
            if(pos[i] > dimensions[i]){
                pos[i] = 0;
            }
        }
        return pos;
    }
    
    checkCollisions = function() {
        for(let i = 0; i < this.objects.length; i++) {
            for(let j = i + 1; j < this.objects.length; j++) {
                if(this.objects[i].isCollidedWith(this.objects[j])) {
                    if (this.objects[i] instanceof Astronaut || this.objects[i] instanceof Astronaut) {
                        console.log('astronaut hit!')
                        this.astronaut.attached = true;
                    } else {
                        this.objects[i].bounce(this.objects[j]);
                        // this.objects[i].pos[0] -= 200;
                        // this.objects[i].pos[1] -= 200;
                        this.objects[j].bounce(this.objects[i]);                        
                        // console.log('bounced')
                    }
                }
            }
        }
    }
    
    step = function() {
        this.moveObjects();
        this.checkCollisions();
    }
    
}

