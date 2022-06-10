/** function untuk membuat tabel artikel */
let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists user_order(
      uid uuid primary key default uuid_generate_v4(), 
      nama_user text,
      email text,
      no_hp varchar(13),
      jenis_barang text,
      tujuan text,
      berat integer,
      dimensi integer[], 
      create_at timestamp default now(),
      update_at timestamp);
  `);
})();
