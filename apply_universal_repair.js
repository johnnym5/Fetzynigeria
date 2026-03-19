const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const CORRECT_ADDRESS = 'Suite 209B, Samfa Plaza, Ndola Crescent, Wuse Zone 5, Abuja, Nigeria.';
const CORRECT_PHONE = '0707 7776125';
const TEL_URI = '07077776125';

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Universal Address Fix (Search for common address patterns or keywords)
    content = content.replace(/12 Admiralty Way, Lekki Phase 1,.*?Nigeria\.?/gi, CORRECT_ADDRESS);
    content = content.replace(/Plot 1234, Wuse Zone 5,.*?Nigeria\.?/gi, CORRECT_ADDRESS);
    content = content.replace(/Lagos State, Nigeria/gi, 'Abuja, Nigeria');

    // 2. Universal Phone Fix
    content = content.replace(/\+234 \(0\) 800 123 4567/g, CORRECT_PHONE);
    content = content.replace(/\+234 \(0\) 900 765 4321/g, CORRECT_PHONE);
    content = content.replace(/\+?234\s?\(?0?\)?\s?800[- ]?FETZY[- ]?[A-Z]*/gi, CORRECT_PHONE);
    content = content.replace(/tel:[^"']+/gi, 'tel:' + TEL_URI);

    // 3. Navigation Link Fix (Smart replacement only if it's a Nav Link)
    // We target common Nav structures or specific link text
    const navItems = [
        { text: 'Home', href: 'index.html' },
        { text: 'About', href: 'about.html' },
        { text: 'Services', href: 'services.html' },
        { text: 'Projects', href: 'projects.html' },
        { text: 'Contact', href: 'contact.html' },
        { text: 'Careers', href: 'careers.html' },
        { text: 'Process', href: 'process.html' },
        { text: 'Terms', href: 'legal.html' },
        { text: 'Legal', href: 'legal.html' },
        { text: 'Privacy', href: 'legal.html' },
        { text: 'Sitemap', href: 'sitemap.html' }
    ];

    navItems.forEach(item => {
        // Find href="index.html" followed by the text (within some range) and replace it
        // This is a bit risky but we can target the common pattern from the generated files
        let regex = new RegExp('href="index\\.html"([^>]*>\\s*' + item.text + ')', 'gi');
        content = content.replace(regex, 'href="' + item.href + '"$1');
        
        // Also catch button/link text that might have null href
        let emptyRegex = new RegExp('href="#"([^>]*>\\s*' + item.text + ')', 'gi');
        content = content.replace(emptyRegex, 'href="' + item.href + '"$1');
    });

    // 4. Schema Phone Number Fix
    content = content.replace(/"telephone":\s*"[^"]*"/gi, '"telephone": "' + CORRECT_PHONE + '"');

    fs.writeFileSync(path.join(dir, file), content);
});

console.log('Processed ' + files.length + ' files with Universal Repair logic.');
