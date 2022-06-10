let { tambahNegara } = require("../../repository/negara");

module.exports = async (req, res) => {
  let data = req.body;

  tambahNegara(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data negara.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data negara",
        code: res.statusCode,
        response: err,
      });
    });
};
