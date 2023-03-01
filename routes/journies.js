const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const journiesController = require("../controllers/journies");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Journey Routes - simplified for now
router.get("/:id", ensureAuth, journiesController.getJourney);

router.post("/createJourney", journiesController.createJourney);

router.put("/likeJourney/:id", journiesController.likeJourney);

router.delete("/deleteJourney/:id", journiesController.deleteJourney);

module.exports = router;
