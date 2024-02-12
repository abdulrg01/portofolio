const router = require("express").Router();
const controller = require("../controllers/message");

router.route("/")
   .post(controller.message)
   .get(controller.getMessage)

module.exports = router;
