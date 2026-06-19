const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeSymbol = themeToggle?.querySelector(".theme-symbol");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  if (isDark) {
    root.dataset.theme = "dark";
  } else {
    root.removeAttribute("data-theme");
  }
  if (themeSymbol) {
    themeSymbol.textContent = isDark ? "☀" : "☾";
  }
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  if (themeMeta) {
    themeMeta.setAttribute("content", isDark ? "#10141b" : "#ffffff");
  }
};

const storedTheme = (() => {
  try {
    return localStorage.getItem("hhhtty-theme");
  } catch (error) {
    return null;
  }
})();
applyTheme(storedTheme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.hasAttribute("data-theme") ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("hhhtty-theme", nextTheme);
  } catch (error) {
    // Theme persistence is optional; the button still works for the current visit.
  }
});

const progress = document.querySelector("[data-reading-progress]");
if (progress) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

const commandToggle = document.querySelector("[data-command-toggle]");
const commandOverlay = document.querySelector("[data-command-overlay]");
const commandClose = document.querySelector("[data-command-close]");
const commandInput = document.querySelector("[data-command-input]");
const commandItems = Array.from(document.querySelectorAll("[data-command-item]"));
const commandEmpty = document.querySelector("[data-command-empty]");
let previousFocus = null;

const filterCommands = () => {
  const query = commandInput?.value.trim().toLowerCase() || "";
  let visibleCount = 0;
  commandItems.forEach((item) => {
    const haystack = `${item.textContent} ${item.dataset.keywords || ""}`.toLowerCase();
    const visible = haystack.includes(query);
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  if (commandEmpty) {
    commandEmpty.hidden = visibleCount > 0;
  }
};

const openCommands = () => {
  if (!commandOverlay) return;
  previousFocus = document.activeElement;
  commandOverlay.hidden = false;
  commandInput?.focus();
  commandInput?.select();
  filterCommands();
};

const closeCommands = () => {
  if (!commandOverlay || commandOverlay.hidden) return;
  commandOverlay.hidden = true;
  if (commandInput) commandInput.value = "";
  filterCommands();
  previousFocus?.focus?.();
};

commandToggle?.addEventListener("click", openCommands);
commandClose?.addEventListener("click", closeCommands);
commandInput?.addEventListener("input", filterCommands);

commandOverlay?.addEventListener("click", (event) => {
  if (event.target === commandOverlay) {
    closeCommands();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if ((event.metaKey || event.ctrlKey) && key === "k") {
    event.preventDefault();
    openCommands();
  }
  if (event.key === "Escape") {
    closeCommands();
  }
});

commandItems.forEach((item) => {
  item.addEventListener("click", async () => {
    if (item.matches("[data-copy-email]")) {
      try {
        await navigator.clipboard.writeText("yuhaitao1588@163.com");
      } catch (error) {
        window.location.href = "mailto:yuhaitao1588@163.com";
      }
    }
    closeCommands();
  });
});

const header = document.querySelector("[data-header]");
if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
