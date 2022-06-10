/** mengatur request untuk men-list gambar */

let { listUser } = require("../../repository/akun_user");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { limit, offset, cari } = req.query;

  listUser({ uid, limit, offset, cari })
    .then((data) => {
      res.json({
        message: "berhasil menampilkan list akun user.",
        code: 200,
        response: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: "gagal menampilkan list akun user",
        code: 400,
        response: err,
      });
    });
};
