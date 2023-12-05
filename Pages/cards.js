class ArtApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('An error has occured');
  }

  getArtObjects() {
    const TOTAL_PAGES = 33;
    const randomPage = Math.floor(Math.random() * TOTAL_PAGES) + 1;
    return fetch(
      `${this._url}api/v1/artworks/search?fields=title,image_id,artist_title&limit=30&page=${randomPage}&api_model=artworks`,
      {
        method: 'GET',
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }
}

const artApi = new ArtApi({
  url: 'https://api.artic.edu/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const cardsContainer = document.querySelector('.gallery');

function addPlayerName() {
  const nameFromStorage = JSON.parse(localStorage.getItem('playerName'));
  console.log(nameFromStorage);

  const playerNameElement = document.querySelector('#player-name');

  playerNameElement.textContent = nameFromStorage;
}

addPlayerName();

// get cards from API
function getRandomCards() {
  const currentCardsList = [];

  artApi.getArtObjects().then((data) => {
    const filterByNullCardsList = data.data.filter((card) => card.artist_title !== null);

    const first15CardsList = filterByNullCardsList.slice(0, 15);

    first15CardsList.forEach((element) => {
      renderCard(element);
      // Collect every card into currentCardsList array
      currentCardsList.push(element);
    });
    // Save the updated array back to local storage (use for game)
    localStorage.setItem('latestCardsList', JSON.stringify(currentCardsList));
    console.log(currentCardsList);
  });
}

// Render one card
function renderCard(element) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src =
    'https://www.artic.edu/iiif/2/' + element.image_id + '/full/200,/0/default.jpg';
  cardElement.querySelector('.card__author').textContent = element.artist_title;

  cardsContainer.append(cardElement);
}

getRandomCards();

// // -------------------------------------------------------------------------------
// // Redirecting page to game after 12 seconds 
// // -------------------------------------------------------------------------------

// const urlParams = new URLSearchParams(window.location.search);
// const redirectDone = urlParams.get("redirectDone");
// function redirectPage() {
//   if (redirectDone !== "true") {
//     setTimeout(function () {
//       const newUrl = new URL("game.html", window.location.href);
//       newUrl.searchParams.set("redirectDone", "true");
//       window.location.href = newUrl.toString();
//     }, 12000);
//   }
// }
// redirectPage();
