let { editBanner } = require("../../repository/banner");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;

  if (uid) {
    editBanner({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data banner.",
          code: 201,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "gagal ubah data banner",
          code: 400,
          response: err,
        });
      });
  } else {
    res.status(400).json({
      message: "uid barang tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
