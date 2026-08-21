const fortunes = [
  {
    name: "大吉",
    reading: "追い風は、もう静かに吹いています。\n手にしているものを信じて、ひとつ先へ進みましょう。",
    wish: "温めてきた願いに、形が見えはじめる。",
    relationship: "素直なひと言が、思いがけない扉をひらく。",
    lucky: "深い緑、朝の光、あたたかい飲み物。",
  },
  {
    name: "中吉",
    reading: "急がなくても、道は続いています。\n目の前の小さな整えごとが、明日の余白をつくるでしょう。",
    wish: "順序を整えれば、穏やかに前へ進む。",
    relationship: "相手の話を最後まで聞くと、縁が深まる。",
    lucky: "藍色、古い本、静かな音楽。",
  },
  {
    name: "小吉",
    reading: "ささやかな偶然に、今日の答えが隠れています。\nいつもと少し違う選択を、軽やかに試してみてください。",
    wish: "寄り道の先で、よい手がかりを得る。",
    relationship: "短い連絡が、心地よい往復を生む。",
    lucky: "薄金色、散歩道、旬の果物。",
  },
  {
    name: "吉",
    reading: "今は、種をまくときです。\nすぐに答えを求めず、続けたいことに静かに手を添えましょう。",
    wish: "日々の積み重ねが、確かな実りへ変わる。",
    relationship: "気負わない笑顔が、よい出会いを招く。",
    lucky: "生成り、手帳、新しいペン。",
  },
  {
    name: "末吉",
    reading: "まだ見えないことを、怖がらなくて大丈夫。\n足元を照らす小さな灯りを頼りに、一歩ずつ進みましょう。",
    wish: "時間を味方につければ、思いは育っていく。",
    relationship: "ほどよい距離が、互いの心を守る。",
    lucky: "月白、湯気、整った机。",
  },
  {
    name: "凶",
    reading: "立ち止まることも、進むためのひとつの選択です。\n今日は自分をいたわり、明日のために心を休ませましょう。",
    wish: "焦りを手放したとき、見えるものがある。",
    relationship: "無理に合わせず、素直な気持ちを大切に。",
    lucky: "墨色、深呼吸、早めの休息。",
  },
];

const maxDraws = 3;
const drawButton = document.querySelector("#draw-button");
const redrawButton = document.querySelector("#redraw-button");
const fortuneCard = document.querySelector("#fortune-card");
const fortunePrompt = document.querySelector("#fortune-prompt");
const fortuneResult = document.querySelector("#fortune-result");
const drawCounter = document.querySelector("#draw-counter");
const stageNumber = document.querySelector("#stage-number");
const nightmareOverlay = document.querySelector("#nightmare-overlay");

const fortuneName = document.querySelector("#fortune-name");
const fortuneNumber = document.querySelector("#fortune-number");
const fortuneReading = document.querySelector("#fortune-reading");
const wishDetail = document.querySelector("#wish-detail");
const relationshipDetail = document.querySelector("#relationship-detail");
const luckyDetail = document.querySelector("#lucky-detail");

let drawCount = 0;
let lastFortuneIndex = -1;
let nightmareFadeTimer;
let nightmareResetTimer;

function chooseFortuneIndex() {
  if (fortunes.length === 1) return 0;

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * fortunes.length);
  } while (nextIndex === lastFortuneIndex);

  return nextIndex;
}

function updateDrawCounter() {
  const remainingDraws = maxDraws - drawCount;
  drawCounter.textContent = `今宵の抽選　残り ${remainingDraws} 回`;
}

function fillFortune(fortune, number) {
  const formattedNumber = String(number).padStart(2, "0");

  fortuneNumber.textContent = `FORTUNE ${formattedNumber}`;
  stageNumber.textContent = formattedNumber;
  fortuneName.textContent = fortune.name;
  fortuneReading.innerHTML = fortune.reading.replace("\n", "<br>");
  wishDetail.textContent = fortune.wish;
  relationshipDetail.textContent = fortune.relationship;
  luckyDetail.textContent = fortune.lucky;
}

function resetFortune() {
  window.clearTimeout(nightmareFadeTimer);
  window.clearTimeout(nightmareResetTimer);

  nightmareOverlay.classList.remove("is-visible", "is-fading");
  nightmareOverlay.hidden = true;
  nightmareOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-nightmare");

  drawCount = 0;
  lastFortuneIndex = -1;
  stageNumber.textContent = "01";
  fortunePrompt.hidden = false;
  fortuneResult.hidden = true;
  fortuneCard.classList.remove("is-drawing", "is-locked");
  fortuneCard.removeAttribute("aria-busy");
  updateDrawCounter();

  window.scrollTo({ top: 0, behavior: "auto" });
  drawButton.focus({ preventScroll: true });
}

function showNightmare() {
  if (fortuneCard.classList.contains("is-locked")) return;

  fortuneCard.classList.add("is-locked");
  nightmareOverlay.hidden = false;
  nightmareOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-nightmare");

  window.requestAnimationFrame(() => {
    nightmareOverlay.classList.add("is-visible");
  });

  nightmareFadeTimer = window.setTimeout(() => {
    nightmareOverlay.classList.add("is-fading");
  }, 4250);

  nightmareResetTimer = window.setTimeout(resetFortune, 5000);
}

function revealFortune() {
  if (fortuneCard.classList.contains("is-drawing") || fortuneCard.classList.contains("is-locked")) return;

  if (drawCount >= maxDraws) {
    showNightmare();
    return;
  }

  const nextIndex = chooseFortuneIndex();
  const fortune = fortunes[nextIndex];
  drawCount += 1;
  lastFortuneIndex = nextIndex;

  fortuneCard.classList.add("is-drawing");
  fortuneCard.setAttribute("aria-busy", "true");

  window.setTimeout(() => {
    fillFortune(fortune, drawCount);
    fortunePrompt.hidden = true;
    fortuneResult.hidden = false;
    fortuneCard.classList.remove("is-drawing");
    fortuneCard.removeAttribute("aria-busy");
    updateDrawCounter();
    redrawButton.focus({ preventScroll: true });
  }, 330);
}

drawButton.addEventListener("click", revealFortune);
redrawButton.addEventListener("click", revealFortune);
