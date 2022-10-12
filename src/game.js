import Debris from "./debris";
import Astronaut from "./astronaut";
import Sound from "./sound";
import Component from "./component";
import Flame from "./flame";
import Star from "./star";
import Jetpack from "./jetpack";
import GameView from "./game_view";
import Level from "./level";

export default class Game {

    constructor(ctx, gameView, difficulty) {
        this.difficulty = difficulty;
        this.gameView = gameView;
        this.CANVAS_WIDTH = ctx.canvas.width;
        this.CANVAS_HEIGHT = ctx.canvas.height;
        this.ctx = ctx;
        this.gameOver = false;
        this.MAP_WIDTH = 2000;
        this.MAP_HEIGHT = 2000;
        this.NUM_DEBRIS = 15;
        this.setNumberComponents();
        this.NUM_FLAMES = 5;
        this.debris = []
        // this.debris = this.addDebris();
        this.flames = [];
        // this.flames = this.addFlames();
        this.level = new Level(this);
        this.level.populateMap();
        this.astronaut = new Astronaut(this);
        this.setStartingDebris();
        this.setDestinationDebris();
        this.components = this.addComponents();
        this.addJetpack();
        this.objects = this.allObjects();
        this.paused = false;
        this.deathSound = new Sound('assets/sounds/death_rattle.wav');
        this.collectSound = new Sound('assets/sounds/collect.wav');
        this.repairSound = new Sound('assets/sounds/repair.wav');
        this.launchSound = new Sound('assets/sounds/launch.wav');
        this.steamImageLeft = 'assets/imagery/steam.png';
        this.steamImageRight = 'assets/imagery/steam_right.png';
        this.steamImageUp = 'assets/imagery/steam_up.png';
        this.steamImageDown = 'assets/imagery/steam_down.png';
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
        things = things.concat(this.debris).concat(this.flames).concat(this.components).concat(this.astronaut);
        return things;
    }

    // addDebris = function(){
    //     let debris = [];
    //     for(let i = 0; i < this.NUM_DEBRIS; i++){
    //         debris.push(new Debris(this.randomPosition(), this));
    //     }
    //     return debris;
    // }

    addDebris = function(position){
        let debris = new Debris(position, this);
        this.debris.push(debris);
    }

    setNumberComponents() {
        switch (this.difficulty) {
            case 'easy':
                this.NUM_COMPONENTS = 3;
                break;
            case 'medium':
                this.NUM_COMPONENTS = 5;
                break;
            case 'hard':
                this.NUM_COMPONENTS = 7;
                break;
        }
    }

    addComponents = function(){
        let components = [];
        for(let i = 0; i < this.NUM_COMPONENTS; i++){
            components.push(new Component(this.randomPosition(), this));
        }
        return components;
    }

    // addFlames = function(){
    //     let flames = [];
    //     for(let i = 0; i < this.NUM_FLAMES; i++){
    //         flames.push(new Flame(this.randomPosition(), this));
    //     }
    //     return flames;
    // }

    addFlame = function(position){
        let flame = new Flame(position, this);
        this.flames.push(flame);
    }

    addJetpack() {
        this.jetpack = new Jetpack(this.randomPosition(), this);
        this.components.push(this.jetpack);
    }

    randomObjectSelector(array) {
        return Math.floor(Math.random() * ((array.length)))
    }

    setStartingDebris() {
        let i = this.randomObjectSelector(this.debris);
        this.debris[i].vel = [0, 0];
        this.debris[i].color = 'yellow';
        this.debris[i].rotationSpeed = .02;
        this.astronaut.stick(this.debris[i]);
    }

    setDestinationDebris() {
        let i = this.randomObjectSelector(this.debris);
        this.escapePod = this.debris[i];
        this.escapePod.vel = [0, 0];
        this.escapePod.color = 'green'
        this.escapePod.image = 'assets/imagery/escape_pod.gif';
        this.escapePod.rotationSpeed = .01;
        this.escapePod.notOnMap = false;
    }
    
    randomPosition = function(){
        let x;
        let y;
        x = Math.floor(Math.random() * this.MAP_WIDTH)
        y = Math.floor(Math.random() * this.MAP_HEIGHT)
        return [x,y];
    }
    
    draw = function(){
        this.ctx.clearRect(0,0,this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].caught !== true) {
                this.objects[i].spinDraw(this.ctx);
                // if  (this.objects[i] instanceof Astronaut || this.objects[i] instanceof Debris || this.objects[i] instanceof Flame) {
                //     this.objects[i].spinDraw(this.ctx);
                // } else {
                //     this.objects[i].drawObject(this.ctx);
                // }
            }
        }
        this.displayOxygen();
        this.drawMinimap()
        this.steamMaker();
    }
    
    steamMaker() {
        if (this.steamLeft) {
            this.drawSteam('left');
        }
        if (this.steamRight) {
            this.drawSteam('right');
        }
        if (this.steamUp) {
            this.drawSteam('up');
        }
        if (this.steamDown) {
            this.drawSteam('down');
        }
    }


    drawSteam = function(direction) {
        let img = new Image();
        switch (direction) {
            case 'left':
                img.src = this.steamImageLeft
                this.ctx.drawImage(img,this.astronaut.pos[0] - this.cameraX + this.astronaut.radius, this.astronaut.pos[1] - this.cameraY - this.astronaut.radius / 2, this.astronaut.radius, this.astronaut.radius)
                console.log('drewsteam')
                break;
            case 'right':
                img.src = this.steamImageRight
                this.ctx.drawImage(img,this.astronaut.pos[0] - this.cameraX - this.astronaut.radius * 2, this.astronaut.pos[1] - this.cameraY - this.astronaut.radius / 2, this.astronaut.radius, this.astronaut.radius)
                console.log('steamright')
                break;
            case 'up':
                img.src = this.steamImageUp
                this.ctx.drawImage(img,this.astronaut.pos[0] - this.cameraX - this.astronaut.radius / 2, this.astronaut.pos[1] - this.cameraY + this.astronaut.radius, this.astronaut.radius, this.astronaut.radius)
                break;
            case 'down':
                img.src = this.steamImageDown
                this.ctx.drawImage(img,this.astronaut.pos[0] - this.cameraX - this.astronaut.radius / 2, this.astronaut.pos[1] - this.cameraY - this.astronaut.radius * 2, this.astronaut.radius, this.astronaut.radius)
                break;
        }

    }
    
    displayOxygen() {

        this.ctx.font = "40px space_age";
        this.ctx.fillStyle = `${(this.astronaut.oxygen < 10) ? 'red' : 'green'}`;
        this.ctx.fillText(`Oxygen: ${(this.astronaut.oxygen <= 0) ? '0' : this.astronaut.oxygen.toFixed()}%`, 50, 50);
        // this.ctx.textAlign = "left";
    }

    drawMinimap() {
        const canvas = document.getElementById('minimap');
        const minimap = canvas.getContext('2d');
        minimap.clearRect(0, 0, 200, 200)
        for (let i = 0; i < this.objects.length; i++) {
            if (!this.objects[i].notOnMap) this.objects[i].drawShrunk(minimap);
        }
    }

    // makeStars() {
    //     let stars = [];
    //     for(let i = 0; i < 50; i++){
    //         stars.push(new Star(this.randomPosition(), this));
    //     }
    //     return stars;
    // }


    moveObjects = function() {
        if (this.astronaut.surface) {
            this.astronaut.putOnCircumference(this.astronaut.surface);
        } else if (!this.gameOver) {
            this.astronaut.rotation = -this.astronaut.makeAngleFromVector(this.astronaut.vel) + 2.1;
        }    
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].move();
            this.objects[i].stepRotation();
        }
    }
    
    wrap = function(pos) {
        for(let i = 0; i < pos.length; i++) {
            if (pos[i] < 0) pos[i] += this.MAP_WIDTH;
            if (pos[i] > this.MAP_WIDTH) pos[i] -= this.MAP_WIDTH;
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
                    this.debris[i].bounce();
                    this.astronaut.bounce();
                }
            }
        }
    }

    checkFlameCollision = function() {
        for (let i = 0; i < this.flames.length; i++) {
            if (this.astronaut.astronautCollision(this.flames[i])) {
                this.astronaut.oxygen = 0;
            }
        }
    }

    componentPickup = function() {
        for (let i = 0; i < this.components.length; i++) {
            if (this.astronaut.astronautComponentCollision(this.components[i])) {
                this.components[i].caught = true;
                this.components[i].pos = [NaN, NaN];
                this.collectSound.play();
                if (this.components[i] instanceof Jetpack) {
                    this.astronaut.jetpack = true;
                } else {
                    this.astronaut.inventory.push(this.components[i]);
                }
            }
        }
    }

    removeCaught = function() {
        for(let i = 0; i < this.components.length; i++) {
            if (this.components[i].caught) {
                this.components.splice(i, 1);
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


    step = () => {
        this.gameView.checkKeyState();
        this.moveObjects();
        this.removeCaught();
        this.setCamera();
        this.componentPickup();
        if (this.gameOver === false) {
            this.checkGameOver(); 
            this.checkCollisions();
            this.checkAstronautCollision();
            this.checkFlameCollision();
            this.astronaut.throttleRotation();
        }
        // if (this.winner) {
            // this.drawStars();
        // }
    }
    
    runGame = () => {
        if (this.paused === false && this.gameOff === false) {
            this.step();
            this.draw();
            if (this.gameOver) this.displayEndMessage();
        }
        window.requestAnimationFrame(this.runGame);
    }

    checkGameOver() {
        if (this.astronaut.oxygen <= 0) {
            this.gameLost();
        } else if (this.astronaut.surface === this.escapePod && this.astronaut.inventory.length >= this.NUM_COMPONENTS) {
            this.gameWon();
        }
    }

    gameLost() {
        this.gameOver = true;
        this.deathSound.play();
        this.astronaut.image = 'assets/imagery/dead_transparent.png';
        this.astronaut.radius = 60;
        this.astronaut.surface = null;
        this.astronaut.vel = [1, 1];
        this.astronaut.rotationSpeed = .03;
    }

    gameWon() {
        this.winner = true;        
        this.gameOver = true;
        this.repairSound.play();
        setTimeout(this.launchSequence, 6000);
    }

    launchSequence = () => {
        this.launchSound.play();
        // this.stars = this.makeStars();
        // console.log(this.stars)
        this.escapePod.image = 'assets/imagery/escape_pod_launched.gif'
        this.escapePod.vel = [-15, -15];
        this.escapePod.rotation = Math.PI * 2 * .85;
        this.escapePod.rotationSpeed = 0;
        this.astronaut.rotationSpeed = 0;
        this.astronaut.caught = true;
        this.astronaut.oxygen = 100;
        this.astronaut.oxygenRate = 0;
    }

    displayEndMessage() {
        if (this.gameOver) {
            this.ctx.font = "40px space_age";
            this.ctx.fillStyle = `${(this.winner) ? 'green' : 'red'}`;
            this.ctx.fillText(`${(this.winner) ? 'You win!' : 'Game Over'}`, (this.CANVAS_WIDTH / 2) + 100, this.CANVAS_HEIGHT / 2 + 10);
        }
    }

}

