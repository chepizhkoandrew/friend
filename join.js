// Redirect to /calm on clicking Join button
document.getElementById("joinButton").addEventListener("click", () => {
  window.location.href = "/calm";
});

// Display the join button after all animations complete
setTimeout(() => {
  const joinButton = document.getElementById("joinButton");
  joinButton.style.opacity = 1; // Fade in the join button
}, 9000); // 3s delay + 1s fade-in for line1 + 4s delay for line2 + 1s fade-in for button
