// let app = require("express")();
// import http from "http";
// import { init as initSocket, allClients } from "./socket";
// import cors from "cors";
// import express from "express";
// import path from "path";
// import bodyParser from 'body-parser';
// import express from "express";
// import path from "path";
// let chossenWord: any;
// let server = http.createServer(app);
// app.use(cors())
// var io = require('socket.io')(server);
// const PORT = process.env.PORT || 5000;
// initSocket(server);
// var app = require('express')();
// var http = require('http').createServer(app);
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],

    credentials: true
  }
});


io.on('connection', (socket: any) => {
  console.log('User Online');

  socket.on('canvas-data', (data: any) => {
    socket.broadcast.emit('canvas-data', data);

  })
})

// var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
// http.listen(server_port, () => {
// console.log("Started on : "+ server_port);
// })

// app.use(bodyParser.json())

// app.post('/insertWord', (request: any, response: any) => {
//   console.log(request.body);
//   chossenWord = request.body;
//   response.send(({ response: 'you succsess!' }))
// })

// app.get("/chossenWord", (_req: any, res: any) => {
//   res.json(chossenWord);
// });
// app.get("/usersCount", (_req:any, res:any) => {
//   res.json(allClients.length);
// });
// app.get("/id", (_req:any, res:any) => {
//   console.log(allClients);
//   res.json(allClients[allClients.length-1]);
// });
// app.get("/gameTime", (_req:any, res:any) => {
//   if (allClients.length === 6) {
//     res.json(true);
//   } else {
//     res.json(false);
//   }
// });

let server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
httpServer.listen(server_port, () => {
  console.log("Started on : " + server_port);
})
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('build'))
//   app.get('*', (_req: any, res: any) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'))
//   })
// }
// http.listen(PORT, () => console.log(`Listening on ${PORT}`));
