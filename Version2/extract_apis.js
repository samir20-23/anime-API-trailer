const fs = require('fs');
const path = require('path');

function extractApis() {
  const somePath = path.join(__dirname, 'someapis/some.md');
  const readmePath = path.join(__dirname, 'apis/README.md');
  
  if (!fs.existsSync(somePath) || !fs.existsSync(readmePath)) {
    console.error("Missing files");
    return;
  }
  
  const someContent = fs.readFileSync(somePath, 'utf8');
  let apisToAdd = [];
  
  // 1. Manually check for OpenHolidays
  if (someContent.includes('OpenHolidays API')) {
    apisToAdd.push({
      category: 'Calendar',
      name: 'OpenHolidays API',
      url: 'https://openholidaysapi.org',
      description: 'Public holiday and school holiday data via an open REST API',
      auth: 'No',
      https: 'Yes',
      cors: 'Yes'
    });
  }

  // 2. Extract JSON part
  const match = someContent.match(/\{\s*"meta":\s*\{[\s\S]*\}\s*\}$/);
  let jsonStr = match ? match[0] : null;
  if (!jsonStr) {
    // try to find just the first JSON block for categories
    const idx = someContent.indexOf('{\n  "meta": {');
    if (idx !== -1) {
      jsonStr = someContent.slice(idx);
    }
  }

  if (jsonStr) {
    try {
      // Find the last closing brace and try to parse
      const lastBrace = jsonStr.lastIndexOf('}');
      if (lastBrace !== -1) {
        jsonStr = jsonStr.slice(0, lastBrace + 1);
      }
      
      const parsed = JSON.parse(jsonStr);
      if (parsed.categories) {
        parsed.categories.forEach(c => {
          c.apis.forEach(a => {
             apisToAdd.push({
               category: c.name,
               name: a.name,
               url: a.url,
               description: a.description || '',
               auth: a.auth === 'none' ? 'No' : a.auth,
               https: a.https ? 'Yes' : 'No',
               cors: a.cors === 'yes' ? 'Yes' : (a.cors || 'Unknown')
             });
          });
        });
      }
    } catch (e) {
      console.log("JSON parsing error, falling back to regex", e.message);
      // Fallback: extract objects inside "apis": [...]
      const items = [...jsonStr.matchAll(/\{\s*"name":\s*"([^"]+)",\s*"url":\s*"([^"]+)",\s*"description":\s*"([^"]+)"[^\}]*\}/g)];
      items.forEach(item => {
        apisToAdd.push({
          category: 'Development', // default if can't parse cleanly
          name: item[1],
          url: item[2],
          description: item[3],
          auth: 'No',
          https: 'Yes',
          cors: 'Unknown'
        });
      });
    }
  }

  const existingReadme = fs.readFileSync(readmePath, 'utf8');
  let newReadme = existingReadme;

  apisToAdd.forEach(api => {
    // Check if URL already exists
    if (existingReadme.includes(api.url)) {
      console.log(`Skipping existing API: ${api.name} (${api.url})`);
      return;
    }
    
    // Check if category exists
    let catHeader = `### ${api.category}`;
    if (!existingReadme.includes(catHeader)) {
      api.category = 'Development'; // fallback category
      catHeader = `### Development`;
    }
    
    // Create the markdown row
    const apiname = `[${api.name}](${api.url})`;
    const row = `| ${apiname} | ${api.description.replace(/\|/g, '')} | \`${api.auth}\` | ${api.https} | ${api.cors} |`;
    
    // Find where to insert it in the table
    // Let's just append it to the end of the category table
    const tableRegex = new RegExp(`(${catHeader}\\n[\\s\\S]*?\\|---\\|---\\|---\\|---\\|---\\|\\n)([\\s\\S]*?)(\\n\\n|\\*\\*\\[⬆)`);
    const match = newReadme.match(tableRegex);
    if (match) {
      let tableContent = match[2];
      // Insert our row at the end
      tableContent = tableContent.trimEnd() + '\n' + row + '\n';
      
      newReadme = newReadme.replace(match[0], match[1] + tableContent + match[3]);
      console.log(`Added API: ${api.name} to ${api.category}`);
    } else {
      console.log(`Could not find table for category: ${api.category}`);
    }
  });

  if (newReadme !== existingReadme) {
    fs.writeFileSync(readmePath, newReadme, 'utf8');
    console.log("Updated README.md");
  }
}

extractApis();
