import "./App.scss";
import React, { useEffect, useState } from "react";

function App() {
  const [mymoney, setMymoney] = useState(100);
  const [canva, setCanva] = useState(true);
  const [crowd, setCrowd] = useState(false);
  const say = ["음...", "오...", "이정도면...", "이게뭐지?", "과연...", "대단해!", "최악이군", "훌륭해!", "마음에 드는군"];
  const [saystate, setSaystate] = useState(["", "", "", "", ""]);
  const [grade, setGrade] = useState("");
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(0);

  function sayFunc() {
    let arr = [];

    for (let i = 0; i < 5; i++) {
      arr[i] = say[Math.floor(Math.random() * say.length)];
    }
    setSaystate(arr);
    setTimeout(() => {
      sayFunc();
    }, 3000);
  }
  function gradeFunc() {
    let random = Math.floor(Math.random() * 100);
    setMymoney(mymoney + random);
    switch (random) {
      case random > 96:
        setGrade("다빈치의 재림인가?");
        break;
      case random > 89:
        setGrade("눈물이 흐르는군, 감동적이야");
        break;
      case random > 77:
        setGrade("훌륭한 그림이야!");
        break;
      case random > 60:
        setGrade("거실에 전시해야겠어");
        break;
      case random > 40:
        setGrade("이정도면 괜찮은데?");
        break;
      case random > 23:
        setGrade("나쁘지 않아");
        break;
      case random > 11:
        setGrade("다빈치의 재림인가?");
        break;
      case random > 4:
        setGrade("형편없는 그림이군");
        break;
      default:
        setGrade("휴지로 쓰면 딱이겠군");
        break;
    }
    return random;
  }
  function buy() {
    setCrowd(false);
    if (canva) {
      alert("이미 캔버스가 있습니다.");
    } else {
      if (mymoney >= 40) {
        setCanva(true);
        setMymoney(mymoney - 40);
      } else {
        alert("파산한 길거리 예술가...");
      }
    }
  }
  function sell() {
    if (canva) {
      setCanva(false);
      setCrowd(true);

      sayFunc();
      setTimeout(() => {
        setCrowd(false);
        let point = gradeFunc();
        setPrice(point);
        setModal(true);
      }, 6000);
    } else {
      alert("판매할 캔버스가 없습니다.");
    }
  }

  useEffect(() => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="App">
      <header>
        <span>해당 페이지는 1920x1080해상도에 최적화 되어있습니다.</span>
        <p>보유금 : {mymoney}</p>
      </header>
      <main>
        <section className="draw">
          <div className="easel"></div>
          <canvas width={300} height={400} className={canva ? "canvas on" : "canvas"}></canvas>
          <div className="btn_box">
            {crowd ? (
              <button type="button" onClick={buy} className="buy_canvas" disabled>
                캔버스 구매
              </button>
            ) : (
              <button type="button" onClick={buy} className="buy_canvas">
                캔버스 구매
              </button>
            )}

            {canva ? (
              <button type="button" onClick={sell} className="sell_painting">
                그림 판매
              </button>
            ) : (
              <button type="button" onClick={sell} className="sell_painting" disabled>
                그림 판매
              </button>
            )}
          </div>
        </section>
        <section className="sell">
          <div className={crowd ? "painting_wrap on" : "painting_wrap"}></div>
          <div className={crowd ? "crowd on" : "crowd"}>
            <div className="crowd_say">
              {saystate.map((say, key) => {
                return (
                  <p className={crowd ? "on" : ""} key={key}>
                    {say}
                  </p>
                );
              })}
            </div>
            <div className="crowd_img"></div>
          </div>
        </section>
        <div className={modal ? "modal on" : "modal"}>
          <div className="sell_info">
            <p>{grade}</p>
            <p>{price}원을 받았습니다.</p>
            <button onClick={() => setModal(false)}>확인</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
