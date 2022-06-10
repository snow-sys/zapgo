let { tambahBg } = require("../../repository/background");

module.exports = async (req, res) => {
  let data = req.body;

  tambahBg(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data background.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data background",
        code: res.statusCode,
        response: err,
      });
    });
};
