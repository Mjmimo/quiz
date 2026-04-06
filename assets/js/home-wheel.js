(function () {
  const wheel = document.getElementById("subject-wheel");
  const spinBtn = document.getElementById("spin-wheel-btn");
  const result = document.getElementById("wheel-result");

  if (!wheel || !spinBtn || !result) {
    return;
  }

  const subjects = [
    { label: "Mathematics", href: "subjects/math.html" },
    { label: "English", href: "subjects/english.html" },
    { label: "History", href: "subjects/history.html" },
    { label: "Geography", href: "subjects/geography.html" },
    { label: "Science", href: "subjects/science.html" },
    { label: "Technology", href: "subjects/technology.html" },
    { label: "French Grammar", href: "subjects/french-grammar.html" }
  ];

  let currentRotation = 0;

  function pickByRotation(rotation) {
    const segment = 360 / subjects.length;
    const normalized = ((360 - (rotation % 360)) + 360) % 360;
    const index = Math.floor(normalized / segment) % subjects.length;
    return subjects[index];
  }

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    result.textContent = "Spinning...";

    const extraTurns = 4 + Math.floor(Math.random() * 4);
    const randomOffset = Math.random() * 360;
    currentRotation += extraTurns * 360 + randomOffset;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      const chosen = pickByRotation(currentRotation);
      result.innerHTML = `Selected subject: <strong>${chosen.label}</strong> — <a href="${chosen.href}">Start quiz</a>`;
      spinBtn.disabled = false;
    }, 3200);
  });
})();
