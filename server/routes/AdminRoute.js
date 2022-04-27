const express = require("express");
const router = express.Router();
const { ArtPieces, Accounts } = require("../models"); // importing necessary tables for route
const { QueryTypes } = require("sequelize");
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
router.get("/art/view/:artTableView", async (req, res) => {
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
});

/* Updates status of specified art piece */
router.put("/art/changestatus", async (req, res) => {
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

/* Access all accounts for the account table in the front end */
router.get("/accounts", async (req, res) => {
    const allAccounts = await db.sequelize.query("SELECT username, first_name, last_name, type FROM accounts ORDER BY type, username", {
        model: Accounts,
        mapToModel: true
    });
    res.send(allAccounts);
});

/* Route to change the account type of a selected account */
router.put("/account/changetype", async (req, res) => {
    const newType = req.body.type;
    const affectedUsername = req.body.username;

    await db.sequelize.query("UPDATE accounts SET type = :newType WHERE username = :username", {
        replacements: {
            newType: newType,
            username: affectedUsername
        }
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

/* Route to delete an art piece based on the selected art_id */
router.delete("/art/remove/:artId", async (req, res) => {
    const artToDelete = req.params.artId;

    await db.sequelize.query("DELETE FROM artpieces WHERE art_id = :affectedArtId", {
        replacements: {
            affectedArtId: artToDelete
        }, type: QueryTypes.DELETE
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

    res.send("Art piece was deleted");
});

/* Route to delete account based on the selected username */
router.delete("/account/remove/:username", async (req, res) => {
    const accountToDelete = req.params.username;

    await db.sequelize.query("DELETE FROM accounts WHERE username = :affectedUsername", {
        replacements: {
            affectedUsername: accountToDelete
        }, type: QueryTypes.DELETE
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

    res.send("Account was deleted");
});

module.exports = router;