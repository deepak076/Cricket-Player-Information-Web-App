    // /public/js/script.js
    document.addEventListener('DOMContentLoaded', () => {
        const playerForm = document.getElementById('player-form');

        playerForm.addEventListener('submit', (e) => {
            e.preventDefault();
        
            const formData = new FormData(playerForm);
            const formDataObject = {};
            for (let [key, value] of formData.entries()) {
                formDataObject[key] = value;
            }
        
            // Assuming you have a playerId in your HTML with the value of the player's ID
            const playerId = document.getElementById('playerId').value;
        
            // Check if playerId exists, if so, send a PUT request to update the player's data
            if (playerId) {
                fetch(`/players/${playerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataObject),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Player data updated successfully
                            // You can handle this as needed, e.g., close the editing form.
        
                            // Clear the form fields
                            playerForm.reset();
                        } else {
                            console.error('Error updating player data:', data.error);
                        }
                    })
                    .catch(error => console.error('Error updating player data:', error));
            } else {
                // If playerId doesn't exist, it means you are creating a new player.
                // Send a POST request to create a new player.
                fetch('/players', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataObject),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Player data created successfully
        
                            // Clear the form fields
                            playerForm.reset();
        
                            // You can also optionally add code to close the form or show a success message.
                        } else {
                            console.error('Error creating player data:', data.error);
                        }
                    })
                    .catch(error => console.error('Error creating player data:', error));
            }
        });
    });




    function fetchPlayerList() {
        const searchField = document.getElementById('search');
        const searchValue = searchField.value.trim();

        // Check if the search field is not empty
        if (searchValue) {
            // Construct the search URL
            const searchURL = `/search?name=${searchValue}`;

            // Send a GET request to the search URL
            fetch(searchURL)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        displayPlayerResults(data.data); // Display the search results
                    } else {
                        console.error('Error searching for players:', data.error);
                    }
                })
                .catch(error => console.error('Error searching for players:', error));
        } else {
            // Clear the player list if the search field is empty
            const playerList = document.getElementById('player-list');
            playerList.innerHTML = '';
        }
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
        const playerId = player.id; // Get the player's ID

        // Construct the correct URL for the GET request
        const url = `/players/${playerId}`;

        // Fetch the player's existing data using a GET request
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Populate the form fields with the existing player's data
                    document.getElementById('playerId').value = player.id; // Assuming "id" is the unique identifier
                    document.getElementById('name').value = data.data.name;
                    document.getElementById('dob').value = data.data.dob.split('T')[0];
                    document.getElementById('photo').value = data.data.photo;
                    document.getElementById('birthplace').value = data.data.birthplace;
                    document.getElementById('career-description').value = data.data.career_description;
                    document.getElementById('matches').value = data.data.matches;
                    document.getElementById('scores').value = data.data.scores;
                    document.getElementById('fifties').value = data.data.fifties;
                    document.getElementById('centuries').value = data.data.centuries;
                    document.getElementById('wickets').value = data.data.wickets;
                    document.getElementById('average').value = data.data.average;
                } else {
                    console.error('Error fetching player data:', data.error);
                }
            })
            .catch(error => console.error('Error fetching player data:', error));
    }


