document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(playerForm);

        const formDataObject = {};
        for (let [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }

        const formDataJSON = JSON.stringify(formDataObject);

        fetch('/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from the server:', data);
                clearFormFields();
            })
            .catch(error => console.error('Error saving player data:', error));
    });

    function clearFormFields() {
        playerForm.reset();
    }
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
    playerList.innerHTML = ''; // Clear the previous results

    results.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-info';

        // Display player image, name, and country
        const playerInfo = `
    <img src="${player.photo}" alt="${player.name}">
    <h2>${player.name}</h2>
    <p>Personal Information</p>
    <p>Date of Birth: ${player.dob}</p>
    <p>Birthplace: ${player.birthplace}</p>
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
        playerList.appendChild(playerDiv);
    });
}





function editPlayer(player) {
    console.log('Edit player:', player);
}
