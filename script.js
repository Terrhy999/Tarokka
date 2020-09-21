const CARD_PADDING = 25;
const CARD_HEIGHT = 140;

//Adds the "hide" class to all images with the class "toggle". The "hide" class sets the display to "none".
function toggleHide() {
    let cards = document.querySelectorAll(".toggle");
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("hide");
    }
}

function toggleFlip() {
    let cards = document.querySelectorAll(".scene .card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => { cards[i].classList.toggle("flipped"); });
    }
}

function construct () {
    padCards(1);
    padCards(2);
    padCards(3);
    toggleFlip();
}

//"deckNumber" paramater is the nth-child with the "deck" class of an element. "cards" is all of the card images inside of that "deck" element
//loops over all of the images, setting the z-index of each card, and adding top padding of "CARD_PADDING" to each card
//loops over all of the images, adding and eventListener for when you mouseover and mouseout of the card
function padCards(deckNumber) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let cards = deckDiv.querySelectorAll("img.card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.zIndex = i;
        cards[i].style.top = i * CARD_PADDING + "px";
        cards[i].addEventListener("mouseenter", () => { hoverEnter(deckNumber, i); }, false);
        cards[i].addEventListener("mouseout", () => { hoverExit(deckNumber, i); }, false);
    }
}

//the eventListener function for mouseover, paramater "deckNumber" to select the nth-child with the "deck" class of an element, the paramater "index" to
//determine which card is being hovered over. "cards" is a nodelist of all of the card images inside of the deck that come after the hovered card
//we loop over these card images, pushing each of them down by the CARD_HEIGHT minus the CARD_PADDING
function hoverEnter(deckNumber, index) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = index;
    let cards = deckDiv.querySelectorAll("img.card");

    for(let i = currentIndex + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) + (CARD_HEIGHT - CARD_PADDING) + "px";
    }
}

//the eventListener function for mouseout, paramater "deckNumber" to select the nth-child with the "deck" class of an element, the paramater "index" to
//determine which card is being hovered over. "cards" is a nodelist of all of the card images inside of the deck that come after the hovered card
//we loop over these card images, pushing each of them back up by the CARD_HEIGHT minus the CARD_PADDING
function hoverExit(deckNumber, index) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = index;
    let cards = deckDiv.querySelectorAll("img.card");

    for(let i = currentIndex + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) - (CARD_HEIGHT - CARD_PADDING) + "px";
    }
}