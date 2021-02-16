import { Card } from "./types";

const shuffleDeck = (deck: Card[]) => {
  const d = [...deck];
  d.sort(() => Math.random() - 0.5);
  return d;
};

const getFullDeck = (): Card[] => {
  return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
};

const makeNewDeck = (): Card[] => {
  const fullDeck = shuffleDeck([...getFullDeck()]);
  return fullDeck.slice(9);
};

export { shuffleDeck, getFullDeck, makeNewDeck };
