const Skills = require("../models/skills");
const cloudinary = require("cloudinary");

// @desc Get all Skills Data
// @route GET /Skills
// @access Public
const getSkillsData = async (req, res) => {
  const skills = await Skills.find().lean();

  if (!skills) {
    return res.status(400).json({ message: "No Skills found" });
  }

  res.json(skills);
};

// @desc Get Single Skills Data
// @route GET /Skill
// @access Private
const getSingleSkill = async (req, res) => {
  const skill = await Skills.findById(req.params.id).select();

  if (!skill) return res.status(400).json({ message: "No skill found" });

  res.status(200).json({
    success: true,
    skill,
  });
};

// @desc Create new Skills Data
// @route POST /Skills
// @access Private
const createSkills = async (req, res) => {
  const { title, img } = req.body;

  //confirm data
  if (!title) {
    return res.status(400).json({ message: " Title is required" });
  }

  const myCloud = await cloudinary.v2.uploader.upload(img, {
    folder: "layout",
  });

  //check for duplicate
  const duplicate = await Skills.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  const skills = await Skills.create({
    title,
    img: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    skills,
  });
};

// @desc Update new Skills Data
// @route PATCH /Skills
// @access Private
const updateSkills = async (req, res) => {
  const { id, title, img } = req.body;

  //confirm data
  if (!id || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const skills = await Skills.findById(id).exec();
  if (!skills) {
    return res.status(400).json({ message: "No Skills found" });
  }

  const data = img.startsWith("https")
    ? skills
    : await cloudinary.v2.uploader.upload(img, {
        folder: "layout",
      });

  //check for duplicate
  const duplicate = await Skills.findOne({ title }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  skills.title = title;
  skills.img = {
    public_id: img.startsWith("https")
      ? skills.img.public_id
      : data?.public_id,
    url: img.startsWith("https") ? skills.img.url : data?.secure_url,
  };

  const updatedSkills = await skills.save();

  res.status(200).json({
    success: true,
    updatedSkills,
  });
};

// @desc Delete new Skills Data
// @route DELETE /Skills
// @access Private
const deleteSkills = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Skills ID Required" });
  }

  const skills = await Skills.findById(id).exec();

  if (!skills) {
    return res.status(400).json({ message: "Skills not found" });
  }

  const result = await skills.deleteOne();

  const reply = `Skills ${result.title} deleted`;

  res.json(reply);
};

module.exports = {
  getSkillsData,
  getSingleSkill,
  createSkills,
  updateSkills,
  deleteSkills,
};
