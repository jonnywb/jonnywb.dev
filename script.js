(function () {
  // ===== THEME TOGGLE =====
  const toggle = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.setAttribute("data-theme", theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", theme);
      toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML =
      theme === "dark"
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ===== HEADER SCROLL BEHAVIOR =====
  let lastScroll = 0;
  const header = document.getElementById("header");
  window.addEventListener(
    "scroll",
    () => {
      const curr = window.scrollY;
      if (curr > 80) {
        header.classList.add("header--scrolled");
        if (curr > lastScroll && curr > 300) {
          header.classList.add("header--hidden");
        } else {
          header.classList.remove("header--hidden");
        }
      } else {
        header.classList.remove("header--scrolled");
        header.classList.remove("header--hidden");
      }
      lastScroll = curr;
    },
    { passive: true },
  );

  // ===== MOBILE NAV =====
  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");

  function openNav() {
    mainNav.classList.add("is-open");
    navOverlay.classList.add("is-visible");
    mobileToggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    mainNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    mobileToggle.setAttribute("aria-expanded", "false");
  }

  mobileToggle.addEventListener("click", () => {
    mainNav.classList.contains("is-open") ? closeNav() : openNav();
  });
  navOverlay.addEventListener("click", closeNav);
  mainNav.querySelectorAll(".header__nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // ===== TERMINAL TYPING EFFECT =====
  const terminalLines = [
    { type: "prompt", text: "$ cat developer.json" },
    { type: "blank" },
    { type: "code", text: "{" },
    { type: "code", text: '  <span class="key">"name"</span>: <span class="string">"Jonathan Brierley"</span>,' },
    {
      type: "code",
      text: '  <span class="key">"role"</span>: <span class="string">"Junior Full-Stack Developer"</span>,',
    },
    { type: "code", text: '  <span class="key">"location"</span>: <span class="string">"London, UK"</span>,' },
    { type: "code", text: '  <span class="key">"stack"</span>: <span class="bracket">[</span>' },
    {
      type: "code",
      text: '    <span class="string">"TypeScript"</span>, <span class="string">"React"</span>, <span class="string">"Python"</span>,',
    },
    {
      type: "code",
      text: '    <span class="string">"React Native"</span>, <span class="string">"Node.js"</span>',
    },
    {
      type: "code",
      text: '    <span class="string">"Express"</span>, <span class="string">"Supabase"</span>, <span class="string">"Vite"</span>',
    },
    { type: "code", text: '  <span class="bracket">]</span>,' },
    {
      type: "code",
      text: '  <span class="key">"available"</span>: <span class="accent" style="color:var(--color-accent)">true</span>',
    },
    { type: "code", text: "}" },
    { type: "blank" },
    { type: "prompt", text: '$ <span class="terminal__cursor"></span>' },
  ];

  const terminal = document.getElementById("terminal");
  terminalLines.forEach((line, i) => {
    const el = document.createElement("div");
    el.className = "terminal__line";
    el.style.animationDelay = i * 0.08 + "s";
    if (line.type === "blank") {
      el.innerHTML = "&nbsp;";
    } else if (line.type === "prompt") {
      el.innerHTML = line.text;
    } else {
      el.innerHTML = line.text;
    }
    terminal.appendChild(el);
  });

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
