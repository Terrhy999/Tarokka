const CARD_PADDING = 25;
const CARD_HEIGHT = 153;
// let cardArray = [0, 0, 0, 0, 0];
// let cardIndex = 1;
// //Adds the "hide" class to all images with the class "toggle". The "hide" class sets the display to "none".
// function toggleHide() {
//     let cards = document.querySelectorAll(".toggle");
//     for (let i = 0; i < cards.length; i++) {
//         cards[i].classList.toggle("hide");
//     }
// }



// function toggleFlip() {
//     let cards = document.querySelectorAll(".scene .card");
//     for (let i = 0; i < cards.length; i++) {
//         cards[i].addEventListener("click", () => setCard(i), false);
//     }
// }



// function construct() {
//     padCards(1);
//     padCards(2);
//     padCards(3);
//     toggleFlip();
// }

// //"deckNumber" paramater is the nth-child with the "deck" class of an element. "cards" is all of the card images inside of that "deck" element
// //loops over all of the images, setting the z-index of each card, and adding top padding of "CARD_PADDING" to each card
// //loops over all of the images, adding and eventListener for when you mouseover and mouseout of the card
// function padCards(deckNumber) {
//     let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
//     let cards = deckDiv.querySelectorAll(".card");
//     for (let i = 0; i < cards.length; i++) {
//         cards[i].style.zIndex = i;
//         cards[i].style.top = i * CARD_PADDING + "px";
//         cards[i].addEventListener("mouseenter", () => { hoverEnter(deckNumber, i); }, false);
//         cards[i].addEventListener("mouseleave", () => hoverExit(deckNumber, i), false);
//         cards[i].addEventListener("click", () => selectCard(deckNumber, i), false);
//     }
// }

// function selectCard(deckNumber, i) {
//     let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
//     let currentIndex = i + 1;
//     let card = deckDiv.querySelector(".card:nth-child(" + currentIndex + ")");
//     buttonSelect(card, deckNumber, i);
// }

// function buttonSelect(card, deckNumber, index) {
//     let cardText = card.querySelector(".selection");
//     let value = checkSelected(deckNumber, index);
//     if (value[0] == true) {
//         cardArray[value[1]] = 0;
//         card.classList.toggle("clicked");
//         cardText.textContent = "";
//         return;
//     }

//     for (let i = 0; i < cardArray.length; i++) {
//         if (cardArray[i] == 0) {
//             cardArray[i] = [deckNumber, index + 1];
//             card.classList.toggle("clicked");
//             cardText.textContent = i + 1;
//             break;
//         }
//         if (i === 4) {
//             alert("All 5 cards selected")
//         }
//     }
//     console.log(cardArray);
// }

// function checkSelected(deckNumber, index) {
//     let value = [false, 0];
//     for (let i = 0; i < cardArray.length; i++) {
//         if (cardArray[i][0] === deckNumber && cardArray[i][1] === index + 1) {
//             value[0] = true;
//             value[1] = i;
//         }
//     }
//     return value;
// }

// function setCard(index) {
//     flipReading(index);
//     setBack(index);
//     displayInfo(index);

// }

// function setBack(index) {
//     let card = (document.querySelector(".reading").querySelectorAll(".card"))[index];
//     if(card.classList.contains("flippled") == false) {
//         let cardImageIndex = ((cardArray[index]).toString()).replaceAll(",", " ");
//         let cardBackImage = "url('Tarokka Deck/" + imageArray[cardImageIndex] + "')";
//         let cardBackArray = document.querySelector(".reading").querySelectorAll(".back");
//         let cardBack = cardBackArray[index];
//         cardBack.style.backgroundImage = cardBackImage;
//     }
// }

// function flipReading(index) {
//     let readingCardArray = document.querySelector(".reading").querySelectorAll(".card");
//     let readingCard = readingCardArray[index];
//     readingCard.classList.toggle("flipped");
// }

// function displayInfo(index) {
//     let card = (document.querySelector(".reading").querySelectorAll(".card"))[index];
//     let cardDescriptionIndex = ((cardArray[index]).toString()).replaceAll(",", " ");
//     let cardDescription = cardDescriptions[cardDescriptionIndex];
//     let Description = document.querySelectorAll(".information")[index];
//     if(card.classList.contains("flipped") == false) {
//         Description.textContent = "";
//     }
//     else {
//         Description.textContent = cardDescription;
//     }
// }

// //the eventListener function for mouseover, paramater "deckNumber" to select the nth-child with the "deck" class of an element, the paramater "index" to
// //determine which card is being hovered over. "cards" is a nodelist of all of the card images inside of the deck that come after the hovered card
// //we loop over these card images, pushing each of them down by the CARD_HEIGHT minus the CARD_PADDING
// function hoverEnter(deckNumber, index) {
//     let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
//     let currentIndex = index;
//     let cards = deckDiv.querySelectorAll(".card");

//     for (let i = currentIndex + 1; i < cards.length; i++) {
//         cards[i].style.top = parseInt(cards[i].style.top, 10) + (CARD_HEIGHT - CARD_PADDING) + "px";
//     }
// }

// //the eventListener function for mouseout, paramater "deckNumber" to select the nth-child with the "deck" class of an element, the paramater "index" to
// //determine which card is being hovered over. "cards" is a nodelist of all of the card images inside of the deck that come after the hovered card
// //we loop over these card images, pushing each of them back up by the CARD_HEIGHT minus the CARD_PADDING
// let hoverExit = function (deckNumber, index) {
//     let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
//     let currentIndex = index;
//     let cards = deckDiv.querySelectorAll(".card");

//     for (let i = currentIndex + 1; i < cards.length; i++) {
//         cards[i].style.top = parseInt(cards[i].style.top, 10) - (CARD_HEIGHT - CARD_PADDING) + "px";
//     }
// }

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

function CardClick(cardNumber) {
    let cards = document.querySelectorAll(".column .card");
    let card = cards[cardNumber];
    let cardSelection = card.querySelector(".selection");

    let cardSelected = selectedCards.checkCardSelected(cardNumber, card, cardSelection);

    if(cardSelected[0] == true) {
        return;
    }

    else {
        selectedCards.selectCard(cardNumber, card, cardSelection);
    }
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
    selectedCards.setFlipImage(index);
}

let selectedCards = (function() {

    let selectedCardArray = [null, null, null, null, null];

    return {

        setFlipImage: function(index) {
            let card = document.querySelector(".reading").querySelectorAll(".flipCard")[index].querySelector(".back");
            let imageURL = cardArray[selectedCardArray[index]].Tarokka_Card_URL;
            card.style.backgroundImage = "url('Deck/" + imageURL;
        },
        
        checkCardSelected: function(cardNumber, card, cardSelection) {
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
        },

        selectCard: function(cardNumber, card, cardSelection) {
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
    }
}());