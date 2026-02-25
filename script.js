const regURL = "https://ms-cc.org/ms-cc-hackathon-at-west-virginia-state-university/";
const toast = document.getElementById("toast");

function showToast(msg){
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => (toast.hidden = true), 1600);
}

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileNav.hidden = open;
});
document.querySelectorAll(".mobile__link").forEach(a => {
  a.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  });
});

// Copy buttons
document.getElementById("copyLink")?.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(regURL); showToast("Copied registration link."); }
  catch { showToast("Copy failed. Please copy manually."); }
});
document.getElementById("copyReg")?.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(regURL); showToast("Copied registration link."); }
  catch { showToast("Copy failed. Please copy manually."); }
});
document.getElementById("copyHotel")?.addEventListener("click", async () => {
  const txt = "Sleep Inn & Suites Cross Lanes – South Charleston\n15 Goff Crossing Dr.\nCross Lanes, WV 25313";
  try { await navigator.clipboard.writeText(txt); showToast("Hotel address copied."); }
  catch { showToast("Copy failed. Please copy manually."); }
});

// Countdown (Apr 3, 2026 9:00 AM local)
const target = new Date("2026-04-03T09:00:00");

function tick(){
  const now = new Date();
  let diff = Math.max(0, target - now);
  const total = Math.floor(diff / 1000);

  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  document.getElementById("d").textContent = d;
  document.getElementById("h").textContent = String(h).padStart(2,"0");
  document.getElementById("m").textContent = String(m).padStart(2,"0");
  document.getElementById("s").textContent = String(s).padStart(2,"0");
}
tick();
setInterval(tick, 1000);

// FAQ accordion
document.querySelectorAll(".faq__q").forEach(btn => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const panel = btn.nextElementSibling;
    btn.setAttribute("aria-expanded", String(!expanded));
    btn.querySelector("span").textContent = expanded ? "+" : "–";
    panel.hidden = expanded;
  });
});

// Active nav highlight on scroll
const links = Array.from(document.querySelectorAll(".nav__link"));
const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = "#" + entry.target.id;
    links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
  });
}, { rootMargin: "-35% 0px -60% 0px", threshold: 0.01 });

sections.forEach(s => obs.observe(s));
