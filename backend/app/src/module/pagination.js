/** berisikan pagination yang digunakan server */

//function for using middleware
exports.pagination = (page) => {
  let limit, offset;
  let artikelPerPage = 10;
  if (page) {
    if (page == 1) {
      (offset = 0), (limit = artikelPerPage);
    } else if (page >= 1) {
      (limit = artikelPerPage), (offset = artikelPerPage * (page - 1));
    }
  } else {
    (limit = 20), (offset = 0);
  }
  return { limit, offset };
};
