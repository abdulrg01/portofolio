const router = require("express").Router();
const projects = require("../controllers/projects");

router.route("/")
   .get(projects.getProjectsData)
   .post(projects.createProjects)
   .patch(projects.updateProjects)
   .delete(projects.deleteProjects)

   router.route("/get-projects/:id").get(projects.getSingleProjects);

module.exports = router;
