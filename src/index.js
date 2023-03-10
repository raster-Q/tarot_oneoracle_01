(function () {
  //即時関数発動

  ////////ここから/////////////////

  //------関数定義------------//
  //---シャッフル用関数
  function shuffle(arr) {
    let n = arr.length;
    let temp, i;

    while (n) {
      i = Math.floor(Math.random() * n--);
      temp = arr[n];
      arr[n] = arr[i];
      arr[i] = temp;
    }
    return arr;
  } //---ここまで、シャッフル用関数
  //------関数、ここまで--------//

  //------DOM操作定義----------//
  //---HTML操作
  const cardImg = document.getElementById("cardImg"); //カード画像表示
  const cardPosition = document.getElementById("cardPosition"); //正逆表示
  const cardName = document.getElementById("cardName"); //カード名表示
  const notes1 = document.getElementById("notes1"); //※1用
  const notes2 = document.getElementById("notes2"); //※2用
  const notes3 = document.getElementById("notes3"); //※3用
  const oracle1 = document.getElementById("oracle1"); //1枚目
  const oracle2 = document.getElementById("oracle2"); //2枚目
  const oracle3 = document.getElementById("oracle3"); //3枚目
  const nowDate = document.getElementById("nowDate"); //時間
  const spreadNumber = document.getElementById("spreadNumber"); //
  //---ボタン関連

  const selectRadio = document.forms.selectPosition; //正逆ラジオボタン
  const shuffleButton = document.getElementById("shuffleButton"); //シャッフルボタン
  const dealButton = document.getElementById("dealButton"); //1枚引くボタン
  const resetButton = document.getElementById("resetButton"); //リセットボタン //---カードデータ2次元配列 //-★ ca(ad) + c ★
  const leftButon = document.getElementById("leftButton"); //ログ用左ボタン
  const rightButton = document.getElementById("rightButton"); //ログ用右ボタン

  //------DOM操作、ここまで------//

  //------配列定義--------------//
  //---カードデータ2次元配列
  //-★ c(ard) + c ★
  const cac = [
    { img: "d/de/RWS_Tarot_01_Magician.jpg", name: "魔術師" },
    { img: "d/d7/RWS_Tarot_13_Death.jpg", name: "死神" },
    { img: "d/db/RWS_Tarot_17_Star.jpg", name: "星" },
    { img: "f/ff/RWS_Tarot_21_World.jpg", name: "世界" },
    { img: "0/0f/Wands02.jpg", name: "ワンド2" },
    { img: "9/9d/Wands05.jpg", name: "ワンド5" },
    { img: "/3/35/Cups04.jpg", name: "カップ4" },
    { img: "6/60/Cups08.jpg", name: "カップ8" },
    { img: "9/9f/Pents02.jpg", name: "ペンタクル2" },
    { img: "8/88/Pents13.jpg", name: "ペンタクルQ" },
    { img: "1/1a/Swords01.jpg", name: "ソードA" },
    { img: "3/33/Swords14.jpg", name: "ソードK" }
  ];

  //---正逆2次元配列
  //-★ pos(ition) + p ★
  const posp = [
    { position: 0, word: "正位置", disp: "right" },
    { position: 1, word: "逆位置", disp: "reverse" }
  ];

  //------配列、ここまで----------------//

  //------オブジェクト定義--------------//
  //---ログ用連想格納
  //-★ lo(g) + l ★
  const lol = {
    log: {
      tarot: [],
      position: [],
      date: null,
      spreadNumber: 0
    },
    date: null,
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    time: null,
    num: 0,
    oracle: [oracle1, oracle2, oracle3],
    now: function (Date) {
      this.date = `${Date.getFullYear()}/${
        Date.getMonth() + 1
      }/${Date.getDate()}/${this.day[Date.getDay()]}`;
      this.time = `${Date.getHours()}:${Date.getMinutes()}:${Date.getSeconds()}`;
    }
  };

  //---ダイス連想格納
  const dice = {
    tarot: [],
    position: [0, 1]
  };

  //---出目（ダイス）格納
  const result = {
    tarot: null,
    position: null
  };

  //------オブジェクト、ここまで---------//

  //------各種変数-------------
  let nn = 0; //引いた枚数
  let timerID = null; //時間取得用タイマーID
  const place = `<img src="./image/card_ura_01.png" alt="カードの裏" id="${
    posp[result.position]
  }.disp" />`;

  //------変数、ここまで--------

  //------クラス関連------------
  class oracle {
    constructor(date) {
      this.date = date;
    }

    makeTable() {
      switch (nn) {
        case 0:
          console.log("けーす0");
          console.log(this.date);
          break;
        case 1:
          console.log("けーす1");
          console.log(this.date);
          break;
        default:
          console.log("defo");
      }
    }
  }

  //------クラス、ここまで-------

  ////////初期配置////////////////////////////////////////
  //---初期読み込みで、各種DOM操作
  leftButon.disabled = true; //初期読み込みで、押せない様に
  rightButton.disabled = true; //初期読み込みで、押せない様に
  spreadNumber.innerHTML = `No.${lol.log.spreadNumber + 1}`; //初期読み込み時、スプレッドナンバー表示

  function reset() {
    cardImg.innerHTML = `<img src="./image/card_ura_01.png" alt="カードの裏" id="back" />`; //カード裏面
    cardPosition.innerText = `－－－`;
    cardName.innerText = `－－－－－－`;
    dice.tarot = [...Array(cac.length).keys()]; //タロットの使用枚数を配列に取得
    shuffle(dice.tarot); //初期読み込みで、すぐにカードシャッフル
    notes1.textContent = `※1 カード枚数${dice.tarot.length}枚のみ`;
    notes2.textContent = `※2 引ける枚数は3枚まで`;
    notes3.innerHTML = `※3 カード裏面画像 出典:<br>　　「無料イラストなら「イラストAC」`;
    nn = 0; //タロットを引いた枚数、0枚にリセット
    shuffleButton.disabled = false; //シャッフルは、押せるように
    resetButton.disabled = true; //リセットは、押せるように
    dealButton.disabled = false; //1枚引くは、押せるように
    oracle1.innerHTML = ``; //表示を切る
    oracle2.innerHTML = ``; //表示を切る
    oracle3.innerHTML = ``; //表示を切る
    spreadNumber.innerHTML = `No.${lol.log.spreadNumber + 1}`; //スプレッドナンバー表示
  }
  reset();

  //---初期読み込みで、時間取得用のタイマー発動
  if (timerID === null) {
    timerID = setInterval(() => {
      lol.now(new Date());
      nowDate.innerHTML = `${lol.date}<br>${lol.time}`;
    }, 10);
  }
  ////////初期配置、ここまで////////////////////////////////////////

  //------スクリプト記述--------
  //---シャッフルボタン、イベント
  shuffleButton.addEventListener(
    "click",
    () => {
      shuffle(dice.tarot);
      cardImg.innerHTML = `<img src="./image/card_ura_01.png" alt="カードの裏" id="back" class="keyframe0 animation" />`;
    },
    false
  ); //class追加により、cssによる画像のアニメーションを実現

  //---1枚引くボタン、イベント

  //---ダイスの正逆判定
  dealButton.addEventListener(
    "click",
    () => {
      result.card = dice.tarot.pop(); //ダイスから1枚pop

      if (selectRadio.positions.value === "0") {
        result.position = 0; //正位置のみ
      } else {
        shuffle(dice.position); //逆位置ありの場合のダイス判定
        result.position = dice.position[0];
      }

      //引いたタロットカードの表示、ワンオラクル台
      cardImg.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/${
        cac[result.card].img
      }" id="${posp[result.position].disp}" alt="${
        cac[result.card].name
      }" ></img>`;

      //引いたタロットカードの表示、スプレッド台
      lol.oracle[
        nn
      ].innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/${
        cac[result.card].img
      }" id="${posp[result.position].disp}" alt="${
        cac[result.card].name
      }" ></img>`;

      //DOM操作
      notes3.innerHTML = `※3 タロットカード画像 出典:<br>　　フリー百科事典ウィキペディア (Wikipedia)`;
      cardName.innerHTML = `${cac[result.card].name}`;
      cardPosition.innerHTML = `${posp[result.position].word}`;
      shuffleButton.disabled = true;

      if (nn >= 3) {
        dealButton.disabled = true;
      } else {
        resetButton.disabled = false;
      }

      //引いた時の日時取得
      if (nn === 0) {
        lol.now(new Date());
        nowDate.innerHTML = `${lol.date}<br>${lol.time}`;
        lol.log.date = `${lol.date}<br>${lol.time}`;
        console.log(lol.log.date);
        console.log(place);
      }

      //何枚引いたかカウント、加算
      nn++;

      //lolへ、ログ用のデータ入力
    },
    false
  );

  //---リセットボタン、イベント
  resetButton.addEventListener(
    "click",
    () => {
      lol.log.spreadNumber++;
      reset();
    },
    false
  );

  //------スクリプト、ここまで---

  //////ここまで////////////////////
})(); //即時関数終了
