import React from "react";
import greatness_gif from "./assets/images/greatness.gif";
import "./App.css";

function App() {
  return (
    <div className="App">
      <p>
        <h1>WELCOME...</h1> <h2>Roxy and Rico</h2> to the start of great
        things!!
      </p>
      <p>
        This is the canvas upon which we shall build a system like{" "}
        <strong>NO OTHER</strong>!!!
      </p>
      <img src={greatness_gif} alt="We are the champions" />
      <p>Prepare to become greatness!!!</p>
    </div>
  );
}

export default App;
