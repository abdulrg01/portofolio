const router = require("express").Router();
const skills = require("../controllers/skills");

router.route("/")
   .get(skills.getSkillsData)
   .post(skills.createSkills)
   .patch(skills.updateSkills)

router.route("/get-skill/:id")
    .get(skills.getSingleSkill)

module.exports = router;
