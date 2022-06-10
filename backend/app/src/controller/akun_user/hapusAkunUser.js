let { hapusAkunUser } = require("../../repository/akun_user");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusAkunUser({ uid })
    .then((newData) => {
      if (newData.length > 0) {
        res.json({
          message: "berhasil hapus data akun user.",
          code: 200,
          response: newData,
        });
      } else {
        res.json({
          message: "uid akun user tidak ditemukan di database.",
          code: 400,
          response: newData,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data akun user",
        code: 404,
        response: err,
      });
    });
};
