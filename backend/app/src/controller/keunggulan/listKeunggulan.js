/** mengatur request untuk menampilkan artikel */
let { listKeunggulan } = require("../../repository/keunggulan");

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid } = req.params;
  let { limit, offset, cari } = req.query;

  //jalan function listArtikel
  listKeunggulan({ uid, limit, offset, cari })
    .then(async (data) => {
      res.json({
        message: "berhasil menampilkan list keunggulan",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list keunggulan",
        code: res.statusCode,
        response: err,
      });
    });
};
