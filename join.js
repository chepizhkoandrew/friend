// Initialize Google Sign-In after delay
function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: "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",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("joinButtonContainer"),
    { theme: "outline", size: "large" }
  );
  console.log("Google Sign-In initialized");
}

// Handle the credential response from Google Sign-In
function handleCredentialResponse(response) {
  const user = jwt_decode(response.credential); // Decode ID token
  console.log("User signed in:", user);
  window.location.href = "/calm"; // Redirect on success
}

// Check if the user is already authenticated
function checkIfAuthenticated() {
  const isAuthenticated = false; // Placeholder logic
  if (isAuthenticated) {
    console.log("User is authenticated");
    window.location.href = "/calm";
  } else {
    console.log("User is not authenticated");
  }
}

// Delayed Button Rendering and Initialization
window.onload = function () {
  console.log("Page loaded");
  checkIfAuthenticated();
  setTimeout(() => {
    console.log("Initializing Google Sign-In after delay");
    initializeGoogleSignIn();
  }, 5000); // 5-second delay
};
