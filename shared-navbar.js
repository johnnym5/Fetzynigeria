/**
 * FETZY NIGERIA LIMITED - Shared Navigation Component
 * Standardizes the header and navigation across all pages.
 */

const PRIMARY_NAV_ITEMS = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "about", label: "About", href: "about.html" },
  { key: "services", label: "Services", href: "services.html" },
  { key: "projects", label: "Projects", href: "projects.html" },
  { key: "process", label: "Process", href: "process.html" },
];

const SECONDARY_NAV_ITEMS = [
  { key: "careers", label: "Careers", href: "careers.html" },
  { key: "resources", label: "Resources", href: "resources.html" },
  { key: "contact", label: "Contact", href: "contact.html" },
];

const EXTENDED_NAV_ITEMS = [
  { key: "company-profile", label: "Profile", href: "company-profile.html" },
  { key: "team", label: "Our Team", href: "team.html" },
  { key: "sustainability", label: "Sustainability", href: "sustainability.html" },
  { key: "why-choose-us", label: "Why Us", href: "why-choose-us.html" },
];

const SUPPORT_NAV_ITEMS = [
  { key: "legal", label: "Legal", href: "legal.html" },
  { key: "sitemap", label: "Sitemap", href: "sitemap.html" },
];

const CTA_ITEM = { label: "Get a Quote", href: "request-quote.html" };

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const currentPage = document.body?.dataset.page || "";
    const navRoot = document.body?.dataset.navRoot || "";
    const resolveHref = (href) => `${navRoot}${href}`;

    const getLinkClasses = (isActive, variant = "desktop") => {
        if (variant === "mobile") {
            return isActive
                ? "rounded-2xl border border-primary bg-primary/15 px-4 py-3 text-sm font-semibold text-primary"
                : "rounded-2xl border border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-slate-200";
        }
        if (variant === "utility") {
            return isActive
                ? "text-primary text-xs font-semibold uppercase tracking-[0.22em]"
                : "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-primary dark:text-slate-400";
        }
        return isActive
            ? "text-primary text-sm font-semibold"
            : "text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-200";
    };

    const renderLink = (item, variant = "desktop") => {
        const isActive = item.key === currentPage;
        return `<a href="${resolveHref(item.href)}" class="${getLinkClasses(isActive, variant)}" ${isActive ? 'aria-current="page"' : ''}>${item.label}</a>`;
    };

    const mobileSection = (title, items) => `
        <div class="space-y-3 rounded-3xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">${title}</p>
            <div class="grid grid-cols-2 gap-3">
                ${items.map((item) => renderLink(item, "mobile")).join("")}
            </div>
        </div>`;

    header.className = "sticky top-0 z-50 border-b border-primary/15 bg-background-light/90 backdrop-blur-md dark:bg-background-dark/90 transition-all duration-300";
    header.innerHTML = `
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div class="flex min-h-20 items-center justify-between gap-4 py-4">
                <!-- Logo -->
                <a href="${resolveHref('index.html')}" class="flex items-center gap-3 group" aria-label="Fetzy Nigeria home">
                    <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-background-dark shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined text-[24px]">architecture</span>
                    </span>
                    <span class="hidden sm:block">
                        <span class="block text-[0.65rem] font-black uppercase tracking-[0.4em] text-primary">Fetzy Nigeria</span>
                        <span class="block text-[0.75rem] font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Limited</span>
                    </span>
                </a>

                <!-- Desktop Navigation -->
                <nav class="hidden xl:flex items-center gap-8" aria-label="Primary navigation">
                    <div class="flex items-center gap-6">
                        ${PRIMARY_NAV_ITEMS.map(item => renderLink(item)).join("")}
                    </div>
                    <div class="h-6 w-px bg-primary/20"></div>
                    <div class="flex items-center gap-6">
                        ${SECONDARY_NAV_ITEMS.map(item => renderLink(item)).join("")}
                    </div>
                </nav>

                <!-- Actions -->
                <div class="flex items-center gap-4">
                    <nav class="hidden 2xl:flex items-center gap-6 mr-4" aria-label="Support navigation">
                        ${SUPPORT_NAV_ITEMS.map(item => renderLink(item, "utility")).join("")}
                    </nav>
                    <a href="${resolveHref(CTA_ITEM.href)}" class="hidden sm:inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-black text-background-dark transition-all hover:scale-[1.05] hover:shadow-lg hover:shadow-primary/20 active:scale-95">
                        ${CTA_ITEM.label}
                    </a>
                    
                    <!-- Mobile Toggle -->
                    <button type="button" class="inline-flex xl:hidden items-center justify-center rounded-2xl border border-primary/20 p-3 text-slate-700 transition-all hover:border-primary hover:text-primary dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40" data-nav-toggle aria-expanded="false" aria-controls="mobile-site-nav">
                        <span class="material-symbols-outlined" data-nav-icon>menu</span>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-site-nav" class="hidden border-t border-primary/10 py-6 xl:hidden animate-fade-in" aria-label="Mobile navigation">
                <div class="grid gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    ${mobileSection("Core Services", PRIMARY_NAV_ITEMS)}
                    ${mobileSection("About & Reach", SECONDARY_NAV_ITEMS)}
                    ${mobileSection("Company Details", EXTENDED_NAV_ITEMS)}
                    ${mobileSection("Legal & Sitemap", SUPPORT_NAV_ITEMS)}
                    <a href="${resolveHref(CTA_ITEM.href)}" class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-4 text-sm font-black text-background-dark transition-transform hover:scale-[1.01] active:scale-95">
                        ${CTA_ITEM.label}
                    </a>
                </div>
            </div>
        </div>
    `;

    const toggle = header.querySelector("[data-nav-toggle]");
    const mobileNav = header.querySelector("#mobile-site-nav");
    const icon = toggle?.querySelector("[data-nav-icon]");

    if (toggle && mobileNav && icon) {
        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isOpen));
            mobileNav.classList.toggle("hidden", isOpen);
            icon.textContent = isOpen ? "menu" : "close";
            document.body.classList.toggle("overflow-hidden", !isOpen);
        });

        // Close on link click
        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                toggle.setAttribute("aria-expanded", "false");
                mobileNav.classList.add("hidden");
                icon.textContent = "menu";
                document.body.classList.remove("overflow-hidden");
            });
        });
    }
});
