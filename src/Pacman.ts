import TileMap from './TileMap.ts';
import { getScore, setScore } from './Game.ts';
export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export default class Pacman {
    private x: number;
    private y: number;
    private speed: number;
    private direction: Direction;
    private requestedDirection: Direction;
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;
    private tileMap: TileMap;

    constructor(x: number, y: number, tileSize: number, ctx: CanvasRenderingContext2D, tileMap: TileMap) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.direction = Direction.RIGHT;
        this.requestedDirection = Direction.RIGHT;
        this.tileMap = tileMap;
    }

    draw() {
        // draw a circle and fill it with yellow
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.tileSize / 2, this.y + this.tileSize / 2, this.tileSize / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
    }

    move() {
        const col = this.x / this.tileSize;
        const row = this.y / this.tileSize;

        if(this.requestedDirection !== this.direction) {
            if((this.direction === Direction.DOWN && this.requestedDirection === Direction.UP) ||
            (this.direction === Direction.UP && this.requestedDirection === Direction.DOWN) || 
            (this.direction === Direction.RIGHT && this.requestedDirection === Direction.LEFT) ||
            (this.direction === Direction.LEFT && this.requestedDirection === Direction.RIGHT)){
                this.direction = this.requestedDirection;
            } else if(Number.isInteger(col) && Number.isInteger(row) && !this.tileMap.wallCollision(col, row, this.requestedDirection)) {
                this.direction = this.requestedDirection;
            }
        }

        if (this.direction) {
            if(!(Number.isInteger(col) && Number.isInteger(row) && this.tileMap.wallCollision(col, row, this.direction))) {
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

        this.checkPillCollision();
    }

    changeDirection(direction: Direction) {
        this.requestedDirection = direction;
    }

    checkPillCollision() {
        const row = this.x/this.tileSize;
        const col = this.y/this.tileSize;

        if(Number.isInteger(row) && Number.isInteger(col)) {
            if(this.tileMap.getTile(row, col) === 2) {
                setScore(getScore() + 10);
                this.tileMap.setTile(row, col, 0);
            } else if(this.tileMap.getTile(row, col) === 3) {
                setScore(getScore() + 50);
                this.tileMap.setTile(row, col, 0);
            }
        }
    }
}