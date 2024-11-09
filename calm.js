
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".activity-button");
  
  // Stagger the animations for rows (2 items at a time)
  let delay = 4; // Start after the question text
  buttons.forEach((button, index) => {
    const rowDelay = Math.floor(index / 2) * 2; // Delay per row
    setTimeout(() => {
      button.style.animation = `fadeInItems 1s ease-in ${delay + rowDelay}s forwards`;
    }, (delay + rowDelay) * 1000);
  });

  // Blink effect for all items together
  setTimeout(() => {
    buttons.forEach(button => button.classList.add("blink"));
  }, (delay + (buttons.length / 2) * 2) * 1000); // Blink after all items appear
});