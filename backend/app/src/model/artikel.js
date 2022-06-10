/** function untuk membuat tabel artikel */
let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists artikel(
      uid uuid primary key default uuid_generate_v4(), 
      judul_artikel varchar(200) not null, 
      isi_artikel text not null,
      view_count integer default 0,
      creator varchar(99) not null,
      username varchar(99) not null,
      slug_artikel text default '',
      deskripsi text default '',
      keyword text default '',
      tagline text default '',
      alt_text text default '',
      created_at timestamp default now(),
      update_at timestamp);
  `);
})();
