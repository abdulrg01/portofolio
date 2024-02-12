const Hero = require("../models/hero");
const cloudinary = require("cloudinary");

const createHero = async (req, res) => {
  const { type } = req.body;

  const isTypeExist = await Hero.findOne({ type }).exec();
  if (isTypeExist) {
    return res.status(400).json({ message: `${type} already exist, 404` });
  }

  if (type === "Hero") {
    const { image, title, desc } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout",
    });

    const banner = {
      type: "Hero",
      banner: {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        title,
        desc,
      },
    };
    await Hero.create(banner);
  }
  res.status(200).json({
    success: true,
    message: "Hero created successfully",
  });
};

// @desc Get Hero Data
// @route GET /hero
// @access Public
const getHeroData = async (req, res) => {
  const hero = await Hero.find().lean();
  if (!hero) {
    return res.status(400).json({ message: "No Heros found" });
  }

  res.json(hero);
};

// @desc Update new Hero Data
// @route PATCH /hero
// @access Private
const updateHero = async (req, res) => {
  const { type } = req.body;

  if (type === "Hero") {
    const hero = await Hero.findOne({ type: "Hero" }).exec();
    if (!hero) {
      return res.status(400).json({ message: "No hero found" });
    }

    const { title, desc, image } = req.body;
    if (!title || !desc || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = image.startsWith("https")
      ? hero
      : await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

    const banner = {
      type: "Hero",
      image: {
        public_id: image.startsWith("https")
          ? hero.banner.image.public_id
          : data?.public_id,
        url: image.startsWith("https")
          ? hero.banner.image.url
          : data?.secure_url,
      },
      title,
      desc,
    };

    const updated = await Hero.findByIdAndUpdate(hero._id, { banner });

    res.status(200).json({
      success: true,
      updated,
    });
  }
};

module.exports = { getHeroData, updateHero, createHero };
