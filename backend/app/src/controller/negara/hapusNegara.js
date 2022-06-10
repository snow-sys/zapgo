let { hapusNegara } = require("../../repository/negara");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusNegara({ uid })
    .then((newData) => {
      if (newData.length > 0) {
        res.json({
          message: "berhasil hapus data negara.",
          code: res.statusCode,
          response: newData,
        });
      } else {
        res.json({
          message: "uid negara tidak ditemukan di database.",
          code: res.statusCode,
          response: newData,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data negara",
        code: res.statusCode,
        response: err,
      });
    });
};
