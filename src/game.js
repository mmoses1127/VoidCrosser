import Debris from "./debris";
import Satellite from "./satellite";
import Astronaut from "./astronaut";
import Sound from "./sound";
import Component from "./component";
import Flame from "./flame";

export default class Game {

    constructor(ctx) {
        this.CANVAS_WIDTH = ctx.canvas.width;
        this.CANVAS_HEIGHT = ctx.canvas.height;
        this.ctx = ctx;
        this.NUM_DEBRIS = 10;
        this.NUM_SATELLITES = 0;
        this.NUM_COMPONENTS = 1;
        this.NUM_FLAMES = 20;
        this.gameOver = false;
        this.debris = this.addDebris();
        this.setStartingDebris();
        this.setDestinationDebris();
        this.astronaut = new Astronaut(this);
        this.satellites = this.addSatellites();
        this.components = this.addComponents();
        this.flames = this.addFlames();
        console.log(`debris1 pos and radius is ${this.debris[0].pos} and ${this.debris[0].radius}`)
        console.log(`components1 pos and radius is ${this.components[0].pos} and ${this.components[0].radius}`)
        this.objects = this.allObjects();
        this.MAP_WIDTH = 4000;
        this.MAP_HEIGHT = 4000;
        this.paused = false;
        this.successSound = new Sound('../assets/sounds/success.wav');
        this.deathSound = new Sound('../assets/sounds/death_rattle.wav');
        this.collectSound = new Sound('../assets/sounds/collect.wav');
        this.repairSound = new Sound('../assets/sounds/repair.wav');
        this.launchSound = new Sound('../assets/sounds/launch.wav');
        this.steamImage = '../assets/imagery/steam.jpg';
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
        things = things.concat(this.debris).concat(this.satellites).concat(this.components).concat(this.astronaut).concat(this.flames);
        return things;
    }

    addDebris = function(){
        let debris = [];
        for(let i = 0; i < this.NUM_DEBRIS; i++){
            debris.push(new Debris(this.randomPosition(), this));
        }
        return debris;
    }

    addSatellites = function(){
        let satellites = [];
        for(let i = 0; i < this.NUM_SATELLITES; i++){
            // satellites.push(new satellites(this.randomPosition(), this));
            satellites.push(new Satellite(this));
        }
        return satellites;
    }

    addComponents = function(){
        let components = [];
        for(let i = 0; i < this.NUM_COMPONENTS; i++){
            components.push(new Component(this.randomPosition(), this));
        }
        return components;
    }

    addFlames = function(){
        let flames = [];
        for(let i = 0; i < this.NUM_FLAMES; i++){
            flames.push(new Flame(this.randomPosition(), this));
        }
        return flames;
    }

    setStartingDebris() {
        this.debris[0].pos = [2000, 2000];
        this.debris[0].vel = [0, 0];
        this.debris[0].color = 'yellow';
        this.rotationSpeed = .1;
    }

    setDestinationDebris() {
        this.debris[1].pos = [500, 500];
        this.debris[1].vel = [0, 0];
        this.debris[1].color = 'purple'
        this.debris[1].image = '../assets/imagery/escape_pod.gif';
        this.rotationSpeed = .1;
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
            if (this.objects[i].caught !== true) {
                this.objects[i].spinDraw(this.ctx);
                this.objects[i].drawPoint(this.ctx)
            }
        }
    }

    drawSteam = function() {
        let img = new Image();
        img.src = this.steamImage
        this.ctx.drawImage(img,this.astronaut.pos[0] + 100 - this.cameraX, this.astronaut.pos[1] - this.cameraY, this.radius * 2, this.radius * 2)
        console.log('drew steam');
    }
    
    displayOxygen() {
        this.ctx.font = "40px space_age";
        this.ctx.fillStyle = "green";
        this.ctx.fillText(`Oxygen: ${(this.astronaut.oxygen <= 0) ? '0' : this.astronaut.oxygen.toFixed()}%`, 50, 50);
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
                    this.debris[j].bounce();                        
                }
            }
        }
    }

    checkAstronautCollision = function() {
        if (!this.astronaut.surface) {
            for (let i = 0; i < this.debris.length; i++) {
                if (this.astronaut.astronautCollision(this.debris[i])) {
                    console.log('astronaut hit!');
                    this.debris[i].bounce();
                    this.astronaut.bounce();
                }
            }
        }
    }

    checkFlameCollision = function() {
        for (let i = 0; i < this.flames.length; i++) {
            if (this.astronaut.astronautCollision(this.flames[i])) {
                console.log('astronaut hit!');
                this.astronaut.oxygen = 0;
            }
        }
    }

    componentPickup = function() {
        if (!this.astronaut.surface) {
            for (let i = 0; i < this.components.length; i++) {
                console.log(`checking these components: ${this.components}`);
                if (this.astronaut.astronautCollision(this.components[i])) {
                    // console.dir(`item collected is ${this.components.slice(i, 1)}`);
                    this.astronaut.inventory.push(this.components[i]);
                    // console.log(this.components)
                    this.components[i].caught = true;
                    this.components[i].pos = [NaN, NaN];
                    this.collectSound.play();
                }
            }
        }
    }

    removeCaught = function() {
        for(let i = 0; i < this.components.length; i++) {
            if (this.components[i].caught) {
                console.log(`removed ${this.components[i]}`)
                this.components.splice(i, 1);
                console.log(this.astronaut.inventory)
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
        this.removeCaught();
        this.setCamera();
        this.checkAstronautCollision();
        this.checkFlameCollision();
        this.componentPickup();
        if (this.gameOver === false) this.checkGameOver(); 
        this.astronaut.throttleRotation();
    }
    
    runGame = function() {
        if (this.paused === false && this.gameOff === false) {
            this.step();
            this.draw();
            // this.astronaut.choking();
        }
    }

    checkGameOver() {
        if (this.astronaut.oxygen <= 0) {
            this.gameLost();
        } else if (this.astronaut.surface === this.debris[1] && this.astronaut.inventory.length >= this.NUM_COMPONENTS) {
            this.gameWon();
        }
    }

    gameLost() {
        this.gameOver = true;
        console.log('game lost')
        this.deathSound.play();
        this.astronaut.image = '../assets/imagery/dead_transparent.png';
        this.astronaut.radius = 100;
        this.astronaut.surface = null;
        this.astronaut.vel = [1, 1]
        this.displayMessage('Game Over')
    }

    gameWon() {
        this.gameOver = true;
        console.log('you winnnn')
        this.repairSound.play();
        setTimeout(this.launchSequence, 6000);
        
        
    }

    launchSequence = () => {
        this.launchSound.play();
        this.objects = [this.debris[1], this.astronaut];
        this.debris[1].image = '../assets/imagery/escape_pod_launched.gif'
        this.debris[1].vel = [-15, -15];
        this.debris.rotation = Math.PI * 2 * .65;
        this.debris.rotationSpeed = 0;
        this.displayMessage('You Win!');
    }

    displayMessage(message) {
        this.ctx.font = "70px space_age";
        this.ctx.fillStyle = "green";
        this.ctx.fillText(message, (this.CANVAS_WIDTH / 2) + 100, this.CANVAS_HEIGHT / 2);
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    }

}

