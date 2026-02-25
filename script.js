/* =========================
   Utilities
========================= */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  toast.style.opacity = "1";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => (toast.hidden = true), 200);
  }, 1800);
}

/* =========================
   Theme (dark/light)
========================= */
(function initTheme() {
  const stored = localStorage.getItem("wvsu_theme");
  if (stored) document.documentElement.setAttribute("data-theme", stored);

  const icon = $("#themeIcon");
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  icon.textContent = current === "light" ? "☀" : "☾";
})();

$("#themeToggle")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("wvsu_theme", next);
  $("#themeIcon").textContent = next === "light" ? "☀" : "☾";
});

/* =========================
   Mobile menu
========================= */
const burger = $("#burger");
const mobileMenu = $("#mobileMenu");

function setMobile(open) {
  if (!burger || !mobileMenu) return;
  burger.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
}

burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  setMobile(!open);
});

$$(".mobile__link").forEach((a) =>
  a.addEventListener("click", () => setMobile(false))
);

/* =========================
   Progress bar
========================= */
function updateProgress() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  $("#progressBar").style.width = `${p}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* =========================
   Countdown to April 3, 2026 (local)
   If you want a specific kickoff time, change the ISO string.
========================= */
function startCountdown() {
  const target = new Date("2026-04-03T09:00:00"); // 9:00 AM local
  const el = {
    d: $("#cdDays"),
    h: $("#cdHours"),
    m: $("#cdMins"),
    s: $("#cdSecs"),
  };

  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    if (el.d) el.d.textContent = String(days);
    if (el.h) el.h.textContent = String(hours).padStart(2, "0");
    if (el.m) el.m.textContent = String(mins).padStart(2, "0");
    if (el.s) el.s.textContent = String(secs).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}
startCountdown();

/* =========================
   Tabs (Schedule Day 1 / Day 2)
========================= */
const tabDay1 = $("#tabDay1");
const tabDay2 = $("#tabDay2");
const panelDay1 = $("#panelDay1");
const panelDay2 = $("#panelDay2");

function setTab(day) {
  const isDay1 = day === 1;

  tabDay1.classList.toggle("is-active", isDay1);
  tabDay2.classList.toggle("is-active", !isDay1);

  tabDay1.setAttribute("aria-selected", String(isDay1));
  tabDay2.setAttribute("aria-selected", String(!isDay1));

  panelDay1.classList.toggle("is-active", isDay1);
  panelDay2.classList.toggle("is-active", !isDay1);
}

tabDay1?.addEventListener("click", () => setTab(1));
tabDay2?.addEventListener("click", () => setTab(2));

/* =========================
   Accordion (FAQ)
========================= */
$$(".acc").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const panel = btn.nextElementSibling;
    btn.setAttribute("aria-expanded", String(!expanded));
    btn.querySelector(".acc__icon").textContent = expanded ? "+" : "–";
    if (panel) panel.hidden = expanded;
  });
});

/* =========================
   Copy buttons
========================= */
$("#copyHotel")?.addEventListener("click", async () => {
  const text =
    "Sleep Inn & Suites Cross Lanes – South Charleston\n15 Goff Crossing Dr.\nCross Lanes, WV 25313";
  try {
    await navigator.clipboard.writeText(text);
    showToast("Hotel address copied.");
  } catch {
    showToast("Copy failed — please copy manually.");
  }
});

$("#copyShare")?.addEventListener("click", async () => {
  const text =
    "MS-CC Environmental Science Hackathon at West Virginia State University (WVSU)\n" +
    "Securing Air Quality Data in Distributed Sensor Networks\n" +
    "April 3–4, 2026\n" +
    "Register: (paste your WVSU registration link here)";
  try {
    await navigator.clipboard.writeText(text);
    showToast("Share text copied.");
  } catch {
    showToast("Copy failed — please copy manually.");
  }
});
