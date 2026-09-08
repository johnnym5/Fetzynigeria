/**
 * FETZY NIGERIA LIMITED - Shared Footer Component
 * Standardizes the footer across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const navRoot = document.body?.dataset.navRoot || "";
    const resolveHref = (href) => `${navRoot}${href}`;

    footer.className = "border-t border-primary/15 bg-background-dark text-slate-400 py-16 px-6 relative z-30";
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                <!-- Brand & Company Info -->
                <div class="lg:col-span-2 space-y-6">
                    <a href="${resolveHref('index.html')}" class="flex items-center gap-3 group" aria-label="Fetzy Nigeria home">
                        <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-background-dark shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                            <span class="material-symbols-outlined text-[24px]">architecture</span>
                        </span>
                        <div>
                            <span class="block text-[0.65rem] font-black uppercase tracking-[0.4em] text-primary">Fetzy Nigeria</span>
                            <span class="block text-[0.75rem] font-bold text-white uppercase tracking-tighter">Limited</span>
                        </div>
                    </a>
                    <p class="text-sm text-slate-400 leading-relaxed max-w-sm font-light">
                        Building excellence, delivered on time. Duly incorporated in Nigeria (RC 1115975) offering world-class construction, road infrastructure, real estate, and project contracting solutions.
                    </p>
                    <div class="text-xs text-slate-500 space-y-1 font-mono">
                        <p><strong class="text-slate-300 font-sans">RC Number:</strong> 1115975</p>
                        <p><strong class="text-slate-300 font-sans">Incorporated:</strong> 21 May 2013</p>
                        <p><strong class="text-slate-300 font-sans">Headquarters:</strong> Suite 209B, Samfa Plaza, Ndola Crescent, Wuse Zone 5, Abuja FCT, Nigeria</p>
                    </div>
                </div>

                <!-- Navigation Columns -->
                <div>
                    <h3 class="text-xs font-black uppercase tracking-[0.25em] text-primary mb-6">Core Services</h3>
                    <ul class="space-y-3 text-sm font-medium">
                        <li><a href="${resolveHref('services.html')}" class="hover:text-primary transition-colors">Building Construction</a></li>
                        <li><a href="${resolveHref('services.html')}" class="hover:text-primary transition-colors">Road Infrastructure</a></li>
                        <li><a href="${resolveHref('services.html')}" class="hover:text-primary transition-colors">Real Estate Development</a></li>
                        <li><a href="${resolveHref('services.html')}" class="hover:text-primary transition-colors">General Procurement</a></li>
                        <li><a href="${resolveHref('services.html')}" class="hover:text-primary transition-colors">Project Management</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xs font-black uppercase tracking-[0.25em] text-primary mb-6">Company</h3>
                    <ul class="space-y-3 text-sm font-medium">
                        <li><a href="${resolveHref('about.html')}" class="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="${resolveHref('company-profile.html')}" class="hover:text-primary transition-colors">Company Profile</a></li>
                        <li><a href="${resolveHref('team.html')}" class="hover:text-primary transition-colors">Leadership Team</a></li>
                        <li><a href="${resolveHref('projects.html')}" class="hover:text-primary transition-colors">Projects Portfolio</a></li>
                        <li><a href="${resolveHref('process.html')}" class="hover:text-primary transition-colors">Our Process</a></li>
                        <li><a href="${resolveHref('careers.html')}" class="hover:text-primary transition-colors">Careers</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xs font-black uppercase tracking-[0.25em] text-primary mb-6">Connect & Legal</h3>
                    <ul class="space-y-3 text-sm font-medium">
                        <li><a href="${resolveHref('contact.html')}" class="hover:text-primary transition-colors">Contact Us</a></li>
                        <li><a href="${resolveHref('request-quote.html')}" class="hover:text-primary transition-colors">Request a Quote</a></li>
                        <li><a href="${resolveHref('consultation.html')}" class="hover:text-primary transition-colors">Book Consultation</a></li>
                        <li><a href="${resolveHref('privacy-policy.html')}" class="hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="${resolveHref('terms-of-service.html')}" class="hover:text-primary transition-colors">Terms of Service</a></li>
                        <li><a href="${resolveHref('sitemap.html')}" class="hover:text-primary transition-colors">Sitemap</a></li>
                    </ul>
                </div>
            </div>

            <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>&copy; ${new Date().getFullYear()} FETZY NIGERIA LIMITED. All rights reserved.</p>
                <div class="flex items-center gap-6">
                    <a href="mailto:FETZYLIMITED@GMAIL.COM" class="hover:text-primary transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">mail</span> FETZYLIMITED@GMAIL.COM
                    </a>
                    <a href="tel:08119111727" class="hover:text-primary transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">call</span> 08119111727
                    </a>
                </div>
            </div>
        </div>
    `;
});
