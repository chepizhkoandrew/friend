// Google Client ID
const clientId = "515649551791-s295ecne6f8srac5gf3gitidmgee3st8.apps.googleusercontent.com";

// Initialize Google Sign-In
function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });

  // Show the "JOIN" button after a delay
  setTimeout(() => {
    const joinButton = document.createElement("join-button");
    joinButton.textContent = "JOIN";
    joinButton.className = "join-button";
    joinButton.onclick = () => {
      google.accounts.id.prompt(); // Show the Google Sign-In popup
    };
    const container = document.getElementById("joinButtonContainer");
    if (container) {
      container.appendChild(joinButton);
    } else {
      console.error("joinButtonContainer not found!");
    }
  }, 6000); // Show button after 6 seconds
}

// Handle Google Sign-In Response
function handleCredentialResponse(response) {
  // Decode the credential token to get user info
  const user = jwt_decode(response.credential);


  // Send event to Google Analytics
  gtag('event', 'user_authentication', {
    email: user.email,
    authentication_time: new Date().toISOString(),
  });

  // Redirect to the /calm page
  window.location.href = "https://tailtrail.club/calm";
}

// Initialize on Page Load
window.onload = function () {
  console.log("Initializing Google Authentication...");
  initializeGoogleSignIn();
};
