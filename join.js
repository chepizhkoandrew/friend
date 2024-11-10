// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSIf09w_pEiv2pCS3aVr2EshjUUBQxy0o",
  authDomain: "tailtrail-ce7bf.firebaseapp.com",
  projectId: "tailtrail-ce7bf",
  storageBucket: "tailtrail-ce7bf.appspot.com",
  messagingSenderId: "200107764514",
  appId: "1:200107764514:web:3883ab5328039ddc81137b",
  measurementId: "G-4QE0HDP22K"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Google Sign-In Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Initialize Google Sign-In with Redirect
function initializeGoogleSignIn() {
  setTimeout(() => {
    const joinButton = document.createElement("button");
    const container = document.getElementById("joinButtonContainer"); // Correct container
    if (container) {
      joinButton.textContent = "JOIN";
      joinButton.className = "join-button";
      joinButton.onclick = () => {
        auth.signInWithRedirect(provider);
      };
      container.appendChild(joinButton); // Append to correct container
    } else {
      console.error("joinButtonContainer not found!");
    }
  }, 6000);
}

// Handle Redirect Result
function handleRedirectResult() {
  auth.getRedirectResult()
    .then((result) => {
      if (result.user) {
        const user = result.user;

        // Save user data to Firestore
        const userRef = db.collection("users").doc(user.uid);
        userRef.set({
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
  initializeGoogleSignIn();
  handleRedirectResult();
};
