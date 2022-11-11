let app = require("express")();
import http from "http";
import { init as initSocket, allClients } from "./socket";
import cors from "cors";
import WebSocket from "websocket";
import express from "express";
import path from "path";
let server = http.createServer(app);
const PORT = process.env.PORT || 5000;
initSocket(server);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/usersCount", (req:any, res:any) => {
  res.json(allClients.length);
});
app.get("/gameTime", (req:any, res:any) => {
  if (allClients.length === 6) {
    res.json(true);
  } else {
    res.json(false);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
  app.get('*', (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}server .listen(PORT, () => console.log(`Listening on ${PORT}`));
