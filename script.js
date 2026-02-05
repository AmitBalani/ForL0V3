const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const hintText = document.getElementById("hintText");
const successBox = document.getElementById("successBox");
const successText = document.getElementById("successText");

const ideasGrid = document.getElementById("ideasGrid");
const heartsContainer = document.querySelector(".hearts");
const buttonZone = document.getElementById("buttonZone");

const meterFill = document.getElementById("meterFill");
const meterValue = document.getElementById("meterValue");

const goIdeas = document.getElementById("goIdeas");
const goPhotos = document.getElementById("goPhotos");
const goTop = document.getElementById("goTop");

const ideasSection = document.getElementById("ideasSection");
const photosSection = document.getElementById("photosSection");

const speechBubble = document.getElementById("speechBubble");
const finalTop = document.getElementById("finalTop");
const yesAgainBtn = document.getElementById("yesAgainBtn");

const themeBtn = document.getElementById("themeBtn");

let noBtnRunning = false;

// ✅ Correct toggle text (dark default => show Light Mode)
function updateThemeButton() {
  const isLight = document.body.classList.contains("theme-light");
  themeBtn.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
}
updateThemeButton();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("theme-light");
  document.body.classList.toggle("theme-dark");
  updateThemeButton();
});

// Date ideas
const dateIdeas = [
  { emoji: "🕯️🍝", title: "Candle Dinner", desc: "You sit, I serve, we fall in love again 😌💖" },
  { emoji: "🍕🎬", title: "Movie + Snacks", desc: "You choose movie, I choose cuddle position 😭✨" },
  { emoji: "🌅🚗", title: "Sunset Drive", desc: "Hand in hand, playlist on, world off 💞" },
  { emoji: "🍦📸", title: "Ice Cream Date", desc: "Sweet photos + sweet dessert = perfect 💖" },
  { emoji: "🎁💌", title: "Tiny Surprise", desc: "A note + flowers + my annoying love forever 😂" },
  { emoji: "🛋️🫂", title: "Cozy Home Night", desc: "Blanket, stories, kisses, and peace 🥺🫶" },
];

function renderIdeas() {
  ideasGrid.innerHTML = "";
  dateIdeas.forEach((idea) => {
    const card = document.createElement("div");
    card.className = "idea-card glass-soft";
    card.innerHTML = `
      <div class="idea-top">
        <div class="idea-emoji">${idea.emoji}</div>
        <div>
          <div class="idea-title">${idea.title}</div>
          <div class="idea-desc">${idea.desc}</div>
        </div>
      </div>
    `;
    ideasGrid.appendChild(card);
  });
}
renderIdeas();

// Floating hearts
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  const hearts = ["💗", "💖", "💘", "💞", "💕", "❤️", "✨"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 4 + "s";
  heart.style.fontSize = 12 + Math.random() * 22 + "px";
  heart.style.opacity = 0.35 + Math.random() * 0.55;

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7500);
}
setInterval(spawnHeart, 260);

// NO button stays inside zone and runs away
function moveNoButtonInsideZone() {
  if (noBtnRunning) return;
  noBtnRunning = true;

  const zoneRect = buttonZone.getBoundingClientRect();
  const pad = 12;

  const maxLeft = zoneRect.width - noBtn.offsetWidth - pad;
  const maxTop = zoneRect.height - noBtn.offsetHeight - pad;

  const left = pad + Math.random() * Math.max(0, maxLeft);
  const top = pad + Math.random() * Math.max(0, maxTop);

  noBtn.style.position = "absolute";
  noBtn.style.transition = "left 0.25s ease, top 0.25s ease";
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;

  setTimeout(() => (noBtnRunning = false), 260);
}

buttonZone.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const distance = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);

  if (distance < 90) {
    moveNoButtonInsideZone();

    const lines = [
      "NO is disabled 😌",
      "Try again 😂",
      "Wrong button 🤭",
      "Click YES like a queen 👑💖",
      "Nope 😭"
    ];
    speechBubble.textContent = lines[Math.floor(Math.random() * lines.length)];
  }
});

noBtn.addEventListener("click", () => {
  hintText.textContent = "Nice try 😌 But NO is not supported 😂💘";
  moveNoButtonInsideZone();
});

// YES click
yesBtn.addEventListener("click", () => {
  successBox.classList.remove("hidden");

  yesBtn.disabled = true;
  yesBtn.style.opacity = "0.85";
  yesBtn.style.cursor = "default";

  noBtn.disabled = true;
  noBtn.style.opacity = "0.55";

  hintText.textContent = "Correct choice 😌✅";
  speechBubble.textContent = "YAYYY!! 💖😭";

  const lines = [
    "I knew it 😌💖 This was destiny… and also because I’m a VERY good husband 😎✨",
    "YAYYY 😭❤️ You just made me the luckiest man alive. Forehead kiss loading… 😘",
    "Perfect 😍 Now officially you’re stuck with me forever 🫶✨",
    "Confirmed ✅ You + Me = Forever. Now give me 2 hugs minimum 😌💖"
  ];
  successText.textContent = lines[Math.floor(Math.random() * lines.length)];

  // love meter animation
  let value = 0;
  const target = 100;
  const timer = setInterval(() => {
    value += 4;
    if (value >= target) {
      value = target;
      clearInterval(timer);
    }
    meterFill.style.width = value + "%";
    meterValue.textContent = value + "%";
  }, 40);

  // heart burst
  for (let i = 0; i < 22; i++) {
    setTimeout(spawnHeart, i * 35);
  }

  setTimeout(() => {
    successBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 220);
});

// Scroll helpers
goIdeas?.addEventListener("click", () => {
  ideasSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
goPhotos?.addEventListener("click", () => {
  photosSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
goTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
finalTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
yesAgainBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  for (let i = 0; i < 18; i++) setTimeout(spawnHeart, i * 30);
});

// Photo zoom
document.querySelectorAll(".polaroid").forEach((p) => {
  p.addEventListener("click", () => p.classList.toggle("zoomed"));
});
