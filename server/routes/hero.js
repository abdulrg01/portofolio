const router = require("express").Router();
const hero = require("../controllers/hero");

router.route("/")
   .get(hero.getHeroData)
   .patch(hero.updateHero)
   
module.exports = router;
