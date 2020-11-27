
const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();



app.use(express.json());
app.use(express.static("express"));


// app.use(express.static(path.join(__dirname + '/js/myjsfile.js')))

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
},
);


// router.get('/js',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });

const server = http.createServer(app);
const port = 3030;
server.listen(port);
console.debug("Server listening on port " + port);



// console.log ("this is aaaa");

// const poll_url = url => interval(100).pipe(concatMap(() => ajax.getJSON(url)));

// const poll_something = () => 
//       poll_url('http://localhost:8080/warnings')
//       // .pipe (map(res => console.log ('1)  ', res)));

//       // console.log(map)
//       console.log ("aaaa   ",  poll_something());