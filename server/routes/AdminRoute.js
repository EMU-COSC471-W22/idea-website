const express = require("express");
const router = express.Router();
const { ArtPieces } = require("../models"); // importing necessary tables for route
const db = require('../models');    // allows for use of sequelize.query functions
const { route } = require("./AccountsRoute");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/verification", validateToken, async (req, res) => {
    if (req.user.type) {
        if (req.user.type === "admin") {
            res.send({authorized: "You have authorized access to this page"});
        }
    } else {
        res.send({error: "You do not have authorized access to this page"});
    }
})

/* Gets ArtPieces table and filters by given status */
router.get("/:artTableView", async (req, res) => {
    const view = req.params.artTableView;
    
    if (view === "all") {
        /* Retrieves the entire art catalog in the database*/
        const allArt = await db.sequelize.query("SELECT * FROM artpieces INNER JOIN accounts ON artpieces.account_username = accounts.username", {
            model: ArtPieces,
            mapToModel: true
        });
        res.send(allArt);
    } else {
        /* Retrieves art catalog based on given status: pending, accepted, or declined */
        const art = await db.sequelize.query("SELECT * FROM artpieces INNER JOIN accounts ON artpieces.account_username = accounts.username WHERE status = :newView", {
            model: ArtPieces,
            mapToModel: true,
            replacements: {
                newView: view
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
        res.send(art);
    }
})

/* Updates status of specified art piece */
router.put("/changestatus", async (req, res) => {
    const status = req.body.status;
    const artId = req.body.artId;
    await db.sequelize.query("UPDATE artpieces SET status = :newStatus WHERE art_id = :id", {
        replacements: {
            newStatus: status,
            id: artId
        }
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }); 
});

module.exports = router;