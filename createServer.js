const http = require("http");
http
  .createServer((req, res) => {
    res.write("server has created!");
    res.end();
  })
  .listen(4900);
