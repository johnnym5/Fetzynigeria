const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const NEW_PHONE = '0707 7776125';
const TEL_URI = '07077776125';

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Aggressive Phone Number replacement
    // Replace various placeholders and patterns
    content = content.replace(/\+?234\s?\(?0?\)?\s?800[- ]?FETZY[- ]?[A-Z]*/gi, NEW_PHONE);
    content = content.replace(/\b\d{4}\s\d{3}\s\d{4}\b/g, NEW_PHONE);
    content = content.replace(/\+234-800-FETZY/gi, NEW_PHONE);
    content = content.replace(/800 FETZY NIGERIA/gi, NEW_PHONE);
    
    // Replace tel: links
    content = content.replace(/tel:[^"']+/gi, 'tel:' + TEL_URI);
    
    // 2. Fix navigation links to point to local files
    content = content.replace(/href="[^"]*(#|index[^"]*)"/gi, 'href="index.html"');
    content = content.replace(/href="[^"]*about[^"]*"/gi, 'href="about.html"');
    content = content.replace(/href="[^"]*services[^"]*"/gi, 'href="services.html"');
    content = content.replace(/href="[^"]*projects[^"]*"/gi, 'href="projects.html"');
    content = content.replace(/href="[^"]*contact[^"]*"/gi, 'href="contact.html"');
    content = content.replace(/href="[^"]*careers[^"]*"/gi, 'href="careers.html"');
    content = content.replace(/href="[^"]*process[^"]*"/gi, 'href="process.html"');
    content = content.replace(/href="[^"]*legal[^"]*"/gi, 'href="legal.html"');
    content = content.replace(/href="[^"]*sitemap[^"]*"/gi, 'href="sitemap.html"');

    // 3. Ensure index is the root
    if (file === 'index.html') {
        content = content.replace(/href="index.html"/gi, 'href="index.html"');
    }

    fs.writeFileSync(path.join(dir, file), content);
});

console.log('Processed ' + files.length + ' files with aggressive phone and link logic.');
