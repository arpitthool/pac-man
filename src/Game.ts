import TileMap from './TileMap.ts';

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

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();