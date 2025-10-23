export default class Pacman {
    private x: number;
    private y: number;
    private speed: number;
    // private direction: string;
    // private requestedDirection: string;
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, tileSize: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.ctx = ctx;
        this.tileSize = tileSize;
    }

    draw() {
        // draw a circle and fill it with yellow
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.tileSize / 2, this.y + this.tileSize / 2, this.tileSize / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
    }
}