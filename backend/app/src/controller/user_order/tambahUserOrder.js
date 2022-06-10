let { tambahOrderUsers } = require("../../repository/userOrder");

module.exports = async (req, res) => {
  let data = req.body;

  tambahOrderUsers(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data user order.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data user order",
        code: res.statusCode,
        response: err,
      });
    });
};
