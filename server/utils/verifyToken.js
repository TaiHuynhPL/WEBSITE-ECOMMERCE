const jwt = require("jsonwebtoken");
const { createError } = require("./error");

const User = require("../models/user");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }

    req.user = await User.findById(user.id);
    next();
  });
};

const verifyUser = (req, res, next) => {
  if (req.user._id.toString() === req.params.userId) {
    next();
  } else {
    return next(createError(403, "You are not authorized"));
  }
};

const verifyCounselors = (req, res, next) => {
  if (req.user.role === "Counselors") {
    next();
  } else {
    return next(
      createError(
        403,
        `Role: ${req.user.role} is not allowed to access this resouce `
      )
    );
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    return next(
      createError(
        403,
        `Role: ${req.user.role} is not allowed to access this resouce `
      )
    );
  }
};

module.exports = { verifyToken, verifyUser, verifyCounselors, verifyAdmin };
