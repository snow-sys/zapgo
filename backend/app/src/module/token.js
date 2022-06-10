let jwt = require("jsonwebtoken");
let key = "zapgoRandomSecretKey2021";
let { connection } = require("./connection");

exports.genToken = (data) =>
  jwt.sign(data, key, {
    expiresIn: "1h",
  });

exports.verifyToken = (req, res, next) => {
  //mendapatkan nilai authorization di header
  const bearerHeader = req.headers["token"];
  // console.log("1", bearerHeader);
  //check apakah bearerHeader undefined
  if (typeof bearerHeader !== "undefined") {
    //verifiy token
    jwt.verify(bearerHeader, key, async (err, authData) => {
      if (err) {
        res.status(403).json({
          message: "token invalid!!",
          code: res.statusCode,
          response: [],
        });
      } else {
        let username = authData.username;
        let pwd = authData.pwd;
        let dataUser = await connection.query(
          `
          select uid, username, pwd from akun_user where username = $1 and pwd = $2`,
          [authData.username, authData.pwd]
        );
        // console.log(dataUser)
        if (
          username == dataUser.rows[0].username &&
          pwd == dataUser.rows[0].pwd
        ) {
          // console.log("lanjut ke controller")
          req.body.username = username;
          next();
        } else {
          res.status(403).json({
            message: "username or password did not match!!",
            code: res.statusCode,
            response: [],
          });
        }
      }
    });
  } else {
    res.status(403).json({
      message: "autorization failed!!",
      code: res.statusCode,
      response: [],
    });
  }
};
