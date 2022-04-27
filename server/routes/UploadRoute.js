const express = require("express");
const { QueryTypes } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { ArtPieces } = require("../models"); // Importing necessary tables for route
const db = require('../models'); // Allows for use of sequelize.query functions

router.post("/", validateToken, async (req, res) => {
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newArtURL = req.body.artURL;
    const newEmail = req.body.email;
    const status = "pending";

    const username = req.user.username;

    console.log(username);

    await db.sequelize.query(
        'INSERT INTO artpieces (art_url, title, description, email, status, account_username) VALUES (:artURL, :title, :description, :email, :status, :accountUsername)', {
        replacements: {
            artURL: newArtURL,
            title: newTitle,
            description: newDescription,
            email: newEmail,
            status: status,
            accountUsername: username,
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