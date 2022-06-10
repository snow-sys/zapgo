/** mengatur request untuk menampilkan artikel */
let { listBg } = require("../../repository/background");
let ax = require("axios").default;
require("dotenv").config();

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid } = req.params;
  let { limit, offset, cari } = req.query;

  //jalan function listArtikel
  listBg({ uid, limit, offset, cari })
    .then(async (data) => {
      //gunakan for untuk menambahkan url gambar pada response
      for (let index in data) {
        //get data uid untuk memanggil gambar
        let nm = await ax
          .get(
            `${process.env.LOCAL_DOMAIN}/api/v1/gambar?uid_gambar=${data[index].uid}`
          )
          .then((data) => data.data.response);
        //cek panjang data, jika > 0, map terlebih dahulu untuk mendapatkan urlnya saja
        if (!nm.length > 0) {
          data[index].gambar = nm;
        } else {
          let hasilMap = nm.map((el) => el.urlGambar);
          data[index].gambar = hasilMap;
        }
      }
      res.json({
        message: "berhasil menampilkan list background",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list background",
        code: res.statusCode,
        response: err,
      });
    });
};
