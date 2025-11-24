# Pac-Man

<img width="908" height="923" alt="Screenshot from 2025-11-23 23-14-49" src="https://github.com/user-attachments/assets/fc3e382c-5c32-4b41-82f4-c98940461cc1" />

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

