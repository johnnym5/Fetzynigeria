const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const CORRECT_PHONE = '0707 7776125';
const TEL_URI = '07077776125';
const CORRECT_EMAIL = 'info@fetzynigeria.org';

let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let hasChanges = false;

    // Replace new phone pattern
    if (content.includes('08119111727')) {
        content = content.replace(/08119111727/g, CORRECT_PHONE);
        hasChanges = true;
    }
    
    // Replace tel link
    if (content.includes('tel:08119111727')) {
        content = content.replace(/tel:08119111727/g, `tel:${TEL_URI}`);
        hasChanges = true;
    }

    // Replace new email pattern (case insensitive)
    if (content.match(/FETZYLIMITED@GMAIL\.COM/i)) {
        content = content.replace(/FETZYLIMITED@GMAIL\.COM/gi, CORRECT_EMAIL);
        // Also fix mailto links
        content = content.replace(/mailto:FETZYLIMITED@GMAIL\.COM/gi, `mailto:${CORRECT_EMAIL}`);
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(path.join(dir, file), content);
        changedFiles++;
        console.log(`[PATCH] Updated phone/email in ${file}`);
    }
});

console.log(`Successfully patched ${changedFiles} files with the correct phone number and email.`);
