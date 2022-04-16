const express = require("express");
const router = express.Router();
const { Accounts } = require("../models"); // importing necessary tables for route
const { QueryTypes } = require("sequelize");
const db = require('../models'); // allows for use of sequelize.query functions
const bcrypt = require("bcrypt");

/* Registration */
router.post("/", async (req, res) => {
    const { newFirstName, newLastName, newUsername, newEmail, newPassword } = req.body;
    bcrypt.hash(newPassword, 10).then((hash) => {
        db.sequelize.query(
            "INSERT INTO accounts (email, username, password, first_name, last_name, type) VALUES (:email, :username, :password, :firstName, :lastName, :accountType)", {
                replacements: {
                    email: newEmail,
                    username: newUsername,
                    password: hash,
                    firstName: newFirstName,
                    lastName: newLastName,
                    accountType: "user"
                }, type: QueryTypes.INSERT
            }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
        });
    });
});

/* Login */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    const user = await db.sequelize.query("SELECT * FROM accounts WHERE email = :enteredEmail", {
        model: Accounts,
        mapToModel: true,
        replacements: {
            enteredEmail: email
        },
        type: QueryTypes.SELECT 
    });

    console.log(user[0].password);

    if (!user) {
        res.json({error: "User does not exist!"});
    }

    bcrypt.compare(password, user[0].password).then((match) => {
        if (!match) {
            res.json({error: "Password was incorrect"});
        }

        res.json("YOU LOGGED IN!");
    });

});

module.exports = router;