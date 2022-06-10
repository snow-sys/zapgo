/** setting route server which define where request go */
const bannerRoute = require("../api/banner");
const negaraRoute = require("../api/negara");
const orderRoute = require("../api/order");
const downloadOrderRoute = require("../api/downloadOrder");
const prosesPengirimanRoute = require("../api/proses_pengiriman");
const keunggulanRoute = require("../api/keunggulan");
const gambarRoute = require("../api/gambar");
const akunUserRoute = require("../api/akun_user");
const artikelRoute = require("../api/artikel");
const backgroundRoute = require("../api/background");

//function for using route
module.exports = (app) => {
  app.use("/api/v1/banner", bannerRoute);
  app.use("/api/v1/negara", negaraRoute);
  app.use("/api/v1/order", orderRoute);
  app.use("/api/v1/download_order", downloadOrderRoute);
  app.use("/api/v1/proses_pengiriman", prosesPengirimanRoute);
  app.use("/api/v1/keunggulan", keunggulanRoute);
  app.use("/api/v1/gambar", gambarRoute);
  app.use("/api/v1/akun_user", akunUserRoute);
  app.use("/api/v1/artikel", artikelRoute);
  app.use("/api/v1/bg", backgroundRoute);

  app.use((req, res, next) => {
    const error = new Error("Route tidak ditemukan! Periksa Kembali");
    error.status = 400;
    next(error);
  });

  app.use((error, req, res, next) => {
    let error_message = {
      error: error.status,
      message: error.message,
    };
    res.status(error.status || 500);
    res.json(error_message);
  });
  return app;
};
