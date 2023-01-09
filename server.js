const app = require("./src/app");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();
const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log('User has been connected');
  socket.on("chat", ({message, username}) => {
    io.emit("chat_update", { message, username });
  });
})

const startServer = async () => {
  try {
    await connectMongo();

    server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
}

startServer()

