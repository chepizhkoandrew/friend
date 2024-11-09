document.addEventListener("DOMContentLoaded", () => {
  const questionLines = Array.from(document.querySelectorAll(".question-line"));
  const items = Array.from(document.querySelectorAll(".activity-grid .activity-item"));
  const totalDuration = 2000; // 2 seconds for all items to appear
  const startDelay = 3000; // Start after 3 seconds
  const pauseBeforeBlink = 1000; // 1 second pause before blinking

  // Function to show elements sequentially with random delays
  const showElementsSequentially = (elements, totalDuration) => {
    const delays = elements.map(() => Math.random()).sort();
    const maxDelay = Math.max(...delays);
    const normalizedDelays = delays.map(d => (d / maxDelay) * totalDuration);

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transition = `opacity 0.5s ease-in`;
      }, normalizedDelays[index]);
    });
  };

  // Show question lines sequentially
  showElementsSequentially(questionLines, 1000);

  // Show activity items after question lines are displayed
  setTimeout(() => {
    showElementsSequentially(items, totalDuration);
    setTimeout(() => items.forEach(item => item.classList.add("blink")), pauseBeforeBlink);
  }, questionLines.length * 1000);

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
            secondGrid.innerHTML = data[category].map(option => `<div class="activity-item blink-color" style="--blink-color: ${option.color};">${option.name}</div>`).join('');
            document.querySelector('.question').style.display = 'none';
            document.querySelector('.activity-grid').style.display = 'none';
            document.querySelector('.second-question').style.display = 'block';
            secondGrid.style.display = 'grid';
            showElementsSequentially(Array.from(secondGrid.children), totalDuration);
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
        showElementsSequentially(Array.from(thirdGrid.children), totalDuration);
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