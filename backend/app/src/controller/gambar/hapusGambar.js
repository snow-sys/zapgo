/** mengatur request untuk menghapus gambar */

let { hapusGambar } = require("../../repository/gambar");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { uid_gambar } = req.query;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start hapusGambar query...`);
  hapusGambar(uid, uid_gambar)
    .then((newLogo) => {
      console.log(`[${formatted_date}] : Finish hapusGambar query!`);
      res.json({
        message: "berhasil menghapus data gambar",
        code: res.statusCode,
        response: newLogo,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : hapusGambar query failed!`);
      res.json({
        message: "gagal menghapus data gambar",
        code: res.statusCode,
      });
    });
};
