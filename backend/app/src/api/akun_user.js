/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get(
  "/:uid?",
  verifyToken,
  require("../controller/akun_user/listAkunUser")
);
router.post("/login", require("../controller/akun_user/login"));
router.post("", verifyToken, require("../controller/akun_user/tambahAkunUser"));
router.put(
  "/:uid",
  verifyToken,
  require("../controller/akun_user/editAkunUser")
);
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/akun_user/hapusAkunUser")
);

module.exports = router;
