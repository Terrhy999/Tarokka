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
