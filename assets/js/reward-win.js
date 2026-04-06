(function () {
  const params = new URLSearchParams(window.location.search);
  const reward = params.get("reward");
  const subject = params.get("subject");

  const validRewards = ["Brownie", "Cookie", "Donuts", "Pancake"];
  const winMessage = document.getElementById("win-message");
  const winDetail = document.getElementById("win-detail");

  if (!reward || !validRewards.includes(reward) || !subject) {
    winMessage.textContent = "Reward unavailable";
    winDetail.textContent = "Please unlock a reward by scoring 4/4 in a subject quiz.";
    return;
  }

  const isUnlocked = sessionStorage.getItem(`rewardUnlocked:${subject}`) === "true";
  if (!isUnlocked) {
    winMessage.textContent = "Reward locked";
    winDetail.textContent = "You need a perfect score first.";
    return;
  }

  winMessage.textContent = "Congratulations";
  winDetail.textContent = `You chose: ${reward}`;
})();
