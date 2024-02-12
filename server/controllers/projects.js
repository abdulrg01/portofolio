const Projects = require("../models/projects");
const cloudinary = require("cloudinary");

// @desc Get all Projects Data
// @route GET /Projects
// @access Public
const getProjectsData = async (req, res) => {
  const projects = await Projects.find().lean();

  if (!projects) {
    return res.status(400).json({ message: "No Projects found" });
  }

  res.json(projects);
};

// @desc Get Single Projects Data
// @route GET /projects
// @access Private
const getSingleProjects = async (req, res) => {
  const projects = await Projects.findById(req.params.id).select();

  if (!projects) return res.status(400).json({ message: "No projects found" });

  res.status(200).json({
    success: true,
    projects,
  });
};

// @desc Create new Projects Data
// @route POST /Projects
// @access Private
const createProjects = async (req, res) => {
  const { title, desc, gitUrl, previewUrl, imageSrc } =
    req.body;

  //confirm data
  if (!title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const myCloud = await cloudinary.v2.uploader.upload(imageSrc, {
    folder: "layout",
  });

  //check for duplicate
  const duplicate = await Projects.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  const projects = await Projects.create({
    title,
    gitUrl,
    previewUrl,
    desc,
    imageSrc: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    projects,
  });
};

// @desc Update new Projects Data
// @route PATCH /Projects
// @access Private
const updateProjects = async (req, res) => {
  const { id, title, desc, gitUrl, previewUrl, imageSrc } =
    req.body;

  //confirm data
  if (!title || !gitUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const projects = await Projects.findById(id).exec();
  if (!Projects) {
    return res.status(400).json({ message: "No Projects found" });
  }

  const data = imageSrc.startsWith("https")
    ? projects
    : await cloudinary.v2.uploader.upload(imageSrc, {
        folder: "layout",
      });

  //check for duplicate
  const duplicate = await Projects.findOne({ title }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  projects.title = title;
  projects.gitUrl = gitUrl;
  projects.previewUrl = previewUrl;
  projects.desc = desc;
  projects.imageSrc = {
    public_id: imageSrc.startsWith("https")
      ? projects.imageSrc.public_id
      : data?.public_id,
    url: imageSrc.startsWith("https") ? projects.imageSrc.url : data?.secure_url,
  };

  const updatedProjects = await projects.save();

  res.status(200).json({
    success: true,
    updatedProjects,
  });
};

// @desc Delete new Projects Data
// @route DELETE /Projects
// @access Private
const deleteProjects = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Projects ID Required" });
  }

  const projects = await Projects.findById(id).exec();

  if (!projects) {
    return res.status(400).json({ message: "Projects not found" });
  }

  const result = await projects.deleteOne();

  const reply = `Projects ${result.title} deleted`;

  res.json(reply);
};

module.exports = {
  getProjectsData,
  getSingleProjects,
  createProjects,
  updateProjects,
  deleteProjects,
};
