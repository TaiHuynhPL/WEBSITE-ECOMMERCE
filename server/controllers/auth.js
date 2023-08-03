const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createError } = require("../utils/error");

exports.register = async (req, res, next) => {
  try {
    const { fullname, email, password, phone, role } = req.body;

    const users = await User.find();

    if (!fullname || !email || !password || !phone) {
      return next(createError(501, "You need to enter full!"));
    }

    const checkemail = users.some((user) => user.email === email);

    if (checkemail) {
      return next(createError(501, "Email already exists!"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hash,
      phone,
      role,
    });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { _id, fullname, email, phone, role } = user._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      id: _id,
      name: fullname,
      email: email,
      phone: phone,
      role: role,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    if (user.role !== "Admin" && user.role !== "Counselor") {
      return next(createError(400, "User not allow!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { _id, fullname, email, phone, role } = user._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      id: _id,
      name: fullname,
      email: email,
      phone: phone,
      role: role,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
