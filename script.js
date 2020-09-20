function dropDownSuit() {
    document.getElementById("suitDropDown").classList.toggle("hide");
}

function dropDownCard() {
    document.getElementById("cardDropDown").classList.toggle("hide");
}

function toggleHide() {
    let cards = document.querySelectorAll("img.card")
    for(let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("hide");
    }
}

function setButton(elementID) {
    let selectedSuit = document.getElementById(elementID);
    let suitButton = document.getElementById("suitButton");
    suitButton.innerHTML = selectedSuit.innerHTML;
    dropDownSuit();
}


function zIndexLoop() {
    let cards = document.querySelectorAll("img.deckCard");
    let faceCards = document.querySelectorAll("img.faceCard");
    let cardsRed = document.querySelectorAll("img.deckCardRed");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.zIndex = i;
        cards[i].style.top = i*20+"px";
    }
    for (let i = 0; i < faceCards.length; i++) {
        faceCards[i].style.zIndex = i;
        faceCards[i].style.top = i*20 + "px";
    }
    for (let i = 0; i < cardsRed.length; i++) {
        cardsRed[i].style.zIndex = i;
        cardsRed[i].style.top = i*20 + "px";
    }
    addEventListeners();
}

function addEventListeners() {
    let cards = document.querySelectorAll("img.deckCard");
    let faceCards = document.querySelectorAll("img.faceCard");
    let cardsRed = document.querySelectorAll("img.deckCardRed");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("mouseenter", function(){cardHoverEnter(i)}, false);
        cards[i].addEventListener("mouseout", function(){cardHoverExit(i)}, false);
    }
    for (let i = 0; i < faceCards.length; i++) {
        faceCards[i].addEventListener("mouseenter", function(){faceHoverEnter(i)}, false);
        faceCards[i].addEventListener("mouseout", function(){faceHoverExit(i)}, false);
    }
    for (let i = 0; i < cardsRed.length; i++) {
        cardsRed[i].addEventListener("mouseenter", function(){redHoverEnter(i)}, false);
        cardsRed[i].addEventListener("mouseout", function(){redHoverExit(i)}, false);
    }
}

function cardHoverExit(index) {
    let currentIndex = index;
    let remainingCards = document.querySelectorAll("img.deckCard");
    for (let i = currentIndex + 1; i < remainingCards.length; i++) {
        remainingCards[i].style.top = parseInt(remainingCards[i].style.top, 10) - 260 + "px";
    }
} 

function faceHoverExit(index) {
    let currentIndex = index;
    let remainingFaceCards = document.querySelectorAll("img.faceCard");
    for (let i = currentIndex + 1; i < remainingFaceCards.length; i++) {
        remainingFaceCards[i].style.top = parseInt(remainingFaceCards[i].style.top, 10) - 260 + "px";
    }
} 

function cardHoverEnter(index) {

    let currentIndex = index;
    let remainingCards = document.querySelectorAll("img.deckCard")
    for (let i = currentIndex + 1; i < remainingCards.length; i++) {
        remainingCards[i].style.top = parseInt(remainingCards[i].style.top, 10) + 260 + "px";
    }
    
}

function redHoverEnter(index) {

    let currentIndex = index;
    let remainingCards = document.querySelectorAll("img.deckCardRed")
    for (let i = currentIndex + 1; i < remainingCards.length; i++) {
        remainingCards[i].style.top = parseInt(remainingCards[i].style.top, 10) + 260 + "px";
    }
    
}

function redHoverExit(index) {
    let currentIndex = index;
    let remainingCards = document.querySelectorAll("img.deckCardRed");
    for (let i = currentIndex + 1; i < remainingCards.length; i++) {
        remainingCards[i].style.top = parseInt(remainingCards[i].style.top, 10) - 260 + "px";
    }
} 

function faceHoverEnter(index) {

    let currentIndex = index;
    let remainingFaceCards = document.querySelectorAll("img.faceCard")
    for (let i = currentIndex + 1; i < remainingFaceCards.length; i++) {
        remainingFaceCards[i].style.top = parseInt(remainingFaceCards[i].style.top, 10) + 260 + "px";
    }
    
} 