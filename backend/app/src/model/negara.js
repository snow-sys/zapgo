/** function untuk membuat tabel artikel */
let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists negara(
      uid uuid primary key default uuid_generate_v4(), 
      nama_negara text,
      keterangan text,
      username text, 
      create_at timestamp default now(),
      update_at timestamp);
  `);
})();
