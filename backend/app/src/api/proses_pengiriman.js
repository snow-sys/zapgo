/** mengatur request yang datang ke bagian distributor */
const express = require("express");
let { verifyToken } = require("../module/token");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get(
  "/:uid?",
  require("../controller/proses_pengiriman/listProsesPengiriman")
);
router.post(
  "",
  verifyToken,
  require("../controller/proses_pengiriman/tambahProsesPengiriman")
);
router.put(
  "/:uid",
  verifyToken,
  require("../controller/proses_pengiriman/editProsesPengiriman")
);
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/proses_pengiriman/hapusProsesPengiriman")
);

module.exports = router;
