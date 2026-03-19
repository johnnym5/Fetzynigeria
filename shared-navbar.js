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

const SUPPORT_NAV_ITEMS = [
  { key: "legal", label: "Legal", href: "legal.html" },
  { key: "sitemap", label: "Sitemap", href: "sitemap.html" },
];

const CTA = { label: "Request a Quote", href: "request-quote.html" };

const currentPage = document.body?.dataset.page || "";
const header = document.getElementById("site-header");
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
      ? "text-primary"
      : "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-primary dark:text-slate-400";
  }

  return isActive
    ? "text-primary"
    : "text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-200";
};

const renderLink = (item, variant = "desktop") => {
  const isActive = item.key === currentPage;
  const baseClasses = getLinkClasses(isActive, variant);
  return `<a href="${resolveHref(item.href)}" class="${baseClasses}">${item.label}</a>`;
};

if (header) {
  const desktopPrimaryLinks = PRIMARY_NAV_ITEMS.map((item) => renderLink(item)).join("");
  const desktopSecondaryLinks = SECONDARY_NAV_ITEMS.map((item) => renderLink(item)).join("");
  const utilityLinks = SUPPORT_NAV_ITEMS.map((item) => renderLink(item, "utility")).join("");

  const mobileSection = (title, items) => `
    <div class="space-y-3 rounded-3xl border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <p class="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">${title}</p>
      <div class="grid gap-3">
        ${items.map((item) => renderLink(item, "mobile")).join("")}
      </div>
    </div>`;

  header.className = "sticky top-0 z-50 border-b border-primary/15 bg-background-light/90 backdrop-blur-md dark:bg-background-dark/90";
  header.innerHTML = `
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div class="flex min-h-20 items-center justify-between gap-4 py-4">
        <a href="${resolveHref('index.html')}" class="flex items-center gap-3 text-slate-900 dark:text-white" aria-label="Fetzy Nigeria home">
          <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-background-dark shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-[22px]">architecture</span>
          </span>
          <span>
            <span class="block text-[0.7rem] font-bold uppercase tracking-[0.35em] text-primary">Fetzy Nigeria</span>
            <span class="block text-sm font-semibold text-slate-600 dark:text-slate-300">Infrastructure • Construction • Delivery</span>
          </span>
        </a>

        <div class="hidden xl:flex items-center gap-8">
          <nav class="flex items-center gap-6" aria-label="Primary navigation">
            ${desktopPrimaryLinks}
          </nav>
          <nav class="flex items-center gap-5 border-l border-primary/15 pl-8" aria-label="Secondary navigation">
            ${desktopSecondaryLinks}
          </nav>
        </div>

        <div class="hidden lg:flex items-center gap-4">
          <nav class="hidden 2xl:flex items-center gap-4" aria-label="Support navigation">
            ${utilityLinks}
          </nav>
          <a href="${resolveHref(CTA.href)}" class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-background-dark transition-transform hover:scale-[1.02]">
            ${CTA.label}
          </a>
        </div>

        <button type="button" class="inline-flex lg:hidden items-center justify-center rounded-2xl border border-primary/20 p-2 text-slate-700 transition-colors hover:border-primary hover:text-primary dark:text-slate-200" data-nav-toggle aria-expanded="false" aria-controls="mobile-site-nav" aria-label="Toggle navigation menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div class="hidden items-center justify-between gap-4 border-t border-primary/10 py-3 lg:flex 2xl:hidden">
        <nav class="flex items-center gap-4" aria-label="Support navigation">
          ${utilityLinks}
        </nav>
      </div>

      <div id="mobile-site-nav" class="hidden border-t border-primary/10 py-5 lg:hidden" aria-label="Mobile navigation">
        <div class="grid gap-4">
          ${mobileSection("Explore", PRIMARY_NAV_ITEMS)}
          ${mobileSection("More", SECONDARY_NAV_ITEMS)}
          ${mobileSection("Support", SUPPORT_NAV_ITEMS)}
          <a href="${resolveHref(CTA.href)}" class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-background-dark transition-transform hover:scale-[1.01]">
            ${CTA.label}
          </a>
        </div>
      </div>
    </div>
  `;

  const toggle = header.querySelector("[data-nav-toggle]");
  const mobileNav = header.querySelector("#mobile-site-nav");
  const icon = toggle?.querySelector(".material-symbols-outlined");

  if (toggle && mobileNav && icon) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("hidden", isOpen);
      icon.textContent = isOpen ? "menu" : "close";
    });
  }
}
