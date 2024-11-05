let tasks = [];
let lastTask = null;
let currentTask = null;
let progressInterval = null;
let paused = false;
let progress = 0;
let elapsedTime = 0;

// Disable the Get Busy button initially
document.getElementById('getBusyButton').disabled = true;

// Functions to show/hide the initial message
function showInitialMessage() {
    document.getElementById('task').innerText = 'Press "Get Busy" to start!';
}

function hideInitialMessage(taskName) {
    document.getElementById('task').innerText = taskName;
}

// Fetch tasks from JSON file
fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        console.log("Tasks loaded successfully:", tasks);

        // Enable the Get Busy button after loading tasks
        document.getElementById('getBusyButton').disabled = false;
        showInitialMessage();
    })
    .catch(error => console.error('Error loading tasks:', error));

function getRandomTask() {
    if (tasks.length === 0) {
        alert("Tasks are not loaded yet. Please try again.");
        return;
    }

    let weightedTasks = [];
    tasks.forEach(task => {
        let weight = Math.round(task.probability / 100 * 10);
        for (let i = 0; i < weight; i++) {
            weightedTasks.push(task);
        }
    });

    let randomTask;
    do {
        randomTask = weightedTasks[Math.floor(Math.random() * weightedTasks.length)];
    } while (lastTask && randomTask.name === lastTask.name);

    lastTask = randomTask;
    currentTask = randomTask;

    hideInitialMessage(randomTask.name); // Update the task name here

    const taskImage = document.getElementById('taskImage');
    taskImage.src = 'images/' + randomTask.image;
    taskImage.style.display = 'block';

    taskImage.onerror = function() {
        console.error(`Failed to load image: ${taskImage.src}`);
        taskImage.style.display = 'none';
        document.getElementById('task').innerText = `Failed to load image for "${randomTask.name}". Check that "images/${randomTask.image}" exists.`;
    };
}

function startProgressBar(duration) {
    paused = false;
    elapsedTime = progress;
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const taskImage = document.getElementById('taskImage');
    progressContainer.style.width = taskImage.offsetWidth + 'px';
    progressContainer.style.display = 'block';
    document.getElementById('cancelTimerButton').style.display = 'block';
    taskImage.classList.add('activeTimer');

    progressInterval = setInterval(() => {
        if (!paused) {
            elapsedTime += 1;
            const fraction = (elapsedTime / duration) * 100;
            progressBar.style.width = fraction + '%';

            if (fraction >= 85) {
                progressBar.style.backgroundColor = 'red';
                progressBar.style.animation = 'blink 1s infinite';
            }

            if (elapsedTime >= duration) {
                clearInterval(progressInterval);
                resetToInitialState();
                showAfterText();
            }
        }
    }, 1000);
}

function resetToInitialState() {
    showInitialMessage();
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('afterText').style.display = 'none';
    document.getElementById('taskImage').classList.remove('activeTimer');
    document.getElementById('cancelTimerButton').style.display = 'none';
    progress = 0;
    elapsedTime = 0;
}

function showAfterText() {
    document.getElementById('afterText').innerText = currentTask.aftertext;
    document.getElementById('afterText').style.display = 'block';
}

document.getElementById('getBusyButton').addEventListener('click', getRandomTask);

// Image click event to show the popup
document.getElementById('taskImage').addEventListener('click', () => {
    if (!currentTask) return;
    document.getElementById('popup').style.display = 'block';
});

// Yes button to start the timer
document.getElementById('yesButton').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('afterText').style.display = 'none';
    startProgressBar(currentTask.time);
});

// Cancel button to close the popup
document.getElementById('cancelButton').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// Cancel Timer button during active timer
document.getElementById('cancelTimerButton').addEventListener('click', () => {
    paused = true;
    clearInterval(progressInterval);
    document.getElementById('pausePopup').style.display = 'block';
});

// Popup "Want to skip it?" - Yes to reset everything
document.getElementById('confirmCancelButton').addEventListener('click', () => {
    document.getElementById('pausePopup').style.display = 'none';
    resetToInitialState();
});

// Popup "Want to skip it?" - No to resume timer
document.getElementById('resumeButton').addEventListener('click', () => {
    document.getElementById('pausePopup').style.display = 'none';
    paused = false;
    startProgressBar(currentTask.time); // Resume timer from where it left off
});
