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
    const usersCount = axios.get("/chossenWord").then((res) => {
      if (res.data!==undefined) {
        window.location = "http://localhost:3000/guessing";
      }
      console.log(res.data);
    });
  }, 3000);
  return (
    <div className="waitingDuo">
      <h3>waiting for other player...</h3>
      <img className="waitingGif" src={logo} alt="loading..." />{" "}
    </div>
  );
}
