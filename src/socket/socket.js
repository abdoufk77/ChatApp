const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSocketMap = {}; // iduser:socketIduser

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("userId", (userId) => {
    if (userId) {
      userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    if (userSocketMap[receiverId]) {
      io.to(userSocketMap[receiverId]).emit("receiveMessage", {
        senderId,
        message,
      });
    }
  });

  /*-----------------deconnection--------------- */
  socket.on("disconnect", () => {
    for (let userId in userSocketMap) {
      if (userSocketMap[userId] == socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("user disconnected", socket.id);
  });
});

module.exports = { app, io, server, userSocketMap };
