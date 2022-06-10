let { hapusProsesPengiriman } = require("../../repository/prosesPengiriman");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusProsesPengiriman({ uid })
    .then((newData) => {
      if (newData.length > 0) {
        res.json({
          message: "berhasil hapus data proses pengiriman.",
          code: res.statusCode,
          response: newData,
        });
      } else {
        res.json({
          message: "uid proses pengiriman tidak ditemukan di database.",
          code: res.statusCode,
          response: newData,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data proses pengiriman",
        code: res.statusCode,
        response: err,
      });
    });
};
