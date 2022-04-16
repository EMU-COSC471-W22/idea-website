const express = require("express");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const { ArtPieces } = require("../models"); // Importing necessary tables for route
const db = require('../models'); // Allows for use of sequelize.query functions

router.post('/', async (req, res) => {
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newArtURL = req.body.art_url;
    const status = "pending";
    const newEmail = req.body.account_email;

    console.log(newTitle);

    await db.sequelize.query(
        'INSERT INTO artpieces (art_url, title, description, status, account_email) VALUES (:artURL, :title, :description, :status, :accountEmail)', {
        replacements: {
            artURL: newArtURL,
            title: newTitle,
            description: newDescription,
            status: status,
            accountEmail: newEmail,
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