
document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  let currentScreen = 0;

  // Function to show a specific screen by index
  const showScreen = (index) => {
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === index);
    });

    // Apply flashlight effect on the background after 5 seconds
    const background = screens[index].querySelector(".background");
    if (background) {
      setTimeout(() => {
        background.classList.add("flashlight");
      }, 5000); // 5 seconds delay
    }
  };

  // Initialize the first screen
  showScreen(currentScreen);

  // Add click listener for the Join button
  document.querySelector(".join-button").addEventListener("click", () => {
    currentScreen++;
    showScreen(currentScreen);
  });

  // Add click listeners for activity items on the first question screen
  document.querySelectorAll("#question1 .activity-item").forEach((item) => {
    item.addEventListener("click", () => {
      currentScreen++;
      showScreen(currentScreen);

      // Dynamically populate the second grid based on the selection
      const secondGrid = document.querySelector("#question2 .second-grid");
      secondGrid.innerHTML = ""; // Clear existing items
      for (let i = 0; i < 6; i++) {
        const div = document.createElement("div");
        div.className = "activity-item";
        div.textContent = `Option ${i + 1}`;
        secondGrid.appendChild(div);
      }
    });
  });

  // Add click listeners for activity items on the second question screen
  document.querySelector("#question2").addEventListener("click", (event) => {
    if (event.target.classList.contains("activity-item")) {
      currentScreen++;
      showScreen(currentScreen);
    }
  });

  // Add click listener for the "Next" button on the video screen
  document.getElementById("next-button").addEventListener("click", () => {
    currentScreen++;
    showScreen(currentScreen);
  });
});
