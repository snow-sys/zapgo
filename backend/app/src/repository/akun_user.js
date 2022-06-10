let { connection } = require("../module/connection");
const moment = require("moment");

//function list negara
exports.listUser = ({ uid, limit, offset, cari }) => {
  let param = [limit ? limit : 100, offset ? offset : 0];

  return connection
    .query(
      `
      select * from akun_user
      ${
        uid
          ? "where uid =  $3"
          : cari
          ? "where nama_user ilike $3 or email like $3 "
          : ""
      } order by create_at desc
        limit $1 offset $2
      `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
};

// //function tambah data akun user
exports.tambahUser = (
  data = {
    username,
    nama_user,
    pwd,
    email,
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  return connection
    .query(
      `
        insert into akun_user(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};

//function edit data negara
exports.editAkunUser = ({
  uid,
  data = {
    username,
    nama_user,
    pwd,
    email,
    status_username,
  },
}) => {
  console.log(data);
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);
  return connection
    .query(`update akun_user set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus data negara
exports.hapusAkunUser = ({ uid }) => {
  return connection
    .query(`delete from akun_user where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};

//function login
exports.login = (username, pwd) => {
  return connection
    .query(`select * from akun_user where username = $1 and pwd = $2`, [
      username,
      pwd,
    ])
    .then(({ rows }) => rows);
};
