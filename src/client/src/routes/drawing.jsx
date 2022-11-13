import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Container from "../components/Container";
export default function Drawing() {
  const [next, setNext] = useState(null);

  setInterval(() => {
    const nextGame = axios.get("/nextGameGet").then((res) => {
      if (res.data[0]) {
        
      axios.post("/nextGamePost", [false]).then((res) => console.log(res));
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
