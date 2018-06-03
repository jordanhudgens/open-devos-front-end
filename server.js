const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"), function(req, res, next) {
  if (!req.secure) {
    var secureUrl = "https://" + req.headers["host"] + req.url;
    res.writeHead(301, { Location: secureUrl });
    res.end();
  }
  next();
});
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("server started");
