const express = require("express");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const { ArtPieces } = require("../models"); // Importing necessary tables for route
const db = require('../models'); // Allows for use of sequelize.query functions

router.post('/', async (req, res) => {
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newArtistName = req.body.artistName;
    const newArtURL = req.body.artURL;
    const status = "pending";

    console.log(newTitle);

    await db.sequelize.query(
        'INSERT INTO artpieces (artURL, title, artistName, description, status) VALUES (:artURL, :title, :artistName, :description, :status)', {
        replacements: {
            artURL: newArtURL,
            title: newTitle,
            artistName: newArtistName,
            description: newDescription,
            status: status
        }, type: QueryTypes.INSERT 
    }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );   // Sequelize function to insert data
});

module.exports = router;