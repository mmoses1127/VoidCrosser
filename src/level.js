export default class Level {
    constructor(game) {
        this.game = game;
        this.makeGrid();
    }


    makeGrid(difficulty) {
        if (this.game.difficulty === 'easy') {
            this.grid = [
                [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 2, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
                [1, 0, 0, 0, 0, 0, 1, 0, 2, 0],
                [0, 1, 0, 2, 0, 2, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 1, 0, 0, 2, 0],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
                [0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 1, 0, 0, 1],
            ]
        } else if (this.game.difficulty === 'medium') {
            this.grid = [
                [1, 0, 2, 0, 0, 2, 0, 0, 0, 1],
                [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 2, 0, 2, 0, 0, 1, 0],
                [0, 2, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 2, 0, 2],
                [2, 0, 1, 0, 2, 0, 1, 0, 0, 0],
                [0, 1, 0, 2, 0, 2, 1, 0, 0, 2],
                [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 2, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 2, 2, 0, 1, 0, 0, 1],
            ]
        } else if (this.game.difficulty === 'hard') {
            this.grid = [
                [1, 0, 2, 0, 0, 2, 0, 2, 0, 1],
                [0, 1, 0, 2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 2, 0, 2, 0, 2, 0, 2],
                [0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
                [0, 0, 0, 2, 0, 2, 1, 2, 0, 2],
                [2, 0, 2, 2, 2, 0, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 2, 1, 0, 0, 2],
                [0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
                [0, 2, 0, 2, 2, 0, 0, 0, 1, 2],
                [1, 0, 1, 2, 2, 0, 1, 0, 0, 1],
            ]
        }
    }

    populateMap() {
        const SEPERATOR = this.game.MAP_WIDTH / 10
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                let pos = [SEPERATOR / 2 + j * SEPERATOR, SEPERATOR / 2 + i * SEPERATOR]

                switch (this.grid[i][j]) {
                    case 1:
                        this.game.addDebris((pos))
                        break;
                
                    case 2:
                        this.game.addFlame((pos))
                        break;
                }
            }
            
        }
    }
}