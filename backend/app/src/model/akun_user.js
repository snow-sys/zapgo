/** function untuk membuat tabel artikel */
let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists akun_user(
      uid uuid primary key default uuid_generate_v4(), 
      username varchar(20) not null,
      nama_user varchar(50) not null,
      pwd text not null,
      email varchar(50) not null,
      status_username varchar(1) not null default '0',
      create_at timestamp default now(),
      update_at timestamp);
  `);
})();
