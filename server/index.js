/* global process */

import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 9000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // for development
    methods: ["GET", "POST"],
  },
});
const roomUsers = {};

function removeUser(socket) {
  const { name, roomId } = socket.data;
  if (!roomId) return;
  const users = roomUsers[roomId];
  if (users.length === 0) return;

  const newUsers = users.filter((u) => u.id !== socket.id);
  if (users.length === newUsers.length) return;

  roomUsers[roomId] = newUsers;

  if (newUsers.length === 0) delete roomUsers[roomId];

  io.to(roomId).emit("room-users", newUsers);
  io.to(roomId).emit("left-room", name);
}

io.on("connection", (socket) => {
  console.log("a new user connected with id: ", socket.id);

  socket.on("join-room", ({ roomId, name }) => {
    console.log("Room joined with id: ", roomId);
    socket.join(roomId);
    socket.data.name = name;
    socket.data.roomId = roomId;
    socket.to(roomId).emit("joined-room", name);

    if (!roomUsers[roomId]) roomUsers[roomId] = [];

    roomUsers[roomId].push({
      id: socket.id,
      name,
      image: `https://api.dicebear.com/8.x/thumbs/svg?seed=${socket.id}`,
    });

    io.to(roomId).emit("room-users", roomUsers[roomId]);
  });

  socket.on("lang-change", ({ roomId, lang }) => {
    socket.to(roomId).emit("lang-update", lang);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("leave-room", () => {
    const { name } = socket.data;
    console.log(`${name} left the room`);

    removeUser(socket);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const { roomId } = socket.data;
    if (roomId) {
      removeUser(socket);
    }
  });
});

app.use(express.static("public"));

server.listen(port, () => console.log(`Server is listening to ${port}`));
