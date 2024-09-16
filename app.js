const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  return res.render("index");
});

server.listen(PORT, () => console.log("Server started at port 3000!"));
