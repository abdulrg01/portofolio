const router = require("express").Router();
const history = require("../controllers/history");

router
  .route("/")
  .get(history.getHistoryData)
  .post(history.createHistory)
  .patch(history.updateHistory)
  .delete(history.deleteHistory);

router.route("/get-history/:id").get(history.getSingleHistory);

module.exports = router;
