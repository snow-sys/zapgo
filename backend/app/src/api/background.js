/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/background/listBg"));
router.post("", verifyToken, require("../controller/background/tambahBg"));
router.put("/:uid", verifyToken, require("../controller/background/editBg"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/background/hapusBg")
);

module.exports = router;
