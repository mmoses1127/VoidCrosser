import Game from "./game"

export default class GameView {
    
    constructor(ctx) {
        this.game = new Game(ctx);  
        this.astronaut = this.game.astronaut;
    }
    

    // keypress

    // setKeyBindings = function() {
    //     key('a', ()=>{
    //         this.astronaut.pos[0] -= 5;
    //         this.game.wrap(this.astronaut.pos)
    //     });
    //     key('d', ()=>{ 
    //         this.astronaut.pos[0] += 5;
    //         this.game.wrap(this.astronaut.pos)
    //     });
    //     key('w', ()=>{ 
    //         this.astronaut.pos[1] -= 5;
    //         this.game.wrap(this.astronaut.pos)
    //     });
    //     key('s', ()=>{ 
    //         this.astronaut.pos[1] += 5;
    //         this.game.wrap(this.astronaut.pos)
    //     });
    // }

    start = () => { 

        window.addEventListener('keypress', (e) => {
            if (e.key === 'a') {
                this.astronaut.pos[0] -= 5;
                this.game.wrap(this.astronaut.pos);
            }

            if (e.key === 'w') {
                this.astronaut.pos[1] -= 5;
                this.game.wrap(this.astronaut.pos);
            }

            if (e.key === 's') {
                this.astronaut.pos[1] += 5;
                this.game.wrap(this.astronaut.pos);
            }

            if (e.key === 'd') {
                this.astronaut.pos[0] += 5;
                this.game.wrap(this.astronaut.pos);
            }

            if (e.key === ' ') {
                if (this.astronaut.attached) {
                    this.astronaut.pushOff(this.astronaut.surface)
                }
            }
        });

        console.log(this.game, this.debris)

        setInterval(()=>{
            this.game.step();
            this.game.draw();
            this.game.checkCollisions();
        }, 50);
    }

}

