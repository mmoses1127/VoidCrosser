import Debris from "./debris";
import Astronaut from "./astronaut";

export default class Game {

    constructor(ctx) {
        this.NUM_DEBRIS = 3;
        this.debris = this.addDebris();
        this.ctx = ctx;
        this.astronaut = new Astronaut(this)
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
            this.debris[i].spinDrawing(this.ctx);
        }
        this.astronaut.drawObject(this.ctx);
    }
    
    moveObjects = function(){
        for (let i = 0; i < this.debris.length; i++) {
            this.debris[i].move();
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
        for(let i = 0; i < this.debris.length; i++) {
            for(let j = i + 1; j < this.debris.length; j++) {
                if(this.debris[i].isCollidedWith(this.debris[j])) {
                    console.log('2 debris collided')
                }
            }
        }
    }
    
    step = function() {
        this.moveObjects();
        this.checkCollisions();
    }
    
    allObjects = function() {
        objects = [];
        this.allObjects.concat(this.debris).concat(this.astronaut);
        return objects;
    }

}

