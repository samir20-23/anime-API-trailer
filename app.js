/**
 * app.js
 * Handles fetching APIs from api.json, rendering them to the DOM, and driving search functionality
 */

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const apiGrid = document.getElementById('api-grid');
    const stats = document.getElementById('stats');
    
    let allApis = [];

    // 1. Fetch data from api.json
    try {
        const response = await fetch('./api.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Ensure data formatting is robust
        if (data && data.apis && Array.isArray(data.apis)) {
            allApis = data.apis;
        } else {
            throw new Error('api.json does not contain an "apis" array.');
        }

        // Initialize view
        updateStats(allApis.length);
        renderApis(allApis);

    } catch (error) {
        console.error('Error loading APIs:', error);
        stats.innerText = 'Failed to load APIs. Please ensure api.json exists.';
    }

    // 2. Real-time Search Handler
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query === '') {
            renderApis(allApis);
            updateStats(allApis.length);
            return;
        }

        const filteredApis = allApis.filter(api => {
            const apiName = (api.name || '').toLowerCase();
            const apiUrl = (api.url || '').toLowerCase();
            return apiName.includes(query) || apiUrl.includes(query);
        });

        renderApis(filteredApis);
        updateStats(filteredApis.length);
    });

    // --- Helper Functions ---
    
    function renderApis(apis) {
        // Clear current grid
        apiGrid.innerHTML = '';

        if (apis.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerText = 'No APIs found matching your search. 😭';
            apiGrid.appendChild(noResults);
            return;
        }

        // We can optimize rendering by limiting results or using a document fragment
        // For ~500 items, rendering all at once is generally fine, but fragment is safer.
        const fragment = document.createDocumentFragment();

        apis.forEach((api, index) => {
            const card = document.createElement('a');
            card.href = api.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = 'api-card glassmorphism fade-in';
            
            // Stagger animations up to 30 items for performance
            if (index < 30) {
                card.style.animationDelay = `${index * 0.03}s`;
            }

            const headerWrapper = document.createElement('div');
            
            const title = document.createElement('h3');
            title.className = 'api-name';
            title.innerText = api.name || 'Unknown API';
            
            const urlDiv = document.createElement('div');
            urlDiv.className = 'api-url';
            urlDiv.innerText = api.url || 'No URL';

            headerWrapper.appendChild(title);
            card.appendChild(headerWrapper);
            card.appendChild(urlDiv);
            
            fragment.appendChild(card);
        });

        apiGrid.appendChild(fragment);
    }

    function updateStats(count) {
        if (count === allApis.length) {
            stats.innerText = `Displaying all ${count} APIs`;
        } else {
            stats.innerText = `Found ${count} matching APIs`;
        }
    }
});
