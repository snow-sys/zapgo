let { editAkunUser } = require("../../repository/akun_user");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;
  if (uid) {
    editAkunUser({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data keunggulan.",
          code: 200,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "gagal ubah data keunggulan",
          code: 400,
          response: err,
        });
      });
  } else {
    res.status(404).json({
      message: "uid keunggulan tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
