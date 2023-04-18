import { Card, Suit, Rank } from './Card.js';
import { Player } from './Player.js';


const deck = createDeck();		//global var for deck





initializeGame();

function initializeGame() {
	createCards();

	/*create animation transition of dealing the deck*/
	const deckContainer = document.querySelector('.deck-container');
	//deckContainer.addEventListener('click', function() {
		splitDeck();
	//})
}

function splitDeck() {
	const cards = document.querySelectorAll('.deck-container > .card');

	const playerDeck = document.querySelector('.player-deck-container');
	const botDeck = document.querySelector('.bot-deck-container');
	
	let target;
	let cardChild = cards[51];

	cardChild.addEventListener('click', function() {
		changeDiv(playerDeck, cardChild);
	})

	cardChild = cards[50];
	cardChild.addEventListener('click', function() {
		changeDiv(botDeck, cardChild);
	})
	/*for (let i = cards.length - 1; i >= 0; i--) {
		if (i % 2 === 1) {
			target = playerDeck;
		}
		else if (i % 2 === 0) {
			target = botDeck;
		}
		changeDiv(target, cards[i]);
	}*/
	

}


function changeDiv(target, child) {
	var rect = child.getBoundingClientRect();
	target.appendChild(child);
	TweenMax.set(child, { x: 0, y: 0 });
	var newRect = child.getBoundingClientRect();

console.log(`x:${rect.left - newRect.left} y: ${rect.top - newRect.top}`);

	TweenMax.from(child, 1, {
		x: rect.left - newRect.left,
		y: rect.top - newRect.top,
		ease: CustomEase.create(
			'custom',
			'M0,0 C0.094,0.422 0,0.704 0.042,0.856 0.044,0.866 0.082,0.964 0.106,0.98 0.129,0.995 0.252,1 0.272,1 0.308,1 0.444,1 0.478,1 0.64,1 0.596,1 1,1 '
		),
	});
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
	const deckContainer = document.querySelector('.deck-container');
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
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	
	return deck;
}


