/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/artikel/listArtikel"));
// router.post("/login", require("../controller/akun_user/login"));
router.post("", verifyToken, require("../controller/artikel/tambahArtikel"));
router.put("/:uid", verifyToken, require("../controller/artikel/editArtikel"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/artikel/hapusArtikel")
);

module.exports = router;
