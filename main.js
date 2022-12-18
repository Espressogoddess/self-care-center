var selectedType;
var currentMessage;
var favoriteAffirmations = [];
var favoriteMantras = [];

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


affirmRadio.addEventListener('click', changeSelection);
mantraRadio.addEventListener('click', changeSelection);
receiveBtn.addEventListener('click', showMessage);
favoriteBtn.addEventListener('click', saveMessage);
viewFavoritesBtn.addEventListener('click', showFavoritesPage);
homeBtn.addEventListener('click', showHomePage);


function changeSelection(event) {
    selectedType = event.target.value;
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

function showHomePage() {
    hideElement(favoritesView);
    showElement(homeView);
    showElement(messageBox);
    showElement(favoriteBtn);
}

function updateMessage() {
    if (selectedType === "affirmation") {
        messageBox.innerHTML = affirmations[Math.floor(Math.random() * affirmations.length)];
    } else {
        messageBox.innerHTML = mantras[Math.floor(Math.random() * mantras.length)];
    }
}

function showFavoriteMessages() {
    affirmMessage.innerText = '';
    mantraMessage.innerText = '';
    if (favoriteAffirmations.length) {
        showElement(affirmHeader);
        renderMessages(affirmMessage, favoriteAffirmations);
    }
    if (favoriteMantras.length) {
        showElement(mantraHeader);
        renderMessages(mantraMessage, favoriteMantras);
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

function renderMessages(element, favoriteMessages) {
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
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteMessage);
    }
}

function deleteMessage(event) {
    if (event.target.parentElement.matches('.fav-msg-div')) {
        unFavorite(event, favoriteAffirmations);
        unFavorite(event, favoriteMantras);
        showFavoriteMessages();
    }
}

function hideElement(element) {
    element.classList.add('hidden');
}

function showElement(element) {
    element.classList.remove('hidden');
}