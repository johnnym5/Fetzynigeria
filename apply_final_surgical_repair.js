const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const MASTER_PHONE = '0707 7776125';

let repairCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let hasChanges = false;

    // 1. Fix Phone Number Glitch (Double zero)
    if (content.includes('0707 777612500')) {
        content = content.replace(/0707 777612500/g, MASTER_PHONE);
        hasChanges = true;
    }

    // 2. Fix Services Card Symmetry (Remove col-span-2)
    if (file === 'services.html') {
        if (content.includes('lg:col-span-2')) {
            content = content.replace(/lg:col-span-2/g, '');
            hasChanges = true;
        }
        // Ensure description is flex-grow to push buttons to the bottom
        // This targets the specific p tag in service cards
        content = content.replace(/<p class="text-slate-400 text-sm leading-relaxed mb-8">/g, '<p class="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">');
    }

    // 3. Fix Icon Rendering Issues (Material Symbols Outlined)
    // Sometimes text-based icons need a specific 'fill' or 'wght' 
    // And we check for 'strategy' which might not be a valid standard symbol in some sets
    if (content.includes('strategy')) {
        content = content.replace(/>strategy</g, '>leaderboard<');
        hasChanges = true;
    }

    // Ensure the font link is consistent and robust across all pages
    const fontLink = '<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />';
    if (!content.includes('family=Material+Symbols+Outlined')) {
         // Should already be there, but added just in case
    } else {
        // Upgrade existing link to the more robust one if needed
        content = content.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined[^"]+"/g, fontLink);
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(path.join(dir, file), content);
        repairCount++;
        console.log(`[REPAIRED] Final polish in ${file}`);
    }
});

console.log(`\nFinal surgical repair completed for ${repairCount} pages.`);
