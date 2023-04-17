import { Card, Suit, Rank } from './Card.js';
import { Player } from './Player.js';


const deck = createDeck();		//global var for deck

/*
	Global variables for positions in CSS
*/
const topValue = 316;
const leftValue = 253;
/* ------------------------------------------- */

console.log(deck);



initializeGame();

function initializeGame() {
	createCards();
}

function splitDeck() {

}


function createCards() {
	let diff = 0;
	for (let i = 0; i < deck.length; i++) {
		if (i % 4 === 0) {
			diff++;
		}
		createCard(deck[i], topValue - diff, leftValue - diff, i + 1);

	}
}

function calculateCssPosition() {
	const deckContainer = document.querySelector('.player-deck-container');
	const computedStyle = window.getComputedStyle(deckContainer);
	const topValue = parseInt(computedStyle.getPropertyValue('top'), 10);
	const leftValue = parseInt(computedStyle.getPropertyValue('left'), 10);
}


/*
<div class="card" style="left: 303px; top: 241px; z-index: 52;">
	<div class="card-back">
		<img src="./images/Back_Of_Card.jpg" alt="" class="card-img">
	</div>
	<div class="card-front"></div>
</div>
*/
function createCard(card, leftValue, topValue, zIndex) {
	const cardElem = document.createElement('div');
	const cardBackElem = document.createElement('div');
	const cardBackImg = document.createElement('img');

	const cardFrontElem = document.createElement('div');
	const cardFrontImg = document.createElement('img');
	

	//add id attribute to card element
	cardElem.id = `${card.suit}-${card.rank}`;

	//add class to each element
	cardElem.classList.add('card');
	cardBackElem.classList.add('card-back');
	cardBackImg.classList.add('card-img');
	
	
	cardBackImg.src = card.backImgPath;		//add image source

	//add style attribute --> the position of the cards when created
	cardElem.style.cssText = `left: ${leftValue}px; top: ${topValue}px; z-index: ${zIndex};`;

	//append child elements to parent
	cardBackElem.appendChild(cardBackImg);
	cardElem.appendChild(cardBackElem);


	//append card div to game-board-container
	const gameBoard = document.querySelector('.game-board-container');
	gameBoard.appendChild(cardElem);
}


/*
	Return an array of 52 card objects
*/
function createDeck() {
	let deck = [];
	for (let suit in Suit) {
		for (let rank in Rank) {
			let card = new Card(Suit[suit], Rank[rank]);
			deck.push(card);
		}
	}

	
	//Shuffle the deck
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	
	return deck;
}


