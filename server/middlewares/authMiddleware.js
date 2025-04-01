const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    // console.log('token',token)
    let verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);

    console.log("verifi-token admin", verifiedToken);
    // console.log("auth-middle", req.body);

    req.body.adminId = verifiedToken.adminId;
    // console.log("req-body.admin", req.body.adminId);
    next();
  } catch (error) {
    res.send({
      success: false,
      message: "Invalid token",
    });
  }
};
