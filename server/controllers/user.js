const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const getUserInfo = async (req, res) => {
  const user = await User.findById(req.user).select("-password").lean();

  res.json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id,
        name: foundUser.name,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: foundUser._id, name: foundUser.name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  const user = await User.findOne({ email }).select("-password").exec();

  res.json({
    user,
    token,
  });
};

// @desc Update new User Data
// @route PATCH /User
// @access Private
const updateUserinfo = async (req, res) => {
  const { name } = req.body;

  const userId = req.user;

  const user = await User.findById(userId).exec();

  if (!name || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== userId) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.name = name;

  const updatedUser = await user.save();

  res.status(200).json({ updatedUser, message: `${updatedUser.name} updated` });
};

const updateProfilePicture = async (req, res) => {
  const userId = req.user;
  const { avatar } = req.body;

  const user = await User.findById(userId).exec();

  if (!user || !avatar)
    return res
      .status(400)
      .json({ message: "Invalid User and Please select the your picture" });

  const cloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
  });

  user.image = {
    publicId: cloud.public_id,
    url: cloud.secure_url,
  };

  await user.save();

  res.status(200).json({ success: true, user });
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user = await User.findOne({ name: decoded.name }).exec();

      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const token = jwt.sign(
        {
          UserInfo: {
            name: user.name,
            userId: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({
        user,
        token,
      });
    }
  );
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie cleared" });
};

module.exports = {
  getUserInfo,
  login,
  updateUserinfo,
  updateProfilePicture,
  refresh,
  logout,
};
