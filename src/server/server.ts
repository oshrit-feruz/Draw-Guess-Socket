let app = require("express")();
import http from "http";
import { init as initSocket, allClients } from "./socket";
import cors from "cors";
import WebSocket from "websocket";
let server = http.createServer(app);
initSocket(server);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

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

let server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
  console.log("Started on : " + server_port);
});
