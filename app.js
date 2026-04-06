/**
 * app.js - Premium API Directory with Universal Data Extractor
 */

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const apiGrid = document.getElementById('api-grid');
    const stats = document.getElementById('stats');
    
    // Modal Elements
    const modal = document.getElementById('apiModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalLoading = document.getElementById('modalLoading');
    const modalResults = document.getElementById('modalResults');
    const modalSourceLink = document.getElementById('modalSourceLink');
    
    let allApis = [];

    // 1. Fetch data from api.json
    try {
        const response = await fetch('./api.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data && data.apis && Array.isArray(data.apis)) {
            allApis = data.apis;
        } else {
            throw new Error('api.json does not contain an "apis" array.');
        }

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

    // Modal Close Logic
    closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    // --- Helper Functions ---
    
    function renderApis(apis) {
        apiGrid.innerHTML = '';
        if (apis.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerText = 'No APIs found matching your search. 😭';
            apiGrid.appendChild(noResults);
            return;
        }

        const fragment = document.createDocumentFragment();

        apis.forEach((api, index) => {
            const card = document.createElement('div');
            card.className = 'api-card glassmorphism fade-in';
            if (index < 30) card.style.animationDelay = `${index * 0.03}s`;

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
            
            // Handle Click - Open API Modal and Trigger Extractor
            card.addEventListener('click', () => {
                openApiModal(api);
            });

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

    // --- UNIVERSAL DATA EXTRACTOR LOGIC ---

    async function openApiModal(api) {
        // Prepare Modal UI
        modalTitle.innerText = `Analyzing: ${api.name}`;
        modalSourceLink.href = api.url;
        modalResults.innerHTML = '';
        modalLoading.style.display = 'block';
        modal.style.display = 'flex';

        try {
            // Append search query to URL if user is searching, to make it smarter
            let searchUrl = api.url;
            const currentSearch = searchInput.value.trim();
            if (currentSearch && !searchUrl.includes('?')) {
                // simple heuristic for some apis, though many might just 404. We'll stick to raw URL or with query.
               // We will try raw URL first for simplicity, or we can try fetching. 
            }

            const response = await fetch(api.url, {
                method: 'GET',
                // Cannot force no-cors because we need to read the body. If it fails, we catch the error.
                headers: { 'Accept': 'application/json, text/html' }
            });

            const contentType = response.headers.get('content-type') || '';
            const data = contentType.includes('application/json') ? await response.json() : await response.text();
            
            modalLoading.style.display = 'none';
            
            // Extract content
            const extracted = extractMediaAndText(data, contentType);
            renderExtractedData(extracted);

        } catch (error) {
            console.error('API Fetch failed. Likely a CORS restriction or invalid endpoint:', error);
            modalLoading.style.display = 'none';
            
            // Fallback: If we can't fetch it due to browser security, let the user know.
            modalResults.innerHTML = `
                <div class="text-block" style="border-color: #ef4444;">
                    <strong>Browser Security Notice (CORS):</strong><br>
                    We tried to extract data dynamically, but this API server blocked direct requests from the browser. 
                    This is normal for public APIs that require a backend server. 
                    <br><br>You can click "Visit Official API Details" below to view it directly.
                </div>
            `;
        }
    }

    // Recursively scans an object for specific string types
    function extractMediaAndText(data, contentType) {
        const results = { images: [], videos: [], texts: [] };

        if (contentType.includes('application/json')) {
            // JSON Parser
            function traverse(node) {
                if (!node) return;
                if (typeof node === 'string') {
                    const str = node.trim();
                    // Image Check
                    if (/\.(jpg|jpeg|png|gif|webp)(\?|$)/i.test(str)) {
                        results.images.push(str);
                    } 
                    // Video Check
                    else if (/\.(mp4|webm)(\?|$)/i.test(str) || str.includes('youtube.com/embed') || str.includes('player.vimeo')) {
                        results.videos.push(str);
                    } 
                    // Text Check (skip very long bas64 or very short words)
                    else if (str.length > 30 && str.length < 500 && !str.startsWith('http')) {
                        results.texts.push(str);
                    }
                } else if (Array.isArray(node)) {
                    node.forEach(traverse);
                } else if (typeof node === 'object') {
                    Object.values(node).forEach(traverse);
                }
            }
            traverse(data);

        } else if (contentType.includes('text/html')) {
            // HTML Parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            
            doc.querySelectorAll('img').forEach(img => {
                if (img.src && img.src.startsWith('http')) results.images.push(img.src);
            });
            doc.querySelectorAll('video source, iframe').forEach(vid => {
                if (vid.src && vid.src.startsWith('http')) results.videos.push(vid.src);
            });
            doc.querySelectorAll('p').forEach(p => {
                if (p.innerText && p.innerText.length > 30) results.texts.push(p.innerText);
            });
        }

        // Deduplicate
        results.images = [...new Set(results.images)];
        results.videos = [...new Set(results.videos)];
        results.texts = [...new Set(results.texts)];

        return results;
    }

    function renderExtractedData(extracted) {
        if (extracted.images.length === 0 && extracted.videos.length === 0 && extracted.texts.length === 0) {
            modalResults.innerHTML = '<p class="text-muted">No readable images, videos, or text could be extracted directly from this URL.</p>';
            return;
        }

        let html = '';

        if (extracted.images.length > 0) {
            html += `
                <div class="media-section">
                    <h3>🖼️ Found Images</h3>
                    <div class="media-grid">
                        ${extracted.images.slice(0, 10).map(src => `<img src="${src}" alt="Extracted Graphic" loading="lazy">`).join('')}
                    </div>
                </div>
            `;
        }

        if (extracted.videos.length > 0) {
            html += `
                <div class="media-section">
                    <h3>🎥 Found Videos</h3>
                    <div class="media-grid">
                        ${extracted.videos.slice(0, 4).map(src => `<video controls src="${src}"></video>`).join('')}
                    </div>
                </div>
            `;
        }

        if (extracted.texts.length > 0) {
            html += `
                <div class="media-section">
                    <h3>📝 Discovered Text</h3>
                    <div class="text-blocks">
                        ${extracted.texts.slice(0, 5).map(txt => `<div class="text-block">${txt}</div>`).join('')}
                    </div>
                </div>
            `;
        }

        modalResults.innerHTML = html;
    }
});
