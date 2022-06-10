let arr = [
  { test: "a", halo: "b" },
  { test: "a", halo: "c" },
  { test: "a", halo: "d" },
];

let hasil = arr.map((el) => (el.halo = el.halo));

console.log(hasil);
console.log(arr);
