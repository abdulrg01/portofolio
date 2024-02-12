const router = require("express").Router();
const user = require("../controllers/user");
const verifyJwt = require("../middleware/verifyJwt");

router.route("/get-user-info").get(verifyJwt, user.getUserInfo);

router.route("/login").post(user.login);

router.route("/refresh").get(user.refresh);

router.route("/set-user-image").put(verifyJwt, user.updateProfilePicture);

router.route("/updateUser").patch(verifyJwt, user.updateUserinfo);

router.route("/logout").post(verifyJwt, user.logout);

module.exports = router;
