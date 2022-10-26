import http, { IncomingMessage, Server, ServerResponse } from "http";
import { parser } from "html-metadata-parser"
/*
implement your server code here
*/
const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url ==="/" && req.method === "GET") {
      const result = await parser("https://www.facebook.com/");
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(JSON.stringify(result, null,2));
      console.log(JSON.stringify(result, null,2))
    }
  }
);
server.listen(6706);