import { Card, Suit, Rank } from './Card.js';
import { Player } from './Player.js';

/* Global Variables */
let z = 0;		//global z-index value
const deck = createDeck();		//global var for deck

let deckContainer = document.querySelector('.deck-container');
let cards = deckContainer.children;

const playerDeckContainer = document.querySelector('.player-deck-container');
const botDeckContainer = document.querySelector('.bot-deck-container');
const reload = document.querySelector('.reload');

var playerDeckRect = playerDeckContainer.getBoundingClientRect();
//console.log(playerDeckRect);
var botDeckRect = botDeckContainer.getBoundingClientRect();
//console.log(botDeckRect);
var deckRect = deckContainer.getBoundingClientRect();
//console.log(deckRect);

const playerDeckTop = playerDeckRect.top - deckRect.top;	//221
const playerDeckLeft = playerDeckRect.left - deckRect.left;	//277
const botDeckTop = botDeckRect.top - deckRect.top; 			//-223
const botDeckLeft = botDeckRect.left - deckRect.left;		//-281

/* ------------------------------- */

/* reload page */
reload.addEventListener('click', function () {
	location.reload();
});



initializeGame();

function initializeGame() {
	createCards();

	/*create animation transition of dealing the deck*/
	deckContainer.addEventListener('click', function() {
		splitDeck();
	});
	
}


function dealDeckToStack() {
	const playerDeck = document.querySelectorAll('.player-deck-container > .card');
	const botDeck = document.querySelectorAll('.bot-deck-container > .card');

	console.log('testtestes');
	console.log(cards);
	//probably have to use GSAP timeline and append Tweens to have
	//two animations run at the same time.
	
}


function splitDeck() {
	let numCards = cards.length - 1;
	
	let tl = gsap.timeline();
	for (let i = numCards; i >= 0; i--) {
		let diff = Math.floor( (i - numCards) / 8);

		((target, targetTop, targetLeft) => {
			let tween = gsap.to(cards[i], {
				top: targetTop + diff,
				left: targetLeft + diff,
				duration: 0.2,
				//delay: 0.02 * i,
				onComplete: () => {
					cards[i].style.top = `${0 + diff}px`;
					cards[i].style.left = `${0 + diff}px`;
					cards[i].style.zIndex = z++;
					target.appendChild(cards[i]);

					if (i === 0) dealDeckToStack();
				},
				ease: Power4,
			});
			tl.add(tween, "-=0.18");	//timeline delay --> make tween run 0.02 delay
		}) (i % 2 === 1 ? playerDeckContainer : botDeckContainer,
			i % 2 === 1 ? playerDeckTop : botDeckTop,
			i % 2 === 1 ? playerDeckLeft : botDeckLeft);
	}

	tl.play();
}


function createCards() {
	//diff for position -- visual purposes
	for (let i = 0; i < deck.length; i++) {
		let diff = Math.floor(i / 4);
		createCard(deck[i], 0 - diff, 0 - diff, z++);
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


