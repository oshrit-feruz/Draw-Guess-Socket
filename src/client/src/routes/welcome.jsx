import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../AppLogo.png";
import { Link } from "react-router-dom";
import io from "socket.io-client";

function Welcome(props) {
  // const [users, setUsers] = useState();
  const [route, setRoute] = useState();

  useEffect(() => {
    console.log(route);
    console.log(props.users);
    if (props.id === 1) {
      setRoute("words");
    } else if (props.users === 2) {
      setRoute("waiting");
    }
  }, [props.users]);

  return (
    <>
      <img src={logo} alt="logo" id="homePage"></img>
      <h3 id="homeText">
        {" "}
        Draw and guess the words as fast as you can! Join on worldwide rooms or
        create your own.
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
