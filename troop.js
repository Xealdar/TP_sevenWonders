const EventEmitter = require('events');

class Troop {
	constructor(level, timeFactor) {
		this.age_ = 0;
		this.timeFactor_ = timeFactor;
		this.life_ = 100;
		this.level_ = level;
		this.maxDamage_ = ((level ** 2) * 50) / (5 ** 2);
		this.lifeEvents_ = new EventEmitter();
		this.init();
	}

	init() {
		this.ageTimeout_ = setTimeout(
			() => this.die(), 100 * this.timeFactor_
		);
	}

	die() {
		this.life_ = 0;
		this.lifeEvents_.emit('die');
		clearInterval(this.ageInterval_);
		clearInterval(this.attackInterval_);
	}

	isAlive() {
		return this.life_ > 0;
	}

	attack(troop) {
		troop.receiveDamage(
			Math.random() > 0.95 ?
				this.maxDamage_ :
				Math.round((this.maxDamage_ / 2) + (Math.random() * 10))
		);
	}

	receiveDamage(damage) {
		this.life_ -= damage;
		if (this.life_ <= 0) {
			this.die();
		}
	}

	get maxDamage() {
		return this.maxDamage_;
	}

	get lifeEvents() {
		return this.lifeEvents_;
	}

	get age() {
		return this.age_;
	}

	get life() {
		return this.life_;
	}
}

module.exports = {Troop};
