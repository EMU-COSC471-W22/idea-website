const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());    // parses
app.use(cors());

const db = require('./models');

// Routers
const galleryRouter = require("./routes/GalleryRoute");
const uploadRouter = require("./routes/UploadRoute");
const adminRouter = require("./routes/AdminRoute");
const commentsRouter = require("./routes/CommentsRoute");
const accountsRouter = require("./routes/AccountsRoute");

// Use route
app.use("/gallery", galleryRouter);
app.use("/upload", uploadRouter);
app.use("/admin", adminRouter);
app.use("/comments", commentsRouter);
app.use("/auth", accountsRouter);


// connecting database to port
db.sequelize.sync().then(() => {
    // insert app.listen(...) in here
    app.listen(3001, function() {
        console.log("Server is running on port 3001");
    });
});

