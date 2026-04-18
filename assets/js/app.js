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
    usedSubjectsByGrade: {}
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

  function shouldUseTopics(subjectId = state.subject?.id, gradeId = state.grade?.id) {
    return subjectId === "maths" && gradeId === "year7";
  }

  function buttonCard(label, description, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "subject-card option-card";
    button.innerHTML = `<h3>${label}</h3><p>${description}</p>`;
    button.addEventListener("click", onClick);
    return button;
  }

  function ensureGradeSubjectHistory(gradeId) {
    if (!state.usedSubjectsByGrade[gradeId]) {
      state.usedSubjectsByGrade[gradeId] = new Set();
    }
    return state.usedSubjectsByGrade[gradeId];
  }

  function pickFairRandomSubjectForGrade(gradeId) {
    const history = ensureGradeSubjectHistory(gradeId);
    const available = curriculum.subjects.filter((subject) => !history.has(subject.id));

    if (!available.length) {
      history.clear();
      return pickFairRandomSubjectForGrade(gradeId);
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    history.add(chosen.id);
    return chosen;
  }

  function stableHash(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function rngFromSeed(seed) {
    let value = seed || 1;
    return function next() {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function getShuffledIndices(size, randomFn) {
    const indices = Array.from({ length: size }, (_, idx) => idx);
    for (let i = indices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(randomFn() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }

  function removeSecondDuplicateChoice(question) {
    if (!Array.isArray(question.options) || question.options.length < 2) {
      return question;
    }

    if (question.options[1] !== question.options[0]) {
      return question;
    }

    const options = question.options.filter((_, idx) => idx !== 1);
    let answer = question.answer;
    if (answer === 1) {
      answer = 0;
    } else if (answer > 1) {
      answer -= 1;
    }

    return {
      ...question,
      options,
      answer
    };
  }

  function buildQuestionsForGrade(baseQuestions) {
    const topicSeed = state.topic ? state.topic.id : "all-topics";
    const seedText = `${state.grade.id}:${state.subject.id}:${topicSeed}`;
    const seedText = `${state.grade.id}:${state.subject.id}:${state.topic.id}`;
    return baseQuestions.map((question, questionIndex) => {
      const rng = rngFromSeed(stableHash(`${seedText}:${questionIndex}`));
      const order = getShuffledIndices(question.options.length, rng);
      const options = order.map((optionIndex) => question.options[optionIndex]);
      const answer = order.indexOf(question.answer);

      return removeSecondDuplicateChoice({
        ...question,
        options,
        answer
      });
    });
  }

  function renderGrades() {
    gradeGrid.innerHTML = "";
    getGradesForDisplay().forEach((grade) => {
      gradeGrid.appendChild(buttonCard(gradeLabel(grade), t("startFromLevel"), () => {
        state.grade = grade;
        state.subject = null;
        state.topic = null;
        state.questions = [];
        renderSubjects();
        showPanel("subject");
      }));
    });
  }

  function selectSubject(subject) {
    state.subject = subject;
    state.topic = null;

    if (shouldUseTopics()) {
      renderTopics();
      showPanel("topic");
      return;
    }

    startQuiz();
  }

  function renderSubjects() {
    subjectGrid.innerHTML = "";
    subjectContext.textContent = `Selected grade: ${state.grade.label}`;

    subjectGrid.appendChild(buttonCard("🎡 Fair random subject", "Spin the wheel: avoids repeats for this grade", () => {
      state.subject = pickFairRandomSubjectForGrade(state.grade.id);
      state.topic = null;

      if (state.subject.id === "maths") {
        renderTopics();
        showPanel("topic");
        return;
      }

      startQuiz();
      renderTopics();
      showPanel("topic");
    }));

    const renderedSubjectIds = new Set();
    curriculum.subjects.forEach((subject) => {
      if (renderedSubjectIds.has(subject.id)) {
        return;
      }
      renderedSubjectIds.add(subject.id);

      subjectGrid.appendChild(buttonCard(subject.label, `${subject.topics.length} topics available`, () => {
        state.subject = subject;
        state.topic = null;
        ensureGradeSubjectHistory(state.grade.id).add(subject.id);

        if (subject.id === "maths") {
          renderTopics();
          showPanel("topic");
          return;
        }

        startQuiz();
        renderTopics();
        showPanel("topic");
      }));
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
    const band = getLevelBand(state.grade.id);

    const baseQuestions = state.subject.id === "maths"
      ? state.topic.questionBuilder(band)
      : state.subject.topics.flatMap((topic) => topic.questionBuilder(band));

    const baseQuestions = state.topic.questionBuilder(band);
    state.questions = buildQuestionsForGrade(baseQuestions);
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

    quizTitle.textContent = state.topic
      ? `${state.grade.label} • ${state.subject.label} • ${state.topic.label}`
      : `${state.grade.label} • ${state.subject.label}`;
    quizProgress.textContent = `Question ${state.current + 1} of ${state.questions.length}`;
    const quizTrackLabel = shouldUseTopics()
      ? `${gradeLabel(state.grade)} • ${localizedSubjectName(state.language, state.subject.id)} • ${localizedTopicName(state.language, state.topic)}`
      : `${gradeLabel(state.grade)} • ${localizedSubjectName(state.language, state.subject.id)}`;
    quizTitle.textContent = quizTrackLabel;
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

    const track = shouldUseTopics() ? `${state.grade.id}__${state.subject.id}__${state.topic}` : `${state.grade.id}__${state.subject.id}`;
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
        if (shouldUseTopics()) {
          renderTopics();
        }
        const hasActiveTrack = shouldUseTopics() ? Boolean(state.topic) : Boolean(state.subject);
        if (!panels.quiz.classList.contains("hidden") && hasActiveTrack) {
          renderQuestion();
        }
      }
    }
  }

  function getAvailableSubjectsForGrade() {
    const gradeId = state.grade.id;
    const used = new Set(state.wheelHistoryByGrade[gradeId] || []);
    let available = curriculum.subjects.filter((subject) => !used.has(subject.id));

    if (!available.length) {
      state.wheelHistoryByGrade[gradeId] = [];
      available = curriculum.subjects.slice();
    }

    return available;
  }

  function rememberWheelPick(gradeId, subjectId) {
    if (!state.wheelHistoryByGrade[gradeId]) {
      state.wheelHistoryByGrade[gradeId] = [];
    }
    state.wheelHistoryByGrade[gradeId].push(subjectId);
  }

  function shuffle(list) {
    const clone = list.slice();
    for (let i = clone.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
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
      const available = getAvailableSubjectsForGrade();
      if (!available.length) {
        wheelResult.textContent = t("wheelReady");
      } else {
        const picked = available[Math.floor(Math.random() * available.length)];
        rememberWheelPick(state.grade.id, picked.id);
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
  backToTopic.addEventListener("click", () => showPanel("subject"));

  retryBtn.addEventListener("click", startQuiz);
  newTopicBtn.addEventListener("click", () => showPanel(shouldUseTopics() ? "topic" : "subject"));
  newGradeBtn.addEventListener("click", () => showPanel("grade"));

  applyStaticTranslations();
  renderGrades();
  stepTopic.classList.add("hidden");
  panels.topic.classList.add("hidden");
  showPanel("grade");
})();
