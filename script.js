// おみくじの候補（大吉・中吉・小吉）
const RESULTS = ["大吉", "中吉", "小吉"];

// 結果ごとの表示スタイル用クラス
const RESULT_CLASS_MAP = {
  "大吉": "result-daikichi",
  "中吉": "result-chukichi",
  "小吉": "result-shokichi",
};

// 結果ごとに、コメント・ラッキー情報・詳細運勢の候補を用意する
const FORTUNE_DATA = {
  "大吉": [
    {
      comment: "新しい挑戦に追い風が吹く日。気になっていたことを始めてみましょう。",
      item: "新しいノート",
      color: "ゴールド",
      number: 7,
      work: "温めていた提案を伝える好機。具体的な一案を添えてみましょう。",
      money: "長く使えるものとの出会いがありそう。品質を見て選んでみて。",
      love: "素直な言葉が気持ちをつなぐ日。感謝を伝えてみましょう。",
    },
    {
      comment: "積み重ねてきたことが実を結びそう。自信を持って一歩進みましょう。",
      item: "お気に入りのペン",
      color: "エメラルドグリーン",
      number: 8,
      work: "これまでの努力が伝わりそう。仕上がった仕事を共有してみて。",
      money: "計画的な買い物に満足できそう。欲しかったものを比べてみましょう。",
      love: "一緒に楽しめる予定が関係を深めそう。気軽に誘ってみて。",
    },
  ],
  "中吉": [
    {
      comment: "周りと力を合わせると、よい流れが生まれそう。会話を楽しんでみましょう。",
      item: "ハンカチ",
      color: "ブルー",
      number: 3,
      work: "相談しながら進めると作業がはかどりそう。早めの共有を。",
      money: "買い物リストが役立つ日。必要なものから選ぶと気持ちよく使えそう。",
      love: "相手の話に耳を傾けると、新しい一面に気づけそう。",
    },
    {
      comment: "いつもの工夫が小さな成果につながる日。自分のペースを大切に。",
      item: "マグカップ",
      color: "スカイブルー",
      number: 6,
      work: "作業の順番を見直すと進めやすくなりそう。ひとつずつ片づけて。",
      money: "普段の支出を振り返ると、小さな節約の工夫が見つかりそう。",
      love: "短いあいさつが会話のきっかけに。自然なやり取りを楽しんで。",
    },
  ],
  "小吉": [
    {
      comment: "身近なところに小さな幸せがありそう。ひと息ついて見つけてみましょう。",
      item: "文庫本",
      color: "オレンジ",
      number: 2,
      work: "机の上を整えると、落ち着いて取り組めそう。身近な作業から。",
      money: "手持ちのものを使う楽しみが見つかりそう。引き出しをのぞいてみて。",
      love: "さりげない気遣いが喜ばれそう。相手のペースも大切に。",
    },
    {
      comment: "小さな一歩を楽しめる日。無理せず、できたことを喜びましょう。",
      item: "しおり",
      color: "クリーム色",
      number: 5,
      work: "小さな目標の達成が励みになりそう。今日できる量を決めてみて。",
      money: "お金をかけずに楽しめる日。散歩や読書で気分転換を。",
      love: "穏やかな会話を楽しめそう。身近な話題から話しかけてみましょう。",
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
const workFortune = document.getElementById("workFortune");
const moneyFortune = document.getElementById("moneyFortune");
const loveFortune = document.getElementById("loveFortune");

const DRAW_DURATION_MS = 800;
let isDrawing = false;

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
  workFortune.textContent = fortune.work;
  moneyFortune.textContent = fortune.money;
  loveFortune.textContent = fortune.love;
  fortuneDetails.hidden = false;
  drawButton.textContent = "もう一度引く";
}

// 演出中はボタンを無効にし、終了後に結果と補足情報を一緒に表示する
drawButton.addEventListener("click", () => {
  if (isDrawing) {
    return;
  }

  isDrawing = true;
  drawButton.disabled = true;
  drawButton.textContent = "抽選中…";
  resultBox.setAttribute("aria-busy", "true");
  fortuneDetails.hidden = true;
  resultBox.classList.remove("result-daikichi", "result-chukichi", "result-shokichi");
  resultText.textContent = "抽選中…";
  resultBox.classList.add("is-drawing");

  function finishDraw() {
    resultBox.classList.remove("is-drawing");
    showResult(drawOmikuji());
    resultBox.setAttribute("aria-busy", "false");
    drawButton.disabled = false;
    isDrawing = false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishDraw();
  } else {
    window.setTimeout(finishDraw, DRAW_DURATION_MS);
  }
});
