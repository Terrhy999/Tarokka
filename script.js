const CARD_PADDING = 25;
const CARD_HEIGHT = 140;

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