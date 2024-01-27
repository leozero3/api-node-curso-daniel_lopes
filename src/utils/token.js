const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const decryptedToken = async (authHeader) => {
  try {
    const [, token] = authHeader.split(" ");
    return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
  } catch (error) {
    console.log("problema no token.");
    console.log(error.message);
    throw new Error("Invalid token");
  }
};

module.exports = { decryptedToken };
