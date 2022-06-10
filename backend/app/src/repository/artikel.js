/** berisikan function - function yang berhubungan dengan artikel */
const moment = require("moment");
let { connection } = require("../module/connection");
let { hapusGambar } = require("../repository/gambar");

// function menghitung total artikel
exports.totalArtikel = () => {
  return connection
    .query(
      `
  select count(uid) as total_artikel from artikel 
  `
    )
    .then(({ rows }) => rows[0].total_artikel)
    .catch((err) => 0);
};

//function tambah artikel
exports.tambahArtikel = ({
  judul_artikel,
  isi_artikel,
  username,
  creator,
  slug_artikel,
  deskripsi,
  keyword,
  tagline,
  alt_text,
}) => {
  return connection
    .query(
      `
      insert into artikel(
          judul_artikel, 
          isi_artikel, 
          username, 
          creator, 
          slug_artikel, 
          deskripsi, 
          keyword,
          tagline,
          alt_text)
      values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *
      `,
      [
        judul_artikel,
        isi_artikel,
        username,
        creator,
        slug_artikel,
        deskripsi,
        keyword,
        tagline,
        alt_text,
      ]
    )
    .then(({ rows }) => rows);
};

//function list artikel
exports.listArtikel = async ({ limit, offset, slug_artikel, cari, uid }) => {
  let param = [limit ? limit : 99, offset ? from : 0];

  //cari data artikel sesuai parameter
  let data_artikel = await connection
    .query(
      `
  select 
    uid, 
    judul_artikel,
    slug_artikel,
    deskripsi,
    keyword,
    tagline,
    alt_text,
    view_count,
    username, 
    creator, 
    created_at,
    update_at ${slug_artikel || uid ? ", isi_artikel" : ""} 
  from artikel
  ${
    slug_artikel
      ? "where slug_artikel ilike $3"
      : cari
      ? "where judul_artikel ilike $3 "
      : uid
      ? "where uid = $3"
      : ""
  } order by created_at desc
    limit $1 offset $2
  `,
      slug_artikel
        ? param.concat(`${slug_artikel}`)
        : cari
        ? param.concat(`%${cari}%`)
        : uid
        ? param.concat(uid)
        : param
    )
    .then(({ rows }) => rows);

  // console.log("--->", data_artikel);
  //cari uid gambar pada list artikel yang ada
  if (data_artikel) {
    for (let index in data_artikel) {
      let hasilUidGambar = await connection
        .query(`select uid from gambar where uid_gambar = $1`, [
          data_artikel[index].uid,
        ])
        .then(({ rows }) => rows);
      data_artikel[index].gambar = hasilUidGambar;
    }
  }

  //   //update view_count ketika ada parameter uid
  //   if (slug_artikel) {
  //     data_artikel[0].view_count = data_artikel[0].view_count + 1;

  //     await connection.query(
  //       `
  //     update artikel set view_count = $1 where uid = $2`,
  //       [data_artikel[0].view_count, data_artikel[0].uid]
  //     );
  //   }
  console.log(data_artikel);
  return data_artikel;
};

//function hapus artikel
exports.hapusArtikel = async (uid) => {
  let dataArtikel = await connection
    .query(`delete from artikel where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
  await hapusGambar(undefined, uid);
  return dataArtikel;
};

//function edit artikel
exports.editArtikel = ({
  uid,
  judul_artikel,
  slug_artikel,
  isi_artikel,
  deskripsi,
  keyword,
  tagline,
  alt_text,
  creator,
}) => {
  let data = {
    judul_artikel,
    isi_artikel,
    slug_artikel,
    deskripsi,
    keyword,
    tagline,
    alt_text,
    creator,
  };
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);

  return connection
    .query(`update artikel set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows);
};
