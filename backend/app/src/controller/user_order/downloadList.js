let { listOrderByRange } = require("../../repository/userOrder");
const excelJS = require("exceljs");
let fs = require("fs");

let directory = process.cwd() + "/app/files";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = async (req, res) => {
  //get data user order form db
  let { from, to } = req.query;
  to = new Date(to);
  to.setDate(to.getDate() + 1);
  // console.log(newTo);
  let orderList = await listOrderByRange({ from, to });
  // console.log("order list", orderList);
  let mappedOrderList = orderList.map((el) => {
    temp_dimensi = [
      `panjang : ${el.dimensi[0]} cm, lebar : ${el.dimensi[1]} cm, tinggi : ${el.dimensi[2]} cm`,
    ];
    el.dimensi = temp_dimensi;
    return el;
  });

  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("List Order"); // New Worksheet
  const path = process.cwd() + "/app/files"; // Path to download excel

  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Nama Customer", key: "nama_user", width: 20 },
    { header: "Email", key: "email", width: 25 },
    { header: "No. HP", key: "no_hp", width: 15 },
    { header: "Jenis Barang", key: "jenis_barang", width: 20 },
    { header: "Tujuan", key: "tujuan", width: 20 },
    { header: "Berat (Kg)", key: "berat", width: 12 },
    { header: "Dimensi", key: "dimensi", width: 50 },
    { header: "Tanggal", key: "create_at", width: 15 },
  ];

  // Looping through data
  let counter = 1;
  mappedOrderList.forEach((user) => {
    worksheet.addRow(user); // Add data in worksheet
    counter++;
  });

  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  //Get unix timestamp for file names
  let ms = Math.round(new Date().getTime() / 1000);

  try {
    const dataExcel = await workbook.xlsx
      .writeFile(`${path}/order_${ms}.xlsx`)
      .then(() => {
        res.download(`${path}/order_${ms}.xlsx`);
      });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
      error: err,
    });
  }
};
