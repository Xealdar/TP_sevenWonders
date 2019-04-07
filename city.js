const {Divinity} = require('./divinity');
const {Battle} = require('./battle');

class City {
	constructor(name, divinityName, timeFactor) {
		this.name_ = name || 'UNKCITY';
		this.divinity_ = new Divinity(divinityName, timeFactor);
		this.corn_ = 1000;
		this.gold_ = 1000;
		this.troops_ = [];
		this.timeFactor_ = timeFactor;
		this.init();
	}

	init() {
		this.divinity_.init();
		this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
		this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
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

	goToMarketPlace(gold, corn, marketPlace) {
		return new Promise((resolve, reject) => {
			if ((gold <= this.gold_) && (gold >= 0) && (corn <= this.corn_) && (corn >= 0)) {
				setTimeout(() => {
					this.gold_ -= gold;
					this.corn_ -= corn;
					if (Math.random() > 0.90) {
						const lostGold = Math.round(Math.random() * gold);
						const lostCorn = Math.round(Math.random() * corn);
						gold -= lostGold;
						corn -= lostCorn;
						console.log(`${this.name_} was robbed on the way to the marketPlace ! They lost ${lostGold} gold and ${lostCorn} corn !`);
					}

					marketPlace.newArrival(this.name_, gold, corn);
					resolve();
				}, 4 * this.timeFactor_ * Math.random());
			} else {
				reject(new Error('Not enough ressources to go to the Market Place'));
			}
		});
	}

	comeBackFromMarketPlace(marketPlace) {
		return new Promise(resolve => {
			setTimeout(() => {
				let {gold, corn, troops} = marketPlace.newDeparture(this.name_);
				if (Math.random() > (0.90 + troops.length)) {
					const lostGold = Math.round(Math.random() * gold);
					const lostCorn = Math.round(Math.random() * corn);
					gold -= lostGold;
					corn -= lostCorn;
					console.log(`${this.name_} was robbed on the way to the marketPlace ! They lost ${lostGold} gold and ${lostCorn} corn !`);
				}

				this.gold_ += gold;
				this.corn_ += corn;
				this.troops_ = this.troops_.concat(troops);
				resolve();
			}, 4 * this.timeFactor_ * Math.random());
		});
	}

	buyCorn(corn, marketPlace) {
		return new Promise((resolve, reject) => {
			marketPlace.buyCorn(this, corn)
				.then(() => {
					console.log(`Transaction: ${this.name_} bought ${corn} corns.`);
					resolve();
				})
				.catch(error => {
					console.log(error.message);
					reject(error);
				});
		});
	}

	buyTroops(level, nbrTroops, marketPlace) {
		return new Promise((resolve, reject) => {
			marketPlace.buyTroops(this, level, nbrTroops)
				.then(() => {
					console.log(`Transaction: ${this.name_} bought ${nbrTroops} troops of level ${level}.`);
					resolve();
				})
				.catch(error => {
					console.log(error.message);
					reject(error);
				});
		});
	}

	attackCity(city) {
		Battle.fight(this, city, this.timeFactor_);
	}

	finishBattle(isWinner, troops, resources) {
		const plusOrMinus = isWinner ? 1 : -1;
		this.troops_ = troops;
		this.gold_ += resources.gold * plusOrMinus;
		this.corn_ += resources.corn * plusOrMinus;
	}

	get troops() {
		return this.troops_;
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

module.exports = {City};

