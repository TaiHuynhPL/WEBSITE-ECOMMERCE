const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
