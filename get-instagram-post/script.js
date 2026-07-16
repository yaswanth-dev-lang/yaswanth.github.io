const url = 'https://instagram120.p.rapidapi.com/api/instagram/posts';
const apiKey = '9692a95418msh5edbbfdfc59134fp1e97cejsnefd23d972bba'; // Replace with your actual key

document.getElementById('searchBtn').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value.trim();
    if (username) {
        fetchData(username);
    }
});

async function fetchData(username) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = 'Loading...';

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'instagram120.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            maxId: ''
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        // Extracting edges array based on your API response structure
        const edges = result?.result?.edges || [];
        displayImages(edges);
    } catch (error) {
        console.error("Fetch error:", error);
        gallery.innerHTML = 'Failed to fetch data.';
    }
}

function displayImages(edges) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear loading status or previous results

    if (edges.length === 0) {
        gallery.innerHTML = 'No posts found.';
        return;
    }

    edges.forEach(item => {
        const node = item.node;
        // Navigate through the candidate image array inside the node configuration
        const imageUrl = node?.image_versions2?.candidates?.[0]?.url;

        if (imageUrl) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('gallery-item');
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Instagram Post";
            
            itemElement.appendChild(img);
            gallery.appendChild(itemElement);
        }
    });
}