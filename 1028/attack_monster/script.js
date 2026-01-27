// 初期設定
const MAX_HP = 100;
const DAMAGE_MIN = 8;
const DAMAGE_MAX = 20;

//震えるアニメーション関数の定義
function shakeEnemy() {
  const enemyArea = document.querySelector('.enemy');
  enemyArea.classList.remove('hit');
  enemyArea.offsetWidth;//再描写のためのおまじない
  enemyArea.classList.add('hit');
}

function shakeEnemy2() {
  const enemyArea = document.querySelector('.enemy2');
  enemyArea.classList.remove('hit');
  enemyArea.offsetWidth;//再描写のためのおまじない
  enemyArea.classList.add('hit');
}

// 状態（HP）
let hp = MAX_HP;//100

// モンスター
const enemy = document.querySelector('.enemyImg');

// HP表示部分
const hpText = document.querySelector('.hpText span');
const hpBar = document.querySelector('.hpBar');

// 攻撃処理
const attackButton = document.querySelector('.attackBtn');
const attackButton2 = document.querySelector('.attackBtn2');

// 効果音を取得　
const seHit = document.querySelector('#se-hit');
console.log('seHit');

const sedead = document.querySelector('#se-dead');

// ①ランダムダメージの実装
attackButton.addEventListener('click', function () {
  const damage =
    Math.floor(Math.random() * (DAMAGE_MAX - DAMAGE_MIN + 1)) + DAMAGE_MIN;
  // ダメージ計算
  hp = hp - damage;
  hpText.textContent = hp;
  // ②HP表示の更新ロジック修正（マイナス値の防止）
  if (hp <= 0) {
    hpText.textContent = 0;
    hpBar.value = 0;
    // ③撃破時のエフェクト適用（enemy--fly または enemy--squash）
    enemy.classList.add('enemy--fly');
    // ⑦効果音の追加（オプション）
    //断末魔
    sedead.play();
    // ④撃破後のボタン無効化処理
    attackButton.disabled = true;
    // ⑤撃破メッセージの表示
    //変数に入れずに、そのまま.でつなぎ書き方でもOK
    document.querySelector('.log').textContent = 'モンスターを倒した！';
  } else {
    hpText.textContent = hp;
    hpBar.value = hp;
    // ⑥攻撃時の効果を追加
    shakeEnemy();
    // ⑦効果音の追加（オプション）
    seHit.currentTime = 0; //current = 現在
    seHit.play();
  }
});
// リスタート機能の実装（オプション）

/*2体目
-----------------------------------------------------------------------*/
//モンスター
const enemy2 = document.querySelector('.enemyImg2');

//状態（HP)
let hp2 = MAX_HP;

// HP表示部分
const hpText2 = document.querySelector('.hpText2 span');
const hpBar2 = document.querySelector('.hpBar2');

// ①ランダムダメージの実装
attackButton2.addEventListener('click', function () {
  const damage2 =
    Math.floor(Math.random() * (DAMAGE_MAX - DAMAGE_MIN + 1)) + DAMAGE_MIN;
  // ダメージ計算
  hp2 = hp2 - damage2;
  hpText2.textContent = hp2;
  // ②HP表示の更新ロジック修正（マイナス値の防止）
  if (hp2 <= 0) {
    hpText2.textContent = 0;
    hpBar2.value = 0;
    // ③撃破時のエフェクト適用（enemy--fly または enemy--squash）
    enemy2.classList.add('enemy--fly');
    // ⑦効果音の追加（オプション）
    //断末魔
    sedead.play();
    // ④撃破後のボタン無効化処理
    attackButton2.disabled = true;
    // ⑤撃破メッセージの表示
    //変数に入れずに、そのまま.でつなぎ書き方でもOK
    document.querySelector('.log2').textContent = 'モンスターを倒した！';
  } else {
    hpText2.textContent = hp2;
    hpBar2.value = hp2;
    // ⑥攻撃時の効果を追加
    shakeEnemy2();
    // ⑦効果音の追加（オプション）
    seHit.currentTime = 0; //current = 現在
    seHit.play();
  }
});
// リスタート機能の実装（オプション）