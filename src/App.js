import "./App.scss";
import React, { useEffect, useState } from "react";

function App() {
  const [mymoney, setMymoney] = useState(100);
  const [canva, setCanva] = useState(true);
  const say = ["음...", "오...", "이정도면...", "이게뭐지?", "과연...", "대단해!", "최악이군"];

  function buy() {
    if (canva) {
      alert("이미 캔버스가 있습니다.");
    } else {
      if (mymoney >= 25) {
        setCanva(true);
        setMymoney(mymoney - 25);
      } else {
        alert("파산한 길거리 예술가...");
      }
    }
  }
  function sell() {
    setCanva(false);
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
            <button type="button" onClick={buy} className="buy_canvas">
              캔버스 구매
            </button>
            <button type="button" onClick={sell} className="sell_painting">
              그림 판매
            </button>
          </div>
        </section>
        <section className="sell">
          <div className={canva ? "painting_wrap" : "painting_wrap on"}></div>
          <div className={canva ? "crowd" : "crowd on"}>
            <div className="crowd_say">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className="crowd_img"></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
