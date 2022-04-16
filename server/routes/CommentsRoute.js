const express = require("express");
const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const { Comments } = require("../models"); // importing necessary tables for route
const db = require('../models');    // allows for use of sequelize.query functions

router.get("/:artId", async (req, res) => {
    const artId = req.params.art_id;
    const comments = await db.sequelize.query("SELECT * FROM comments WHERE art_id = :id", {
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
    const comment = req.body.comment_body;
    const artId = req.body.art_id;
    
    await db.sequelize.query("INSERT INTO comments (comment_body, art_id) VALUES (:commentBody, :id)", {
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