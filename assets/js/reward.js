(function () {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  const lockedSection = document.getElementById("reward-locked");
  const unlockedSection = document.getElementById("reward-unlocked");
  const subjectText = document.getElementById("reward-subject-text");
  const options = Array.from(document.querySelectorAll(".reward-option"));
  const goSubjectBtn = document.getElementById("go-subject-btn");

  const isUnlocked = subject && sessionStorage.getItem(`rewardUnlocked:${subject}`) === "true";

  if (!isUnlocked) {
    lockedSection.classList.remove("hidden");
    if (goSubjectBtn && subject) {
      goSubjectBtn.href = `subjects/${subject}.html`;
    }
    return;
  }

  unlockedSection.classList.remove("hidden");
  subjectText.textContent = `Unlocked from: ${subject.replace("-", " ")}`;

  options.forEach((button) => {
    button.addEventListener("click", () => {
      const reward = button.dataset.reward;
      const code = button.dataset.code;
      window.location.href = `reward-win.html?reward=${encodeURIComponent(reward)}&code=${encodeURIComponent(code)}&subject=${encodeURIComponent(subject)}`;
    });
  });
})();
