const express = require("express");
const router = express.Router();
const { TestArt } = require("../models");

router.get("/", async (req, res) => {
    const allArt = await TestArt.findAll();
    res.send(allArt);
});

router.post('/', async (req, res) => {
    const post = req.body;
    await TestArt.create(post);   // sequelize function to insert data
    res.send(post);
});

module.exports = router;