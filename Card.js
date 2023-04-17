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

const cardImgPath = './images/Playing_card';


class Card {
	constructor(suit, rank) {
		this.suit = suit;
		this.rank = rank;
		this.imgPath = `${cardImgPath}_${suit}_${rank}.jpg`;
	}
}

export { Card, Suit, Rank };

export * from './Card.js';
