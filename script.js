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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    output.textContent = toolCopy[button.dataset.target];
  });
});
