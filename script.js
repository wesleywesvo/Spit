import { Card, Suit, Rank } from './Card.js';
import { Player } from './Player.js';


const deck = createDeck();		//global var for deck





initializeGame();

function initializeGame() {
	createCards();

	/*create animation transition of dealing the deck*/
	splitDeck();
}

function splitDeck() {
	const cards = document.querySelectorAll('.game-board-container .card');

	const playerDeck = document.querySelector('.player-deck-container');
	const botDeck = document.querySelector('.bot-deck-container');
	
	
	for (let i = cards.length - 1; i >= 0; i--) {
		if (i % 2 === 0) {
			cards[i].style.top = `0`;
			cards[i].style.left = `0`;
			playerDeck.appendChild(cards[i]);
		}
		else {
			cards[i].style.top = `0`;
			cards[i].style.left = `0`;
			botDeck.appendChild(cards[i]);
		}
	}
}


function createCards() {
	/*
	find positions for center of board -- this function occurs at
	initialization of game
	*/
	const values = calculateCssPosition('.deck-container');
	const topValue = values[0];
	const leftValue = values[1];

	let diff = 0;
	for (let i = 0; i < deck.length; i++) {
		if (i % 4 === 0) {
			diff++;
		}
		createCard(deck[i], topValue - diff, leftValue - diff, i + 1);

	}
}


/*
No idea why topVal and leftVal calculations are flipped, but results are acceptable
*/
function calculateCssPosition(container) {
	const deckContainer = document.querySelector(container);
	const computedStyle = window.getComputedStyle(deckContainer);
	let topValue = parseInt(computedStyle.getPropertyValue('top'), 10);
	let leftValue = parseInt(computedStyle.getPropertyValue('left'), 10);
	const heightValue = parseInt(computedStyle.getPropertyValue('height'), 10);
	const widthValue = parseInt(computedStyle.getPropertyValue('width'), 10);
	const bottomValue = topValue - heightValue;
	const rightValue = leftValue - widthValue;


	topValue = Math.ceil((leftValue + rightValue) / 2);
	leftValue = Math.ceil((topValue + bottomValue) / 2);
	return [topValue, leftValue];
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


