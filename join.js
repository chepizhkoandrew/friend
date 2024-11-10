// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
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
const db = getFirestore(app);

// Initialize Google Sign-In with Redirect
function initializeGoogleSignIn() {
  const provider = new GoogleAuthProvider();

  // Show the "JOIN" button after 6 seconds
  setTimeout(() => {
    const joinButton = document.createElement("button");
    joinButton.textContent = "JOIN";
    joinButton.className = "join-button";
    joinButton.onclick = () => {
      console.log("JOIN button clicked, signing in with Google...");
      // Use signInWithRedirect
      signInWithRedirect(auth, provider);
    };

    const container = document.getElementById("joinButtonContainer");
    if (container) {
      console.log("Appending JOIN button to the container...");
      container.appendChild(joinButton);
    } else {
      console.error("joinButtonContainer not found!");
    }
  }, 6000); // 6-second delay
}

// Handle Redirect Result
async function handleRedirectResult() {
  getRedirectResult(auth)
    .then(async (result) => {
      if (result.user) {
        const user = result.user;

        console.log("User signed in via redirect:", user);

        // Save additional user data to Firestore
        const userRef = doc(db, "users", user.uid); // Use UID as document ID
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          registrationTime: new Date().toISOString(),
        });

        console.log("User data saved to Firestore");

        // Redirect to the /calm page
        window.location.href = "/calm";
      }
    })
    .catch((error) => {
      console.error("Error during redirect sign-in:", error);
    });
}

// Initialize authentication on page load
window.onload = function () {
  console.log("Page loaded, initializing Firebase and Google Sign-In");
  initializeGoogleSignIn();
  handleRedirectResult();
};
