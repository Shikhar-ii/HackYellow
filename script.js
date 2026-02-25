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
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileMenu.hidden = open;
});
document.querySelectorAll(".mobile__link").forEach(a => {
  a.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  });
});

// Copy registration link
document.getElementById("copyReg")?.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(regURL);
    showToast("Registration link copied.");
  }catch{
    showToast("Copy failed — please copy manually.");
  }
});

// FAQ accordion
document.querySelectorAll(".faq__q").forEach(btn => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const panel = btn.nextElementSibling;
    btn.setAttribute("aria-expanded", String(!expanded));
    btn.querySelector(".faq__icon").textContent = expanded ? "+" : "–";
    panel.hidden = expanded;
  });
});

// Typewriter
const lines = [
  "pull air quality data from APIs…",
  "analyze time-series signals…",
  "detect anomalies & integrity failures…",
  "build a sensor trust model/score…",
  "stress-test with bad data…",
  "present your defense plan + demo."
];

const typeEl = document.getElementById("typeText");
let li = 0, ci = 0, deleting = false;

function typeLoop(){
  const current = lines[li];
  if(!deleting){
    ci++;
    typeEl.textContent = current.slice(0, ci);
    if(ci >= current.length){
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  }else{
    ci--;
    typeEl.textContent = current.slice(0, ci);
    if(ci <= 0){
      deleting = false;
      li = (li + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 28 : 38);
}
typeLoop();
