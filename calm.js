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
  const fetchDogWisdom = async () => {
    const exerciseoneprompt = `If you were a dog psychologist loving Bill Murray and Monty Python and being the smartest person in the dog world, what advice would you give to a stranger who is now at ${userChoices.option1} feeling ${userChoices.option2} inside? The advice should be creative, sarcastic, sexy, rough, and bohemian but very smart and funny. Make it sound like it's from the dog's perspective.`;
    console.log(`Sending GPT request with choices: ${userChoices.option1}, ${userChoices.option2}`);
    try {
      const response = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exerciseoneprompt })
      });
      const data = await response.json();
      if (data.text) {
        return data.text.trim();
      } else {
        console.error("Invalid response format: text is missing");
        return "Sorry, wisdom is unavailable.";
      }
    } catch (error) {
      console.error("Error fetching dog wisdom:", error);
      return "Sorry, wisdom is unavailable.";
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
      document.querySelectorAll('.activity-grid.activity-item').forEach(item => {
        item.addEventListener('click', () => {
          const category = item.textContent.trim();
          userChoices.option1 = category; // Store first choice
        
          showElementsSequentially(Array.from(secondGrid.children), 4000, 8000, 1000, 4000);
          document.querySelector('.question').style.display = 'none';
          document.querySelector('.activity-grid').style.display = 'none';
          document.querySelector('.second-question').style.display = 'block';
          background.classList.add('second');

          
        });
      });

      // Handle second screen activity selection
      secondGrid.addEventListener('click', event => {
        const selectedOption = event.target.textContent.trim();
        if (selectedOption) {
          userChoices.option2 = selectedOption; // Store second choice

           // Show fourth normal screen
// Transition to the fourth screen (Dog Wisdom)
const goToFourthScreen = async () => {
  const fourthQuestion = document.querySelector('.fourth-question');
  const wisdomElement = document.getElementById('dog-wisdom');

  fourthQuestion.style.display = 'block';

  try {
    const wisdomText = await fetchDogWisdom();
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





          // Transition to last screen
          thirdGrid.style.display = 'none';
          document.querySelector('.second-question').style.display = 'none';
          document.querySelector('.second-question').style.display = 'none';
          document.querySelector('.third-grid').style.display = 'grid';
          document.querySelector('.third-question').style.display = 'block';
          showElementsSequentially(Array.from(document.querySelector('.third-grid').children), 4000, 8000, 1000, 4000,);
        }
      });

      // Handle second screen activity selection
      secondGrid.addEventListener('click', event => {
        const selectedOption = event.target.textContent.trim();
        if (selectedOption) {
          userChoices.option2 = selectedOption; // Store second choice

          // Show fourth normal screen
          // Transition to the fourth screen (Dog Wisdom)
          const goToFourthScreen = async () => {
            const fourthQuestion = document.querySelector('.fourth-question');
            const wisdomElement = document.getElementById('dog-wisdom');

            fourthQuestion.style.display = 'block';

            try {
              const wisdomText = await fetchDogWisdom();
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

          // Transition to last screen
          thirdGrid.style.display = 'none';
          document.querySelector('.second-question').style.display = 'none';
          document.querySelector('.third-grid').style.display = 'grid';
          document.querySelector('.third-question').style.display = 'block';
          showElementsSequentially(Array.from(document.querySelector('.third-grid').children), 4000, 8000, 1000, 4000);
        }
      });
    })
    .catch(error => console.error('Error loading options:', error));
});