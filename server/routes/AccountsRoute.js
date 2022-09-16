const express = require("express");
const router = express.Router();
const { Accounts } = require("../models"); // importing necessary tables for route
const { QueryTypes } = require("sequelize");
const db = require('../models'); // allows for use of sequelize.query functions
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

/* Registration */
router.post("/", async (req, res) => {
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    bcrypt.hash(newPassword, 10).then((hash) => {
        db.sequelize.query(
            "INSERT INTO accounts (username, password, first_name, last_name, type) VALUES (:username, :password, :firstName, :lastName, :accountType)", {
                replacements: {
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

/* Username validation */
router.post("/users", async (req, res) => {
    const username = req.body.username;

    const user = await db.sequelize.query("SELECT * FROM accounts WHERE username = :enteredUsername", {
        replacements: {
            enteredUsername: username
        },
        model: Accounts,
        mapToModel: true
    });
    res.send(user);
});

/* Login */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    /* Checking to see if the username exists in the database */
    const user = await db.sequelize.query("SELECT * FROM accounts WHERE username = :enteredUsername", {
        model: Accounts,
        mapToModel: true,
        replacements: {
            enteredUsername: username
        },
        type: QueryTypes.SELECT 
    });

    if (user.length === 0) {
        res.send({error: "The username entered was not found in our records."});
    } else {
        /* If username is in the database, check to see if the password is correct */
        bcrypt.compare(password, user[0].password).then((match) => {
            if (!match) {
                res.send({error: "The password does not match the username."});
            } else {
                /* Login was successful */
                const accessToken = sign({username: user[0].username, type: user[0].type, firstName: user[0].first_name, lastName: user[0].last_name}, `${process.env.JWT_SECRET}`);
                res.send(accessToken);
            }
        });
    }
});

/* Validation for the authState in the front end */
router.get("/validation", validateToken, (req, res) => {
    res.send(req.user);
});

module.exports = router;