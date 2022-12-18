var selectedType;
var messageBox = document.querySelector('.message-pop-up');
var receiveBtn = document.querySelector('#receive-btn');
var meditateIcon = document.querySelector('.meditate-icon');
var affirmRadio = document.querySelector('#affirmation');
var mantraRadio = document.querySelector('#mantra');
var favoriteBtn = document.querySelector('#favorite-button');
var homeView = document.querySelector('.home-view');
var favoritesView = document.querySelector('.favorites-view');
var viewFavoritesBtn = document.querySelector('#view-favorites-button');
var affirmMessage = document.querySelector('.fav-affirm-msg');
var mantraMessage = document.querySelector('.fav-mantra-msg');
var homeBtn = document.querySelector('#home-btn');
var mantraHeader = document.querySelector('.mantra-heading');
var affirmHeader = document.querySelector('.affirm-heading');
var favoriteMessages = document.querySelector('.white-box3');
var currentMessage;
var favoriteAffirmations = [];
var favoriteMantras = [];

//add feedback after button click on

affirmRadio.addEventListener('click', changeSelection);
mantraRadio.addEventListener('click', changeSelection);
receiveBtn.addEventListener('click', showMessage);
favoriteBtn.addEventListener('click', saveMessage);
viewFavoritesBtn.addEventListener('click', showFavoritesPage);
homeBtn.addEventListener('click', showHomePage);


function deleteMessage(event) {
    if (event.target.parentElement.matches('.fav-msg-div')) {
        unFavorite(event, favoriteAffirmations);
        unFavorite(event, favoriteMantras);
        showFavoriteMessages();
    }
}

function unFavorite(event, favoriteMessages) {
    for (var i = 0; i < favoriteMessages.length; i++) {
        if (findMessage(event) === favoriteMessages[i]) {
            favoriteMessages.splice(i, 1);
        }
    }
}

function findMessage(event) {
    return event.target.dataset.msgName;
}

function showHomePage() {
    hideElement(favoritesView);
    showElement(homeView);
    showElement(messageBox);
    showElement(favoriteBtn);
}

function showFavoritesPage() {
    if (favoriteMantras.length || favoriteAffirmations.length) {
        hideElement(homeView);
        showElement(favoritesView);
        hideElement(favoriteBtn);
        hideElement(messageBox);
        showFavoriteMessages();
    } else {
        alert('💛 You haven\'t favorited any messages yet 💛')
    }
}

function showFavoriteMessages() {
    affirmMessage.innerText = '';
    mantraMessage.innerText = '';
    if (favoriteAffirmations.length) {
        showElement(affirmHeader);
        showFavAffirmations(affirmMessage, favoriteAffirmations);
    }
    if (favoriteMantras.length) {
        showElement(mantraHeader);
        showFavAffirmations(mantraMessage, favoriteMantras);
    }
}

function showFavAffirmations(element, favoriteMessages) {
    for (var i = 0; i < favoriteMessages.length; i++) {
        element.innerHTML += `
        <div class='fav-msg-div'>
            <p>${favoriteMessages[i]}</p>
            <button type='button' class='white-text delete-btn' data-msg-name='${favoriteMessages[i]}'>Delete</button>
        </div>`;
        assignDeleteButton();
    }
}

function assignDeleteButton() {
    var deleteButtons = document.querySelectorAll('.delete-btn');
    for (var i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', deleteMessage);
    }
}

//show some feedback after saving message
function saveMessage() {
    var selectedMessage = document.querySelector('.message-pop-up').innerText;
    if (selectedType === "affirmation") {
        if (!favoriteAffirmations.includes(selectedMessage)) {
            favoriteAffirmations.push(selectedMessage);
        }
    } else {
        if (!favoriteMantras.includes(selectedMessage)) {
            favoriteMantras.push(selectedMessage);
        }
    }
}

function changeSelection(event) {
    selectedType = event.target.value;
}

function updateMessage() {
    if (selectedType === "affirmation") {
        messageBox.innerHTML = affirmations[Math.floor(Math.random() * affirmations.length)];
    } else {
        messageBox.innerHTML = mantras[Math.floor(Math.random() * mantras.length)];
    }
}

function hideElement(element) {
    element.classList.add('hidden');
}

function showElement(element) {
    element.classList.remove('hidden');
}

function showMessage() {
    if (selectedType) {
        updateMessage();
        showElement(messageBox);
        hideElement(meditateIcon);
        showElement(favoriteBtn);
        showElement(viewFavoritesBtn);
    }
}