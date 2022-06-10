let { tambahKeunggulan } = require("../../repository/keunggulan");

module.exports = async (req, res) => {
  let data = req.body;

  tambahKeunggulan(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data keunggulan.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data keunggulan",
        code: res.statusCode,
        response: err,
      });
    });
};
