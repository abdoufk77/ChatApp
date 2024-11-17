const express = require("express");
const router = express.Router();
const conversation = require("../models/conversation.model");
const msg = require("../models/message.model");
const { userSocketMap } = require("../socket/socket");

router.post("/send/:id", async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.session.userId;
    const { message } = req.body;

    let conv = await conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conv) {
      conv = await conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMsg = new msg({
      senderId,
      receiverId,
      message,
    });

    if (newMsg) {
      conv.messages.push(newMsg._id);
    }

    await Promise.all([newMsg.save(), conv.save()]);
    // io.to(users[receiverId]).emit('receiveMessage', { senderId, message });

    res.end();
  } catch (err) {
    console.log("error in sending message", err);
    res.status(500).send();
  }
});

module.exports = router;