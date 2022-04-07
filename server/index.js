const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());    // parses
app.use(cors());

const db = require('./models');

// Routers
const galleryRouter = require("./routes/Gallery");
const uploadRouter = require("./routes/UploadRoute");
const adminRouter = require("./routes/Admin");

// Use route
app.use("/gallery", galleryRouter);
app.use("/upload", uploadRouter);
app.use("/admin", adminRouter);

// connecting database to port
db.sequelize.sync().then(() => {
    // insert app.listen(...) in here
    app.listen(3001, function() {
        console.log("Server is running on port 3001");
    });
});

