const express = require("express");
const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const { Comments } = require("../models"); // importing necessary tables for route
const db = require('../models');    // allows for use of sequelize.query functions

router.get("/:artId", async (req, res) => {
    const artId = req.params.artId;
    const comments = await db.sequelize.query("SELECT * FROM comments WHERE artId = :id", {
        model: Comments,
        mapToModel: true,
        replacements: {
            id: artId
        }
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    });
    res.send(comments);

});

router.post("/", async (req, res) => {
    const comment = req.body.commentBody;
    const artId = req.body.artId;
    
    await db.sequelize.query("INSERT INTO comments (commentBody, artId) VALUES (:commentBody, :id)", {
        replacements: {
            commentBody: comment,
            id: artId
        }, type: QueryTypes.INSERT
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

module.exports = router;