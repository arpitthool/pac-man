# Pac-Man

## Running the app

security test

### 1. Using npm

1. Install dependencies:
   ```
   npm install
   ```
2. Start the application:
   ```
   npm run start
   ```

### 2. Using Docker

1. Build the Docker image:
   ```
   docker build -t pacman-app-image .
   ```
2. Run the Docker container:
   ```
   docker run -p 3000:3000 pacman-app-image
   ```
   (Make sure to adjust the port `3000` if your app uses a different port.)

