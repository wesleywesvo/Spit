import { Card, Suit, Rank } from './Card.js';
import { Player } from './Player.js';


const deck = createDeck();		//global var for deck

const cardBackImgPath = './images/Back_Of_Card.jpg';
const cardImgPath = '.images/Playing_card_';
const cardImgExt = '.jpg';


/*
	Global variables for positions in CSS
*/
const topValue = 316;
const leftValue = 253;
/* ------------------------------------------- */

console.log(deck);


createCards();

function createCards() {
	console.log(topValue);
	console.log(leftValue);
	let diff = 0;
	for (let i = 0; i < deck.length; i++) {
		if (i % 4 === 0 && i > 0) {
			diff++;
		}
		createCard(deck[i], topValue - diff, leftValue - diff, i + 1);

	}
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
	const cardElem = createElement('div');
	const cardFrontElem = createElement('div');
	const cardBackElem = createElement('div');

	const cardFrontImg = createElement('img');
	const cardBackImg = createElement('img');

	//add id attribute to card element
	addIdToElement(cardElem, card.rank); 

	//add class to each element
	addClassToElement(cardElem, 'card');
	addClassToElement(cardBackElem, 'card-back');
	addClassToElement(cardBackImg, 'card-img');

	//add image source
	addSrcToImageElem(cardBackImg, cardBackImgPath);

	//add style attribute --> the position of the cards when created
	cardElem.style.cssText = `left: ${leftValue}px; top: ${topValue}px; z-index: ${zIndex};`;

	//append child elements to parent
	addChildElement(cardBackElem, cardBackImg);
	addChildElement(cardElem, cardBackElem);


	//append card div to game-board-container
	const gameBoard = document.querySelector('.game-board-container');
	addChildElement(gameBoard, cardElem);
}

function createElement(elemType) {
	return document.createElement(elemType);
}

function addClassToElement(elem, className) {
	elem.classList.add(className);
}

function addIdToElement(elem, id) {
	elem.id = id;
}

function addSrcToImageElem(imgElem, src) {
	imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
	parentElem.appendChild(childElem);
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


