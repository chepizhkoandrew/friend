document.addEventListener("DOMContentLoaded", () => {
  const questionLines = Array.from(document.querySelectorAll(".question span"));
  const items = Array.from(document.querySelectorAll(".activity-grid .activity-item"));
  const totalDuration = 2000; // 2 seconds for all items to appear
  const startDelay = 3000; // Start after 3 seconds
  let userChoices = { option1: "", option2: "" }; // To store user choices

  // Function to show elements sequentially
  const showElementsSequentially = (elements, delayBetween) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transition = `opacity 0.5s ease-in, transform 0.5s ease-in`;
      }, index * delayBetween);
    });
  };

  // Show question lines sequentially
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
    const rows = document.querySelectorAll(".activity-grid .activity-item");
    const rowCount = Math.ceil(rows.length / 3);
    for (let i = 0; i < rowCount; i++) {
      setTimeout(() => {
        for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          if (rows[index]) {
            rows[index].style.opacity = "1";
          }
        }
      }, i * 2000); // 2 seconds pause between rows
    }
  }, 8000);

  

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

          if (data[category]) {
            // Populate second grid dynamically
            secondGrid.innerHTML = data[category]
              .map(option => `<div class="activity-item">${option.name}</div>`)
              .join('');
            secondGrid.style.display = 'grid';

            // Show second screen
            showElementsSequentially(Array.from(secondGrid.children), 500);
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.activity-grid').style.display = 'none';
            document.querySelector('.second-question').style.display = 'block';
            background.classList.add('second');
          }
        });
      });

      // Second screen activity selection
      secondGrid.addEventListener('click', event => {
        const selectedOption = event.target.textContent.trim();
        if (selectedOption) {
          userChoices.option2 = selectedOption; // Store second choice

          // Transition to third screen
          secondGrid.style.display = 'none';
          document.querySelector('.second-question').style.display = 'none';
          thirdGrid.style.display = 'grid';
          document.querySelector('.third-question').style.display = 'block';
          showElementsSequentially(Array.from(thirdGrid.children), 500);
          background.classList.add('third');
        }
      });

      // Third screen activity selection
      thirdGrid.addEventListener('click', () => {
        goToFourthScreen();
      });
    })
    .catch(error => console.error('Error loading options:', error));
});














document.addEventListener("DOMContentLoaded", () => {
  const userChoices = { option1: "", option2: "" }; // Store user selections

  // Function to show elements sequentially
  const showElementsSequentially = (elements, delayBetween) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transition = `opacity 0.5s ease-in, transform 0.5s ease-in`;
      }, index * delayBetween);
    });
  };

  // Fetch GPT response
  const fetchDogWisdom = async (option1, option2) => {
    const prompt = `If you were a dog psychologist loving Bill Murray and Monty Python and being the smartest person in the dog world, what advice would you give to a stranger who is now at ${option1} feeling ${option2} inside? The advice should be creative, sarcastic, sexy, rough, and bohemian but very smart and funny. Make it sound like it's from the dog's perspective.`;
    console.log(`Sending GPT request with choices: ${option1}, ${option2}`);
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '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' // Replace with actual API key
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt,
          max_tokens: 100,
          temperature: 0.9
        })
      });
      const data = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error("Error fetching dog wisdom:", error);
      return "Sorry, wisdom is unavailable.";
    }
  };

  // Transition to the fourth screen (Dog Wisdom)
  const goToFourthScreen = async () => {
    const fourthQuestion = document.querySelector('.fourth-question');
    const wisdomElement = document.getElementById('dog-wisdom');

    fourthQuestion.style.display = 'block';
    setTimeout(async () => {
      const wisdom = await fetchDogWisdom(userChoices.option1, userChoices.option2);
      wisdomElement.textContent = wisdom;
      wisdomElement.style.opacity = '1'; // Smooth fade-in
    }, 15000);
  };

  // Handle activity selection and transitions
  fetch('options.json')
    .then(response => response.json())
    .then(data => {
      const secondGrid = document.querySelector('.second-grid');
      const background = document.querySelector('.background');

      // Handle first screen: "Where?"
      document.querySelectorAll('.activity-grid .activity-item').forEach(item => {
        item.addEventListener('click', () => {
          const category = item.textContent.trim();
          console.log(`First choice (Where?): ${category}`);
          userChoices.option1 = category; // Store first choice

          if (data[category]) {
            // Populate the second grid dynamically
            secondGrid.innerHTML = data[category]
              .map(option => `<div class="activity-item">${option.name}</div>`)
              .join('');
            secondGrid.style.display = 'grid';

            // Transition to the second screen
            showElementsSequentially(Array.from(secondGrid.children), 500);
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.activity-grid').style.display = 'none';
            document.querySelector('.second-question').style.display = 'block';
            background.classList.add('second');
          }
        });
      });

      // Handle second screen: "What?"
      secondGrid.addEventListener('click', event => {
        const selectedOption = event.target.textContent.trim();
        if (selectedOption) {
          console.log(`Second choice (What?): ${selectedOption}`);
          userChoices.option2 = selectedOption; // Store second choice

          // Transition to Dog Wisdom screen and fetch GPT advice
          secondGrid.style.display = 'none';
          document.querySelector('.second-question').style.display = 'none';
          goToFourthScreen();
        }
      });
    })
    .catch(error => console.error('Error loading options:', error));
});
