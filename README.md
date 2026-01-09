# Pac-Man 🎮

<img width="908" height="923" alt="Screenshot from 2025-11-23 23-14-49" src="https://github.com/user-attachments/assets/fc3e382c-5c32-4b41-82f4-c98940461cc1" />

A classic Pac-Man game implementation built with TypeScript and HTML5 Canvas. Navigate through the maze, collect pills, avoid ghosts, and try to achieve the highest score!

demo

## 🎯 Features

- **Classic Gameplay**: Navigate Pac-Man through a maze with arrow key controls
- **Score System**: Collect green pills (10 points) and purple power pellets (50 points)
- **Ghost AI**: Red ghosts with intelligent random movement patterns
- **Collision Detection**: Realistic wall collision and ghost collision systems
- **Smooth Movement**: Fluid character movement with direction queuing
- **Game Over**: Clear game over state when colliding with a ghost
- **Modern UI**: Dark theme with clean, minimalist design

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pac-man
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 🎮 How to Play

1. **Start the Game**: The game begins automatically when the page loads

2. **Navigate**: Use the arrow keys to move Pac-Man:
   - `↑` Arrow Up - Move up
   - `↓` Arrow Down - Move down
   - `←` Arrow Left - Move left
   - `→` Arrow Right - Move right

3. **Collect Pills**: Navigate over green dots to collect them and increase your score (10 points each)

4. **Power Pellets**: Collect purple power pellets for bonus points (50 points each)

5. **Avoid Ghosts**: Stay away from the red ghost circles - touching them ends the game!

6. **Objective**: Collect as many pills as possible while avoiding ghosts to achieve the highest score

### Game Elements

- **Yellow Circle**: Pac-Man - your character
- **Blue Walls**: Obstacles you cannot pass through
- **Black Paths**: Navigable areas
- **Green Dots**: Regular pills worth 10 points
- **Purple Dots**: Power pellets worth 50 points
- **Red Circles**: Ghosts - avoid them or game over!

## 📁 Project Structure

```
pac-man/
├── index.html          # Main game page
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── Dockerfile          # Docker container configuration
├── nginx.conf          # Nginx configuration for production
├── src/
│   ├── Game.ts         # Main game logic and game loop
│   ├── Pacman.ts       # Pac-Man character class with movement and collision
│   ├── Ghost.ts        # Ghost enemy class with AI movement
│   ├── TileMap.ts      # Map rendering, collision detection, and tile management
│   └── index.css       # Global styles
└── README.md          # This file
```

## 🛠️ Technologies Used

- **TypeScript**: Type-safe JavaScript for robust game development
- **Vite**: Fast build tool and development server
- **HTML5 Canvas**: 2D rendering for the game graphics
- **Lit**: Web components library (dependency)
- **Docker**: Containerization for easy deployment
- **Nginx**: Web server for production builds

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## 🐳 Docker Deployment

### Using Docker

1. Build the Docker image:
```bash
docker build -t pacman-app-image .
```

2. Run the Docker container:
```bash
docker run -p 3000:3000 pacman-app-image
```

The application will be available at `http://localhost:3000`

(Note: The Docker setup uses a multi-stage build with Node.js for building and Nginx for serving the production build)

## 🎨 Game Architecture

### Core Classes

- **`TileMap`**: Handles maze data, rendering, and collision detection
  - Loads maze from string representation
  - Manages Pac-Man and ghost starting positions
  - Provides wall collision checking methods
  - Renders different tile types (walls, paths, pills, power pellets)

- **`Pacman`**: Manages Pac-Man character state and movement
  - Handles direction changes with queuing system
  - Implements smooth movement with speed control
  - Checks pill and power pellet collisions
  - Detects ghost collisions for game over condition

- **`Ghost`**: Manages ghost enemy behavior
  - Implements random movement AI with direction timers
  - Handles wall avoidance
  - Provides collision detection data

- **`Game`**: Main game controller
  - Initializes game components (map, Pac-Man, ghosts)
  - Manages game loop with `requestAnimationFrame`
  - Handles keyboard input events
  - Updates game state and rendering
  - Manages score tracking

## 🔧 Development

### Building for Production

```bash
npm run build
```

This will:
1. Compile TypeScript to JavaScript
2. Bundle assets with Vite
3. Output to `dist/` directory

The production build can be served with any static file server or deployed to platforms like Vercel, Netlify, or GitHub Pages.

### TypeScript Configuration

The project uses TypeScript with strict type checking. Configuration is in `tsconfig.json`.

## 🎯 Game Mechanics

### Movement System

- Pac-Man can queue direction changes before reaching intersections
- Movement is smooth with configurable speed
- Immediate direction reversal is allowed
- Wall collision prevents movement into walls

### Scoring System

- **Green Pills**: 10 points each
- **Purple Power Pellets**: 50 points each
- Score is displayed in real-time
- Final score shown on game over

### Ghost Behavior

- Ghosts move randomly with periodic direction changes
- Direction change intervals vary randomly (200-1000ms)
- Ghosts avoid walls automatically
- Collision with Pac-Man triggers game over

## 🎯 Future Enhancements

Potential improvements for the game:

- Multiple ghost types with different behaviors
- Power pellet effects (make ghosts vulnerable)
- Multiple levels with increasing difficulty
- Lives system (multiple chances)
- High score persistence (localStorage)
- Sound effects and background music
- Mobile touch controls
- Animated Pac-Man mouth opening/closing
- Ghost house and respawn mechanics
- Fruit bonuses
- Level progression system

## 📝 License

This project is private and not licensed for public use.

## 👤 Author

Created as a fun project to explore game development with TypeScript and Canvas API.

---

Enjoy playing Pac-Man! 🎉
