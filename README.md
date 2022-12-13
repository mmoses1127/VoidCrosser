# Void Crosser

## Background

Void Crosser is a 2d dynamic puzzle navigation game set in space.

In the near future, space debris circling the Earth crashes into humanity’s largest space station while you, astronaut Sadie Walker, are out on an EVA. In the aftermath of the collision, the station has broken into dozens of floating pieces of wreckage, each with their own trajectory and spin state.

Your HUD tells you the general location of the communications pod, which is still intact. However, how to navigate the debris before your suit’s oxygen supply runs out?  The rotating debris objects floating around all have handles on them. Your astronaut can grab hold of a handle, wait until the spin points them towards another piece of debris, and push off to fly towards their target. If you miss the handle, you bounce off the debris, wasting precious time until you make contact with another piece of debris.

Bonus levels can include larger maps and task the user with finding various components, which they have to bring to a central location to ‘assemble’ the needed device (escape pod, radio, etc.).

# Technologies

* The entire game is coded in JavaScript
* The Canvas animation library is used to render and manipulate game objects and text.

# Selected Features and Development

## Resize Observer makes canvas and rendered text completely responsive

It was important to me to make the game responsive to various broswer window sizes. Simple CSS was not sufficient for allowing the game canvas to dynamically fill it's parent container element while also rendering game text in the correct positions on the screen. I solved this problem by first using a resize listener to reassign the canvas dimensions to any new window dimensions. Then, I used a ResizeObserver to track the changing canvas dimensions and pass these new values to the instance variables used to position the text.

### index.js
```javascript
const canvas = document.getElementById('game-canvas');
canvas.height = window.innerHeight * .9;
canvas.width = window.innerWidth * .9;
const ctx = canvas.getContext('2d');
let difficulty = 'easy';

const resizeCanvas = () => {
    canvas.height = window.innerHeight * .9;
    canvas.width = window.innerWidth * .9;
}

window.addEventListener('resize', resizeCanvas);
```
### game.js
```javascript
this.myObserver = new ResizeObserver(entries => {
    let entry = entries[0];
    this.canvas_width = entry.contentRect.width;
    this.canvas_height = entry.contentRect.height;
});

this.canvas = document.getElementById('game-canvas');
this.myObserver.observe(this.canvas);

displayInstructions() {
    this.ctx.font = "30px space_age";
    this.ctx.fillStyle = 'yellow';
    this.ctx.textAlign = 'left';
    if (this.gameView.instructionsOn) {
        this.ctx.fillText('Toggle instructions with "I" key', 30, this.canvas_height - 30);
        this.ctx.fillText('Hold SPACE:         grab debris', 30, this.canvas_height - 60);
        this.ctx.fillText('Release SPACE:   jump off ', 30, this.canvas_height - 80);
        this.ctx.fillText('ARROW keys:         use jetpack', 30, this.canvas_height - 100);
    } else {
        this.ctx.fillText('Toggle instructions with "I" key', 30, this.canvas_height - 30);
    }
};
```
## Camera function keeps the player in the center of the game screen while allowing freedom of movement in the 2d environment

Free two-dimensional movement in a space environment quickly becomes disorienting if the camera is not fixed on the player. To keep the player constantly in the center of the screen, I utilized cameraX and cameraY variables, which each subtract the player's X or Y position from half the width or height of the canvas, respectively. Then these offsets are added to the X and Y positions when drawing objects, rendering them relative to the player at the center of the screen.

### game.js
```javascript
setCamera() {
    if (!this.astronaut.surface) {
    this.cameraX = -(this.canvas_width / 2 - this.astronaut.pos[0]);
    this.cameraY = -(this.canvas_height / 2 - this.astronaut.pos[1]);
    } else {
        this.cameraX = -(this.canvas_width / 2 - this.astronaut.surface.pos[0]);
        this.cameraY = -(this.canvas_height / 2 - this.astronaut.surface.pos[1]);
    }
};

```
### moving_object.js
```javascript
drawObject = function(ctx) {
    let img = new Image();
    img.src = this.image;
    ctx.drawImage(img, this.pos[0] - this.radius - this.game.cameraX, this.pos[1] - this.radius - this.game.cameraY, this.radius * 2, this.radius * 2);
};
```
## 2nd canvas and object mapping provides a radar to assist in player navigation

As navigation through a complex environment and item collection are essential aspects of gameplay, I decided a radar or 'minimap' was needed. The simplest solution is often the easiest - I added a 2nd canvas, position in the upper right corner, and drew all relevant game objects on the screen by mapping their positions to the minimap's dimensions.

### index.html
```javascript
<canvas id="game-canvas">
</canvas>
<button class="glow-on-hover" id="restart-game-button" >Restart</button>
<canvas id="minimap" width="200" height="200"></canvas>

```
### game.js
```javascript
drawMinimap() {
    const canvas = document.getElementById('minimap');
    const minimap = canvas.getContext('2d');
    minimap.clearRect(0, 0, 200, 200);
    for (let i = 0; i < this.objects.length; i++) {
        if (!this.objects[i].notOnMap) this.objects[i].drawShrunk(minimap);
    }
};
    
```
### moving_object.js
```javascript
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
    ctx.fill();
}


```
## A keystate hash allows for smooth player movement without initial keypress lag

Key holds were required for player movement and for holding onto objects in the game. I found that there was an inital lag of a fraction of a second when initiating and sustaining movement with a keydown event listener. I solved this problem by creating a sort of proxy listener system in the form of a keystate hash, which contained boolean state values for all relevant action keys. On keydown, I assigned the key's value to true, and performed the inverse upon keyup. Actions are triggered and sustained smoothly by running the key's action on each animation frame if the key's value in the keystate has is true. 

### game_view.js

```javascript
this.keyState = { ' ': false, 'ArrowLeft': false, 'ArrowRight': false, 'ArrowUp': false, 'ArrowDown': false, }

window.addEventListener('keydown', (e) => {
    if (!this.game.gameOver) {
        if (Object.keys(this.keyState).includes(e.key)) {
            e.preventDefault();
            this.keyState[e.key] = true;
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (Object.keys(this.keyState).includes(e.key)) {
        this.keyState[e.key] = false;
    }
}
        
checkKeyState = () => {
    Object.keys(this.keyState).forEach((el) => {
        if (this.keyState[el] && !this.game.gameOver) this.runKeyAction(el);
    });
}

```

## Extensive canvas rotations and offsets were used to allow each object in the game to have it's own unique rotation, speed, and position

A major challenge of this game was the need for dozens of objects to be rotated independently on each animation frame. Most canvas games only rotate a single object at a time, such as the player. I used the canvas method pattern of saving the canvas, translating it to the target object, rotating the canvas by the object's rotation speed, translating the canvas back to its original orientation, drawing the image at the desired position, and restoring the canvas to its original saved state to preapre for the next object's rendering.

### moving_object.js
```javascript
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
    ctx.translate((this.drawX), (this.drawY));
    ctx.rotate(this.rotation);
    ctx.translate(-(this.drawX), -(this.drawY));
    ctx.drawImage(img, this.drawX - this.radius, this.drawY - this.radius, this.radius * 2, this.radius * 2)
    ctx.restore();
}
```

## Pythagorean theorem and arctan 2 functions, as well as cunning usages of scalars and offsets, allow for both collision detection and object grabbability that do not interfere with each other.

Collision detection was needed for all objects in the game. Firstly, I added a scalar of .9 to my collision detection boolean function to allow objects to slightly penetrate into each other before 'colliding'. On the other hand, I added a buffer to the function that determines when a player can grab hold of an object. These were conscious design decisions which allow a player to grab onto an object before she collides and thus bounces away. 

### moving_object.js

```javascript
isCollidedWith = function(otherObject) {
    let sumRadii = this.radius + otherObject.radius;   
    let distance = Math.sqrt(((otherObject.pos[0] - this.pos[0]) ** 2) + ((otherObject.pos[1] - this.pos[1]) ** 2));

    return (sumRadii * .9) >= distance;
};

canBeGrabbed = function(otherObject) {
    let sumRadii = this.radius + otherObject.radius;   
    let distance = Math.sqrt(((this.pos[0] - otherObject.pos[0]) ** 2) + ((this.pos[1] - otherObject.pos[1]) ** 2));
    return sumRadii + 10 >= distance;
};
```

When a player or object collides with another object, each entity bounces away in the other direction, however, simply reversing their velocity is not adequate - they can still be caught in the collision state on the next animation frame, leaving them unable to ever escape as they vibrate back and forth. This shortcoming was solved by translating the object to a position in their new direction of travel with a scalar of 5 times their velocity, effectively warping the objects away from each other a small distance.

### moving_object.js

```javascript
bounce() {
    this.vel[0] = -this.vel[0];
    this.vel[1] = -this.vel[1];
    this.pos[0] += this.vel[0] * 5;
    this.pos[1] += this.vel[1] * 5;
};
```

The arctan2 function, as well as a custom offset (determined through lots of trial and error), were used to determine the angle between the player and the object the player is grabble, both to position the player and fix her to the proper side of the object, and to determine the trajectory when jumping off objects.

### moving_object.js

```javascript
opposingAngle(otherObject) {
    return Math.atan2((otherObject.pos[1] - this.pos[1]), (otherObject.pos[0] - this.pos[0])) + 2.2;
}

```
