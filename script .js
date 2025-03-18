const words = [
  { id: 1, value: "Elephant" },
  { id: 2, value: "Tiger" },
  { id: 3, value: "Giraffe" },
  { id: 4, value: "Pineapple" },
  { id: 5, value: "Computer" },
  { id: 6, value: "Chocolate" },
  { id: 7, value: "Sunshine" },
  { id: 8, value: "Rainbow" },
  { id: 1, value: "Elephant" },
  { id: 2, value: "Tiger" },
  { id: 3, value: "Giraffe" },
  { id: 4, value: "Pineapple" },
  { id: 5, value: "Computer" },
  { id: 6, value: "Chocolate" },
  { id: 7, value: "Sunshine" },
  { id: 8, value: "Rainbow" },
];

let flippedCards = [];
let matchedCards = 0;

const gameBoard = document.getElementById("gameBoard");
const congratulationsMessage = document.getElementById(
  "congratulationsMessage"
);
const restartButton = document.getElementById("restartButton");

// Shuffle the cards array
function shuffleCards() {
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
}

// Create cards and add them to the board
function createCards() {
  shuffleCards();
  gameBoard.innerHTML = "";
  words.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-id", card.id);

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    cardContent.textContent = card.value;
    cardElement.appendChild(cardContent);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Flip the card
function flipCard() {
  if (
    flippedCards.length === 2 ||
    this.classList.contains("flipped") ||
    this.classList.contains("matched")
  ) {
    return;
  }

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// Check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.getAttribute("data-id") === card2.getAttribute("data-id")) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards += 2;
    flippedCards = [];
    checkGameOver();
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Check if all cards are matched
function checkGameOver() {
  if (matchedCards === words.length) {
    // Show the congratulations message and restart button
    congratulationsMessage.style.display = "block";
    restartButton.style.display = "block";
  }
}

// Restart the game
function restartGame() {
  matchedCards = 0;
  flippedCards = [];
  congratulationsMessage.style.display = "none";
  restartButton.style.display = "none";
  createCards();
}

// Initialize the game
createCards();
