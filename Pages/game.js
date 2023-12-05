let rounds;
let score = 0;
let currentRound = 0;


// ---------------------------------------------------------------------------------------------
// Get items/arrays from local storage and create a new varaible where this array will be stored 
// ---------------------------------------------------------------------------------------------

let getStorageArray = localStorage.getItem('latestCardsList');
let retrievedArray = JSON.parse(getStorageArray);

let artworksArray = Object.values(retrievedArray);

let roundEl = document.querySelector('.title__artist');
let playerScore = document.querySelector("#player-score");
let playerRound = document.querySelector("#player-round");
playerScore.textContent = 'Score: 0'
playerRound.textContent = 'Round: 1'


function addPlayerName() {
    const nameFromStorage = JSON.parse(localStorage.getItem('playerName'));
    console.log(nameFromStorage);
  
    const playerNameElement = document.querySelector('#player-name');
  
    playerNameElement.textContent = nameFromStorage;
  }
  
  addPlayerName();

function getCards() { 
    let chunks = [];
    let chunk = [];

    for (let i = 0; i < artworksArray.length; i++) {
        let artwork = artworksArray[i];
        chunk.push(artwork);

        if (chunk.length === 3) {
            chunks.push(chunk);
            chunk = [];
        }
    }

    return chunks;
}



function renderRound(round) {
    roundEl.innerHTML = '';

    let correctAnswerIndex = Math.floor(Math.random() * round.length);

    let correctAnswer = round[correctAnswerIndex];
    roundEl.innerHTML = `<h3>${correctAnswer.artist_title}</h3>`;

    let imageContainers = document.querySelectorAll('.card__image-container'); 

    imageContainers.forEach(container => {
    container.innerHTML = '';
});

    for (let i = 0; i < round.length; i++) {
        let artwork = round[i];
        
        let artworkEl = document.createElement('img');
        artworkEl.className = ("card__image");
        

        artworkEl.src ='https://www.artic.edu/iiif/2/' + artwork.image_id + '/full/200,/0/default.jpg';

        imageContainers[i].appendChild(artworkEl);

        artworkEl.addEventListener('click', function () {
            if (i === correctAnswerIndex) {
                score += 1;
            }
            playerScore.textContent = `Score:${score}`;
            playerRound.textContent = `Round:${currentRound}`;
            

            currentRound += 1;
            console.log(currentRound);

          
            renderRound(getCards()[currentRound]);
        });
    }
}

renderRound(getCards()[currentRound]);


// --------------------------------------------------------------------------
// Code for Rendering end pop up message
// --------------------------------------------------------------------------

function displayEndMessage(score) {
    // Call the function to create the whole screen element
    const wholeScreen = createWholeScreen();
  
    // Call the function to se end message based on the score
    const endMessage = getEndMessage(score);
  
    // Call the function to create a container for the message
    const container = createContainer(endMessage);
  
    //Call the function to create a container for the button
    const btncontainer = createBtnContainer();
  
    // Call the function to create the "Play Again" button
    const btnNewGame = createNewGameButton();
  
    // Call the function to create the "Start Page" button
    const btnNewPlayer = createNewPlayerButton();
  
    // Event listener to the  New Game button for navigation
    btnNewGame.addEventListener("click", navigateToCard);
  
    // Event listener to the New Player button for navigation
    btnNewPlayer.addEventListener("click", navigateToIndex);
  
    // Place elements to their respective parent elements
    appendElements(
      wholeScreen,
      container,
      btncontainer,
      btnNewGame,
      btnNewPlayer
    );
  
    // Show the whole screen by changing display from "none" to "block"
    wholeScreen.style.display = "block";
  }
  
  function createWholeScreen() {
    // Create the whole screen element and return it
    const wholeScreen = document.createElement("div");
    wholeScreen.id = "wholeScreen";
    document.body.append(wholeScreen);
    return wholeScreen;
  }
  
  function getEndMessage(score) {
    //  End message based on the score and return it
    switch (score) {
      case 5:
        return "Congratulations!<br>You're a certified Art Master.<br>You nailed it!";
      case 4:
        return "Almost perfection!<br>Your art expertise is shining through.";
      case 3:
        return "Impressive!<br>You're becoming an Art Master.";
      case 2:
        return "Well done!<br>Your art knowledge is growing.";
      case 1:
        return "You're on the right track!<br>Brush up on those art details.";
      default:
        return "Keep exploring the art world!";
    }
  }
  
  function createContainer(endMessage) {
    // Create a container for the message and button and return it
    const container = document.createElement("div");
    container.className = "wholeScreen-container wholeScreen_text";
    container.innerHTML = endMessage;
    return container;
  }
  
  function createBtnContainer() {
    const btncontainer = document.createElement("div");
    btncontainer.id = "btncontainer";
    btncontainer.classList.add("btncontainer");
    return btncontainer;
  }
  
  function createNewGameButton() {
    // Create the "Play Again" button and return it
    const btnNewGame = document.createElement("button");
    btnNewGame.id = "btnNewGame";
    btnNewGame.classList.add("button");
    btnNewGame.innerHTML = "New Game";
    return btnNewGame;
  }
  
  function createNewPlayerButton() {
    // Create the "Play Again" button and return it
    const btnStartPage = document.createElement("button");
    btnStartPage.id = "btnStart";
    btnStartPage.classList.add("button");
    btnStartPage.innerHTML = "New Player";
    return btnStartPage;
  }
  
  function navigateToCard() {
    // Link back to the first page (index.html)
    window.location.href = "card.html";
  }
  
  function navigateToIndex() {
    // Link back to the first page (index.html)
    window.location.href = "index.html";
  }
  
  function appendElements(
    wholeScreen,
    container,
    btncontainer,
    btnNewGame,
    btnNewPlayer
  ) {
    // Place elements to their respective parent elements
    wholeScreen.append(container);
    container.append(btncontainer);
    btncontainer.append(btnNewGame);
    btncontainer.append(btnNewPlayer);
  }


