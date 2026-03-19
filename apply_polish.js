const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const NEW_PHONE = '0707 7776125';

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Change phone number (trying various patterns)
    content = content.replace(/\+?234\s?\(?0?\)?\s?800-FETZY-NG/gi, NEW_PHONE);
    content = content.replace(/\b\d{4}\s\d{3}\s\d{4}\b/g, NEW_PHONE);
    content = content.replace(/\b0707\s7776125\b/g, NEW_PHONE); // In case it was already there
    // Brute force catch for structural phone patterns if any
    content = content.replace(/tel:[^"]+/gi, 'tel:' + NEW_PHONE.replace(/\s/g, ''));
    
    // 2. Fix navigation links to point to local files
    // Header/Footer mappings
    content = content.replace(/href="[^"]*(#|index[^"]*)"/gi, 'href="index.html"');
    content = content.replace(/href="[^"]*about[^"]*"/gi, 'href="about.html"');
    content = content.replace(/href="[^"]*services[^"]*"/gi, 'href="services.html"');
    content = content.replace(/href="[^"]*projects[^"]*"/gi, 'href="projects.html"');
    content = content.replace(/href="[^"]*contact[^"]*"/gi, 'href="contact.html"');
    content = content.replace(/href="[^"]*careers[^"]*"/gi, 'href="careers.html"');
    content = content.replace(/href="[^"]*process[^"]*"/gi, 'href="process.html"');
    content = content.replace(/href="[^"]*legal[^"]*"/gi, 'href="legal.html"');
    content = content.replace(/href="[^"]*sitemap[^"]*"/gi, 'href="sitemap.html"');

    // 3. SEO Tags
    if (!content.includes('<meta name="description"')) {
        let seoTags = `
    <meta name="description" content="Fetzy Nigeria Limited - Building Excellence across Nigeria. Leading engineering and construction services.">
    <meta name="keywords" content="Fetzy, Construction, Nigeria, Engineering, Building, Roads">
    <meta property="og:title" content="Fetzy Nigeria Limited | Building Excellence">
    <meta property="og:description" content="Premier indigenous engineering partner.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>`;
        content = content.replace('</head>', seoTags);
    }

    fs.writeFileSync(path.join(dir, file), content);
});

console.log('Processed ' + files.length + ' files successfully for SEO, Navigation, and Phone updates.');
