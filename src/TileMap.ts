import { Direction } from './Pacman.ts';

export default class TileMap {
    private map: number[][];
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;
    private mapString: string;
    private startX: number = 0;
    private startY: number = 0;

    constructor(tileSize: number, ctx: CanvasRenderingContext2D) {
        // this.map = this.loadMap(mapString);
        this.mapString = `┌────────────┐┌────────────┐
│············││············│
│·┌──┐·┌───┐·││·┌───┐·┌──┐·│
│○│  │·│   │·││·│   │·│  │○│
│·└──┘·└───┘·└┘·└───┘·└──┘·│
│··························│
│·┌──┐·┌┐·┌──────┐·┌┐·┌──┐·│
│·└──┘·││·└──┐┌──┘·││·└──┘·│
│······││····││····││······│
└────┐·│└──┐ ││ ┌──┘│·┌────┘
     │·│┌──┘ └┘ └──┐│·│
     │·││    B     ││·│
     │·││ ┌──==──┐ ││·│
─────┘·└┘ │      │ └┘·└─────
|     ·   │I P C │   ·     |
─────┐·┌┐ │      │ ┌┐·┌─────
     │·││ └──────┘ ││·│
     │·││          ││·│
     │·││ ┌──────┐ ││·│
┌────┘·└┘ └──┐┌──┘ └┘·└────┐
│············││············│
│·┌──┐·┌───┐·││·┌───┐·┌──┐·│
│·└─┐│·└───┘·└┘·└───┘·│┌─┘·│
│○··││·······X ·······││··○│
└─┐·││·┌┐·┌──────┐·┌┐·││·┌─┘
┌─┘·└┘·││·└──┐┌──┘·││·└┘·└─┐
│······││····││····││······│
│·┌────┘└──┐·││·┌──┘└────┐·│
│·└────────┘·└┘·└────────┘·│
│··························│
└──────────────────────────┘`;
        this.tileSize = tileSize;
        this.ctx = ctx;
        this.map = this.loadMap();
    }

    private loadMap() {
        let map: number[][] = [];
        // convert mapString to 2d array
        const rows = this.mapString.split('\n');
        for (let y = 0; y < rows.length; y++) {
            let line = [];
            for (let x = 0; x < rows[y].length; x++) {
                const char = rows[y][x];
                if (char === '○') {
                    line.push(3);
                } else if (char === '·') {
                    line.push(2);
                } else if (char === '┌' || char === '┐' || char === '┘' || char === '└' || char === '│' || char === '─' || char === '=') {
                    line.push(1);
                } else if (char === 'X') {
                    this.startX = x*this.tileSize + this.tileSize / 2;
                    this.startY = y*this.tileSize;
                    line.push(0)
                } else {
                    line.push(0);
                }
            }
            map.push(line); 
        }
        return map;
    }

    getStartPosition() {
        return { x: this.startX, y: this.startY };
    }

    setCanvasSize() {
        this.ctx.canvas.width = this.map[0].length * this.tileSize;
        this.ctx.canvas.height = this.map.length * this.tileSize;
    }

    draw() {
        // console.log(this.map);
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];
                switch (tile) {
                    case 0:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        break;
                    case 1:
                        this.ctx.fillStyle = 'blue';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        break;
                    case 2:
                        this.ctx.fillStyle = 'green';
                        this.ctx.fillRect(x * this.tileSize + this.tileSize / 3 , y * this.tileSize + this.tileSize / 3 , this.tileSize / 3, this.tileSize / 3);
                        break;
                    case 3:
                        this.ctx.fillStyle = 'purple';
                        this.ctx.fillRect(x * this.tileSize + this.tileSize / 3 , y * this.tileSize + this.tileSize / 3 , this.tileSize / 3, this.tileSize / 3);
                        break;- this.tileSize / 4
                    default:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        break;
                }
            }
        }
    }

    wallCollision(col: number, row: number, direction: Direction) {
        if(direction === Direction.UP) {
            return this.map[row - 1][col] === 1;
        } else if(direction === Direction.DOWN) {
            return this.map[row + 1][col] === 1;
        } else if(direction === Direction.LEFT) {
            return this.map[row][col - 1] === 1;
        } else if(direction === Direction.RIGHT) {
            return this.map[row][col + 1] === 1;
        }
    }

    getTile(col: number, row: number) {
        if(row < 0 || col < 0 || row >= this.map.length || col >= this.map[0].length) {
            return -1;
        }
        return this.map[row][col];
    }

    setTile(col: number, row: number, value: number) {
        if(row < 0 || col < 0 || row >= this.map.length || col >= this.map[0].length) {
            return;
        }
        this.map[row][col] = value;
    }
}