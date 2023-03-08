(function () {
  //即時関数発動

  ////////ここから/////////////////

  //------関数定義-------------
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
  }
  //---ここまで、シャッフル用関数
  //------関数、ここまで--------

  //------変数定義-------------
  //---DOM操作関連
  const cardImg = document.getElementById("cardImg"); //カード画像表示
  const cardPosition = document.getElementById("cardPosition"); //正逆表示
  const cardName = document.getElementById("cardName"); //カード名表示
  const notes1 = document.getElementById("notes1");
  const notes2 = document.getElementById("notes2");
  const notes3 = document.getElementById("notes3");
  //---ボタン関連
  const selectRadio = document.forms.selectPosition; //正逆ラジオボタン
  const shuffleButton = document.getElementById("shuffleButton"); //シャッフルボタン
  const dealButton = document.getElementById("dealButton"); //1枚引くボタン
  const resetButton = document.getElementById("resetButton"); //リセットボタン

  //---カードデータ関連
  const cac = [
    //★ ca(ad) + c ★ //カードデータ格納配列
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

  //---正逆関連
  const dicePosition = [0, 1];
  let resultPosition = 0; //正逆結果
  const posp = [
    //★ pos(ition) + p ★ //正逆格納配列
    { position: 0, word: "正位置", disp: "right" },
    { position: 1, word: "逆位置", disp: "reverse" }
  ];

  //---各種変数
  let arrNums = []; //シャッフル完了数字格納
  let resultCard = 0; //1枚引き結果
  let nn = 0; //引いた枚数

  //------変数、ここまで--------

  ////////初期配置////////////////////////////////////////
  function reset() {
    cardImg.innerHTML = `<img src="./image/card_ura_01.png" id="back" />`;
    cardPosition.innerText = `－－－`;
    cardName.innerText = `－－－－－－－`;
    arrNums = [...Array(cac.length).keys()];
    shuffle(arrNums);
    notes1.textContent = `　　※1 大、小アルカナ${arrNums.length}枚のみ`;
    notes2.textContent = `　　※2 引ける枚数は3枚まで`;
    notes3.innerHTML = `　　※3 出典: フリー百科事典ウィキペディア<br>　　(Wikipedia)`;
    nn = 0; //タロットを引いた枚数、0枚にリセット
    shuffleButton.disabled = false;
    dealButton.disabled = false;
  }
  reset();
  ////////初期配置、ここまで////////////////////////////////////////

  //------スクリプト記述--------
  //---シャッフルボタン、イベント
  shuffleButton.addEventListener(
    "click",
    () => {
      shuffle(arrNums);
      cardImg.innerHTML = `<img src="./image/card_ura_01.png" id="back" class="keyframe0 animation" />`;
      console.log(arrNums);
    },
    false
  );

  //---1枚引くボタン、イベント
  dealButton.addEventListener(
    "click",
    () => {
      resultCard = arrNums.pop();
      console.log(resultCard);

      if (selectRadio.positions.value === "0") {
        resultPosition = 0;
      } else {
        shuffle(dicePosition);
        resultPosition = dicePosition[0];
      }

      cardImg.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/${cac[resultCard].img}" id="${posp[resultPosition].disp}"></img>`;
      cardName.innerHTML = `${cac[resultCard].name}`;
      cardPosition.innerHTML = `${posp[resultPosition].word}`;
      shuffleButton.disabled = true;
      nn++;
      if (nn >= 3) {
        dealButton.disabled = true;
      }
    },
    false
  );

  //---リセットボタン、イベント
  resetButton.addEventListener("click", reset, false);

  //------スクリプト、ここまで---

  //////ここまで////////////////////
})(); //即時関数終了
