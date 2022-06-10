/** mengatur request untuk hapus artikel dan gambar yang ada di artikel
 */

let { hapusArtikel } = require("../../repository/artikel");
let { hapusGambar } = require("../../repository/gambar");

module.exports = (req, res) => {
  let { uid } = req.params;

  //jika uid tidak exist / not undefined
  if (uid) {
    hapusArtikel(uid)
      .then((data) => {
        hapusGambar(undefined, uid);
        res.json({
          message: "berhasil hapus data artikel",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "gagal menghapus data artikel",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    res.json({
      message: "uid artikel tidak ditemukan",
      code: res.statusCode,
    });
  }
};
