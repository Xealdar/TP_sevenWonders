const EventEmitter = require('events');

class Divinity {
  constructor(name, timeFactor) {
    this.name_ = name || 'UNKDIVINITY';
    this.corn_ = 0;
    this.gold_ = 0;
    this.cornPrice_ = 5;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      this.worldEvents.emit('favor', {
        corn: this.corn * 0.1,
        gold: this.gold * 0.1
      });

      if (Math.random() > 0.95) {
        this.worldEvents.emit('blessing', {
          corn: 100 * this.corn,
          gold: 100 * this.gold
        });
      }

      if (Math.random() > 0.99) {
        this.worldEvents.emit('retribution', Math.floor(10000 * Math.random()));
      }
    }, this.timeFactor);


    this.stockMarketInterval_ = setInterval(() => {
      let plusOrMinus = Math.random() < 0.5 & this.cornPrice > 1 ? -1 : 1;
      this.cornPrice_ += plusOrMinus * Math.floor((this.cornPrice_ + 3) * Math.random());
      if (this.cornPrice <= 0)
        this.cornPrice_ = 1;
    }, this.timeFactor * Math.floor(5 * Math.random()));
  }

  offeringCorn(offer) {
    return new Promise((resolve, reject) => {
      if (typeof offer === 'number') {
        setTimeout(() => {
          this.corn_ = offer >= 0 ? this.corn + offer : 0;
          resolve();
        }, 4 * this.timeFactor * Math.random());
      } else {
        reject(
          new Error(
            `You didn't gave a number of corn to ${this.name_}, Earth collapsed`
          )
        );
      }
    });
  }

  offeringGold(offer) {
    return new Promise((resolve, reject) => {
      if (typeof offer === 'number') {
        setTimeout(() => {
          this.gold_ = offer >= 0 ? this.gold + offer : 0;
          resolve();
        }, 4 * this.timeFactor * Math.random());
      } else {
        reject(
          new Error(
            `You didn't gave a number of gold to ${this.name_}, Earth collapsed`
          )
        );
      }
    });
  }

  buyingCorn(divinity, corn) {
    return new Promise((resolve, reject) => {
      if (divinity instanceof Divinity) {
        setTimeout(() => {

          if (Math.random() > 0.5)
            return reject(
              new Error(
                `Sorry, ${divinity.name} refused to sell corn`
              )
            );

          let goldToPay = divinity.cornPrice_ * corn;
          if (goldToPay <= this.gold) {
            if (Math.random() > 0.10) {
              let lostGold = Math.round(Math.random() * goldToPay);
              let lostCorn = Math.round(Math.random() * corn);
              
              divinity.corn_ -= lostCorn;
              this.gold_ -= lostGold;
              reject(
                new Error(
                  `You were attacked by a wild Maxime Robin ! You lost ${lostGold} gold and ${divinity.name} lost ${lostCorn} corn !`
                )
              )
            } else {
              this.gold_ -= goldToPay;
              this.corn_ += corn;
              divinity.gold_ += goldToPay;
              divinity.corn_ -= corn;
              resolve();
            }
          } else {
            reject(
              new Error(
                `You need ${goldToPay} gold to buy ${corn} corn at the price of ${divinity.cornPrice} gold/corn. You only have ${this.gold_} gold.`
              )
            )
          }
        }, 3 * this.timeFactor * Math.random());
      } else {
        reject(
          new Error(
            'You have to trade with a Divinity'
          )
        )
      }
    });
  }

  get cornPrice() {
    return this.cornPrice_;
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  endWorld() {
    clearInterval(this.stockMarketInterval_)
    clearInterval(this.gaiaInterval_);
  }
}

module.exports = { Divinity };
