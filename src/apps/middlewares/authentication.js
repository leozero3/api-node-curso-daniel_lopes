const { decryptedToken } = require("../../utils/token");
const { decrypt } = require("../../utils/crypt");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unset TOKEN" });
  }

  try {
    const { userId } = await decryptedToken(authHeader);
    console.log("userId:", userId);

    req.userId = parseInt(decrypt(userId));
    console.log("userId req:", req.userId);
    return next();
  } catch (error) {
    console.error("Error in verifyJwt:", error);
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = verifyJwt;
