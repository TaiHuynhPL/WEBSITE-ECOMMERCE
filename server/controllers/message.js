const Message = require("../models/message");
const Session = require("../models/session");

exports.addMessage = async (req, res, next) => {
  const { sender, text, chatId } = req.body;
  try {
    const message = await Message.create({ sender, text, chatId });
    const session = await Session.findByIdAndUpdate(
      chatId,
      { $push: { messages: message._id } },
      { new: true }
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
