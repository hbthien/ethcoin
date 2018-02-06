var fs = require("fs");
var data = '';

// Tao mot Readable Stream
var readerStream = fs.createReadStream('package.json');

// Thiet lap encoding la utf8. 
readerStream.setEncoding('UTF8');

// Xu ly cac su kien lien quan toi Stream --> data, end, va error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Ket thuc chuong trinh");
