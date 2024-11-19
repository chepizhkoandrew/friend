document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Get user input
    const userInput = document.getElementById('userInput').value;
    
    // Send the input to the server (Node.js server)
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Loading...';  // Show a loading message

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: userInput })  // Send the user input to the server
        });

        // Parse the response JSON and display it
        const data = await response.json();
        if (data.answer) {
            responseDiv.innerHTML = `<strong>Response:</strong> <p>${data.answer}</p>`;
        } else {
            responseDiv.innerHTML = '<strong>Error:</strong> No answer returned from the server.';
        }
    } catch (error) {
        responseDiv.innerHTML = `<strong>Error:</strong> Unable to fetch data from the server.`;
    }
});