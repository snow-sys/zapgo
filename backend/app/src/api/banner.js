/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/banner/listBanner"));
router.post("", verifyToken, require("../controller/banner/tambahBanner"));
router.put("/:uid", verifyToken, require("../controller/banner/editBanner"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/banner/hapusBanner")
);

module.exports = router;
