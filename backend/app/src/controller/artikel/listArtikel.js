/** mengatur request untuk menampilkan artikel */
let { listArtikel } = require("../../repository/artikel");
let { totalArtikel } = require("../../repository/artikel");
let { pagination } = require("../../module/pagination");
require("dotenv").config();

module.exports = (req, res) => {
  //baca parameter & query yg diterima
  let { page, cari, uid } = req.query;
  let { slug_artikel } = req.params;

  //atur from dan limit sesuai dengan page yang dikirim
  let { limit, offset } = pagination(page);
  //jalan function listArtikel
  listArtikel({ limit, offset, slug_artikel, cari, uid })
    .then(async (data) => {
      let total_artikel = await totalArtikel();

      //map every data.gambar to build link for image
      for (i = 0; i < data.length; i++) {
        let dataGambar = [];
        data[i].gambar.map((el) => {
          dataGambar.push(
            `${process.env.LOCAL_DOMAIN}/api/v1/gambar/lihat_gambar/${el.uid}`
          );
        });
        data[i].gambar = dataGambar;
      }

      res.json({
        message: "berhasil menampilkan list artikel",
        code: res.statusCode,
        total_artikel,
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list artikel",
        code: res.statusCode,
        response: err,
      });
    });
};
