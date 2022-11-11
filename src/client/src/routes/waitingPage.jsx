import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../loading-gif.gif";
import axios from "axios";
export default function Loading() {
  axios.get("https://draw-guess-stream.herokuapp.com/usersCount").then((res) => {
    console.log(res.data);
  });
  axios.get("https://draw-guess-stream.herokuapp.com/gameTime").then((res) => {
    console.log(res.data);
  });
  return (
    <div className="waitingDuo">
      <h3>waiting for other player...</h3>
      <img className="waitingGif" src={logo} alt="loading..." />{" "}
    </div>
  );
}
