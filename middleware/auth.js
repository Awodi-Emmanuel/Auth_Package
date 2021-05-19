// check to see if there is a token and header
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;

module.exports = (req, res, next) => {
     // Get token from header
     const token = req.header('x-auth-token');

     // check if token doesn't exit
     if(!token)
        return res.status(401).json({ statusCode: 401,
        message: "no token, authorizatiion denied!"
    });

    // else.. token exists
    try {
        const decoded = jwt.verify(token, SECRET);

        // Assign user to request object
         req.user = decoded.user;

         next();

    } catch (err) {
        res.status(401).json({
        statusCode: 401,
        message: "Token is not valid!"

    });
    }

}