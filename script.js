const CARD_PADDING = 25;
const CARD_HEIGHT = 140;

//Adds the "hide" class to all images with the class "toggle". The "hide" class sets the display to "none".
function toggleHide() {
    let cards = document.querySelectorAll("img.toggle")
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("hide");
    }
}

function construct () {
    padCards(1);
    padCards(2);
    padCards(3);
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
        cards[i].addEventListener("mouseenter", function(){hoverEnter(deckNumber, i)}, false);
        cards[i].addEventListener("mouseout", function(){hoverExit(deckNumber, i)}, false);
    }
}

//the eventListener function for mouseover, 
function hoverEnter(deckNumber, index) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = index;
    let cards = deckDiv.querySelectorAll("img.card");

    for(let i = currentIndex + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) + (CARD_HEIGHT - CARD_PADDING) + "px";
    }
}

function hoverExit(deckNumber, index) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = index;
    let cards = deckDiv.querySelectorAll("img.card");

    for(let i = currentIndex + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) - (CARD_HEIGHT - CARD_PADDING) + "px";
    }
}