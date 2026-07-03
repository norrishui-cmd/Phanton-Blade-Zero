const toolCopy = {
  route:
    "Prioritize a spoiler-safe route planner with quest flags, locked paths, and ending-impact warnings. It turns the site from a blog into a repeat-visit guide tool.",
  build:
    "Build Finder should ask for playstyle first: parry-heavy, dodge-heavy, aggressive burst, defensive learning, or boss rematch. Then it can map weapons, Phantom Edges, and upgrades.",
  boss:
    "Boss Checklist should track defeated bosses, optional rematches, rewards, achievements, and whether the player has opened the spoiler strategy panel."
};

const buttons = document.querySelectorAll(".tool");
const output = document.querySelector("#tool-output");

if (buttons.length && output) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      output.textContent = toolCopy[button.dataset.target];
    });
  });
}

const countdown = document.querySelector("[data-countdown]");

if (countdown) {
  const target = new Date(countdown.dataset.countdown).getTime();
  const days = document.querySelector("#days");
  const hours = document.querySelector("#hours");
  const minutes = document.querySelector("#minutes");
  const seconds = document.querySelector("#seconds");

  const renderCountdown = () => {
    const distance = Math.max(0, target - Date.now());
    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    const minuteMs = 60 * 1000;

    days.textContent = Math.floor(distance / dayMs).toString();
    hours.textContent = Math.floor((distance % dayMs) / hourMs).toString().padStart(2, "0");
    minutes.textContent = Math.floor((distance % hourMs) / minuteMs).toString().padStart(2, "0");
    seconds.textContent = Math.floor((distance % minuteMs) / 1000).toString().padStart(2, "0");
  };

  renderCountdown();
  window.setInterval(renderCountdown, 1000);
}
