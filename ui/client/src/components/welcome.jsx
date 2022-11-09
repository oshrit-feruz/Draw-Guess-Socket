import React from "react";
import logo from "../AppLogo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function Welcome() {
  return (
    <>
      <img src={logo} alt="logo" id="homePage" />
      <h3 id="homeText">
        {" "}
        Draw and guess the words as fast as you can! Join on worldwide rooms or
        create your own.
      </h3>

      <Link to="/words">
        <Button id="startButton" variant="contained" color="inherit">
          Start Play! 
        </Button>
      </Link>
    </>
  );
}
