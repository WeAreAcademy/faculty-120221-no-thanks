import { shuffle } from "lodash";
import { Card } from "./types";

export const generateWholeDeck = (): Card[] => {
  return Array.from(Array(33).keys()).map((n) => n + 3) as Card[];
};

export const generateCutDeck = (): Card[] => {
  const wholeDeck: Card[] = generateWholeDeck();
  const shuffledDeck = shuffle(wholeDeck);
  // 9 cards put back in the box
  const cutDeck = shuffledDeck.slice(0, -9);
  return cutDeck;
};
