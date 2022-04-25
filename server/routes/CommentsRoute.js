const express = require("express");
const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const router = express.Router();
const { Comments } = require("../models"); // importing necessary tables for route
const db = require('../models');    // allows for use of sequelize.query functions
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:artId", async (req, res) => {
    const artId = req.params.artId;
    const comments = await db.sequelize.query("SELECT * FROM comments INNER JOIN accounts ON comments.account_username = accounts.username WHERE art_id = :id ORDER BY comments.comment_id", {
        // model: Comments,
        // mapToModel: true,
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
    /* Due to the joins, I believe, the sequelize query returns an array or arrays. So we grab the first array */
    console.log(comments);
    res.send(comments[0]);

});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body.commentBody;
    const artId = req.body.artId;

    const username = req.user.username;

    const keys = await db.sequelize.query("INSERT INTO comments (comment_body, art_id, account_username) VALUES (:commentBody, :id, :accountUsername)", {
        replacements: {
            commentBody: comment,
            id: artId,
            accountUsername: username
        }, type: QueryTypes.INSERT
    });

    const newComment = await db.sequelize.query("SELECT * FROM comments INNER JOIN accounts ON comments.account_username = accounts.username WHERE comment_id = :id ORDER BY comments.comment_id", {
        // model: Comments,
        // mapToModel: true,
        replacements: {
            id: keys[0]
        }
    });
    console.log(newComment);
    res.send(newComment[0]);
});

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentToDelete = req.params.commentId;

    await db.sequelize.query("DELETE FROM comments WHERE comment_id = :commentId", {
        replacements: {
            commentId: commentToDelete
        }, type: QueryTypes.DELETE
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
    res.send("Comment deleted");
});

module.exports = router;