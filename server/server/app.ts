import http, { IncomingMessage, Server, ServerResponse } from "http";

import { getTasks, addTasks } from "./engine";

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse)=>{
  if(req.method == "GET" && req.url == "/api/get"){
    return getTasks(req, res);
  }
  if(req.method == "POST" && req.url == "/api/post"){
    return addTasks(req, res);
  }
  // if(req.method == "PUT" && req.url == "/api/put"){
  //   return updateTask(req, res);
  // }
  // if(req.method == "DELETE" && req.url == "/api/del"){
  //   return deleteTask(req, res);
  // }
  res.writeHead(404, { "Content-Type": "application/json"});
  res.end(JSON.stringify({message: "Route no dey"}))


  
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`my server is running on port ${PORT}`))
