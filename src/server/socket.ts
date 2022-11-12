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

export let allClients: any[] = [];


/**
 *
 * @param {http.Server} server
 */
export function init(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
  const ws = new WebSocket.server({
    httpServer: server,
  });
  ws.on("request", (request) => {
    console.log("connected");
    const id = guid();
    allClients.push(id);

    const connection = request.accept(null, request.origin);
    connection.send("hi how are you");

    connection.on("close", (_code: any, _desc: any) => {
      console.log("closed: ", id);
  
      allClients = allClients.filter((client) => client.id !== id);
     
      console.log(allClients.length);
    });

    console.log(allClients.length);
    connection.on("message", (data: any) => {
      console.log(data);
    });
  });

}