let { connection } = require("../module/connection");
const moment = require("moment");

//function list negara
exports.listNegara = ({ uid, limit, offset, cari }) => {
  let param = [limit ? limit : 50, offset ? offset : 0];

  return connection
    .query(
      `
      select * from negara
      ${
        uid ? "where uid =  $3" : cari ? "where nama_negara ilike $3 " : ""
      } order by create_at desc
        limit $1 offset $2
      `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
};

// //function tambah data negara
exports.tambahNegara = (
  data = {
    nama_negara,
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
        insert into negara(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};

//function edit data negara
exports.editNegara = ({ uid, data }) => {
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);
  return connection
    .query(`update negara set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus data negara
exports.hapusNegara = ({ uid }) => {
  return connection
    .query(`delete from negara where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};
