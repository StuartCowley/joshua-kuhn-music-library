const express = require("express");
const artistController = require("../controllers/artist");

const router = express.Router();

router.post("/artists", artistController.createArtist);
router.get("/artists", artistController.getAllArtists);
router.get("/artists/:id", artistController.getArtistById);
router.put("/artists/:id", artistController.putArtist);
router.patch("/artists/:id", artistController.patchArtist);
router.delete("/artists/:id", artistController.deleteArtist);

module.exports = router;
