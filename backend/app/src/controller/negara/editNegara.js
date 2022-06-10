let { editNegara } = require("../../repository/negara");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;

  if (uid) {
    editNegara({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data negara.",
          code: 201,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "gagal ubah data negara",
          code: 400,
          response: err,
        });
      });
  } else {
    res.status(400).json({
      message: "uid negara tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
