/** mengatur request untuk menambah artikel */

let { tambahArtikel } = require("../../repository/artikel");

module.exports = (req, res) => {
  let {
    judul_artikel,
    isi_artikel,
    username,
    deskripsi,
    keyword,
    creator,
    tagline,
    alt_text,
  } = req.body;

  //buat slug artikel
  let slug_artikel = judul_artikel
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();

  //filter data yang undefined
  deskripsi ? deskripsi : "";
  keyword ? keyword : "";

  //mulai query tambahArtikel
  tambahArtikel({
    judul_artikel,
    isi_artikel,
    username,
    creator,
    slug_artikel,
    deskripsi,
    keyword,
    tagline,
    alt_text,
  })
    .then((newData) => {
      res.json({
        message: "berhasil menambahkan artikel baru",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menambahkan artikel baru",
        code: res.statusCode,
        response: err,
      });
    });
};
