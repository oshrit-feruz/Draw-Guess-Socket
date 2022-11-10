import http from "http";
import WebSocket from "websocket";
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}

export let allClients:any[] = [];


/**
 *
 * @param {http.Server} server
 */
export function init(server) {
  const ws = new WebSocket.server({
    httpServer: server,
  });
  ws.on("request", (request) => {
    console.log("connected");

    console.log("connected from:", request.origin);
    const id = guid();

    const connection = request.accept(null, request.origin);
    connection.send("hi how are you");
    allClients.push({ cliendID: id, connection });

    connection.on("close", (code, desc) => {
      console.log("closed: ", id);
       allClients = allClients.filter((client) => client.cliendID !== id);
       console.log(allClients.length);
    });

    console.log(allClients.length);
    connection.on("message", (data) => {
      console.log(data);
    });
  });

  // const io = require("socket.io")(
  //   server
  //   // , {
  //   // cors: {
  //   //   origin: "*",
  //   //   methods: ["GET", "POST"],
  //   //   allowedHeaders: ["my-custom-header"],
  //   //   credentials: true,
  //   // },
  // );
  // io.on("connection", (socket) => {
  //   console.log("User Online");
  // });
  // io.sockets.on("connection", function (socket) {
  //   allClients.push(socket);
  //   socket.on("canvas-data", (data) => {
  //     socket.broadcast.emit("canvas-data", data);
  //   });

  //   socket.on("disconnect", function () {
  //     console.log("Got disconnect!");

  //     let i = allClients.indexOf(socket);
  //     allClients.splice(i, 1);
  //   });
  //   console.log(allClients.length);
  // });
};
