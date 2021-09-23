var fs = require("fs");
const path = require("path");

// var content = fs.readFileSync(path.join(__dirname, "readme.txt"));
// console.log(typeof(content));
// console.log(content.toString());

fs.readFile(path.join(__dirname, "readme.txt"), "utf8", (err, data) => {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log(data);
});
console.log("Done");

var options = {
    encoding: "utf8",
    highWaterMark: 16 * 1024 // chunk 16 kb
}
var readable = fs.createReadStream(path.join(__dirname, "readme2.txt"), options);
// readable.on("data", function(chunk) {
//     // console.log(chunk.toString());
//     console.log(chunk.length);
// });
var writeable = fs.createWriteStream(path.join(__dirname, "readme2copy.txt"));
readable.pipe(writeable);



