var fs = require("fs");
var readableStream = fs.createReadStream("file.txt");
var data = "";

readableStream.setEncoding("utf8");

readableStream.on("data", function(chunk) {
    data+=chunk;
});

readableStream.on("end", function() {
    console.log(data);
});
