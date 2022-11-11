let app = require("express")();
import http from "http";
import { init as initSocket, allClients } from "./socket";
import cors from "cors";
import WebSocket from "websocket";
import express from "express";
import path from "path";
import process from "process";
let server = http.createServer(app);
const port = process.env.PORT || 5000;
initSocket(server);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/usersCount", (_req:any, res:any) => {
  res.json(allClients.length);
});
app.get("/gameTime", (_req:any, res:any) => {
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
}

app.listen(port || 5000, () => {
  console.log('listen to port ' + port);
});