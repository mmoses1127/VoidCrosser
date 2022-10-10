import Debris from "./debris";
import Astronaut from "./astronaut";
import Sound from "./sound";

export default class Game {

    constructor(ctx) {
        this.CANVAS_WIDTH = ctx.canvas.width;
        this.CANVAS_HEIGHT = ctx.canvas.height;
        this.ctx = ctx;
        this.NUM_DEBRIS = 50;
        this.debris = this.addDebris();
        this.setStartingDebris();
        this.setDestinationDebris();
        this.astronaut = new Astronaut(this);
        this.objects = this.allObjects();
        this.MAP_WIDTH = 4000;
        this.MAP_HEIGHT = 4000;
    }

    setCamera() {
        if (!this.astronaut.surface) {
        this.cameraX = -(this.CANVAS_WIDTH / 2 - this.astronaut.pos[0]);
        this.cameraY = -(this.CANVAS_HEIGHT / 2 - this.astronaut.pos[1]);
        } else {
            this.cameraX = -(this.CANVAS_WIDTH / 2 - this.astronaut.surface.pos[0]);
            this.cameraY = -(this.CANVAS_HEIGHT / 2 - this.astronaut.surface.pos[1]);
        }
    }

    allObjects() {
        let things = [];
        things = things.concat(this.debris).concat(this.astronaut);
        return things;
    }

    addDebris = function(){
        let debris = [];
        for(let i = 0; i < this.NUM_DEBRIS; i++){
            // debris.push(new Debris(this.randomPosition(), this));
            debris.push(new Debris(this.randomPosition(), this));
        }
        return debris;
    }

    setStartingDebris() {
        this.debris[0].pos = [3000, 3300];
        this.debris[0].vel = [0, 0];
        this.debris[0].color = 'yellow'
    }

    setDestinationDebris() {
        this.debris[1].pos = [3000, 600];
        this.debris[1].vel = [0, 0];
        this.debris[1].color = 'purple'
    }
    
    randomPosition = function(){
        let x;
        let y;
        x = Math.floor(Math.random() * 4000)
        y = Math.floor(Math.random() * 4000)
        return [x,y];
    }
    
    draw = function(){
        this.ctx.clearRect(0,0,this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.displayOxygen();
        this.drawMinimap()
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].drawObject(this.ctx);
            this.objects[i].drawPoint(this.ctx);
        }
    }
    
    displayOxygen() {
        this.ctx.font = "40px space_age";
        this.ctx.fillStyle = "green";
        this.ctx.fillText(`Oxygen: ${this.astronaut.oxygen}`, 50, 50);
        this.ctx.textAlign = "left";
    }

    drawMinimap() {
        const canvas = document.getElementById('minimap');
        const minimap = canvas.getContext('2d');
        minimap.clearRect(0, 0, 200, 200)
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].drawShrunk(minimap);
        }
    }


    moveObjects = function() {
        if (this.astronaut.surface) this.astronaut.putOnCircumference(this.astronaut.surface);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].move();
            this.objects[i].stepRotation();
        }
    }
    
    wrap = function(pos) {
        let dimensions = [this.MAP_WIDTH, this.MAP_HEIGHT]
        for(let i = 0; i < pos.length; i++){
            if(pos[i] < 0 || pos[i] > dimensions[i]){
                pos[i] = dimensions[i] - pos[i];
            }
        }
        return pos;
    }
    
    checkCollisions = function() {
        for(let i = 0; i < this.debris.length; i++) {
            for(let j = i + 1; j < this.debris.length; j++) {
                if (this.debris[i].isCollidedWith(this.debris[j])) {
                    this.debris[i].bounce();
                    // // this.debris[i].pos[0] -= 200;
                    // // this.debris[i].pos[1] -= 200;
                    this.debris[j].bounce();                        
                }
            }
        }
    }

    checkAstronautCollision = function() {
        for (let i = 0; i < this.debris.length; i++) {
            if (this.astronaut.surface !== this.debris[i] && this.astronaut.isCollidedWith(this.debris[i])) {
                console.log('astronaut hit!');
                this.debris[i].bounce();
                this.astronaut.bounce();
            }
        }
    }
    
    grabbableObject = function() {
        let closestDebris = [];
        for(let i = 0; i < this.debris.length; i++) {
            if(this.debris[i].canBeGrabbed(this.astronaut)) {
                closestDebris.push(this.debris[i]);
            }
        }
        return closestDebris[0];
    }


    step = function() {
        this.moveObjects();
        this.checkCollisions();
        this.setCamera();
    }
    
}

