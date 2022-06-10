/** mengatur request untuk men-list gambar */

let { listGambar } = require("../../repository/gambar");
let fs = require("fs");
let { getCurrentTime } = require("../../module/getCurrentTime");
require("dotenv").config();

// let directory = process.cwd() + "/src/assets";
let directory = process.cwd() + "/assets";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = (req, res) => {
  let { uid } = req.params;
  let { uid_gambar, limit, from } = req.query;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  listGambar(limit, from, uid, uid_gambar)
    .then((data) => {
      //map every data.gambar to build link for image
      data.map((el) => {
        el.urlGambar = `${process.env.LOCAL_DOMAIN}/api/v1/gambar/lihat_gambar/${el.uid}`;
      });
      res.json({
        message: "berhasil menampilkan list gambar",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : listGambar query failed!`);
      res.json({
        message: "gagal menampilkan list gambar",
        code: res.statusCode,
      });
    });
};
