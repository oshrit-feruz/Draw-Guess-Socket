import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function Drawing() {
  function hideLoader() {
    $("#loading").hide();
  }

  $(window).ready(hideLoader);
  // Strongly recommended: Hide loader after 20 seconds, even if the page hasn't finished loading
  setTimeout(hideLoader, 90 * 1000);
  return (
    <>
      <h4>waiting for other player...</h4>
      <div id="loading"></div>
    </>
  );
}
