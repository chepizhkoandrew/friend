document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".question-screen");
    let currentScreen = 0;
  
    // Add event listeners to options
    document.querySelectorAll(".option").forEach((option) => {
      option.addEventListener("click", (e) => {
        const parentScreen = option.closest(".question-screen");
        parentScreen.querySelectorAll(".option").forEach((btn) =>
          btn.classList.remove("selected")
        );
        option.classList.add("selected");
        parentScreen.querySelector(".next-button").disabled = false;
      });
    });
  
    // Add event listeners to "Next" buttons
    document.querySelectorAll(".next-button").forEach((button, index) => {
      button.addEventListener("click", () => {
        screens[currentScreen].classList.add("hidden");
        currentScreen++;
        if (currentScreen < screens.length) {
          screens[currentScreen].classList.remove("hidden");
        } else {
          window.location.href = "/task"; // Redirect to /task
        }
      });
    });
  });
  