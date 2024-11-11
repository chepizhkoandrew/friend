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


// Function to fetch dog wisdom from the server
function fetchDogWisdom() {
  console.log('Fetching dog wisdom...'); // Debugging log
  fetch('https://friend-4mph.onrender.com/api/gpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: 'Give me some dog wisdom' })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dog wisdom:', data);
    document.getElementById('dog-wisdom').textContent = data.choices[0].text.trim();
  })
  .catch(error => console.error('Error fetching dog wisdom:', error));
}





  // Transition to the fourth screen (Dog Wisdom)
  const goToFourthScreen = async () => {
    const fourthQuestion = document.querySelector('.fourth-question');
    const wisdomElement = document.getElementById('dog-wisdom');
  
    fourthQuestion.style.display = 'block';
  
    try {
      await fetchDogWisdom(); // Ensure fetchDogWisdom runs correctly
      wisdomElement.style.opacity = '1'; // Smooth fade-in
    } catch (error) {
      console.error('Error in goToFourthScreen:', error.message);
    }
  };
  
// Call fetchDogWisdom when needed
fetchDogWisdom();


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
