/** mengatur request untuk menampilkan artikel */
let { listNegara } = require("../../repository/negara");

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid } = req.params;
  let { limit, offset, cari } = req.query;

  //jalan function listArtikel
  listNegara({ uid, limit, offset, cari })
    .then(async (data) => {
      res.json({
        message: "berhasil menampilkan list negara",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list negara",
        code: res.statusCode,
        response: err,
      });
    });
};
