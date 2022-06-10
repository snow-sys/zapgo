let { tambahBanner } = require("../../repository/banner");

module.exports = async (req, res) => {
  let data = req.body;

  tambahBanner(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data banner.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data banner",
        code: res.statusCode,
        response: err,
      });
    });
};
