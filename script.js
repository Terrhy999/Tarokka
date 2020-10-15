const CARD_PADDING = 25;
const CARD_HEIGHT = 153;
let selectedCardArray = [null, null, null, null, null];
let fortuneDescription = ["This card tells of history. Knowledge of the ancient will help you better understand your enemy.",
    "This card tells of a powerful force for good and protection, a holy symbol of great hope.",
    "This is a card of power and strength. It tells of a weapon of vengeance: a sword of sunlight",
    "This card sheds light on one who will help you greatly in the battle against darkness",
    "Your enemy is a creature of darkness, whose powers are beyond mortality. This card will lead you to him!"];

function construct() {
    createCards(20, 1);
    createCards(20, 2);
    createCards(14, 3);
    setPlayingCard();
    addCardClickEvent();
    addFlipEvents();
}

function createCards(columnSize, columnNumber) {
    createCardDivs(columnSize, columnNumber);
    padCards(columnNumber);
    addCardHoverEvents(columnNumber);
}

function hideCards() {
    let cards = document.querySelectorAll(".card");
    for (let i=0; i < cards.length; i++) {
        cards[i].classList.toggle("hide");
    }
}

function toggleDescription () {
    let descriptions = document.querySelectorAll(".description");
    for (let i = 0; i < descriptions.length; i++) {
        descriptions[i].classList.toggle("hide");
    }
}

function setPlayingCard() {
    let cards = document.querySelectorAll(".card");
    let selections = document.querySelectorAll(".selection");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("tarokka");
        selections[i].classList.remove("tarokka");
    }
    setCardImage('PNG/', 'Playing_Card_URL');
}

function setTarokkaCard() {
    let cards = document.querySelectorAll(".card");
    let selections = document.querySelectorAll(".selection");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("tarokka");
        selections[i].classList.add("tarokka");
    }
    setCardImage('Deck/', 'Tarokka_Card_URL');
}

function createCardDivs(columnSize, columnNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    for (let i = 0; i < columnSize; i++) {
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
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("mouseenter", () => hoverEnter(columnNumber, i), false);
        cards[i].addEventListener("mouseleave", () => hoverExit(columnNumber, i), false);
    }
}

function addCardClickEvent() {
    let cards = document.querySelectorAll(".deck .card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => CardClick(i), false);
    }
}

function padCards(columnNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    let cards = column.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.zIndex = i;
        cards[i].style.top = i * CARD_PADDING + "px";
    }
}


function setCardImage(imagePath, cardArrayIndex) {
    let cards = document.querySelectorAll(".deck .card")
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundImage = "url(" + imagePath + cardArray[i][cardArrayIndex] + ")";
    }
}

function hoverEnter(columnNumber, cardNumber) {
    let column = document.querySelector(".column:nth-child(" + columnNumber + ")");
    let cards = column.querySelectorAll(".card");
    let height = cards[0].clientHeight;
    for (let i = cardNumber + 1; i < cards.length; i++) {
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
    for (let i = cardNumber + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) - (height - CARD_PADDING) + "px";
    }
    let display = document.querySelector(".display");
    display.style.backgroundImage = "";
}


function CardClick(cardNumber) {
    let cards = document.querySelectorAll(".column .card");
    let card = cards[cardNumber];
    let cardSelection = card.querySelector(".selection");

    let cardSelected = checkCardSelected(cardNumber, card, cardSelection);

    if (cardSelected[0] == true) {
        return;
    }

    else {
        selectCard(cardNumber, card, cardSelection);
    }
}

function selectCard(cardNumber, card, cardSelection) {
    for (let i = 0; i < selectedCardArray.length; i++) {
        if (selectedCardArray[i] === null) {
            selectedCardArray[i] = cardArray[cardNumber].Index;
            cardSelection.textContent = i + 1;
            card.classList.toggle("clicked");
            break;
        }
        if (i == 4) {
            alert("Five cards have already been selected");
        }
    }
}

function checkCardSelected(cardNumber, card, cardSelection) {
    let value = [false, 0];
    for (let i = 0; i < selectedCardArray.length; i++) {
        if (selectedCardArray[i] === cardArray[cardNumber].Index) {
            value[0] = true;
            value[1] = i;
        }
    }
    if (value[0] === true) {
        card.classList.toggle("clicked");
        selectedCardArray[value[1]] = null;
        cardSelection.textContent = "";
    }
    return value;
}

function addFlipEvents() {
    let cards = document.querySelector(".reading").querySelectorAll(".flipCard");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => flipCard(i), false);
    }
}

function flipCard(index) {
    let card = document.querySelector(".reading").querySelectorAll(".flipCard")[index];
    card.classList.toggle("flipped");
    setFlipImage(index);
    displayFortune(index);
    displayDescription(index);
}

function setFlipImage(index) {
    let card = document.querySelector(".reading").querySelectorAll(".flipCard")[index].querySelector(".back");
    let cardIndex = selectedCardArray[index];
    if(cardIndex != null) {
        let imageURL = cardArray[cardIndex].Tarokka_Card_URL;
        card.style.backgroundImage = "url('Deck/" + imageURL;
    }
    else {
        card.style.backgroundImage = "";
    }
}

function displayFortune(index) {
    let fortuneDisplay = document.querySelector(".container");
    let fortune = fortuneDisplay.querySelectorAll(".fortune")[index];
    let cardIndex = selectedCardArray[index];
    if(cardIndex!= null) {
        let fortuneText = cardArray[cardIndex].Fortune;
        if(fortune.textContent == "") {
            fortune.textContent = "Card " + (index + 1) + ": " + fortuneText;
        }
        else {
            fortune.textContent = ""
        }
    }

    else {
        fortune.textContent = "";
    }
}

function displayDescription(index) {
    let descriptionDisplay = document.querySelectorAll(".container .description");
    let description = descriptionDisplay[index];
    let cardIndex = selectedCardArray[index];
    if(cardIndex != null) {
        let descriptionText = cardArray[cardIndex].Result;
        if(description.textContent == "") {
            description.textContent = "Card " + (index + 1) + ": " + descriptionText;
        }
        else {
            description.textContent = "";
        }
    }

    else {
        description.textContent = "";
    }
}