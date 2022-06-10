/** mengatur request untuk edit artikel
 */

let { editArtikel } = require("../../repository/artikel");

module.exports = (req, res) => {
  //get all params and query
  let { uid } = req.params;
  let {
    judul_artikel,
    isi_artikel,
    deskripsi,
    keyword,
    creator,
    tagline,
    alt_text,
  } = req.body;

  let slug_artikel;
  if (judul_artikel) {
    slug_artikel = judul_artikel
      .replace(/[^a-zA-Z0-9 -]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
  }

  //run editArtikel if uid exist
  if (uid) {
    editArtikel({
      uid,
      judul_artikel,
      slug_artikel,
      isi_artikel,
      deskripsi,
      keyword,
      tagline,
      alt_text,
      creator,
    })
      .then((newData) => {
        res.json({
          message: "berhasil edit data artikel",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        res.json({
          message: "gagal mengedit artikel",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    //return request if didn't have uid
    res.json({
      message: "uid artikel tidak ditemukan",
      code: res.statusCode,
    });
  }
};
