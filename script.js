const CARD_PADDING = 25;
const CARD_HEIGHT = 153;

function construct() {
    createCards(20, 1);
    createCards(20, 2);
    createCards(14, 3);
    setPlayingCard();
    addCardClickEvent();
    addFlipEvents();
}

function createCards(columnSize, columnNumber) {
    createCardDivs(columnSize,columnNumber);
    padCards(columnNumber);
    addCardHoverEvents(columnNumber);
}

function setPlayingCard() {
    let cards = document.querySelectorAll(".card");
    let selections = document.querySelectorAll(".selection");
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("tarokka");
        selections[i].classList.remove("tarokka");
    }
    setCardImage('PNG/' ,'Playing_Card_URL');
}

function setTarokkaCard() {
    let cards = document.querySelectorAll(".card");
    let selections = document.querySelectorAll(".selection");
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.add("tarokka");
        selections[i].classList.add("tarokka");
    }
    setCardImage('Deck/' ,'Tarokka_Card_URL');
}

function createCardDivs(columnSize, columnNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    for(let i = 0; i < columnSize; i++) {
        let cardDiv = document.createElement("div");
        let cardSelection = document.createElement("p");
        cardDiv.className = "card";
        cardSelection.className = "selection"
        column.appendChild(cardDiv);
        cardDiv.appendChild(cardSelection);
    }
}

function addCardHoverEvents(columnNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    let cards = column.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("mouseenter", () => hoverEnter(columnNumber, i), false);
        cards[i].addEventListener("mouseleave", () => hoverExit(columnNumber, i), false);
    }
}

function addCardClickEvent() {
    let cards = document.querySelectorAll(".deck .card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => CardClick(i), false);
    }
}

function padCards(columnNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    let cards = column.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].style.zIndex = i;
        cards[i].style.top = i * CARD_PADDING + "px";        
    }
}


function setCardImage(imagePath ,cardArrayIndex) {
    let cards = document.querySelectorAll(".deck .card")
    for(let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundImage = "url(" + imagePath + cardArray[i][cardArrayIndex] + ")";
    }
}

function hoverEnter(columnNumber, cardNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    let cards = column.querySelectorAll(".card");
    let height = cards[0].clientHeight;
    for(let i = cardNumber + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) + (height - CARD_PADDING) + "px";
    }
    let display = document.querySelector(".display");
    let cardImage = cards[cardNumber].style.backgroundImage;
    display.style.backgroundImage = cardImage;
}

function hoverExit(columnNumber, cardNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    let cards = column.querySelectorAll(".card");
    let height = cards[0].clientHeight;
    for(let i = cardNumber + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) - (height - CARD_PADDING) + "px";
    }
    let display = document.querySelector(".display");
    display.style.backgroundImage = "";
}

let selectedCardArray = [null, null, null, null, null];

function CardClick(cardNumber) {
    let cards = document.querySelectorAll(".column .card");
    let card = cards[cardNumber];
    let cardSelection = card.querySelector(".selection");

    let cardSelected = checkCardSelected(cardNumber, card, cardSelection);

    if(cardSelected[0] == true) {
        return;
    }

    else {
        selectCard(cardNumber, card, cardSelection);
    }
}

function selectCard(cardNumber, card, cardSelection) {
    for( let i = 0; i < selectedCardArray.length; i++) {
        if(selectedCardArray[i] === null) {
            selectedCardArray[i] = cardArray[cardNumber].Index;
            cardSelection.textContent = i + 1;
            card.classList.toggle("clicked");
            break;
        }
        if(i == 4) {
            alert("Five cards have already been selected");
        }
    }
}

function checkCardSelected(cardNumber, card, cardSelection) {
    let value = [false, 0];
    for(let i = 0; i < selectedCardArray.length; i++) {
        if(selectedCardArray[i] === cardArray[cardNumber].Index) {
            value[0] = true;
            value[1] = i;
        }
    }
    if(value[0] === true) {
        card.classList.toggle("clicked");
        selectedCardArray[value[1]] = null;
        cardSelection.textContent = "";
    }
    return value;
}

function addFlipEvents() {
    let cards = document.querySelector(".reading").querySelectorAll(".flipCard");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => flipCard(i), false);
    }
}

function flipCard(index) {
    let card = document.querySelector(".reading").querySelectorAll(".flipCard")[index];
    card.classList.toggle("flipped");
    setFlipImage(index);
}

function setFlipImage(index) {
    let card = document.querySelector(".reading").querySelectorAll(".flipCard")[index].querySelector(".back");
    let imageURL = cardArray[selectedCardArray[index]].Tarokka_Card_URL;
    card.style.backgroundImage = "url('Deck/" + imageURL;
}