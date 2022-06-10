/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/keunggulan/listKeunggulan"));
router.post(
  "",
  verifyToken,
  require("../controller/keunggulan/tambahKeunggulan")
);
router.put(
  "/:uid",
  verifyToken,
  require("../controller/keunggulan/editKeunggulan")
);
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/keunggulan/hapusKeunggulan")
);

module.exports = router;
