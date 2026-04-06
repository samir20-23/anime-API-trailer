const fs = require('fs');
const path = require('path');

const filesToParse = [
  'apis/README.md',
  'public-apis/README.md',
  'someapis/some.md'
];

const apiSet = new Set();
const apis = [];

function extractApisFromFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // Look for markdown links: [Name](URL)
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1].trim();
    const url = match[2].trim();

    // Skip common non-API URLs
    if (
      url.includes('github.com/settings') ||
      url.includes('github.com/new') ||
      url.includes('travis-ci.org') ||
      url.includes('img.shields.io') ||
      url.includes('license') ||
      url.includes('contributing') ||
      url.length < 8
    ) {
      continue;
    }

    if (!apiSet.has(url)) {
      apiSet.add(url);
      apis.push({ name, url });
    }
  }
}

filesToParse.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  extractApisFromFile(fullPath);
});

fs.writeFileSync('api.json', JSON.stringify({ apis: apis }, null, 2));
console.log(`Successfully created api.json with ${apis.length} APIs.`);
