let { hapusKeunggulan } = require("../../repository/keunggulan");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusKeunggulan({ uid })
    .then((newData) => {
      if (newData.length > 0) {
        res.json({
          message: "berhasil hapus data keunggulan.",
          code: res.statusCode,
          response: newData,
        });
      } else {
        res.json({
          message: "uid keunggulan tidak ditemukan di database.",
          code: res.statusCode,
          response: newData,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data keunggulan",
        code: res.statusCode,
        response: err,
      });
    });
};
