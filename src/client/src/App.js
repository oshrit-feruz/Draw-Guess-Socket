import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import Welcome from "./routes/welcome";
import Words from "./routes/words";
import Drawing from "./routes/drawing";
import Loading from "./routes/waitingPage";
import { Routes, Route } from "react-router-dom";
import { appBarClasses } from "@mui/material";

function App() {
  const [users, setUsers] = useState();
  const [chossenWord, setChossenWord] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    let mounted = true;
    async function getData() {
      console.log("object");
      // let HOST = window.location.origin.replace(/^http/, "ws");
      const ws = await new WebSocket("ws://localhost:5000/");
      // console.log(HOST);
      ws.onmessage = (message) => {
        console.log(message);
      };
      axios.get("/usersCount").then((res) => {
        console.log("id:", res.data);
        setId(res.data);
      });
    }
    getData();
    return () => (mounted = false);
  }, []);
 
  useEffect(() => {
  axios.post('/insertWord',chossenWord)
  }, [chossenWord]);

  setInterval(() => {
    const usersCount = axios.get("/usersCount").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, 15000);

  return (
    <>
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
        {/* <Route path="/drawing" element={<Container />}></Route>
        <Route path="/words" element={<WordChoosing />}></Route>
        <Route path="/waiting" element={<Waiting />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
