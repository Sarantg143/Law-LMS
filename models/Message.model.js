const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = model("Message", messageSchema);
