import { Card, Suit, Rank } from './Card.js';
import { Player } from './Player.js';

/* Global Variables */
const deck = createDeck();		//global var for deck

const deckContainer = document.querySelector('.deck-container');
const playerDeck = document.querySelector('.player-deck-container');
const botDeck = document.querySelector('.bot-deck-container');
const reload = document.querySelector('.reload');


const playerDeckTop = '221';	//parentTop - 12
const playerDeckLeft = '277';	//parentLeft - 12
const botDeckTop = '-223'
const botDeckLeft = '-281'

/* ------------------------------- */





initializeGame();

function initializeGame() {
	createCards();

	/*create animation transition of dealing the deck*/
	deckContainer.addEventListener('click', function() {
		splitDeck();
	});



	/* reload page */
	reload.addEventListener('click', function () {
		location.reload();
	});
}

function splitDeck() {
	const cards = document.querySelectorAll('.deck-container > .card');
	let diff = 0;
	for (let i = cards.length - 1; i >= 0; i--) {
		if (i % 4 === 0) diff++;
		if (i % 2 === 1) {
			changeDiv(playerDeck, cards[i], playerDeckTop, playerDeckLeft, 52 - i, diff);
		}
		else if (i % 2 === 0) {
			changeDiv(botDeck, cards[i], botDeckTop, botDeckLeft, 52 - i, diff);
		}
	}
}

/*
Function using GSAP animations to move child element to target location
and then is appended to a new parent
*/
function changeDiv(target, child, targetTop, targetLeft, i, diff) {
	gsap.to(child, {
		top: targetTop - diff,
		left: targetLeft - diff,
		duration: 0.2,
		delay: (0.02 * i),
		onComplete: () => {
			child.style.top = `${0-diff}px`;
			child.style.left = `${0-diff}px`;
			child.style.zIndex = i;
			target.appendChild(child); 
		},
		ease: Power4
	})
}


function createCards() {
	//diff for position -- visual purposes
	let diff = 0;
	for (let i = 0; i < deck.length; i++) {
		if (i % 4 === 0) {
			diff++;
		}
		createCard(deck[i], 0 - diff, 0 - diff, i + 1);
	}
}

/*
<div class="card" style="left: 0px; top: 0px; z-index: 1;">
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


	
	cardElem.card = card;	//add custom property 'card' and assign Card object
	//append card div to deck-container
	deckContainer.appendChild(cardElem);
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
	/*for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}*/
	
	return deck;
}


