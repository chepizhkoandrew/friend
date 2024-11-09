document.addEventListener("DOMContentLoaded", () => {
  const questionLines = Array.from(document.querySelectorAll(".question-line"));
  const items = Array.from(document.querySelectorAll(".activity-item"));
  const totalDuration = 3000; // 3 seconds for all items to appear
  const startDelay = 6000; // Start after 6 seconds
  const pauseBeforeBlink = 1000; // 1 second pause before blinking

  // Generate randomized delays for each item
  const delays = items.map(() => Math.random()).sort(); // Random delays sorted to ensure slowing effect
  const maxDelay = Math.max(...delays);

  // Normalize delays to fit within totalDuration
  const normalizedDelays = delays.map(d => (d / maxDelay) * totalDuration);

  // Function to show elements sequentially
  const showElementsSequentially = (elements, delayBetween) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transition = `opacity 0.5s ease-in`;
      }, index * delayBetween);
    });
  };

  // Show question lines sequentially
  showElementsSequentially(questionLines, 1000);

  // Show activity items after question lines are displayed
  setTimeout(() => {
    items.forEach(item => {
      const text = item.textContent.trim(); // Get the item's text
      if (imagePaths[text]) {
        item.style.setProperty("--image-path", `url('${imagePaths[text]}')`);
        item.style.backgroundImage = `var(--image-path)`; // Apply as background image
      }
    });

    showElementsSequentially(items, 500);
  }, questionLines.length * 1000);

  // Add blink effect after all items are visible
  setTimeout(() => {
    items.forEach(item => item.classList.add("blink"));
  }, startDelay + totalDuration + pauseBeforeBlink);

  // Load options from JSON
  fetch('options.json')
    .then(response => response.json())
    .then(data => {
      console.log('Options loaded:', data); // Debugging log
      const secondGrid = document.querySelector('.second-grid');
      const thirdGrid = document.querySelector('.third-grid');
      const nextButton = document.getElementById('next-button');

      // Handle first question selection
      document.querySelectorAll('.activity-grid .activity-item').forEach(item => {
        item.addEventListener('click', () => {
          const category = item.textContent.trim();
          console.log('Category selected:', category); // Debugging log
          if (data[category]) {
            secondGrid.innerHTML = data[category].map(option => `<div class="activity-item" style="--blink-color: ${option.color};">${option.name}</div>`).join('');
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.activity-grid').style.display = 'none';
            document.querySelector('.second-question').style.display = 'block';
            secondGrid.style.display = 'grid';
            showElementsSequentially(Array.from(secondGrid.children), 500);
            nextButton.style.display = 'block';

            // Add event listeners to the new items
            secondGrid.querySelectorAll('.activity-item').forEach(newItem => {
              newItem.addEventListener('click', () => {
                nextButton.classList.add("blink");
              });
            });
          }
        });
      });

      // Handle second question selection
      nextButton.addEventListener('click', () => {
        document.querySelector('.second-question').style.display = 'none';
        secondGrid.style.display = 'none';
        document.querySelector('.third-question').style.display = 'block';
        thirdGrid.style.display = 'grid';
        showElementsSequentially(Array.from(thirdGrid.children), 500);
        nextButton.style.display = 'none';
      });
    })
    .catch(error => console.error('Error loading options:', error)); // Debugging log
});

const imagePaths = {
  "Walk in Park": "images/park.jpg",
  "Go Home": "images/home.jpg",
  "Explore Nature": "images/nature.jpg",
  "Visit Cafe": "images/cafe.jpg",
  "Read a Book": "images/book.jpg",
  "Call a Friend": "images/call.jpg"
};