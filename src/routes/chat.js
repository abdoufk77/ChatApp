const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const conversation = require("../models/conversation.model");

router.get("/:id", async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.session.userId;

    const [sender, receiver] = await Promise.all([
      user.findById(senderId),
      user.findById(receiverId),
    ]);

    const conv = await conversation
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");

    if (!conv) {
      return res.render("chat", {
        name: sender,
        Other: receiver,
        messages: "",
      });
    }

    const messages = conv.messages;

    res.render("chat", {
      name: sender,
      Other: receiver,
      messages: messages,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
