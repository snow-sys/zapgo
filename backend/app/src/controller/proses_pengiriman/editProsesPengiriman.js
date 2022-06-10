let { editProsesPengiriman } = require("../../repository/prosesPengiriman");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;

  if (uid) {
    editProsesPengiriman({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data proses pengiriman.",
          code: 201,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "gagal ubah data proses pengiriman",
          code: 400,
          response: err,
        });
      });
  } else {
    res.status(400).json({
      message: "uid proses pengiriman tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
