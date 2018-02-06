/*
var fs = require("fs");

fs.readFile('package.json', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("Ket thuc chuong trinh");
*/

// Khai bao events module
var events = require('events');
// Tao mot doi tuong eventEmitter
var eventEmitter = new events.EventEmitter();

// Tao mot Event Handler nhu sau:
var connectHandlerfunc = function connected() {
   console.log('Tao ket noi thanh cong!');
  
   // Kich hoat su kien data_received 
   eventEmitter.emit('data_receive');
}

// Gan ket su kien connection voi Event Handler
eventEmitter.on('myconnection', connectHandlerfunc);
 
// Gan ket su kien data_received voi mot ham an danh
eventEmitter.on('data_receive', function(){
   console.log('Du lieu duoc tiep nhan thanh cong.');
});

// Kich hoat su kien connection 
eventEmitter.emit('myconnection');


console.log("Ket thuc chuong trinh.");
