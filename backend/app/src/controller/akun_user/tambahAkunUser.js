let { tambahUser } = require("../../repository/akun_user");

module.exports = async (req, res) => {
  let data = req.body;
  tambahUser(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data user akun.",
        code: 201,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data keunggulan",
        code: 400,
        response: err,
      });
    });
};
