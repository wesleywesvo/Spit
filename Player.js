class Player {
	constructor() {
		this.cards = [];
	}

	addCard(card) {
		this.cards.push(card);
	}

	removeCard(index) {
		return this.cards.splice(index, 1);
		//return this.cards.splice(index, 1)[0];
	}

	getNumCards() {
		return this.cards.length;
	}
}

export { Player };

export * from './Player.js';
