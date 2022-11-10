import React from "react";
import "./App.css";
import io from "socket.io-client";
import Welcome from "./routes/welcome";
import Words from "./routes/words";
import Drawing from "./routes/drawing";
import Loading from "./routes/waintingPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/words" element={<Words />}></Route>
        <Route path="/drawing" element={<Drawing />}></Route>
        <Route path="/waiting" element={<Loading />}></Route>
        {/* <Route path="/drawing" element={<Container />}></Route>
        <Route path="/words" element={<WordChoosing />}></Route>
        <Route path="/waiting" element={<Waiting />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
