let { hapusBanner } = require("../../repository/banner");
let { hapusGambar } = require("../../repository/gambar");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusBanner({ uid })
    .then((newData) => {
      hapusGambar(undefined, uid);
      res.json({
        message: "berhasil hapus data banner.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data banner",
        code: res.statusCode,
        response: err,
      });
    });
};
