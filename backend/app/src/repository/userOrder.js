let { connection } = require("../module/connection");
// const moment = require("moment");

//function list banner
exports.listOrder = ({
  uid,
  limit,
  offset,
  tujuan,
  jenis_barang,
  no_hp,
  nama_user,
}) => {
  let param = [limit ? limit : 50, offset ? offset : 0];

  return connection
    .query(
      `
      select * from user_order 
      ${
        uid
          ? "where uid =  $3"
          : tujuan
          ? "where tujuan ilike $3"
          : jenis_barang
          ? "where jenis_barang ilike $3"
          : no_hp
          ? "where no_hp ilike $3"
          : nama_user
          ? "where nama_user ilike $3"
          : ""
      }  
      order by create_at desc 
      limit $1 offset $2
      `,
      uid
        ? param.concat(uid)
        : tujuan
        ? param.concat(`%${tujuan}%`)
        : jenis_barang
        ? param.concat(`%${jenis_barang}%`)
        : no_hp
        ? param.concat(`%${no_hp}%`)
        : nama_user
        ? param.concat(`%${nama_user}%`)
        : param
    )
    .then(({ rows }) => rows);
};

//get list order by date
exports.listOrderByRange = ({ from, to }) => {
  console.log("from to ", from, to);
  return connection
    .query(
      `
      select * from user_order 
      ${from ? `where create_at >= $1 and create_at <= $2 ` : ""}  
      order by create_at desc 
      `,
      from ? [from, to] : []
    )
    .then(({ rows }) => rows);
};

//function tambah data negara
exports.tambahOrderUsers = (
  data = {
    nama_user,
    email,
    no_hp,
    jenis_barang,
    tujuan,
    berati,
    dimensi,
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  return connection
    .query(
      `
          insert into user_order(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};
