const NAV_ITEMS = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "about", label: "About", href: "about.html" },
  { key: "services", label: "Services", href: "services.html" },
  { key: "projects", label: "Projects", href: "projects.html" },
  { key: "process", label: "Process", href: "process.html" },
  { key: "careers", label: "Careers", href: "careers.html" },
  { key: "contact", label: "Contact", href: "contact.html" },
  { key: "legal", label: "Legal", href: "legal.html" },
  { key: "sitemap", label: "Sitemap", href: "sitemap.html" },
];

const currentPage = document.body.dataset.page || "";
const header = document.getElementById("site-header");

if (header) {
  const desktopLinks = NAV_ITEMS.slice(0, 7)
    .map((item) => {
      const active = item.key === currentPage;
      return `<a href="${item.href}" class="${active
        ? "text-primary"
        : "text-slate-700 dark:text-slate-200 hover:text-primary"} text-sm font-semibold transition-colors">${item.label}</a>`;
    })
    .join("");

  const mobileLinks = NAV_ITEMS.map((item) => {
    const active = item.key === currentPage;
    return `<a href="${item.href}" class="${active
      ? "bg-primary text-background-dark"
      : "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200 hover:bg-primary/10 hover:text-primary"} rounded-xl px-4 py-3 text-sm font-semibold transition-colors">${item.label}</a>`;
  }).join("");

  header.className = "sticky top-0 z-50 border-b border-primary/20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md";
  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div class="flex min-h-20 items-center justify-between gap-4 py-4">
        <a href="index.html" class="flex items-center gap-3 text-slate-900 dark:text-white">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background-dark shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-[22px]">architecture</span>
          </span>
          <span class="text-base sm:text-lg font-black uppercase tracking-[0.2em]">Fetzy Nigeria</span>
        </a>
        <nav class="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          ${desktopLinks}
        </nav>
        <div class="hidden sm:flex items-center gap-3">
          <a href="contact.html" class="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-background-dark transition-transform hover:scale-[1.02]">
            Get a Quote
          </a>
        </div>
        <button type="button" class="inline-flex lg:hidden items-center justify-center rounded-xl border border-primary/20 p-2 text-slate-700 transition-colors hover:border-primary hover:text-primary dark:text-slate-200" data-nav-toggle aria-expanded="false" aria-controls="mobile-site-nav" aria-label="Toggle navigation menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
      <div id="mobile-site-nav" class="hidden border-t border-primary/10 py-4 lg:hidden" aria-label="Mobile navigation">
        <div class="grid gap-3 sm:grid-cols-2">
          ${mobileLinks}
          <a href="contact.html" class="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-background-dark transition-transform hover:scale-[1.01]">
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  `;

  const toggle = header.querySelector('[data-nav-toggle]');
  const mobileNav = document.getElementById('mobile-site-nav');
  const icon = toggle?.querySelector('.material-symbols-outlined');

  if (toggle && mobileNav && icon) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('hidden', isOpen);
      icon.textContent = isOpen ? 'menu' : 'close';
    });
  }
}
