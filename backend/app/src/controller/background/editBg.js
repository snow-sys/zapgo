/** mengatur request untuk edit artikel
 */

let { editBg } = require("../../repository/background");

module.exports = (req, res) => {
  //get all params and query
  let { uid } = req.params;
  let { nama_bg, keterangan, username, alt_text } = req.body;

  //run editBg if uid exist
  if (uid) {
    editBg({
      uid,
      nama_bg,
      keterangan,
      username,
      alt_text,
    })
      .then((newData) => {
        res.json({
          message: "berhasil edit data background",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        res.json({
          message: "gagal mengedit data background",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    //return request if didn't have uid
    res.json({
      message: "uid bg tidak ditemukan",
      code: res.statusCode,
    });
  }
};
