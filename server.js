let express = require("express");
let app = express();
let http = require("http");
let server = http.Server(app);
var io = require("socket.io")(server);
let messages = [];

server.listen(3000);
app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect("index.html");
});

io.on('connection', function (socket) {
    console.log("New user connected:", socket.id)
    io.sockets.emit("all", messages)
    
    socket.on("send", function (data) {
        console.log("New message from", socket.id)
        let n = {
            message: data,
            sender: socket.id
        }
        messages.push(n);
        io.sockets.emit("new", n);
    })
});