let app = require("express")();
const http = require("http");
let server = http.createServer(app);
const socket = require("./socket");

app.get("/usersCount", (req, res) => {
  res.json(allClients.length);
});
app.get("/gameTime", (req, res) => {
  if (allClients.length === 6) {
    res.json(true);
  } else {
    res.json(false);
  }
});

socket(server);

let server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
  console.log("Started on : " + server_port);
});
