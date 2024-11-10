// Initialize Google Sign-In
function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: "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",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("joinButtonContainer"),
    { theme: "outline", size: "large" } // customization attributes
  );
  console.log("Google Sign-In initialized");
}

// Handle the credential response from Google Sign-In
function handleCredentialResponse(response) {
  // Decode the ID token and get user information
  const user = jwt_decode(response.credential);
  console.log("User signed in:", user);

  // Redirect to /calm after successful sign-in
  window.location.href = "/calm";
}

// Check if the user is already authenticated
function checkIfAuthenticated() {
  // Check if the user is already authenticated (this is a placeholder, implement your own logic)
  const isAuthenticated = false; // Replace with actual authentication check

  if (isAuthenticated) {
    console.log("User is already authenticated");
    window.location.href = "/calm";
  } else {
    console.log("User is not authenticated");
  }
}

// Initialize Google Sign-In and check authentication on page load
window.onload = function() {
  console.log("Page loaded, initializing Google Sign-In and checking authentication");
  initializeGoogleSignIn();
  checkIfAuthenticated();
};