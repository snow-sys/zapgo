/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/negara/listNegara"));
router.post("", verifyToken, require("../controller/negara/tambahNegara"));
router.put("/:uid", verifyToken, require("../controller/negara/editNegara"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/negara/hapusNegara")
);

module.exports = router;
