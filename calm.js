const wisdomElement = document.getElementById("dog-wisdom");
wisdomElement.innerHTML = ""; // Clear previous content

document.addEventListener("DOMContentLoaded", () => {
  const userChoices = { option1: "", option2: "" }; // Store user selections

  // Function to show elements sequentially with random delays and durations
  const showElementsSequentially = (elements, minDelay, maxDelay, minDuration, maxDuration) => {
    elements.forEach(element => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transition = `opacity ${duration}ms ease-in`;
      }, delay);
    });
  };


  

  // Show question lines sequentially
  const questionLines = Array.from(document.querySelectorAll(".question span"));
  setTimeout(() => {
    questionLines[0].style.opacity = "1";
  }, 1000);

  setTimeout(() => {
    questionLines[1].style.opacity = "1";
  }, 3500);

  setTimeout(() => {
    questionLines[2].style.opacity = "1";
  }, 6000);

  const wisdomElement = document.getElementById("dog-wisdom");


  // Show activity items after question lines are displayed
  setTimeout(() => {
    const rows = Array.from(document.querySelectorAll(".activity-grid .activity-item"));
    const minDelay = 4000; // Minimum delay (4 seconds)
    const maxDelay = 8000; // Maximum delay (8 seconds)
    const minDuration = 1000; // Minimum duration (1 second)
    const maxDuration = 4000; // Maximum duration (4 seconds)

    showElementsSequentially(rows, minDelay, maxDelay, minDuration, maxDuration);
  }, 4000); // Start after 4 seconds

  // Fetch GPT response
  const fetchDogWisdom = async (option1, option2) => {
    const prompt = `If you were a dog psychologist loving Bill Murray and Monty Python and being the smartest person in the dog world, what advice would you give to a stranger who is now at ${option1} feeling ${option2} inside?`;
  
    try {
      const response = await fetch("https://friend-4mph.onrender.com/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Validate that text exists
      if (!data.text) {
        throw new Error("Invalid response format: text is missing");
      }
  
      return data.text.trim();
    } catch (error) {
      console.error("Error fetching dog wisdom:", error.message);
      return "Sorry, wisdom is unavailable.";
    }
  };


  // Transition to the fourth screen (Dog Wisdom)
  const goToFourthScreen = async () => {
    const fourthQuestion = document.querySelector('.fourth-question');
    const wisdomElement = document.getElementById('dog-wisdom');
    document.querySelector(".second-grid").style.display = "none";
    document.querySelector(".second-question").style.display = "none";
    document.querySelector(".third-grid").style.display = "none";
    document.querySelector(".third-question").style.display = "none";
    // Clear existing content in dog wisdom
    wisdomElement.innerHTML = "";

    fourthQuestion.style.display = 'block';

    try {
        const wisdomText = await fetchDogWisdom(userChoices.option1, userChoices.option2);
        const wisdomParts = wisdomText.split(' ').reduce((acc, word, index) => {
            const partIndex = Math.floor(index / 10);
            if (!acc[partIndex]) acc[partIndex] = [];
            acc[partIndex].push(word);
            return acc;
        }, []).map(part => part.join(' '));

        wisdomParts.forEach((part, index) => {
            const span = document.createElement('span');
            span.textContent = part;
            span.style.opacity = '0';
            wisdomElement.appendChild(span);
        });

        const spans = Array.from(wisdomElement.children);
        const minDelay = 4000; // Minimum delay (4 seconds)
        const maxDelay = 7000; // Maximum delay (7 seconds)
        const minDuration = 1000; // Minimum duration (1 second)
        const maxDuration = 4000; // Maximum duration (4 seconds)

        showElementsSequentially(spans, minDelay, maxDelay, minDuration, maxDuration);
    } catch (error) {
        console.error('Error in goToFourthScreen:', error.message);
    }
};



  // Handle activity selection and transitions
  fetch('options.json')
    .then(response => response.json())
    .then(data => {
      const secondGrid = document.querySelector('.second-grid');
      const thirdGrid = document.querySelector('.third-grid');
      const videoScreen = document.querySelector('.video-screen');
      const nextButton = document.getElementById('next-button');
      const background = document.querySelector('.background');
      const video = document.getElementById('background-video');

      // First screen activity selection
      document.querySelectorAll('.activity-grid .activity-item').forEach(item => {
        item.addEventListener('click', () => {
          const category = item.textContent.trim();
          userChoices.option1 = category; // Store first choice
          console.log("Option1 set to:", userChoices.option1);


          if (data[category]) {
            // Populate second grid dynamically
            secondGrid.innerHTML = data[category]
              .map(option => `<div class="activity-item">${option.name}</div>`)
              .join('');
            secondGrid.style.display = 'grid';

            // Show second screen
            showElementsSequentially(Array.from(secondGrid.children), 4000, 8000, 1000, 4000);
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.activity-grid').style.display = 'none';
            document.querySelector('.second-question').style.display = 'block';
            background.classList.add('second');
          }
        });
      });

      // Handle second screen activity selection
      secondGrid.addEventListener("click", (event) => {
        const selectedOption = event.target.textContent?.trim();
        if (selectedOption) {
            console.log(`Option2 set to: ${selectedOption}`); // Debugging
            userChoices.option2 = selectedOption; // Store second choice
            goToFourthScreen(); // Trigger transition
        }
    });

      // Handle third screen activity selection
      thirdGrid.addEventListener('click', event => {
        const selectedOption = event.target.textContent.trim();
        if (selectedOption) {
          goToFourthScreen();
        }
      });
    })
    .catch(error => console.error('Error loading options:', error));
});




const goToNewGptScreen = async () => {
  const gptScreen = document.querySelector('.new-gpt-screen');
  const wisdomElement = document.getElementById('dog-wisdom');

  // Ensure other screens are hidden
  document.querySelectorAll('.container > div').forEach(screen => {
      screen.style.display = 'none';
  });

  // Show the new GPT screen
  gptScreen.style.display = 'flex';

  // Clear the existing wisdom content
  wisdomElement.innerHTML = "";

  try {
      // Fetch GPT response
      const wisdomText = await fetchDogWisdom(userChoices.option1, userChoices.option2);
      console.log("Fetched wisdom:", wisdomText); // Debugging

      // Update the wisdom span with the response
      wisdomElement.textContent = wisdomText;

      // Optionally apply a fade-in effect
      wisdomElement.style.opacity = '0';
      wisdomElement.style.transition = 'opacity 2s ease-in';
      setTimeout(() => {
          wisdomElement.style.opacity = '1';
      }, 100); // Slight delay to trigger the transition

  } catch (error) {
      console.error('Error in goToNewGptScreen:', error.message);
      wisdomElement.textContent = "Sorry, wisdom is unavailable.";
  }
};



const sendChoicesAndFetchWisdom = async (option1, option2) => {
  try {
      const response = await fetch("https://friend-4mph.onrender.com/first", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ option1, option2 }),
      });

      if (!response.ok) {
          throw new Error(`Server error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.wisdom) {
          throw new Error("Invalid response format: wisdom is missing");
      }

      return data.wisdom;
  } catch (error) {
      console.error("Error fetching wisdom:", error.message);
      return "Sorry, wisdom is unavailable.";
  }
};