import TileMap from './TileMap.ts';
import Pacman from './Pacman.ts';
import { Direction } from './Pacman.ts';
import Ghost from './Ghost.ts';

let gameScore = 0;
export function getScore() {
  return gameScore;
}
export function setScore(value: number) {
  gameScore = value;
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

if (!ctx) {
  throw new Error('Could not get context');
}

const score = document.getElementById('score') as HTMLSpanElement;

score.textContent = 'Score : 1';

const tileSize = 32;

const tileMap = new TileMap(tileSize, ctx);
tileMap.setCanvasSize();

const startPosition = tileMap.getStartPosition();
const pacman = new Pacman(startPosition.x, startPosition.y, tileSize, ctx, tileMap);

export let ghosts: Ghost[] = [];
const ghostPosition = tileMap.getGhostPosition();
const ghost = new Ghost(ghostPosition.x, ghostPosition.y, tileSize, ctx, tileMap);
ghosts.push(ghost);

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    pacman.changeDirection(Direction.UP);
  }
  if (event.key === 'ArrowDown') {
    pacman.changeDirection(Direction.DOWN);
  }
  if (event.key === 'ArrowLeft') {
    pacman.changeDirection(Direction.LEFT);
  }
  if (event.key === 'ArrowRight') {
    pacman.changeDirection(Direction.RIGHT);
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();
  pacman.move();
  pacman.draw();
  ghost.move();
  ghost.draw();
  pacman.checkPillCollision();
  if(pacman.checkGhostCollision()) {
    score.textContent = 'Game Over! Score : ' + getScore();
    return;
  }
  score.textContent = 'Score : ' + getScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();