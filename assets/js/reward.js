(function () {
  const params = new URLSearchParams(window.location.search);
  const track = params.get("track");

  const lockedSection = document.getElementById("reward-locked");
  const unlockedSection = document.getElementById("reward-unlocked");
  const subjectText = document.getElementById("reward-subject-text");
  const options = Array.from(document.querySelectorAll(".reward-option"));
  const goSubjectBtn = document.getElementById("go-subject-btn");

  const isUnlocked = track && sessionStorage.getItem(`rewardUnlocked:${track}`) === "true";

  if (!isUnlocked) {
    lockedSection.classList.remove("hidden");
    if (goSubjectBtn) {
      goSubjectBtn.href = "index.html";
    }
    return;
  }

  unlockedSection.classList.remove("hidden");
  subjectText.textContent = `Unlocked from: ${track.replaceAll("__", " • ")}`;

  options.forEach((button) => {
    button.addEventListener("click", () => {
      const reward = button.dataset.reward;
      const code = button.dataset.code;
      window.location.href = `reward-win.html?reward=${encodeURIComponent(reward)}&code=${encodeURIComponent(code)}&track=${encodeURIComponent(track)}`;
    });
  });
})();
