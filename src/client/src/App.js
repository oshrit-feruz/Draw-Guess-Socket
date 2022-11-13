import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import Welcome from "./routes/welcome";
import Words from "./routes/words";
import Drawing from "./routes/drawing";
import Loading from "./routes/waitingPage";
import Guessing from "./routes/guessing";
import { Routes, Route } from "react-router-dom";
import { appBarClasses } from "@mui/material";
import { io } from "socket.io-client";
import { socket } from "./components/Board";

function App() {
  const [users, setUsers] = useState();
  const [chossenWord, setChossenWord] = useState();
  const [id, setId] = useState();
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    let mounted = true;
    async function getData() {
      socket.on("connect", () => {
        axios.get("/usersCount").then((res) => {
          console.log("id:", res.data);
          setId(res.data);
        });
      });
    }
    getData();
    return () => (
      socket.on("disconnect", () => {
        console.log(socket.id);
      }),
      (mounted = false)
    );
  }, []);

  useEffect(() => {
    axios.post("/insertWord", chossenWord).then((res)=>console.log("res"));
  }, [chossenWord]);

  const interval =setInterval(() => { 
    const usersCount = axios.get("/usersCount").then((res) => {
      setUsers(res.data);
     if(res.data===2){
      clearInterval(interval)
     }
    });
  }, 8000);

  return (
    <>
    <h3 id="score">your score: {score}</h3>
      <Routes>
        <Route path="/" element={<Welcome users={users} id={id} />}></Route>
        <Route
          path="/words"
          element={
            <Words chossenWord={chossenWord} setChossenWord={setChossenWord} />
          }
        ></Route>
        <Route path="/drawing" element={<Drawing />}></Route>
        <Route path="/waiting" element={<Loading />}></Route>
        <Route path="/guessing" element={<Guessing score={score} setScore={setScore}/>}></Route>
        {/* <Route path="/drawing" element={<Container />}></Route>
        <Route path="/words" element={<WordChoosing />}></Route>
        <Route path="/waiting" element={<Waiting />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
