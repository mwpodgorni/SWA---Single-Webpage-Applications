
const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();


app.use(express.json());
app.use(express.static("express"));



app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
},
);


const server = http.createServer(app);
const port = 3030;
server.listen(port);
console.debug("Server listening on port " + port);

