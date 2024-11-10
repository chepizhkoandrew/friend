// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSIf09w_pEiv2pCS3aVr2EshjUUBQxy0o",
  authDomain: "tailtrail-ce7bf.firebaseapp.com",
  projectId: "tailtrail-ce7bf",
  storageBucket: "tailtrail-ce7bf.appspot.com",
  messagingSenderId: "200107764514",
  appId: "1:200107764514:web:3883ab5328039ddc81137b",
  measurementId: "G-4QE0HDP22K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Google Sign-In and Firebase Authentication
function initializeGoogleSignIn() {
  const provider = new GoogleAuthProvider();

  // Display "JOIN" button after 5 seconds
  setTimeout(() => {
    const joinButton = document.createElement("button");
    joinButton.textContent = "JOIN";
    joinButton.className = "join-button";
    joinButton.onclick = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("User signed in:", user);

          // Send user details to the backend
          fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.displayName,
              registrationTime: new Date().toISOString(),
            }),
          }).then((res) => {
            if (res.ok) {
              console.log("User data logged successfully");
            } else {
              console.error("Failed to log user data");
            }
          });

          // Redirect to /calm page
          window.location.href = "/calm";
        })
        .catch((error) => {
          console.error("Error during sign-in:", error);
        });
    };

    document.getElementById("joinButtonContainer").appendChild(joinButton);
  }, 5000); // 5-second delay
}

// Check if the user is already authenticated
function checkIfAuthenticated() {
  const user = auth.currentUser;
  if (user) {
    console.log("User is already authenticated:", user);
    window.location.href = "/calm";
  } else {
    console.log("No authenticated user found");
  }
}

// Initialize authentication on page load
window.onload = function () {
  console.log("Page loaded, initializing Firebase and Google Sign-In");
  initializeGoogleSignIn();
  checkIfAuthenticated();
};
