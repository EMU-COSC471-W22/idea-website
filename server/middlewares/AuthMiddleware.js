const { verify } = require("jsonwebtoken");


/* Checks to see if user is correctly authenticated */
const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) {
        return res.send({ error: "You must be logged in." });
    }

    try {
        const validToken = verify(accessToken, `${process.env.JWT_SECRET}`);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.send({ error: err });
    }
}

module.exports = { validateToken }; 