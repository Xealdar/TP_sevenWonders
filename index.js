const {MarketPlace} = require('./market-place');
const {City} = require('./city');

const timeFactor = 1000;
const marketPlace = new MarketPlace(timeFactor);
const paris = new City('Paris', 'Maxime', timeFactor);
const london = new City('Londres', 'Robin', timeFactor);

const storyBoard = async () => {
	await paris.goToMarketPlace(1000, 500, marketPlace);
	await london.goToMarketPlace(1000, 500, marketPlace);
	await paris.buyCorn(25, marketPlace);
	await paris.buyTroops(2, 2, marketPlace);
	await london.buyTroops(4, 2, marketPlace);
	await paris.comeBackFromMarketPlace(marketPlace);
	await london.comeBackFromMarketPlace(marketPlace);
	paris.attackCity(london);
};

storyBoard();

