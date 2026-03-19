const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/Johnmary/.gemini/antigravity/brain/21b75fd3-6dad-417c-8ba6-a5af5c933f34/.system_generated/steps/30/output.txt', 'utf8'));
let selected = {};
data.screens.forEach(s => {
    if (s.deviceType === 'DESKTOP') {
        let t = s.title.toLowerCase();
        let score = t.includes('glassmorphic') ? 3 : (t.includes('liquid') ? 2 : 1);
        let cat = null;
        if (t.includes('detailed services')) cat = 'detailed_services';
        else if (t.includes('services')) cat = 'services';
        else if (t.includes('detailed projects')) cat = 'detailed_projects';
        else if (t.includes('projects')) cat = 'projects';
        else if (t.includes('about')) cat = 'about';
        else if (t.includes('contact')) cat = 'contact';
        else if (t.includes('home')) cat = 'home';
        else if (t.includes('corporate') || t.includes('excellence')) cat = 'corporate';
        
        if (cat) {
            if (!selected[cat] || score > selected[cat].score) {
                selected[cat] = { id: s.name.split('/').pop(), title: s.title, score };
            }
        }
    }
});
console.log(JSON.stringify(selected, null, 2));
