function dropDownSuit() {
    document.getElementById("suitDropDown").classList.toggle("hide");
}

function dropDownCard() {
    document.getElementById("cardDropDown").classList.toggle("hide");
}

function setButton(elementID) {
    let selectedSuit = document.getElementById(elementID);
    let suitButton = document.getElementById("suitButton");
    suitButton.innerHTML = selectedSuit.innerHTML;
    dropDownSuit();
}


function zIndexLoop() {
    let cards = document.querySelectorAll("img.deckCard");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.zIndex = i;
        cards[i].style.top = i*10+"px";
    }
    addEventListeners();
}

function addEventListeners() {
    let cards = document.querySelectorAll("img.deckCard");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("mouseenter", function(){cardHoverEnter(i)}, false);
        cards[i].addEventListener("mouseout", function(){cardHoverExit(i), false});
    }
}

function cardHoverExit(index) {
    let currentIndex = index;
    let remainingCards = document.querySelectorAll("img.deckCard");
    for (let i = currentIndex + 1; i < remainingCards.length; i++) {
        remainingCards[i].style.top = parseInt(remainingCards[i].style.top, 10) - 270 + "px";
    }
    console.log(index);
} 

function cardHoverEnter(index) {

    let currentIndex = index;
    let remainingCards = document.querySelectorAll("img.deckCard");
    for (let i = currentIndex + 1; i < remainingCards.length; i++) {
        remainingCards[i].style.top = parseInt(remainingCards[i].style.top, 10) + 270 + "px";
    }
    console.log(index);
} 