// Initialize Google Sign-In
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: "515649551791-2m70cejboi72ct3cileeii6ntn6jmis7.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("joinButton"),
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

// Redirect to /calm on clicking Join button
document.getElementById("joinButton").addEventListener("click", () => {
  console.log("Join button clicked, triggering Google Sign-In");
  // Trigger Google Sign-In
  google.accounts.id.prompt();
});



// Display the join button after all animations complete
setTimeout(() => {
  const joinButton = document.getElementById("joinButton");
  joinButton.style.opacity = 1; // Fade in the join button
  console.log("Join button displayed");
}, 9000); // 3s delay + 1s fade-in for line1 + 4s delay for line2 + 1s fade-in for button

// Initialize Google Sign-In and check authentication on page load
window.onload = function() {
  console.log("Page loaded, initializing Google Sign-In and checking authentication");
  initializeGoogleSignIn();
  checkIfAuthenticated();
};