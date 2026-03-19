const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const VALID_PAGES = new Set(files);
const CORRECT_DOMAIN = 'fetzynigeria.org';
const CORRECT_EMAIL = 'info@fetzynigeria.org';
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
    
    // 2. Global "Get a Quote" / Contact button fixing
    // Often these are <button> or <a> tags with text like "Get a Quote", "Contact", "Contact Us"
    // that don't have proper hrefs or onClick events.
    
    // Replace <button>...</button> that says "Get a Quote" or "Contact" with <a href="contact.html">...</a>
    // We have to be careful not to break form submit buttons.
    const buttonRegex = /<button([^>]*)>((?:(?!<\/button>).)*?(Get a Quote|Contact Us|Contact)[^<]*)<\/button>/gis;
    content = content.replace(buttonRegex, (match, attrs, innerText) => {
        // Don't replace form submit buttons
        if (attrs.includes('type="submit"')) return match;
        hasChanges = true;
        return `<a href="contact.html" ${attrs}>${innerText}</a>`;
    });
    
    // Replace "Learn More" or "View all services" with links pointing to services.html if they don't have one
    const learnMoreRegex = /<button([^>]*)>((?:(?!<\/button>).)*?(Learn More|Explore|View all)[^<]*)<\/button>/gis;
    content = content.replace(learnMoreRegex, (match, attrs, innerText) => {
        hasChanges = true;
        return `<a href="services.html" ${attrs}>${innerText}</a>`;
    });

    // Replace empty or hash hrefs in anchor tags that have obvious text
    const emptyAnchors = /<a([^>]*href="[#]*"[^>]*)>((?:(?!<\/a>).)*?(About|Services|Projects|Contact|Home|Careers|Process|Sitemap)[^<]*)<\/a>/gis;
    content = content.replace(emptyAnchors, (match, attrs, innerText) => {
        let dest = 'index.html';
        const textLower = innerText.toLowerCase();
        if (textLower.includes('about')) dest = 'about.html';
        else if (textLower.includes('service')) dest = 'services.html';
        else if (textLower.includes('project')) dest = 'projects.html';
        else if (textLower.includes('contact') || textLower.includes('quote')) dest = 'contact.html';
        else if (textLower.includes('career')) dest = 'careers.html';
        else if (textLower.includes('process')) dest = 'process.html';
        else if (textLower.includes('sitemap')) dest = 'sitemap.html';
        
        hasChanges = true;
        return match.replace(/href="[#]*"/, `href="${dest}"`);
    });

    // 3. Automated Link Validation
    // Extract all hrefs
    const hrefRegex = /href="([^"]+)"/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        let link = match[1];
        
        // Skip external links, tel:, mailto:
        if (link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:') || link.startsWith('#')) {
            continue;
        }

        // Check if local file exists
        let targetFile = link.split('#')[0].split('?')[0]; // Remove hash or query params
        if (targetFile && !VALID_PAGES.has(targetFile)) {
            console.error(`[ERROR] Broken link in ${file}: -> ${link}`);
            totalErrors++;
            
            // Auto-patch: if it's broken, point to index.html and log it.
            console.log(`[FIX] Patching broken link ${link} to index.html`);
            content = content.replace(new RegExp(`href="${link}"`, 'g'), 'href="index.html"');
            hasChanges = true;
        }
    }

    if (hasChanges) {
        fs.writeFileSync(path.join(dir, file), content);
        console.log(`[UPDATED] Applied fixes to ${file}`);
    }
});

if (totalErrors === 0) {
    console.log('\nSUCCESS: All internal links are valid. Domain updated to fetzynigeria.org.');
} else {
    console.log(`\nFixed ${totalErrors} broken links automatically.`);
}
