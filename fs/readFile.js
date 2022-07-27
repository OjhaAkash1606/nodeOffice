const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    fs.readFile("home.html", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(4900);
