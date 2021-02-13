import { Card } from "./types";

const shuffleDeck = (deck: Card[]) => {
  const d = [...deck];
  d.sort(() => Math.random() - 0.5);
  return d;
};

const getFullDeck = (): Card[] => {
  const initialArray = [...Array(33).keys()];
  const correctedNumbers = initialArray.map((number) => number + 3);
  return correctedNumbers as Card[];
};

const makeNewDeck = (): Card[] => {
  const fullDeck = shuffleDeck([...getFullDeck()]);
  return fullDeck.slice(9);
};

export { shuffleDeck, getFullDeck, makeNewDeck };
