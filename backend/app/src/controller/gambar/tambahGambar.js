/** mengatur request untuk menambah gambar */

let crypto = require("crypto");
let fs = require("fs");
let { getCurrentTime } = require("../../module/getCurrentTime");
let { compressGambar } = require("../../module/compressGambar");

//get directory for save the image, if not exitst make one
let directory = process.cwd() + "/app/assets";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = async (req, res) => {
  //get data from form-data
  let { uid_gambar, kategori } = req.body;
  let gambar = req.files.nama_gambar;
  let bufferImage = req.files.nama_gambar.data;
  let tipe_file = gambar.mimetype.split("/")[0].toLowerCase();
  let extensi_file = gambar.mimetype.split("/")[1].toLowerCase();

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check type and extension of an image
  if (
    tipe_file == "image" &&
    (extensi_file == "png" || extensi_file == "jpg" || extensi_file == "jpeg")
  ) {
    let nama_gambar = crypto
      .createHash("md5")
      .update(gambar.name + Date.now())
      .digest("hex");

    try {
      let addGambar = await compressGambar({
        bufferImage,
        kategori,
        nama_gambar,
        uid_gambar,
      });
      res.json({
        message: "berhasil tambah Gambar.",
        code: res.statusCode,
        response: addGambar,
      });
    } catch (err) {
      res.json({
        message: "berhasil tambah data gambar, gagal compress gambar",
        code: res.statusCode,
        response: err,
      });
    }
  } else {
    console.log(`[${formatted_date}] : file type and extension not supported!`);
    res.json({
      code: res.statusCode,
      message: "file type and extension not supported!",
    });
  }
};
