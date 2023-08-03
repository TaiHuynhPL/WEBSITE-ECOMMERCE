const User = require("../models/user");

exports.getClients = async (req, res, next) => {
  try {
    const users = await User.find({ role: "User" });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.id,
      "fullname email phone role"
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { _id, fullname, password, phone, email, role } = req.body;
    const user = await User.findById(_id);
    const users = await User.find();
    const checkemail = users.some(
      (u) => u.email === email && email !== user.email
    );

    if (checkemail) {
      return next(createError(501, "Email already exists!"));
    }

    let updateUser;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      updateUser = {
        fullname,
        password: hash,
        phone,
        email,
        role,
      };
    } else {
      updateUser = {
        fullname,
        phone,
        email,
        role,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateUser,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (err) {
    next(err);
  }
};
