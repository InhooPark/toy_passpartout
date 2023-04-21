import "./App.scss";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [mymoney, setMymoney] = useState(100);
  const [canva, setCanva] = useState(false);
  const [crowd, setCrowd] = useState(false);
  const say = ["음...", "오...", "이정도면...", "이게뭐지?", "과연...", "대단해!", "최악이군", "훌륭해!", "마음에 드는군"];
  const [saystate, setSaystate] = useState(["", "", "", "", ""]);
  const [grade, setGrade] = useState("");
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  let drawing = false;

  function setColorFunc(a) {
    const canv = document.querySelector(".canvas");
    const ctx = canv.getContext("2d");
    ctx.strokeStyle = a;
  }

  function mousexy(e) {
    const canv = document.querySelector(".canvas");
    const ctx = canv.getContext("2d");

    mouseRef.current.x = e.offsetX;
    mouseRef.current.y = e.offsetY;

    canv.onmousedown = () => (drawing = true);
    canv.onmouseup = () => (drawing = false);

    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    if (drawing) {
      ctx.beginPath();
      ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
      ctx.stroke();
    }
  }

  function canvasFunc() {
    const canv = document.querySelector(".canvas");

    canv.addEventListener("mousemove", mousexy);
  }

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
    canvasFunc();
  }
  function sell() {
    // 캔버스 이미지 출력해야함
    const canv = document.querySelector(".canvas");
    const paint = document.querySelector(".painting_wrap");
    const ctx = canv.getContext("2d");
    canv.removeEventListener("mousemove", mousexy);

    const mypaint = canv.toDataURL();
    paint.style.backgroundImage = `url('${mypaint}')`;
    ctx.clearRect(0, 0, canv.width, canv.height);

    if (canva) {
      setCanva(false);
      setCrowd(true);

      sayFunc();
      setTimeout(() => {
        setCrowd(false);
        let point = gradeFunc();

        if (point > 96) setGrade("다빈치의 재림인가?");
        else if (point > 89) setGrade("눈물이 흐르는군, 감동적이야");
        else if (point > 77) setGrade("훌륭한 그림이야!");
        else if (point > 60) setGrade("거실에 전시해야겠어");
        else if (point > 40) setGrade("이정도면 괜찮은데?");
        else if (point > 23) setGrade("나쁘지 않아");
        else if (point > 11) setGrade("엉망진창이야");
        else if (point > 4) setGrade("형편없는 그림이군");
        else setGrade("휴지로 쓰면 딱이겠군");
        setPrice(point);
        setModal(true);
      }, 6000);
    } else {
      alert("판매할 캔버스가 없습니다.");
    }
  }

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
          <div className={canva ? "palette on" : "palette"}>
            <p onClick={() => setColorFunc("black")}></p>
            <p onClick={() => setColorFunc("white")}></p>
            <p onClick={() => setColorFunc("red")}></p>
            <p onClick={() => setColorFunc("yellow")}></p>
            <p onClick={() => setColorFunc("green")}></p>
            <p onClick={() => setColorFunc("blue")}></p>
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
