const express = require('express')
const multer = require('multer');
const cors = require('cors')
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./");
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
    }
});

const upload = multer({
    storage: storage
});

// CORS
const cors = require('cors')
app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
}));

const mysql      = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'databasename',
});

connection.connect();

app.listen(3001, function() {
    console.log("Server is running on port 3001...");
});