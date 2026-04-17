(function () {
  const wheel = document.getElementById("subject-wheel");
  const spinBtn = document.getElementById("spin-wheel-btn");
  const result = document.getElementById("wheel-result");
  const classSelect = document.getElementById("class-select");

  if (!wheel || !spinBtn || !result) {
    return;
  }

  const subjects = [
    { id: "math", label: "Mathematics", href: "subjects/math.html" },
    { id: "english", label: "English", href: "subjects/english.html" },
    { id: "history", label: "History", href: "subjects/history.html" },
    { id: "geography", label: "Geography", href: "subjects/geography.html" },
    { id: "science", label: "Science", href: "subjects/science.html" },
    { id: "technology", label: "Technology", href: "subjects/technology.html" },
    { id: "french-grammar", label: "French Grammar", href: "subjects/french-grammar.html" }
  ];

  let currentRotation = 0;

  function getClassKey() {
    if (classSelect && classSelect.value) {
      return classSelect.value;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("class") || "default";
  }

  function getHistory(classKey) {
    try {
      return JSON.parse(sessionStorage.getItem(`wheelHistory:${classKey}`) || "[]");
    } catch (error) {
      return [];
    }
  }

  function setHistory(classKey, history) {
    sessionStorage.setItem(`wheelHistory:${classKey}`, JSON.stringify(history));
  }

  function getAvailableSubjects(classKey) {
    const usedIds = new Set(getHistory(classKey));
    return subjects.filter((subject) => !usedIds.has(subject.id));
  }

  function pickRandomSubjectForClass(classKey) {
    let available = getAvailableSubjects(classKey);
    if (!available.length) {
      setHistory(classKey, []);
      available = subjects.slice();
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    const history = getHistory(classKey);
    history.push(chosen.id);
    setHistory(classKey, history);
    return chosen;
  }

  function getRotationForSubject(subjectId) {
    const index = subjects.findIndex((subject) => subject.id === subjectId);
    const segment = 360 / subjects.length;
    return index * segment + (segment / 2);
  }

  function buildQuizUrl(chosen, classKey) {
    const url = new URL(chosen.href, window.location.href);
    url.searchParams.set("class", classKey);
    url.searchParams.set("subject", chosen.id);
    return `${url.pathname}${url.search}`;
  }

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    result.textContent = "Spinning...";

    const classKey = getClassKey();
    const chosen = pickRandomSubjectForClass(classKey);

    const extraTurns = 4 + Math.floor(Math.random() * 4);
    const targetRotation = getRotationForSubject(chosen.id);
    currentRotation += extraTurns * 360 + targetRotation;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      result.innerHTML = `Selected subject for ${classKey}: <strong>${chosen.label}</strong> — <a href="${buildQuizUrl(chosen, classKey)}">Start quiz</a>`;
      spinBtn.disabled = false;
    }, 3200);
  });
})();
