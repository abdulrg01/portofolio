const sendMail = require("../config/sendMail");
const Message = require("../models/message");
const ejs = require("ejs");
const path = require("path");

const message = async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ message: "All field are required" });
  }

  const newMessage = await Message.create({
    email,
    subject,
    message,
  });

  const data = { user: { email, subject, message } };

  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/message.ejs"),
    data
  );

  await sendMail({
    email,
    subject: "Portfolio Message",
    data,
  });

  res.status(201).json({
    success: true,
    newMessage,
  });
};

const getMessage = async (req, res) => {
  const message = await Message.find().sort({ createdAt: -1 }).lean();
  if (!message) return res.status(400).json({ message: "No Message found" });

  res.status(200).json({
    success: true,
    Message,
  });
};

module.exports = { message, getMessage };
