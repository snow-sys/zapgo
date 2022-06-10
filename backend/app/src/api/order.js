/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/user_order/listOrder"));
router.post("", require("../controller/user_order/tambahUserOrder"));
// router.put("/:uid", require("../controller/negara/editNegara"));
// router.delete("/:uid", require("../controller/negara/hapusNegara"));

module.exports = router;
