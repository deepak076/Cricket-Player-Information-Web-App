document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(playerForm); // Assuming 'playerform' is the HTML form element

        // Create an empty object to store the form data
        const formDataObject = {};

        // Iterate through the FormData entries and add them to the object
        for (let [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }

        // Now 'formDataObject' contains the form data as a JavaScript object
        console.log(formDataObject);

        // To convert it to a JSON string, you can use JSON.stringify
        const formDataJSON = JSON.stringify(formDataObject);
        console.log(formDataJSON);
        // Send the player data to the server
        fetch('/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON, // Send the JSON data in the request body
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from the server:', data);
                clearFormFields();
            })

            .catch(error => console.error('Error saving player data:', error));
    });

    function clearFormFields() {
        // Clear the input fields in the form
        console.log("hjii");
        playerForm.reset();
    }
});
function fetchPlayerList() {
    const searchInput = document.getElementById('search').value; // Get the search query from the input field

    // Send a GET request to search for players by name
    fetch(`/search?name=${searchInput}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data); // Display the search results
                displayPlayerResults(data.data);

            } else {
                console.error('Error searching for players:', data.error);
            }
        })
        .catch(error => console.error('Error searching for players:', error));
}
function displayPlayerResults(results) {
    const playerList = document.getElementById('player-list');

    // Clear the previous results
    playerList.innerHTML = '';

    // Loop through the search results and display player information
    results.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `
    <h3>${player.name}</h3>
    <p>Date of Birth: ${player.dob}</p>
    <p>Birthplace: ${player.birthplace}</p>
    <p>Career Description: ${player.career_description}</p>
    <p>Matches: ${player.matches}</p>
    <p>Scores: ${player.scores}</p>
    <p>Fifties: ${player.fifties}</p>
    <p>Centuries: ${player.centuries}</p>
    <p>Wickets: ${player.wickets}</p>
    <p>Average: ${player.average}</p>
    `;

        playerList.appendChild(playerDiv);
    });
}

function editPlayer(player) {
    // Implement the edit functionality here
    // You can use the player object to pre-fill the form fields for editing
    console.log('Edit player:', player);
}