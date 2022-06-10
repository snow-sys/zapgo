let { connection } = require("../module/connection");
const moment = require("moment");

//function list negara
exports.listKeunggulan = ({ uid, limit, offset, cari }) => {
  let param = [limit ? limit : 50, offset ? offset : 0];

  return connection
    .query(
      `
      select * from keunggulan
      ${
        uid ? "where uid =  $3" : cari ? "where nama_proses ilike $3 " : ""
      } order by create_at desc
        limit $1 offset $2
      `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
};

// //function tambah data negara
exports.tambahKeunggulan = (
  data = {
    nama_keunggulan,
    keterangan,
    username,
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  return connection
    .query(
      `
        insert into keunggulan(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};

//function edit data negara
exports.editKeunggulan = ({ uid, data }) => {
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);
  return connection
    .query(`update keunggulan set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus data negara
exports.hapusKeunggulan = ({ uid }) => {
  return connection
    .query(`delete from keunggulan where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};
