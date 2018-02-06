var http = require('http');
var fs = require('fs');
var url = require('url');


// Tao mot Server
http.createServer( function (request, response) {  
   // Parse request co chua ten file
   var pathname = url.parse(request.url).pathname;
   
   // In thong tin ve ten file ma tu do Request duoc tao.
   console.log("Request cho " + pathname + " da duoc nhan.");
   
   // Doc noi dung tu File da duoc yeu cau boi Request
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Ghi noi dung cua File toi phan BODY cua Response
         response.write(data.toString());		
      }
      // Gui phan BODY cua Response 
      response.end();
   });   
}).listen(8081);

// In thong bao sau tren console
console.log('Server dang chay tai dia chi: http://127.0.0.1:8081/');
