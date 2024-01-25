const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const decryptedToken = async (authHeader) => {
  try {
    // eslint-disable-next-line quotes
    const [, token] = authHeader.split(" ");
    const decoded = await promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log("problema no token.");
    console.log(error.message);
    throw new Error("Invalid token");
  }
};

module.exports = { decryptedToken };
