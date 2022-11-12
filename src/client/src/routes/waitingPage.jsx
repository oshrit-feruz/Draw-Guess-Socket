import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../loading-gif.gif";
import axios from "axios";
export default function Loading() {
  axios.get("/usersCount").then((res) => {
    console.log(res.data);
  });

  setInterval(() => {
    const word = axios.get("/chossenWord").then((res) => {
      if (Object.keys(res.data).length === 1) {
       
        window.location = "http://localhost:3000/guessing";
      }
    });
  }, 7000);
  return (
    <div className="waitingDuo">
      <h3>waiting for other player...</h3>
      <img className="waitingGif" src={logo} alt="loading..." />{" "}
    </div>
  );
}
