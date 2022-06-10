let { tambahGambar } = require("../repository/gambar");
const sharp = require("sharp");
//set image dimension
let imageDimension = {
  info_banner: [{ name: "banner", width: 670, height: 376 }],
  artikel: [{ name: "artikel", width: 670, height: 376 }],
};

exports.compressGambar = async ({
  bufferImage,
  kategori,
  nama_gambar,
  uid_gambar,
}) => {
  let imageProperties = imageDimension[kategori] || [
    { name: `${kategori}`, width: 670, height: 376 },
  ];
  let promises = imageProperties
    // map nama file
    .map(({ name, height, width }) => ({
      name: `${nama_gambar}_${name}`,
      height,
      width,
    }))
    // buat file dan insert nama file ke db secara async
    .map(({ name, height, width }) => {
      // pembuatan file dibuat async karena memakan waktu
      // dan tidak memiliki dependensi ke yg lain
      (async () => {
        sharp(bufferImage)
          .resize({ width, height, fit: "contain" })
          .toFile(`app/assets/${name}.webp`);
      })();
      return tambahGambar(`${name}.webp`, uid_gambar, kategori);
    });
  return Promise.all(promises);
};
