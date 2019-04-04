const EventEmitter = require('events');

class City {
  constructor(name) {
    this.name_ = name || 'UNKCITY';
    this.corn_ = 5000;
    this.gold_ = 1000;
  }

  init(){
    
  }

}

module.exports = {City}