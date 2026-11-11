// おみくじの候補（大吉・中吉・小吉）
const RESULTS = ["大吉", "中吉", "小吉"];

const drawButton = document.getElementById("drawButton");
const resultText = document.getElementById("resultText");

// ランダムに運勢を1つ選ぶ抽選処理
function drawOmikuji() {
  const index = Math.floor(Math.random() * RESULTS.length);
  return RESULTS[index];
}

// ボタンを押したときにおみくじを引いて結果を表示する
drawButton.addEventListener("click", () => {
  const result = drawOmikuji();
  resultText.textContent = result;
});
