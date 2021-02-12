import { Card } from "./types";

const shuffleDeck = (deck: Card[]) => {
  return deck.sort(() => Math.random() - 0.5);
};

const getFullDeck = () => {
  const initialArray = [...Array(33).keys()];
  const correctedNumbers = initialArray.map((number) => number + 3);
  return correctedNumbers as Card[];
};

const removeCardsFromDeck = (deck: Card[], numberToRemove: number) => {
  for (let i = 0; i < numberToRemove; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    deck.splice(randomIndex);
  }
  return deck;
};

const makeNewDeck = (): Card[] => {
  const fullDeck = getFullDeck();
  const reducedDeck = [...removeCardsFromDeck(fullDeck, 9)];
  shuffleDeck(reducedDeck);
  return reducedDeck;
};

export { shuffleDeck, getFullDeck, removeCardsFromDeck, makeNewDeck };
