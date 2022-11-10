const http = require("http");

/**
 *
 * @param {http.Server} server
 */
module.exports = function init(server) {

const io = require("socket.io")(http
    // , {
    // cors: {
    //   origin: "*",
    //   methods: ["GET", "POST"],
    //   allowedHeaders: ["my-custom-header"],
    //   credentials: true,
    // },
  );
  io.on("connection", (socket) => {
    console.log("User Online");
  });
  let allClients = [];
  io.sockets.on("connection", function (socket) {
    allClients.push(socket);
    socket.on("canvas-data", (data) => {
      socket.broadcast.emit("canvas-data", data);
    });
  
    socket.on("disconnect", function () {
      console.log("Got disconnect!");
  
      let i = allClients.indexOf(socket);
      allClients.splice(i, 1);
    });
    console.log(allClients.length);
  });
  
};
