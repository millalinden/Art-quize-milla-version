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