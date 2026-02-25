const regURL = "https://ms-cc.org/ms-cc-hackathon-at-west-virginia-state-university/";
const toast = document.getElementById("toast");

function showToast(msg){
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => (toast.hidden = true), 1500);
}

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileMenu.hidden = open;
});
document.querySelectorAll(".m").forEach(a => {
  a.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  });
});

// copy reg link
document.getElementById("copyReg")?.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(regURL);
    showToast("Copied.");
  }catch{
    showToast("Copy failed.");
  }
});

// FAQ accordion
document.querySelectorAll(".q").forEach(btn => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const panel = btn.nextElementSibling;
    btn.setAttribute("aria-expanded", String(!expanded));
    btn.querySelector(".pm").textContent = expanded ? "+" : "–";
    panel.hidden = expanded;
  });
});

// Typewriter (short + punchy)
const items = [
  "pull air quality data from APIs",
  "find time-series anomalies",
  "detect integrity failures",
  "build a sensor trust score",
  "stress-test with bad data",
  "demo your defense plan"
];

const el = document.getElementById("typeText");
let i = 0, j = 0, del = false;

function loop(){
  const word = items[i];
  if(!del){
    j++;
    el.textContent = word.slice(0, j);
    if(j === word.length){
      del = true;
      return setTimeout(loop, 900);
    }
  }else{
    j--;
    el.textContent = word.slice(0, j);
    if(j === 0){
      del = false;
      i = (i + 1) % items.length;
    }
  }
  setTimeout(loop, del ? 26 : 34);
}
loop();
