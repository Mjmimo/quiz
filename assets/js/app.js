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
    answered: false
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
    curriculum.subjects.forEach((subject) => {
      subjectGrid.appendChild(buttonCard(subject.label, `${subject.topics.length} topics available`, () => {
        state.subject = subject;
        state.topic = null;
        renderTopics();
        showPanel("topic");
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
    state.questions = state.topic.questionBuilder(band);
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

    quizTitle.textContent = `${state.grade.label} • ${state.subject.label} • ${state.topic.label}`;
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
