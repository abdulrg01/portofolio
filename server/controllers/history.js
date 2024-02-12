const History = require("../models/history");
const cloudinary = require("cloudinary");

// @desc Get all History Data
// @route GET /history
// @access Public
const getHistoryData = async (req, res) => {
  const history = await History.find().lean();

  if (!history) {
    return res.status(400).json({ message: "No history found" });
  }

  res.json(history);
};

// @desc Create new History Data
// @route POST /history
// @access Private
const createHistory = async (req, res) => {
  const { organisation, endDate, experiences, startDate, role, imageSrc } =
    req.body;

  //confirm data
  if (!organisation || !experiences || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const myCloud = await cloudinary.v2.uploader.upload(imageSrc, {
    folder: "layout",
  });

  //check for duplicate
  const duplicate = await History.findOne({ organisation }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate organization" });
  }

  const history = await History.create({
    organisation,
    experiences,
    startDate,
    endDate,
    imageSrc: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    history,
  });
};

// @desc Update new History Data
// @route PATCH /history
// @access Private
const updateHistory = async (req, res) => {
  const { id, organisation, endDate, experiences, startDate, role, imageSrc } =
    req.body;

  //confirm data
  if (!organisation || !experiences || !role || !imageSrc) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const history = await History.findById(id).exec();
  if (!history) {
    return res.status(400).json({ message: "No History found" });
  }

  const data = imageSrc.startsWith("https")
    ? history
    : await cloudinary.v2.uploader.upload(imageSrc, {
        folder: "layout",
      });

  //check for duplicate
  const duplicate = await History.findOne({ organisation }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate organization" });
  }

  history.organisation = organisation;
  history.experiences = experiences;
  history.startDate = startDate;
  history.endDate = endDate;
  history.role = role;
  history.imageSrc = {
    public_id: imageSrc.startsWith("https")
      ? history.imageSrc.public_id
      : data?.public_id,
    url: imageSrc.startsWith("https") ? history.imageSrc.url : data?.secure_url,
  };

  const updatedHistory = await history.save();

  res.status(200).json({
    success: true,
    updatedHistory,
  });
};

// @desc Get Single History Data
// @route GET /history
// @access Private
const getSingleHistory = async (req, res) => {
  const history = await History.findById(req.params.id).select();

  if (!history) return res.status(400).json({ message: "No history found" });

  res.status(200).json({
    success: true,
    history,
  });
};

// @desc Delete new History Data
// @route DELETE /history
// @access Private
const deleteHistory = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "history ID Required" });
  }

  const history = await History.findById(id).exec();

  if (!history) {
    return res.status(400).json({ message: "History not found" });
  }

  const result = await history.deleteOne();

  const reply = `History ${result.organisation} deleted`;

  res.json(reply);
};

module.exports = {
  getHistoryData,
  getSingleHistory,
  createHistory,
  updateHistory,
  deleteHistory,
};
