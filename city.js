const EventEmitter = require('events');
const {Divinity} = require('./divinity');

class City {
  constructor(name,divinityName, timeFactor) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName, timeFactor);
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.cornPrice_ = 5;
    this.timeFactor_ = timeFactor;
    this.init();
  }

  init() {
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));

    this.stockMarketInterval_ = setInterval(() => {
      let plusOrMinus = Math.random() < 0.5 & this.cornPrice > 1 ? -1 : 1;
      this.cornPrice_ += plusOrMinus * Math.floor((this.cornPrice_ + 3) * Math.random());
      if (this.cornPrice <= 0)
        this.cornPrice_ = 1;
    }, this.timeFactor * Math.floor(5 * Math.random()));
  }

  getShit(s) {
    this.corn_ += Math.floor(s.corn);
    this.gold_ += Math.floor(s.gold);
  }

  giveShit() {
    this.divinity_.offeringCorn(this.corn_);
    this.divinity_.offeringGold(this.gold_);
    this.corn_ = 0;
    this.gold_ = 0;
  }

  showShit() {
    console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
  }

  gotRobbedGold(gold) {
    this.gold_ -= gold;
  }

  gotRobbedCorn(corn) {
    this.corn_ -= corn;
  }

  soldCorn(corn, gold) {
    this.corn_ -= corn;
    this.gold_ += gold;
  }

  boughtCorn(corn, gold) {
    this.gold_ -= gold;
    this.corn_ += corn;
  }

  buyingCorn(city, corn) {
    return new Promise((resolve, reject) => {
      if (!(city instanceof City))
        return reject(new Error('You have to trade with a City'));

      if(!(typeof corn === "number"))
      return reject(new Error('You have to give valid amount of corn')); 

      setTimeout(() => {
        let goldToPay = city.cornPrice * corn;

        if (city.corn < corn || Math.random() > 0.8)
          return reject(new Error(`Sorry, ${city.name} could not sell corn`));

        if (goldToPay > this.gold)
          return reject(new Error(`${this.name} needs ${goldToPay} gold to buy ${corn} corn at the price of ${city.cornPrice} gold/corn. They only have ${this.gold_} gold.`));

        if (Math.random() > 0.90) {
          let lostGold = Math.round(Math.random() * goldToPay);
          let lostCorn = Math.round(Math.random() * corn);

          city.gotRobbedCorn(lostCorn);
          this.gotRobbedGold(lostGold);

          return reject(new Error(`Attacked by a wild Maxime Robin ! ${this.name} lost ${lostGold} gold and ${city.name} lost ${lostCorn} corn !`));
        }

        this.boughtCorn(corn, goldToPay);
        city.soldCorn(corn, goldToPay);
        resolve();

      }, 3 * this.timeFactor * Math.random());
    });
  }

  get cornPrice(){
    return this.cornPrice_;
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get name() {
    return this.name_;
  }
}


module.exports = { City };