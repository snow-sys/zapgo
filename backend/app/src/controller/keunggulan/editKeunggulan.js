let { editKeunggulan } = require("../../repository/keunggulan");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;
  if (uid) {
    editKeunggulan({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data keunggulan.",
          code: 201,
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
    res.status(400).json({
      message: "uid keunggulan tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
