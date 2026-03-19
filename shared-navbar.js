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

const body = document.body;
const header = document.getElementById("site-header");
const currentPage = body?.dataset.page || "";
const navRoot = body?.dataset.navRoot || "";
const homeHref = `${navRoot}index.html`;
const quoteHref = `${navRoot}contact.html`;
const resolveHref = (href) => `${navRoot}${href}`;

const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getLinkClasses = (active) => {
  const base = 'rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60';
  return active
    ? `${base} bg-primary/15 text-primary shadow-[inset_0_-2px_0_0_currentColor]`
    : `${base} text-slate-700 hover:bg-primary/10 hover:text-primary dark:text-slate-200`;
};

const getMobileLinkClasses = (active) => {
  const base = 'rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60';
  return active
    ? `${base} border-primary/40 bg-primary text-background-dark shadow-lg shadow-primary/20`
    : `${base} border-slate-200 bg-white text-slate-700 hover:border-primary/30 hover:bg-primary/10 hover:text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200`;
};

if (header && body) {
  const desktopLinks = NAV_ITEMS.map((item) => {
    const active = item.key === currentPage;
    return `<a href="${resolveHref(item.href)}" aria-current="${active ? 'page' : 'false'}" class="${getLinkClasses(active)}">${item.label}</a>`;
  }).join('');

  const mobileLinks = NAV_ITEMS.map((item) => {
    const active = item.key === currentPage;
    return `<a href="${resolveHref(item.href)}" aria-current="${active ? 'page' : 'false'}" class="${getMobileLinkClasses(active)}">${item.label}</a>`;
  }).join('');

  header.className = 'sticky top-0 z-50 border-b border-primary/20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md';
  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div class="flex min-h-20 items-center justify-between gap-4 py-4">
        <a href="${homeHref}" class="flex items-center gap-3 text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background-dark shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-[22px]">architecture</span>
          </span>
          <span class="text-base sm:text-lg font-black uppercase tracking-[0.2em]">Fetzy Nigeria</span>
        </a>
        <nav class="hidden lg:flex items-center gap-2" aria-label="Primary navigation">
          ${desktopLinks}
        </nav>
        <div class="hidden sm:flex items-center gap-3">
          <a href="${quoteHref}" class="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-background-dark transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
            Get a Quote
          </a>
        </div>
        <button type="button" class="inline-flex lg:hidden items-center justify-center rounded-xl border border-primary/20 p-2 text-slate-700 transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:text-slate-200" data-nav-toggle aria-expanded="false" aria-controls="mobile-site-nav" aria-label="Open navigation menu">
          <span class="material-symbols-outlined" data-nav-icon>menu</span>
        </button>
      </div>
      <div id="mobile-site-nav" class="pointer-events-none invisible -translate-y-3 opacity-0 transition-all duration-300 ease-out lg:hidden" aria-label="Mobile navigation" aria-hidden="true" hidden>
        <div class="border-t border-primary/10 py-4">
          <div class="grid gap-3 sm:grid-cols-2">
            ${mobileLinks}
            <a href="${quoteHref}" class="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-background-dark transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  const toggle = header.querySelector('[data-nav-toggle]');
  const mobileNav = header.querySelector('#mobile-site-nav');
  const icon = header.querySelector('[data-nav-icon]');
  let lastFocusedElement = null;

  const getFocusable = () => [...mobileNav.querySelectorAll(focusableSelectors)].filter((el) => !el.hasAttribute('hidden'));

  const setOpenState = (open, { focusTarget = open } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileNav.setAttribute('aria-hidden', String(!open));
    icon.textContent = open ? 'close' : 'menu';

    if (open) {
      lastFocusedElement = document.activeElement;
      mobileNav.hidden = false;
      requestAnimationFrame(() => {
        mobileNav.classList.remove('pointer-events-none', 'invisible', '-translate-y-3', 'opacity-0');
        mobileNav.classList.add('pointer-events-auto', 'visible', 'translate-y-0', 'opacity-100');
      });
      if (focusTarget) {
        const [firstFocusable] = getFocusable();
        firstFocusable?.focus();
      }
      return;
    }

    mobileNav.classList.add('pointer-events-none', 'invisible', '-translate-y-3', 'opacity-0');
    mobileNav.classList.remove('pointer-events-auto', 'visible', 'translate-y-0', 'opacity-100');
    window.setTimeout(() => {
      if (toggle.getAttribute('aria-expanded') === 'false') {
        mobileNav.hidden = true;
      }
    }, 300);

    if (focusTarget) {
      (lastFocusedElement instanceof HTMLElement ? lastFocusedElement : toggle)?.focus();
    }
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpenState(!isOpen);
  });

  document.addEventListener('keydown', (event) => {
    const isOpen = toggle?.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpenState(false);
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener('click', (event) => {
    const isOpen = toggle?.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;
    if (header.contains(event.target)) return;
    setOpenState(false, { focusTarget: false });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && toggle?.getAttribute('aria-expanded') === 'true') {
      setOpenState(false, { focusTarget: false });
    }
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpenState(false, { focusTarget: false }));
  });
}
