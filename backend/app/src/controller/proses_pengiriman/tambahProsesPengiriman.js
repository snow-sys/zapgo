let { tambahProsesPengiriman } = require("../../repository/prosesPengiriman");

module.exports = async (req, res) => {
  let data = req.body;

  tambahProsesPengiriman(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data proses pengiriman.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data proses pengiriman",
        code: res.statusCode,
        response: err,
      });
    });
};
