(function () {
  const params = new URLSearchParams(window.location.search);
  const reward = params.get("reward");
  const track = params.get("track");

  const validRewards = ["Brownie", "Cookie", "Cupcake"];
  const winMessage = document.getElementById("win-message");
  const winDetail = document.getElementById("win-detail");

  if (!reward || !validRewards.includes(reward) || !track) {
    winMessage.textContent = "Reward unavailable";
    winDetail.textContent = "Please unlock a reward by scoring full marks in a quiz.";
    return;
  }

  const isUnlocked = sessionStorage.getItem(`rewardUnlocked:${track}`) === "true";
  if (!isUnlocked) {
    winMessage.textContent = "Reward locked";
    winDetail.textContent = "You need a perfect score first.";
    return;
  }

  winMessage.textContent = "Congratulations";
  winDetail.textContent = `You chose: ${reward}`;
})();
