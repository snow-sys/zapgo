let { hapusBg } = require("../../repository/background");
let { hapusGambar } = require("../../repository/gambar");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusBg({ uid })
    .then((newData) => {
      hapusGambar(undefined, uid);
      res.json({
        message: "berhasil hapus data background.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data background",
        code: res.statusCode,
        response: err,
      });
    });
};
