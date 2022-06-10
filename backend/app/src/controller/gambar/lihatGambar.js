/** mengatur request untuk menampilkan gambar */

let { lihatGambar } = require("../../repository/gambar");
let fs = require("fs");
const path = require("path");

let directory = process.cwd() + "/assets";
// let directory = process.cwd() + "/src/assets";

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = (req, res) => {
  let { uid } = req.params;

  lihatGambar(uid)
    .then((data) => {
      console.log(process.cwd());
      if (data.length > 0) {
        res
          // .setHeader("Content-Type", "image/png")
          .status(200)
          .sendFile(
            path.join(process.cwd(), `/app/assets/${data[0].nama_gambar}`)
          );
        //   .sendFile(path.resolve(directory + "/" + data[0].nama_gambar));
      } else {
        res.status(200).json("gambar tidak ada sama sekali di database");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
