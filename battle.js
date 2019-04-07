class Battle {
	static fight(attacker, defender, timeFactor) {
		return new Promise(resolve => {
			setTimeout(() => {
				console.log(attacker.name, 'is attacking', defender.name);

				const attackerTroops = attacker.troops;
				const defenderTroops = defender.troops;

				let attackerTroopIndex = 0;
				let defenderTroopIndex = 0;

				while (attackerTroopIndex < attackerTroops.length && defenderTroopIndex < defenderTroops.length) {
					const currentAttacker = attackerTroops[attackerTroopIndex];
					const currentDefender = defenderTroops[defenderTroopIndex];
					const isAttackerWinner = this.dual(currentAttacker, currentDefender);
					if (isAttackerWinner) {
						defenderTroopIndex++;
					} else {
						attackerTroopIndex++;
					}
				}

				attackerTroops.splice(0, attackerTroopIndex - 1);

				for (let i = 0; i < defenderTroopIndex; i++) {
					defenderTroops[i].life_ = 20 + (Math.random() * 10) - 5;
				}

				const attackerWon = defenderTroopIndex === defenderTroops.length;

				const stolenGold = attackerWon ? Math.round(defender.gold * Math.random()) : 0;
				const stolenCorn = attackerWon ? Math.round(defender.corn * Math.random()) : 0;

				console.log(attacker.name, attackerWon ? `won the battle and stole ${stolenCorn} corn and ${stolenGold} gold to ${defender.name}` : `lost the battle against ${defender.name} `);

				attacker.finishBattle(attackerWon, attackerTroops, {corn: stolenCorn, gold: stolenGold});
				defender.finishBattle(!attackerWon, defenderTroops, {corn: stolenCorn, gold: stolenGold});

				resolve();
			}, 5 * Math.random() * timeFactor);
		});
	}

	static dual(attackerTroop, defenderTroop) {
		let isAttackerTurn = Math.random() < 0.5;
		while (attackerTroop.isAlive() && defenderTroop.isAlive()) {
			if (isAttackerTurn) {
				attackerTroop.attack(defenderTroop);
			} else {
				defenderTroop.attack(attackerTroop);
			}

			isAttackerTurn = !isAttackerTurn;
		}

		return attackerTroop.isAlive();
	}
}

module.exports = {Battle};
