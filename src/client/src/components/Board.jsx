import React from "react";

import "./style.css";
import { io } from "socket.io-client";

export const socket = io("https://draw-guess-stream.herokuapp.com", {
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

      socket.on("canvas-data", function(data){

          var root = this;
          var interval = setInterval(function(){
              if(root.isDrawing) return;
              root.isDrawing = true;
              clearInterval(interval);
              var image = new Image();
              var canvas = document.querySelector('#board');
              var ctx = canvas.getContext('2d');
              image.onload = function() {
                  ctx.drawImage(image, 0, 0);

                  root.isDrawing = false;
              };
              image.src = data;
          }, 200)
      })
  }

  componentDidMount() {
      this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
      this.ctx.strokeStyle = newProps.color;
      this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
      var canvas = document.querySelector('#board');
      this.ctx = canvas.getContext('2d');
      var ctx = this.ctx;

      var sketch = document.querySelector('#sketch');
      var sketch_style = getComputedStyle(sketch);
      canvas.width = parseInt(sketch_style.getPropertyValue('width'));
      canvas.height = parseInt(sketch_style.getPropertyValue('height'));

      var mouse = {x: 0, y: 0};
      var last_mouse = {x: 0, y: 0};

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
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = this.props.color;

      canvas.addEventListener('touchstart', function(e) {
          canvas.addEventListener('touchmove', onPaint, false);
      }, false);

      canvas.addEventListener('touchend', function() {
          canvas.removeEventListener('touchmove', onPaint, false);
      }, false);

      var root = this;
      var onPaint = function() {
          ctx.beginPath();
          ctx.moveTo(last_mouse.x, last_mouse.y);
          // ctx.lineTo(mouse.x, mouse.y);
          ctx.closePath();
          ctx.stroke();

          if(root.timeout != undefined) clearTimeout(root.timeout);
          root.timeout = setTimeout(function(){
              var base64ImageData = canvas.toDataURL("image/png");
              socket.emit("canvas-data", base64ImageData);
          }, 1000)
      };
  }

  render() {
      return (
          <div class="sketch" id="sketch">
              <canvas className="board" id="board"></canvas>
          </div>
      )
  }
}

export default Board