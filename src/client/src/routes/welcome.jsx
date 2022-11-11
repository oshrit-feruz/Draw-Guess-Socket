import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../AppLogo.png";
import { Link } from "react-router-dom";
import io from "socket.io-client";

function Welcome() {
  const [users, setUsers] = useState();
  const [route, setRoute] = useState();

  useEffect(() => {
    let mounted = true;
    function getData() {
      const ws = new WebSocket("ws://draw-guess-stream.herokuapp.com/");

      ws.onmessage = (message) => {
        console.log(message);
      };
      axios.get("/usersCount").then((res) => {
        setUsers(res.data);
      });
    }
    getData();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (users == 2) {
      setRoute("words");
    } else if (users === 4) {
      setRoute("waiting");
    }
  }, [users]);

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
