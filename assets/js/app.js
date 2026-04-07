(function () {
  const app = document.getElementById("quiz-app");
  if (!app || typeof curriculum === "undefined" || typeof quizBank === "undefined") return;

  const state = {
    language: "en",
    grade: null,
    subject: null,
    topic: null,
    questions: [],
    current: 0,
    score: 0,
    answered: false,
    lockedSubject: null,
    completedByTrack: {}
  };

  const pageTitle = document.getElementById("page-title");
  const heroEyebrow = document.getElementById("hero-eyebrow");
  const heroHeading = document.getElementById("hero-heading");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const languageLabel = document.getElementById("language-label");
  const languageSelect = document.getElementById("language-select");
  const settingsToggle = document.getElementById("settings-toggle");
  const langPickerPanel = document.getElementById("lang-picker-panel");
  const gradeTitle = document.getElementById("grade-title");
  const gradeHint = document.getElementById("grade-hint");
  const subjectTitle = document.getElementById("subject-title");
  const topicTitle = document.getElementById("topic-title");
  const quizDoneTitle = document.getElementById("quiz-done-title");
  const retryBtn = document.getElementById("retry-btn");
  const newTopicBtn = document.getElementById("new-topic-btn");
  const newGradeBtn = document.getElementById("new-grade-btn");
  const nextBtn = document.getElementById("next-btn");
  const scoreLabel = document.getElementById("score-label");
  const footerText = document.getElementById("footer-text");
  const rewardLink = document.getElementById("reward-link");
  const wheelTitle = document.getElementById("wheel-title");
  const wheel = document.getElementById("subject-wheel");
  const spinBtn = document.getElementById("spin-wheel-btn");
  const wheelResult = document.getElementById("wheel-result");

  const stepGrade = document.getElementById("step-grade");
  const stepSubject = document.getElementById("step-subject");
  const stepTopic = document.getElementById("step-topic");
  const stepQuiz = document.getElementById("step-quiz");

  const panels = {
    grade: document.getElementById("grade-panel"),
    subject: document.getElementById("subject-panel"),
    topic: document.getElementById("topic-panel"),
    quiz: document.getElementById("quiz-panel"),
    result: document.getElementById("result-panel")
  };

  const backToGrade = document.getElementById("back-to-grade");
  const backToSubject = document.getElementById("back-to-subject");
  const backToTopic = document.getElementById("back-to-topic");

  const gradeGrid = document.getElementById("grade-grid");
  const subjectGrid = document.getElementById("subject-grid");
  const topicGrid = document.getElementById("topic-grid");
  const subjectContext = document.getElementById("subject-context");
  const topicContext = document.getElementById("topic-context");

  const quizTitle = document.getElementById("quiz-title");
  const quizProgress = document.getElementById("quiz-progress");
  const questionText = document.getElementById("question-text");
  const choices = document.getElementById("choices");
  const feedback = document.getElementById("feedback");
  const scoreValue = document.getElementById("score-value");

  const resultSummary = document.getElementById("result-summary");
  const resultMessage = document.getElementById("result-message");

  function t(key, vars) {
    return translateUI(state.language, key, vars);
  }

  function gradeLabel(grade) {
    return grade.label;
  }

  function setActiveStep(step) {
    document.querySelectorAll(".step").forEach((el) => {
      const rank = ["grade", "subject", "topic", "quiz"].indexOf(el.dataset.step);
      const currentRank = ["grade", "subject", "topic", "quiz"].indexOf(step);
      el.classList.toggle("active", el.dataset.step === step);
      el.classList.toggle("done", rank < currentRank);
    });
  }

  function showPanel(key) {
    Object.values(panels).forEach((panel) => panel.classList.add("hidden"));
    panels[key].classList.remove("hidden");
    setActiveStep(key === "result" ? "quiz" : key);
  }

  function buttonCard(label, description, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "subject-card option-card";
    button.innerHTML = `<h3>${label}</h3><p>${description}</p>`;
    button.addEventListener("click", onClick);
    return button;
  }

  function applyStaticTranslations() {
    document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = state.language;

    pageTitle.textContent = t("pageTitle");
    heroEyebrow.textContent = t("eyebrow");
    heroHeading.textContent = t("heading");
    heroSubtitle.textContent = t("subtitle");
    languageLabel.textContent = t("languageLabel");
    settingsToggle.textContent = `⚙ ${t("settings")}`;

    stepGrade.textContent = t("stepGrade");
    stepSubject.textContent = t("stepSubject");
    stepTopic.textContent = t("stepTopic");
    stepQuiz.textContent = t("stepQuiz");

    gradeTitle.textContent = t("selectGrade");
    gradeHint.textContent = t("selectGradeHint");
    subjectTitle.textContent = t("chooseSubject");
    topicTitle.textContent = t("chooseTopic");
    backToGrade.textContent = t("backGrades");
    backToSubject.textContent = t("backSubjects");
    backToTopic.textContent = t("backTopics");

    quizDoneTitle.textContent = t("quizDone");
    retryBtn.textContent = t("retryTopic");
    newTopicBtn.textContent = t("chooseAnotherTopic");
    newGradeBtn.textContent = t("startOver");
    nextBtn.textContent = t("nextQuestion");
    scoreLabel.textContent = `${t("score")}:`;
    footerText.textContent = t("footer");
    rewardLink.textContent = t("chooseReward");
    wheelTitle.textContent = t("wheelTitle");
    spinBtn.textContent = t("spin");
    if (!wheelResult.dataset.picked) wheelResult.textContent = t("wheelReady");
  }

  function renderGrades() {
    gradeGrid.innerHTML = "";
    curriculum.grades.forEach((grade) => {
      gradeGrid.appendChild(buttonCard(gradeLabel(grade), t("startFromLevel"), () => {
        state.grade = grade;
        state.subject = null;
        state.topic = null;
        renderSubjects();
        showPanel("subject");
      }));
    });
  }


  function isSubjectLockedForSelection(subjectId) {
    return state.lockedSubject && state.lockedSubject !== subjectId;
  }

  function setLockedSubject(subjectId) {
    if (!state.lockedSubject) state.lockedSubject = subjectId;
  }

  function trackKey() {
    return `${state.grade.id}__${state.subject.id}`;
  }

  function markTopicComplete() {
    const key = trackKey();
    if (!state.completedByTrack[key]) state.completedByTrack[key] = new Set();
    state.completedByTrack[key].add(state.topic);

    const doneCount = state.completedByTrack[key].size;
    if (doneCount >= state.subject.topics.length) {
      state.lockedSubject = null;
      wheelResult.textContent = t("subjectUnlocked");
      wheelResult.dataset.picked = "1";
    }
  }

  function selectSubject(subject) {
    if (isSubjectLockedForSelection(subject.id)) {
      wheelResult.textContent = t("subjectLocked", { subject: localizedSubjectName(state.language, state.lockedSubject) });
      wheelResult.dataset.picked = "1";
      return;
    }

    setLockedSubject(subject.id);
    state.subject = subject;
    state.topic = null;
    renderTopics();
    showPanel("topic");
  }

  function renderSubjects() {
    subjectGrid.innerHTML = "";
    subjectContext.textContent = t("selectedGrade", { grade: gradeLabel(state.grade) });

    curriculum.subjects.forEach((subject) => {
      const name = localizedSubjectName(state.language, subject.id);
      const isLocked = isSubjectLockedForSelection(subject.id);
      const description = isLocked ? t("subjectLocked", { subject: localizedSubjectName(state.language, state.lockedSubject) }) : t("topicsAvailable", { count: subject.topics.length });
      const card = buttonCard(name, description, () => selectSubject(subject));
      card.disabled = isLocked;
      if (isLocked) card.classList.add("locked-card");
      subjectGrid.appendChild(card);
    });
  }

  function renderTopics() {
    topicGrid.innerHTML = "";
    topicContext.textContent = `${gradeLabel(state.grade)} • ${localizedSubjectName(state.language, state.subject.id)}`;
    state.subject.topics.forEach((topicId) => {
      topicGrid.appendChild(buttonCard(localizedTopicName(state.language, topicId), t("levelAdapted", { grade: gradeLabel(state.grade) }), () => {
        state.topic = topicId;
        startQuiz();
      }));
    });
  }

  function startQuiz() {
    state.questions = quizBank[state.subject.id][state.topic][state.grade.id] || [];
    state.current = 0;
    state.score = 0;
    state.answered = false;
    scoreValue.textContent = "0";
    rewardLink.classList.add("hidden");
    showPanel("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const currentQuestion = state.questions[state.current];
    if (!currentQuestion) {
      showResult();
      return;
    }

    quizTitle.textContent = `${gradeLabel(state.grade)} • ${localizedSubjectName(state.language, state.subject.id)} • ${localizedTopicName(state.language, state.topic)}`;
    quizProgress.textContent = t("questionCount", { current: state.current + 1, total: state.questions.length });
    questionText.textContent = currentQuestion.question;
    feedback.textContent = "";
    feedback.className = "feedback";
    choices.innerHTML = "";
    nextBtn.disabled = true;
    state.answered = false;

    currentQuestion.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = option;
      btn.addEventListener("click", () => handleAnswer(index));
      choices.appendChild(btn);
    });
  }

  function handleAnswer(selected) {
    if (state.answered) return;

    state.answered = true;
    const currentQuestion = state.questions[state.current];
    const correct = selected === currentQuestion.answer;

    Array.from(choices.querySelectorAll("button")).forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQuestion.answer) btn.classList.add("correct");
      if (idx === selected && !correct) btn.classList.add("incorrect");
    });

    if (correct) {
      state.score += 1;
      scoreValue.textContent = String(state.score);
      feedback.classList.add("ok");
      feedback.textContent = t("correct", { explanation: currentQuestion.explanation });
    } else {
      feedback.classList.add("ko");
      feedback.textContent = t("incorrect", { explanation: currentQuestion.explanation });
    }

    nextBtn.disabled = false;
  }

  function showResult() {
    const pct = Math.round((state.score / state.questions.length) * 100);
    resultSummary.textContent = t("resultSummary", { score: state.score, total: state.questions.length, pct });
    resultMessage.textContent = pct === 100 ? t("resultPerfect") : pct >= 70 ? t("resultGreat") : t("resultRetry");

    markTopicComplete();

    const track = `${state.grade.id}__${state.subject.id}__${state.topic}`;
    if (pct === 100) {
      sessionStorage.setItem(`rewardUnlocked:${track}`, "true");
      rewardLink.href = `reward.html?track=${encodeURIComponent(track)}`;
      rewardLink.classList.remove("hidden");
    } else {
      sessionStorage.removeItem(`rewardUnlocked:${track}`);
      rewardLink.classList.add("hidden");
    }

    showPanel("result");
  }

  function rerenderForLanguage() {
    applyStaticTranslations();
    if (!wheelResult.dataset.picked) wheelResult.textContent = t("wheelReady");
    renderGrades();
    if (state.grade) {
      renderSubjects();
      if (state.subject) {
        renderTopics();
        if (!panels.quiz.classList.contains("hidden") && state.topic) {
          renderQuestion();
        }
      }
    }
  }


  settingsToggle.addEventListener("click", () => {
    langPickerPanel.classList.toggle("hidden");
  });

  languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    rerenderForLanguage();
  });


  let currentRotation = 0;
  spinBtn.addEventListener("click", () => {
    if (!state.grade) return;
    spinBtn.disabled = true;
    const extraTurns = 4 + Math.floor(Math.random() * 4);
    currentRotation += extraTurns * 360 + Math.random() * 360;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      const available = curriculum.subjects.filter((item) => !isSubjectLockedForSelection(item.id));
      if (!available.length) {
        wheelResult.textContent = t("subjectLocked", { subject: localizedSubjectName(state.language, state.lockedSubject) });
      } else {
        const picked = available[Math.floor(Math.random() * available.length)];
        wheelResult.textContent = t("wheelPicked", { subject: localizedSubjectName(state.language, picked.id) });
        wheelResult.dataset.picked = "1";
        selectSubject(picked);
      }
      spinBtn.disabled = false;
    }, 2800);
  });

  nextBtn.addEventListener("click", () => {
    state.current += 1;
    renderQuestion();
  });

  backToGrade.addEventListener("click", () => showPanel("grade"));
  backToSubject.addEventListener("click", () => showPanel("subject"));
  backToTopic.addEventListener("click", () => showPanel("topic"));

  retryBtn.addEventListener("click", startQuiz);
  newTopicBtn.addEventListener("click", () => showPanel("topic"));
  newGradeBtn.addEventListener("click", () => showPanel("grade"));

  applyStaticTranslations();
  renderGrades();
  showPanel("grade");
})();
