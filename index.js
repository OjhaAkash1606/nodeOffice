const Fs = require("fs");
Fs.writeFileSync("create.txt", "Hello created this file");


// const data = Fs.readFileSync("create.txt", { encoding: "utf8" });
const data = Fs.readFileSync("create.txt").toString();

console.log(data);

Fs.renameSync("create.txt", "readWrite.txt");

