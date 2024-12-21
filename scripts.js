document.addEventListener('DOMContentLoaded', () => {
    const threadsContainer = document.getElementById('forum-threads');
    const form = document.getElementById('create-thread-form');

    // Mock data for initial threads
    const threads = [
        { title: "What's your favorite anime?", content: "Let's discuss your favorite anime here!" },
        { title: "Naruto or One Piece?", content: "Which one do you prefer and why?" },
    ];

    // Render Threads
    const renderThreads = () => {
        threadsContainer.innerHTML = "";
        threads.forEach(thread => {
            const threadDiv = document.createElement('div');
            threadDiv.className = 'thread-card';
            threadDiv.innerHTML = `
                <h2>${thread.title}</h2>
                <p>${thread.content}</p>
            `;
            threadsContainer.appendChild(threadDiv);
        });
    };

    renderThreads();

    // Add New Thread
    form.addEventListener('submit', event => {
        event.preventDefault();
        const title = document.getElementById('thread-title').value;
        const content = document.getElementById('thread-content').value;

        // Add thread to threads array
        threads.push({ title, content });
        renderThreads();

        // Clear form
        form.reset();
    });
});

function loadCSV() {
    const fileInput = document.getElementById('csv-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a CSV file!');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(event) {
        const csvData = event.target.result;
        parseCSV(csvData);
    };

    reader.readAsText(file);
}

function parseCSV(csv) {
    const rows = csv.split("\n");
    const animeList = [];

    // Skip the first row (header)
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(",");
        if (cells.length < 7) continue; // Skip empty or incomplete rows

        const anime = {
            name: cells[1].trim(),
            hairColor: cells[2].trim(),
            gender: cells[3].trim(),
            tags: cells[4].trim(),
            anime: cells[5].trim(),
            manga: cells[6].trim()
        };
        
        animeList.push(anime);
    }

    displayAnimeInfo(animeList);
}

function displayAnimeInfo(animeList) {
    const animeListContainer = document.getElementById('anime-list');
    animeListContainer.innerHTML = ''; // Clear previous results

    animeList.forEach(anime => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${anime.name}</strong><br>
            Hair Color: ${anime.hairColor}<br>
            Gender: ${anime.gender}<br>
            Tags: ${anime.tags}<br>
            Anime: ${anime.anime}<br>
            Manga: ${anime.manga}
        `;
        animeListContainer.appendChild(listItem);
    });
}
