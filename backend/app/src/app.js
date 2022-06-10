/**
 * menjalankan server dengan cek koneksi terlebih dahulu.
 * setelah terkoneksi, cek model database, baru jalankan server.
 */
let server = require("./module/server");
let db = require("./module/connection");

//fungsi untuk membuat database.
let initModel = () => {
  try {
    require("./model/banner");
    require("./model/negara");
    require("./model/userOrder");
    require("./model/prosesPengiriman");
    require("./model/keunggulan");
    require("./model/gambar");
    require("./model/akun_user");
    require("./model/artikel");
    require("./model/background");
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve();
};
//jalankan server
db.connect()
  .then(() => {
    console.log("Terkoneksi ke database");
    initModel();
    server.start();
  })
  .catch(() => console.log("Koneksi ke database gagal"));
