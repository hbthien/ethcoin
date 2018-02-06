var http = require('http');

// Tao doi tuong options duoc su dung boi Request 
var options = {
   host: 'localhost',
   port: '8081',
   path: '/index.htm'  
};

// Ham callback duoc su dung de xu ly Response
var callback = function(response){
   // Tiep tuc cap nhat du lieu toi Stream
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // Ket thuc qua trinh nhan du lieu.
      console.log(body);
   });
}
// Tao mot Request toi Server
var req = http.request(options, callback);
req.end();
