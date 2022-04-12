const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const { ArtPieces } = require("../models"); // importing necessary tables for route
const db = require('../models');    // allows for use of sequelize.query functions

/* Gallery page only displays art that has been accepted */
router.get("/", async (req, res) => {
    const galleryArt = await db.sequelize.query("SELECT * FROM artpieces WHERE status='accepted'", {
        model: ArtPieces,
        mapToModel: true
    });
    res.send(galleryArt);
});

module.exports = router;