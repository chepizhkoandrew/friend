// Firebase Configuration
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
firebase.initializeApp(firebaseConfig);

// Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();


// Show "JOIN" Button After Delay
function showJoinButton() {
  setTimeout(() => {
    const joinButton = document.createElement("button");
    joinButton.textContent = "JOIN";
    joinButton.className = "join-button";
    joinButton.onclick = () => {
      console.log("Redirecting to Google Sign-In...");
      auth.signInWithRedirect(provider);
    };

    const container = document.getElementById("joinButtonContainer");
    if (container) {
      container.appendChild(joinButton);
    } else {
      console.error("joinButtonContainer not found!");
    }
  }, 6000); // Display button after 6 seconds
}




// Handle Google Redirect Result
function handleRedirectResult() {
  auth.getRedirectResult()
    .then(async (result) => {
      if (result.user) {
        const user = result.user;
        console.log("User signed in:", user);

        // Save user data to Firestore
        const userRef = db.collection("users").doc(user.uid);
        await userRef.set({
          email: user.email,
          name: user.displayName,
          registrationTime: new Date().toISOString(),
        });

        console.log("User data saved to Firestore");

        // Redirect to the /calm page
        window.location.href = "https://tailtrail.club/calm";
      } else {
        console.log("No user found in the redirect result.");
      }
    })
    .catch((error) => {
      console.error("Error during redirect sign-in:", error.message);
    });
}


// Initialize the App on Page Load
window.onload = function () {
  console.log("Initializing Firebase Authentication...");
  showJoinButton();
  handleRedirectResult();
};
