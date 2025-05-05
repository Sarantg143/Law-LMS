const express = require("express");
const router = express.Router();
const Message = require("../models/Message.model");
const User = require("../models/User.model");
const authenticate = require("../middleware/auth");


router.post("/", authenticate, async (req, res) => {
  try {
    const { receiver, text } = req.body;
    const message = new Message({
      sender: req.user._id,
      receiver,
      text
    });
    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get full conversation with one user (both directions)
router.get("/conversation/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 }); // oldest to newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inbox: who messaged me (latest message per user)
router.get("/inbox", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await Message.find({ receiver: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "username");

    const uniqueSenders = new Map();

    for (const msg of messages) {
      const senderId = msg.sender._id.toString();
      if (!uniqueSenders.has(senderId)) {
        uniqueSenders.set(senderId, {
          senderId,
          username: msg.sender.username,
          lastMessage: msg.text,
          lastMessageTime: msg.createdAt
        });
      }
    }

    const result = Array.from(uniqueSenders.values());
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark message as seen
router.put("/seen/:messageId", authenticate, async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);

    // Check if the message exists and is sent to the current user
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    if (message.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to update this message" });
    }
    message.seen = true;

    await message.save();

    res.json({ message: "Message marked as seen", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
