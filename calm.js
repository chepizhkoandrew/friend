document.addEventListener("DOMContentLoaded", () => {
  const questionLines = Array.from(document.querySelectorAll(".question span"));
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
  setTimeout(() => {
    questionLines[0].style.opacity = "1";
  }, 1000);

  setTimeout(() => {
    questionLines[1].style.opacity = "1";
  }, 4000);

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

  // Handle dynamic loading and sequencing for second, video, and third grids
  fetch('options.json')
    .then(response => response.json())
    .then(data => {
      const secondGrid = document.querySelector('.second-grid');
      const thirdGrid = document.querySelector('.third-grid');
      const videoScreen = document.querySelector('.video-screen');
      const nextButton = document.getElementById('next-button');
      const background = document.querySelector('.background');
      const video = document.getElementById('background-video');

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
            nextButton.style.display = 'none'; // Hide the next button initially

            // Change background for the second screen
            background.classList.add('second');
            background.classList.remove('third');
          }
        });
      });

      // Handle transition to video screen
      document.querySelector('.see-example').addEventListener('click', () => {
        document.querySelector('.second-question').style.display = 'none';
        secondGrid.style.display = 'none';

        videoScreen.style.display = 'flex';
        video.play();

        nextButton.style.display = 'block'; // Show the next button
      });

      // Handle transition to third screen
      nextButton.addEventListener('click', () => {
        const thirdItems = Array.from(thirdGrid.children);
        videoScreen.style.display = 'none';
        video.pause();

        document.querySelector('.third-question').style.display = 'block';
        thirdGrid.style.display = 'grid';
        showElementsSequentially(thirdItems, 500);

        nextButton.style.display = 'none'; // Hide the next button

        // Change background for the third screen
        background.classList.add('third');
        background.classList.remove('second');
      });

      // Show the next button only when an option is picked on the second screen
      secondGrid.addEventListener('click', () => {
        nextButton.style.display = 'block';
      });

      // Show the next button only when an option is picked on the third screen
      thirdGrid.addEventListener('click', () => {
        nextButton.style.display = 'block';
      });
    })
    .catch(error => console.error('Error loading options:', error));
});