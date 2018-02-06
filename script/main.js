var events = require('events');
var eventEmitter = new events.EventEmitter();

// listener #1
var listner1 = function funclistner1() {
   console.log('listener1 duoc thuc thi.');
}

// listener #2
var listner2 = function funclistner2() {
  console.log('listener2 duoc thuc thi.');
}

// Gan ket su kien connection voi ham listner1
eventEmitter.addListener('connection', listner1);

// Gan ket su kien connection voi ham listner2
eventEmitter.on('connection', listner2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Event Listner dang lang nghe su kien connection");

// Fire the connection event 
eventEmitter.emit('connection');

// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Bay gio, Listner1 se khong lang nghe.");

// Fire the connection event 
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Event Listner dang lang nghe su kien connection");

console.log("Ket thuc chuong trinh.");
