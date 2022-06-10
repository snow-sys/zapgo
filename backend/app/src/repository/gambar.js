//berisikan function - function berhubungan dengan gambar

let { connection } = require("../module/connection");
let fs = require("fs");
let { getCurrentTime } = require("../module/getCurrentTime");

// formatted time to YYYY-MM-DD hh:mm:ss for logging
let formatted_date = getCurrentTime();

//function tambah gambar
exports.tambahGambar = (nama_gambar, uid_gambar, kategori) => {
  return connection
    .query(
      `
      insert into gambar(nama_gambar, uid_gambar, kategori)
      values($1, $2, $3) returning *
      `,
      [nama_gambar, uid_gambar, kategori]
    )
    .then(({ rows }) => rows);
};

//function me-list gambar
exports.listGambar = (limit, from, uid, uid_gambar) => {
  let param = [limit ? limit : 50, from ? from : 0];
  // console.log(param)
  return connection
    .query(
      `select * from gambar
      ${uid ? "where uid = $3" : uid_gambar ? "where uid_gambar = $3" : ""}
      order by created_at desc
      limit $1 offset $2 
      `,
      uid ? param.concat(uid) : uid_gambar ? param.concat(uid_gambar) : param
    )
    .then(({ rows }) => rows);
};

//function untuk membuka / melihat gambar
exports.lihatGambar = (uid) => {
  return connection
    .query(
      `
        select nama_gambar from gambar where uid = $1
        `,
      [uid]
    )
    .then(({ rows }) => rows);
};

exports.hapusGambar = async (uid, uid_gambar) => {
  let dataGambar = await connection
    .query(
      `
      delete from gambar ${
        uid_gambar ? "where uid_gambar = $1" : "where uid = $1"
      }
      returning *
      `,
      uid_gambar ? [uid_gambar] : [uid]
    )
    .then(({ rows }) => rows);

  console.log(`[${formatted_date}] : remove image from folder assets...`);
  dataGambar.map((el) => {
    // fs.unlinkSync(process.cwd() + "/src/assets/" + el.nama_gambar)
    fs.unlinkSync(
      process.cwd() + "/app/assets/" + el.nama_gambar,
      (err, result) => {
        if (err) {
          console.log(
            `[${formatted_date}] : remove image from folder assets failed!`
          );
          throw err;
        }
      }
    );
  });
  console.log(`[${formatted_date}] : remove image from folder assets success!`);
  return dataGambar;
};
