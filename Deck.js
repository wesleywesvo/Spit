const Suit = {
	CLUBS: 'club',
	DIAMONDS: 'diamond',
	HEARTS: 'heart',
	SPADES: 'spade',
};

const Rank = {
	ACE: '1',
	TWO: '2',
	THREE: '3',
	FOUR: '4',
	FIVE: '5',
	SIX: '6',
	SEVEN: '7',
	EIGHT: '8',
	NINE: '9',
	TEN: '10',
	JACK: '11',
	QUEEN: '12',
	KING: '13',
};

class Card {
	constructor(suit, rank) {
		this.suit = suit;
		this.rank = rank;
	}
}

class Deck {
	constructor() {
		this.cards = [];

		for (let suit of Object.values(Suit)) {
			for (let rank of Object.values(Rank)) {
				let card = new Card(suit, rank);
				this.cards.push(card);
			}
		}
	}

	shuffle() {
		for (let i = 0; i < this.cards.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = this.cards[i];
			this.cards[i] = this.cards[j];
			this.cards[j] = temp;
		}
	}

	draw() {
		return this.cards.pop();
	}
}

export { Card, Deck };

export * from './Deck.js';
