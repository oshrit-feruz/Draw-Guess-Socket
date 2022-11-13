import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../AppLogo.png";
import { Link } from "react-router-dom";
import io from "socket.io-client";

function Welcome(props) {
  const [route, setRoute] = useState();

  useEffect(() => {
    if (props.users === 1) {
      setRoute();
    } else if (props.users === 2) {
      if (props.id === 1) {
        setRoute("words");
      } else if (props.id === 2) {
        setRoute("waiting");
      }
    }
  }, [props.users]);

  return (
    <>
      <img src={logo} alt="logo" id="homePage"></img>
      <h3 id="homeText">
        {" "}
        Draw and guess the words as fast as you can! 
        Wait for another player - the 'start' button will apear while both of you be in the website:) .
      </h3>

      {route && (
        <Link to={route}>
          <Button id="startButton" variant="contained" color="inherit">
            Start Play!
          </Button>
        </Link>
      )}
    </>
  );
}

export default Welcome;
