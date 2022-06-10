/** mengatur request untuk menampilkan artikel */
let { listProsesPengiriman } = require("../../repository/prosesPengiriman");

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid } = req.params;
  let { limit, offset, cari } = req.query;

  //jalan function listArtikel
  listProsesPengiriman({ uid, limit, offset, cari })
    .then(async (data) => {
      res.json({
        message: "berhasil menampilkan list proses pengiriman",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list proses pengiriman",
        code: res.statusCode,
        response: err,
      });
    });
};
