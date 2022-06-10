/** berisikan middleware yang digunakan server */
let cors = require("cors");
let fileupload = require("express-fileupload");
let express = require("express");

//function for using middleware
module.exports = (app) => {
  app.use(cors({ credentials: true }));
  app.use(fileupload());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use((req, res, next) => {
    // logging(req, res);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("X-Powered-By", "Snow-System");
    next();
  });
  return app;
};
