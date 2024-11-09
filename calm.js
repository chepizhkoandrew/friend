
document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".activity-item"));
  const totalDuration = 3000; // 3 seconds for all items to appear
  const startDelay = 6000; // Start after 6 seconds
  const pauseBeforeBlink = 1000; // 1 second pause before blinking

  // Generate randomized delays for each item
  const delays = items.map(() => Math.random()).sort(); // Random delays sorted to ensure slowing effect
  const maxDelay = Math.max(...delays);
  
  // Normalize delays to fit within totalDuration
  items.forEach(item => {
    const text = item.textContent.trim(); // Get the item's text
    if (imagePaths[text]) {
      item.style.setProperty("--image-path", `url('${imagePaths[text]}')`);
      item.style.backgroundImage = `var(--image-path)`; // Apply as background image
    }
  });
  const normalizedDelays = delays.map(d => (d / maxDelay) * totalDuration);

  // Set appearance animations for each item
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transition = `opacity 0.5s ease-in`;
    }, startDelay + normalizedDelays[index]);
  });

  // Add blink effect after all items are visible
  setTimeout(() => {
    items.forEach(item => item.classList.add("blink"));
  }, startDelay + totalDuration + pauseBeforeBlink);
});

const imagePaths = {
  "Walk in Park": "images/park.jpg",
  "Go Home": "images/home.jpg",
  "Explore Nature": "images/nature.jpg",
  "Visit Cafe": "images/cafe.jpg",
  "Read a Book": "images/book.jpg",
  "Call a Friend": "images/call.jpg"
};