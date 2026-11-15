const gifts = {
  poem: {
    icon: "🌷",
    title: "A little poem for you",
    message: `If every star could spell your name,
The night would never look the same.
If every flower had a story to tell,
It would speak of you, and how you make life swell.

Your smile is sunshine after rain,
Your laughter makes me smile again.
And on your birthday, this is true:
The sweetest gift in my life is you. 💗`
  },
  reasons: {
    icon: "🎀",
    title: "A few reasons you're special",
    message: `1. Your smile can brighten an ordinary day.
2. Your presence makes little moments memorable.
3. You inspire me to become a better person.
4. You make the world feel a little softer.
5. Simply being YOU is more than enough.

And honestly… I could write a thousand more. ❤️`
  },
  promise: {
    icon: "🤝",
    title: "My birthday promise",
    message: `I promise to listen when you need to talk,
To cheer for you in every little victory,
To respect your dreams and support your growth,
And to keep choosing kindness, honesty and care.

I can't promise every day will be perfect,
but I promise that you will always deserve love, respect and happiness. 💞`
  },
  memory: {
    icon: "🧸",
    title: "Your tiny surprise",
    message: `🎟️ ONE FREE HUG — whenever you need it
🍦 ONE SWEET TREAT — my treat!
🌙 ONE LONG TALK — no rushing, just us
🌸 UNLIMITED COMPLIMENTS — because you deserve them

Redeem anytime. No expiry date! 😘`
  },
  letter: {
    icon: "💌",
    title: "A letter from my heart",
    message: `My love,

Today is all about celebrating you — your beautiful heart, your dreams, your smile and everything that makes you who you are.

I hope this new year of your life brings you peace when things are difficult, courage when you feel unsure, and countless reasons to smile.

Thank you for being you. Never forget how precious and special you are.

Happy Birthday, sweetheart. May your wishes come true, one by one. ❤️

Always with love,
Your person 💗`
  }
};

const modal = document.getElementById("giftModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const finalScreen = document.getElementById("finalScreen");
const opened = new Set();

function updateProgress() {
  progressText.textContent = `${opened.size} of ${Object.keys(gifts).length} gifts opened`;
  progressBar.style.width = `${opened.size / Object.keys(gifts).length * 100}%`;
}

function openGift(key, button) {
  const gift = gifts[key];
  if (!gift) return;
  opened.add(key);
  button.classList.add("opened");
  button.querySelector(".gift-hint").textContent = "Opened with love ✓";
  updateProgress();
  modalIcon.textContent = gift.icon;
  modalTitle.textContent = gift.title;
  modalMessage.textContent = gift.message;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("closeModal").focus();

  if (opened.size === Object.keys(gifts).length) {
    document.getElementById("nextGift").textContent = "See one last surprise 💖";
  }
}

document.querySelectorAll(".gift-card").forEach(button => {
  button.addEventListener("click", () => openGift(button.dataset.gift, button));
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  if (opened.size === Object.keys(gifts).length) {
    setTimeout(() => {
      finalScreen.classList.add("show");
      finalScreen.setAttribute("aria-hidden", "false");
    }, 250);
  }
}
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("nextGift").addEventListener("click", closeModal);
document.getElementById("finalClose").addEventListener("click", () => {
  finalScreen.classList.remove("show");
  finalScreen.setAttribute("aria-hidden", "true");
});
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (modal.classList.contains("show")) closeModal();
    else finalScreen.classList.remove("show");
  }
});
