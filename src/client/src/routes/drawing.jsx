import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Container from "../components/Container";
export default function Drawing() {
  const [next, setNext] = useState(null);


  useEffect(() => {
    let mounted = true;
    async function restart() {
      axios.post("/nextGamePost", [false]).then((res)=>console.log("res"));
    }
    restart();
    return () => (mounted = false);
  }, []);
  setInterval(() => {
    const nextGame = axios.get("/nextGameGet").then((res) => {
      console.log(res);
      if (res.data[0]) {
        
        setNext(
          <>
            <Navigate to="/waiting" />;
          </>
        );
      }
    });
  }, 8000);

  return (
    <>
      <Container color="#00000" />
      {next}
    </>
  );
}
