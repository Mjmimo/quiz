(function () {
  const app = document.getElementById("quiz-app");
  if (!app || typeof curriculum === "undefined") return;

  const state = {
    grade: null,
    subject: null,
    topic: null,
    questions: [],
    current: 0,
    score: 0,
    answered: false,
    usedSubjectsByGrade: {}
  };

  const panels = {
    grade: document.getElementById("grade-panel"),
    subject: document.getElementById("subject-panel"),
    topic: document.getElementById("topic-panel"),
    quiz: document.getElementById("quiz-panel"),
    result: document.getElementById("result-panel")
  };

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
  const nextBtn = document.getElementById("next-btn");

  const resultSummary = document.getElementById("result-summary");
  const resultMessage = document.getElementById("result-message");

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
    curriculum.grades.forEach((grade) => {
      gradeGrid.appendChild(buttonCard(grade.label, "Start from this school level", () => {
        state.grade = grade;
        state.subject = null;
        state.topic = null;
        renderSubjects();
        showPanel("subject");
      }));
    });
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
      }));
    });
  }

  function renderTopics() {
    topicGrid.innerHTML = "";
    topicContext.textContent = `${state.grade.label} • ${state.subject.label}`;
    state.subject.topics.forEach((topic) => {
      topicGrid.appendChild(buttonCard(topic.label, `Level-adapted quiz for ${state.grade.label}`, () => {
        state.topic = topic;
        startQuiz();
      }));
    });
  }

  function startQuiz() {
    const band = getLevelBand(state.grade.id);

    const baseQuestions = state.subject.id === "maths"
      ? state.topic.questionBuilder(band)
      : state.subject.topics.flatMap((topic) => topic.questionBuilder(band));

    state.questions = buildQuestionsForGrade(baseQuestions);
    state.current = 0;
    state.score = 0;
    state.answered = false;
    scoreValue.textContent = "0";
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
      feedback.textContent = `Correct! ${currentQuestion.explanation}`;
    } else {
      feedback.classList.add("ko");
      feedback.textContent = `Not quite. ${currentQuestion.explanation}`;
    }

    nextBtn.disabled = false;
  }

  function showResult() {
    const pct = Math.round((state.score / state.questions.length) * 100);
    resultSummary.textContent = `You scored ${state.score} out of ${state.questions.length} (${pct}%).`;
    resultMessage.textContent = pct === 100
      ? "Excellent work — full marks!"
      : pct >= 70
        ? "Great progress! Try another topic to keep building confidence."
        : "Good effort. Review and retry this topic to improve.";

    showPanel("result");
  }

  nextBtn.addEventListener("click", () => {
    state.current += 1;
    renderQuestion();
  });

  document.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", () => showPanel(btn.dataset.back));
  });

  document.getElementById("retry-btn").addEventListener("click", startQuiz);
  document.getElementById("new-topic-btn").addEventListener("click", () => showPanel("topic"));
  document.getElementById("new-grade-btn").addEventListener("click", () => showPanel("grade"));

  renderGrades();
  showPanel("grade");
})();
