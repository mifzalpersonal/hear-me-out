// script.js
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");

let isJumping = false;

// Make the dino jump
function jump() {
  if (isJumping) return; // Prevent double jumps
  isJumping = true;

  let position = 0;
  const jumpInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(jumpInterval);
      const fallInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(fallInterval);
          isJumping = false;
        }
        position -= 5;
        dino.style.bottom = position + "px";
      }, 20);
    } else {
      position += 5;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

// Move the obstacle
function moveObstacle() {
  let obstaclePosition = 800;

  const obstacleInterval = setInterval(() => {
    if (obstaclePosition < -20) {
      obstaclePosition = 800; // Reset obstacle
    }
    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + "px";

    // Check for collision
    if (
      obstaclePosition > 50 &&
      obstaclePosition < 100 &&
      parseInt(dino.style.bottom) < 40
    ) {
      alert("Game Over!");
      clearInterval(obstacleInterval);
      location.reload(); // Restart game
    }
  }, 20);
}

// Add event listener for jump
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    jump();
  }
});

moveObstacle();
