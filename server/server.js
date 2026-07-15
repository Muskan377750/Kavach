require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

// =======================
// Database
// =======================

connectDB();

// =======================
// Create HTTP Server
// =======================

const server = http.createServer(app);

// =======================
// Socket.IO
// =======================

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Make io available everywhere
const {
  initializeSocket,
} = require("./socket");

initializeSocket(io);

// =======================
// Socket Events
// =======================

io.on("connection", (socket) => {
  console.log("🟢 Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client Disconnected:", socket.id);
  });
});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});