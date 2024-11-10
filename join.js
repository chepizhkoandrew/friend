// Google Client ID
const clientId = "515649551791-s295ecne6f8srac5gf3gitidmgee3st8.apps.googleusercontent.com";

// Initialize Google Sign-In
function initializeGoogleSignIn() {
  console.log("Initializing Google Sign-In...");
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });

  // Show the "JOIN" button after a delay
  setTimeout(() => {
    const joinButton = document.createElement("button");
    joinButton.textContent = "JOIN";
    joinButton.className = "join-button";

    // Trigger Google Sign-In on click
    joinButton.addEventListener("click", () => {
      console.log("User clicked JOIN button. Showing Google Sign-In popup...");
      google.accounts.id.prompt(); // Explicitly call prompt()
    });

    const container = document.getElementById("joinButtonContainer");
    if (container) {
      container.appendChild(joinButton);
      console.log("JOIN button displayed.");
    } else {
      console.error("joinButtonContainer not found!");
    }
  }, 9000); // Show button after 9 seconds
}

// Equalizer Effect for Motto
function startEqualizerEffect(selector) {
  const textBlocks = document.querySelectorAll(selector);
  if (!textBlocks.length) {
    console.error(`Elements with selector "${selector}" not found!`);
    return;
  }

  textBlocks.forEach((block) => {
    const textContent = block.textContent;
    block.innerHTML = textContent
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");

    const letters = block.querySelectorAll("span");

    // Randomly animate letters
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const letter = letters[randomIndex];
      letter.style.animation = "scaleLetter 3s ease-in-out";
      letter.addEventListener(
        "animationend",
        () => {
          letter.style.animation = ""; // Reset for re-triggering
        },
        { once: true }
      );
    }, Math.random() * 1000 + 2000); // Trigger every 2–3 seconds
  });
}

// Handle Google Sign-In Response
function handleCredentialResponse(response) {
  try {
    const user = jwt_decode(response.credential);
    console.log("User signed in successfully:", user);

    // Send event to Google Analytics
    gtag("event", "user_authentication", {
      email: user.email,
      authentication_time: new Date().toISOString(),
    });

    // Redirect to /calm page
    logPageRedirection("/calm");
    window.location.href = "https://tailtrail.club/calm";
  } catch (error) {
    console.error("Error handling Google Sign-In response:", error);
  }
}

// Log Page Redirection for Analytics
function logPageRedirection(pageName) {
  gtag("event", "page_redirection", {
    event_category: "navigation",
    event_label: pageName,
    redirection_time: new Date().toISOString(),
  });
  console.log(`Redirecting to: ${pageName}`);
}

// Initialize on Page Load
window.onload = function () {
  initializeGoogleSignIn();
  startEqualizerEffect(".block1 p, .block2 p"); // Apply effect to motto lines
};
