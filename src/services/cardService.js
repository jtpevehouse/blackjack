const cards = new Array(52);
const suits = ["spades", "hearts", "clubs", "diamonds"];
const namedCards = ["King", "Queen", "Jack"];

//Generates and adds card to hand
export function getCard() {
  let card = {
    face: "",
    suit: "",
    value: "",
    index: -1,
  };

  let faceValue = Math.floor(1 + Math.random() * 13);
  let suitIndex = Math.floor(Math.random() * 4);
  let cardIndex = faceValue * suitIndex + 1;

  if (checkIfCardExists(cardIndex)) {
    if (!checkIfOneSuitUpExists(cardIndex)) {
      suitIndex === 3 ? (suitIndex = 0) : suitIndex++;
      cardIndex += 13;
      card.index = cardIndex;
    } else return getCard();
  } else card.index = cardIndex;

  card.suit = suits[suitIndex];
  setCardFace(card, faceValue);
  setCardValue(card, faceValue);

  cards[cardIndex - 1] = cardIndex;
  return card;
}

//Checks to see if the card that's been generated has already been generated
function checkIfCardExists(cardIndex) {
  if (cards[cardIndex - 1] !== undefined) {
    return true;
  } else return false;
}

//Checks to see if you can move the card up one suit instead of making a new card
function checkIfOneSuitUpExists(cardValue) {
  const oneSuitUp = (cardValue += 13);
  if (cards[oneSuitUp - 1]) {
    return true;
  } else return false;
}

//Sets what the face of the card should display
function setCardFace(card, faceValue) {
  if (faceValue === 1) {
    card.face = "Ace";
  } else {
    if (faceValue > 10) {
      card.face = namedCards[13 - faceValue];
    } else card.face = faceValue;
  }
}

//Sets the value of the card in the hand
function setCardValue(card, faceValue) {
  if (faceValue > 10) {
    card.value = 10;
  } else card.value = faceValue;
}
