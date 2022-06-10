/** function untuk membuat tabel gambar */

let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists gambar(
      uid uuid primary key default uuid_generate_v4(), 
      nama_gambar text not null,
      uid_gambar uuid not null,
      kategori text not null default '',
      created_at timestamp default now());
     
  `);
})();
