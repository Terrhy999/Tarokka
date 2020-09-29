const CARD_PADDING = 25;
const CARD_HEIGHT = 153;
const imageArray = {
    "1 11": "1 - Avenger.jpg",
    "2 11": "1 - Monk.jpg",
    "2 1": "1 - Swashbuckler.jpg",
    "1 1": "1 - Transmuter.jpg",
    "1 2": "2 - Diviner.jpg",
    "2 12": "2 - Missionary.jpg",
    "1 12": "2 - Paladin.jpg",
    "2 2": "2- Philanthropist.jpg",
    "1 3": "3 - Enchanter.jpg",
    "2 13": "3 - Healer.jpg",
    "1 13": "3 - Soldier.jpg",
    "2 3": "3 - Trader.jpg",
    "1 4": "4 - Abjurer.jpg",
    "1 14": "4 - Mercenary.jpg",
    "2 4": "4 - Merchant.jpg",
    "2 14": "4 - Shepherd.jpg",
    "2 15": "5 - Druid.jpg",
    "1 5": "5 - Elementalist.jpg",
    "2 5": "5 - Guild Member.jpg",
    "1 15": "5 - Myrmidon.jpg",
    "1 6": "6 - Evoker.jpg",
    "2 16": "6 Anarchist.jpg",
    "2 6": "6 Beggar.jpg",
    "1 16": "6 Berserker.jpg",
    "2 17": "7 - Charlatan.jpg",
    "1 17": "7 - Hooded One.jpg",
    "1 7": "7 - Illusionist.jpg",
    "2 7": "7 - Thief.jpg",
    "2 18": "8 - Bishop.jpg",
    "1 18": "8 - Dictator.jpg",
    "1 8": "8 - Necromancer.jpg",
    "2 8": "8 - Tax Collector.jpg",
    "1 9": "9 - Conjurer.jpg",
    "2 9": "9 - Miser.jpg",
    "1 19": "9 - Torturer.jpg",
    "2 19": "9 - Traitor.jpg",
    "3 13": "Artifact.jpg",
    "3 7": "Beast.jpg",
    "3 9": "Broken One.jpg",
    "3 6": "Darklord.jpg",
    "3 3": "Donjon.jpg",
    "3 4": "Executioner.jpg",
    "3 12": "Ghost.jpg",
    "3 14": "Horseman.jpg",
    "3 11": "Innocent.jpg",
    "3 10": "Marionette.jpg",
    "3 5": "Mists.jpg",
    "2 20": "Priest.jpg",
    "3 2": "Raven.jpg",
    "2 10": "Rogue.jpg",
    "3 1": "Seer.jpg",
    "3 8": "Tempter.jpg",
    "1 20": "Warrior.jpg",
    "1 10": "Wizard.jpg" }
let cardArray = [0, 0, 0, 0, 0];
let cardIndex = 1;
//Adds the "hide" class to all images with the class "toggle". The "hide" class sets the display to "none".
function toggleHide() {
    let cards = document.querySelectorAll(".toggle");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("hide");
    }
}



function toggleFlip() {
    let cards = document.querySelectorAll(".scene .card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => setCard(i), false);
    }
}



function construct() {
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
    let cards = deckDiv.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.zIndex = i;
        cards[i].style.top = i * CARD_PADDING + "px";
        cards[i].addEventListener("mouseenter", () => { hoverEnter(deckNumber, i); }, false);
        cards[i].addEventListener("mouseleave", () => hoverExit(deckNumber, i), false);
        cards[i].addEventListener("click", () => selectCard(deckNumber, i), false);
    }
}

function selectCard(deckNumber, i) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = i + 1;
    let card = deckDiv.querySelector(".card:nth-child(" + currentIndex + ")");
    buttonSelect(card, deckNumber, i);
}

function buttonSelect(card, deckNumber, index) {
    let cardText = card.querySelector(".selection");
    let value = checkSelected(deckNumber, index);
    if (value[0] == true) {
        cardArray[value[1]] = 0;
        card.classList.toggle("clicked");
        cardText.textContent = "";
        return;
    }

    for (let i = 0; i < cardArray.length; i++) {
        if (cardArray[i] == 0) {
            cardArray[i] = [deckNumber, index + 1];
            card.classList.toggle("clicked");
            cardText.textContent = i + 1;
            break;
        }
        if (i === 4) {
            alert("All 5 cards selected")
        }
    }
    console.log(cardArray);
}

function checkSelected(deckNumber, index) {
    let value = [false, 0];
    for (let i = 0; i < cardArray.length; i++) {
        if (cardArray[i][0] === deckNumber && cardArray[i][1] === index + 1) {
            value[0] = true;
            value[1] = i;
        }
    }
    return value;
}

function setCard(index) {
    flipReading(index);
    setBack(index);
    displayInfo(index);

}

function setBack(index) {
    let card = (document.querySelector(".reading").querySelectorAll(".card"))[index];
    if(card.classList.contains("flippled") == false) {
        let cardImageIndex = ((cardArray[index]).toString()).replaceAll(",", " ");
        let cardBackImage = "url('Tarokka Deck/" + imageArray[cardImageIndex] + "')";
        let cardBackArray = document.querySelector(".reading").querySelectorAll(".back");
        let cardBack = cardBackArray[index];
        cardBack.style.backgroundImage = cardBackImage;
    }
}

function flipReading(index) {
    let readingCardArray = document.querySelector(".reading").querySelectorAll(".card");
    let readingCard = readingCardArray[index];
    readingCard.classList.toggle("flipped");
}

function displayInfo(index) {
    let card = (document.querySelector(".reading").querySelectorAll(".card"))[index];
    let cardDescriptionIndex = ((cardArray[index]).toString()).replaceAll(",", " ");
    let cardDescription = cardDescriptions[cardDescriptionIndex];
    let Description = document.querySelectorAll(".information")[index];
    if(card.classList.contains("flipped") == false) {
        Description.textContent = "";
    }
    else {
        Description.textContent = cardDescription;
    }
}

//the eventListener function for mouseover, paramater "deckNumber" to select the nth-child with the "deck" class of an element, the paramater "index" to
//determine which card is being hovered over. "cards" is a nodelist of all of the card images inside of the deck that come after the hovered card
//we loop over these card images, pushing each of them down by the CARD_HEIGHT minus the CARD_PADDING
function hoverEnter(deckNumber, index) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = index;
    let cards = deckDiv.querySelectorAll(".card");

    for (let i = currentIndex + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) + (CARD_HEIGHT - CARD_PADDING) + "px";
    }
}

//the eventListener function for mouseout, paramater "deckNumber" to select the nth-child with the "deck" class of an element, the paramater "index" to
//determine which card is being hovered over. "cards" is a nodelist of all of the card images inside of the deck that come after the hovered card
//we loop over these card images, pushing each of them back up by the CARD_HEIGHT minus the CARD_PADDING
let hoverExit = function (deckNumber, index) {
    let deckDiv = document.querySelector(".deck:nth-child(" + deckNumber + ")");
    let currentIndex = index;
    let cards = deckDiv.querySelectorAll(".card");

    for (let i = currentIndex + 1; i < cards.length; i++) {
        cards[i].style.top = parseInt(cards[i].style.top, 10) - (CARD_HEIGHT - CARD_PADDING) + "px";
    }
}