const { decryptedToken } = require("../../utils/token");
const { decrypt } = require("../../utils/crypt");

const verifyJwt = async (req, res, next) => {
  console.log("Middleware de autenticação chamado.");
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("authHeader");
    return res.status(401).json({ message: "Unset TOKEN" });
  }

  try {
    console.log("Middleware ok.");
    const { userId } = await decryptedToken(authHeader);
    req.userId = parseInt(decrypt(userId));
    return next();
  } catch (error) {
    console.log("erro authentication ");
    console.log(error.message);
    console.log(error);
    return res.status(401).json({ message: "unauthorized!" });
  }
};

module.exports = verifyJwt;
