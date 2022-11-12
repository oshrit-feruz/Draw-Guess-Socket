import React from "react";

import "./style.css";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
class Board extends React.Component {
  timeout;

  ctx;
  isDrawing = false;

  constructor(props) {
    super(props);

    socket.on("canvas-data", function (data) {
      const interval = setInterval(function () {
        if (this.isDrawing) return;
        this.isDrawing = true;
        clearInterval(interval);
        const image = new Image();
        const canvas = document.querySelector("#board");
        const ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          this.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.strokeStyle = newProps.color;
    this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
    const canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    const ctx = this.ctx;

    const sketch = document.querySelector("#sketch");
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    const mouse = { x: 0, y: 0 };
    const last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "touchmove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.touches[0].pageX - this.offsetLeft;
        mouse.y = e.touches[0].pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      "touchstart",
      function (e) {
        canvas.addEventListener("touchmove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "touchend ",
      function () {
        canvas.removeEventListener("touchmove", onPaint, false);
      },
      false
    );

    const onPaint = function () {
      ctx.beginPath();
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (this.timeout != undefined) clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        const base64ImageData = canvas.toDataURL("image/png");
        socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  }

  render() {
    return (
      <div class="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
      </div>
    );
  }
}

export default Board;
