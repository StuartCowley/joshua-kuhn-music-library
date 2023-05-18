const express = require("express");
const albumController = require("../controllers/album");

const router = express.Router();

router.post("/artists/:id/albums", albumController.createAlbum);
router.get("/albums", albumController.getAllAlbums);
router.get("/albums/:id", albumController.getAlbumById);
router.put("/albums/:id", albumController.putAlbum);
router.patch("/albums/:id", albumController.patchAlbum);
router.delete("/albums/:id", albumController.deleteAlbum);

module.exports = router;
