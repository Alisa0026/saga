// once
// let EventEmitter = require('events');
import EventEmitter from 'events';
let event = new EventEmitter()
event.once('click', (data) => {
    console.log(data);
})
event.emit('click', 'A')
event.emit('click', 'B')