// おみくじの候補（大吉・中吉・小吉）
const RESULTS = ["大吉", "中吉", "小吉"];

// 結果ごとの表示スタイル用クラス
const RESULT_CLASS_MAP = {
  "大吉": "result-daikichi",
  "中吉": "result-chukichi",
  "小吉": "result-shokichi",
};

// 結果ごとに、コメントとラッキー情報の候補を用意する
const FORTUNE_DATA = {
  "大吉": [
    {
      comment: "新しい挑戦に追い風が吹く日。気になっていたことを始めてみましょう。",
      item: "新しいノート",
      color: "ゴールド",
      number: 7,
    },
    {
      comment: "積み重ねてきたことが実を結びそう。自信を持って一歩進みましょう。",
      item: "お気に入りのペン",
      color: "エメラルドグリーン",
      number: 8,
    },
  ],
  "中吉": [
    {
      comment: "周りと力を合わせると、よい流れが生まれそう。会話を楽しんでみましょう。",
      item: "ハンカチ",
      color: "ブルー",
      number: 3,
    },
    {
      comment: "いつもの工夫が小さな成果につながる日。自分のペースを大切に。",
      item: "マグカップ",
      color: "スカイブルー",
      number: 6,
    },
  ],
  "小吉": [
    {
      comment: "身近なところに小さな幸せがありそう。ひと息ついて見つけてみましょう。",
      item: "文庫本",
      color: "オレンジ",
      number: 2,
    },
    {
      comment: "小さな一歩を楽しめる日。無理せず、できたことを喜びましょう。",
      item: "しおり",
      color: "クリーム色",
      number: 5,
    },
  ],
};

const drawButton = document.getElementById("drawButton");
const resultText = document.getElementById("resultText");
const resultBox = document.getElementById("resultBox");
const fortuneDetails = document.getElementById("fortuneDetails");
const fortuneComment = document.getElementById("fortuneComment");
const luckyItem = document.getElementById("luckyItem");
const luckyColor = document.getElementById("luckyColor");
const luckyNumber = document.getElementById("luckyNumber");

// ランダムに運勢を1つ選ぶ抽選処理
function drawOmikuji() {
  const index = Math.floor(Math.random() * RESULTS.length);
  return RESULTS[index];
}

// 運勢と、その運勢に対応する候補をまとめて表示する
function showResult(result) {
  const candidates = FORTUNE_DATA[result];
  const fortune = candidates[Math.floor(Math.random() * candidates.length)];
  resultText.textContent = result;

  resultBox.classList.remove("result-daikichi", "result-chukichi", "result-shokichi");
  const resultClass = RESULT_CLASS_MAP[result];
  if (resultClass) {
    resultBox.classList.add(resultClass);
  }
  fortuneComment.textContent = fortune.comment;
  luckyItem.textContent = fortune.item;
  luckyColor.textContent = fortune.color;
  luckyNumber.textContent = fortune.number;
  fortuneDetails.hidden = false;
  drawButton.textContent = "もう一度引く";
}

// ボタンを押したときにおみくじを引いて結果を表示する
drawButton.addEventListener("click", () => {
  showResult(drawOmikuji());
});
