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

  //---ボタン関連
  //const selectPosition = document.getElementById("selectPosition"); //正逆ラジオボタン
  const shuffleButton = document.getElementById("shuffleButton"); //シャッフルボタン
  const dealButton = document.getElementById("dealButton"); //1枚引くボタン
  //const resetButton = document.getElementById("resetButton"); //リセットボタン

  //---カードデータ関連
  const cac = [
    //★ ca(ad) + c ★//カードデータ格納配列
    {
      img:
        "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
      name: "魔術師"
    },
    {
      img:
        "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
      name: "死神"
    },
    {
      img:
        "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
      name: "星"
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
      name: "ワンド2"
    }
  ];

  //---正逆関連
  let resultPosition = 1; //正逆結果
  const posp = [
    //★ pos(ition) + p ★//正逆格納配列
    { position: 0, word: "正", disp: 1 },
    { position: 1, word: "逆", disp: -1 }
  ];

  //---各種変数
  let arrNums = []; //シャッフル完了数字格納
  let resultCard = 0; //1枚引き結果

  //------変数、ここまで--------

  ////////初期配置////////////////////////////////////////
  arrNums = [...Array(cac.length).keys()];
  ////////初期配置、ここまで////////////////////////////////////////

  //------スクリプト記述--------
  //---シャッフルボタン、イベント
  shuffleButton.addEventListener(
    "click",
    function () {
      shuffle(arrNums);
      console.log(arrNums);
    },
    false
  );

  //---1枚引くボタン、イベント
  dealButton.addEventListener(
    "click",
    function () {
      resultCard = arrNums.pop();
      console.log(resultCard);
      console.log(cac[resultCard].img);
      cardImg.innerHTML = `<img src="${
        cac[resultCard].img
      }"  style="transform: scale(${posp[resultPosition].disp},${
        posp[resultPosition.disp]
      }); ></img>`;
      cardName.innerHTML = `${cac[resultCard].name}`;
      cardPosition.innerHTML = `${posp[resultPosition].word}`;
    },
    false
  );
  //------スクリプト、ここまで---

  //////ここまで////////////////////
})(); //即時関数終了
