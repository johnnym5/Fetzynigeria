const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (content.includes('href="#"')) {
        content = content.replace(/href="#"/g, 'href="index.html"');
        fs.writeFileSync(path.join(dir, file), content);
        console.log(`[LINK FIX] Removed href="#" from ${file}`);
    }
});
