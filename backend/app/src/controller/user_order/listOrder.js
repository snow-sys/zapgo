/** mengatur request untuk menampilkan artikel */
let { listOrder } = require("../../repository/userOrder");

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid } = req.params;
  let { limit, offset, tujuan, jenis_barang, no_hp, nama_user } = req.query;

  //jalan function list order
  listOrder({ uid, limit, offset, tujuan, jenis_barang, no_hp, nama_user })
    .then(async (data) => {
      res.json({
        message: "berhasil menampilkan list order",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list order",
        code: res.statusCode,
        response: err,
      });
    });
};
