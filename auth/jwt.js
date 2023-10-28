const jwt = require("jsonwebtoken");
const { config } = require("../database/keys");

const jwtAuth = {
    createToken: function (object) {
        return jwt.sign(object, config.jwtSecret, { expiresIn: config.jwtTimeExpiration });
    },
    decodeToken: function (token) {
        return jwt.decode(token, config.jwtSecret);
    }
}

module.exports = { jwtAuth }


