/** mengatur request yang datang ke bagian gambar */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/gambar/listGambar"));
router.get("/lihat_gambar/:uid", require("../controller/gambar/lihatGambar"));
router.post("/", verifyToken, require("../controller/gambar/tambahGambar"));
router.delete(
  "/:uid?",
  verifyToken,
  require("../controller/gambar/hapusGambar")
);

module.exports = router;
