var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("User Online");
});
var allClients = [];
io.sockets.on("connection", function (socket) {
  allClients.push(socket);
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("disconnect", function () {
    console.log("Got disconnect!");

    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);
  });
  console.log(allClients.length);
});
var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
  console.log("Started on : " + server_port);
});