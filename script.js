import { Card, Deck } from './Deck.js';
import { Hand } from `./Player.js`

function App() {
	//initalize the game by creating Deck and distributing cards to each Hand
	const deck = new Deck();
	deck.shuffle();

	const playerHand = new Player();
	const botHand = new Player();

	for (let i = 0; i < 26; i++) {
		playerHand.addCard(deck.draw());
		botHand.addCard(deck.draw());
	}

	displayCardPlayer(playerHand, Object.keys({ playerHand })[0]);

	const gamePile = new GamePile();
}

function displayCard(hand, containerID) {
	let handCardsContainer = document.getElementById(containerID);

	for (let i = 0; i < hand.cards.length; i++) {
		let card = hand.cards[i];

		let cardImage = document.createElement('img');
		cardImage.src = `./images/Playing_card_${card.suit}_${card.rank}.jpg`;
		//cardImage.alt = `${card.Suit} of ${card.Rank}`;	//optional alt attribute == description of card
		handCardsContainer.appendChild(cardImage);
	}
}

App();
