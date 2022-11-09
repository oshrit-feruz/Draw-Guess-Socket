import React from "react";
import "./App.css";
import Welcome from "../src/components/welcome";
import Words from "../src/components/words";
import Drawing from "./components/drawing";
import { Routes, Route } from "react-router-dom";
// import Container from "./components/container/Container";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/words" element={<Words />}></Route>
        <Route path="/drawing" element={<Drawing />}></Route>
        {/* <Route path="/drawing" element={<Container />}></Route>
        <Route path="/words" element={<WordChoosing />}></Route>
        <Route path="/waiting" element={<Waiting />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
