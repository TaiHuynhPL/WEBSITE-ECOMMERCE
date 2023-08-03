const Session = require("../models/session");

exports.createSession = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const newChat = {
      user: [userId],
    };
    const session = await Session.create(newChat);
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

exports.getAllSessionExist = async (req, res, next) => {
  try {
    let sessions = await Session.find({ isExist: true })
      .populate("user", "_id fullname")
      .populate("messages");
    // chats = await user.populate(chats, {
    //   path: "messages.sender",
    //   select: "_id fullname role",
    // });
    // chats = await Message.populate(chats, { path: "messages" });
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

exports.changeSessionToNotExist = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const session = await Session.findByIdAndUpdate(
      chatId,
      { isExist: false },
      { new: true }
    );
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

exports.getSessionById = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const session = await Session.findById(chatId)
      .populate("user")
      .populate("messages", "sender text chatId");
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};
