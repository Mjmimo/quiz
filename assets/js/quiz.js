(function () {
  const quizRoot = document.querySelector(".quiz-shell");

  if (!quizRoot) {
    return;
  }

  const subjectKey = quizRoot.dataset.subject;
  const questions = quizBank[subjectKey] || [];

  const progressEl = document.getElementById("quiz-progress");
  const questionEl = document.getElementById("question-text");
  const choicesEl = document.getElementById("choices");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score-value");
  const nextBtn = document.getElementById("next-btn");

  const resultSection = document.getElementById("quiz-result");
  const finalScoreText = document.getElementById("final-score-text");
  const finalMessage = document.getElementById("final-message");
  const restartBtn = document.getElementById("restart-btn");
  const rewardLink = document.getElementById("reward-link");

  let currentIndex = 0;
  let score = 0;
  let isAnswered = false;

  function getPerformanceMessage(percent) {
    if (percent === 100) return "Outstanding! You got everything correct.";
    if (percent >= 75) return "Great work! You have strong mastery of this subject.";
    if (percent >= 50) return "Good effort! Review a few concepts and try again.";
    return "Keep practicing — every attempt helps you improve.";
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    if (!q) {
      showFinalScore();
      return;
    }

    progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    questionEl.textContent = q.question;
    choicesEl.innerHTML = "";
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    nextBtn.disabled = true;
    isAnswered = false;

    q.options.forEach((optionText, optionIndex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = optionText;
      btn.addEventListener("click", () => handleAnswer(optionIndex));
      choicesEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex) {
    if (isAnswered) {
      return;
    }

    isAnswered = true;
    const q = questions[currentIndex];
    const buttons = Array.from(choicesEl.querySelectorAll("button"));
    const isCorrect = selectedIndex === q.answer;

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === q.answer) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && !isCorrect) {
        button.classList.add("incorrect");
      }
    });

    if (isCorrect) {
      score += 1;
      scoreEl.textContent = String(score);
      feedbackEl.classList.add("ok");
      feedbackEl.textContent = `Correct! ${q.explanation}`;
    } else {
      feedbackEl.classList.add("ko");
      feedbackEl.textContent = `Not quite. ${q.explanation}`;
    }

    nextBtn.disabled = false;
  }

  function showFinalScore() {
    quizRoot.classList.add("hidden");
    resultSection.classList.remove("hidden");

    const percent = Math.round((score / questions.length) * 100);
    const unlocked = score === questions.length;

    finalScoreText.textContent = `You scored ${score} out of ${questions.length} (${percent}%).`;
    finalMessage.textContent = getPerformanceMessage(percent);

    if (rewardLink) {
      rewardLink.classList.add("hidden");
    }

    if (unlocked) {
      sessionStorage.setItem(`rewardUnlocked:${subjectKey}`, "true");
      if (rewardLink) {
        rewardLink.href = `../reward.html?subject=${encodeURIComponent(subjectKey)}`;
        rewardLink.classList.remove("hidden");
      }
      finalMessage.textContent += " Perfect score! Reward unlocked.";
    } else {
      sessionStorage.removeItem(`rewardUnlocked:${subjectKey}`);
    }
  }

  nextBtn.addEventListener("click", () => {
    currentIndex += 1;
    renderQuestion();
  });

  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = "0";
    resultSection.classList.add("hidden");
    quizRoot.classList.remove("hidden");
    if (rewardLink) {
      rewardLink.classList.add("hidden");
    }
    renderQuestion();
  });

  if (!questions.length) {
    questionEl.textContent = "No questions available for this subject yet.";
    progressEl.textContent = "";
    return;
  }

  renderQuestion();
})();
