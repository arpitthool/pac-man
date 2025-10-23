export default class TileMap {
    private map: number[][];
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;
    private mapString: string;

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
        this.map = this.loadMap([]);
    }

    private loadMap(map: number[][]) {
        // convert mapString to 2d array
        const rows = this.mapString.split('\n');
        for (const row of rows) {
            let line = [];
            for (const char of row) {
                if (char === '○') {
                    line.push(3);
                } else if (char === '·') {
                    line.push(2);
                } else if (char === '┌' || char === '┐' || char === '┘' || char === '└' || char === '│' || char === '─' || char === '=') {
                    line.push(1);
                } else {
                    line.push(0);
                }
            }
            map.push(line);
        }
        return map;
    }

    setCanvasSize() {
        this.ctx.canvas.width = this.map[0].length * this.tileSize;
        this.ctx.canvas.height = this.map.length * this.tileSize;
    }

    draw() {
        console.log(this.map);
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
}