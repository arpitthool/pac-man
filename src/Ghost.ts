import { Direction } from "./Pacman";
import TileMap from "./TileMap";

export default class Ghost {
    private x: number;
    private y: number;
    private speed: number;
    private direction: Direction;
    private requestedDirection: Direction;
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;
    private tileMap: TileMap;
    private directionTimer: number;
    private directionTimerIntervalMax: number;
    private directionTimerIntervalMin: number;

    constructor(x: number, y: number, tileSize: number, ctx: CanvasRenderingContext2D, tileMap: TileMap) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.direction = Direction.RIGHT;
        this.requestedDirection = Direction.RIGHT;
        this.tileMap = tileMap;
        this.directionTimerIntervalMax = 1000;
        this.directionTimerIntervalMin = 200;
        this.directionTimer = Math.floor(this.directionTimerIntervalMin + Math.random() * (this.directionTimerIntervalMax - this.directionTimerIntervalMin));
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.tileSize / 2, this.y + this.tileSize / 2, this.tileSize / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
    }

    move() {
        this.directionTimer--;
        if(this.directionTimer <= 0) {
            this.requestedDirection = this.getRandomDirection();
            this.directionTimer = Math.floor(this.directionTimerIntervalMin + Math.random() * (this.directionTimerIntervalMax - this.directionTimerIntervalMin));
        }

        const col = this.x / this.tileSize;
        const row = this.y / this.tileSize;

        if(this.requestedDirection !== this.direction) {
            if((this.direction === Direction.DOWN && this.requestedDirection === Direction.UP) ||
            (this.direction === Direction.UP && this.requestedDirection === Direction.DOWN) || 
            (this.direction === Direction.RIGHT && this.requestedDirection === Direction.LEFT) ||
            (this.direction === Direction.LEFT && this.requestedDirection === Direction.RIGHT)){
                this.direction = this.requestedDirection;
            } else if(Number.isInteger(col) && Number.isInteger(row)) {
                while(this.tileMap.wallCollision(col, row, this.requestedDirection)) {
                    this.requestedDirection = this.getRandomDirection();
                }
                this.direction = this.requestedDirection;
            }
        }

        if (this.direction) {
            
            while(Number.isInteger(col) && Number.isInteger(row) && this.tileMap.wallCollision(col, row, this.direction)) {
                this.direction = this.getRandomDirection();
            } 
            if (this.direction === Direction.UP) {
                this.y -= this.speed;
            } else if (this.direction === Direction.DOWN) {
                this.y += this.speed;
            } else if (this.direction === Direction.LEFT) {
                this.x -= this.speed;
            } else if (this.direction === Direction.RIGHT) {
                this.x += this.speed;
            }
        }
    }

    changeDirection(direction: Direction) {
        this.requestedDirection = direction;
    }

    getRandomDirection() {
        const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
        return directions[Math.floor(Math.random() * directions.length)];
    }
}