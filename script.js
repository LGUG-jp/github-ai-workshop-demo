// おみくじの候補（大吉・中吉・小吉）
const RESULTS = ["大吉", "中吉", "小吉"];

// 結果ごとの表示スタイル用クラス
const RESULT_CLASS_MAP = {
  "大吉": "result-daikichi",
  "中吉": "result-chukichi",
  "小吉": "result-shokichi",
};

const drawButton = document.getElementById("drawButton");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("resultBox");

// ランダムに運勢を1つ選ぶ抽選処理
function drawOmikuji() {
  const index = Math.floor(Math.random() * RESULTS.length);
  return RESULTS[index];
}

// ボタンを押したときにおみくじを引いて結果を表示する
drawButton.addEventListener("click", () => {
  const result = drawOmikuji();
  resultText.textContent = result;

  resultBox.classList.remove("result-daikichi", "result-chukichi", "result-shokichi");
  const resultClass = RESULT_CLASS_MAP[result];
  if (resultClass) {
    resultBox.classList.add(resultClass);
  }
});
