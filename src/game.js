import Debris from "./debris";
import Astronaut from "./astronaut";
import Sound from "./sound";

export default class Game {

    constructor(ctx) {
        this.NUM_DEBRIS = 4;
        this.debris = this.addDebris();
        this.ctx = ctx;
        this.astronaut = new Astronaut(this);
        this.objects = this.allObjects();
        this.music = new Sound()
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
        x = Math.floor(Math.random() * 1200)
        y = Math.floor(Math.random() * 1200)
        return [x,y];
    }
    
    draw = function(){
        this.ctx.clearRect(0,0,1200, 1200);
        
        for (let i = 0; i < this.debris.length; i++) {
            this.debris[i].spinDraw(this.ctx);
            // this.debris[i].drawCircle(this.ctx);
        }
        this.astronaut.drawObject(this.ctx);
    }
    
    moveObjects = function(){
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].move();
        }
    }
    
    wrap = function(pos){
        for(let i = 0; i < pos.length; i++){
            if(pos[i] < 0){
                pos[i] = 1200;
            }
            if(pos[i] > 1200){
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
                        this.objects[i].bounce();
                        // this.objects[i].pos[0] -= 200;
                        // this.objects[i].pos[1] -= 200;
                        this.objects[j].bounce();                        
                        console.log('bounced')
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

