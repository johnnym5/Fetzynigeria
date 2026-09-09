const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const VALID_PAGES = new Set(files);
const CORRECT_DOMAIN = 'fetzynigerialimited.org';
const OLD_DOMAIN = 'fetzynigeria.com';

let totalErrors = 0;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let hasChanges = false;
    
    // 1. Domain replacements (.com -> .org)
    if (content.includes(OLD_DOMAIN)) {
        content = content.replace(new RegExp(OLD_DOMAIN, 'gi'), CORRECT_DOMAIN);
        hasChanges = true;
    }

    // 2. Automated Link Validation
    // Extract all hrefs
    const hrefRegex = /href="([^"]+)"/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        let link = match[1];
        
        // Skip external links, tel:, mailto:
        if (link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:') || link.startsWith('#') || link.startsWith('javascript:')) {
            continue;
        }

        // Check if local file exists
        let targetFile = link.split('#')[0].split('?')[0]; // Remove hash or query params
        if (targetFile && !VALID_PAGES.has(targetFile) && !fs.existsSync(path.join(dir, targetFile))) {
            console.error(`[ERROR] Broken link in ${file}: -> ${link}`);
            totalErrors++;
        }
    }

    if (hasChanges) {
        fs.writeFileSync(path.join(dir, file), content);
        console.log(`[UPDATED] Applied fixes to ${file}`);
    }
});

if (totalErrors === 0) {
    console.log('\nSUCCESS: All internal links are valid.');
} else {
    console.log(`\nFound ${totalErrors} broken links.`);
}
