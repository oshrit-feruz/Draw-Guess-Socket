import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import path from "path";
let allClients: any[] = [];
let chossenWord: any = undefined;
let nextGame: any = false;
let server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://draw-guess-stream.herokuapp.com",
    allowedHeaders: ["my-custom-header"],

    credentials: true
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// I push into array each user that get into my website
io.on('connection', (socket: any) => {
  allClients.push(socket.id);
  socket.on("disconnect", (_reason: any) => {
    allClients = allClients.filter((client) => client !== socket.id);

    console.log('User Online', allClients.length);
  }),
    socket.on('canvas-data', (data: any) => {
      socket.broadcast.emit('canvas-data', data);

    })
})

// Send back the number of the user to know if they could play
app.get("/usersCount", (_req: any, res: any) => {
  console.log(allClients.length);
  res.json(allClients.length);
});

// while client choose word 
app.post('/insertWord', (request: any, response: any) => {
  console.log(request.body);
  chossenWord = request.body;
  response.send(({ response: 'you succsess!' }))
})

app.post('/nextGamePost', (request: any, response: any) => {
  console.log(request.body);
  nextGame = request.body;
  response.send(({ response: nextGame }))
})
app.get('/nextGameGet', (_request: any, response: any) => {
  response.json(nextGame)
  console.log(nextGame);
})

// send the word to the guesser react state
app.get("/chossenWord", (_req: any, res: any) => {
  console.log(chossenWord);
  if (chossenWord) {

    res.json(chossenWord);
  }
});

app.get("/id", (_req: any, res: any) => {
  res.json(allClients.length + 1);
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
  app.get('*', (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}
httpServer.listen(server_port, () => console.log(`Listening on ${server_port}`));
