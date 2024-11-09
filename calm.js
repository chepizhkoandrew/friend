document.addEventListener("DOMContentLoaded", () => {
  const questionLines = Array.from(document.querySelectorAll(".question-line"));
  const items = Array.from(document.querySelectorAll(".activity-grid .activity-item"));
  const totalDuration = 2000; // 2 seconds for all items to appear
  const startDelay = 3000; // Start after 3 seconds

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
  showElementsSequentially(questionLines, 1000);

  // Show activity items after question lines are displayed
  setTimeout(() => {
    showElementsSequentially(items, 500);
    setTimeout(() => items.forEach(item => item.classList.add("activity-item")), totalDuration);
  }, startDelay);

  // Handle dynamic loading and sequencing for second and third grids
  fetch('options.json')
    .then(response => response.json())
    .then(data => {
      const secondGrid = document.querySelector('.second-grid');
      const thirdGrid = document.querySelector('.third-grid');
      const nextButton = document.getElementById('next-button');

      // Handle first screen activity selection
      document.querySelectorAll('.activity-grid .activity-item').forEach(item => {
        item.addEventListener('click', () => {
          const category = item.textContent.trim();
          if (data[category]) {
            // Populate the second grid dynamically
            secondGrid.innerHTML = data[category]
              .map(option => `<div class="activity-item">${option.name}</div>`)
              .join('');
            secondGrid.style.display = 'grid';

            // Apply sequential display for the second grid
            const secondItems = Array.from(secondGrid.children);
            showElementsSequentially(secondItems, 500);

            document.querySelector('.question').style.display = 'none';
            document.querySelector('.activity-grid').style.display = 'none';
            document.querySelector('.second-question').style.display = 'block';
            nextButton.style.display = 'block';
          }
        });
      });

      // Handle transition to third screen
      nextButton.addEventListener('click', () => {
        const thirdItems = Array.from(thirdGrid.children);
        document.querySelector('.second-question').style.display = 'none';
        secondGrid.style.display = 'none';

        document.querySelector('.third-question').style.display = 'block';
        thirdGrid.style.display = 'grid';
        showElementsSequentially(thirdItems, 500);

        nextButton.style.display = 'none'; // Hide the next button
      });
    })
    .catch(error => console.error('Error loading options:', error));
});
