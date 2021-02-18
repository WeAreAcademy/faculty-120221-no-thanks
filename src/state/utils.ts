import { shuffle } from "lodash";
import { Card } from "./types";

export const generateWholeDeck = (): Card[] => {
  return Object.keys(Array(35)).map((n) => parseInt(n + 1)) as Card[];
};

export const generateCutDeck = (): Card[] => {
  const wholeDeck: Card[] = generateWholeDeck();
  const [first, second, third, ...cutDeck] = shuffle(wholeDeck);
  return cutDeck;
};
