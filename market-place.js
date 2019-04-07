const {Troop} = require('./troop');

class MarketPlace {
	constructor(timeFactor) {
		this.timeFactor_ = timeFactor;
		this.merchants_ = [];
		this.cornPrice_ = 5;
		this.troopTypes_ = [{level: 1, price: 10}, {level: 2, price: 40}, {level: 3, price: 90}, {level: 4, price: 160}, {level: 5, price: 230}];
		this.init();
	}

	init() {
		this.stockMarketInterval_ = setInterval(() => {
			const plusOrMinus = Math.random() < 0.5 & this.cornPrice_ > 1 ? -1 : 1;
			this.cornPrice_ += plusOrMinus * Math.floor((this.cornPrice_ + 3) * Math.random());
			if (this.cornPrice_ <= 0) {
				this.cornPrice_ = 1;
			}

			console.log(`Corn price changed to ${this.cornPrice_} gold`);
		}, this.timeFactor_ * 5 * Math.random());
	}

	showMerchants() {
		console.log(this.merchants_);
	}

	newArrival(cityName, gold, corn) {
		this.merchants_.push({city: cityName, gold, corn, troops: []});
	}

	newDeparture(cityName) {
		const merchant = this.merchants_.find(merchant => merchant.city === cityName);
		const {gold} = merchant;
		const {corn} = merchant;
		const {troops} = merchant;
		this.merchants_.splice(this.merchants_.indexOf(merchant), 1);
		return {gold, corn, troops};
	}

	buyCorn(city, corn) {
		const client = this.merchants_.find(merchant => merchant.city === city.name);

		return new Promise((resolve, reject) => {
			if (client === null) {
				return reject(new Error(`No merchant was found from ${city.name}`));
			}

			setTimeout(() => {
				const cornInSale = this.merchants_.filter(merchant => merchant !== client).reduce((acc, val) => acc + val.corn, 0);
				if (corn <= cornInSale) {
					const transactionPrice = corn * this.cornPrice_;
					if (client.gold >= transactionPrice) {
						this.merchants_.filter(merchant => merchant !== client).forEach(merchant => {
							if (corn > 0) {
								const cornToBuyFromMerchant = merchant.corn <= corn ? merchant.corn : corn;
								this.buyCornFromMerchant(client, merchant, cornToBuyFromMerchant);
								corn -= cornToBuyFromMerchant;
							}
						});
						resolve();
					} else {
						reject(new Error(`Not enough money. ${transactionPrice} required, ${client.gold} owned`));
					}
				} else {
					reject(new Error(`Not enough corn in sale. ${corn} required, ${cornInSale} founded`));
				}
			}, Math.random() * this.timeFactor_ * 4);
		});
	}

	buyCornFromMerchant(client, merchant, corn) {
		const priceToPay = this.cornPrice_ * corn;
		client.gold -= priceToPay;
		merchant.gold += priceToPay;
		client.corn += corn;
		merchant.corn -= corn;
	}

	buyTroops(city, level, nbrTroop) {
		const client = this.merchants_.find(merchant => merchant.city === city.name);

		return new Promise((resolve, reject) => {
			if (client === null) {
				return reject(new Error(`No merchant was found from ${city.name}`));
			}

			if (!this.troopTypes_.map(troop => troop.level).includes(level)) {
				return reject(new Error(`Level ${level} troop is not disponible in this market place.`));
			}

			setTimeout(() => {
				const troop = this.troopTypes_.find(troop => troop.level === level);
				const transactionPrice = nbrTroop * troop.price;
				if (client.gold >= transactionPrice) {
					client.gold -= transactionPrice;
					for (let i = 0; i < nbrTroop; i++) {
						client.troops.push(new Troop(level, this.timeFactor_));
					}

					resolve();
				} else {
					reject(new Error(`Not enough money to buy ${nbrTroop} troops of level ${level}. ${transactionPrice} required, ${client.gold} owned`));
				}
			}, Math.random() * this.timeFactor_ * 4);
		});
	}
}

module.exports = {MarketPlace};
