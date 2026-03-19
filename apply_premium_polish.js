const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Johnmary/Downloads/ANTIGRAVITY/FETZY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const PREMIUM_SCRIPT = `
<!-- PREMIUM FRONTEND POLISH INJECTIONS -->
<style>
    html { scroll-behavior: smooth; }
    .premium-hide { opacity: 0; transform: translateY(40px); transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
    .premium-show { opacity: 1; transform: translateY(0); }
    #premium-toast { transform: translateY(150%); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    #premium-toast.show { transform: translateY(0); }
</style>
<script>
document.addEventListener('DOMContentLoaded', () => {
    // 1. Premium Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('premium-show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Animate all major sections that aren't the intro header
    document.querySelectorAll('section').forEach((el, index) => {
        if (index > 0) { // skip the immediate hero section so it doesn't pop in weirdly
            el.classList.add('premium-hide');
            observer.observe(el);
        }
    });

    // 2. Functional Mobile Menu Overlay
    const menuBtns = document.querySelectorAll('button.md\\\\:hidden, button[class*="md:hidden"]');
    if(menuBtns.length > 0) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 bg-background-dark/98 backdrop-blur-2xl z-[100] flex flex-col items-center justify-center gap-8 translate-y-[-100%] transition-transform duration-500';
        mobileMenu.innerHTML = \`
            <button class="absolute top-8 right-8 text-white p-2 hover:text-primary transition-colors" id="close-menu">
                <span class="material-symbols-outlined text-4xl">close</span>
            </button>
            <a href="index.html" class="text-4xl font-black text-white hover:text-primary transition-colors">Home</a>
            <a href="about.html" class="text-4xl font-black text-white hover:text-primary transition-colors">About</a>
            <a href="services.html" class="text-4xl font-black text-white hover:text-primary transition-colors">Services</a>
            <a href="projects.html" class="text-4xl font-black text-white hover:text-primary transition-colors">Projects</a>
            <a href="contact.html" class="text-4xl font-black text-white hover:text-primary transition-colors">Contact</a>
            <a href="tel:07077776125" class="mt-8 bg-primary text-background-dark px-8 py-3 rounded-full font-bold shadow-lg">Call Us</a>
        \`;
        document.body.appendChild(mobileMenu);
        
        menuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-y-[-100%]');
                document.body.style.overflow = 'hidden';
            });
        });
        
        document.getElementById('close-menu').addEventListener('click', () => {
            mobileMenu.classList.add('translate-y-[-100%]');
            document.body.style.overflow = '';
        });
    }

    // 3. Premium Contact Form Handling (Toast Notification)
    // Create Toast Element
    const toast = document.createElement('div');
    toast.id = 'premium-toast';
    toast.className = 'fixed bottom-8 right-8 bg-background-dark text-white px-6 py-4 rounded-xl shadow-2xl border border-primary/30 flex items-center gap-4 z-[100]';
    toast.innerHTML = \`
        <span class="material-symbols-outlined text-primary text-2xl">check_circle</span>
        <div>
            <h4 class="font-bold">Message Sent!</h4>
            <p class="text-sm text-slate-400">Our team will contact you shortly.</p>
        </div>
    \`;
    document.body.appendChild(toast);

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // override any existing alert implementations
        form.removeAttribute('onsubmit');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show toast
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
            form.reset();
        });
    });
});
</script>
`;

let applyCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let hasChanges = false;

    // 1. Add lazy loading to images that don't have it
    if (content.match(/<img([^>]*)>/gi)) {
        content = content.replace(/<img([^>]*)(?<!loading="lazy"|loading='lazy')>/gi, (match, p1) => {
            if (p1.includes('loading=')) return match; // skip if it has eager or something else
            hasChanges = true;
            return `<img loading="lazy"${p1}>`;
        });
    }

    // 2. Clear old onsubmit alerts from forms (crucial for contact.html)
    if (content.includes('onsubmit="event.preventDefault();')) {
        content = content.replace(/onsubmit="event\.preventDefault\(\);[^"]*alert[^"]*"/g, '');
        hasChanges = true;
    }

    // 3. Inject Premium Script Before </body>
    if (!content.includes('PREMIUM FRONTEND POLISH INJECTIONS') && content.includes('</body>')) {
        content = content.replace('</body>', `\n${PREMIUM_SCRIPT}\n</body>`);
        hasChanges = true;
    }

    if (hasChanges) {
        fs.writeFileSync(path.join(dir, file), content);
        applyCount++;
        console.log(`[PREMIUM] Applied upgrades to ${file}`);
    }
});

console.log(`\nSuccessfully applied senior-level front-end refinement to ${applyCount} pages.`);
