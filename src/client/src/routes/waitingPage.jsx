import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../loading-gif.gif";
import axios from "axios";
export default function Loading() {

  setInterval(() => {
    const word = axios.get("/chossenWord").then((res) => {
      console.log(res.data);
      if (Object.keys(res.data).length === 1) {
       
        window.location = "https://draw-guess-stream.herokuapp.com/guessing";
      }
    });
  }, 7000);
  return (
    <div className="waitingDuo">
      <h3> Wait for the other player...</h3>
      <img className="waitingGif" src={logo} alt="loading..." />{" "}
    </div>
  );
}
