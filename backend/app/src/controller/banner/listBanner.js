/** mengatur request untuk menampilkan artikel */
let { listBanner } = require("../../repository/banner");
let ax = require("axios").default;

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid } = req.params;
  let { limit, offset, cari } = req.query;

  //jalan function listArtikel
  listBanner({ uid, limit, offset, cari })
    .then(async (data) => {
      //gunakan for untuk menambahkan url gambar pada response
      for (let index in data) {
        //get data uid untuk memanggil gambar
        let nm = await ax
          .get(
            `${req.protocol}://${req.get("host")}/api/v1/gambar?uid_gambar=${
              data[index].uid
            }`
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
        message: "berhasil menampilkan list banner",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list banner",
        code: res.statusCode,
        response: err,
      });
    });
};
