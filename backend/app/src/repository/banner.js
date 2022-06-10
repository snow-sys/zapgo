let { connection } = require("../module/connection");
const moment = require("moment");

//function list banner
exports.listBanner = ({ uid, limit, offset, cari }) => {
  let param = [limit ? limit : 50, offset ? offset : 0];

  return connection
    .query(
      `
      select * from banner 
      ${
        uid ? "where uid =  $3" : cari ? "where nama_banner ilike $3 " : ""
      }  order by create_at desc
        limit $1 offset $2
      `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
};

// //function tambah data banner
exports.tambahBanner = (
  data = {
    nama_banner,
    keterangan,
    username,
    alt_text,
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  return connection
    .query(
      `
      insert into banner(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};

//function edit surat keterangan
exports.editBanner = ({ uid, data }) => {
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);
  return connection
    .query(`update banner set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus barang
exports.hapusBanner = ({ uid }) => {
  return connection
    .query(`delete from banner where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};
