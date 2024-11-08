const texts = [
  "ALL DOGS HAVE ANXIETY",
  "All dogs have anxiety, but they never suffer from it"
];
let currentIndex = 0;

const textContent = document.getElementById("text-content");
const textElement = document.getElementById("text");
const joinButton = document.getElementById("joinButton");

// Detect swipe start and end positions
let startX = 0;
let endX = 0;

// Mobile swiping
textContent.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

textContent.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

textContent.addEventListener("touchend", handleSwipe);

// Desktop swiping with mouse
textContent.addEventListener("mousedown", (e) => {
  startX = e.clientX;
});

textContent.addEventListener("mouseup", (e) => {
  endX = e.clientX;
  handleSwipe();
});

// Keyboard support for desktop testing
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    swipeRight();
  }
});

function handleSwipe() {
  if (startX > endX + 50) {
    // Swiped left
    swipeRight();
  }
}

function swipeRight() {
  if (currentIndex < texts.length - 1) {
    textElement.style.opacity = 0; // Fade out
    setTimeout(() => {
      currentIndex++;
      textElement.textContent = texts[currentIndex];
      textElement.style.opacity = 1; // Fade in
      if (currentIndex === texts.length - 1) {
        joinButton.classList.remove("hidden"); // Show button on last screen
      }
    }, 500);
  }
}

// Redirect to /calm on clicking Join button
joinButton.addEventListener("click", () => {
  window.location.href = "/calm";
});
