document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(playerForm);
        const formDataObject = {};
        for (let [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }

        // Use the "playerId" to specify the player you want to edit
        const playerId = formDataObject.playerId;

        fetch(`/players/${playerId}`, { // Replace with the correct endpoint
            method: 'PUT', // Use PUT or PATCH to update the existing player data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from the server:', data);
            clearFormFields();
        })
        .catch(error => console.error('Error updating player data:', error));
    });
});


function fetchPlayerList() {
    const searchInput = document.getElementById('search').value;
    fetch(`/search?name=${searchInput}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data);
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

    results.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-info';

        // Display player image, name, and country
        const playerInfo = `
            <div class="player-info-container">
                <img class="player-image" src="${player.photo}" alt="${player.name}">
                <div>
                    <h2>${player.name}</h2>
                    <p>Personal Information</p>
                    <p>Date of Birth: ${player.dob}</p>
                    <p>Birthplace: ${player.birthplace}</p>
                </div>
            </div>
        `;

        // Display career information
        const careerInfo = `
            <p>Career Information</p>
            <p>Career Description: ${player.career_description}</p>
            <p>Number of Matches: ${player.matches}</p>
            <p>Scores: ${player.scores}</p>
            <p>Fifties: ${player.fifties}</p>
            <p>Centuries: ${player.centuries}</p>
            <p>Wickets: ${player.wickets}</p>
            <p>Average: ${player.average}</p>
        `;

        playerDiv.innerHTML = playerInfo + careerInfo;

        // Create the "Edit Player" button
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit Player';

        // Add an event listener to the "Edit Player" button
        editButton.addEventListener('click', function () {
            editPlayer(player);
        });

        // Append the "Edit Player" button to the playerDiv
        playerDiv.appendChild(editButton);

        playerList.appendChild(playerDiv);
    });
}


function editPlayer(player) {
    // Populate the form fields with the player's data for editing
    document.getElementById('playerId').value = player.id; // Assuming "id" is the unique identifier
    document.getElementById('name').value = player.name;
    document.getElementById('dob').value = player.dob.split('T')[0]; // Display date without time
    document.getElementById('photo').value = player.photo;
    document.getElementById('birthplace').value = player.birthplace;
    document.getElementById('career-description').value = player.career_description;
    document.getElementById('matches').value = player.matches;
    document.getElementById('scores').value = player.scores;
    document.getElementById('fifties').value = player.fifties;
    document.getElementById('centuries').value = player.centuries;
    document.getElementById('wickets').value = player.wickets;
    document.getElementById('average').value = player.average;
}

